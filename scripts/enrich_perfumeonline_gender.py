"""Fill missing gender from exact reviewed PerfumeOnline Shopify products."""

from __future__ import annotations

import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog" / "august-products.json"
OUTPUT = ROOT / "research" / "batch-perfumeonline-gender.json"
AMBIGUOUS_REFS = {6, 25, 653, 654, 655, 656, 657, 658, 660, 661, 691, 692, 693}


def fetch(url: str) -> dict | None:
    try:
        request = Request(url.rstrip("/") + ".js", headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(request, timeout=20) as response:
            return json.loads(response.read().decode("utf-8"))
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError):
        return None


def main() -> None:
    records = json.loads(CATALOG.read_text(encoding="utf-8"))["records"]
    targets: dict[str, list[int]] = {}
    for record in records:
        ref = int(record["origen_ref"])
        if ref in AMBIGUOUS_REFS or record.get("genero"):
            continue
        url = next((source["url"] for source in record.get("fuentes", []) if "perfumeonline.ca/products/" in source.get("url", "")), None)
        if url:
            targets.setdefault(url, []).append(ref)

    output: list[dict] = []
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(fetch, url): url for url in targets}
        for future in as_completed(futures):
            url = futures[future]
            product = future.result()
            product_type = str(product.get("type", "")).casefold() if product else ""
            gender = "Hombre" if "men" in product_type else "Mujer" if "women" in product_type else "Unisex" if "unisex" in product_type else None
            if gender:
                output.extend({"ref": ref, "genero": gender, "fuentes": [url], "estado": "Género confirmado por la categoría del producto exacto"} for ref in targets[url])

    output.sort(key=lambda item: item["ref"])
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"targets": len(targets), "resolved": len(output)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
