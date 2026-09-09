import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const catalog = JSON.parse(
  readFileSync(
    new URL("../catalog/august-products.json", import.meta.url),
    "utf8",
  ),
) as {
  records: Array<Record<string, unknown>>;
  excluded: Array<Record<string, unknown>>;
};

test("the public August catalog contains every sellable supplier row", () => {
  assert.equal(catalog.records.length, 731);
  assert.equal(catalog.records.filter((record) => record.activo).length, 731);
  assert.equal(catalog.excluded.length, 11);
  assert.equal(
    new Set(catalog.records.map((record) => record.origen_ref)).size,
    731,
  );
});

test("ambiguous supplier groups stay visible but are marked for review", () => {
  const adidas = catalog.records.find((record) => record.origen_ref === 6);
  assert.equal(adidas?.activo, true);
  assert.equal(adidas?.ficha_estado, "requiere_revision");
});

test("the public artifact has retail prices but never supplier costs", () => {
  for (const record of catalog.records) {
    assert.equal(typeof record.precio_crc, "number");
    assert.ok(Number(record.precio_crc) > 0);
    assert.equal("costo_crc_privado" in record, false);
  }
  const yslY = catalog.records.find((record) => record.origen_ref === 742);
  assert.equal(yslY?.nombre, "Y");
  assert.equal(yslY?.precio_crc, 74800);
});
