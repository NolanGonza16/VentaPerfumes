"""Merge conservative manufacturer matches into the public catalog artifact."""

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OFFICIAL_SOURCES = {"armaf", "lattafa", "bharara"}
# Same-name editions that still require a human decision.
REJECTED_ROWS = {52, 453, 495}

TRANSLATIONS = {
    "Agarwood (Oud)": "Madera de oud",
    "Aldehydes": "Aldehídos",
    "Almond": "Almendra",
    "Amber": "Ámbar",
    "Ambergris": "Ámbar gris",
    "Amberwood": "Madera de ámbar",
    "Ambroxan": "Ambroxan",
    "Apple": "Manzana",
    "Apricot": "Albaricoque",
    "Aquatic Accords": "Acordes acuáticos",
    "Artemisia": "Artemisa",
    "Balsam Fir": "Abeto balsámico",
    "Banana Cream": "Crema de banana",
    "Benzoin": "Benjuí",
    "Berga mot": "Bergamota",
    "Bergamot": "Bergamota",
    "Bergamot Italy": "Bergamota italiana",
    "Birch": "Abedul",
    "Biscuit": "Galleta",
    "Bitter Almond": "Almendra amarga",
    "Black Currant": "Grosella negra",
    "Black Current": "Grosella negra",
    "Black Pepper": "Pimienta negra",
    "Black Tea": "Té negro",
    "Blackcurrant": "Grosella negra",
    "Blood Orange": "Naranja sanguina",
    "Bulgarian Rose": "Rosa búlgara",
    "Cacao": "Cacao",
    "Cade Oil": "Aceite de cade",
    "Calabrian bergamot": "Bergamota de Calabria",
    "Candied Fruits": "Frutas confitadas",
    "Caramel": "Caramelo",
    "Cardamom": "Cardamomo",
    "Cashmeran": "Cachemira",
    "Cashmere Wood": "Madera de cachemira",
    "Cassis": "Cassis",
    "Cedar": "Cedro",
    "Cedar wood": "Madera de cedro",
    "Cedarwood": "Cedro",
    "Cherry": "Cereza",
    "Chilling Cola": "Cola refrescante",
    "Cinnamon": "Canela",
    "Cinnamon Bark": "Corteza de canela",
    "Cinnamon Leaf": "Hoja de canela",
    "Citron": "Cidra",
    "Citrus Notes": "Notas cítricas",
    "Citruses": "Cítricos",
    "Cloves": "Clavo de olor",
    "Coconut": "Coco",
    "Coconut Water": "Agua de coco",
    "Coffee": "Café",
    "Coriander": "Cilantro",
    "Cypress": "Ciprés",
    "Dates": "Dátiles",
    "Dry Amber": "Ámbar seco",
    "Dry Wood": "Maderas secas",
    "Dulce De Leche": "Dulce de leche",
    "Dulce de Leche": "Dulce de leche",
    "Egyptian Jasmine": "Jazmín egipcio",
    "Elemi": "Elemí",
    "elemi": "Elemí",
    "Fig": "Higo",
    "Fir Resin": "Resina de abeto",
    "Frangipani": "Frangipani",
    "Geranium": "Geranio",
    "Geranium Egypt": "Geranio egipcio",
    "Ginger": "Jengibre",
    "Gourmand Accord": "Acorde gourmand",
    "Grape Fruit": "Toronja",
    "Grapefruit": "Toronja",
    "Green Apple": "Manzana verde",
    "Green Notes": "Notas verdes",
    "Green Tangerine": "Mandarina verde",
    "Guaiac Wood": "Madera de gaiac",
    "Guava": "Guayaba",
    "Gurjan Balsam": "Bálsamo de gurjan",
    "Heliotrope": "Heliotropo",
    "Honey": "Miel",
    "Honeysuckle": "Madreselva",
    "Incense": "Incienso",
    "Iris": "Iris",
    "Jasmine": "Jazmín",
    "Jasmine Sambac": "Jazmín sambac",
    "Juniper": "Enebro",
    "Labdanum": "Ládano",
    "Lactones": "Lactonas",
    "Lavender": "Lavanda",
    "Leather": "Cuero",
    "Lemon": "Limón",
    "Licorice": "Regaliz",
    "Lily of the Valley": "Lirio del valle",
    "Lily of the valley": "Lirio del valle",
    "Lily-of-the-Valley": "Lirio del valle",
    "Lime": "Lima",
    "Litchi": "Lichi",
    "Lotus": "Loto",
    "Magnolia": "Magnolia",
    "Mandarin": "Mandarina",
    "Mandarin Orange": "Mandarina",
    "Mango": "Mango",
    "Marigold": "Caléndula",
    "Marine Accords": "Acordes marinos",
    "Marine Notes": "Notas marinas",
    "Marshmallow": "Malvavisco",
    "Mascarpone Cheese": "Mascarpone",
    "Melon": "Melón",
    "Milk": "Leche",
    "Mint": "Menta",
    "Moss": "Musgo",
    "Musk": "Almizcle",
    "Myrrh": "Mirra",
    "Myrtle": "Mirto",
    "Neroli": "Neroli",
    "Nigerian Ginger": "Jengibre nigeriano",
    "Nutmeg": "Nuez moscada",
    "Nutty Notes": "Notas de frutos secos",
    "Oak moss": "Musgo de roble",
    "Oakmoss": "Musgo de roble",
    "Olibanum": "Olíbano",
    "Orange": "Naranja",
    "Orange Blossom": "Azahar",
    "Orange Oil": "Aceite de naranja",
    "Orchid": "Orquídea",
    "Orris": "Raíz de lirio",
    "Oud": "Oud",
    "Palo Santo": "Palo santo",
    "Passionfruit": "Maracuyá",
    "Patchouli": "Pachulí",
    "Pathouli": "Pachulí",
    "Peach": "Durazno",
    "Pear": "Pera",
    "Peony": "Peonía",
    "Pepper": "Pimienta",
    "Petitgrain": "Petitgrain",
    "Pimento": "Pimienta de Jamaica",
    "Pineapple": "Piña",
    "Pink Grapefruit": "Toronja rosada",
    "Pink Pepper": "Pimienta rosa",
    "Pistachio Cream": "Crema de pistacho",
    "Powdery Notes": "Notas atalcadas",
    "Praline": "Praliné",
    "Precious Woods": "Maderas preciosas",
    "Raspberry": "Frambuesa",
    "Red Fruits": "Frutos rojos",
    "Red fruit": "Frutos rojos",
    "Rhubarb": "Ruibarbo",
    "Rose": "Rosa",
    "Rosemary": "Romero",
    "Saffron": "Azafrán",
    "Sage": "Salvia",
    "Salt": "Sal",
    "Sandalwood": "Sándalo",
    "Sea Water": "Agua de mar",
    "Sicilian Orange": "Naranja siciliana",
    "Solar Notes": "Notas solares",
    "Spices": "Especias",
    "Spicy Notes": "Notas especiadas",
    "Spicy accords": "Acordes especiados",
    "Star Fruit": "Carambola",
    "Strawberry": "Fresa",
    "Sugar": "Azúcar",
    "Sugar Cane": "Caña de azúcar",
    "Sweet Notes": "Notas dulces",
    "Sweet Orange": "Naranja dulce",
    "Tagetes": "Tagetes",
    "Tagetus": "Tagetes",
    "Tangerine": "Mandarina",
    "Toasted Pistachio": "Pistacho tostado",
    "Tobacco": "Tabaco",
    "Toffee": "Toffee",
    "Tonka": "Haba tonka",
    "Tonka Bean": "Haba tonka",
    "Tropical Fruits": "Frutas tropicales",
    "Tubercose": "Nardo",
    "Tuberose": "Nardo",
    "Turkish Rose": "Rosa turca",
    "Vanilla": "Vainilla",
    "Vanilla Absolute": "Absoluto de vainilla",
    "Vanilla Bourbon": "Vainilla bourbon",
    "Vetiver": "Vetiver",
    "Violet": "Violeta",
    "Violet leaves": "Hojas de violeta",
    "Water Lily": "Nenúfar",
    "Whipped Cream": "Crema batida",
    "White Blossom": "Flores blancas",
    "White Flowers": "Flores blancas",
    "White Musk": "Almizcle blanco",
    "White Musk & Benzoin": "Almizcle blanco y benjuí",
    "White Wood": "Maderas blancas",
    "White wood": "Maderas blancas",
    "Wild Berries": "Bayas silvestres",
    "Woodsy Notes": "Notas amaderadas",
    "Woody": "Amaderado",
    "Woody Accords": "Acordes amaderados",
    "Woody Notes": "Notas amaderadas",
    "Woody Notes/ Ambroxan": "Notas amaderadas y ambroxan",
    "Ylang Ylang": "Ylang-ylang",
    "Ylang-Ylang": "Ylang-ylang",
}


