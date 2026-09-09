import { familias, ocasiones } from "../data/perfumes.ts";
import type { Availability, Perfume, ProductType } from "../data/perfumes.ts";
import { formatColones } from "./prices.ts";

export const CATALOG_IMAGE_FALLBACK = "/images/perfume-placeholder.svg";
const CATALOG_TIMEOUT_MS = 12000;
const fields =
  "id, slug, nombre, marca, precio_crc, imagen_url, familia, genero, ocasiones, acordes, notas_salida, notas_corazon, notas_fondo, duracion, proyeccion, estela, valoracion, descripcion, disponibilidad, concentracion, tamano_ml, fuentes, tipo_producto, presentacion_proveedor, origen_ref, ficha_estado";

const text = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";
const strings = (value: unknown): string[] =>
  Array.isArray(value) ? [...new Set(value.map(text).filter(Boolean))] : [];
const numeric = (value: unknown): number | null => {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && !/^\d+(?:\.\d+)?$/.test(value.trim()))
    return null;
  const result = Number(value);
  return Number.isFinite(result) && result >= 0 ? result : null;
};
const rating = (value: unknown): number => Math.min(5, numeric(value) ?? 0);
const enumValue = <T extends string>(
  value: unknown,
  values: readonly T[],
  fallback: T,
): T => values.find((candidate) => candidate === value) ?? fallback;

export function normalizeImageUrl(value: unknown): string {
  const image = text(value);
  if (image.startsWith("/") && !image.startsWith("//") && !image.includes("\\"))
    return image;
  try {
    const url = new URL(image);
    if (url.protocol === "https:") return url.href;
  } catch {
    /* Invalid images use the local brand fallback. */
  }
  return CATALOG_IMAGE_FALLBACK;
}

function parseAccords(value: unknown): Perfume["acordes"] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.flatMap((item) => {
    if (typeof item !== "object" || item === null) return [];
    const name = text(item.nombre);
    if (!name || seen.has(name)) return [];
    seen.add(name);
    return [{ nombre: name, emoji: text(item.emoji) }];
  });
}

/** Validate the API boundary so a malformed record cannot break the detail view. */
export function normalizeCatalogRow(value: unknown): Perfume | null {
  if (typeof value !== "object" || value === null) return null;
  const row = value as Record<string, unknown>;
  const id = text(row.slug) || text(row.id);
  const name = text(row.nombre);
  const brand = text(row.marca);
  const price = numeric(row.precio_crc);
  if (!id || !name || !brand || price === null) return null;
  const availability = enumValue<Availability>(
    row.disponibilidad,
    ["disponible", "bajo_pedido", "agotado"],
    "bajo_pedido",
  );
  return {
    id,
    nombre: name,
    marca: brand,
    precioCrc: price,
    precio: formatColones(price),
    concentracion: text(row.concentracion) || undefined,
    tamanoMl: numeric(row.tamano_ml) || undefined,
    tipoProducto: enumValue<ProductType>(
      row.tipo_producto,
      ["Perfume", "Tester", "Decant", "Miniatura", "Estuche", "Corporal"],
      "Perfume",
    ),
    presentacionProveedor: text(row.presentacion_proveedor) || undefined,
    origenRef: numeric(row.origen_ref) || undefined,
    fichaEstado: enumValue<NonNullable<Perfume["fichaEstado"]>>(
      row.ficha_estado,
      ["pendiente", "parcial", "verificada", "requiere_revision"],
      "pendiente",
    ),
    fuentes: Array.isArray(row.fuentes)
      ? row.fuentes.flatMap((source) => {
          if (!source || typeof source !== "object") return [];
          const url = normalizeImageUrl(source.url);
          if (!url.startsWith("https://") || !text(source.titulo)) return [];
          return [
            { titulo: text(source.titulo), url, fecha: text(source.fecha) },
          ];
        })
      : [],
    imagen: normalizeImageUrl(row.imagen_url),
    familia: familias.find((candidate) => candidate === row.familia),
    genero: (["Hombre", "Mujer", "Unisex"] as const).find(
      (candidate) => candidate === row.genero,
    ),
    ocasiones: strings(row.ocasiones).filter(
      (occasion): occasion is Perfume["ocasiones"][number] =>
        ocasiones.some((valid) => valid === occasion),
    ),
    acordes: parseAccords(row.acordes),
    notasSalida: strings(row.notas_salida),
    notasCorazon: strings(row.notas_corazon),
    notasFondo: strings(row.notas_fondo),
    duracion: rating(row.duracion),
    proyeccion: rating(row.proyeccion),
    estela: rating(row.estela),
    valoracion: rating(row.valoracion),
    descripcion: text(row.descripcion),
    disponible: availability === "disponible",
    disponibilidad: availability,
    esEjemplo: false,
  };
}

export function normalizeCatalogRows(value: unknown): Perfume[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.flatMap((row) => {
    const perfume = normalizeCatalogRow(row);
    if (!perfume || seen.has(perfume.id)) return [];
    seen.add(perfume.id);
    return [perfume];
  });
}

export class CatalogConfigurationError extends Error {
  constructor() {
    super("El catálogo todavía no está conectado.");
    this.name = "CatalogConfigurationError";
  }
}

export async function fetchCatalogPerfumes(
  signal?: AbortSignal,
): Promise<Perfume[]> {
  const { supabase } = await import("./supabase.ts");
  if (!supabase) throw new CatalogConfigurationError();
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) abort();
  signal?.addEventListener("abort", abort, { once: true });
  const timeout = setTimeout(abort, CATALOG_TIMEOUT_MS);
  try {
    const { data, error } = await supabase
      .from("catalog_perfumes")
      .select(fields)
      .eq("activo", true)
      .order("orden", { ascending: true })
      .order("marca", { ascending: true })
      .order("nombre", { ascending: true })
      .abortSignal(controller.signal);
    if (error) throw error;
    if (!Array.isArray(data))
      throw new Error("Respuesta de catálogo no válida.");
    const perfumes = normalizeCatalogRows(data);
    if (data.length && !perfumes.length)
      throw new Error("No se pudieron leer los perfumes del catálogo.");
    return perfumes;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
}
