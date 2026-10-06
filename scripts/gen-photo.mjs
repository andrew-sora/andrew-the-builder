// Crops the transparent cutout to the subject and writes web-sized WebP files:
//   public/me-480.webp, public/me-720.webp
// Optional tool, not a project dependency:
//   npm i -D sharp && node scripts/gen-photo.mjs
// Source: assets-src/me-cutout.png (RGBA, subject anchored to the bottom edge).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const src = path.join(process.cwd(), 'assets-src', 'me-cutout.png');
const outDir = path.join(process.cwd(), 'public');

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * 4 + 3] > 20) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = 24;
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const width = Math.min(info.width, maxX + pad) - left;
const height = info.height - top; // keep the bottom edge: the subject is cropped there on purpose

// Crop first into its own buffer; chaining extract() and resize() in one pipeline would skip the resize.
const cropped = await sharp(src).extract({ left, top, width, height }).png().toBuffer();

for (const w of [480, 720]) {
  const file = path.join(outDir, `me-${w}.webp`);
  const out = await sharp(cropped)
    .resize({ width: w })
    .webp({ quality: 82, alphaQuality: 92, effort: 6 })
    .toFile(file);
  console.log(`${path.basename(file)}: ${out.width}x${out.height}, ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
}
