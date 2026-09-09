"""Render one safe, public catalog upsert batch for Supabase."""

import argparse
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_FIELDS = (
    "slug",
    "nombre",
    "marca",
    "precio_crc",
    "imagen_url",
    "familia",
    "genero",
    "ocasiones",
    "acordes",
    "notas_salida",
    "notas_corazon",
    "notas_fondo",
    "duracion",
    "proyeccion",
    "estela",
    "valoracion",
    "descripcion",
    "disponibilidad",
    "activo",
    "orden",
    "sku",
    "concentracion",
    "tamano_ml",
    "fuentes",
    "origen_ref",
    "presentacion_proveedor",
    "tipo_producto",
    "ficha_estado",
)


def render(offset: int, limit: int) -> str:
    source = json.loads(
        (ROOT / "catalog" / "august-products.json").read_text(encoding="utf-8")
    )
    active = [record for record in source["records"] if record["activo"]]
    batch = [
        {field: record.get(field) for field in PUBLIC_FIELDS}
        for record in active[offset : offset + limit]
    ]
    if not batch:
        raise ValueError("The requested catalog batch is empty")
    payload = json.dumps(batch, ensure_ascii=False, separators=(",", ":"))
    if "$catalog$" in payload:
        raise ValueError("Unexpected SQL delimiter in catalog data")

    columns = ", ".join(PUBLIC_FIELDS)
    updates = ",\n      ".join(
        f"{field} = excluded.{field}"
        for field in PUBLIC_FIELDS
        if field != "origen_ref"
    )
    return f"""with incoming as (
  select *
  from jsonb_to_recordset($catalog${payload}$catalog$::jsonb) as data(
    slug text,
    nombre text,
    marca text,
    precio_crc integer,
    imagen_url text,
    familia text,
    genero text,
    ocasiones text[],
    acordes jsonb,
    notas_salida text[],
    notas_corazon text[],
    notas_fondo text[],
    duracion smallint,
    proyeccion smallint,
    estela smallint,
    valoracion numeric(2,1),
    descripcion text,
    disponibilidad text,
    activo boolean,
    orden integer,
    sku text,
    concentracion text,
    tamano_ml integer,
    fuentes jsonb,
    origen_ref integer,
    presentacion_proveedor text,
    tipo_producto text,
    ficha_estado text
  )
)
insert into public.catalog_perfumes ({columns})
select {columns} from incoming
on conflict (origen_ref) where origen_ref is not null do update set
      {updates},
      updated_at = now();
"""


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--offset", type=int, required=True)
    parser.add_argument("--limit", type=int, default=150)
    args = parser.parse_args()
    print(render(args.offset, args.limit))
