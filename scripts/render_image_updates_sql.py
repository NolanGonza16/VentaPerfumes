#!/usr/bin/env python3
"""Render idempotent catalog image metadata and URL updates."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def literal(value: object) -> str:
    if value is None:
        return "null"
    if isinstance(value, int):
        return str(value)
    return "'" + str(value).replace("'", "''") + "'"


def render(manifest: dict, queue: dict, public_base_url: str) -> str:
    rows = {int(row["ref"]): row for row in manifest["records"]}
    statements = ["begin;"]
    for item in queue["items"]:
        ref = int(item["ref"])
        row = rows[ref]
        if row.get("review_status") != "approved":
            raise ValueError(f"Ref {ref} is not approved")
        if row.get("fidelity_status") == "needs_exact_source":
            raise ValueError(f"Ref {ref} still needs an exact source")
        url = f"{public_base_url.rstrip('/')}/{item['storage_path']}"
        if not url.startswith("https://"):
            raise ValueError("Public image URLs must use HTTPS")
        values = [ref, row.get("source_url"), item["storage_path"], item["width"], item["height"], row["fidelity_status"], row["treatment"], "approved"]
        statements.append(
            "insert into public.catalog_perfume_images "
            "(origen_ref, source_url, storage_path, width, height, fidelity_status, treatment, review_status, reviewed_at) values "
            f"({', '.join(literal(value) for value in values)}, now()) "
            "on conflict (origen_ref) do update set source_url=excluded.source_url, storage_path=excluded.storage_path, "
            "width=excluded.width, height=excluded.height, fidelity_status=excluded.fidelity_status, "
            "treatment=excluded.treatment, review_status=excluded.review_status, reviewed_at=excluded.reviewed_at;"
        )
        statements.append(f"update public.catalog_perfumes set imagen_url = {literal(url)} where origen_ref = {ref};")
    statements.append("commit;")
    return "\n".join(statements) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, default=ROOT / "catalog/image-manifest.json")
    parser.add_argument("--queue", type=Path, default=ROOT / "catalog/image-upload-queue.json")
    parser.add_argument("--public-base-url", required=True)
    parser.add_argument("--output", type=Path, default=ROOT / "catalog/image-updates.sql")
    args = parser.parse_args()
    sql = render(json.loads(args.manifest.read_text(encoding="utf-8")), json.loads(args.queue.read_text(encoding="utf-8")), args.public_base_url)
    args.output.write_text(sql, encoding="utf-8")
    print(f"Rendered {args.output}")


if __name__ == "__main__":
    main()
