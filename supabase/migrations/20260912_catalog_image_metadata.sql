create table if not exists public.catalog_perfume_images (
  origen_ref integer primary key references public.catalog_perfumes(origen_ref) on delete cascade,
  source_url text,
  storage_path text not null unique,
  width integer not null check (width >= 800),
  height integer not null check (height >= 1000),
  fidelity_status text not null check (fidelity_status in ('verified_exact', 'category_neutral')),
  treatment text not null,
  review_status text not null default 'pending' check (review_status in ('pending', 'approved', 'rejected')),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.catalog_perfume_images enable row level security;

drop policy if exists "Public can read approved catalog images" on public.catalog_perfume_images;
create policy "Public can read approved catalog images"
on public.catalog_perfume_images for select
to anon, authenticated
using (review_status = 'approved');
