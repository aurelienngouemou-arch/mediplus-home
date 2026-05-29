import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/icons");

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const BG = "#0A4D68";
const FG = "#ffffff";

function makeSvg(size) {
  const padding = Math.round(size * 0.15);
  const inner = size - padding * 2;
  const fontSize = Math.round(inner * 0.45);
  const r = Math.round(size * 0.2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="${BG}"/>
  <text x="${size / 2}" y="${size / 2 + fontSize * 0.35}" font-family="Georgia,serif" font-weight="bold" font-size="${fontSize}" fill="${FG}" text-anchor="middle">M</text>
</svg>`;
}

for (const size of SIZES) {
  const svg = Buffer.from(makeSvg(size));
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(join(outDir, `icon-${size}.png`));
  console.log(`✓ icon-${size}.png`);
}

console.log("Icons generated.");
