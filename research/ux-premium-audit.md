# Auditoría UI/UX premium — Venta Perfumes

Fecha: 2026-09-13  
Versión revisada: producción (`essence-luxe-catalog.vercel.app`) y código local en `13cfea6`  
Resoluciones verificadas: 375×812, 812×375 y 1440×1000. También se revisaron los breakpoints de 768 px y 1100 px en CSS.

## Veredicto honesto

La aplicación ya se percibe como una boutique digital y no como un catálogo genérico. La dirección de arte negro/champagne, Cormorant + Manrope, el hero editorial, el modal de producto y la navegación móvil son coherentes y están por encima de una tienda básica. En escritorio, la ficha de 9 AM tiene una composición especialmente sólida y claramente premium.

Hoy la calificaría **7.5/10 en apariencia premium**, **7/10 en usabilidad móvil** y **6/10 en consistencia visual del catálogo**. El principal freno no es la estructura general: es la heterogeneidad de las fotografías, seguida por texto secundario demasiado pequeño y algunos detalles de interacción móvil. Con una curaduría visual estricta y los ajustes P0/P1 siguientes puede acercarse a 9/10 sin rehacer toda la marca.

## Lo que ya funciona bien

- Identidad reconocible y consistente: negro profundo, dorado contenido, serif editorial y sans limpia.
- Separación clara entre Inicio, Catálogo y Contacto; navegación móvil de tres destinos, con estado activo y safe-area inferior.
- Hero móvil con jerarquía clara, un CTA principal y fotografía de campaña de buena calidad.
- Modal nativo `<dialog>` con botón de cierre, `aria-labelledby`, `aria-describedby`, bloqueo/restauración del scroll y CTA fijo.
- En 375×812 la búsqueda permanece en 16 px, por lo que evita el zoom automático de iOS.
- El catálogo carga por lotes de 24 en lugar de renderizar 641 cards de una vez.
- Hero con `srcSet`, dimensiones explícitas y prioridad alta; cards con lazy loading y dimensiones reservadas.
- Estado `prefers-reduced-motion` presente y global.
- Iconografía SVG propia y coherente; no hay emojis estructurales.
- En las vistas examinadas no se observó scroll horizontal de página ni contenido crítico recortado en el modal.

## Hallazgos priorizados

### P0 — La inconsistencia fotográfica rompe la promesa premium

**Evidencia:** en la primera pantalla del catálogo, 9 AM, 9 PM Elixir y 9 PM tienen fotografía editorial, mientras que 9 AM Dive aparece como packshot sobre blanco puro. En la segunda fila visible aparecen más fondos blancos y placeholders ilustrados. El cambio abrupto de luminosidad y tratamiento hace que parezcan catálogos distintos.

**Código relacionado:** `ProductArtwork.tsx` clasifica prácticamente cualquier URL no editorial como `packshot`; `product-artwork.css` entonces fuerza `background: #f6f3ed` y desactiva toda la escena. La detección depende de cuatro fragmentos de nombre de archivo, no de metadatos explícitos.

**Recomendación implementable:**

1. Guardar por producto un `image_kind` explícito (`editorial`, `cutout`, `packshot`, `placeholder`) y dejar de inferirlo por URL.
2. Para cutouts/packshots correctos, mantener la botella intacta y componer un fondo editorial común por familias de color; no aplicar tintes ni filtros sobre la etiqueta.
3. Establecer una puerta de calidad: coincidencia exacta de nombre/edición/ml, mínimo 1000 px en el lado largo, etiqueta legible y ausencia de marcas de agua.
4. No publicar como imagen exacta ninguna fuente sin evidencia registrada. Mostrar una escena neutral elegante mientras esté pendiente.

**Criterio de aceptación:** cuatro cards consecutivas se sienten parte de la misma campaña, pero cada botella conserva exactamente su forma, color y etiqueta reales.

### P0 — Los filtros quedan parcialmente ocultos por la navegación inferior

**Evidencia:** en 375×812, al abrir “Filtros”, la barra inferior tapa el comienzo de la sección de presupuesto. El panel se inserta dentro de la página; no enfoca el encabezado ni reserva suficiente espacio en ese estado. La marca y los dos selects secundarios quedan muy comprimidos, con textos truncados (“Todas las fam…”, “Todas las oca…”).

