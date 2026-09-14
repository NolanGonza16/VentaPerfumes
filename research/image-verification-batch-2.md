# Verificación de imágenes — lote 2

Fecha: 2026-09-13  
Alcance: referencias `tipo_producto = Perfume` con `source_kind = missing`, excluyendo las referencias de `image-verification-next-batch.md` y las P0. No se modificaron catálogo, Supabase ni UI.

## Coincidencias exactas con imagen comprobada

Las cinco URLs de imagen de esta sección respondieron HTTP `200` y `Content-Type: image/jpeg` mediante una comprobación HEAD.

| Ref | Nombre | Marca | Presentación | Página fuente | URL de imagen | Evidencia |
|---:|---|---|---|---|---|---|
| 375 | Mujer | Issey Miyake | EDT 100 ml | https://www.fragrantica.com/perfume/Issey-Miyake/L-Eau-d-Issey-688.html | https://fimgs.net/mdimg/perfume/375x500.688.jpg | La ficha identifica L’Eau d’Issey Pour Femme de Issey Miyake; EDT y botella de la edición clásica. La presentación del catálogo es la variante comercial de 100 ml. |
| 415 | L12 Blanc | Lacoste | EDT 100 ml | https://www.lacoste.com/us/lacoste/men/fragrances/l.12.12-blanc/ | https://fimgs.net/mdimg/perfume/375x500.11753.jpg | Página de Lacoste identifica L.12.12 Blanc; la imagen 11753 corresponde al frasco Blanc/Pure White. El retailer Fragrantica confirma EDT y formato 100 ml. |
| 634 | Moustache | Rochas | EDT 75 ml | https://www.rochas.com/en-us/fragrance/moustache-eau-de-toilette | https://fimgs.net/mdimg/perfume/375x500.53403.jpg | Página oficial Rochas: Moustache Eau de Toilette. La imagen 53403 es el frasco EDT; la ficha de catálogo usa 75 ml. |
| 737 | Black Opium | Yves Saint Laurent | EDP 90 ml | https://www.yslbeautyus.com/fragrance/womens-fragrances/black-opium/black-opium-eau-de-parfum-spray/252YSL.html | https://fimgs.net/mdimg/perfume/375x500.25371.jpg | YSL identifica Black Opium Eau de Parfum y ofrece selección de 3.0 oz/90 ml; la imagen 25371 corresponde a Black Opium EDP, no Le Parfum ni Over Red. |
| 739 | Mon Paris | Yves Saint Laurent | EDP 90 ml | https://www.yslbeautyus.com/fragrance/womens-fragrances/mon-paris/mon-paris-eau-de-parfum/4150YSL.html | https://fimgs.net/mdimg/perfume/375x500.45601.jpg | Página oficial YSL identifica Mon Paris Eau de Parfum; la imagen 45601 corresponde al frasco clásico de Mon Paris EDP. La presentación comercial del catálogo es 90 ml. |

## Candidatos investigados, pero sin imagen exacta aplicable

En estas filas se verificó o se intentó verificar la identidad comercial. `image_url = —` significa que no se encontró una URL de packshot inequívoco que pudiera validarse como HTTP 200; no debe rellenarse automáticamente.

