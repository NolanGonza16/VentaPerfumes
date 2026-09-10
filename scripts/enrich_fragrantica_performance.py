"""Extract community performance evidence from already-reviewed Fragrantica URLs.

Fragrantica exposes per-review longevity (1–5) and sillage (1–4) values in the
public perfume page. The app stores sillage as both projection and trail because
the source provides one diffusion metric rather than two independent scores.
No supplier identity fields or olfactory notes are changed by this script.
"""

from __future__ import annotations

import html
import json
import re
import statistics
import time
import zlib
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlsplit, urlunsplit
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog" / "august-products.json"
OUTPUT = ROOT / "research" / "batch-fragrantica-community-performance.json"
AMBIGUOUS_REFS = {6, 25, 653, 654, 655, 656, 657, 658, 660, 661, 691, 692, 693}
USER_AGENT = "Mozilla/5.0 (compatible; VentaPerfumesCatalogResearch/1.0)"


def fetch(url: str) -> str | None:
    parts = urlsplit(url)
    hosts = ["www.fragrantica.es", "www.fragrantica.fr", "www.fragrantica.com.br", "www.fragrantica.de"]
    start = zlib.crc32(url.encode("utf-8")) % len(hosts)
    for attempt in range(len(hosts)):
        host = hosts[(start + attempt) % len(hosts)]
        safe_url = urlunsplit((parts.scheme, host, quote(parts.path), quote(parts.query, safe="=&"), parts.fragment))
        try:
            request = Request(safe_url, headers={"User-Agent": USER_AGENT, "Accept-Language": "es,en;q=0.8"})
            with urlopen(request, timeout=12) as response:
                return response.read().decode("utf-8", "ignore")
        except (HTTPError, URLError, TimeoutError, UnicodeError, ValueError):
            if attempt == len(hosts) - 1:
                return None
            time.sleep(0.5 * (attempt + 1))
    return None


def parse(url: str, page: str) -> dict | None:
    decoded = html.unescape(page)
    votes = [
        (int(longevity), int(sillage))
        for longevity, sillage in re.findall(
            r'"longevity":\s*(\d).*?"sillage":\s*(\d)', decoded
        )
    ]
    longevity_votes = [value for value, _ in votes if value > 0]
    sillage_votes = [value for _, value in votes if value > 0]
    if len(longevity_votes) < 3 or len(sillage_votes) < 3:
        return None

    rating_match = re.search(
        r'itemprop="ratingValue"[^>]*>\s*([0-5](?:[.,]\d+)?)', page
    )
    duration = max(1, min(5, round(statistics.mean(longevity_votes))))
    # Community sillage uses four levels. Shift it to the app's five-point scale.
    diffusion = max(1, min(5, round(statistics.mean(sillage_votes)) + 1))
    return {
        "duracion": duration,
        "proyeccion": diffusion,
        "estela": diffusion,
        "valoracion": float(rating_match.group(1).replace(",", ".")) if rating_match else None,
        "fuentes": [url],
        "estado": f"Rendimiento comunitario: {len(longevity_votes)} valoraciones útiles",
    }


def main() -> None:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))["records"]
    targets: dict[str, list[int]] = {}
    for record in catalog:
        ref = int(record["origen_ref"])
        if ref in AMBIGUOUS_REFS or all(record.get(field) is not None for field in ("duracion", "proyeccion", "estela")):
            continue
        url = next(
            (source["url"] for source in record.get("fuentes", []) if "fragrantica." in source.get("url", "")),
            None,
        )
        if url:
            targets.setdefault(url, []).append(ref)

    results: list[dict] = []
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = {executor.submit(fetch, url): url for url in targets}
        for index, future in enumerate(as_completed(futures), start=1):
            url = futures[future]
            page = future.result()
            evidence = parse(url, page) if page else None
            if evidence:
                for ref in targets[url]:
                    results.append({"ref": ref, **evidence})
            if index % 25 == 0:
                print(f"processed {index}/{len(futures)} URLs; resolved {len(results)} records", flush=True)

    results.sort(key=lambda item: item["ref"])
    OUTPUT.write_text(json.dumps(results, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"targets": len(targets), "resolved": len(results), "output": str(OUTPUT)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
