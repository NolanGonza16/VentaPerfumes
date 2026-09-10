"""Match exact catalog identities against the cited public Parfumo dataset.

Only normalized exact brand/name matches are accepted. Presentation data from the
supplier PDF remains untouched. This fills note pyramids and accords, then the
main enrichment pipeline derives Spanish-facing categories and descriptions.
"""

from __future__ import annotations

import csv
import json
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog" / "august-products.json"
DATASET = ROOT / ".tmp-parfumo-data.csv"
OUTPUT = ROOT / "research" / "batch-parfumo-open-dataset.json"
AMBIGUOUS_REFS = {6, 25, 653, 654, 655, 656, 657, 658, 660, 661, 691, 692, 693}


def norm(value: str) -> str:
    value = unicodedata.normalize("NFKD", value.casefold())
    value = "".join(char for char in value if not unicodedata.combining(char))
    value = re.sub(r"\b(?:tester|eau de parfum|eau de toilette|edp|edt|parfum|perfume)\b", " ", value)
    return re.sub(r"[^a-z0-9]+", " ", value).strip()


def values(text: str) -> list[str]:
    return [] if not text or text == "NA" else [item.strip() for item in text.split(",") if item.strip()]


def concentration(value: str | None) -> str:
    value = (value or "").casefold()
    if "toilette" in value:
        return "edt"
    if "parfum" in value and "eau" not in value:
        return "parfum"
    if "parfum" in value:
        return "edp"
    if "cologne" in value:
        return "edc"
    return ""


def catalog_name(value: str) -> str:
    for prefix in ("Tester · ", "Decant · ", "Estuche · ", "Corporal · ", "Miniatura · "):
        value = value.removeprefix(prefix)
    return norm(value)


def dataset_name(row: dict) -> str:
    name = norm(row["Name"])
    brand_tokens = set(norm(row["Brand"]).split())
    return " ".join(
        token
        for token in name.split()
        if token not in brand_tokens and not re.fullmatch(r"(?:19|20)\d{2}", token)
    )


def main() -> None:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))["records"]
    index: dict[tuple[str, str], list[dict]] = {}
    with DATASET.open(encoding="utf-8-sig", newline="") as handle:
        for row in csv.DictReader(handle):
            index.setdefault((norm(row["Brand"]), dataset_name(row)), []).append(row)

    output: list[dict] = []
    for record in catalog:
        ref = int(record["origen_ref"])
        if ref in AMBIGUOUS_REFS or all(record.get(field) for field in ("notas_salida", "notas_corazon", "notas_fondo")):
            continue
        matches = index.get((norm(record["marca"]), catalog_name(record["nombre"])), [])
        complete = [row for row in matches if all(values(row[field]) for field in ("Top_Notes", "Middle_Notes", "Base_Notes"))]
        requested_concentration = concentration(record.get("concentracion"))
        if requested_concentration:
            matching_edition = [row for row in complete if concentration(row["Concentration"]) == requested_concentration]
            if matching_edition:
                complete = matching_edition
            elif any(concentration(row["Concentration"]) for row in complete):
                complete = []
        if len(complete) != 1:
            continue
        row = complete[0]
        output.append({
            "ref": ref,
            "acordes": values(row["Main_Accords"]),
            "notas_salida": values(row["Top_Notes"]),
            "notas_corazon": values(row["Middle_Notes"]),
            "notas_fondo": values(row["Base_Notes"]),
            "valoracion": None if row["Rating_Value"] == "NA" else round(float(row["Rating_Value"]) / 2, 2),
            "fuentes": [row["URL"]],
            "estado": "Coincidencia exacta de nombre y marca en el conjunto público de Parfumo",
        })

    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"resolved": len(output), "output": str(OUTPUT)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
