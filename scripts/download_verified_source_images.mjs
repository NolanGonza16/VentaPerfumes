import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const catalog = JSON.parse(
  await readFile(path.join(root, "catalog", "august-products.json"), "utf8"),
).records;
const manifest = JSON.parse(
  await readFile(path.join(root, "catalog", "image-manifest.json"), "utf8"),
).records;
const manifestByRef = new Map(manifest.map((record) => [record.ref, record]));
const outputDir = path.join(root, "tmp", "verified-image-sources");
await mkdir(outputDir, { recursive: true });

const queue = catalog.filter((record) => {
  const audit = manifestByRef.get(record.origen_ref);
  return (
    /^https?:\/\//.test(record.imagen_url ?? "") &&
    audit?.fidelity_status === "verified_exact" &&
    audit?.review_status === "approved"
  );
});

const results = [];
for (const [index, record] of queue.entries()) {
  const extension = new URL(record.imagen_url).pathname.match(/\.(png|jpe?g|webp)$/i)?.[1] ?? "jpg";
  const filename = `ref-${String(record.origen_ref).padStart(4, "0")}.${extension.toLowerCase()}`;
  const destination = path.join(outputDir, filename);
  try {
    const response = await fetch(record.imagen_url, {
      headers: { "user-agent": "Mozilla/5.0 Essence-Luxe-Image-Audit/1.0" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
    results.push({
      ref: record.origen_ref,
      nombre: record.nombre,
      marca: record.marca,
      source_url: record.imagen_url,
      local_path: destination,
      status: "downloaded",
    });
  } catch (error) {
    results.push({
      ref: record.origen_ref,
      nombre: record.nombre,
      marca: record.marca,
      source_url: record.imagen_url,
      status: "failed",
      error: String(error),
    });
  }
  if ((index + 1) % 20 === 0 || index + 1 === queue.length) {
    console.log(`Downloaded ${index + 1}/${queue.length}`);
  }
}

await writeFile(
  path.join(root, "tmp", "verified-image-downloads.json"),
  `${JSON.stringify(results, null, 2)}\n`,
);
const downloaded = results.filter((result) => result.status === "downloaded").length;
console.log(JSON.stringify({ total: results.length, downloaded, failed: results.length - downloaded }));
