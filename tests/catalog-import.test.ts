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

const researchBatch200 = [1, 2, 3, 4].flatMap((part) =>
  JSON.parse(
    readFileSync(
      new URL(`../research/batch-251-part${part}.json`, import.meta.url),
      "utf8",
    ),
  ),
) as Array<Record<string, unknown>>;

const researchBatchNext200 = [1, 2, 3, 4].flatMap((part) =>
  JSON.parse(
    readFileSync(
      new URL(`../research/batch-451-part${part}.json`, import.meta.url),
      "utf8",
    ),
  ),
) as Array<Record<string, unknown>>;

const researchFinal91 = [1, 2].flatMap((part) =>
  JSON.parse(
    readFileSync(
      new URL(`../research/batch-652-part${part}.json`, import.meta.url),
      "utf8",
    ),
  ),
) as Array<Record<string, unknown>>;

const perfumeDetailSource = readFileSync(
  new URL("../src/components/organisms/PerfumeDetail.tsx", import.meta.url),
  "utf8",
);

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
  assert.equal(auraFresh?.ficha_estado, "verificada");
  assert.match(String(auraFresh?.imagen_url), /^https:\/\/cdn\.shopify\.com\//);
  assert.deepEqual(auraFresh?.notas_salida, [
    "Limón",
    "Bergamota",
    "Cardamomo",
    "Carambola",
  ]);
  assert.match(JSON.stringify(auraFresh?.fuentes), /armaf\.com/);

  const researchedFakhar = catalog.records.find(
    (record) => record.origen_ref === 453,
  );
  assert.equal(researchedFakhar?.ficha_estado, "verificada");
  assert.equal(researchedFakhar?.imagen_url, null);
  assert.deepEqual(researchedFakhar?.notas_salida, ["manzana", "jengibre", "bergamota"]);
});

