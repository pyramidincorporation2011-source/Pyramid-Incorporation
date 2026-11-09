/**
 * Image pipeline (dev only). Run with: npm run images
 *
 * Reads originals from  src/assets/originals/{projects,stock,team}/*.{jpg,jpeg,png,webp}
 * Writes WebP variants to src/assets/{projects,stock,team}/<name>-<width>.webp
 * and a manifest (src/assets/images.json) with the intrinsic size and widths
 * so components can build srcset/sizes and reserve layout space.
 *
 * Widths larger than the original are skipped (no upscaling); the original
 * width is always emitted so small source photos still get one variant.
 */
import sharp from 'sharp';
import { readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'src/assets');
const GROUPS = ['projects', 'stock', 'team'];
const WIDTHS = [640, 1024, 1600];
const EXT = /\.(jpe?g|png|webp)$/i;
/**
 * Extra crops generated from an original: [outputKey, sourceFile, aspect (w/h), horizontal focus 0–1, widths, quality].
 * The phone hero sits under a dark overlay, so it is compressed harder to keep mobile LCP fast.
 */
const CROPS = [['stock/hero-portrait', 'stock/hero.jpg', 3 / 4, 0.62, [480, 768, 1080], 50]];

const manifest = {};
for (const group of GROUPS) {
  const inDir = path.join(assets, 'originals', group);
  const outDir = path.join(assets, group);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  const files = (await readdir(inDir).catch(() => [])).filter((f) => EXT.test(f)).sort();
  for (const file of files) {
    const name = file.replace(EXT, '');
    const src = sharp(path.join(inDir, file)).rotate();
    const { width, height } = await src.metadata();
    const widths = [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, 1600)])].sort((a, b) => a - b);
    for (const w of widths) {
      await src.clone().resize({ width: w }).webp({ quality: 68, effort: 6 }).toFile(path.join(outDir, `${name}-${w}.webp`));
    }
    manifest[`${group}/${name}`] = { width, height, widths };
    console.log(`${group}/${name}  ${width}x${height}  -> ${widths.join(', ')}`);
  }
}
for (const [key, source, aspect, focus, cropWidths, quality] of CROPS) {
  const src = sharp(path.join(assets, 'originals', source)).rotate();
  const { width, height } = await src.metadata();
  const cw = Math.round(height * aspect);
  const left = Math.max(0, Math.min(width - cw, Math.round(width * focus - cw / 2)));
  const cropped = sharp(await src.extract({ left, top: 0, width: cw, height }).blur(0.8).toBuffer()); // slight blur: invisible under the overlay, much smaller file
  const widths = cropWidths.filter((w) => w <= cw);
  for (const w of widths) {
    await cropped.clone().resize({ width: w }).webp({ quality, effort: 6 }).toFile(path.join(assets, `${key}-${w}.webp`));
  }
  manifest[key] = { width: cw, height, widths };
  console.log(`${key}  ${cw}x${height} (crop of ${source})  -> ${widths.join(', ')}`);
}
await writeFile(path.join(assets, 'images.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nWrote ${Object.keys(manifest).length} images to src/assets/images.json`);
