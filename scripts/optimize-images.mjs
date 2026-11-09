// Converts raster images in public/images to optimized WebP (max 1600px wide)
// and prints their dimensions. Run: node scripts/optimize-images.mjs
// Originals are kept so the owner can re-run with different settings.
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/images");
const exts = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = path.join(dir, entry);
    if ((await stat(full)).isDirectory()) {
      await walk(full);
      continue;
    }
    const ext = path.extname(entry).toLowerCase();
    if (!exts.has(ext)) continue;
    const out = full.slice(0, -ext.length) + ".webp";
    const isTeam = full.includes(`${path.sep}team${path.sep}`);
    const img = sharp(full).rotate();
    const resized = await img
      .resize({ width: isTeam ? 640 : 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    console.log(`${path.relative(root, out)}\t${resized.width}x${resized.height}\t${Math.round(resized.size / 1024)}KB`);
  }
}

await walk(root);
