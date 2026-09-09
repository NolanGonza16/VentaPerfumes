import assert from "node:assert/strict"
import test from "node:test"
import { perfumes as examples } from "./fixtures/perfumes.ts"
import {
  CatalogConfigurationError,
  CATALOG_IMAGE_FALLBACK,
  normalizeCatalogRow,
  normalizeCatalogRows,
  normalizeImageUrl,
} from "../src/lib/catalog.ts"
import {
  filterPerfumes,
  getCatalogBrands,
  getPriceBounds,
  getVisiblePerfumes,
  parsePrice,
  perfumePrice,
} from "../src/lib/prices.ts"
import { createCatalogStore } from "../src/hooks/useCatalog.ts"

const validRow = {
  id: "real-id",
  slug: "real-perfume",
  nombre: "Perfume real",
  marca: "Casa",
  precio_crc: "85000",
  familia: "Amaderado",
  genero: "Unisex",
  disponibilidad: "disponible",
}

test("malformed optional API fields cannot crash fragrance details", () => {
  const perfume = normalizeCatalogRow({
    ...validRow,
    ocasiones: null,
    notas_salida: null,
    notas_corazon: { bad: "shape" },
    notas_fondo: [" Vainilla ", null, 4, "Vainilla"],
    acordes: [
      null,
      { nombre: "Ámbar" },
      { nombre: "Ámbar", emoji: "x" },
      { emoji: "y" },
    ],
    duracion: 12,
    proyeccion: "4",
    estela: -2,
    valoracion: "NaN",
    imagen_url: "javascript:alert(1)",
  })
  assert.ok(perfume)
  assert.equal(perfume.precioCrc, 85000)
  assert.deepEqual(perfume.ocasiones, [])
  assert.deepEqual(perfume.notasSalida, [])
  assert.deepEqual(perfume.notasCorazon, [])
  assert.deepEqual(perfume.notasFondo, ["Vainilla"])
  assert.deepEqual(perfume.acordes, [{ nombre: "Ámbar", emoji: "" }])
  assert.deepEqual(
    [perfume.duracion, perfume.proyeccion, perfume.estela, perfume.valoracion],
    [5, 4, 0, 0],
  )
  assert.equal(perfume.imagen, CATALOG_IMAGE_FALLBACK)
  assert.equal(perfume.esEjemplo, false)
})

test("pending catalog rows preserve unknown profile fields and product presentation", () => {
  const perfume = normalizeCatalogRow({
    ...validRow,
    familia: null,
    genero: null,
    tipo_producto: "Tester",
    presentacion_proveedor: "TESTER CASA PERFUME EDP 100ML",
    origen_ref: 42,
    ficha_estado: "pendiente",
  })
  assert.ok(perfume)
  assert.equal(perfume.familia, undefined)
  assert.equal(perfume.genero, undefined)
  assert.equal(perfume.tipoProducto, "Tester")
  assert.equal(perfume.presentacionProveedor, "TESTER CASA PERFUME EDP 100ML")
  assert.equal(perfume.origenRef, 42)
  assert.equal(perfume.fichaEstado, "pendiente")
})

test("sold-out stock is preserved; missing availability is never advertised in stock", () => {
  assert.equal(
    normalizeCatalogRow({ ...validRow, disponibilidad: "agotado" })
      ?.disponibilidad,
    "agotado",
  )
  assert.equal(
    normalizeCatalogRow({ ...validRow, disponibilidad: "agotado" })?.disponible,
    false,
  )
  assert.equal(
    normalizeCatalogRow({ ...validRow, disponibilidad: "unknown" })
      ?.disponibilidad,
    "bajo_pedido",
  )
})

test("invalid core data is rejected and duplicate IDs do not reach React keys", () => {
  assert.equal(normalizeCatalogRow(null), null)
  assert.equal(normalizeCatalogRow({ ...validRow, precio_crc: null }), null)
  assert.equal(normalizeCatalogRow({ ...validRow, precio_crc: -1 }), null)
  assert.equal(normalizeCatalogRow({ ...validRow, nombre: " " }), null)
  assert.equal(normalizeCatalogRows([null, validRow, validRow]).length, 1)
})

