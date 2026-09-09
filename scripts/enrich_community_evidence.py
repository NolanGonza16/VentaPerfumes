"""Merge reviewed community performance evidence into exact catalog rows.

This file intentionally contains only manually reviewed matches. Public source URLs
are retained as provenance in the database, but are not rendered in the storefront.
"""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REVIEW_DATE = "2026-09-09"

AFNAN = {
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
}


def run() -> None:
    path = ROOT / "catalog" / "august-products.json"
    catalog = json.loads(path.read_text(encoding="utf-8"))
    records = {record["origen_ref"]: record for record in catalog["records"]}

    for ref, evidence in AFNAN.items():
        record = records[ref]
        for field, value in evidence.items():
            if field != "fuentes":
                record[field] = value
        record["fuentes"] = [
            {"titulo": title, "url": url, "fecha": REVIEW_DATE}
            for title, url in evidence["fuentes"]
        ]
        record["ficha_estado"] = "verificada"

    path.write_text(
        json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps({"updated": len(AFNAN), "refs": sorted(AFNAN)}))


if __name__ == "__main__":
    run()
