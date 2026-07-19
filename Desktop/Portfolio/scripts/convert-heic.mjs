import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import convert from "heic-convert";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, "../public/images");

const files = fs.readdirSync(imagesDir).filter((f) => f.endsWith(".HEIC"));

(async () => {
  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputName = file.replace(".HEIC", ".jpg");
    const outputPath = path.join(imagesDir, outputName);

    try {
      const inputBuffer = fs.readFileSync(inputPath);
      const outputBuffer = await convert({
        buffer: inputBuffer,
        format: "JPEG",
        quality: 0.85,
      });
      fs.writeFileSync(outputPath, outputBuffer);
      console.log(`Converted: ${file} -> ${outputName}`);
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err.message);
    }
  }
  console.log("Done!");
})();
