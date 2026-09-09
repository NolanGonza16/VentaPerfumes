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

test("ambiguous Summer Essence stays unresolved while exact Banderas editions are enriched", () => {
  const ambiguous = catalog.records.find((record) => record.origen_ref === 25);
  assert.equal(ambiguous?.nombre, "Blue Seduccion Summer Essence");
  assert.equal(ambiguous?.ficha_estado, "requiere_revision");
  assert.deepEqual(ambiguous?.notas_salida, []);

  const women = catalog.records.find((record) => record.origen_ref === 28);
  assert.equal(women?.nombre, "Blue Seduction Mujer");
  assert.equal(women?.genero, "Mujer");
  assert.equal(women?.tamano_ml, 80);

  const power = catalog.records.find((record) => record.origen_ref === 30);
  assert.deepEqual(power?.notas_salida, ["Manzana", "Bergamota"]);
  assert.equal(power?.duracion, 3);
});

test("all Ariana Grande PDF rows have distinct, complete reviewed profiles", () => {
  const ariana = catalog.records.filter(
    (record) => record.origen_ref >= 31 && record.origen_ref <= 42,
  );
  assert.equal(ariana.length, 12);
  for (const record of ariana) {
    assert.equal(record.marca, "Ariana Grande");
    assert.equal(record.tamano_ml, 100);
    assert.equal(record.ficha_estado, "verificada");
    assert.ok(record.notas_salida.length > 0);
    assert.ok(record.notas_corazon.length > 0);
    assert.ok(record.notas_fondo.length > 0);
    assert.ok(record.descripcion.length > 30);
  }

  const cloud = ariana.find((record) => record.origen_ref === 33);
  const intense = ariana.find((record) => record.origen_ref === 32);
  assert.equal(cloud?.nombre, "Cloud");
  assert.equal(intense?.nombre, "Cloud 2.0 Intense");
  assert.deepEqual(cloud?.notas_fondo, ["Almizcle", "Notas amaderadas"]);
  assert.ok(intense?.notas_fondo.includes("Ambroxan"));

  const rem = ariana.find((record) => record.origen_ref === 39);
  const cherry = ariana.find((record) => record.origen_ref === 38);
  assert.deepEqual(rem?.notas_corazon, ["Lavanda", "Flor de pera"]);
  assert.deepEqual(cherry?.notas_salida, ["Cereza negra", "Madreselva"]);
});

test("reviewed Club de Nuit variants keep their exact identities and sizes", () => {
  const intense = catalog.records.filter(
    (record) => record.nombre === "Club De Nuit Intense Man",
  );
  assert.deepEqual(intense.map((record) => record.tamano_ml), [105, 150]);
  for (const record of intense) {
    assert.equal(record.ficha_estado, "verificada");
    assert.deepEqual(record.notas_corazon, ["Abedul", "Jazmín", "Rosa"]);
  }

  const iconic = catalog.records.find((record) => record.origen_ref === 49);
  const imperiale = catalog.records.find((record) => record.origen_ref === 50);
  const milestone = catalog.records.find((record) => record.origen_ref === 57);
  assert.equal(iconic?.genero, "Hombre");
  assert.equal(imperiale?.genero, "Mujer");
  assert.equal(milestone?.genero, "Unisex");
  assert.ok(imperiale?.notas_corazon.includes("Rosa turca"));
  assert.ok(milestone?.notas_salida.includes("Notas marinas"));
});
