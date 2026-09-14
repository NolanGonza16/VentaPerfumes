import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const css = fs.readFileSync("src/styles/catalog.css", "utf8");

test("mobile filters stay above browser and system safe areas", () => {
  const mobile = css.match(
    /@media \(max-width: 767px\) \{([\s\S]*?)\n\}/,
  )?.[1] ?? "";

  assert.match(mobile, /\.filters-expanded\s*\{[\s\S]*?position:\s*fixed/);
  assert.match(mobile, /bottom:\s*max\([^;]*safe-area-inset-bottom/);
  assert.match(mobile, /max-height:\s*calc\(100dvh/);
  assert.match(mobile, /overflow-y:\s*auto/);
});

test("mobile filter selects use a readable single-column layout", () => {
  assert.match(
    css,
    /@media \(max-width: 767px\)[\s\S]*?\.filter-selects\s*\{[^}]*grid-template-columns:\s*1fr/s,
  );
  assert.match(
    css,
    /@media \(max-width: 767px\)[\s\S]*?\.filter-selects label\s*\{[^}]*font-size:\s*0\.75rem/s,
  );
});

test("mobile cards keep one visible detail affordance", () => {
  assert.match(
    css,
    /@media \(max-width: 767px\)[\s\S]*?\.card-action\s*\{[^}]*display:\s*none/s,
  );
  assert.doesNotMatch(
    css,
    /@media \(max-width: 767px\)[\s\S]*?\.card-image-arrow\s*\{[^}]*display:\s*none/s,
  );
});
