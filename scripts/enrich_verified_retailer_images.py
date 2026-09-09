"""Add conservative, exact-size retailer images to records still without art."""

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REJECTED_ROWS = {52, 453, 495}
UNSUITABLE_VARIANT = re.compile(
    r"gift|preowned|after shave|body|lotion|deodorant|vial|miniature", re.I
)


def has_exact_size(source: dict, size_ml: int | None) -> bool:
    if not size_ml:
        return True
    pattern = re.compile(rf"(?<!\d){size_ml}\s*ML\b", re.I)
    return any(
        pattern.search(variant) and not UNSUITABLE_VARIANT.search(variant)
        for variant in source.get("variants", [])
    )


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
    rejected_size = 0

    for match in matches:
        source = match["source"]
        ref = match["fila"]
        if source.get("source") != "perfumeonline" or ref in REJECTED_ROWS:
            continue
        record = by_ref[ref]
        if record.get("imagen_url"):
            continue
        if not has_exact_size(source, record.get("tamano_ml")):
            rejected_size += 1
            continue
        images = [
            image
            for image in source.get("images", [])
            if image.get("src", "").startswith("https://")
            and (image.get("width") or 0) >= 800
            and (image.get("height") or 0) >= 800
        ]
        if not images:
            continue

        record["imagen_url"] = images[0]["src"]
        sources = record.setdefault("fuentes", [])
        if not any(item.get("url") == source["url"] for item in sources):
            sources.append(
                {
                    "titulo": "Referencia visual de PerfumeOnline.ca",
                    "url": source["url"],
                    "fecha": "2026-09-09",
                }
            )
        if record.get("ficha_estado") == "pendiente":
            record["ficha_estado"] = "parcial"
        enriched += 1

    catalog["status"] = "visual_enrichment_partial"
    catalog_path.write_text(
        json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps({"enriched": enriched, "rejected_size": rejected_size}))


if __name__ == "__main__":
    run()
