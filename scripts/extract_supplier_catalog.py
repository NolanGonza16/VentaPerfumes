"""Extract this supplier's column-based PDF. Outputs contain private cost data.

Keep output under a git-ignored .tmp-* directory, never public/ or src/.
Description continuation lines are carried across page boundaries.
"""
import argparse
from collections import Counter
from decimal import Decimal
import hashlib
import json
from pathlib import Path
import re

import pdfplumber


def extract(source):
    rows = []
    page_counts = []
    declared_total = None
    with pdfplumber.open(source) as document:
        for page_number, page in enumerate(document.pages, start=1):
            words = page.extract_words(x_tolerance=2, y_tolerance=2)
            body = [word for word in words if word["top"] > 106]
            prices = sorted([
                word for word in body
                if 350 <= word["x0"] < 435 and re.fullmatch(r"[\d,]+\.\d{2}", word["text"])
            ], key=lambda word: word["top"])
            descriptions = [word for word in body if 90 <= word["x0"] < 350]
            page_counts.append(len(prices))
            total = re.search(r"Total item\(s\):\s*(\d+)", page.extract_text() or "")
            if total:
                declared_total = int(total.group(1))
            first_top = prices[0]["top"] if prices else page.height
            carried = [word for word in descriptions if word["top"] < first_top - 1]
            if carried:
                if not rows:
                    raise ValueError("Unattached description on first page")
                rows[-1]["descripcion_original"] += " " + join_words(carried)
                rows[-1]["continua_en_pagina"] = page_number
            for index, price in enumerate(prices):
                bottom = prices[index + 1]["top"] - 1 if index + 1 < len(prices) else page.height - 12
                row_words = [word for word in descriptions if price["top"] - 1 <= word["top"] < bottom]
                description = join_words(row_words)
                if not description:
                    raise ValueError(f"Missing description on page {page_number}, price index {index}")
                cost = Decimal(price["text"].replace(",", ""))
                retail = (cost * Decimal("1.70")).quantize(Decimal("0.01"))
                rows.append({
                    "fila": len(rows) + 1,
                    "pagina": page_number,
                    "descripcion_original": description,
                    "costo_crc_privado": str(cost),
                    "precio_venta_crc": str(retail),
                })
    if declared_total != len(rows):
        raise ValueError(f"Count mismatch: PDF declares {declared_total}, extracted {len(rows)}")
    for row in rows:
        row["volumenes_ml"] = re.findall(r"(\d+(?:[.,]\d+)?)\s*ML\b", row["descripcion_original"])
        row["concentraciones"] = re.findall(r"\b(?:EDP|EDT|EDC|EXTRAIT DE PARFUM|LE PARFUM|PARFUM)\b", row["descripcion_original"])
    counts = Counter(row["descripcion_original"] for row in rows)
    return {
        "source_sha256": hashlib.sha256(Path(source).read_bytes()).hexdigest(),
        "catalog_date": "2026-08-17",
        "currency": "CRC",
        "markup": "1.70",
        "declared_total": declared_total,
        "extracted_total": len(rows),
        "rows_per_page": page_counts,
        "duplicates": {name: count for name, count in counts.items() if count > 1},
        "rows": rows,
    }


def join_words(words):
    return " ".join(word["text"] for word in sorted(words, key=lambda word: (round(word["top"], 1), word["x0"])))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("source")
    parser.add_argument("output")
    args = parser.parse_args()
    destination = Path(args.output)
    if not any(part.startswith(".tmp-") for part in destination.parts):
        raise ValueError("Private extraction output must live under a .tmp-* directory")
    result = extract(args.source)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({key: value for key, value in result.items() if key != "rows"}, ensure_ascii=False, indent=2))
    print("Missing volume rows:", [(row["fila"], row["descripcion_original"]) for row in result["rows"] if not row["volumenes_ml"]])
