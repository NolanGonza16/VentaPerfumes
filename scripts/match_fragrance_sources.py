"""Suggest exact catalog-to-source matches. Fuzzy candidates are review only."""
import json
import re
import unicodedata
from pathlib import Path
from difflib import SequenceMatcher
from html import unescape
from collections import defaultdict, Counter

ROOT=Path(__file__).resolve().parents[1]

def plain(s):
    s=unicodedata.normalize("NFKD",s or "").encode("ascii","ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+"," ",s).strip()

ALIASES={
 "christian dior":"dior","paco rabanne":"rabanne","mont blanc":"montblanc",
 "lattafa perfumes":"lattafa","afnan perfumes":"afnan","jo milano paris":"jo milano",
 "swiss army":"victorinox","antonio b":"antonio banderas","calvin klein ck":"calvin klein",
 "bvlgari":"bvlgari","bulgari":"bvlgari","dolce gaban na":"dolce gabbana",
 "dolce gabanna":"dolce gabbana","yves saint laurent ysl":"yves saint laurent",
}
def brandkey(s):
    s=plain(s)
    return ALIASES.get(s,s)

def identity(s,brand):
    s=plain(s)
    for alias,canonical in ALIASES.items():
        if canonical==brandkey(brand):
            s=s.replace(alias," ")
    for term in [plain(brand),"lattafa pride","lattafa","armaf","bharara"]:
        if term: s=s.replace(term," ")
    s=s.replace("eau de parfum"," edp ").replace("eau de toilette"," edt ").replace("eau de cologne"," edc ")
    s=s.replace("odyseey","odyssey").replace("lichi","li chi").replace("l aventure","laventure")
    s=s.replace("leau","l eau").replace("vida es bella","vie est belle")
    s=s.replace("5ta avenida","5th avenue").replace("tubees","tubbees").replace("cheescake","cheesecake")
    s=s.replace("cedrat boise intense","intense cedrat boise")
    s=re.sub(r"\b\d+(?:\s*\.\s*\d+)?\s*(ml|oz)\b"," ",s)
    s=re.sub(r"\b(for|pour|men|man|homme|hombre|women|woman|femme|mujer|unisex|edp|edt|edc|parfum|extrait|de|intensementx|clasico|edition|perfumes|perfume|spray)\b"," ",s)
    return " ".join(s.split())

def concentration_ok(p,s):
    expected={"Eau de Parfum":"edp","Eau de Toilette":"edt","Eau de Cologne":"edc",
        "Parfum":"parfum","Extrait de Parfum":"extrait","Eau de Parfum Intense":"edp",
        "Eau de Toilette Intense":"edt","Le Parfum":"parfum","Parfum Intense":"parfum"}.get(p["concentracion"])
    if not expected:return False
    variants=[v for v in s["variants"] if not any(w in v.lower() for w in ["+","gift","preowned","after shave"])]
    evidence=plain(" ".join(variants))
    evidence=evidence.replace("eau de parfum","edp").replace("eau de toilette","edt").replace("eau de cologne","edc")
    explicit=re.findall(r"\b(edp|edt|edc|parfum|extrait)\b", evidence)
    if explicit: return expected in explicit and not (expected=="parfum" and "extrait" in explicit)
    # Manufacturer pages often put concentration outside their size-only variants.
    if s["source"]!="perfumeonline":
        if s["source"]=="lattafa" and expected=="edp":return True
        evidence=plain(" ".join([s["title"]]+s.get("tags",[]))).replace("eau de parfum","edp").replace("eau de toilette","edt")
        return bool(re.search(r"\b"+expected+r"\b",evidence))
    return False

def gender_ok(p,s):
    evidence=plain(s["title"]+" "+s.get("product_type","")+" "+s["url"].split("/")[-1])
    female=bool(re.search(r"\b(women|woman|femme|female|donna)\b",evidence))
    male=bool(re.search(r"\b(men|man|homme|male|uomo)\b",evidence))
    if p["genero"]=="Hombre" and female and not male:return False
    if p["genero"]=="Mujer" and male and not female:return False
    return True