def translate(note: str) -> str:
    return TRANSLATIONS.get(note, note)


def description(name: str, notes: dict[str, list[str]]) -> str:
    opening = notes.get("salida", [])[:3]
    heart = notes.get("corazon", [])[:3]
    base = notes.get("fondo", [])[:3]
    parts = []
    if opening:
        parts.append(f"abre con {', '.join(opening)}")
    if heart:
        parts.append(f"evoluciona hacia {', '.join(heart)}")
    if base:
        parts.append(f"descansa sobre un fondo de {', '.join(base)}")
    if not parts:
        return ""
    return f"{name} " + "; ".join(parts) + "."


def source_gender(source: dict) -> str | None:
    evidence = " ".join(
        [source.get("product_type", ""), source.get("title", ""), *source.get("tags", [])]
    ).lower()
    if re.search(r"\b(women|woman|femme)\b", evidence):
        return "Mujer"
    if re.search(r"\b(men|man|homme)\b", evidence):
        return "Hombre"
    if "unisex" in evidence:
        return "Unisex"
    return None


def run() -> None:
    catalog_path = ROOT / "catalog" / "august-products.json"
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    matches = json.loads(
        (ROOT / ".tmp-catalog-august" / "source-matches.json").read_text(
            encoding="utf-8"
        )
    )
    by_ref = {record["origen_ref"]: record for record in catalog["records"]}
    enriched = 0
    with_notes = 0
    for match in matches:
        ref = match["fila"]
        source = match["source"]
        if source["source"] not in OFFICIAL_SOURCES or ref in REJECTED_ROWS:
            continue
        record = by_ref[ref]
        images = [
            image
            for image in source.get("images", [])
            if image.get("src", "").startswith("https://")
            and (image.get("width") or 0) >= 800
            and (image.get("height") or 0) >= 800
        ]
        if images:
            record["imagen_url"] = images[0]["src"]
        translated = {
            tier: [translate(note) for note in match["notes"].get(tier, [])]
            for tier in ("salida", "corazon", "fondo")
        }
        if all(translated.values()):
            record["notas_salida"] = translated["salida"]
            record["notas_corazon"] = translated["corazon"]
            record["notas_fondo"] = translated["fondo"]
            record["descripcion"] = description(record["nombre"], translated)
            with_notes += 1
        record["genero"] = record["genero"] or source_gender(source)
        record["fuentes"] = [
            {
                "titulo": f"Ficha oficial de {record['marca']}",
                "url": source["url"],
                "fecha": "2026-09-09",
            }
        ]
        record["ficha_estado"] = "parcial"
        enriched += 1
    catalog["status"] = "manufacturer_enrichment_partial"
    catalog_path.write_text(
        json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps({"enriched": enriched, "with_notes": with_notes}))


if __name__ == "__main__":
    run()
