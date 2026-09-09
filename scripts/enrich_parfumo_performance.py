"""Extract community longevity and sillage from reviewed Parfumo sources."""

from __future__ import annotations

import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlsplit, urlunsplit
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog" / "august-products.json"
OUTPUT = ROOT / "research" / "batch-parfumo-community-performance.json"
AMBIGUOUS_REFS = {6, 25, 653, 654, 655, 656, 657, 658, 660, 661, 691, 692, 693}


def fetch(url: str) -> str | None:
    parts = urlsplit(url)
    safe_url = urlunsplit((parts.scheme, parts.netloc, quote(parts.path), quote(parts.query, safe="=&"), parts.fragment))
    try:
        request = Request(safe_url, headers={"User-Agent": "Mozilla/5.0", "Accept-Language": "en"})
        with urlopen(request, timeout=20) as response:
            return response.read().decode("utf-8", "ignore")
    except (HTTPError, URLError, TimeoutError, UnicodeError, ValueError):
        return None


def metric(page: str, label: str, bar_id: str) -> tuple[float, int] | None:
    match = re.search(
        rf'>{label}</div>.*?id="{bar_id}".*?bold[^>]*>([0-9.]+)</span>.*?([0-9,]+) Ratings',
        page,
        re.DOTALL | re.IGNORECASE,
    )
    if not match:
        return None
    return float(match.group(1)), int(match.group(2).replace(",", ""))


def parse(url: str, page: str) -> dict | None:
    longevity = metric(page, "Longevity", "bar_dur")
    sillage = metric(page, "Sillage", "bar_sillage")
    if not longevity or not sillage or min(longevity[1], sillage[1]) < 3:
        return None
    rating = re.search(r'itemprop="ratingValue"[^>]*>\s*([0-9.]+)', page)
    diffusion = max(1, min(5, round(sillage[0] / 2)))
    return {
        "duracion": max(1, min(5, round(longevity[0] / 2))),
        "proyeccion": diffusion,
        "estela": diffusion,
        "valoracion": round(float(rating.group(1)) / 2, 2) if rating else None,
        "fuentes": [url],
        "estado": f"Rendimiento comunitario de Parfumo: {longevity[1]} valoraciones",
    }


def main() -> None:
    records = json.loads(CATALOG.read_text(encoding="utf-8"))["records"]
    targets: dict[str, list[int]] = {}
    for record in records:
        ref = int(record["origen_ref"])
        if ref in AMBIGUOUS_REFS or all(record.get(field) is not None for field in ("duracion", "proyeccion", "estela")):
            continue
        url = next((source["url"] for source in record.get("fuentes", []) if "parfumo.com/Perfumes/" in source.get("url", "")), None)
        if url:
            targets.setdefault(url, []).append(ref)

    results: list[dict] = []
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = {executor.submit(fetch, url): url for url in targets}
        for future in as_completed(futures):
            url = futures[future]
            page = future.result()
            evidence = parse(url, page) if page else None
            if evidence:
                results.extend({"ref": ref, **evidence} for ref in targets[url])
            time.sleep(0.1)
    results.sort(key=lambda item: item["ref"])
    OUTPUT.write_text(json.dumps(results, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"targets": len(targets), "resolved": len(results)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
