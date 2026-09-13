import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const prepare = readFileSync("scripts/prepare_catalog_image_uploads.py", "utf8");
const renderer = readFileSync("scripts/render_image_updates_sql.py", "utf8");
const migration = readFileSync("supabase/migrations/20260912_catalog_image_metadata.sql", "utf8");

test("upload preparation validates filenames, dimensions and duplicate content", () => {
  assert.match(prepare, /\^\\d\{4\}-\[a-z0-9-\]\+\\\./);
  assert.match(prepare, /width < 800 or height < 1000/);
  assert.match(prepare, /sha256/);
  assert.match(prepare, /Duplicate image content/);
  assert.doesNotMatch(prepare, /service_role|SUPABASE_KEY/i);
});

test("SQL renderer publishes approved exact or neutral artwork only", () => {
  assert.match(renderer, /review_status.*approved/);
  assert.match(renderer, /needs_exact_source/);
  assert.match(renderer, /https:\/\//);
  assert.match(renderer, /where origen_ref = \{ref\}/);
  assert.doesNotMatch(renderer, /precio_proveedor|supplier_cost/i);
});

test("image metadata is publicly readable but not publicly writable", () => {
  assert.match(migration, /origen_ref integer primary key/);
  assert.match(migration, /enable row level security/);
  assert.match(migration, /for select/);
  assert.doesNotMatch(migration, /for (?:insert|update|delete|all)/i);
});
