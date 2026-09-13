# Premium Catalog Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Proporcionar a las 731 referencias del catálogo una presentación visual premium que conserve exactamente el producto real, personalice el entorno y funcione de forma rápida y consistente en móvil, tablet y escritorio.

**Architecture:** El catálogo seguirá guardando una URL final por producto, mientras un manifiesto auditable registrará el origen, fidelidad y tratamiento de cada imagen. La interfaz añadirá una capa de escenario determinista basada en familia, acordes y marca, permitiendo que packshots exactos se vean editoriales sin alterar etiquetas; los casos que no puedan resolverse limpiamente mediante composición serán editados de forma individual y publicados en Supabase Storage.

**Tech Stack:** React 19, TypeScript, CSS, Python 3 para auditoría y generación mecánica de manifiestos, Supabase Postgres/Storage, pruebas `node:test`, Vite y Vercel.

**Spec:** `docs/superpowers/specs/2026-09-12-premium-catalog-images-design.md`

## Global Constraints

- El frasco, tapa, etiqueta, logotipo, texto, color del líquido, empaque y proporciones deben permanecer fieles al producto real.
- No se utilizará la imagen de otro flanker, concentración o presentación cuando el diseño comercial cambie.
- Los 13 registros ambiguos conservarán un arte neutral de categoría y no una variante inventada.
- Ninguna imagen identificable terminará como un packshot blanco sin dirección artística.
- La relación visual final será 4:5 y funcionará en cards y detalle.
- Los recursos finales usarán HTTPS y estarán bajo control del proyecto.
- No se expondrán credenciales ni claves de servicio en el cliente.

---

### Task 1: Manifiesto auditable y clasificación de cobertura

**Files:**
- Create: `scripts/audit_catalog_images.py`
- Create: `catalog/image-manifest.json`
- Test: `tests/catalog-image-manifest.test.ts`

**Interfaces:**
- Consumes: `catalog/august-products.json`, usando `origen_ref`, `slug`, `nombre`, `marca`, `imagen_url`, `familia`, `acordes`, `tipo_producto` y `presentacion_proveedor`.
- Produces: `catalog/image-manifest.json` con `version`, `generated_at`, `records[]`; cada registro expone `ref`, `slug`, `source_url`, `source_kind`, `fidelity_status`, `treatment`, `final_url`, `review_status` y `notes`.

- [ ] **Step 1: Write the failing manifest contract test**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import manifest from "../catalog/image-manifest.json" with { type: "json" };

test("image manifest covers every catalog reference exactly once", () => {
  assert.equal(manifest.records.length, 731);
  assert.equal(new Set(manifest.records.map((row) => row.ref)).size, 731);
});

