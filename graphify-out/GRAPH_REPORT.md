# Graph Report - VentaPerfumes  (2026-09-13)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 331 nodes · 505 edges · 41 communities (26 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `557400db`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Configuración y build
- Navegación y páginas
- Catálogo y filtros
- Supabase y estado
- Configuración TypeScript
- Arte del producto
- Coincidencia de fuentes
- Herramientas frontend
- Datos Parfumo
- Extracción y cola visual
- Evidencia investigada
- Dataset de fragancias
- Rendimiento editorial
- Imágenes desde perfiles
- Métricas Parfumo
- Fuentes de fabricantes
- Pruebas de importación
- Despliegue Vercel
- Auditoría de imágenes
- Métricas Fragrantica
- Publicación SQL visual
- Campos derivados
- Clasificación de género
- Imágenes de comercios
- Preparación del catálogo
- Pruebas del pipeline visual
- Recolección de fuentes
- Optimización de recursos
- Importación SQL
- Análisis de rutas Figma
- Despliegue Figma
- Preview Figma
- Servidor Figma
- Formato Figma
- Instalación Figma
- Lenguaje Figma
- Pruebas del manifiesto
- Utilidades de rutas

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `Perfume` - 15 edges
3. `normalizeCatalogRow()` - 11 edges
4. `CatalogPage()` - 9 edges
5. `react` - 9 edges
6. `Icon()` - 8 edges
7. `scripts` - 8 edges
8. `ProductType` - 7 edges
9. `formatColones()` - 7 edges
10. `run()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `CatalogState` --references--> `Perfume`  [EXTRACTED]
  src/hooks/useCatalog.ts → src/data/perfumes.ts
- `ContactPage()` --calls--> `whatsappUrl()`  [EXTRACTED]
  src/pages/ContactPage.tsx → src/config/store.ts
- `normalizeCatalogRow()` --calls--> `formatColones()`  [EXTRACTED]
  src/lib/catalog.ts → src/lib/prices.ts
- `main()` --calls--> `norm()`  [EXTRACTED]
  scripts/enrich_public_longevity_dataset.py → scripts/enrich_parfumo_dataset.py
- `FilterProps` --references--> `Occasion`  [EXTRACTED]
  src/components/organisms/CatalogFilters.tsx → src/data/perfumes.ts

## Import Cycles
- None detected.

## Communities (41 total, 12 thin omitted)

### Configuración y build - "Configuración y build"
Cohesion: 0.06
Nodes (27): dependencies, react, react-dom, @supabase/supabase-js, name, private, scripts, build (+19 more)

### Navegación y páginas - "Navegación y páginas"
Cohesion: 0.09
Nodes (20): react, react-dom, App(), CatalogPage, ContactPage, HomePage, navigation, Icon() (+12 more)

### Catálogo y filtros - "Catálogo y filtros"
Cohesion: 0.16
Nodes (26): CatalogFilters(), FilterProps, familias, Gender, ocasiones, Occasion, OlfactoryFamily, Perfume (+18 more)

### Supabase y estado - "Supabase y estado"
Cohesion: 0.11
Nodes (24): @supabase/supabase-js, Availability, CatalogMode, CatalogSource, CatalogState, catalogStore, createCatalogStore(), initialState (+16 more)

### Configuración TypeScript - "Configuración TypeScript"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution (+10 more)

### Arte del producto - "Arte del producto"
Cohesion: 0.18
Nodes (12): PerfumeCard(), likelyPackshot(), ProductArtwork(), ProductArtworkProps, getProductVisual(), includesAny(), normalize(), ProductScene (+4 more)

### Coincidencia de fuentes - "Coincidencia de fuentes"
Cohesion: 0.31
Nodes (10): bodytext(), brandkey(), concentration_ok(), gender_ok(), identity(), notes(), plain(), Suggest exact catalog-to-source matches. Fuzzy candidates are review only. (+2 more)

### Herramientas frontend - "Herramientas frontend"
Cohesion: 0.18
Nodes (11): devDependencies, oxfmt, prettier, tailwindcss, @tailwindcss/vite, @types/node, @types/react, @types/react-dom (+3 more)

### Datos Parfumo - "Datos Parfumo"
Cohesion: 0.35
Nodes (9): catalog_name(), concentration(), dataset_name(), main(), norm(), Match exact catalog identities against the cited public Parfumo dataset. Only…, values(), main() (+1 more)

### Extracción y cola visual - "Extracción y cola visual"
Cohesion: 0.29
Nodes (8): Path, extract(), join_words(), Extract this supplier's column-based PDF. Outputs contain private cost data.…, build_queue(), image_dimensions(), main(), Validate reviewed catalog artwork and build a credential-free upload queue.

### Evidencia investigada - "Evidencia investigada"
Cohesion: 0.29
Nodes (9): _derive_sourced_profile(), _inherit_exact_testers(), _merge_research_batches(), _note_matches(), Merge reviewed community performance evidence into exact catalog rows. This…, Complete presentation fields only from already sourced note pyramids.…, Merge externally researched rows without changing supplier identity fields., Reuse a sourced fragrance profile for an exact tester of the same edition. (+1 more)

### Dataset de fragancias - "Dataset de fragancias"
Cohesion: 0.57
Nodes (6): clean_catalog_name(), concentration(), dataset_name(), main(), norm(), Exact-match catalog rows to the public 42k Parfumo-derived dataset.

### Rendimiento editorial - "Rendimiento editorial"
Cohesion: 0.53
Nodes (5): clamp(), estimate(), main(), normalized(), Fill missing performance with conservative, traceable editorial estimates.…

### Imágenes desde perfiles - "Imágenes desde perfiles"
Cohesion: 0.60
Nodes (5): host_key(), is_product_source(), og_image(), Add product imagery from already-reviewed exact profile sources., run()

### Métricas Parfumo - "Métricas Parfumo"
Cohesion: 0.53
Nodes (5): fetch(), main(), metric(), parse(), Extract community longevity and sillage from reviewed Parfumo sources.

### Fuentes de fabricantes - "Fuentes de fabricantes"
Cohesion: 0.53
Nodes (5): description(), Merge conservative manufacturer matches into the public catalog artifact., run(), source_gender(), translate()

### Pruebas de importación - "Pruebas de importación"
Cohesion: 0.33
Nodes (5): catalog, perfumeDetailSource, researchBatch200, researchBatchNext200, researchFinal91

### Despliegue Vercel - "Despliegue Vercel"
Cohesion: 0.33
Nodes (5): buildCommand, framework, outputDirectory, rewrites, $schema

### Auditoría de imágenes - "Auditoría de imágenes"
Cohesion: 0.50
Nodes (4): datetime, classify(), main(), Build a deterministic, reviewable image manifest for the public catalog.

### Métricas Fragrantica - "Métricas Fragrantica"
Cohesion: 0.60
Nodes (4): fetch(), main(), parse(), Extract community performance evidence from already-reviewed Fragrantica URLs.…

### Publicación SQL visual - "Publicación SQL visual"
Cohesion: 0.60
Nodes (4): literal(), main(), Render idempotent catalog image metadata and URL updates., render()

### Campos derivados - "Campos derivados"
Cohesion: 0.67
Nodes (3): main(), norm(), Derive filter/display fields only from already sourced catalog evidence.

### Clasificación de género - "Clasificación de género"
Cohesion: 0.67
Nodes (3): fetch(), main(), Fill missing gender from exact reviewed PerfumeOnline Shopify products.

### Imágenes de comercios - "Imágenes de comercios"
Cohesion: 0.67
Nodes (3): has_exact_size(), Add conservative, exact-size retailer images to records still without art., run()

### Preparación del catálogo - "Preparación del catálogo"
Cohesion: 0.67
Nodes (3): prepare(), Build a public, cost-free catalog from the private supplier extraction., slug()

### Pruebas del pipeline visual - "Pruebas del pipeline visual"
Cohesion: 0.50
Nodes (3): migration, prepare, renderer

## Knowledge Gaps
- **90 isolated node(s):** `IconName`, `PerfumeDetailProps`, `Gender`, `CatalogMode`, `CatalogSource` (+85 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 152 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Navegación y páginas` to `Configuración y build`, `Catálogo y filtros`, `Supabase y estado`, `Arte del producto`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Herramientas frontend` to `Configuración y build`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `IconName`, `PerfumeDetailProps`, `Gender` to the rest of the system?**
  _90 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Configuración y build` be split into smaller, more focused modules?**
  _Cohesion score 0.06050420168067227 - nodes in this community are weakly interconnected._
- **Should `Navegación y páginas` be split into smaller, more focused modules?**
  _Cohesion score 0.09269162210338681 - nodes in this community are weakly interconnected._
- **Should `Supabase y estado` be split into smaller, more focused modules?**
  _Cohesion score 0.11083743842364532 - nodes in this community are weakly interconnected._
- **Should `Configuración TypeScript` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._