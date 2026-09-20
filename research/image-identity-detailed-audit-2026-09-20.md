# Auditoría detallada de identidad producto–imagen

Fecha: 2026-09-20  
Alcance: imagen que la aplicación sirve desde `public/products/cutouts/`, identidad declarada en `catalog/image-manifest.json` y contraste visual con fuentes oficiales cuando están disponibles. No se modificaron assets, catálogo ni código.

## Dictamen de la captura reportada

La captura no presenta un problema de recorte, color o composición: presenta **otro perfume**.

- El detalle abierto declara **Agatha Ruiz de la Prada — Gotas de Color EDT 100 ml** (ref. 12).
- La botella mostrada tiene impreso **“MOMENT SUPRÊME”** y **“JEAN PATOU”**. También tiene un tapón blanco monogramado y líquido ámbar. Por tanto, no puede ser Gotas de Color.
- El archivo que la aplicación sirve es [`public/products/cutouts/ref-0012.png`](../public/products/cutouts/ref-0012.png).
- El manifiesto se auto-referencia: `source_url` y `final_url` apuntan al mismo archivo local. Esa circularidad permitió marcar como `verified_exact` una imagen sin evidencia independiente.
- La ficha comercial exacta de Gotas de Color 100 ml muestra otro diseño: frasco rosado en forma de gota y tapa cónica coral/rosa. Fuente: [Falabella — Gotas de Color EDT 100 ml](https://www.falabella.com.pe/falabella-pe/product/16732418/gotas-de-color-edt-100-ml-agatha-ruiz-de-la-prada-mujer/16732418).

**Conclusión:** ref. 12 es un falso positivo del sistema de aprobación y debe bloquearse hasta sustituir el asset por Gotas de Color real.

## Errores claros adicionales encontrados

Los siguientes casos no dependen de parecido subjetivo: el asset tiene texto de otra marca/producto o una silueta que contradice expresamente la ficha oficial.

| Ref. | Registro del catálogo | Identidad visible en el archivo actual | Evidencia del producto correcto | Dictamen |
|---:|---|---|---|---|
| 172 | Chanel — Chance Eau Tendre | Frasco vintage ámbar, ondulado, con tapón blanco; no es un frasco CHANCE redondo | CHANEL describe oficialmente CHANCE EAU TENDRE 100 ml en **frasco de líneas redondas**: [CHANEL](https://www.chanel.com/fr/parfums/p/126320/chance-eau-tendre-eau-de-toilette-vaporisateur/) | `wrong` |
| 173 | Chanel — Chance Eau Vive | El frontal dice **INFAILLIBLE** sobre un frasco masculino azul rectangular | CHANEL describe CHANCE EAU VIVE 100 ml en **frasco redondo**: [CHANEL México](https://www.chanel.com/mx/perfumes/p/126560/chance-eau-vive-eau-de-toilette/) | `wrong` |
| 175 | Chanel — Gabrielle | La etiqueta dice **Faberlic #Bon Bon Chérie** | GABRIELLE 100 ml usa frasco cuadrado ultrafino y etiqueta/tapón oro-plata: [CHANEL](https://www.chanel.com/fr/parfums/p/120525/gabrielle-chanel-eau-de-parfum-vaporisateur/) | `wrong` |
| 367 | Hugo Boss — “Cantimplora Verde Hombre” | Frasco femenino alto con tapón ornamental curvo; no lleva BOSS ni la línea pedida | El archivo local [`ref-0367.png`](../public/products/cutouts/ref-0367.png) contradice marca y línea; requiere identificar primero el nombre comercial exacto del proveedor | `wrong` |
| 368 | Hugo Boss — Dark Blue | Caja y botella dicen **Comptoir Sud Pacifique — Vanille Banane** | [`ref-0368.png`](../public/products/cutouts/ref-0368.png) | `wrong` |
| 369 | Hugo Boss — In Motion | La botella dice **DIESEL PLUS PLUS MASCULINE** | [`ref-0369.png`](../public/products/cutouts/ref-0369.png) | `wrong` |
| 370 | Hugo Boss — Orange Hombre | Caja y frasco dicen **Jeanne Arthes — Sur Un Nuage** | [`ref-0370.png`](../public/products/cutouts/ref-0370.png) | `wrong` |
| 371 | Hugo Boss — The Scent Hombre | El frasco dice **Isabey Paris** | La colección oficial BOSS The Scent muestra el producto masculino de BOSS: [HUGO BOSS](https://www.hugoboss.com/us/boss-the-scent/) | `wrong` |
| 372 | Hugo Boss — The Scent Mujer | Spray corporal rotulado **Mystic Blooms** | HUGO BOSS confirma The Scent for Her y sus frascos oficiales: [HUGO BOSS](https://www.hugoboss.com/us/boss-the-scent/) | `wrong` |
| 373 | Hugo Boss — XY | La botella dice **eau de campagne — Sisley Paris** | [`ref-0373.png`](../public/products/cutouts/ref-0373.png) | `wrong` |
| 577 | Rabanne — Olympea Legend | Atomizador genérico rotulado **poesie** | [`ref-0577.png`](../public/products/cutouts/ref-0577.png) | `wrong` |
| 579 | Rabanne — One Million | Frasco rectangular rosado de otra línea; no es el lingote 1 Million | [`ref-0579.png`](../public/products/cutouts/ref-0579.png) | `wrong` |
| 580 | Rabanne — One Million Gold | La etiqueta dice **Just Jack 1691 X Version** | [`ref-0580.png`](../public/products/cutouts/ref-0580.png) | `wrong` |
| 581 | Rabanne — One Million Night Elixir | Caja y frasco dicen **1 Million Elixir** estándar, 100 ml; no “Night Elixir” | [`ref-0581.png`](../public/products/cutouts/ref-0581.png); el propio archivo muestra literalmente otra variante | `wrong` |
| 582 | Rabanne — One Million | Frasco de aceite/decant rotulado **Mallows Pounce!** | [`ref-0582.png`](../public/products/cutouts/ref-0582.png) | `wrong` |
| 605 | Perry Ellis — 360 Red Hombre | El frasco dice **AMOUAGE DIA** | Perry Ellis muestra oficialmente 360 Red EDT 3.4 oz: [Perry Ellis](https://www.perryellis.com/products/360-red-eau-de-toilette-12252877) | `wrong` |
| 607 | Perry Ellis — 360 Very Blue | La botella dice **EMERAUDE** | [`ref-0607.png`](../public/products/cutouts/ref-0607.png) | `wrong` |
| 610 | Perry Ellis — Reserve Hombre | Caja y frasco dicen **Genie in a Bottle — Franci Essence** | [`ref-0610.png`](../public/products/cutouts/ref-0610.png) | `wrong` |
| 631 | Rave — Now Black | La etiqueta dice **VELVET TONKA** | [`ref-0631.png`](../public/products/cutouts/ref-0631.png) | `wrong` |
| 636 | Sabrina Carpenter — Sweet Tooth | Frasco dorado tipo ánfora rotulado **XERJOFF** | [`ref-0636.png`](../public/products/cutouts/ref-0636.png) | `wrong` |
| 663 | Victorinox — Sport Hombre | La botella dice **DIESEL FUEL FOR LIFE 75 ML** | Victorinox publica Swiss Army Sport con su identidad propia: [Victorinox](https://www.victorinox.com/en-PE/Products/Fragrances/For-Him/Swiss-Army-Sport/p/V0000890/) | `wrong` |
| 702 | Valentino — Donna Born In Roma Extradose | El frasco dice **Yú Parfums** | Valentino identifica Donna y Uomo Extradose dentro de la línea oficial: [Valentino Beauty](https://www.valentino-beauty.us/extradose.html) | `wrong` |
| 703 | Valentino — Uomo Born In Roma Coral Fantasy | Frasco amarillo alto de **Cartier**, no botella Rockstud Valentino | La ficha oficial confirma la botella Rockstud coral y 100 ml: [Valentino Beauty](https://www.valentino-beauty.us/fragrances/fragrances-men/fragrances-men-born-in-roma-coral/born-in-roma-uomo-coral-fantasy-eau-de-toilette-3614273672412.html?geo=false) | `wrong` |
| 705 | Valentino — Uomo Born In Roma Extradose | La etiqueta dice **i Matti — Mashian Parfum** | [Valentino Beauty — Extradose](https://www.valentino-beauty.us/extradose.html) | `wrong` |
| 724 | Viktor & Rolf — Spicebomb | Caja y botella dicen **aramis Bermuda Tonic** | La marca define Spicebomb como frasco con forma de granada y banda negra: [Viktor&Rolf](https://us.viktor-rolf.com/spicebomb/spicebomb-eau-de-toilette-VKR_030.html) | `wrong` |
| 737 | Yves Saint Laurent — Black Opium | Dos frascos cobrizos rotulados **Lacqua**; no YSL | [`ref-0737.png`](../public/products/cutouts/ref-0737.png) | `wrong` |
| 739 | Yves Saint Laurent — Mon Paris | Frasco negro rotulado **Clive Christian — Baies Rose** | La colección oficial Mon Paris muestra la identidad YSL esperada: [YSL Beauty](https://www.yslbeautyus.com/fragrance/womens-fragrances/mon-paris/) | `wrong` |

### Casos ya conocidos y reconfirmados

- **562 — Nautica Blue:** el asset publicado es un cilindro negro sin identidad Nautica visible.
- **634 — Rochas Moustache:** el asset publicado es un spray multicolor marcado “1997”.
- **684 — Versace Dylan Turquoise tester:** el asset publicado sólo muestra las letras “JS”.

Estos tres, junto con ref. 12, son errores ciertos. No deben reutilizarse para composición premium.

## Fallos sistémicos que explican los falsos positivos

1. **133 registros se auto-referencian:** `source_url === final_url`. El archivo final no puede actuar como prueba independiente de su propia identidad.
2. **178 registros usan `fimgs.net` como fuente.** Varios de los errores demostrados arriba están dentro de ese grupo aunque el manifiesto los marca `verified_exact`; un HTTP 200 o un id numérico no prueba que la descarga corresponda al SKU.
3. **Duplicados byte a byte con presentaciones distintas:**
   - refs. **51 y 52** comparten exactamente el mismo archivo, aunque el catálogo declara EDT 105 ml y Parfum 150 ml.
   - refs. **377 y 378** comparten exactamente el mismo archivo, aunque declaran 125 ml y 200 ml.
   Estos pares deben bajar a `uncertain` hasta demostrar que el mismo recurso representa de forma válida ambas presentaciones; no es correcto certificarlos como dos SKU exactos sólo por compartir silueta.
4. La nota genérica “la fuente enlazada identifica la misma marca, variante y presentación” aparece incluso donde la imagen local muestra otra marca. La aprobación está confiando en metadatos previos, no en lo que realmente se sirve.

## Recomendación de bloqueo y revisión en loop

Orden recomendado para que no se recorten ni compongan assets equivocados:

1. Retirar o marcar `wrong` las refs. de la tabla.
2. Prohibir `verified_exact` cuando la única evidencia sea el propio `final_url`.
3. Reauditar primero los **178 assets de fimgs.net**, leyendo etiqueta, línea, flanker, concentración y volumen del archivo descargado.
4. Exigir una ficha oficial o retailer específico por SKU; guardar URL de ficha y URL directa de imagen por separado.
5. Sólo después de confirmar identidad: quitar fondo, revisar borde/halo y montar en pedestal.
6. Regenerar hojas de contacto y repetir hasta que no queden etiquetas incompatibles ni aprobaciones circulares.

## Resultado de esta pasada

- Errores ciertos documentados: **31** (27 de la tabla + 3 casos ya conocidos + la ref. 12 analizada por separado).
- El estado global **no puede considerarse validado** mientras permanezcan 133 fuentes circulares y 178 fuentes fimgs sin cotejo visual independiente.
- Esta auditoría es conservadora: no marca como correcto ningún asset sólo porque la forma o el color “se parecen”.
