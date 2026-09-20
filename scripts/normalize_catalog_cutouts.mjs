import { readdir, readFile, rename, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = process.cwd();
const cutoutDir = path.join(root, "public", "products", "cutouts");
const requestedRefs = new Set(process.argv.slice(2).map((value) => String(Number(value)).padStart(4, "0")));
const files = (await readdir(cutoutDir))
  .filter((file) => /^ref-\d{4}\.png$/i.test(file))
  .filter((file) => requestedRefs.size === 0 || requestedRefs.has(file.slice(4, 8)))
  .sort();

for (const [index, file] of files.entries()) {
  const input = path.join(cutoutDir, file);
  const temporary = path.join(cutoutDir, `${file}.normalized.png`);
  const trimmed = sharp(input).trim({
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    threshold: 2,
  });
  const metadata = await trimmed.metadata();
  const longestEdge = Math.max(metadata.width ?? 1, metadata.height ?? 1);
  const margin = Math.max(8, Math.round(longestEdge * 0.025));
  await trimmed
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .extend({
      top: margin,
      right: margin,
      bottom: margin,
      left: margin,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
    .toFile(temporary);
  await rename(temporary, input);
  if ((index + 1) % 50 === 0 || index + 1 === files.length) {
    console.log(`Normalized ${index + 1}/${files.length}`);
  }
}

const localUrl = (ref) => `/products/cutouts/ref-${String(ref).padStart(4, "0")}.png`;
const catalogPath = path.join(root, "catalog", "august-products.json");
const manifestPath = path.join(root, "catalog", "image-manifest.json");
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const availableRefs = new Set(
  files.map((file) => Number(file.match(/ref-(\d+)/i)[1])),
);

const manifestByRef = new Map(manifest.records.map((record) => [record.ref, record]));
for (const record of catalog.records) {
  const audit = manifestByRef.get(record.origen_ref);
  if (
    availableRefs.has(record.origen_ref) &&
    audit?.fidelity_status === "verified_exact" &&
    audit?.review_status === "approved"
  ) {
    record.imagen_url = localUrl(record.origen_ref);
  }
}
for (const record of manifest.records) {
  if (
    availableRefs.has(record.ref) &&
    record.fidelity_status === "verified_exact" &&
    record.review_status === "approved"
  ) {
    record.final_url = localUrl(record.ref);
    record.treatment = "transparent_cutout_on_gold_stage";
  }
}

await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ normalized: files.length, mapped: availableRefs.size }));
