"""Exact-match catalog rows to the public 42k Parfumo-derived dataset."""

from __future__ import annotations

import json
import re
import sys
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".tmp-pyarrow"))
import pyarrow.parquet as pq  # type: ignore[import-not-found]  # noqa: E402

CATALOG = ROOT / "catalog" / "august-products.json"
DATASET = ROOT / ".tmp-hf-perfumes.parquet"
OUTPUT = ROOT / "research" / "batch-huggingface-parfumo-dataset.json"
AMBIGUOUS_REFS = {6, 25, 653, 654, 655, 656, 657, 658, 660, 661, 691, 692, 693}
EXACT_ALIASES = {
    107: "The Pride of Armaf Admiral",
    157: "Bad Boy",
    161: "CH",
    162: "Carolina Herrera",
    164: "Good Girl Blush",
    165: "Good Girl",
    176: "Charlie Gold",
    211: "Art Of Nature",
    281: "Guess Girl",
    282: "Flower by Kenzo",
    283: "Asad",
    284: "Haya",
    285: "Maahir",
    286: "Toy 2",
    287: "Toy 2 Bubble Gum",
    288: "Toy Boy",
    289: "Can Can",
    290: "Paris Hilton for Men",
    291: "18 for Her",
    292: "360 for Men",
    293: "360 for Women",
    294: "360 Coral",
    295: "Silver for Men",
    297: "Touch for Men",
    324: "Pi",
    326: "Very Irresistible",
    327: "Gloria Vanderbilt",
    328: "Aura Mugler",
    346: "Guess Classic",
    347: "Guess Woman",
    350: "Halloween Blue Drop",
    570: "Oscar de la Renta",
    601: "18 Orchid",
    602: "360 Black for Men",
    603: "360 for Men",
    604: "360 Green",
    605: "360 Red for Men",
    606: "360 Red for Women",
    607: "360 Very Blue",
    608: "360 White for Men",
    610: "Reserve for Men",
    611: "Reserve for Women",
    670: "Dolce & Gabbana Pour Femme",
}


def norm(value: str | None) -> str:
    value = unicodedata.normalize("NFKD", (value or "").casefold())
    value = "".join(char for char in value if not unicodedata.combining(char))
    value = re.sub(r"\b(?:tester|decant|estuche|corporal|miniatura|eau de parfum|eau de toilette|edp|edt|parfum|perfume)\b", " ", value)
    return re.sub(r"[^a-z0-9]+", " ", value).strip()


def clean_catalog_name(value: str) -> str:
    value = re.sub(r"\b\d+\s*(?:ml|pzs?)\b", " ", value, flags=re.I)
    return norm(value)


def dataset_name(row: dict) -> str:
    name = norm(row["perfume_name"])
    brand_tokens = set(norm(row["brand_name"]).split())
    return " ".join(token for token in name.split() if token not in brand_tokens and not re.fullmatch(r"(?:19|20)\d{2}", token))


def concentration(value: str | None) -> str:
    value = (value or "").casefold()
    if "toilette" in value: return "edt"
    if "parfum" in value and "eau" not in value: return "parfum"
    if "parfum" in value: return "edp"
    if "cologne" in value: return "edc"
    return ""


def main() -> None:
    rows = pq.read_table(DATASET).to_pylist()
    index: dict[tuple[str, str], list[dict]] = {}
    for row in rows:
        index.setdefault((norm(row["brand_name"]), dataset_name(row)), []).append(row)
    records = json.loads(CATALOG.read_text(encoding="utf-8"))["records"]
    output = []
    for record in records:
        ref = int(record["origen_ref"])
        if ref in AMBIGUOUS_REFS or all(record.get(field) for field in ("notas_salida", "notas_corazon", "notas_fondo")):
            continue
        lookup_name = norm(EXACT_ALIASES.get(ref)) if ref in EXACT_ALIASES else clean_catalog_name(record["nombre"])
        matches = index.get((norm(record["marca"]), lookup_name), [])
        matches = [row for row in matches if row.get("top_notes") and row.get("middle_notes") and row.get("base_notes")]
        requested = concentration(record.get("concentracion"))
        if requested:
            edition = [row for row in matches if concentration(row.get("concentration")) == requested]
            if edition:
                matches = edition
            elif any(concentration(row.get("concentration")) for row in matches):
                matches = []
        identities = {(row["source_url"], tuple(row["top_notes"]), tuple(row["middle_notes"]), tuple(row["base_notes"])) for row in matches}
        if len(identities) != 1:
            continue
        row = matches[0]
        output.append({
            "ref": ref,
            "acordes": row.get("main_accords") or [],
            "notas_salida": row["top_notes"],
            "notas_corazon": row["middle_notes"],
            "notas_fondo": row["base_notes"],
            "valoracion": round(float(row["rating"]) / 2, 2) if row.get("rating") is not None else None,
            "fuentes": [row["source_url"]],
            "estado": "Coincidencia exacta de nombre, marca y edición en el conjunto público de Parfumo",
        })
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"resolved": len(output), "output": str(OUTPUT)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
