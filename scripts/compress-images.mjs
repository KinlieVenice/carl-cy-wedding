import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

// Usage: node scripts/compress-images.mjs <dir> [maxWidth]
// e.g.:  node scripts/compress-images.mjs ./public/images 1200
//        node scripts/compress-images.mjs ./public/STICKERS 600
const INPUT_DIR = process.argv[2] ?? "./public/images";
const MAX_WIDTH  = process.argv[3] ? parseInt(process.argv[3]) : null;
const QUALITY = 80;

console.log(`\nProcessing: ${INPUT_DIR}${MAX_WIDTH ? ` (max ${MAX_WIDTH}px)` : ""}\n`);

const files = readdirSync(INPUT_DIR).filter(f =>
  [".jpg", ".jpeg", ".png", ".PNG", ".JPG", ".JPEG"].includes(extname(f))
);

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const inputPath = join(INPUT_DIR, file);
  const outName = basename(file, extname(file)) + ".webp";
  const outputPath = join(INPUT_DIR, outName);

  const before = statSync(inputPath).size;

  try {
    let pipeline = sharp(inputPath);
    if (MAX_WIDTH) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    await pipeline.webp({ quality: QUALITY }).toFile(outputPath);

    const after = statSync(outputPath).size;
    totalBefore += before;
    totalAfter += after;

    const saving = (((before - after) / before) * 100).toFixed(0);
    console.log(`✓ ${file.padEnd(35)} ${(before/1024/1024).toFixed(1)}MB → ${(after/1024/1024).toFixed(1)}MB  (-${saving}%)`);
  } catch (err) {
    console.log(`✗ ${file} — ${err.message}`);
  }
}

console.log("\n─────────────────────────────────────────────────");
console.log(`Total: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (-${(((totalBefore-totalAfter)/totalBefore)*100).toFixed(0)}%)`);
console.log("\nDone. Original files kept — delete them manually once you've verified the WebP versions look good.");