def bodytext(s):
    return re.sub(r"\s+"," ",unescape(re.sub(r"<[^>]+>"," ",s or ""))).strip()

def notes(s):
    body=s.get("body") or ""
    blocks=re.findall(r'class="notesfinal"[^>]*>(.*?)</div>',body,re.I|re.S)
    groups={}
    joined=" ".join(bodytext(block) for block in blocks)
    tiers=re.search(
        r"Top Notes\s*:?\s*(.*?)\s*(?:Middle|Heart) Notes\s*:?\s*(.*?)\s*Base Notes\s*:?\s*(.*)",
        joined,
        re.I,
    )
    if tiers:
        groups=dict(zip(["salida","corazon","fondo"],tiers.groups()))
    for b in blocks:
        txt=bodytext(b)
        m=re.match(r"(Top|Middle|Heart|Base) Notes\s*:?\s*(.+)",txt,re.I)
        if m and not tiers:groups[{"top":"salida","middle":"corazon","heart":"corazon","base":"fondo"}[m[1].lower()]]=m[2]
    if len(groups)<3:
        txt=bodytext(body)
        m=re.search(r"Opening with (.+?), the heart reveals (.+?), resting on a base of ([^.]+)",txt,re.I)
        if m:groups=dict(zip(["salida","corazon","fondo"],m.groups()))
    return {
        k:[n.strip().strip(".") for n in re.split(r",|;|\s+and\s+",re.split(r"Available in\s*:",v,flags=re.I)[0]) if n.strip() and n.strip()!="0"]
        for k,v in groups.items()
    }

def run():
    catalog=json.loads((ROOT/"catalog/august-products.json").read_text(encoding="utf-8"))
    indexed=defaultdict(list)
    for key in ["armaf","lattafa","bharara","perfumeonline"]:
        for source in json.loads((ROOT/f".tmp-catalog-august/sources/{key}.json").read_text(encoding="utf-8")):
            source["source"]=key
            vendor=brandkey(source["vendor"])
            if key!="perfumeonline":vendor=key
            source["identity"]=identity(source["title"],vendor)
            indexed[vendor].append(source)
    matches,review=[],[]
    for p in catalog["records"]:
        if p["origen_ref"] in [7,8,9,10] or not p["activo"]:continue
        target=identity(p["nombre"],p["marca"])
        candidates=[]
        for s in indexed.get(brandkey(p["marca"]),[]):
            if any(t in plain(s["title"]) for t in ["gift set","body spray","body lotion","roll on","perfumed stick","deodorant","discovery","body mist"]):continue
            # Exact name identity, with explicitly matching concentration.
            score=SequenceMatcher(None,target,s["identity"]).ratio()
            candidates.append((score,s))
        candidates.sort(key=lambda v:-v[0])
        exact=[s for score,s in candidates if score==1 and concentration_ok(p,s) and gender_ok(p,s)]
        if exact and p["tipo_producto"] in ["Perfume","Tester"]:
            source=exact[0]
            matches.append({"fila":p["origen_ref"],"target":p["presentacion_proveedor"],"source":source,
                "notes":notes(source)})
        elif candidates:
            review.append({"fila":p["origen_ref"],"target":p["presentacion_proveedor"],
                "suggestions":[{"score":round(score,3),"title":s["title"],"url":s["url"]} for score,s in candidates[:2]]})
    (ROOT/".tmp-catalog-august/source-matches.json").write_text(json.dumps(matches,ensure_ascii=False,indent=2),encoding="utf-8")
    (ROOT/".tmp-catalog-august/source-review.json").write_text(json.dumps(review,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps({"exact":len(matches),"notes":sum(len(m["notes"])==3 for m in matches),"review":len(review)}))
    for m in matches:
        print(f'{m["fila"]}: {m["target"]} => {m["source"]["title"]} [{m["source"]["source"]}]')

if __name__=="__main__":run()
