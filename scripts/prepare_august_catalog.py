"""Build a public, cost-free catalog from the private supplier extraction."""
import json
from decimal import Decimal
from pathlib import Path
import re
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
BRANDS = """
ABERCROMBIE & FITCH|Abercrombie & Fitch
ACQUA DI PARISIS|Acqua di Parisis
ADIDAS|Adidas
AFNAN|Afnan
AGATHA RUIZ DE LA PRADA|Agatha Ruiz de la Prada
AL HARAMAIN|Al Haramain
AMARAN|Amaran
ANIMALE|Animale
ANTONIO B|Antonio Banderas
ARIANA GRANDE|Ariana Grande
ARMAF|Armaf
AZZARO|Azzaro
BENETTON|Benetton
BHARARA|Bharara
BILLIE EILISH|Billie Eilish
BOUCHERON|Boucheron
BRITNEY SPEARS|Britney Spears
BULGARI|Bvlgari
BURBERRY|Burberry
CACHAREL|Cacharel
CAROLINA HERRERA|Carolina Herrera
CARTIER|Cartier
CHANEL|Chanel
CHARLIE|Revlon
CK|Calvin Klein
COOL WATER|Davidoff
DAVIDOFF|Davidoff
CREED|Creed
CRISTIANO RONALDO|Cristiano Ronaldo
CURVE|Liz Claiborne
DIOR|Dior
DKNY|DKNY
DOLCE & GABANNA|Dolce & Gabbana
DOLCE & GABBANA|Dolce & Gabbana
DRAKKAR|Guy Laroche
DUMONT|Dumont
ELIZABETH ARDEN|Elizabeth Arden
ELIZABETH TAYLOR|Elizabeth Taylor
ELSATYS|Elsatys
GENTLE ELSATYS|Elsatys
EMPER|Emper
ESTEE LAUDER|Estée Lauder
FLAUNT|Flaunt
FRED HAYMAN|Fred Hayman
FRENCH AVENUE|French Avenue
BATH & BODY WORKS|Bath & Body Works
GIORGIO ARMANI|Giorgio Armani
GIORGIO VALENTI|Giorgio Valenti
GISADA|Gisada
GIVENCHY|Givenchy
GLORIA VANDERBILT|Gloria Vanderbilt
GRANDEUR|Grandeur
GUESS|Guess
HALLOWEEN|Halloween
HAPPY CLINIQUE|Clinique
HUGO BOSS|Hugo Boss
ISSEY MIYAKE|Issey Miyake
J LO|Jennifer Lopez
JEAN PAUL GAULTIER|Jean Paul Gaultier
JO MILANO|Jo Milano
JOOP|Joop!
JOVAN|Jovan
KATY PERRY|Katy Perry
KENNETH COLE|Kenneth Cole
KENZO|Kenzo
KHADLAJ|Khadlaj
LACOSTE|Lacoste
LAMBORGHINI|Tonino Lamborghini
LANCOME|Lancôme
LAPIDUS|Ted Lapidus
LATTAFA|Lattafa
LE FALCONE|Le Falcone
LOLITA LEMPICKA|Lolita Lempicka
MAISON ALHAMBRA|Maison Alhambra
MANCERA|Mancera
MARC JACOBS|Marc Jacobs
MAST PERFUME|Mast Perfume
MATIN MARTIN|Matin Martin
MERAZUR|Merazur
MESSI|Messi
MONT BLANC|Montblanc
MOSCHINO|Moschino
NAUTICA|Nautica
NINA RICCI|Nina Ricci
ORIENTICA|Orientica
OSCAR DE LA RENTA|Oscar de la Renta
PACO RABANNE|Rabanne
PARFUMS DE MARLY|Parfums de Marly
PARIS CORNER|Paris Corner
PARIS HILTON|Paris Hilton
PERRY ELLIS|Perry Ellis
PRADA|Prada
RALPH LAUREN|Ralph Lauren
RASASI|Rasasi
RAVE|Rave
RAYHAAN|Rayhaan
ROCHAS|Rochas
SABRINA CARPENTER|Sabrina Carpenter
SALVATORE FERRAGAMO|Salvatore Ferragamo
SWISS ARMY|Victorinox
TERRE D HERMES|Hermès
TOMMY HILFIGER|Tommy Hilfiger
TOUS|Tous
UNITED COLORS|Benetton
VALENTINO|Valentino
VERSACE|Versace
VIKTOR & ROLF|Viktor & Rolf
VOLARE|Volare
XERJOFF|Xerjoff
XOXO|XOXO
YARA|Lattafa
YSL|Yves Saint Laurent
BOMBSHELL|Victoria's Secret
PINK|Victoria's Secret
VICTORIA´S SECRET|Victoria's Secret
""".strip()
BRAND_MAP = sorted([line.split("|") for line in BRANDS.splitlines()], key=lambda x: -len(x[0]))
KEEP_PREFIX = {"CHARLIE", "COOL WATER", "CURVE", "DRAKKAR", "ELSATYS", "HAPPY CLINIQUE", "MESSI", "TERRE D HERMES", "YARA", "XOXO", "BOMBSHELL"}
EXCLUDED = {132,134,135,136,137,138,169,212,213,214,635}
# These descriptions identify a sellable group, but not one exact fragrance.
AMBIGUOUS = {6,306,382,470,599,646,647,649,650,651,653,654,655,656,657,658,660,661}
CONCENTRATIONS = {"EDP":"Eau de Parfum","EDT":"Eau de Toilette","EDC":"Eau de Cologne",
    "EDPI":"Eau de Parfum Intense","EDTI":"Eau de Toilette Intense",
    "PARFUM":"Parfum","EXTRAIT DE PARFUM":"Extrait de Parfum","LE PARFUM":"Le Parfum",
    "PARFUM INTENSE":"Parfum Intense"}
