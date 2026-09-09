alter table public.catalog_perfumes
  alter column familia drop not null,
  alter column genero drop not null,
  add column if not exists origen_ref integer,
  add column if not exists presentacion_proveedor text,
  add column if not exists tipo_producto text not null default 'Perfume',
  add column if not exists ficha_estado text not null default 'pendiente';

alter table public.catalog_perfumes
  add constraint catalog_perfumes_origen_ref_positive
    check (origen_ref is null or origen_ref > 0),
  add constraint catalog_perfumes_tipo_producto_check
    check (tipo_producto = any (array[
      'Perfume'::text,
      'Tester'::text,
      'Decant'::text,
      'Miniatura'::text,
      'Estuche'::text,
      'Corporal'::text
    ])),
  add constraint catalog_perfumes_ficha_estado_check
    check (ficha_estado = any (array[
      'pendiente'::text,
      'parcial'::text,
      'verificada'::text,
      'requiere_revision'::text
    ]));

create unique index catalog_perfumes_origen_ref_unique
  on public.catalog_perfumes (origen_ref)
  where origen_ref is not null;