test("identified products never claim a different product image", () => {
  const allowed = new Set(["verified_exact", "needs_exact_source", "category_neutral"]);
  assert.ok(manifest.records.every((row) => allowed.has(row.fidelity_status)));
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test tests/catalog-image-manifest.test.ts`

Expected: FAIL because `catalog/image-manifest.json` does not exist.

- [ ] **Step 3: Implement the auditor**

Implement `scripts/audit_catalog_images.py` so `classify(record: dict) -> dict` applies these exact rules:

```python
AMBIGUOUS_REFS = {6, 25, 653, 654, 655, 656, 657, 658, 660, 661, 691, 692, 693}

def classify(record):
    image_url = record.get("imagen_url") or ""
    if record["origen_ref"] in AMBIGUOUS_REFS:
        fidelity = "category_neutral"
    elif image_url.startswith("https://"):
        fidelity = "verified_exact"
    else:
        fidelity = "needs_exact_source"
    return {
        "ref": record["origen_ref"],
        "slug": record["slug"],
        "source_url": image_url or None,
        "source_kind": "remote" if image_url else "missing",
        "fidelity_status": fidelity,
        "treatment": "retain_or_reframe" if image_url else "acquire_exact_packshot",
        "final_url": None,
        "review_status": "pending",
        "notes": "",
    }
```

The script must reject duplicate refs and write UTF-8 JSON with stable ref ordering.

- [ ] **Step 4: Generate and validate the manifest**

Run: `python -X utf8 scripts/audit_catalog_images.py`

Expected: summary containing `total=731`, `with_source=295`, `missing_source=436`, `ambiguous=13`.

Run: `node --test tests/catalog-image-manifest.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/audit_catalog_images.py catalog/image-manifest.json tests/catalog-image-manifest.test.ts
git commit -m "Add auditable catalog image manifest"
```

### Task 2: Motor de dirección artística determinista

**Files:**
- Create: `src/lib/productVisual.ts`
- Test: `tests/product-visual.test.ts`

**Interfaces:**
- Consumes: `Perfume` from `src/data/perfumes.ts`.
- Produces: `getProductVisual(perfume: Perfume): ProductVisual`, where `ProductVisual` contains `scene`, `accent`, `accentSoft`, `surface`, `glow` and `objectPosition`.

- [ ] **Step 1: Write failing style resolver tests**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { getProductVisual } from "../src/lib/productVisual";

test("marine profiles receive a cold aquatic art direction", () => {
  const visual = getProductVisual({ familia: "Acuática", acordes: [{ nombre: "Marino" }] } as never);
  assert.equal(visual.scene, "aquatic");
});

test("gourmand profiles receive warm editorial lighting", () => {
  const visual = getProductVisual({ familia: "Gourmand", acordes: [{ nombre: "Vainilla" }] } as never);
  assert.equal(visual.scene, "gourmand");
});
```

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/product-visual.test.ts`

Expected: FAIL because `getProductVisual` is missing.

- [ ] **Step 3: Implement the resolver**

Create these scene keys and priority order: `aquatic`, `citrus`, `floral`, `gourmand`, `wood`, `oriental`, `fresh`, `neutral`. Normalize accents and case with the existing search normalization utility. Return CSS-ready colors and never derive from `imagen_url`.

```ts
export type ProductScene = "aquatic" | "citrus" | "floral" | "gourmand" | "wood" | "oriental" | "fresh" | "neutral";

export interface ProductVisual {
  scene: ProductScene;
  accent: string;
  accentSoft: string;
  surface: string;
  glow: string;
  objectPosition: string;
}
```

- [ ] **Step 4: Verify deterministic output**

Run: `node --test tests/product-visual.test.ts`

Expected: PASS for all eight visual families and accent-insensitive inputs.

- [ ] **Step 5: Commit**

```bash
git add src/lib/productVisual.ts tests/product-visual.test.ts
git commit -m "Add metadata-driven product art direction"
```

### Task 3: Componente visual reutilizable para card y detalle

**Files:**
- Create: `src/components/molecules/ProductArtwork.tsx`
- Create: `src/styles/product-artwork.css`
- Modify: `src/components/molecules/PerfumeCard.tsx`
- Modify: `src/components/organisms/PerfumeDetail.tsx`
- Modify: `src/index.css`
- Test: `tests/product-artwork.test.ts`

**Interfaces:**
- Consumes: `perfume: Perfume`, `priority?: boolean`, `variant: "card" | "detail"`.
- Produces: one reserved-ratio visual surface with exact product image, deterministic backdrop, loading behavior and premium fallback.

- [ ] **Step 1: Write the failing integration test**

```ts
import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("cards and details share ProductArtwork", () => {
  const card = fs.readFileSync("src/components/molecules/PerfumeCard.tsx", "utf8");
  const detail = fs.readFileSync("src/components/organisms/PerfumeDetail.tsx", "utf8");
  assert.match(card, /<ProductArtwork/);
  assert.match(detail, /<ProductArtwork/);
});
```

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/product-artwork.test.ts`

Expected: FAIL because both consumers still render raw `<img>` elements.

- [ ] **Step 3: Implement `ProductArtwork`**

The component must set CSS custom properties from `getProductVisual`, render three backdrop layers, render the product image with `alt`, `decoding="async"`, card-only lazy loading, and replace load failures with `/images/perfume-placeholder.svg`. The component must not mutate the source URL.

```tsx
<div className={`product-artwork product-artwork--${variant} scene-${visual.scene}`} style={style}>
  <span className="product-artwork__glow" aria-hidden="true" />
  <span className="product-artwork__surface" aria-hidden="true" />
  <img className="product-artwork__image" src={perfume.imagen} alt={`${perfume.nombre} de ${perfume.marca}`} />
</div>
```

- [ ] **Step 4: Implement premium CSS scenes**

Create scene-specific radial gradients, reflective surfaces, restrained texture, shadow and depth. Use `isolation: isolate`, `overflow: hidden`, `aspect-ratio: 4 / 5`, `object-fit: contain`, and `mix-blend-mode: multiply` only behind a feature query/class intended for verified white-background packshots. Respect `prefers-reduced-motion`.

- [ ] **Step 5: Replace duplicate image rendering**

Use `ProductArtwork` in `PerfumeCard.tsx` and `PerfumeDetail.tsx`; preserve existing arrow, availability and product-type overlays by rendering them as siblings positioned over the artwork.

- [ ] **Step 6: Verify**

Run: `node --test tests/product-artwork.test.ts tests/catalog-ui.test.ts`

Expected: PASS.

Run: `pnpm build`

Expected: all tests, TypeScript and Vite build pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/molecules/ProductArtwork.tsx src/components/molecules/PerfumeCard.tsx src/components/organisms/PerfumeDetail.tsx src/styles/product-artwork.css src/index.css tests/product-artwork.test.ts
git commit -m "Render products in premium editorial scenes"
```

### Task 4: Pipeline segura para recursos propios

**Files:**
- Create: `scripts/prepare_catalog_image_uploads.py`
- Create: `scripts/render_image_updates_sql.py`
- Create: `supabase/migrations/20260912_catalog_image_metadata.sql`
- Test: `tests/catalog-image-pipeline.test.ts`

**Interfaces:**
- Consumes: `catalog/image-manifest.json` plus final files under `public/images/catalog-source/` and `public/images/catalog-final/`.
- Produces: validated upload queue and SQL updates keyed only by `origen_ref`.

- [ ] **Step 1: Write failing pipeline safety tests**

Test that filenames match `^\d{4}-[a-z0-9-]+\.(webp|png|jpg)$`, every update URL uses HTTPS, no supplier cost is emitted, and all SQL updates use `where origen_ref = <integer>`.

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/catalog-image-pipeline.test.ts`

Expected: FAIL because pipeline scripts are absent.

- [ ] **Step 3: Add metadata migration**

Create `public.catalog_perfume_images` fields `origen_ref integer`, `source_url text`, `storage_path text`, `width integer`, `height integer`, `fidelity_status text`, `treatment text`, `review_status text`, `reviewed_at timestamptz`; enforce one row per `origen_ref`, enable RLS and allow public `select` only. Do not grant public write access.

- [ ] **Step 4: Implement upload preparation**

The Python script must inspect dimensions, reject files below 800×1000, reject unsupported formats, calculate SHA-256, detect duplicate content and emit `catalog/image-upload-queue.json` without credentials.

- [ ] **Step 5: Implement SQL renderer**

Render idempotent metadata upserts and `catalog_perfumes.imagen_url` updates from reviewed manifest rows only. Reject `review_status != "approved"` and `fidelity_status == "needs_exact_source"`.

- [ ] **Step 6: Verify and commit**

Run: `node --test tests/catalog-image-pipeline.test.ts`

Expected: PASS.

```bash
git add scripts/prepare_catalog_image_uploads.py scripts/render_image_updates_sql.py supabase/migrations/20260912_catalog_image_metadata.sql tests/catalog-image-pipeline.test.ts
git commit -m "Add safe catalog image publishing pipeline"
```

### Task 5: Adquisición y producción por lotes

**Files:**
- Modify: `catalog/image-manifest.json`
- Create: `research/image-sources-reviewed.json`
- Create: `public/images/catalog-source/*`
- Create: `public/images/catalog-final/*`

**Interfaces:**
- Consumes: exact supplier presentation plus official brand/distributor sources.
- Produces: approved 4:5 artwork for every identified reference and neutral category artwork for the 13 ambiguous refs.

- [ ] **Step 1: Process references 1–150**

For each record, verify exact flanker, concentration, size and packaging. Save the source, classify it as `editorial`, `white_packshot` or `requires_edit`, and reject uncertain matches.

- [ ] **Step 2: Process references 151–300**

Repeat the same identity and quality gate; reuse one source only for duplicate catalog rows that truly share the same physical presentation.

- [ ] **Step 3: Process references 301–450**

For corporal items with unspecified aroma, produce neutral branded category art and keep `fidelity_status="category_neutral"`.

- [ ] **Step 4: Process references 451–600**

Use exact official packshots when available. For white packshots, preserve the product pixels and create a 4:5 environment based on `ProductVisual`.

- [ ] **Step 5: Process references 601–731**

For mixed sets, show every included bottle in the correct package configuration. Keep all 13 ambiguous items neutral.

- [ ] **Step 6: Edit only images that fail compositing**

Use one image-edit operation per failing asset with this invariant prompt:

```text
Use case: precise-object-edit
Asset type: luxury perfume catalog product artwork, vertical 4:5
Primary request: replace only the existing background with a restrained premium editorial scene derived from the fragrance profile
Constraints: preserve the bottle, cap, label, logo, typography, packaging, liquid color, proportions and every product pixel exactly; no invented text; no watermark
Avoid: plain white background, label distortion, duplicate bottles, excessive props, busy composition
```

- [ ] **Step 7: Run visual QA and approve manifest rows**

Inspect each final asset for identity, readable label, clean edges, 4:5 framing and premium background. Only then set `review_status="approved"` and `final_url`.

- [ ] **Step 8: Commit each approved batch**

Use one commit per 150-reference batch, e.g. `Add approved premium images for refs 1-150`.

### Task 6: Supabase Storage and database synchronization

**Files:**
- Modify: `catalog/image-manifest.json`
- Modify: `catalog/august-products.json`

**Interfaces:**
- Consumes: approved upload queue and final assets.
- Produces: public immutable Storage URLs and matching `catalog_perfumes.imagen_url` values.

- [ ] **Step 1: Confirm bucket policy and project**

Verify project `qsslgyidtpxuvysfxycy`, bucket visibility, RLS and current table counts before upload. Never expose a service key.

- [ ] **Step 2: Upload approved assets**

Use stable paths `catalog/<ref>/<slug>-v1.webp`; set long-lived cache control and do not overwrite a versioned object.

- [ ] **Step 3: Apply reviewed metadata updates**

Execute the generated idempotent SQL in batches and verify every updated `origen_ref` resolves to its expected Storage URL.

- [ ] **Step 4: Verify database invariants**

Query for 731 total rows, 718 identified rows with non-null HTTPS `imagen_url`, 13 neutral ambiguous rows, and zero duplicate Storage paths.

- [ ] **Step 5: Commit catalog URLs**

```bash
git add catalog/image-manifest.json catalog/august-products.json
git commit -m "Publish premium catalog image URLs"
```

### Task 7: Responsive verification and production deployment

**Files:**
- Modify only files required by verified defects found during this task.

**Interfaces:**
- Consumes: completed catalog, Storage assets and shared `ProductArtwork` component.
- Produces: verified GitHub `main`, Supabase production data and Vercel production deployment.

- [ ] **Step 1: Run automated verification**

Run: `pnpm build`

Expected: all tests pass, TypeScript reports no errors and Vite produces a production build.

- [ ] **Step 2: Verify responsive behavior**

Check widths 360, 390, 430, 768, 1024 and 1440 px. Confirm no crop hides labels, cards reserve space, detail images fit, and search/filter interactions remain usable.

- [ ] **Step 3: Verify representative visual families**

Open at least two products from every scene key and one product from each treatment class (`editorial`, `white_packshot`, `requires_edit`, `category_neutral`).

- [ ] **Step 4: Push GitHub**

Run: `git push origin HEAD:main`

Expected: remote `main` points to the verified commit.

- [ ] **Step 5: Verify Vercel deployment**

Wait for the deployment tied to the final commit to reach `READY`, then fetch `https://essence-luxe-catalog.vercel.app/` and confirm HTTP 200.

- [ ] **Step 6: Verify live Supabase image coverage**

Confirm the production table has 731 rows and every identified reference returns its expected final image URL.

- [ ] **Step 7: Record final evidence**

Report commit SHA, deployment ID, live URL, coverage counts, test results and any of the 13 ambiguity notes that still require supplier clarification.
