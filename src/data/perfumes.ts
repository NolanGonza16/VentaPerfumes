export type OlfactoryFamily =
  | "Amaderado"
  | "Oriental"
  | "Floral"
  | "Cítrico"
  | "Fresco"
  | "Aromático"
  | "Dulce"
  | "Especiado"
  | "Marino"
  | "Ámbar";

export type Occasion =
  "Diario" | "Oficina" | "Noche" | "Citas" | "Eventos especiales";
export type Availability = "disponible" | "bajo_pedido" | "agotado";

export interface Perfume {
  id: string;
  nombre: string;
  marca: string;
  precio: string;
  /** Use this value for comparisons; precio is presentation only. */
  precioCrc: number;
  concentracion?: string;
  tamanoMl?: number;
  fuentes?: { titulo: string; url: string; fecha: string }[];
  imagen: string;
  familia: OlfactoryFamily;
  ocasiones: Occasion[];
  acordes: { emoji: string; nombre: string }[];
  notasSalida: string[];
  notasCorazon: string[];
  notasFondo: string[];
  duracion: number;
  proyeccion: number;
  estela: number;
  valoracion: number;
  descripcion: string;
  disponible: boolean;
  disponibilidad: Availability;
  esEjemplo?: boolean;
  genero: "Hombre" | "Mujer" | "Unisex";
}

export const familias: OlfactoryFamily[] = [
  "Amaderado",
  "Oriental",
  "Floral",
  "Cítrico",
  "Fresco",
  "Aromático",
  "Dulce",
  "Especiado",
  "Marino",
  "Ámbar",
];

export const ocasiones: Occasion[] = [
  "Diario",
  "Oficina",
  "Noche",
  "Citas",
  "Eventos especiales",
];
