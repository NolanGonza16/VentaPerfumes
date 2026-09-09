alter table public.catalog_perfumes
 alter column duracion drop not null, alter column duracion drop default,
 alter column proyeccion drop not null, alter column proyeccion drop default,
 alter column estela drop not null, alter column estela drop default,
 alter column valoracion drop not null, alter column valoracion drop default,
 alter column disponibilidad set default 'bajo_pedido',
 add column if not exists fuentes jsonb not null default '[]'::jsonb;
comment on column public.catalog_perfumes.fuentes is 'Public evidence URLs only; never wholesale costs or private supplier documents.';
comment on column public.catalog_perfumes.valoracion is 'Null until a sourced rating is available. Never populate synthetic default scores.';
