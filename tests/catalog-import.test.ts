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

test("verified manufacturer matches add Spanish notes and never reuse a wrong edition", () => {
  const auraFresh = catalog.records.find((record) => record.origen_ref === 43);
  assert.equal(auraFresh?.ficha_estado, "parcial");
  assert.match(String(auraFresh?.imagen_url), /^https:\/\/cdn\.shopify\.com\//);
  assert.deepEqual(auraFresh?.notas_salida, [
    "Limón",
    "Bergamota",
    "Cardamomo",
    "Carambola",
  ]);
  assert.match(JSON.stringify(auraFresh?.fuentes), /armaf\.com/);

  const ambiguousFakhar = catalog.records.find(
    (record) => record.origen_ref === 453,
  );
  assert.equal(ambiguousFakhar?.ficha_estado, "pendiente");
  assert.equal(ambiguousFakhar?.imagen_url, null);
});

test("verified retailer matches add only an exact-size visual reference", () => {
  const sauvage = catalog.records.find((record) => record.origen_ref === 221);
  assert.match(String(sauvage?.imagen_url), /^https:\/\/cdn\.shopify\.com\//);
  assert.equal(sauvage?.ficha_estado, "parcial");
  assert.deepEqual(sauvage?.notas_salida, []);
  assert.match(JSON.stringify(sauvage?.fuentes), /Referencia visual/);

  const wrongSize = catalog.records.find(
    (record) => record.origen_ref === 634,
  );
  assert.equal(wrongSize?.imagen_url, null);
  assert.equal(wrongSize?.ficha_estado, "pendiente");
});

test("reviewed Afnan records preserve supplier identity and sourced performance", () => {
  const nineAm = catalog.records.find((record) => record.origen_ref === 7);
  assert.equal(nineAm?.nombre, "9 AM");
  assert.equal(nineAm?.presentacion_proveedor, "AFNAN 9AM BLANCO EDP 100ML");
  assert.equal(nineAm?.duracion, null);

  const ninePm = catalog.records.find((record) => record.origen_ref === 10);
  assert.equal(ninePm?.duracion, 4);
  assert.equal(ninePm?.proyeccion, 4);
  assert.equal(ninePm?.estela, 4);
  assert.match(JSON.stringify(ninePm?.fuentes), /parfumo\.com/);

  const electric = catalog.records.find((record) => record.origen_ref === 11);
  assert.equal(electric?.nombre, "Turathi Electric");
  assert.equal(electric?.marca, "Afnan");
  assert.equal(electric?.tamano_ml, 90);
  assert.deepEqual(electric?.notas_salida, [
    "Pera",
    "Toronja rosada",
    "Mandarina",
    "Bergamota",
  ]);
  assert.equal(electric?.ficha_estado, "verificada");
});

test("reviewed profiles never alter exact Al Haramain presentations", () => {
  const femme = catalog.records.find((record) => record.origen_ref === 17);
  assert.equal(femme?.nombre, "L Aventure Femme");
  assert.equal(femme?.tamano_ml, 100);
  assert.deepEqual(femme?.notas_salida, [
    "Piña",
    "Grosella negra",
    "Bergamota",
    "Bayas silvestres",
  ]);

  const homme = catalog.records.find((record) => record.origen_ref === 18);
  assert.equal(homme?.nombre, "L Aventure Hombre");
  assert.deepEqual(homme?.notas_salida, ["Limón", "Bergamota", "Elemí"]);

  const goldSizes = catalog.records.filter(
    (record) => record.nombre === "Amber Oud Gold Edition",
  );
  assert.deepEqual(
    goldSizes.map((record) => record.tamano_ml),
    [120, 200],
  );
});
