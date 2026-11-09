/**
 * Generates favicons, PWA icons and the 1200x630 Open Graph image from the
 * brand SVGs in src/assets/brand (extracted from logo.pdf by extract-logo.py).
 * Run with: npm run brand
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brand = path.join(root, 'src/assets/brand');
const pub = path.join(root, 'public');
const NAVY = '#0B1F3A';

const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<title>.*?<\/title>/, '');
const markDark = inner(await readFile(path.join(brand, 'logo-mark-dark.svg'), 'utf8'));
const fullDark = inner(await readFile(path.join(brand, 'logo-full-dark.svg'), 'utf8'));

// Square icon: navy tile with the dark-variant mark centred (mark viewBox 210 190 655 372).
const iconSvg = (pad = 0.12, radius = 0) => {
  const S = 1000, w = S * (1 - pad * 2), s = w / 655, h = 372 * s;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}">` +
    `<rect width="${S}" height="${S}" rx="${radius}" fill="${NAVY}"/>` +
    `<g transform="translate(${S * pad},${(S - h) / 2 - 20}) scale(${s}) translate(-210,-190)">${markDark}</g></svg>`;
};

await writeFile(path.join(pub, 'favicon.svg'), iconSvg(0.1, 120));
const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
await writeFile(path.join(pub, 'apple-touch-icon.png'), await png(iconSvg(0.14), 180));
await writeFile(path.join(pub, 'icon-192.png'), await png(iconSvg(0.12), 192));
await writeFile(path.join(pub, 'icon-512.png'), await png(iconSvg(0.12), 512));
await writeFile(path.join(pub, 'icon-maskable-512.png'), await png(iconSvg(0.2), 512));

// favicon.ico with embedded PNG frames (16, 32, 48) – valid ICO since Vista.
const frames = await Promise.all([16, 32, 48].map(async (s) => ({ s, buf: await png(iconSvg(0.06, 120), s) })));
const header = Buffer.alloc(6 + 16 * frames.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach(({ s, buf }, i) => {
  const o = 6 + i * 16;
  header.writeUInt8(s, o); header.writeUInt8(s, o + 1); header.writeUInt8(0, o + 2); header.writeUInt8(0, o + 3);
  header.writeUInt16LE(1, o + 4); header.writeUInt16LE(32, o + 6);
  header.writeUInt32LE(buf.length, o + 8); header.writeUInt32LE(offset, o + 12);
  offset += buf.length;
});
await writeFile(path.join(pub, 'favicon.ico'), Buffer.concat([header, ...frames.map((f) => f.buf)]));

// Open Graph image: photo on the right, navy panel with the logo on the left.
const photo = await sharp(path.join(root, 'src/assets/originals/stock/hero.jpg'))
  .resize(640, 630, { fit: 'cover' }).modulate({ brightness: 0.85 }).toBuffer();
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="${NAVY}"/><stop offset="1" stop-color="${NAVY}" stop-opacity="0"/></linearGradient></defs>
  <rect x="0" y="0" width="620" height="630" fill="${NAVY}"/>
  <rect x="560" y="0" width="200" height="630" fill="url(#g)"/>
  <rect x="80" y="520" width="64" height="4" fill="#C8862E"/>
  <g transform="translate(70,70) scale(0.5) translate(-60,-185)">${fullDark}</g>
  <text x="80" y="566" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#F6F4EF" letter-spacing="0.3">Waterproofing &amp; structural repair · Nagpur · Since 2010</text>
</svg>`;
await sharp({ create: { width: 1200, height: 630, channels: 3, background: NAVY } })
  .composite([{ input: photo, left: 560, top: 0 }, { input: Buffer.from(ogSvg), left: 0, top: 0 }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(path.join(pub, 'og-image.jpg'));
console.log('Brand assets written to public/');