**Impacto:** el filtro clave de precio parece incompleto y el usuario puede pensar que no hay más opciones.

**Recomendación implementable:** convertir filtros móviles en un bottom sheet/modal con encabezado y cierre fijos, contenido interno desplazable y `padding-bottom: calc(88px + env(safe-area-inset-bottom))`; organizar Marca, Familia y Ocasión en una columna a 375 px. Como solución mínima, aumentar el inset inferior del panel y usar una columna para todos los selects.

### P1 — Tipografía auxiliar demasiado pequeña

**Evidencia de código:** el catálogo y la ficha usan repetidamente 0.5625 rem (9 px), 0.625 rem (10 px), 0.6875 rem (11 px) y 0.75 rem (12 px). En la captura de escritorio, presentación, ordenamiento y “Ver detalles” pierden legibilidad; en móvil, marca/presentación quedan especialmente débiles.

**Impacto:** la pequeñez puede parecer “editorial” en una maqueta, pero en un teléfono real reduce confianza y accesibilidad. El lujo depende de espacio y precisión, no de texto microscópico.

**Recomendación implementable:** piso de 12 px solo para eyebrow decorativo de alto contraste; 13–14 px para metadata, 14–16 px para controles y 16 px para cuerpo. Subir contraste del texto secundario sin volverlo blanco puro.

### P1 — El catálogo es visualmente denso en móvil

**Evidencia:** dos columnas a 375 px producen cards de unos 146 px de ancho. Los títulos largos y marcas extensas compiten con precio, presentación y dos affordances de detalle (flecha circular y fila “Ver detalles”).

**Recomendación implementable:** mantener dos columnas solo para cards minimalistas; eliminar una de las dos affordances, reservar dos líneas estables para el nombre y dar más separación vertical. Para productos de nombre largo, usar una columna por debajo de 360 px. No añadir más datos a la card.

### P1 — El modal funciona, pero no crea una URL compartible

**Evidencia:** la ficha abre como estado interno sobre `/catalogo`; no cambia la ruta. Recargar, compartir o usar atrás no conserva el perfume abierto.

**Impacto:** limita descubrimiento, SEO, campañas y asesoría por WhatsApp (“mira este perfume”). También contradice el principio de deep linking para pantallas clave.

**Recomendación implementable:** usar `/catalogo/:slug` (o query estable) manteniendo el modal como presentación visual. `popstate` debe cerrar/restaurar la ficha y devolver posición y filtros.

### P1 — Falta un tratamiento responsive para imágenes de catálogo

**Evidencia:** el hero sí usa `srcSet`; `ProductArtwork` usa una sola URL remota para cards y detalle. La misma imagen potencialmente grande se descarga para una miniatura de ~150–300 px. No hay `sizes`, variantes servidas por Supabase ni CDN propio normalizado.

**Impacto:** consumo de datos, decodificación y tiempo de aparición variables; afecta especialmente a móviles y a lotes de 24 imágenes.

**Recomendación implementable:** copiar activos aprobados a Supabase Storage/CDN, generar 320/640/960/1280 WebP o AVIF, entregar `srcSet`/`sizes` y conservar el original auditado. Prioridad alta solo para las primeras cards realmente visibles según breakpoint.

### P1 — La carga remota no comunica progreso por card

**Evidencia:** existe skeleton inicial del catálogo, pero cada imagen remota pasa del fondo a la imagen sin un estado de carga individual; en redes lentas queda una escena genérica que después cambia bruscamente.

**Recomendación implementable:** estado `loading/loaded/error` en `ProductArtwork`, placeholder dominante de baja resolución o skeleton sutil, crossfade corto y cancelable; conservar dimensiones para CLS cero.

### P2 — Contacto móvil retrasa la acción principal

**Evidencia:** en 375×812 la primera pantalla presenta titular y parte de la tarjeta, pero el botón de WhatsApp queda debajo del pliegue. El bloque es elegante, aunque no maximiza conversión inmediata.

**Recomendación implementable:** añadir un CTA compacto debajo del texto introductorio o subir el botón dentro del primer viewport; mantener la tarjeta extensa como argumento secundario.

### P2 — El encabezado móvil duplica “Descubrir” en catálogo

**Evidencia:** “Descubrir” siempre enlaza a `/catalogo`; cuando el usuario ya está allí, sigue pareciendo una acción primaria, mientras la navegación inferior ya marca Catálogo.

