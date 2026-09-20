import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const auditFiles = [
  "reaudit-image-identity-001-250.json",
  "reaudit-image-identity-251-500.json",
  "reaudit-image-identity-501-731.json",
];
const manifest = JSON.parse(
  await readFile(path.join(root, "catalog", "image-manifest.json"), "utf8"),
).records;
const alreadyApproved = new Set(
  manifest
    .filter((record) => record.fidelity_status === "verified_exact" && record.review_status === "approved")
    .map((record) => record.ref),
);
const outputDir = path.join(root, "tmp", "reaudited-image-sources");
await mkdir(outputDir, { recursive: true });

const candidates = [];
for (const filename of auditFiles) {
  const audit = JSON.parse(await readFile(path.join(root, "research", filename), "utf8"));
  for (const record of audit.records) {
    const ref = Number(record.ref ?? record.r);
    const status = record.status ?? record.s;
    if (!["exact", "wrong"].includes(status) || alreadyApproved.has(ref)) continue;
    const sourceUrl = status === "wrong"
      ? record.proposed_url ?? record.proposed ?? record.p
      : record.current_url ?? record.current ?? record.a;
    if (/^https?:\/\//.test(sourceUrl ?? "")) {
      candidates.push({ ref, status, source_url: sourceUrl });
    }
  }
}

const results = [];
for (const [index, candidate] of candidates.entries()) {
  const extension = new URL(candidate.source_url).pathname.match(/\.(png|jpe?g|webp)$/i)?.[1] ?? "jpg";
  const destination = path.join(
    outputDir,
    `ref-${String(candidate.ref).padStart(4, "0")}.${extension.toLowerCase()}`,
  );
  try {
    const response = await fetch(candidate.source_url, {
      headers: {
        accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        referer: new URL(candidate.source_url).origin,
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
      },
      redirect: "follow",
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 1000) throw new Error(`Unexpected payload (${bytes.length} bytes)`);
    await writeFile(destination, bytes);
    results.push({ ...candidate, local_path: destination, status_download: "downloaded" });
  } catch (error) {
    results.push({ ...candidate, status_download: "failed", error: String(error) });
  }
  if ((index + 1) % 25 === 0 || index + 1 === candidates.length) {
    console.log(`Downloaded ${index + 1}/${candidates.length}`);
  }
}

await writeFile(
  path.join(root, "tmp", "reaudited-image-downloads.json"),
  `${JSON.stringify(results, null, 2)}\n`,
);
const downloaded = results.filter((result) => result.status_download === "downloaded").length;
console.log(JSON.stringify({ total: results.length, downloaded, failed: results.length - downloaded }));
