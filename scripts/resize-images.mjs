import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

// Max width for each directory (2× retina of max display width)
const TARGETS = [
  { dir: "./public/images",   maxWidth: 1200, quality: 82 },
  { dir: "./public/STICKERS", maxWidth: 600,  quality: 80 },
];

for (const { dir, maxWidth, quality } of TARGETS) {
  console.log(`\nProcessing: ${dir} (max ${maxWidth}px wide)\n`);

  const files = readdirSync(dir).filter(f => extname(f) === ".webp");
  let totalBefore = 0, totalAfter = 0;

  for (const file of files) {
    const path = join(dir, file);
    const before = statSync(path).size;

    try {
      const meta = await sharp(path).metadata();
      if (meta.width <= maxWidth) {
        console.log(`  skip  ${file.padEnd(40)} (${meta.width}px ≤ ${maxWidth}px)`);
        continue;
      }

      const { readFileSync, writeFileSync } = await import("fs");
      const inputBuf = readFileSync(path);
      const buf = await sharp(inputBuf)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();

      writeFileSync(path, buf);

      const after = statSync(path).size;
      totalBefore += before;
      totalAfter += after;
      const saving = (((before - after) / before) * 100).toFixed(0);
      console.log(`  ✓ ${file.padEnd(40)} ${meta.width}px → ${maxWidth}px  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${saving}%)`);
    } catch (err) {
      console.log(`  ✗ ${file} — ${err.message}`);
    }
  }

  if (totalBefore > 0) {
    console.log(`\n  Saved: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (-${(((totalBefore-totalAfter)/totalBefore)*100).toFixed(0)}%)`);
  }
}

console.log("\nDone.");
