"""Import exact identity matches from the CC BY 4.0 public perfume dataset."""

from __future__ import annotations

import csv
import json
from pathlib import Path

from enrich_parfumo_dataset import norm


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog" / "august-products.json"
DATASET = ROOT / ".tmp-perfumes-dataset.csv"
OUTPUT = ROOT / "research" / "batch-public-longevity-dataset.json"
SOURCE = "https://www.kaggle.com/datasets/ayushghawana/perfume-dataset"
AMBIGUOUS_REFS = {6, 25, 653, 654, 655, 656, 657, 658, 660, 661, 691, 692, 693}

GENDERS = {"male": "Hombre", "men": "Hombre", "female": "Mujer", "women": "Mujer", "unisex": "Unisex"}
LONGEVITY = {"light": 2, "medium": 3, "strong": 4, "6–8 hours": 4, "6-8 hours": 4}
FAMILIES = {
    "fresh scent": "Fresca",
    "mass pleaser": "Aromática",
    "woody spicy": "Amaderada especiada",
    "amber floral": "Ámbar floral",
    "floriental": "Floral oriental",
    "aromatic fougere": "Fougère aromática",
    "woody aromatic": "Amaderada aromática",
    "amber spicy": "Ámbar especiada",
    "fruity floral": "Floral frutal",
    "aquatic aromatic": "Acuática aromática",
    "aquatic floral": "Floral acuática",
    "chypre fruity": "Chipre frutal",
    "floriental fruity": "Floral oriental frutal",
    "oriental spicy": "Oriental especiada",
    "amber fougere": "Ámbar fougère",
    "tobacco spicy": "Tabaco especiado",
    "gourmand nutty": "Gourmand de frutos secos",
    "sweet gourmand": "Gourmand dulce",
    "floral woody": "Floral amaderada",
    "woody aquatic": "Amaderada acuática",
    "spicy floral": "Floral especiada",
    "citrus aromatic": "Cítrica aromática",
    "fruity musk": "Frutal almizclada",
    "ambery gourmand": "Ámbar gourmand",
    "floral amber": "Floral ambarada",
    "tabac accord": "Tabaco",
    "fruity fresh": "Frutal fresca",
}


def main() -> None:
    records = json.loads(CATALOG.read_text(encoding="utf-8"))["records"]
    with DATASET.open(encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle))
    index: dict[tuple[str, str], list[dict]] = {}
    for row in rows:
        index.setdefault((norm(row["brand"]), norm(row["perfume"])), []).append(row)

    output: list[dict] = []
    for record in records:
        ref = int(record["origen_ref"])
        if ref in AMBIGUOUS_REFS:
            continue
        name = record["nombre"].removeprefix("Tester · ")
        matches = index.get((norm(record["marca"]), norm(name)), [])
        if len(matches) != 1:
            continue
        row = matches[0]
        evidence: dict = {"ref": ref, "fuentes": [SOURCE], "estado": "Coincidencia exacta en conjunto público CC BY 4.0"}
        if not record.get("genero") and row["target_audience"].casefold() in GENDERS:
            evidence["genero"] = GENDERS[row["target_audience"].casefold()]
        if not record.get("familia") and row["category"].casefold() in FAMILIES:
            evidence["familia"] = FAMILIES[row["category"].casefold()]
        if record.get("duracion") is None and row["longevity"].casefold() in LONGEVITY:
            evidence["duracion"] = LONGEVITY[row["longevity"].casefold()]
        if len(evidence) > 3:
            output.append(evidence)

    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"resolved": len(output)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
