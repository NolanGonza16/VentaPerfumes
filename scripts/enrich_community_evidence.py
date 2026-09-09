"""Merge reviewed community performance evidence into exact catalog rows.

This file intentionally contains only manually reviewed matches. Public source URLs
are retained as provenance in the database, but are not rendered in the storefront.
"""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REVIEW_DATE = "2026-09-09"

REVIEWED = {
    1: {
        "familia": "Aromático",
        "genero": "Hombre",
        "ocasiones": ["Diario", "Oficina"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Cítrico", "Aromático", "Amaderado", "Almizclado"]],
        "notas_salida": ["Manzana", "Limón", "Naranja", "Petitgrain"],
        "notas_corazon": ["Cardamomo", "Romero", "Salvia", "Lavanda", "Rosa", "Geranio"],
        "notas_fondo": ["Musgo de roble", "Sándalo", "Vetiver", "Almizcle"],
        "descripcion": "Una colonia masculina fresca y segura, con salida cítrica, corazón aromático y un fondo limpio de maderas y almizcle. Versátil para el día y la oficina.",
        "fuentes": [("Ficha olfativa de Fragrantica", "https://www.fragrantica.com/perfume/Abercrombie-Fitch/Fierce-Cologne-64168.html")],
        "estado": "parcial",
    },
    2: {
        "familia": "Floral",
        "genero": "Mujer",
        "ocasiones": ["Diario", "Oficina"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Amaderado", "Aromático", "Floral", "Almizclado"]],
        "notas_salida": ["Bergamota", "Flor de cactus"],
        "notas_corazon": ["Lavanda", "Romero"],
        "notas_fondo": ["Sándalo", "Almizcle", "Vainilla"],
        "descripcion": "Una fragancia floral y amaderada de carácter natural, sereno y moderno. Su equilibrio aromático resulta cómodo para el uso diario y ambientes profesionales.",
        "fuentes": [("Ficha olfativa de Fragrantica", "https://www.fragrantica.com/perfume/Abercrombie-Fitch/Naturally-Fierce-68533.html")],
        "estado": "parcial",
    },
    7: {
        # Notes and gender are already verified against Afnan's product page.
        # The available community sample was too limited for defensible metrics.
        "fuentes": [
            ("Ficha oficial de Afnan", "https://us.afnan.com/products/9-am"),
            ("Opiniones de la comunidad en Parfumo", "https://www.parfumo.com/Perfumes/Afnan_Perfumes/9am"),
        ],
    },
    8: {
        "duracion": 4,
        "proyeccion": 4,
        "estela": 4,
        "valoracion": 3.7,
        "fuentes": [
            ("Ficha oficial de Afnan", "https://us.afnan.com/products/9-am-dive"),
            ("Valoraciones de la comunidad en Parfumo", "https://www.parfumo.com/Perfumes/Afnan_Perfumes/9am-dive"),
        ],
    },
    9: {
        "duracion": 4,
        "proyeccion": 4,
        "estela": 4,
        "fuentes": [
            ("Ficha oficial de Afnan", "https://afnan.com/products/9-pm-elixir"),
            ("Opiniones de la comunidad en Parfumo", "https://www.parfumo.com/Perfumes/Afnan_Perfumes/9pm-elixir"),
        ],
    },
    10: {
        "duracion": 4,
        "proyeccion": 4,
        "estela": 4,
        "valoracion": 4.0,
        "fuentes": [
            ("Ficha oficial de Afnan", "https://us.afnan.com/products/9-pm"),
            ("Valoraciones de la comunidad en Parfumo", "https://www.parfumo.com/Perfumes/Afnan_Perfumes/9pm"),
        ],
    },
    11: {
        "familia": "Floral",
        "genero": "Unisex",
        "ocasiones": ["Diario", "Oficina"],
        "acordes": [
            {"nombre": "Cítrico", "emoji": ""},
            {"nombre": "Frutal", "emoji": ""},
            {"nombre": "Almizclado", "emoji": ""},
            {"nombre": "Fresco", "emoji": ""},
        ],
        "notas_salida": ["Pera", "Toronja rosada", "Mandarina", "Bergamota"],
        "notas_corazon": ["Azahar", "Manzana", "Cedro"],
        "notas_fondo": ["Almizcle", "Ámbar", "Vainilla"],
        "duracion": 3,
        "proyeccion": 3,
        "estela": 3,
        "valoracion": 3.8,
        "descripcion": (
            "Una fragancia luminosa de cítricos y frutas jugosas que evoluciona "
            "hacia un fondo limpio de almizcle, ámbar y vainilla. Fresca, moderna "
            "y versátil para el día, la oficina y los momentos casuales."
        ),
        "fuentes": [
            ("Ficha olfativa de Fragrantica", "https://www.fragrantica.es/perfume/Afnan/Turathi-Electric-108244.html"),
            ("Valoraciones de la comunidad en Parfumo", "https://www.parfumo.com/Perfumes/Afnan_Perfumes/turathi-electric"),
        ],
    },
    12: {
        "genero": "Mujer",
        "fuentes": [("Ficha olfativa de Fragrantica", "https://www.fragrantica.com/perfume/Agatha-Ruiz-de-la-Prada/12-Gotas-de-Color-10454.html")],
        "estado": "parcial",
    },
    13: {
        "familia": "Ámbar",
        "genero": "Unisex",
        "ocasiones": ["Noche", "Citas", "Eventos especiales"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Ámbar", "Almizclado", "Oud", "Floral"]],
        "notas_salida": ["Oud", "Ámbar", "Almizcle"],
        "notas_corazon": ["Rosa", "Frambuesa", "Abedul", "Azafrán"],
        "notas_fondo": ["Benjuí", "Madera de ámbar", "Geranio"],
        "descripcion": "Una composición cálida y envolvente de ámbar, oud y almizcle, iluminada por rosa y frambuesa. Elegante y profunda para noches, citas y eventos especiales.",
        "fuentes": [("Presentación de la colección Musk de Al Haramain", "https://www.fragrantica.com/news/Al-Haramain-Musk-Series-Amber-Musk-Musk-Collection-Musk-Maliki-and-Royal-Musk-16284.html")],
        "estado": "parcial",
    },
    14: {
        "familia": "Oriental",
        "genero": "Unisex",
        "ocasiones": ["Noche", "Citas", "Eventos especiales"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Ámbar", "Especiado", "Rosa", "Oud"]],
        "notas_salida": ["Bergamota", "Azafrán", "Elemí"],
        "notas_corazon": ["Oud", "Rosa búlgara"],
        "notas_fondo": ["Almizcle blanco", "Haba tonka", "Ámbar"],
        "valoracion": 4.4,
        "descripcion": "Bergamota y azafrán abren una fragancia oriental intensa, con oud y rosa búlgara sobre un fondo cálido de ámbar, almizcle y haba tonka. Hecha para destacar de noche.",
        "fuentes": [("Catálogo oficial de Al Haramain", "https://shop.alharamainperfumes.com/E-Catalog/e-catalog.pdf"), ("Valoraciones de Fragrantica", "https://www.fragrantica.com/perfume/Al-Haramain-Perfumes/Amber-Oud-Dubai-Night-96481.html")],
        "estado": "verificada",
    },
    15: {
        "familia": "Oriental",
        "genero": "Unisex",
        "ocasiones": ["Noche", "Citas", "Eventos especiales"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Dulce", "Frutal", "Avainillado", "Ámbar"]],
        "notas_salida": ["Bergamota", "Notas verdes"],
        "notas_corazon": ["Melón", "Piña", "Ámbar", "Acorde gourmand"],
        "notas_fondo": ["Vainilla", "Almizcle", "Notas amaderadas"],
        "valoracion": 4.3,
        "descripcion": "Una fragancia oriental dulce y frutal, donde melón y piña se funden con vainilla, almizcle y maderas. Envolvente y llamativa para citas y ocasiones especiales.",
        "fuentes": [("Ficha y valoraciones de Fragrantica", "https://www.fragrantica.com/perfume/Al-Haramain-Perfumes/Amber-Oud-Gold-Edition-51816.html")],
        "estado": "parcial",
    },
    16: {
        "familia": "Oriental",
        "genero": "Unisex",
        "ocasiones": ["Noche", "Citas", "Eventos especiales"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Dulce", "Frutal", "Avainillado", "Ámbar"]],
        "notas_salida": ["Bergamota", "Notas verdes"],
        "notas_corazon": ["Melón", "Piña", "Ámbar", "Acorde gourmand"],
        "notas_fondo": ["Vainilla", "Almizcle", "Notas amaderadas"],
        "valoracion": 4.3,
        "descripcion": "Una fragancia oriental dulce y frutal, donde melón y piña se funden con vainilla, almizcle y maderas. Envolvente y llamativa para citas y ocasiones especiales.",
        "fuentes": [("Ficha y valoraciones de Fragrantica", "https://www.fragrantica.com/perfume/Al-Haramain-Perfumes/Amber-Oud-Gold-Edition-51816.html")],
        "estado": "parcial",
    },
    17: {
        "familia": "Floral",
        "genero": "Mujer",
        "ocasiones": ["Diario", "Oficina", "Citas"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Frutal", "Amaderado", "Floral", "Almizclado"]],
        "notas_salida": ["Piña", "Grosella negra", "Bergamota", "Bayas silvestres"],
        "notas_corazon": ["Cedro", "Fresia", "Rosa"],
        "notas_fondo": ["Almizcle", "Sándalo", "Ámbar", "Vainilla"],
        "valoracion": 3.8,
        "descripcion": "Frutas luminosas y flores elegantes descansan sobre almizcle, sándalo y vainilla. Una fragancia femenina segura y versátil para el día, la oficina o una cita.",
        "fuentes": [("Ficha y valoraciones de Fragrantica", "https://www.fragrantica.com/perfume/Al-Haramain-Perfumes/L-Aventure-Femme-51820.html")],
        "estado": "parcial",
    },
    18: {
        "familia": "Cítrico",
        "genero": "Hombre",
        "ocasiones": ["Diario", "Oficina"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Cítrico", "Fresco", "Amaderado", "Ahumado"]],
        "notas_salida": ["Limón", "Bergamota", "Elemí"],
        "notas_corazon": ["Notas amaderadas", "Jazmín", "Lirio del valle"],
        "notas_fondo": ["Pachulí", "Ámbar", "Almizcle"],
        "valoracion": 3.9,
        "descripcion": "Un perfil masculino cítrico y fresco con corazón amaderado y un fondo de pachulí, ámbar y almizcle. Seguro y pulido para el día y la oficina.",
        "fuentes": [("Ficha y valoraciones de Parfumo", "https://www.parfumo.com/Perfumes/Al_Haramain/L_Aventure"), ("Pirámide olfativa de Basenotes", "https://basenotes.com/fragrances/laventure-by-al-haramain.26151080")],
        "estado": "parcial",
    },
    19: {
        "familia": "Floral",
        "genero": "Unisex",
        "ocasiones": ["Diario", "Oficina"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Floral", "Atalcado", "Almizclado", "Aromático"]],
        "notas_salida": ["Manzana verde", "Limón", "Violeta", "Hojas de violeta"],
        "notas_corazon": ["Jazmín marroquí", "Jazmín italiano", "Rosa búlgara", "Geranio"],
        "notas_fondo": ["Narciso", "Almizcle", "Sándalo"],
        "valoracion": 4.0,
        "descripcion": "Un jardín floral limpio y atalcado, animado por manzana verde, limón y violeta antes de descansar sobre almizcle y sándalo. Suave y elegante para el día.",
        "fuentes": [("Presentación de la colección Musk de Al Haramain", "https://www.fragrantica.com/news/Al-Haramain-Musk-Series-Amber-Musk-Musk-Collection-Musk-Maliki-and-Royal-Musk-16284.html"), ("Valoraciones de Fragrantica", "https://www.fragrantica.com/perfumes/Al-Haramain-Perfumes/Musk-Maliki-70385.html")],
        "estado": "verificada",
    },
    20: {
        "familia": "Floral",
        "genero": "Unisex",
        "ocasiones": ["Diario", "Oficina", "Citas"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Almizclado", "Atalcado", "Floral", "Miel"]],
        "notas_salida": ["Bergamota", "Pimienta", "Ylang-ylang"],
        "notas_corazon": ["Jazmín", "Lirio del valle", "Raíz de lirio"],
        "notas_fondo": ["Almizcle", "Cera de abeja"],
        "valoracion": 3.9,
        "descripcion": "Una interpretación refinada del almizcle, con cítricos especiados, flores blancas y un fondo suave de cera de abeja. Limpia y distintiva para diario, oficina o citas.",
        "fuentes": [("Presentación de la colección Musk de Al Haramain", "https://www.fragrantica.com/news/Al-Haramain-Musk-Series-Amber-Musk-Musk-Collection-Musk-Maliki-and-Royal-Musk-16284.html"), ("Valoraciones de Fragrantica", "https://www.fragrantica.com/perfume/Al-Haramain-Perfumes/Royal-Musk-70384.html")],
        "estado": "verificada",
    },
    25: {
        # The supplier row does not identify the men's or women's 2024 edition.
        "fuentes": [("Ediciones Summer Essence de Fragrantica", "https://www.fragrantica.com/p/95631")],
        "estado": "requiere_revision",
    },
    26: {
        "familia": "Oriental",
        "genero": "Hombre",
        "ocasiones": ["Diario", "Noche", "Citas"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Frutal", "Especiado", "Ámbar", "Amaderado"]],
        "notas_salida": ["Grosella negra", "Bergamota"],
        "notas_corazon": ["Nuez moscada", "Cardamomo", "Cilantro"],
        "notas_fondo": ["Haba tonka", "Ámbar", "Almizcle", "Cedro de Virginia"],
        "duracion": 2,
        "proyeccion": 2,
        "estela": 2,
        "valoracion": 4.0,
        "descripcion": "Grosella negra y bergamota abren un perfil masculino especiado, suavizado por haba tonka, ámbar y maderas. Seductor pero discreto, para diario, citas y noches informales.",
        "fuentes": [("Ficha y opiniones de Fragrantica", "https://www.fragrantica.com/perfume/Antonio-Banderas/Seduction-in-Black-6746.html")],
        "estado": "verificada",
    },
    27: {
        "familia": "Oriental",
        "genero": "Hombre",
        "ocasiones": ["Diario", "Oficina"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Aromático", "Frutal", "Marino", "Fresco"]],
        "notas_salida": ["Melón", "Bergamota", "Menta", "Grosella negra"],
        "notas_corazon": ["Agua de mar", "Manzana verde", "Capuchino", "Cardamomo", "Nuez moscada"],
        "notas_fondo": ["Notas amaderadas", "Ámbar"],
        "duracion": 2,
        "proyeccion": 2,
        "estela": 2,
        "valoracion": 4.1,
        "descripcion": "Una fragancia masculina acuática y frutal, con menta, notas marinas y un fondo de maderas y ámbar. Ligera y refrescante para el día y la oficina.",
        "fuentes": [("Ficha y opiniones de Fragrantica", "https://beta.fragrantica.com/perfume/Antonio-Banderas/Blue-Seduction-1088.html")],
        "estado": "verificada",
    },
    28: {
        "familia": "Floral",
        "genero": "Mujer",
        "ocasiones": ["Diario", "Oficina"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Frutal", "Fresco", "Floral", "Acuático"]],
        "notas_salida": ["Melón", "Bergamota", "Pera", "Hojas de violeta"],
        "notas_corazon": ["Peonía", "Jazmín", "Lirio del valle", "Gardenia", "Rosa búlgara"],
        "notas_fondo": ["Frambuesa", "Pachulí", "Almizcle", "Benjuí"],
        "duracion": 2,
        "proyeccion": 2,
        "estela": 2,
        "valoracion": 3.7,
        "descripcion": "Una composición femenina floral y acuática, luminosa por sus frutas frescas y suavizada con almizcle y benjuí. Cómoda y delicada para el día o la oficina.",
        "fuentes": [("Ficha y opiniones de Fragrantica", "https://www.fragrantica.com/perfume/Antonio-Banderas/Blue-Seduction-3751.html")],
        "estado": "verificada",
    },
    29: {
        "familia": "Aromático",
        "genero": "Hombre",
        "ocasiones": ["Diario", "Oficina"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Aromático", "Cítrico", "Frutal", "Marino"]],
        "notas_salida": ["Piña", "Melón", "Bergamota", "Manzana verde", "Toronja"],
        "notas_corazon": ["Notas marinas", "Jazmín", "Cardamomo", "Neroli"],
        "notas_fondo": ["Vetiver", "Almizcle blanco", "Cedro", "Gamuza", "Ámbar"],
        "duracion": 3,
        "proyeccion": 3,
        "estela": 3,
        "valoracion": 3.8,
        "descripcion": "Frutas y cítricos se mezclan con un corazón marino antes de asentarse sobre vetiver, cedro y gamuza. Un aroma masculino fresco y versátil para el día.",
        "fuentes": [("Ficha y opiniones de Fragrantica", "https://www.fragrantica.com/perfume/Antonio-Banderas/King-of-Seduction-26412.html")],
        "estado": "verificada",
    },
    30: {
        "familia": "Aromático",
        "genero": "Hombre",
        "ocasiones": ["Diario", "Oficina"],
        "acordes": [{"nombre": name, "emoji": ""} for name in ["Aromático", "Amaderado", "Fresco", "Verde"]],
        "notas_salida": ["Manzana", "Bergamota"],
        "notas_corazon": ["Lavanda", "Artemisa", "Salvia esclarea"],
        "notas_fondo": ["Notas amaderadas", "Musgo", "Haba tonka", "Ámbar", "Pachulí"],
        "duracion": 3,
        "proyeccion": 3,
        "estela": 3,
        "valoracion": 3.8,
        "descripcion": "Manzana y bergamota abren un aroma masculino verde y aromático, con lavanda y un fondo amaderado. Deportivo, limpio y fácil de llevar a diario o en la oficina.",
        "fuentes": [("Ficha y opiniones de Fragrantica", "https://www.fragrantica.com/perfume/Antonio-Banderas/Power-Of-Seduction-51087.html"), ("Opiniones de rendimiento en Parfumo", "https://www.parfumo.com/Perfumes/Banderas/Power_of_Seduction")],
        "estado": "verificada",
    },
}


def run() -> None:
    path = ROOT / "catalog" / "august-products.json"
    catalog = json.loads(path.read_text(encoding="utf-8"))
    records = {record["origen_ref"]: record for record in catalog["records"]}

    for ref, evidence in REVIEWED.items():
        record = records[ref]
        for field, value in evidence.items():
            if field not in {"fuentes", "estado"}:
                record[field] = value
        record["fuentes"] = [
            {"titulo": title, "url": url, "fecha": REVIEW_DATE}
            for title, url in evidence["fuentes"]
        ]
        record["ficha_estado"] = evidence.get("estado", "verificada")

    path.write_text(
        json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps({"updated": len(REVIEWED), "refs": sorted(REVIEWED)}))


if __name__ == "__main__":
    run()
