# Essence Luxe · Venta Perfumes

Catálogo mobile-first en React 19, TypeScript y Vite. Publicado mediante el repositorio `NolanGonza16/VentaPerfumes` conectado a Vercel. No se requiere carrito ni pago en línea: cada ficha inicia una consulta por WhatsApp.

## Desarrollo y validación

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm build
pnpm format:check
```

Node 24+ para las pruebas TypeScript nativas. El build ejecuta las pruebas y comprueba TypeScript antes de generar el sitio. `pnpm format` usa Prettier; la antigua versión de oxfmt corrompía tipos inline, por lo que ya no se usa en los scripts.

## Estructura

- `src/components/atoms`: iconos y primitivas.
- `src/components/molecules`: tarjeta de perfume.
- `src/components/organisms`: filtros, diálogo de detalles y límite de errores.
- `src/pages`: Inicio, Catálogo y Contacto, cargados por separado.
- `src/hooks/useCatalog.ts`: caché compartida, carga, reintentos y estado de la conexión.
- `src/lib`: validación de datos, filtros y cliente público Supabase.
- `src/styles`: estilos especializados; `src/index.css` contiene tokens y estilos generales.
- `tests/catalog.test.ts`: regresiones de precios, filtros, normalización y caché.

El detalle usa `createPortal(document.body)` y la capa superior de `<dialog>`. Nunca debe volver a montarse como una capa fija dentro de un elemento transformado. Restaura foco y desplazamiento al cerrar; soporta Escape, teclado y áreas seguras de teléfonos.

## Catálogo y configuración

Supabase: `Venta Perfumes - Essence Luxe`, proyecto `qsslgyidtpxuvysfxycy`, tabla `public.catalog_perfumes`. Solo lee registros activos. Consulta [la guía de datos](docs/DATA.md) para la estructura.

Configurar `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` en Vercel y en el entorno local. Solo son valores públicos. Nunca usar una clave de servicio o secretos en variables `VITE_*`.

La base de datos vacía muestra ejemplos claramente etiquetados. Esos ejemplos no se insertan en Supabase ni representan existencias, notas verificadas o precios reales. Al agregar productos activos reales se reemplazan automáticamente. El catálogo se actualiza al volver a la vista después de cinco minutos o recuperar la conexión; recargar también obtiene los cambios.

Contacto configurado: `+506 8613 9525`, en `src/config/store.ts`.

## Publicación

Vercel sirve `dist` y aplica el rewrite de `vercel.json` para abrir directamente `/catalogo` y `/contacto`. La integración Git publica los pushes a `main`. No se crearon servicios nuevos ni planes de pago.

## Recursos visuales

Logo aprobado por el propietario, conservado sin rediseñarlo. Portada original de campaña generada y codificada en WebP responsive. Procedencia y prompt en [ASSETS.md](docs/ASSETS.md).

Las pruebas de navegador en pantallas emuladas no sustituyen validación en hardware iPhone/Android real. No se bloquea el zoom de accesibilidad; los controles de entrada usan 16px para evitar el autozoom de Safari.
