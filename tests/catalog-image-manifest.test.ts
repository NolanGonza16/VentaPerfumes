import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const catalog = JSON.parse(
  fs.readFileSync("catalog/august-products.json", "utf8"),
);

test("image manifest covers every catalog reference exactly once", () => {
  const manifest = JSON.parse(
    fs.readFileSync("catalog/image-manifest.json", "utf8"),
  );
  const refs = manifest.records.map((row: { ref: number }) => row.ref);

  assert.equal(manifest.records.length, catalog.records.length);
  assert.equal(new Set(refs).size, catalog.records.length);
  assert.deepEqual(
    refs,
    [...refs].sort((left, right) => left - right),
  );
});

test("manifest fidelity states never claim an unverified exact product", () => {
  const manifest = JSON.parse(
    fs.readFileSync("catalog/image-manifest.json", "utf8"),
  );
  const allowed = new Set([
    "verified_exact",
    "needs_exact_source",
    "category_neutral",
  ]);

  assert.ok(
    manifest.records.every((row: { fidelity_status: string }) =>
      allowed.has(row.fidelity_status),
    ),
  );
});
