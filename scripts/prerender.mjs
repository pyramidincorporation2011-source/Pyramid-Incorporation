/**
 * Prerenders the single page into dist/index.html so content and the hero paint
 * before JavaScript loads (better LCP and SEO). Runs after the client and SSR builds:
 *   vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr && node scripts/prerender.mjs
 */
import { readFile, writeFile, rm, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist/index.html');
// Locate the server bundle (its name/location can vary with the bundler configuration).
async function findEntry(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      const found = await findEntry(full);
      if (found) return found;
    } else if (/^entry-server.*\.m?js$/.test(e.name)) return full;
  }
  return null;
}
const entry = await findEntry(path.join(root, 'dist-ssr'));
if (!entry) throw new Error('Prerender: entry-server bundle not found in dist-ssr/');
const { render } = await import(pathToFileURL(entry).href);

const html = await readFile(htmlPath, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('Root marker not found in dist/index.html');
const appHtml = render();

// Sanity check: every asset URL in the prerendered markup must exist in the client build.
const missing = [];
for (const [, url] of appHtml.matchAll(/(?:src|srcSet|srcset)="([^"]+)"/g)) {
  for (const part of url.split(',')) {
    const file = part.trim().split(' ')[0];
    if (file.startsWith('/assets/')) {
      try {
        await readFile(path.join(root, 'dist', file));
      } catch {
        missing.push(file);
      }
    }
  }
}
if (missing.length) throw new Error(`Prerendered HTML references missing assets:\n${[...new Set(missing)].join('\n')}`);

await writeFile(htmlPath, html.replace(marker, `<div id="root">${appHtml}</div>`));
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered dist/index.html (${Math.round(appHtml.length / 1024)} KB of markup)`);
