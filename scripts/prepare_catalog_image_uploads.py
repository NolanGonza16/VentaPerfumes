#!/usr/bin/env python3
"""Validate reviewed catalog artwork and build a credential-free upload queue."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import struct
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALID_NAME = re.compile(r"^\d{4}-[a-z0-9-]+\.(?:webp|png|jpg)$")


def image_dimensions(path: Path) -> tuple[int, int]:
    data = path.read_bytes()
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return struct.unpack(">II", data[16:24])
    if data[:2] == b"\xff\xd8":
        pos = 2
        while pos + 9 < len(data):
            if data[pos] != 0xFF:
                pos += 1
                continue
            marker = data[pos + 1]
            pos += 2
            if marker in {0xD8, 0xD9}:
                continue
            length = int.from_bytes(data[pos : pos + 2], "big")
            if marker in range(0xC0, 0xC4):
                return int.from_bytes(data[pos + 5 : pos + 7], "big"), int.from_bytes(data[pos + 3 : pos + 5], "big")
            pos += length
    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        kind = data[12:16]
        if kind == b"VP8X":
            return 1 + int.from_bytes(data[24:27], "little"), 1 + int.from_bytes(data[27:30], "little")
        if kind == b"VP8 ":
            return struct.unpack("<HH", data[26:30])
        if kind == b"VP8L":
            bits = int.from_bytes(data[21:25], "little")
            return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
    raise ValueError(f"Unsupported or invalid image: {path}")


def build_queue(manifest_path: Path, final_dir: Path) -> dict:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    records = {int(row["ref"]): row for row in manifest["records"]}
    items, hashes = [], {}
    for path in sorted(final_dir.glob("*")):
        if not path.is_file():
            continue
        if not VALID_NAME.fullmatch(path.name):
            raise ValueError(f"Invalid catalog image filename: {path.name}")
        ref = int(path.name[:4])
        row = records.get(ref)
        if not row:
            raise ValueError(f"No manifest record for ref {ref}")
        width, height = image_dimensions(path)
        if width < 800 or height < 1000:
            raise ValueError(f"Image {path.name} is below 800x1000 ({width}x{height})")
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        if digest in hashes and hashes[digest] != ref:
            raise ValueError(f"Duplicate image content for refs {hashes[digest]} and {ref}")
        hashes[digest] = ref
        items.append({
            "ref": ref,
            "slug": row["slug"],
            "local_path": path.relative_to(ROOT).as_posix(),
            "storage_path": f"catalog/{ref}/{row['slug']}-v1{path.suffix.lower()}",
            "width": width,
            "height": height,
            "sha256": digest,
            "content_type": {".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg"}[path.suffix.lower()],
        })
    return {"version": 1, "items": items}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, default=ROOT / "catalog/image-manifest.json")
    parser.add_argument("--final-dir", type=Path, default=ROOT / "public/images/catalog-final")
    parser.add_argument("--output", type=Path, default=ROOT / "catalog/image-upload-queue.json")
    args = parser.parse_args()
    queue = build_queue(args.manifest, args.final_dir)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(queue, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Prepared {len(queue['items'])} reviewed image uploads")


if __name__ == "__main__":
    main()
