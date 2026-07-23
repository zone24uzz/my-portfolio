import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, "../public/images");
const publicDir = path.resolve(__dirname, "../public");

// Image files to convert (skip HEIC originals, keep them as backup)
const imageExtensions = [".jpg", ".jpeg", ".png"];
const files = [];

// Collect images from public/images/
const imageFiles = fs.readdirSync(imagesDir).filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return imageExtensions.includes(ext);
});
imageFiles.forEach((f) => files.push({ dir: imagesDir, file: f }));

// Also convert logo.png
const logoPath = path.join(publicDir, "logo.png");
if (fs.existsSync(logoPath)) {
  files.push({ dir: publicDir, file: "logo.png" });
}

console.log(`Found ${files.length} images to convert to WebP...`);
console.log("");

let totalOriginalSize = 0;
let totalWebpSize = 0;
let convertedCount = 0;

async function convertAll() {
  for (const { dir, file } of files) {
    const inputPath = path.join(dir, file);
    const outputName = path.parse(file).name + ".webp";
    const outputPath = path.join(dir, outputName);

    // Skip if WebP already exists (for re-running)
    if (fs.existsSync(outputPath)) {
      const origSize = fs.statSync(inputPath).size;
      const webpSize = fs.statSync(outputPath).size;
      console.log(`  ⏭️  ${file} → ${outputName} (already exists, ${(webpSize / 1024).toFixed(1)} KB)`);
      totalOriginalSize += origSize;
      totalWebpSize += webpSize;
      continue;
    }

    try {
      const inputBuffer = fs.readFileSync(inputPath);
      const origSize = inputBuffer.length;
      totalOriginalSize += origSize;

      const ext = path.extname(file).toLowerCase();
      const isPNG = ext === ".png";

      // Determine quality based on image type
      // Photos (JPG) can use lower quality; screenshots/PNG need higher quality
      let quality = isPNG ? 80 : 75;

      // For large hero images, use slightly lower quality to save more
      if (file.startsWith("IMG_") && origSize > 500 * 1024) {
        quality = 70;
      }
      // For project thumbnails that are already small, preserve quality
      if (origSize < 100 * 1024) {
        quality = 85;
      }

      const webpBuffer = await sharp(inputBuffer)
        .webp({ quality, effort: 4 })
        .toBuffer();

      fs.writeFileSync(outputPath, webpBuffer);
      const webpSize = webpBuffer.length;
      totalWebpSize += webpSize;

      const savings = ((1 - webpSize / origSize) * 100).toFixed(1);
      console.log(
        `  ✅ ${file} → ${outputName}` +
          `  ${(origSize / 1024).toFixed(1)} KB → ${(webpSize / 1024).toFixed(1)} KB` +
          `  (-${savings}%)`
      );
      convertedCount++;
    } catch (err) {
      console.error(`  ❌ Failed to convert ${file}: ${err.message}`);
    }
  }

  console.log("");
  console.log(`Converted: ${convertedCount} new WebP images`);
  console.log(
    `Total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB → ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(
    `Saved: ${((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(1)}% (${(
      (totalOriginalSize - totalWebpSize) /
      1024 /
      1024
    ).toFixed(2)} MB)`
  );
}

convertAll().catch(console.error);
