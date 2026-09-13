"""Build a deterministic, reviewable image manifest for the public catalog."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "catalog" / "august-products.json"
MANIFEST_PATH = ROOT / "catalog" / "image-manifest.json"
REVIEWED_SOURCES_PATH = ROOT / "research" / "image-sources-reviewed.json"
AMBIGUOUS_REFS = {6, 25, 653, 654, 655, 656, 657, 658, 660, 661, 691, 692, 693}
APPROVED_SOURCE_STATUSES = {"matched", "matched_manual_exact"}


def classify(record: dict, reviewed_sources: dict[int, dict]) -> dict:
    image_url = record.get("imagen_url") or ""
    ref = record["origen_ref"]
    reviewed = reviewed_sources.get(ref, {})
    is_reviewed_exact = (
        bool(image_url)
        and reviewed.get("image_url") == image_url
        and reviewed.get("status") in APPROVED_SOURCE_STATUSES
    )
    if ref in AMBIGUOUS_REFS:
        fidelity = "category_neutral"
    elif is_reviewed_exact:
        fidelity = "verified_exact"
    else:
        fidelity = "needs_exact_source"

    return {
        "ref": ref,
        "slug": record["slug"],
        "nombre": record["nombre"],
        "marca": record["marca"],
        "presentacion": record.get("presentacion_proveedor"),
        "source_url": image_url or None,
        "source_kind": "remote" if image_url else "missing",
        "fidelity_status": fidelity,
        "treatment": "retain_or_reframe" if image_url else "acquire_exact_packshot",
        "final_url": None,
        "review_status": "approved" if is_reviewed_exact else "pending",
        "notes": "",
    }


def main() -> None:
    source = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    reviewed_payload = json.loads(REVIEWED_SOURCES_PATH.read_text(encoding="utf-8"))
    reviewed_sources = {
        int(row["ref"]): row for row in reviewed_payload.get("records", [])
    }
    records = sorted(
        (classify(record, reviewed_sources) for record in source["records"]),
        key=lambda row: row["ref"],
    )
    refs = [record["ref"] for record in records]
    if len(refs) != len(set(refs)):
        raise ValueError("Duplicate origen_ref values cannot enter the image manifest")

    payload = {
        "version": 1,
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "records": records,
    }
    MANIFEST_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    with_source = sum(bool(record["source_url"]) for record in records)
    print(
        f"total={len(records)} with_source={with_source} "
        f"missing_source={len(records) - with_source} ambiguous={len(AMBIGUOUS_REFS)}"
    )


if __name__ == "__main__":
    main()
