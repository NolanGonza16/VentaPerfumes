import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// Unicode diagonal arrows can become blue emoji tiles on iOS.
for (const file of [
  "../src/pages/HomePage.tsx",
  "../src/components/organisms/PerfumeDetail.tsx",
]) {
  test(`${file} uses the shared vector arrow, not an emoji glyph`, () => {
    const source = readFileSync(new URL(file, import.meta.url), "utf8");
    assert.doesNotMatch(source, /[\u2196-\u2199]/u);
    assert.match(source, /<Icon\s+name="arrow-up-right"/);
  });
}
