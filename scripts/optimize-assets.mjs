// One-time image encoding. Pass a path to an installed sharp package.
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
const require = createRequire(import.meta.url);
const sharp = require(process.argv[2] || "sharp");
const source = process.argv[3];
if (!source)
  throw new Error(
    "Pass the generated campaign image path as the second argument.",
  );
await mkdir("public/images", { recursive: true });
await Promise.all([
  sharp(source)
    .resize({ width: 1122, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile("public/images/essence-campaign.webp"),
  sharp(source)
    .resize({ width: 640 })
    .webp({ quality: 85 })
    .toFile("public/images/essence-campaign-640.webp"),
  sharp("public/essence-luxe-emblem.png")
    .resize(256, 256)
    .webp({ quality: 90 })
    .toFile("public/images/brand-mark.webp"),
]);