**Recomendación implementable:** en Catálogo cambiar esa acción por “Asesoría”/Contacto o esconderla según ruta. Mantener un único CTA principal por pantalla.

### P2 — El tratamiento de packshots es semánticamente frágil

**Evidencia:** `likelyPackshot()` determina el modo visual a partir del nombre de archivo. Una nueva campaña con otro nombre puede recibir fondo blanco; un packshot cuyo URL contenga “editorial” puede recibir capas decorativas indebidas.

**Recomendación implementable:** resolverlo junto con el campo `image_kind` y validarlo en el manifiesto de imágenes.

### P2 — Accesibilidad pendiente de verificación automatizada completa

**Evidencia positiva:** skip link, foco visible, nombres accesibles, estados `aria-pressed/expanded`, dialog semántico y reduced-motion están presentes. **Pendiente:** contraste medido de todos los pares dorado/gris, navegación completa por teclado, zoom de texto al 200 %, lector de pantalla y targets pequeños en metadata/acciones.

**Recomendación implementable:** añadir axe-core en el QA, pruebas Playwright para abrir/cerrar dialog con teclado y restaurar foco, y snapshots responsive 375/768/1440. No desactivar zoom en viewport.

## Evaluación por pantalla

### Inicio — 8.5/10

Es la pantalla más lograda. Tiene una historia clara, fotografía consistente y jerarquía fuerte. El titular, el dorado y los espacios transmiten perfumería selecta. Mejoras menores: reducir competencia entre “Explorar la colección” y “Encuentra tu esencia”, y comprobar que el hero no domine demasiado en teléfonos bajos.

### Catálogo — 6.5/10

La arquitectura de búsqueda y filtros es buena y la búsqueda es accesible. El problema es la consistencia del contenido visual: fondos blancos, campañas y placeholders conviven sin una regla perceptible. La densidad y el texto pequeño bajan la calidad aparente.

### Detalle — 8/10 escritorio, 7.5/10 móvil

En escritorio la división fotografía/información es convincente y profesional. En móvil la imagen, disponibilidad, cierre y CTA están bien ubicados; el CTA fijo no tapa el contenido porque existe inset. En horizontal la ficha sigue operable, aunque la zona útil de contenido es pequeña y exige scroll interno.

### Contacto — 7.5/10

Consistente con la marca y con buen lenguaje. La acción de WhatsApp debería aparecer antes para convertir mejor en móvil.

## Orden recomendado de ejecución

1. Crear metadatos visuales explícitos y una puerta de calidad para imágenes.
2. Corregir filtro móvil como sheet y asegurar que precio nunca quede tapado.
3. Subir el piso tipográfico y simplificar cards.
4. Normalizar y servir imágenes responsive desde un CDN controlado.
5. Añadir rutas compartibles para las fichas.
6. Ajustar CTA de Contacto y encabezado por ruta.
7. Incorporar pruebas automáticas de accesibilidad, teclado y regresión visual.

## Matriz de verificación realizada

| Área | Resultado |
|---|---|
| 375×812 catálogo | Operable; dos columnas; filtro inferior parcialmente oculto |
| 375×812 detalle | Abre correctamente; cierre y CTA visibles; contenido desplazable |
| 812×375 detalle | Operable; CTA visible; espacio de lectura reducido |
| 1440×1000 catálogo | Cuatro columnas equilibradas; metadata demasiado pequeña |
| 1440×1000 detalle | Composición premium y clara; scroll interno correcto |
| Inicio móvil | Excelente jerarquía y campaña consistente |
| Contacto móvil | Visualmente sólido; CTA principal bajo el pliegue |
| Reduced motion | Regla global presente en CSS |
| Semántica base | Buena: dialog, labels, aria states, skip link y foco visible |
| Imágenes responsive | Completo solo en hero; pendiente en catálogo/detalle |

## Limitaciones del pase

- La versión local fue inspeccionada en código y servidor, pero el navegador aislado no pudo conectarse a `localhost`; la verificación visual interactiva se hizo contra producción.
- No se ejecutó lector de pantalla ni auditoría axe en este pase.
- Esta auditoría no certifica la identidad de cada fotografía; esa verificación debe apoyarse en el manifiesto/fuentes y la revisión producto por producto que corre en paralelo.
