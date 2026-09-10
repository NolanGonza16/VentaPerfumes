"""Derive filter/display fields only from already sourced catalog evidence."""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "catalog" / "august-products.json"
AMBIGUOUS_REFS = {6, 25, 653, 654, 655, 656, 657, 658, 660, 661, 691, 692, 693}


def norm(value: object) -> str:
    value = " ".join(str(item or "") for item in value) if isinstance(value, list) else str(value or "")
    value = unicodedata.normalize("NFKD", value.casefold())
    return "".join(char for char in value if not unicodedata.combining(char))


def main() -> None:
    document = json.loads(CATALOG.read_text(encoding="utf-8"))
    changed = 0
    for record in document["records"]:
        if int(record["origen_ref"]) in AMBIGUOUS_REFS:
            continue
        evidence = norm([
            record.get("nombre", ""), record.get("presentacion_proveedor", ""),
            record.get("descripcion", ""), record.get("concentracion", ""),
        ])
        accords = [item.get("nombre", "") if isinstance(item, dict) else str(item) for item in record.get("acordes", [])]
        profile = norm(accords + record.get("notas_salida", []) + record.get("notas_corazon", []) + record.get("notas_fondo", []))

        if not record.get("genero"):
            if re.search(r"\b(unisex|hombres y mujeres|women and men)\b", evidence):
                record["genero"] = "Unisex"
            elif re.search(r"\b(hombre|men|man|homme|uomo|masculin[oa])\b", evidence):
                record["genero"] = "Hombre"
            elif re.search(r"\b(mujer|women|woman|femme|donna|femenin[oa])\b", evidence):
                record["genero"] = "Mujer"

        if not record.get("familia") and profile:
            family_rules = [
                ("Gourmand", ("gourmand", "caramelo", "chocolate", "tofe", "praline")),
                ("Oriental", ("oriental", "ambar", "oud", "incienso", "resina")),
                ("Amaderada", ("amader", "cedro", "sandalo", "vetiver", "pachuli")),
                ("Floral", ("floral", "rosa", "jazmin", "nard", "peonia", "violeta")),
                ("Aromática", ("aromatic", "lavanda", "salvia", "romero")),
                ("Cítrica", ("citr", "bergamota", "limon", "mandarina", "toronja")),
                ("Acuática", ("acuatic", "marino", "agua de mar", "ozonic")),
                ("Especiada", ("especiad", "pimienta", "cardamomo", "canela")),
            ]
            scores = [(sum(term in profile for term in terms), family) for family, terms in family_rules]
            score, family = max(scores)
            if score:
                record["familia"] = family

        if not record.get("ocasiones") and record.get("familia"):
            family = norm(record["familia"])
            if any(term in family or term in profile for term in ("oriental", "ambar", "gourmand", "cuero", "oud", "tabaco")):
                record["ocasiones"] = ["Noche", "Citas", "Eventos especiales"]
            elif any(term in family or term in profile for term in ("citric", "acuatic", "fresco", "verde", "aromatic")):
                record["ocasiones"] = ["Diario", "Oficina", "Casual"]
            else:
                record["ocasiones"] = ["Diario", "Citas", "Eventos especiales"]

        if not record.get("descripcion") and all(record.get(field) for field in ("notas_salida", "notas_corazon", "notas_fondo")):
            opening = " y ".join(record["notas_salida"][:2])
            heart = " y ".join(record["notas_corazon"][:2])
            base = " y ".join(record["notas_fondo"][:2])
            family = str(record.get("familia") or "olfativo").lower()
            moment = (record.get("ocasiones") or ["distintas ocasiones"])[0].lower()
            record["descripcion"] = (
                f"{opening} abren esta fragancia de perfil {family}, con un corazón de {heart} "
                f"y un fondo de {base}. Una composición expresiva y equilibrada para {moment}."
            )
        changed += 1
    CATALOG.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"processed": changed}, ensure_ascii=False))


if __name__ == "__main__":
    main()
