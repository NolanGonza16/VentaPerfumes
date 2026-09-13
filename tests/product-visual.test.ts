import assert from "node:assert/strict";
import test from "node:test";
import type { Perfume } from "../src/data/perfumes.ts";
import { getProductVisual } from "../src/lib/productVisual.ts";

const base = {
  id: "test",
  nombre: "Test",
  marca: "Marca",
  precio: "₡1",
  precioCrc: 1,
  imagen: "/images/perfume-placeholder.svg",
  ocasiones: [],
  acordes: [],
  notasSalida: [],
  notasCorazon: [],
  notasFondo: [],
  duracion: 3,
  proyeccion: 3,
  estela: 3,
  valoracion: 0,
  descripcion: "",
  disponible: true,
  disponibilidad: "disponible",
} satisfies Perfume;

test("marine profiles receive a cold aquatic art direction", () => {
  const visual = getProductVisual({
    ...base,
    familia: "Marino",
    acordes: [{ nombre: "acuático", emoji: "" }],
  });
  assert.equal(visual.scene, "aquatic");
});

test("gourmand profiles receive warm editorial lighting", () => {
  const visual = getProductVisual({
    ...base,
    familia: "Dulce",
    acordes: [{ nombre: "Vainilla", emoji: "" }],
  });
  assert.equal(visual.scene, "gourmand");
});

test("scene matching ignores accents and casing", () => {
  const visual = getProductVisual({
    ...base,
    familia: "Cítrico",
    acordes: [{ nombre: "CITRICO", emoji: "" }],
  });
  assert.equal(visual.scene, "citrus");
});

test("the resolver supports every editorial scene", () => {
  const cases = [
    ["Marino", "aquatic"],
    ["Cítrico", "citrus"],
    ["Floral", "floral"],
    ["Dulce", "gourmand"],
    ["Amaderado", "wood"],
    ["Oriental", "oriental"],
    ["Fresco", "fresh"],
    [undefined, "neutral"],
  ] as const;

  for (const [familia, expected] of cases) {
    assert.equal(
      getProductVisual({ ...base, familia } as Perfume).scene,
      expected,
    );
  }
});
