import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const catalog = JSON.parse(
  fs.readFileSync("catalog/august-products.json", "utf8"),
);
const reviewedSources = JSON.parse(
  fs.readFileSync("research/image-sources-reviewed.json", "utf8"),
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

test("exact image claims require matching reviewed evidence and approval", () => {
  const manifest = JSON.parse(
    fs.readFileSync("catalog/image-manifest.json", "utf8"),
  );
  const reviewedByRef = new Map(
    reviewedSources.records.map((row: { ref: number }) => [row.ref, row]),
  );

  assert.ok(
    manifest.records.every(
      (row: {
        ref: number;
        source_url: string | null;
        fidelity_status: string;
        review_status: string;
      }) => {
        if (row.fidelity_status !== "verified_exact") return true;
        const reviewed = reviewedByRef.get(row.ref);
        return (
          row.review_status === "approved" &&
          reviewed?.image_url === row.source_url &&
          ["matched", "matched_manual_exact"].includes(reviewed.status)
        );
      },
    ),
  );
});
