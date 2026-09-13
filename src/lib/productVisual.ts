import type { Perfume } from "../data/perfumes.ts";

export type ProductScene =
  | "aquatic"
  | "citrus"
  | "floral"
  | "gourmand"
  | "wood"
  | "oriental"
  | "fresh"
  | "neutral";

export interface ProductVisual {
  scene: ProductScene;
  accent: string;
  accentSoft: string;
  surface: string;
  glow: string;
  objectPosition: string;
}

type SceneStyle = Omit<ProductVisual, "scene" | "objectPosition">;

const STYLES: Record<ProductScene, readonly SceneStyle[]> = {
  aquatic: [
    { accent: "#76c5d9", accentSoft: "#173d49", surface: "#09171d", glow: "#a9e9f5" },
    { accent: "#8aaee8", accentSoft: "#172a4d", surface: "#0a111f", glow: "#c6ddff" },
  ],
  citrus: [
    { accent: "#d8c35c", accentSoft: "#4b4014", surface: "#171508", glow: "#fff0a2" },
    { accent: "#b9d86c", accentSoft: "#314615", surface: "#101709", glow: "#e5ffab" },
  ],
  floral: [
    { accent: "#d898aa", accentSoft: "#4a202f", surface: "#190d12", glow: "#ffd4df" },
    { accent: "#b69ad7", accentSoft: "#352447", surface: "#130e1a", glow: "#eadbff" },
  ],
  gourmand: [
    { accent: "#d49b62", accentSoft: "#4a2917", surface: "#1b100a", glow: "#ffe0b5" },
    { accent: "#c98779", accentSoft: "#49221f", surface: "#190d0b", glow: "#ffd0c6" },
  ],
  wood: [
    { accent: "#a98259", accentSoft: "#38271a", surface: "#120e0a", glow: "#dbc09d" },
    { accent: "#8f765e", accentSoft: "#30251c", surface: "#100d0b", glow: "#cdb79f" },
  ],
  oriental: [
    { accent: "#d3aa57", accentSoft: "#4b3310", surface: "#151008", glow: "#ffe2a0" },
    { accent: "#c47d53", accentSoft: "#482016", surface: "#160b08", glow: "#ffc5a1" },
  ],
  fresh: [
    { accent: "#90c5a7", accentSoft: "#1d4434", surface: "#0b1712", glow: "#cff9df" },
    { accent: "#9dc9c4", accentSoft: "#1b403d", surface: "#0a1615", glow: "#d8fffa" },
  ],
  neutral: [
    { accent: "#c9a86d", accentSoft: "#41351f", surface: "#13110d", glow: "#f3dfb7" },
    { accent: "#b8aa93", accentSoft: "#39332a", surface: "#12100d", glow: "#e6dccb" },
  ],
};

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const includesAny = (haystack: string, needles: readonly string[]) =>
  needles.some((needle) => haystack.includes(needle));

const hash = (value: string) =>
  [...value].reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 0);

export function getProductVisual(perfume: Perfume): ProductVisual {
  const profile = normalize(
    [
      perfume.familia,
      ...perfume.acordes.map((accord) => accord.nombre),
      ...perfume.notasSalida,
      ...perfume.notasCorazon,
      ...perfume.notasFondo,
    ]
      .filter(Boolean)
      .join(" "),
  );

  let scene: ProductScene = "neutral";
  if (includesAny(profile, ["marino", "acuatic", "ocean", "ozonic", "sal marina"])) scene = "aquatic";
  else if (includesAny(profile, ["citric", "limon", "bergamota", "mandarina", "naranja", "pomelo"])) scene = "citrus";
  else if (includesAny(profile, ["floral", "rosa", "jazmin", "tuberosa", "peonia", "orquidea"])) scene = "floral";
  else if (includesAny(profile, ["gourmand", "dulce", "vainilla", "caramelo", "chocolate", "praline", "miel"])) scene = "gourmand";
  else if (includesAny(profile, ["amader", "cuero", "tabaco", "cedro", "vetiver", "sandalo"])) scene = "wood";
  else if (includesAny(profile, ["oriental", "ambar", "oud", "incienso", "especiad", "azafran"])) scene = "oriental";
  else if (includesAny(profile, ["fresco", "aromatic", "verde", "herbal", "lavanda"])) scene = "fresh";

  const variants = STYLES[scene];
  const variant = variants[hash(`${perfume.marca}:${perfume.nombre}`) % variants.length];

  return {
    scene,
    ...variant,
    objectPosition: "50% 50%",
  };
}
