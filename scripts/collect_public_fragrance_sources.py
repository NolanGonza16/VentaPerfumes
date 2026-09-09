"""Cache public product metadata for evidence review, never supplier costs."""
import json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.request import urlopen, Request
import time

DEST = Path(".tmp-catalog-august/sources")
SITES = {
    "armaf": "https://armaf.com",
    "lattafa": "https://lattafa-usa.com",
    "bharara": "https://www.bhararabeauty.com",
    "perfumeonline": "https://perfumeonline.ca",
}

def collect(item):
    key, root = item
    dest = DEST / (key + ".json")
    if dest.exists() and all("product_type" in p for p in json.loads(dest.read_text(encoding="utf-8"))):
        print(key, "cached", flush=True)
        return
    products = {}
    for page in range(1, 51):
        url = f"{root}/products.json?limit=250&page={page}"
        request = Request(url, headers={"User-Agent": "PerfumeCatalogResearch/1.0"})
        try:
            with urlopen(request, timeout=35) as response:
                batch = json.load(response).get("products", [])
        except Exception as error:
            print(key, page, str(error), flush=True)
            break
        fresh = [p for p in batch if p["id"] not in products]
        if not fresh:
            break
        for product in fresh:
            products[product["id"]] = {
                "title": product["title"], "vendor": product["vendor"], "product_type":product.get("product_type",""),
                "url": root + "/products/" + product["handle"],
                "body": product.get("body_html", ""),
                "tags": product.get("tags", []),
                "variants": [v["title"] for v in product.get("variants", [])],
                "variant_images": [{"title":v["title"],"image":v.get("featured_image")} for v in product.get("variants",[])],
                "images": [{k: image.get(k) for k in ["src", "width", "height"]}
                           for image in product.get("images", [])],
            }
        print(key, page, len(products), flush=True)
        if len(batch) < 250:
            break
        time.sleep(0.5)
    if products:
        dest.write_text(json.dumps(list(products.values()), ensure_ascii=False), encoding="utf-8")

if __name__ == "__main__":
    DEST.mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(max_workers=3) as pool:
        list(pool.map(collect, SITES.items()))
