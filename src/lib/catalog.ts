import type { OlfactoryFamily, Occasion, Perfume } from "../data/perfumes";
import { supabase } from "./supabase";

type CatalogRow = {
  id: string;
  slug: string;
  nombre: string;
  marca: string;
  precio_crc: number;
  imagen_url: string | null;
  familia: string;
  genero: string;
  ocasiones: string[];
  acordes: unknown;
  notas_salida: string[];
  notas_corazon: string[];
  notas_fondo: string[];
  duracion: number;
  proyeccion: number;
  estela: number;
  valoracion: number;
  descripcion: string;
  disponibilidad: "disponible" | "bajo_pedido" | "agotado";
};

const formatPrice = (value: number) => `₡${Math.round(value).toLocaleString("es-CR")}`;

const parseAccords = (value: unknown): Perfume["acordes"] => {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is { emoji: string; nombre: string } =>
      typeof item === "object" && item !== null &&
      typeof (item as { emoji?: unknown }).emoji === "string" &&
      typeof (item as { nombre?: unknown }).nombre === "string",
  );
};

export async function fetchCatalogPerfumes(): Promise<Perfume[]> {
  const { data, error } = await supabase
    .from("catalog_perfumes")
    .select("id, slug, nombre, marca, precio_crc, imagen_url, familia, genero, ocasiones, acordes, notas_salida, notas_corazon, notas_fondo, duracion, proyeccion, estela, valoracion, descripcion, disponibilidad")
    .eq("activo", true)
    .order("orden", { ascending: true })
    .order("marca", { ascending: true })
    .order("nombre", { ascending: true });

  if (error) throw error;

  return ((data ?? []) as CatalogRow[]).map((row) => ({
    id: row.slug || row.id,
    nombre: row.nombre,
    marca: row.marca,
    precio: formatPrice(row.precio_crc),
    imagen: row.imagen_url || "/og.png",
    familia: row.familia as OlfactoryFamily,
    genero: row.genero as Perfume["genero"],
    ocasiones: row.ocasiones as Occasion[],
    acordes: parseAccords(row.acordes),
    notasSalida: row.notas_salida,
    notasCorazon: row.notas_corazon,
    notasFondo: row.notas_fondo,
    duracion: row.duracion,
    proyeccion: row.proyeccion,
    estela: row.estela,
    valoracion: Number(row.valoracion),
    descripcion: row.descripcion,
    disponible: row.disponibilidad === "disponible",
  }));
}
