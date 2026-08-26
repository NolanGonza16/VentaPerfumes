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

export type Occasion = "Diario" | "Oficina" | "Noche" | "Citas" | "Eventos especiales";

export interface Perfume {
  id: string;
  nombre: string;
  marca: string;
  precio: string;
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
  genero: "Hombre" | "Mujer" | "Unisex";
}

export const perfumes: Perfume[] = [
  {
    id: "sauvage-elixir",
    nombre: "Sauvage Elixir",
    marca: "Dior",
    precio: "₡85.000",
    imagen:
      "https://images.unsplash.com/photo-1761329842950-f3551938e4da?w=600&h=800&fit=crop&auto=format",
    familia: "Amaderado",
    ocasiones: ["Noche", "Citas", "Eventos especiales"],
    acordes: [
      { emoji: "🔥", nombre: "Especiado" },
      { emoji: "🌲", nombre: "Amaderado" },
      { emoji: "🍯", nombre: "Dulce" },
      { emoji: "🟠", nombre: "Ámbar" },
    ],
    notasSalida: ["Cardamomo", "Pomelo", "Pimienta de Sichuan"],
    notasCorazon: ["Elemi", "Nuez moscada", "Canela"],
    notasFondo: ["Sándalo", "Patchouli", "Labdanum"],
    duracion: 5,
    proyeccion: 4,
    estela: 5,
    valoracion: 4.9,
    descripcion:
      "Una fragancia intensa y sofisticada que combina especias exóticas con maderas profundas. Creada para quienes buscan una presencia magnética e ineludible.",
    disponible: true,
    genero: "Hombre",
  },
  {
    id: "baccarat-rouge",
    nombre: "Baccarat Rouge 540",
    marca: "Maison Francis Kurkdjian",
    precio: "₡142.000",
    imagen:
      "https://images.unsplash.com/photo-1627933234009-0f5ce6eb4e3a?w=600&h=800&fit=crop&auto=format",
    familia: "Ámbar",
    ocasiones: ["Noche", "Eventos especiales", "Citas"],
    acordes: [
      { emoji: "🍦", nombre: "Avainillado" },
      { emoji: "🌸", nombre: "Floral" },
      { emoji: "🟠", nombre: "Ámbar" },
      { emoji: "🌲", nombre: "Amaderado" },
    ],
    notasSalida: ["Azafrán", "Jazmín"],
    notasCorazon: ["Ambroxan", "Cedro", "Fresía"],
    notasFondo: ["Almizcle", "Madera de oud", "Brea"],
    duracion: 5,
    proyeccion: 5,
    estela: 5,
    valoracion: 4.8,
    descripcion:
      "El perfume más deseado del mundo. Una composición etérea que mezcla floral, amaderado y ámbar en una sinfonía luminosa imposible de olvidar.",
    disponible: true,
    genero: "Unisex",
  },
  {
    id: "oud-wood",
    nombre: "Oud Wood",
    marca: "Tom Ford",
    precio: "₡128.000",
    imagen:
      "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&h=800&fit=crop&auto=format",
    familia: "Oriental",
    ocasiones: ["Noche", "Citas", "Eventos especiales"],
    acordes: [
      { emoji: "🌲", nombre: "Amaderado" },
      { emoji: "🔥", nombre: "Especiado" },
      { emoji: "🟠", nombre: "Ámbar" },
      { emoji: "🌿", nombre: "Fresco" },
    ],
    notasSalida: ["Cardamomo", "Canela"],
    notasCorazon: ["Oud", "Sándalo", "Vetiver"],
    notasFondo: ["Ámbar", "Musgo de roble", "Tonka"],
    duracion: 5,
    proyeccion: 4,
    estela: 5,
    valoracion: 4.8,
    descripcion:
      "Una mezcla pionera de madera de oud con especias exóticas y maderas cremosas. Sofisticado, misterioso y absolutamente inconfundible.",
    disponible: true,
    genero: "Unisex",
  },
  {
    id: "aventus",
    nombre: "Aventus",
    marca: "Creed",
    precio: "₡165.000",
    imagen:
      "https://images.unsplash.com/photo-1723391962154-8a2b6299bc09?w=600&h=800&fit=crop&auto=format",
    familia: "Aromático",
    ocasiones: ["Oficina", "Diario", "Eventos especiales"],
    acordes: [
      { emoji: "🍍", nombre: "Frutal" },
      { emoji: "🌲", nombre: "Amaderado" },
      { emoji: "💨", nombre: "Ahumado" },
      { emoji: "🌿", nombre: "Fresco" },
    ],
    notasSalida: ["Piña", "Bergamota", "Manzana negra"],
    notasCorazon: ["Abedul", "Patchouli", "Rosa"],
    notasFondo: ["Almizcle", "Ámbar gris", "Vetiver"],
    duracion: 5,
    proyeccion: 4,
    estela: 4,
    valoracion: 4.7,
    descripcion:
      "El estándar de oro de los perfumes masculinos. Fresco, frutal y ahumado a la vez, Aventus es símbolo de éxito y ambición para generaciones de líderes.",
    disponible: true,
    genero: "Hombre",
  },
  {
    id: "chanel-n5",
    nombre: "N°5 L'Eau",
    marca: "Chanel",
    precio: "₡92.000",
    imagen:
      "https://images.unsplash.com/photo-1732828912093-a776288edfed?w=600&h=800&fit=crop&auto=format",
    familia: "Floral",
    ocasiones: ["Diario", "Oficina", "Eventos especiales"],
    acordes: [
      { emoji: "🌸", nombre: "Floral" },
      { emoji: "🌿", nombre: "Fresco" },
      { emoji: "🍋", nombre: "Cítrico" },
      { emoji: "🍦", nombre: "Avainillado" },
    ],
    notasSalida: ["Limón", "Neroli", "Naranja"],
    notasCorazon: ["Ylang-ylang", "Rosa de mayo", "Jazmín"],
    notasFondo: ["Sándalo blanco", "Cedro", "Almizcle"],
    duracion: 4,
    proyeccion: 3,
    estela: 4,
    valoracion: 4.6,
    descripcion:
      "La reinvención contemporánea del icónico Nº5. Ligero y luminoso, captura la esencia de la feminidad moderna con un alma atemporal e inconfundible.",
    disponible: true,
    genero: "Mujer",
  },
  {
    id: "black-orchid",
    nombre: "Black Orchid",
    marca: "Tom Ford",
    precio: "₡110.000",
    imagen:
      "https://images.unsplash.com/photo-1544006593-1a0b9255782d?w=600&h=800&fit=crop&auto=format",
    familia: "Oriental",
    ocasiones: ["Noche", "Citas"],
    acordes: [
      { emoji: "🌺", nombre: "Floral oscuro" },
      { emoji: "🟠", nombre: "Ámbar" },
      { emoji: "🌲", nombre: "Amaderado" },
      { emoji: "🔥", nombre: "Especiado" },
    ],
    notasSalida: ["Trufa negra", "Ylang-ylang", "Bergamota"],
    notasCorazon: ["Orquídea negra", "Flor de loto", "Fresia"],
    notasFondo: ["Patchouli", "Vetiver", "Incienso"],
    duracion: 5,
    proyeccion: 4,
    estela: 5,
    valoracion: 4.7,
    descripcion:
      "Una fragancia opulenta y oscura que evoca un mundo de seducción nocturna. Black Orchid es la definición de la audacia sofisticada de Tom Ford.",
    disponible: true,
    genero: "Unisex",
  },
  {
    id: "bleu-chanel",
    nombre: "Bleu de Chanel",
    marca: "Chanel",
    precio: "₡95.000",
    imagen:
      "https://images.unsplash.com/photo-1705936118918-870095881e61?w=600&h=800&fit=crop&auto=format",
    familia: "Aromático",
    ocasiones: ["Diario", "Oficina", "Citas"],
    acordes: [
      { emoji: "🌿", nombre: "Fresco" },
      { emoji: "🌲", nombre: "Amaderado" },
      { emoji: "🍋", nombre: "Cítrico" },
      { emoji: "🧊", nombre: "Marino" },
    ],
    notasSalida: ["Limón", "Naranja amarga", "Menta"],
    notasCorazon: ["Jengibre", "Nuez moscada", "Jazmín"],
    notasFondo: ["Incienso", "Cedro", "Sándalo"],
    duracion: 4,
    proyeccion: 4,
    estela: 4,
    valoracion: 4.6,
    descripcion:
      "La libertad y la elegancia destiladas en una fragancia. Bleu de Chanel es el equilibrio perfecto entre frescura cítrica y profundidad amaderada.",
    disponible: true,
    genero: "Hombre",
  },
  {
    id: "flowerbomb",
    nombre: "Flowerbomb",
    marca: "Viktor & Rolf",
    precio: "₡78.000",
    imagen:
      "https://images.unsplash.com/photo-1647507653704-bde7f2d6dbf0?w=600&h=800&fit=crop&auto=format",
    familia: "Floral",
    ocasiones: ["Diario", "Citas", "Eventos especiales"],
    acordes: [
      { emoji: "🌸", nombre: "Floral" },
      { emoji: "🍦", nombre: "Avainillado" },
      { emoji: "🟠", nombre: "Ámbar" },
      { emoji: "🌿", nombre: "Fresco" },
    ],
    notasSalida: ["Bergamota", "Té verde"],
    notasCorazon: ["Jazmín sambac", "Rosa centifolia", "Orquídea"],
    notasFondo: ["Patchouli", "Almizcle", "Vainilla"],
    duracion: 4,
    proyeccion: 4,
    estela: 4,
    valoracion: 4.5,
    descripcion:
      "Una explosión de feminidad y elegancia floral. Flowerbomb envuelve con su bouquet irresistible, dejando una estela memorable que conquista corazones.",
    disponible: true,
    genero: "Mujer",
  },
  {
    id: "tobacco-oud",
    nombre: "Tobacco Oud",
    marca: "Tom Ford",
    precio: "₡135.000",
    imagen:
      "https://images.unsplash.com/photo-1643797517590-c44cb552ddcc?w=600&h=800&fit=crop&auto=format",
    familia: "Oriental",
    ocasiones: ["Noche", "Eventos especiales"],
    acordes: [
      { emoji: "🚬", nombre: "Tabaco" },
      { emoji: "🌲", nombre: "Amaderado" },
      { emoji: "🟠", nombre: "Ámbar" },
      { emoji: "🔥", nombre: "Especiado" },
    ],
    notasSalida: ["Tabaco turco", "Canela china"],
    notasCorazon: ["Oud", "Rosa", "Cuero"],
    notasFondo: ["Ámbar gris", "Vainilla", "Cedro"],
    duracion: 5,
    proyeccion: 5,
    estela: 5,
    valoracion: 4.8,
    descripcion:
      "Un viaje a los mercados especiados de Oriente Medio. Tabaco ahumado, oud misterioso y ámbar cálido crean una fragancia de extraordinaria profundidad y poder.",
    disponible: false,
    genero: "Unisex",
  },
  {
    id: "la-vie-est-belle",
    nombre: "La Vie Est Belle",
    marca: "Lancôme",
    precio: "₡72.000",
    imagen:
      "https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=600&h=800&fit=crop&auto=format",
    familia: "Dulce",
    ocasiones: ["Diario", "Citas", "Oficina"],
    acordes: [
      { emoji: "🍦", nombre: "Avainillado" },
      { emoji: "🌸", nombre: "Floral" },
      { emoji: "🍬", nombre: "Gourmand" },
      { emoji: "🟠", nombre: "Ámbar" },
    ],
    notasSalida: ["Grosellas negras", "Pera"],
    notasCorazon: ["Iris", "Jazmín", "Lirio del valle"],
    notasFondo: ["Pralinés", "Vainilla", "Patchouli"],
    duracion: 4,
    proyeccion: 3,
    estela: 4,
    valoracion: 4.4,
    descripcion:
      "La vida es bella, y este perfume lo celebra. Una fragancia cálida y dulce que emana felicidad genuina, envolviendo con sus notas florales y gourmand irresistibles.",
    disponible: true,
    genero: "Mujer",
  },
];

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
