# Catalog data

The source of actual stock is Supabase `public.catalog_perfumes`. Publish a record
by setting `activo = true`. The public browser client only reads active rows. Never
put a secret or service-role key in `VITE_*` variables.

`src/data/perfumes.ts` contains **design examples**, not inventory. They are never
written to Supabase. Until the owner supplies the catalog, an empty database shows
these examples with `isDemo: true` and `source: "empty"`. The UI must identify them
as examples, including in product details, and avoid claiming actual availability.

## React API

`useCatalog()` from `src/hooks/useCatalog.ts` returns:

- `perfumes`: normalized, safe `Perfume[]`.
- `mode`: `loading`, `live`, `demo`, or `offline`.
- `source`: `pending`, `database`, `empty`, `unconfigured`, `cache`, or `unavailable`.
- `loading`: true during initial fetch or refresh.
- `isDemo`: true if the returned products are design examples.
- `error`: a user-safe message or null; an offline state is distinct from an empty database.
- `updatedAt`: timestamp of the last successful response, or null.
- `retry()`: refresh manually (deduplicated while a request is pending).

Data lives in a shared, five-minute memory cache; returning to the catalog does not
repeat a fresh request. A stale cache refreshes on page visibility, returning online,
or catalog mount. A failed refresh retains last live stock and exposes `offline`.
There is no persistent storage of prices. Requests abort after 12 seconds.

## Normalized records and filtering

Use numeric `precioCrc` for filtering and sorting. `precio` is a display string.
`disponibilidad` distinguishes `disponible`, `bajo_pedido`, and `agotado`; the legacy
`disponible` boolean remains for compatibility. Null note arrays become empty arrays,
invalid prices/core identity are rejected, duplicate IDs are removed, and unsafe or
missing image URLs use the local brand image. Render missing score fields (0) as
unavailable data, not a zero-star review.

`src/lib/prices.ts` exports `filterPerfumes`, `getPriceBounds`, `perfumePrice`,
`formatColones`, `parsePrice`, `normalizeText`, and `PRICE_STEP`.

`filterPerfumes(perfumes, { query, family, occasion, gender, minimumPrice,
maximumPrice, sort })` combines criteria with AND. Search ignores accents and finds
each word across name, brand, description, notes, and occasions. Price boundaries
are inclusive. `sort` supports `featured`, `price-asc`, `price-desc`, and `name`;
equal prices retain the curated source order. Hombre/Mujer also include Unisex.

## Verification

Run `node --test tests/*.test.ts` using Node 22.18+ or Node 24+. Tests exercise
malformed API rows, stock status, decimal prices, combined filters, sorting,
cache deduplication, empty and offline states, and retry recovery without a live DB.