test("verified visual matches can later receive exact fragrance research", () => {
  const sauvage = catalog.records.find((record) => record.origen_ref === 221);
  assert.match(String(sauvage?.imagen_url), /^https:\/\/cdn\.shopify\.com\//);
  assert.equal(sauvage?.ficha_estado, "verificada");
  assert.deepEqual(sauvage?.notas_salida, ["bergamota de Calabria", "pimienta"]);
  assert.match(JSON.stringify(sauvage?.fuentes), /Referencia visual/);
  assert.match(JSON.stringify(sauvage?.fuentes), /Investigación olfativa/);

  const wrongSize = catalog.records.find(
    (record) => record.origen_ref === 634,
  );
  assert.equal(wrongSize?.imagen_url, null);
  assert.equal(wrongSize?.ficha_estado, "verificada");
  assert.deepEqual(wrongSize?.notas_salida, ["Bergamota", "Limón"]);
  assert.doesNotMatch(JSON.stringify(wrongSize?.fuentes), /Moustache-Eau-de-Parfum/);
});

test("the consecutive 100-product research batch preserves every PDF identity", () => {
  const researched = catalog.records.slice(140, 240);
  assert.equal(researched.length, 100);
  assert.deepEqual(
    researched.map((record) => record.origen_ref),
    [
      147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159,
      160, 161, 162, 163, 164, 165, 166, 167, 168, 170, 171, 172, 173,
      174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186,
      187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199,
      200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 215,
      216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228,
      229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241,
      242, 243, 244, 245, 246, 247, 248, 249, 250,
    ],
  );
  assert.ok(researched.filter((record) => record.ficha_estado === "verificada").length >= 75);
  assert.ok(
    researched.filter((record) => record.notas_salida?.length).length >= 66,
    "later verified research may increase note coverage without changing PDF identity",
  );
});

test("the consecutive 200-product batch preserves PDF names, brands and sizes", () => {
  const catalogRows = catalog.records.slice(240, 440);
  assert.equal(researchBatch200.length, 200);
  assert.equal(catalogRows.length, 200);
  for (let index = 0; index < 200; index += 1) {
    const source = catalogRows[index];
    const researched = researchBatch200[index];
    assert.equal(researched.ref, source.origen_ref);
    assert.equal(researched.nombre, source.nombre);
    assert.equal(researched.marca, source.marca);
    assert.equal(
      String(researched.tamano_ml ?? "").replace(/ml$/i, ""),
      String(source.tamano_ml ?? ""),
    );
  }
  assert.equal(
    researchBatch200.filter(
      (record) =>
        record.notas_salida?.length &&
        record.notas_corazon?.length &&
        record.notas_fondo?.length,
    ).length,
    98,
  );
});

test("the next 200-product batch also preserves every supplier identity", () => {
  const catalogRows = catalog.records.slice(440, 640);
  assert.equal(researchBatchNext200.length, 200);
  assert.equal(catalogRows.length, 200);
  for (let index = 0; index < 200; index += 1) {
    const source = catalogRows[index];
    const researched = researchBatchNext200[index];
    assert.equal(researched.ref, source.origen_ref);
    assert.equal(researched.nombre, source.nombre);
    assert.equal(researched.marca, source.marca);
    assert.equal(
      String(researched.tamano_ml ?? "").replace(/ml$/i, ""),
      String(source.tamano_ml ?? ""),
    );
  }
  assert.equal(
    researchBatchNext200.filter(
      (record) =>
        record.notas_salida?.length &&
        record.notas_corazon?.length &&
        record.notas_fondo?.length,
    ).length,
    117,
  );
});

test("the final 91 catalog rows preserve every PDF identity", () => {
  const catalogRows = catalog.records.slice(640);
  assert.equal(researchFinal91.length, 91);
  assert.equal(catalogRows.length, 91);
  for (let index = 0; index < 91; index += 1) {
    const source = catalogRows[index];
    const researched = researchFinal91[index];
    assert.equal(researched.ref, source.origen_ref);
    assert.equal(researched.nombre, source.nombre);
    assert.equal(researched.marca, source.marca);
    assert.equal(
      String(researched.tamano_ml ?? "").replace(/ml$/i, ""),
      String(source.tamano_ml ?? ""),
    );
  }
});

test("product details keep research sources and editorial ratings internal", () => {
  assert.doesNotMatch(perfumeDetailSource, /Sobre esta fragancia/);
  assert.doesNotMatch(perfumeDetailSource, /Información contrastada/);
  assert.doesNotMatch(perfumeDetailSource, /Valoración editorial/);
  assert.doesNotMatch(perfumeDetailSource, /Referencia de la ficha/);
});

test("reviewed Afnan records preserve supplier identity and sourced performance", () => {
  const nineAm = catalog.records.find((record) => record.origen_ref === 7);
  assert.equal(nineAm?.nombre, "9 AM");
  assert.equal(nineAm?.presentacion_proveedor, "AFNAN 9AM BLANCO EDP 100ML");
  assert.equal(nineAm?.duracion, 3);

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

test("official Armaf pyramids receive traceable community or editorial performance", () => {
  const sourced = catalog.records.filter(
    (record) =>
      record.origen_ref >= 43 &&
      record.origen_ref <= 112 &&
      record.fuentes.some((source) => source.url.includes("armaf.com")) &&
      record.notas_salida.length > 0 &&
      record.notas_corazon.length > 0 &&
      record.notas_fondo.length > 0,
  );
  assert.ok(sourced.length >= 40);
  for (const record of sourced) {
    assert.ok(record.familia);
    assert.ok(record.acordes.length > 0);
    assert.ok(record.ocasiones.length > 0);
    assert.ok(record.descripcion.length > 40);
  }

  const aura = catalog.records.find((record) => record.origen_ref === 43);
  assert.equal(aura?.duracion, 3);
  assert.equal(aura?.proyeccion, 3);
  assert.equal(aura?.estela, 3);
  assert.ok(
    aura?.fuentes.some((source) =>
      source.url.includes("kaggle.com/datasets/ayushghawana/perfume-dataset"),
    ),
  );
});

test("reviewed Azzaro and adjacent designer rows keep exact editions", () => {
  const intense = catalog.records.find((record) => record.origen_ref === 115);
  const parfum = catalog.records.find((record) => record.origen_ref === 116);
  assert.equal(intense?.concentracion, "Eau de Parfum Intense");
  assert.deepEqual(intense?.notas_salida, ["Cardamomo"]);
  assert.equal(parfum?.concentracion, "Parfum");
  assert.deepEqual(parfum?.notas_salida, ["Jengibre"]);

  for (const ref of [113, 114, 115, 116, 117, 118, 119, 120, 133, 139, 140, 141, 144, 145, 146]) {
    const record = catalog.records.find((item) => item.origen_ref === ref);
    assert.equal(record?.ficha_estado, "verificada");
    assert.ok(record && record.notas_salida.length > 0);
    assert.ok(record && record.notas_corazon.length > 0);
    assert.ok(record && record.notas_fondo.length > 0);
  }
});