test("image URLs accept secure assets and local fallbacks only", () => {
  assert.equal(
    normalizeImageUrl("https://images.example.com/fragrance.webp"),
    "https://images.example.com/fragrance.webp",
  )
  assert.equal(
    normalizeImageUrl("/images/fragrance.webp"),
    "/images/fragrance.webp",
  )
  for (const value of [
    null,
    "",
    "//external.example/a.jpg",
    "http://external.example/a.jpg",
    "data:text/html,<h1>x</h1>",
  ]) {
    assert.equal(normalizeImageUrl(value), CATALOG_IMAGE_FALLBACK)
  }
})

test("colón parsing handles separators and cents without multiplying prices", () => {
  for (const value of [
    85000,
    "₡85.000",
    "₡85 000,00",
    "CRC 85,000.00",
    "85000.00",
    "85000",
  ]) {
    assert.equal(parsePrice(value), 85000, String(value))
  }
  assert.equal(parsePrice("₡85.000,50"), 85000.5)
  assert.equal(parsePrice(0), 0)
  for (const value of [
    null,
    "",
    "consultar",
    -10,
    Infinity,
    "₡-5000",
    "85 mil",
    "12.3456",
  ]) {
    assert.equal(parsePrice(value), null, String(value))
  }
  assert.equal(perfumePrice({ precioCrc: 12345, precio: "₡99.999" }), 12345)
})

test("search combines separate words across brand and notes without requiring accents", () => {
  assert.deepEqual(
    filterPerfumes(examples, { query: "  LANCOME vainilla " }).map((p) => p.id),
    ["la-vie-est-belle"],
  )
  assert.deepEqual(
    filterPerfumes(examples, { query: "LANCOME impossible" }),
    [],
  )
  assert.ok(filterPerfumes(examples, { query: "citrico" }).length > 0)
})

test("search returns only records containing every accent-insensitive term", () => {
  const items = [
    {
      ...examples[0],
      id: "mandarin-sky",
      nombre: "Mandarín Sky",
      notasSalida: ["Mandarína", "Bergamota"],
    },
    {
      ...examples[1],
      id: "unrelated",
      nombre: "Vanilla Night",
      notasSalida: ["Vainilla"],
    },
  ]
  assert.deepEqual(
    filterPerfumes(items, { query: "  MANDARIN sky " }).map((p) => p.id),
    ["mandarin-sky"],
  )
})

test("product type and accent-insensitive brand filters combine with search", () => {
  const items = [
    {
      ...examples[0],
      id: "afnan-perfume",
      nombre: "Sauvage",
      marca: "Afnán",
      tipoProducto: "Perfume" as const,
    },
    {
      ...examples[1],
      id: "afnan-tester",
      nombre: "Sauvage",
      marca: "Afnán",
      tipoProducto: "Tester" as const,
    },
    {
      ...examples[2],
      id: "dior-perfume",
      nombre: "Sauvage",
      marca: "Dior",
      tipoProducto: "Perfume" as const,
    },
  ]
  assert.deepEqual(
    filterPerfumes(items, {
      brand: "AFNAN",
      productType: "Perfume",
      query: "sauvage",
    }).map((p) => p.id),
    ["afnan-perfume"],
  )
})

test("catalog brands are unique and alphabetically sorted", () => {
  const items = [
    { ...examples[0], marca: "Dior" },
    { ...examples[1], marca: "Afnan" },
    { ...examples[2], marca: "dior" },
  ]
  assert.deepEqual(getCatalogBrands(items), ["Afnan", "Dior"])
})

test("filters combine with AND and include exact numeric budget boundaries", () => {
  assert.deepEqual(
    filterPerfumes(examples, {
      family: "Dulce",
      occasion: "Diario",
      gender: "Mujer",
      minimumPrice: 72000,
      maximumPrice: 72000,
    }).map((p) => p.id),
    ["la-vie-est-belle"],
  )
  assert.deepEqual(
    filterPerfumes(examples, { query: "Lancome", maximumPrice: 71999 }),
    [],
  )
  assert.deepEqual(
    filterPerfumes(examples, { query: "Lancome", occasion: "Noche" }),
    [],
  )
  assert.ok(
    filterPerfumes(examples, { gender: "Hombre" }).some(
      (p) => p.genero === "Unisex",
    ),
  )
  assert.ok(
    filterPerfumes(examples, { gender: "Unisex" }).every(
      (p) => p.genero === "Unisex",
    ),
  )
})

