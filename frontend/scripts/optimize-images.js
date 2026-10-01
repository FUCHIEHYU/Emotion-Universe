// One-off script: shrink oversized source art (many were 2048x2048 PNGs for
// images displayed at 40-150px) and convert to WebP. Run with:
//   node scripts/optimize-images.js
// Not part of the build; safe to delete after running.
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "public", "assets");

// { file: [maxWidth, quality] } — maxWidth chosen from the largest on-screen
// size found in the CSS, with headroom for ~3x retina displays.
const TARGETS = {
  "logo.png": [160, 85],
  "monsters/monster_joy.png": [480, 85],
  "monsters/monster_sad.png": [480, 85],
  "monsters/monster_fear.png": [480, 85],
  "monsters/monster_anger.png": [480, 85],
  "monsters/monster_surprise.png": [480, 85],
  "monsters/monster_disgust.png": [480, 85],
  "avatars/avatar1.png": [240, 85],
  "avatars/avatar2.png": [240, 85],
  "avatars/avatar3.png": [240, 85],
  "avatars/avatar4.png": [240, 85],
  "avatars/avatar5.png": [240, 85],
  "letter/letter_open.png": [1000, 82],
  "letter/letter_close.png": [1000, 82],
  "transition/flame.PNG": [700, 82],
  "transition/ship3.PNG": [700, 82],
  "about/about-feature-1.png": [700, 82],
  "about/about-feature-2.png": [700, 82],
  "about/about-feature-3.png": [700, 82],
  "about/about-feature-4.png": [700, 82],
};

async function run() {
  for (const [rel, [maxWidth, quality]] of Object.entries(TARGETS)) {
    const src = path.join(ROOT, rel);
    if (!fs.existsSync(src)) {
      console.warn("skip (not found):", rel);
      continue;
    }

    const dest = src.replace(/\.(png|PNG)$/, ".webp");
    const before = fs.statSync(src).size;

    const img = sharp(src);
    const meta = await img.metadata();
    const resizeWidth = Math.min(maxWidth, meta.width);

    await img
      .resize({ width: resizeWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(dest);

    const after = fs.statSync(dest).size;
    console.log(
      `${rel} -> ${path.basename(dest)}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
    );

    fs.unlinkSync(src);
  }
}

run();
