"""Fill missing performance with conservative, traceable editorial estimates.

These values are not presented as community votes. They are derived from the
supplier concentration plus the already researched family, accords and notes.
Exact community measurements already present in the catalog always win.
"""

from __future__ import annotations

import json
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog" / "august-products.json"
OUTPUT = ROOT / "research" / "batch-editorial-performance-estimates.json"
AMBIGUOUS_REFS = {6, 25, 653, 654, 655, 656, 657, 658, 660, 661, 691, 692, 693}
SOURCES = [
    "https://www.costco.com/f/-/fragrance-buying-guide",
    "https://ilavin.com/blog/sillage-projection-longevity-explained",
    "https://www.parfumelle.com/pages/fragrance-concentration-chart",
]


def normalized(value: object) -> str:
    text = " ".join(str(item or "") for item in value) if isinstance(value, list) else str(value or "")
    return "".join(
        char for char in unicodedata.normalize("NFKD", text.lower())
        if not unicodedata.combining(char)
    )


def clamp(value: int) -> int:
    return max(1, min(5, value))


def estimate(record: dict) -> tuple[int, int, int]:
    concentration = normalized(record.get("concentracion"))
    profile_parts = [record.get("familia"), record.get("descripcion")]
    profile_parts.extend(item.get("nombre", "") for item in record.get("acordes", []))
    profile_parts.extend(record.get("notas_salida", []))
    profile_parts.extend(record.get("notas_corazon", []))
    profile_parts.extend(record.get("notas_fondo", []))
    profile = normalized(profile_parts)

    if any(term in concentration for term in ("body mist", "mist", "corporal", "colonia")):
        duration = projection = sillage = 2
    elif any(term in concentration for term in ("extrait", "elixir", "parfum")) and "eau de parfum" not in concentration:
        duration, projection, sillage = 5, 4, 4
    elif "eau de parfum" in concentration or " edp" in f" {concentration}":
        duration, projection, sillage = 4, 3, 3
    elif "eau de toilette" in concentration or " edt" in f" {concentration}":
        duration, projection, sillage = 3, 3, 3
    else:
        duration = projection = sillage = 3

    heavy = ("oud", "agar", "ambar", "vainilla", "resina", "incienso", "tabaco", "cuero", "gourmand", "pachuli", "tonka")
    light = ("citr", "acuatic", "marino", "verde", "fresco", "ozonic", "te verde")
    heavy_score = sum(term in profile for term in heavy)
    light_score = sum(term in profile for term in light)
    if heavy_score >= 2 and heavy_score > light_score:
        duration, projection, sillage = clamp(duration + 1), clamp(projection + 1), clamp(sillage + 1)
    elif light_score >= 2 and light_score > heavy_score:
        duration = clamp(duration - 1)
        projection = clamp(projection - (1 if projection > 3 else 0))
        sillage = clamp(sillage - (1 if sillage > 3 else 0))
    return duration, projection, sillage


def main() -> None:
    records = json.loads(CATALOG.read_text(encoding="utf-8"))["records"]
    results = []
    for record in records:
        ref = int(record["origen_ref"])
        if ref in AMBIGUOUS_REFS:
            continue
        missing = [field for field in ("duracion", "proyeccion", "estela") if record.get(field) is None]
        if not missing:
            continue
        duration, projection, sillage = estimate(record)
        values = {"duracion": duration, "proyeccion": projection, "estela": sillage}
        results.append({
            "ref": ref,
            **{field: values[field] for field in missing},
            "fuentes": SOURCES,
            "estado": "Estimación editorial por concentración y perfil olfativo; no es una votación específica.",
        })
    OUTPUT.write_text(json.dumps(results, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"resolved": len(results), "output": str(OUTPUT)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
