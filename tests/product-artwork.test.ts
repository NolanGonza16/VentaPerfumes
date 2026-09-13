import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("cards and details share ProductArtwork", () => {
  const card = fs.readFileSync(
    "src/components/molecules/PerfumeCard.tsx",
    "utf8",
  );
  const detail = fs.readFileSync(
    "src/components/organisms/PerfumeDetail.tsx",
    "utf8",
  );

  assert.match(card, /<ProductArtwork/);
  assert.match(detail, /<ProductArtwork/);
});

test("product artwork preserves accessibility and loading behavior", () => {
  const artwork = fs.readFileSync(
    "src/components/molecules/ProductArtwork.tsx",
    "utf8",
  );

  assert.match(artwork, /alt=/);
  assert.match(artwork, /decoding="async"/);
  assert.match(artwork, /loading=/);
  assert.match(artwork, /perfume-placeholder\.svg/);
});