| Ref | Nombre | Marca | Presentación | Página fuente | image_url | Razón no resuelta |
|---:|---|---|---|---|---|---|
| 25 | Blue Seduccion Summer Essence | Antonio Banderas | EDT 100 ml | https://www.antoniobanderasbeauty.com/ | — | El nombre del proveedor mezcla “B Blue Seducción” y “Summer Essence”; no hay ficha oficial inequívoca de esa edición exacta. |
| 258 | Shinning City | Emper | EDP 100 ml | https://emperperfumes.com/ | — | No se localizó página oficial indexada ni packshot con el nombre exacto; riesgo de confundirlo con otra línea Emper. |
| 259 | Stallion 53 9 To 9 | Emper | EDP 100 ml | https://emperperfumes.com/ | — | No se verificó una ficha oficial de la edición “9 To 9”; no se aplica imagen de otra Stallion. |
| 260 | Stallion 53 Blue Stallion | Emper | EDP 100 ml | https://emperperfumes.com/ | — | Falta ficha oficial/imagen inequívoca de Blue Stallion 100 ml. |
| 261 | Stallion 53 Donna Intense | Emper | EDP 100 ml | https://emperperfumes.com/ | — | Nombre comercial no localizado en fuente primaria con volumen y botella coincidentes. |
| 264 | Stallion 53 La Furia | Emper | EDP 100 ml | https://emperperfumes.com/ | — | No se pudo confirmar edición, concentración y envase en una misma fuente. |
| 265 | Stallion 53 Lahab | Emper | EDP 100 ml | https://emperperfumes.com/ | — | No se encontró packshot oficial exacto. |
| 266 | Stallion 53 Mandora | Emper | EDP 100 ml | https://emperperfumes.com/ | — | No se encontró página oficial verificable con imagen del producto. |
| 267 | Stallion 53 Mangofizz | Emper | EDP 100 ml | https://emperperfumes.com/ | — | No se verificó identidad exacta; evitar imágenes de Mango o Stallion genéricas. |
| 268 | Stallion 53 Morning Dive | Emper | EDP 100 ml | https://emperperfumes.com/ | — | No se encontró una fuente primaria con packshot y 100 ml simultáneos. |
| 270 | The Black 92 | Emper | EDP 100 ml | https://emperperfumes.com/ | — | Edición no confirmada en web oficial; no aplicar imagen de The Black de otra marca. |
| 296 | Rouge | Flaunt | EDP 100 ml | https://www.flauntperfumes.com/ | — | “Rouge” es demasiado genérico y no se encontró ficha oficial que desambigüe frasco/edición. |
| 302 | Veneno Bianco | French Avenue | Extrait de Parfum 100 ml | https://frenchavenue.com/ | — | La línea French Avenue tiene varias ediciones Veneno; no se pudo confirmar packshot exacto de Veneno Bianco. |
| 307 | Gentle Elsatys | Elsatys | EDP 100 ml | https://elsatys.com/ | — | No se localizó página oficial o distribuidor con imagen verificable de Gentle Elsatys. |
| 310 | Acqua Di Gio Profondo | Giorgio Armani | EDP 200 ml | https://www.armani.com/it-it/giorgio-armani/parfum-acqua-di-gio-profondo-200-ml-cod-LE309600-NLP-200ML/ | — | La página oficial encontrada es Profondo Parfum 200 ml, no EDP; usarla para esta fila sería una concentración incorrecta. |
| 329 | Montage Intense | Grandeur | EDP 100 ml | https://grandeurperfumes.com/ | — | No se estableció una ficha oficial indexada con el nombre y botella exactos. |
| 330 | Private Pink | Grandeur | EDP 100 ml | https://grandeurperfumes.com/ | — | Falta fuente primaria inequívoca de la edición Private Pink 100 ml. |
| 331 | Tribal Blue | Grandeur | EDP 100 ml | https://grandeurperfumes.com/ | — | No se verificó imagen oficial de Tribal Blue; riesgo de usar otra edición Grandeur. |
| 365 | Bottled Gris | Hugo Boss | Parfum 100 ml | https://www.hugoboss.com/ | — | “Bottled Gris” no aparece como denominación oficial inequívoca; puede ser descriptor de color o variante distinta. |
| 416 | L12 Blanco | Lacoste | EDT 175 ml | https://www.lacoste.com/us/lacoste/men/fragrances/l.12.12-blanc/ | — | La página confirma la familia L.12.12 Blanc, pero no entrega un packshot inequívoco de la presentación 175 ml en la consulta realizada. |
| 471 | Luxe | Lattafa | EDP 100 ml | https://lattafa-usa.com/ | — | “Luxe” no desambigua una fragancia Lattafa concreta; no se encontró ficha oficial única. |
| 479 | Oud Al Rumaan | Lattafa | EDP 100 ml | https://lattafa-usa.com/ | — | No se encontró una página oficial verificable de Oud Al Rumaan con imagen y volumen. |
| 517 | Precious Pink | Maison Alhambra | EDP 80 ml | https://maisonalhambra-usa.com/ | — | El nombre aparece en distribuidores con botellas distintas; falta confirmación primaria del SKU 80 ml. |
| 519 | Salvo | Maison Alhambra | EDP 100 ml | https://maisonalhambra-usa.com/ | — | No se encontró packshot oficial inequívoco de Salvo EDP 100 ml; evitar sustituirlo por Sauvage o una inspiración genérica. |
| 537 | Santorini | Matin Martin | EDP 100 ml | https://matinmartin.com/ | — | No se localizó ficha oficial indexada con imagen, concentración y volumen verificables. |
| 538 | Red | Merazur | EDP 100 ml | https://merazur.com/ | — | Nombre demasiado genérico; no hay evidencia suficiente para elegir una botella concreta. |
| 539 | Messi | Messi | EDP 100 ml | https://www.messifragrances.com/ | — | El sitio/marca no expone una ficha de producto inequívoca para el registro “Messi EDP 100 ml”. |
| 568 | Amber Rouge Unisex | Orientica | EDP 80 ml | https://orientica.com/ | — | No se pudo confirmar una ficha oficial de Amber Rouge Unisex 80 ml; existen varias imágenes de distribuidores. |
| 569 | Royal Amber | Orientica | EDP 80 ml | https://orientica.com/ | — | Falta fuente primaria con botella y volumen exactos; no usar imágenes de Amber Rouge. |
| 619 | Hawas Clasico Mujer | Rasasi | EDP 100 ml | https://rasasistore.com/ | — | La tienda oficial confirma líneas Hawas, pero no se verificó una edición denominada exactamente “Hawas Clásico Mujer” con imagen/100 ml. |
| 620 | Hawas Diva | Rasasi | EDP 100 ml | https://www.rasasi.com/ | — | No se verificó en la línea oficial una edición inequívoca “Hawas Diva”; evitar confundirla con Hawas for Her. |
| 707 | Uomo Born In Roma Melancholia 1Ooml | Valentino | EDT 100 ml | https://www.valentino-beauty.us/fragrance/mens-fragrances/ | — | “Melancholia” no se pudo confirmar como lanzamiento oficial de Uomo Born in Roma; el texto contiene además “1Ooml”. |
| 709 | Crystal Emerald | Versace | EDP 90 ml | https://www.versace.com/us/en/women/accessories/fragrances-body-care/crystal-emerald-edp-90-ml-green/R530032-R090MLS_RNUL.html | — | La página oficial confirma EDP 90 ml, pero no se obtuvo una URL de imagen directa validable en esta ejecución; queda pendiente de extracción del asset oficial. |
| 738 | Libre | Yves Saint Laurent | Le Parfum 90 ml | https://www.yslbeautyus.com/fragrance/womens-fragrances/libre/libre-le-parfum/ | — | La edición Le Parfum es distinta de Libre EDP; no se aplicó una imagen de la edición equivocada sin poder validar el asset de 90 ml. |
| 740 | Y | Yves Saint Laurent | EDP 100 ml | https://www.yslbeautyus.com/fragrance/mens-fragrances/y/ | — | La familia Y tiene EDT, EDP e Intense; falta una URL de packshot oficial que pruebe exactamente EDP 100 ml. |

## Nota de control

Los únicos `image_url` no nulos de este archivo son los cinco de la primera tabla; todos fueron comprobados con HTTP 200 y contenido `image/jpeg`. Las filas con `—` son deliberadamente no aplicables hasta resolver la identidad o extraer un asset exacto.