test("sorting is stable, non-mutating and respects numeric prices", () => {
  const items = [
    { ...examples[0], id: "first", precioCrc: 90000 },
    { ...examples[1], id: "second", precioCrc: 50000 },
    { ...examples[2], id: "third", precioCrc: 90000 },
  ]
  assert.deepEqual(
    filterPerfumes(items, { sort: "price-asc" }).map((p) => p.id),
    ["second", "first", "third"],
  )
  assert.deepEqual(
    filterPerfumes(items, { sort: "price-desc" }).map((p) => p.id),
    ["first", "third", "second"],
  )
  assert.deepEqual(
    items.map((p) => p.id),
    ["first", "second", "third"],
  )
  assert.deepEqual(getPriceBounds([{ ...examples[0], precioCrc: 85000 }]), {
    minimum: 85000,
    maximum: 90000,
  })
})

test("large catalogs render in stable progressive slices", () => {
  const items = Array.from({ length: 60 }, (_, index) => ({
    ...examples[0],
    id: `item-${index}`,
  }))
  assert.deepEqual(
    getVisiblePerfumes(items, 24).map((item) => item.id),
    items.slice(0, 24).map((item) => item.id),
  )
  assert.equal(getVisiblePerfumes(items, 100).length, 60)
})

test("navigation and concurrent readers reuse one fresh catalog request", async () => {
  let requests = 0
  let time = 1000
  const store = createCatalogStore(
    async () => {
      requests++
      return [examples[0]]
    },
    () => time,
  )
  await Promise.all([store.load(), store.load(), store.load()])
  await store.load()
  assert.equal(requests, 1)
  assert.equal(store.getSnapshot().mode, "live")
  time += 5 * 60 * 1000 + 1
  await store.load()
  assert.equal(requests, 2)
})

test("empty database never substitutes demonstration products", async () => {
  const store = createCatalogStore(async () => [])
  await store.load()
  assert.equal(store.getSnapshot().mode, "live")
  assert.equal(store.getSnapshot().source, "empty")
  assert.equal(store.getSnapshot().isDemo, false)
  assert.deepEqual(store.getSnapshot().perfumes, [])
})

test("missing configuration stays usable and is distinct from network errors", async () => {
  const store = createCatalogStore(async () => {
    throw new CatalogConfigurationError()
  })
  await store.load()
  assert.equal(store.getSnapshot().mode, "offline")
  assert.equal(store.getSnapshot().source, "unconfigured")
  assert.equal(store.getSnapshot().loading, false)
})

test("offline retains last live records and retry recovers; no silent demo substitution", async () => {
  let failure = false
  const record = { ...examples[0], esEjemplo: false }
  const store = createCatalogStore(async () => {
    if (failure) throw new Error("network disconnected")
    return [record]
  })
  await store.load()
  failure = true
  await store.load(true)
  assert.equal(store.getSnapshot().mode, "offline")
  assert.equal(store.getSnapshot().source, "cache")
  assert.equal(store.getSnapshot().isDemo, false)
  assert.equal(store.getSnapshot().perfumes[0], record)
  assert.ok(store.getSnapshot().error)
  failure = false
  await store.load(true)
  assert.equal(store.getSnapshot().mode, "live")
  assert.equal(store.getSnapshot().error, null)
})

test("offline before first load stays empty and retries are throttled", async () => {
  let attempts = 0
  const store = createCatalogStore(async () => {
    attempts++
    throw new Error("offline")
  })
  await store.load()
  await store.load()
  assert.equal(attempts, 1)
  assert.equal(store.getSnapshot().mode, "offline")
  assert.equal(store.getSnapshot().source, "unavailable")
  assert.equal(store.getSnapshot().isDemo, false)
  assert.deepEqual(store.getSnapshot().perfumes, [])
  assert.equal(store.getSnapshot().loading, false)
})