CONC_RE = r"\b(?:EXTRAIT DE PARFUM|PARFUM INTENSE|LE PARFUM|EDPI|EDTI|EDP|EDT|EDC|PARFUM)\b"

def slug(text):
    plain = unicodedata.normalize("NFKD", text).encode("ascii","ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", plain).strip("-")

def prepare():
    private = json.loads((ROOT/".tmp-catalog-august/extracted-private.json").read_text(encoding="utf-8"))
    reviewed = {p["fila"]: p for p in json.loads((ROOT/"catalog/reviewed-august.json").read_text(encoding="utf-8"))["records"]}
    records, excluded = [], []
    for row in private["rows"]:
        ref = row["fila"]
        original = row["descripcion_original"]
        if ref in EXCLUDED:
            excluded.append({"fila":ref,"descripcion":original,"motivo":"Accesorio o envase vacío, no es una fragancia"})
            continue
        kind = "Perfume"
        prefix = re.match(r"^(ESTUCHE|SET|TESTER|DECANT|MINI|SPLASH|SPRAY|DESODORANTE|GEL DE BAÑO|JABON DE MANOS)\s+", original)
        core = original
        if prefix:
            kind = {"ESTUCHE":"Estuche","SET":"Estuche","TESTER":"Tester","DECANT":"Decant","MINI":"Miniatura"}.get(prefix[1],"Corporal")
            core = original[prefix.end():]
        pair = next((pair for pair in BRAND_MAP if core == pair[0] or core.startswith(pair[0]+" ")), None)
        brand = pair[1] if pair else "Por confirmar"
        name = core if not pair or pair[0] in KEEP_PREFIX else core[len(pair[0]):].strip()
        concentration = re.search(CONC_RE, core)
        name = re.sub(CONC_RE, "", name)
        name = re.sub(r"\b\d+(?:[.,]\d+)?\s*ML\b", "", name)
        name = re.sub(r"\s+", " ", name).strip().title() or brand
        if kind != "Perfume":
            name = kind + " · " + name
        volume = row["volumenes_ml"][0] if len(row["volumenes_ml"]) == 1 and kind != "Estuche" else None
        amount = Decimal(row["costo_crc_privado"]) * Decimal("1.70")
        if amount != amount.to_integral():
            raise ValueError(f"Fractional colones require review, row {ref}")
        gender = ("Unisex" if "UNISEX" in core else
                  "Mujer" if re.search(r"\b(MUJER|WOMAN|WOMEN|FEMME|FEMINA|DONNA)\b",core) else
                  "Hombre" if re.search(r"\b(HOMBRE|HOMME|MAN|MEN|UOMO)\b",core) else None)
        product = {
            "slug":slug(brand+" "+name+" "+str(volume or "")+" "+str(ref)),
            "nombre":name,"marca":brand,"precio_crc":int(amount),
            "tamano_ml":int(volume) if volume and Decimal(volume) == Decimal(volume).to_integral() else None,
            "concentracion":CONCENTRATIONS.get(concentration[0]) if concentration else None,
            "familia":None,"genero":gender,"ocasiones":[],"acordes":[],
            "notas_salida":[],"notas_corazon":[],"notas_fondo":[],
            "duracion":None,"proyeccion":None,"estela":None,"valoracion":None,
            "descripcion":"","imagen_url":None,"fuentes":[],
            "disponibilidad":"bajo_pedido","activo":True,
            "orden":1000+ref,"sku":f"AGOSTO-2026-{ref:04}",
            "tipo_producto":kind,
            "ficha_estado":"requiere_revision" if ref in AMBIGUOUS or pair is None else "pendiente",
            "origen_ref":ref,
            "presentacion_proveedor":original,
        }
        if ref in reviewed:
            known=reviewed[ref]
            product.update({k:v for k,v in known.items() if k not in ("fila","fuente","acordes")})
            product.update(acordes=[{"nombre":n,"emoji":""} for n in known["acordes"]],
                fuentes=[{"titulo":"Ficha oficial de Afnan","url":known["fuente"],"fecha":"2026-09-08"}],
                orden=ref,ficha_estado="verificada")
        records.append(product)
    assert len(records)+len(excluded)==742
    assert len({p["slug"] for p in records})==len(records)
    result={"status":"enrichment_in_progress","records":records,"excluded":excluded}
    output=ROOT/"catalog/august-products.json"
    output.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps({"records":len(records),"active":sum(p["activo"] for p in records),
        "excluded":len(excluded),"unknown_brands":[p["origen_ref"] for p in records if p["marca"]=="Por confirmar"]}))

if __name__ == "__main__":
    prepare()
