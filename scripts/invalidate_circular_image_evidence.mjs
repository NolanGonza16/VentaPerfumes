import fs from "node:fs/promises";

const manifestPath = new URL("../catalog/image-manifest.json", import.meta.url);
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
let invalidated = 0;
const conflictingDuplicateRefs = new Set([51, 52, 377, 378]);

for (const record of manifest.records) {
  const circular =
    typeof record.source_url === "string" &&
    (record.source_url === record.final_url ||
      /^\/products\/cutouts\/ref-\d{4}\.png$/.test(record.source_url));

  if (!circular && !conflictingDuplicateRefs.has(record.ref)) continue;
  record.source_url = null;
  record.source_kind = "missing";
  record.fidelity_status = "needs_exact_source";
  record.review_status = "pending";
  record.notes = conflictingDuplicateRefs.has(record.ref)
    ? "El mismo recurso se estaba usando para presentaciones distintas. Requiere una fuente externa específica para este volumen y concentración."
    : "La imagen publicada no puede funcionar como evidencia de su propia identidad. Requiere una fuente externa exacta antes de aprobarse.";
  invalidated += 1;
}

await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ invalidated }));
