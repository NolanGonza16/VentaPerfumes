import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const catalogPath = path.join(root, "catalog", "august-products.json");
const manifestPath = path.join(root, "catalog", "image-manifest.json");
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const auditFiles = [
  "reaudit-image-identity-001-250.json",
  "reaudit-image-identity-251-500.json",
  "reaudit-image-identity-501-731.json",
];
const audits = new Map();

for (const filename of auditFiles) {
  const data = JSON.parse(await readFile(path.join(root, "research", filename), "utf8"));
  for (const record of data.records) {
    const ref = Number(record.ref ?? record.r);
    const status = record.status ?? record.s;
    const current = record.current_url ?? record.current ?? record.a ?? null;
    const proposed = record.proposed_url ?? record.proposed ?? record.p ?? null;
    audits.set(ref, {
      status,
      source_url: status === "wrong" ? proposed : current,
      evidence: record.evidence ?? record.e ?? null,
      reason: record.reason ?? record.n ?? null,
    });
  }
}

const localUrl = (ref) => `/products/cutouts/ref-${String(ref).padStart(4, "0")}.png`;
async function hasCutout(ref) {
  try {
    await access(path.join(root, "public", localUrl(ref)));
    return true;
  } catch {
    return false;
  }
}

const accepted = new Set();
const unresolved = new Set();
for (const record of manifest.records) {
  const audit = audits.get(record.ref);
  const exists = await hasCutout(record.ref);
  const auditedExact = audit?.status === "exact";
  const corrected = audit?.status === "wrong" && record.ref !== 68;
  const previouslyApproved =
    record.fidelity_status === "verified_exact" && record.review_status === "approved";

  if (exists && (auditedExact || corrected || previouslyApproved)) {
    accepted.add(record.ref);
    if (/^https?:\/\//.test(audit?.source_url ?? "")) record.source_url = audit.source_url;
    record.fidelity_status = "verified_exact";
    record.treatment = "transparent_cutout_on_gold_stage";
    record.final_url = localUrl(record.ref);
    record.review_status = "approved";
    if (audit?.reason) record.notes = audit.reason;
  } else if (audit?.status === "missing" || audit?.status === "uncertain" || audit?.status === "wrong") {
    unresolved.add(record.ref);
    record.final_url = null;
    record.review_status = "pending";
    if (record.fidelity_status !== "category_neutral") record.fidelity_status = "needs_exact_source";
  }
}

const manifestByRef = new Map(manifest.records.map((record) => [record.ref, record]));
for (const record of catalog.records) {
  const audit = manifestByRef.get(record.origen_ref);
  if (accepted.has(record.origen_ref)) {
    record.imagen_url = localUrl(record.origen_ref);
  } else if (
    audit?.fidelity_status === "verified_exact" &&
    audit?.review_status === "approved" &&
    /^https?:\/\//.test(audit.source_url ?? "")
  ) {
    record.imagen_url = audit.source_url;
  } else {
    record.imagen_url = "";
  }
}

await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ accepted: accepted.size, unresolved: unresolved.size }));
