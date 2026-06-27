import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

const INPUT_DIR = process.argv[2] ?? "./public/images";
const QUALITY = 80;

console.log(`\nProcessing: ${INPUT_DIR}\n`);

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
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

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
