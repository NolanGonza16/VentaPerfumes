create table public.catalog_perfumes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nombre text not null,
  marca text not null,
  precio_crc integer not null check (precio_crc >= 0),
  imagen_url text,
  familia text not null,
  genero text not null check (genero in ('Hombre', 'Mujer', 'Unisex')),
  ocasiones text[] not null default '{}',
  acordes jsonb not null default '[]'::jsonb check (jsonb_typeof(acordes) = 'array'),
  notas_salida text[] not null default '{}',
  notas_corazon text[] not null default '{}',
  notas_fondo text[] not null default '{}',
  duracion smallint not null default 3 check (duracion between 1 and 5),
  proyeccion smallint not null default 3 check (proyeccion between 1 and 5),
  estela smallint not null default 3 check (estela between 1 and 5),
  valoracion numeric(2,1) not null default 4.5 check (valoracion between 0 and 5),
  descripcion text not null default '',
  disponibilidad text not null default 'disponible'
    check (disponibilidad in ('disponible', 'bajo_pedido', 'agotado')),
  destacado boolean not null default false,
  activo boolean not null default true,
  orden integer not null default 0,
  sku text unique,
  concentracion text,
  tamano_ml integer check (tamano_ml is null or tamano_ml > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.catalog_perfume_images (
  id uuid primary key default gen_random_uuid(),
  perfume_id uuid not null references public.catalog_perfumes(id) on delete cascade,
  image_url text not null,
  storage_path text,
  alt_text text not null default '',
  is_primary boolean not null default false,
  orden integer not null default 0,
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  created_at timestamptz not null default now()
);

create unique index catalog_perfume_images_one_primary
  on public.catalog_perfume_images (perfume_id)
  where is_primary;

create index catalog_perfumes_public_order
  on public.catalog_perfumes (activo, orden, marca, nombre);

create index catalog_perfume_images_order
  on public.catalog_perfume_images (perfume_id, orden);

alter table public.catalog_perfumes enable row level security;
alter table public.catalog_perfume_images enable row level security;

grant select on table public.catalog_perfumes to anon, authenticated;
grant select on table public.catalog_perfume_images to anon, authenticated;
revoke insert, update, delete on table public.catalog_perfumes from anon, authenticated;
revoke insert, update, delete on table public.catalog_perfume_images from anon, authenticated;

create policy catalog_perfumes_public_read
  on public.catalog_perfumes for select to anon, authenticated
  using (activo = true);

create policy catalog_perfume_images_public_read
  on public.catalog_perfume_images for select to anon, authenticated
  using (
    exists (
      select 1 from public.catalog_perfumes p
      where p.id = catalog_perfume_images.perfume_id and p.activo = true
    )
  );

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'perfume-images',
  'perfume-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy perfume_images_storage_public_read
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'perfume-images');
