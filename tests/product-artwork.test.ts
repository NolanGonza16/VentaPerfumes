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

test("retailer imagery defaults to premium packshot treatment", () => {
  const artwork = fs.readFileSync(
    "src/components/molecules/ProductArtwork.tsx",
    "utf8",
  );
  assert.match(artwork, /const editorialCampaign/);
  assert.match(artwork, /!editorialCampaign/);
  assert.match(artwork, /13_9am\.jpg/);
});

test("product pixels stay above decorative effects without color blending", () => {
  const css = fs.readFileSync("src/styles/product-artwork.css", "utf8");
  const imageRule = css.match(/\.product-artwork__image\s*\{([\s\S]*?)\}/)?.[1] ?? "";
  const packshotRule = css.match(
    /\.product-artwork--packshot \.product-artwork__image\s*\{([\s\S]*?)\}/,
  )?.[1] ?? "";

  assert.match(imageRule, /z-index:\s*5/);
  assert.match(imageRule, /filter:\s*none/);
  assert.doesNotMatch(packshotRule, /mix-blend-mode/);
  assert.match(packshotRule, /filter:\s*none/);
  assert.doesNotMatch(packshotRule, /background:/);
});

test("opaque packshots use one clean neutral canvas without decorative seams", () => {
  const css = fs.readFileSync("src/styles/product-artwork.css", "utf8");
  assert.match(css, /\.product-artwork--packshot\s*\{[^}]*background:\s*#f6f3ed/s);
  assert.match(
    css,
    /\.product-artwork--packshot \.product-artwork__(?:halo|architecture)[\s\S]*display:\s*none/,
  );
});
