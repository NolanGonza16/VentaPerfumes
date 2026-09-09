import type {
  Occasion,
  OlfactoryFamily,
  Perfume,
  ProductType,
} from "../data/perfumes.ts"

export const PRICE_STEP = 5000
const colonFormatter = new Intl.NumberFormat("es-CR", {
  maximumFractionDigits: 0,
})

export const formatColones = (value: number): string =>
  `₡${colonFormatter.format(value)}`

/** Legacy text import fallback. API prices must use numeric precio_crc instead. */
export function parsePrice(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) && value >= 0 ? value : null
  }
  if (typeof value !== "string") return null
  let text = value
    .trim()
    .replace(/^(?:₡|CRC)\s*/i, "")
    .replace(/\s/g, "")
  if (!text || !/^[\d.,]+$/.test(text)) return null
  // A group of exactly three digits is a thousands group, never cents.
  const separator = Math.max(text.lastIndexOf(","), text.lastIndexOf("."))
  if (separator >= 0 && text.length - separator - 1 <= 2) {
    const whole = text.slice(0, separator).replace(/[.,]/g, "")
    text = `${whole}.${text.slice(separator + 1)}`
  } else {
    if (!/^\d{1,3}(?:[.,]\d{3})+$/.test(text) && /[.,]/.test(text)) return null
    text = text.replace(/[.,]/g, "")
  }
  const amount = Number(text)
  return Number.isFinite(amount) && amount >= 0 ? amount : null
}

export function perfumePrice(
  perfume: Pick<Perfume, "precioCrc" | "precio">,
): number | null {
  return parsePrice(perfume.precioCrc) ?? parsePrice(perfume.precio)
}

export function getPriceBounds(
  perfumes: readonly Perfume[],
  step = PRICE_STEP,
) {
  const prices = perfumes
    .map(perfumePrice)
    .filter((price): price is number => price !== null)
  const increment = Number.isFinite(step) && step > 0 ? step : PRICE_STEP
  if (!prices.length) return { minimum: 0, maximum: 200000 }
  const minimum = Math.floor(Math.min(...prices) / increment) * increment
  // A nonzero span keeps the slider usable for a one-price catalog.
  const maximum = Math.max(
    minimum + increment,
    Math.ceil(Math.max(...prices) / increment) * increment,
  )
  return { minimum, maximum }
}

export const normalizeText = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()

export function getCatalogBrands(perfumes: readonly Perfume[]): string[] {
  const brands = new Map<string, string>()
  for (const perfume of perfumes) {
    const key = normalizeText(perfume.marca)
    if (key && !brands.has(key)) brands.set(key, perfume.marca.trim())
  }
  return [...brands.values()].sort((a, b) =>
    a.localeCompare(b, "es", { sensitivity: "base" }),
  )
}

export type CatalogSort = "featured" | "price-asc" | "price-desc" | "name"
export interface CatalogFilters {
  query?: string
  family?: OlfactoryFamily | null
  occasion?: Occasion | null
  gender?: Perfume["genero"] | null
  brand?: string | null
  productType?: ProductType | null
  minimumPrice?: number | null
  maximumPrice?: number | null
  sort?: CatalogSort
}

/** AND between filters and search terms; matching is accent-insensitive. */
export function filterPerfumes(
  perfumes: readonly Perfume[],
  filters: CatalogFilters = {},
): Perfume[] {
  const terms = normalizeText(filters.query ?? "")
    .split(/\s+/)
    .filter(Boolean)
  const result = perfumes.filter((perfume) => {
    const price = perfumePrice(perfume)
    if (
      filters.minimumPrice != null &&
      (price === null || price < filters.minimumPrice)
    )
      return false
    if (
      filters.maximumPrice != null &&
      (price === null || price > filters.maximumPrice)
    )
      return false
    if (filters.family && perfume.familia !== filters.family) return false
    if (
      filters.brand &&
      normalizeText(perfume.marca) !== normalizeText(filters.brand)
    )
      return false
    if (filters.productType && perfume.tipoProducto !== filters.productType)
      return false
    if (filters.occasion && !perfume.ocasiones.includes(filters.occasion))
      return false
    if (
      filters.gender &&
      perfume.genero !== filters.gender &&
      perfume.genero !== "Unisex"
    )
      return false
    if (!terms.length) return true
    const searchable = normalizeText(
      [
        perfume.nombre,
        perfume.marca,
        perfume.familia,
        perfume.tipoProducto,
        perfume.presentacionProveedor,
        perfume.descripcion,
        ...perfume.ocasiones,
        ...perfume.acordes.map((accord) => accord.nombre),
        ...perfume.notasSalida,
        ...perfume.notasCorazon,
        ...perfume.notasFondo,
      ].join(" "),
    )
    return terms.every((term) => searchable.includes(term))
  })
  // Array#sort is stable; equal prices retain the curated source order.
  if (filters.sort === "price-asc" || filters.sort === "price-desc") {
    const direction = filters.sort === "price-asc" ? 1 : -1
    result.sort((a, b) => {
      const first = perfumePrice(a)
      const second = perfumePrice(b)
      if (first === null) return second === null ? 0 : 1
      if (second === null) return -1
      return direction * (first - second)
    })
  } else if (filters.sort === "name") {
    result.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }),
    )
  }
  return result
}

export function getVisiblePerfumes<T>(
  items: readonly T[],
  visibleCount: number,
): T[] {
  return items.slice(0, Math.max(0, visibleCount))
}
