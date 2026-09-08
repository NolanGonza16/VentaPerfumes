# Verificación · 8 septiembre 2026

## Flujo

Inicio → Catálogo → consulta de Supabase → filtros locales → ficha de fragancia → enlace de WhatsApp. Contacto permanece en su propia ruta.

## Evidencia local

- Build de producción correcto con TypeScript estricto.
- 13 pruebas automatizadas aprobadas: normalización, disponibilidad, precios con centavos, búsqueda sin acentos, filtros combinados, orden estable, caché, fallback explícito, errores y reintentos.
- Formato Prettier y `git diff --check` correctos.
- Navegador sin errores ni advertencias capturadas durante el recorrido.
- Precio por teclado: de ₡165.000 a ₡164.000 excluye Aventus y deja 9 resultados.
- Máximo exacto de ₡85.000: Sauvage Elixir (85.000), Flowerbomb (78.000), La Vie Est Belle (72.000).
- Toque en la barra: ₡79.000 deja Flowerbomb y La Vie Est Belle; tanto cifra como resultados cambian.
- Búsqueda “vainilla”: 5 resultados. Orden ascendente comprobado: 72.000, 78.000, 92.000, 135.000, 142.000.
- Floral + Diario: Flowerbomb y N°5 L'Eau.
- Consulta inexistente muestra estado vacío; “Ver toda la colección” recupera resultados.
- Familia Amaderado desde Inicio abre `/catalogo?familia=Amaderado`. Atrás vuelve al Inicio.
- Inicio y Contacto no contienen tarjetas del catálogo.
- Preguntas frecuentes expanden y colapsan.
- WhatsApp apunta a `50686139525` con el perfume seleccionado en el texto. Se verificó el enlace; no se envió ningún mensaje.

## Detalle y responsive

- 320 × 740: catálogo de dos columnas sin overflow horizontal. Diálogo de 320 × 740; CTA dentro de la pantalla, pie fijo y contenido desplazable.
- 390 × 844: diálogo nativo abierto, `:modal=true`, hijo directo de `BODY`; imagen, texto y CTA visibles. Buscador 16px, escala de viewport 1.
- 768 × 1024: diálogo 704 × 820 dentro del viewport; detalle de dos columnas, texto desplazable.
- 1440 × 1000: detalle de dos columnas, fondo separado y oscurecido; clic exterior cierra.
- Escape y botón de cierre eliminan el diálogo, restauran el foco a la tarjeta y liberan el bloqueo del body. Tab permanece dentro del diálogo nativo.
- CSS contempla áreas seguras y movimiento reducido.

Estas son pruebas en navegador con viewport emulado, no certificación en todos los dispositivos o pruebas de teclado virtual de Safari real.

## Datos y seguridad

- Consulta pública real de Supabase correcta: 0 registros activos.
- `catalog_perfumes` y `catalog_perfume_images`: 0 filas y RLS habilitado, confirmado por la conexión Supabase.
- Asesor de seguridad Supabase: sin hallazgos devueltos.
- No se insertaron perfumes ficticios ni se modificaron otros proyectos.
- Sin nuevas suscripciones o infraestructura de pago.

## Rendimiento

- Rutas cargadas por separado; SDK Supabase diferido hasta abrir catálogo.
- Portada responsive WebP: 63 KB móvil, 167 KB escritorio.
- Logo optimizado: 14 KB, sin depender de una descarga de 2 MB desde Supabase.
- Imágenes del catálogo lazy fuera de la primera fila, dimensiones reservadas, fallback local.
- Caché en memoria de cinco minutos y solicitud compartida entre vistas.
