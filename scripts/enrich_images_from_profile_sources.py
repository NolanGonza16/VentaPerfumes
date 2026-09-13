"""Add product imagery from already-reviewed exact profile sources."""

from __future__ import annotations

import html
import json
import re
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog/august-products.json"
REPORT = ROOT / "research/image-sources-reviewed.json"
PRODUCT_PATHS = ("/perfume/", "/product/", "/products/", "/fragrance/")
BLOCKED_PATHS = ("/board/", "/blog/", "/pages/", "/f/", "buying-guide")
ALLOWED_HOSTS = {
    "fragrantica.com", "fragrantica.es", "parfumo.com", "basenotes.com",
    "armaf.com", "armaf.uk", "lattafa.com", "lattafa-usa.com",
    "bhararabeauty.com", "rasasi.com", "tous.com", "versace.com",
    "yslbeautyus.com", "jomilano.com", "perfumeonline.ca",
    "parisis-parfums.com", "perfumeriariach.com",
}
MANUAL_EXACT = {
    76: "https://cdn.shopify.com/s/files/1/2170/5343/files/Armaf-Odyssey-Artisto-The-Red-Edition.png?v=1760717418",
    95: "https://cdn.shopify.com/s/files/1/0875/1513/6299/files/ODYSSEYSPECTRABLUEEDITION2_2fa3fe1f-b29a-4e52-a351-86ab93535257.png?v=1767892219",
    102: "https://cdn.shopify.com/s/files/1/0875/1513/6299/files/Untitled_design_-_2025-09-24T025122.598.png?v=1758664303",
    123: "https://cdn.shopify.com/s/files/1/0594/1575/6852/files/GeneratedwithKive.ai-Removethebox_justkeepthebottleandcenterit_2.png?v=1771616601",
    204: "https://cdn.shopify.com/s/files/1/2170/5343/products/Curve-Wave-Edc-Men.jpg?v=1624277909",
    325: "https://cdn.shopify.com/s/files/1/2170/5343/products/100-red-label-eau-de-toilette-100-ml-for-men-eau-de-toilette-original.jpeg?v=1571609913",
    404: "https://cdn.shopify.com/s/files/1/2170/5343/files/King.jpg?v=1762961575",
    413: "https://cdn.shopify.com/s/files/1/2170/5343/files/Khadlaj_Island_100ml_edp.webp?v=1739218815",
    476: "https://cdn.shopify.com/s/files/1/0754/4936/8799/files/Musamam-White-1.png?v=1747416325",
    624: "https://cdn.shopify.com/s/files/1/2170/5343/files/social.112706.jpg?v=1757359671",
    626: "https://cdn.shopify.com/s/files/1/2170/5343/files/social.112707.jpg?v=1757938175",
}
REJECTED_REFS = {453}


def host_key(url: str) -> str:
    return urlparse(url).netloc.lower().removeprefix("www.")


def is_product_source(url: str) -> bool:
    parsed = urlparse(url)
    host = host_key(url)
    path = parsed.path.lower()
    return (
        host in ALLOWED_HOSTS
        and not any(blocked in path for blocked in BLOCKED_PATHS)
        and any(marker in path for marker in PRODUCT_PATHS)
    )


def og_image(url: str) -> str | None:
    if host_key(url) in {"fragrantica.com", "fragrantica.es"}:
        match = re.search(r"-(\d+)\.html$", urlparse(url).path)
        if match:
            packshot = f"https://fimgs.net/mdimg/perfume/375x500.{match.group(1)}.jpg"
            request = Request(packshot, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
            with urlopen(request, timeout=20) as response:
                if response.status == 200 and response.headers.get_content_type().startswith("image/"):
                    return packshot
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; CatalogImageResearch/1.0)"})
    with urlopen(request, timeout=25) as response:
        page = response.read(2_500_000).decode("utf-8", "ignore")
    tags = re.findall(r"<meta\s+[^>]*>", page, flags=re.I)
    for tag in tags:
        if not re.search(r"(?:property|name)\s*=\s*['\"]og:image(?::secure_url)?['\"]", tag, flags=re.I):
            continue
        match = re.search(r"content\s*=\s*['\"]([^'\"]+)['\"]", tag, flags=re.I)
        if match:
            image = html.unescape(match.group(1)).strip()
            if image.startswith("https://"):
                return image
    return None


def run() -> None:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    for record in catalog["records"]:
        if record["origen_ref"] in REJECTED_REFS:
            record["imagen_url"] = None
    previous_by_ref = {}
    if REPORT.exists():
        previous = json.loads(REPORT.read_text(encoding="utf-8")).get("records", [])
        previous_by_ref = {row.get("ref"): row for row in previous}
        previous_urls = {row.get("ref"): row.get("image_url") for row in previous if row.get("image_url")}
        for record in catalog["records"]:
            if record.get("imagen_url") == previous_urls.get(record["origen_ref"]):
                record["imagen_url"] = None
    candidates = {}
    for record in catalog["records"]:
        if record.get("imagen_url") or record["origen_ref"] in REJECTED_REFS:
            continue
        for source in record.get("fuentes", []):
            url = source.get("url", "")
            if is_product_source(url):
                candidates[record["origen_ref"]] = url
                break

    results = {}
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(og_image, url): (ref, url) for ref, url in candidates.items()}
        for future in as_completed(futures):
            ref, url = futures[future]
            try:
                image = future.result()
                if not image and previous_by_ref.get(ref, {}).get("image_url"):
                    image = previous_by_ref[ref]["image_url"]
                results[ref] = {"ref": ref, "source_page": url, "image_url": image, "status": "matched" if image else "unavailable"}
            except Exception as error:
                cached = previous_by_ref.get(ref, {}).get("image_url")
                results[ref] = {"ref": ref, "source_page": url, "image_url": cached, "status": "matched_cached" if cached else "unavailable", "error": str(error)[:180]}

    by_ref = {row["origen_ref"]: row for row in catalog["records"]}
    for ref, image in MANUAL_EXACT.items():
        results[ref] = {
            "ref": ref,
            "source_page": next((source.get("url") for source in by_ref[ref].get("fuentes", []) if is_product_source(source.get("url", ""))), None),
            "image_url": image,
            "status": "matched_manual_exact",
        }

    repeated = Counter(row.get("image_url") for row in results.values() if row.get("image_url"))
    for result in results.values():
        if result.get("image_url") and repeated[result["image_url"]] > 1:
            result["image_url"] = None
            result["status"] = "rejected_shared_meta_image"
            result["error"] = "The same metadata image was returned for multiple distinct catalog rows."

    updated = 0
    for ref, result in results.items():
        if result["image_url"]:
            by_ref[ref]["imagen_url"] = result["image_url"]
            updated += 1
    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps({"version": 1, "records": [results[key] for key in sorted(results)]}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"candidates": len(candidates), "updated": updated, "unavailable": len(candidates) - updated}))


if __name__ == "__main__":
    run()
