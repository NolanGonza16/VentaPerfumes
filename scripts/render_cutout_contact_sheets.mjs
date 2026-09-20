import { mkdir, readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const root = process.cwd();
const files = (await readdir(path.join(root, "public", "products", "cutouts")))
  .filter((file) => /^ref-\d{4}\.png$/i.test(file))
  .sort();
const destination = path.join(root, "tmp", "cutout-contact-sheets");
await mkdir(destination, { recursive: true });

const tileWidth = 180;
const tileHeight = 240;
const columns = 8;
const rows = 8;
const perSheet = columns * rows;
const background = path.join(root, "public", "editorial", "backgrounds", "essence-luxe-gold-stage.png");

for (let sheetIndex = 0; sheetIndex * perSheet < files.length; sheetIndex += 1) {
  const page = files.slice(sheetIndex * perSheet, (sheetIndex + 1) * perSheet);
  const composites = [];
  for (const [tileIndex, file] of page.entries()) {
    const bottle = await sharp(path.join(root, "public", "products", "cutouts", file))
      .resize({ width: 76, height: 137, fit: "inside", withoutEnlargement: false })
      .png()
      .toBuffer({ resolveWithObject: true });
    const left = (tileIndex % columns) * tileWidth;
    const top = Math.floor(tileIndex / columns) * tileHeight;
    const bottleLeft = left + Math.round((tileWidth - bottle.info.width) / 2);
    const bottleTop = top + 168 - bottle.info.height;
    const label = `<svg width="${tileWidth}" height="24"><rect width="100%" height="100%" fill="#090706" fill-opacity=".82"/><text x="8" y="17" fill="#ead4ad" font-family="Arial" font-size="13">${file.replace(".png", "")}</text></svg>`;
    composites.push({ input: bottle.data, left: bottleLeft, top: bottleTop });
    composites.push({ input: Buffer.from(label), left, top: top + tileHeight - 24 });
  }
  const stage = await sharp(background).resize(tileWidth, tileHeight, { fit: "cover" }).png().toBuffer();
  const tiles = page.map((_, index) => ({
    input: stage,
    left: (index % columns) * tileWidth,
    top: Math.floor(index / columns) * tileHeight,
  }));
  const output = path.join(destination, `sheet-${String(sheetIndex + 1).padStart(2, "0")}.jpg`);
  await sharp({
    create: {
      width: columns * tileWidth,
      height: rows * tileHeight,
      channels: 3,
      background: "#090706",
    },
  })
    .composite([...tiles, ...composites])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(output);
  console.log(output);
}
