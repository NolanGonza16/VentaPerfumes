# Auditoría de identidad de imágenes — referencias 501–731

Fecha: 2026-09-13  
Alcance: las **175 filas** con `imagen_url` no nula y `origen_ref` entre 501 y 731.

## Criterio

- **EXACTA**: la misma ficha de producto enlaza nombre/marca/variante y la imagen usada. No basta un HTTP 200.
- **INCORRECTA**: la URL, la ficha o el envase demuestra otro producto, variante, formato o presentación.
- **NO_VERIFICABLE**: la foto parece plausible, pero falta una ficha independiente que cierre identidad, concentración, género y tamaño; no se aprueba por nombre de archivo.
- En tester, miniatura, estuche y corporal se exige correspondencia de la presentación, no solo de la fragancia base.

Fuentes de contraste: páginas oficiales cuando existen; después fichas de producto de retailers reconocidos y fichas individualizadas de Fragrantica. La relación fuente–imagen ya comprobada está preservada en [`image-sources-reviewed.json`](image-sources-reviewed.json). Para lanzamientos recientes se volvió a contrastar contra las páginas actuales.

## Resultado ejecutivo

| Resultado | Filas |
|---|---:|
| EXACTA | 51 |
| INCORRECTA | 21 |
| NO_VERIFICABLE | 103 |
| **Total** | **175** |

Por tanto, **121 de 175 imágenes de este bloque no deben considerarse aprobadas todavía**. Las 21 incorrectas deben retirarse o reemplazarse antes de aplicar fondos premium.

## Imágenes incorrectas

| Ref. | Fila del catálogo | Motivo comprobable | Reemplazo seguro |
|---:|---|---|---|
| 542 | Lattafa — Miniatura Oud For Glory 5 ml | La ficha e imagen son del frasco estándar; no muestran la miniatura 5 ml. | Pendiente de una foto exacta de la miniatura. |
| 543 | Lattafa — Miniatura Sublime 5 ml | La ficha e imagen son del frasco estándar; no muestran la miniatura 5 ml. | Pendiente. |
| 545 | Lattafa — Miniatura Yara Moi 5 ml | La ficha e imagen son del frasco estándar; no muestran la miniatura 5 ml. | Pendiente. |
| 546 | Lattafa — Miniatura Yara Tous 5 ml | La ficha e imagen son del frasco estándar; no muestran la miniatura 5 ml. | Pendiente. |
| 547 | Versace — Miniatura Versense EDT 5 ml | La imagen es el frasco estándar de Versense; no acredita el formato 5 ml. | Pendiente. |
| 550 | Montblanc — Legend EDT 100 ml | El propio archivo dice `Legend-Deodorant-Stick-75-g`: es un desodorante en barra. | [Montblanc Legend EDT 100 ml](https://www.montblanc.com.mx/legend-eau-de-toilette-100-ml-107460/p) confirma el producto; extraer la imagen oficial de esa ficha. |
| 551 | Montblanc — Legend Spirit EDT 100 ml | El archivo dice `legend-spirit-deodorant-stick-men-75-g`: es un desodorante. | [Montblanc Legend Spirit EDT 100 ml](https://www.montblanc.com/en-us/legend-spirit-eau-de-toilette-100-ml-MB115364.html); usar su packshot oficial. |
| 557 | Moschino — Toy 2 Gummy EDP 100 ml | La imagen usa el ID 88434, que no corresponde al lanzamiento Toy 2 Gummy de 2026. | [Ficha exacta Toy 2 Gummy](https://beta.fragrantica.com/perfume/Moschino/Toy-2-Gummy-126055.html), ID 126055; obtener el packshot del producto exacto. |
| 559 | Moschino — Toy 2 Yummy EDP 100 ml | La imagen usa el ID 91240, distinto del Toy 2 Yummy de 2026. | [Ficha exacta Toy 2 Yummy](https://www.fragrantica.com/perfume/Moschino/Toy-2-Yummy-126054.html), ID 126054. |
| 572 | Rabanne — Invictus Aqua EDT 100 ml | La URL es `Image-coming-soon`; no contiene el producto. | Pendiente según la edición de Invictus Aqua que corresponda al PDF. |
| 574 | Rabanne — Invictus Elixir 100 ml | La imagen usa el ID 72338, distinto del Invictus Elixir lanzado en 2026. | [Ficha exacta Invictus Elixir](https://www.fragrantica.com/perfume/Rabanne/Invictus-Elixir-126365.html), ID 126365. |
| 576 | Rabanne — Invictus Victory EDP 100 ml | El archivo declara `Invictus-Victory-Extreme`, una variante distinta. | Pendiente de foto exacta de Invictus Victory EDP. |
| 581 | Rabanne — 1 Million Night Elixir Parfum 100 ml | La fuente enlazada es 1 Million Elixir, no 1 Million Night Elixir 2026. | Pendiente de packshot oficial de Night Elixir. |
| 589 | Rabanne — Ultrared EDP 80 ml “Hombre” | Ultrared EDP 80 ml corresponde a la presentación femenina; fila e imagen no cierran con el género declarado. | Resolver primero la identidad del renglón del PDF. |
| 593 | Paris Hilton — Can Can Burlesque EDP “Hombre” | Can Can Burlesque es una fragancia femenina; la fila declara Hombre. | Resolver metadato antes de aprobar la imagen. |
| 613 | Ralph Lauren — Polo Red EDT 125 ml | El archivo actual declara `2.6-ounce-Deodorant-Stick`: es desodorante, no EDT. | [Polo Red EDT 125 ml oficial](https://www.ralphlaurenfragrances.com/en_US/men/polo-red/polo-red-eau-de-toilette/RLFE006.html); usar el packshot oficial de 125 ml. |
| 643 | Marc Jacobs — Estuche Perfect 2 piezas | La imagen es solo el frasco Perfect; no muestra el estuche de dos piezas. | Pendiente de set exacto. |
| 644 | Rabanne — Estuche Phantom clásico 2 piezas | La imagen es solo Phantom; no corresponde visualmente al set. | Pendiente de set exacto. |
| 645 | Versace — Estuche Eros Hombre 2 piezas | La imagen es solo Eros EDT; no corresponde al set. | Pendiente de set exacto. |
| 659 | Cristiano Ronaldo — Spray corporal Play It Cool 150 ml | La imagen es el frasco del perfume CR7 Play It Cool, no el spray corporal. | Pendiente de corporal 150 ml exacto. |
| 708 | Versace — Bright Crystal **Parfum** 90 ml | El ID 632 es Bright Crystal EDT 2006, no Bright Crystal Parfum 2024. | [Versace Bright Crystal Parfum 90 ml oficial](https://www.versace.com/us/en/women/accessories/fragrances-body-care/bright-crystal/bright-crystal-parfum-90-ml/R512032-R090MLS_RTU_TU_RNUL__.html); usar su imagen oficial. |

## Imágenes exactas verificadas

Cada referencia siguiente tiene una ficha fuente individual que enlaza la identidad indicada y la misma imagen registrada. Las URLs completas están en `image-sources-reviewed.json`.

| Ref. | Identidad verificada | Ref. | Identidad verificada |
|---:|---|---:|---|
| 503 | Maison Alhambra Bright Peach | 504 | Maison Alhambra Candid Pour Homme EDP 100 ml |
| 505 | Maison Alhambra Chants Tenderina | 507 | Maison Alhambra Delilah |
| 508 | Maison Alhambra Glacier Bella | 510 | Maison Alhambra Glacier Pour Homme EDP 100 ml |
| 512 | Maison Alhambra Libbra EDP 100 ml | 513 | Maison Alhambra Maitre De Blue EDP 100 ml |
| 514 | Maison Alhambra Megara | 516 | Maison Alhambra Pink Shimmer Secret |
| 518 | Maison Alhambra Rose Petals | 520 | Maison Alhambra Tabac |
| 527 | Marc Jacobs Daisy Ever So Fresh | 528 | Marc Jacobs Daisy Love Eau So Sweet |
| 533 | Mast Perfume Rome Imagine EDP 100 ml | 534 | Mast Perfume Rome Ivory Pour Homme EDP 100 ml |
| 535 | Mast Perfume Rome Pour Homme EDP 100 ml | 548 | Montblanc Emblem |
| 554 | Moschino I Love Love | 555 | Moschino Pink Bouquet |
| 558 | Moschino Toy 2 Pearl | 562 | Nautica Blue |
| 564 | Nautica Classic EDT 100 ml | 570 | Oscar de la Renta EDT 100 ml |
| 577 | Rabanne Olympea Legend | 578 | Rabanne Olympea Parfum 80 ml |
| 579 | Rabanne 1 Million EDT | 580 | Rabanne 1 Million Gold |
| 582 | Rabanne 1 Million Parfum | 583 | Rabanne 1 Million Royal |
| 592 | Paris Corner Marshmallow Blush EDP 100 ml | 602 | Perry Ellis 360 Black Hombre |
| 605 | Perry Ellis 360 Red Hombre | 607 | Perry Ellis 360 Very Blue |
| 610 | Perry Ellis Reserve Hombre | 617 | Rasasi Hawas Chrome |
| 618 | Rasasi Hawas For Him EDP 100 ml | 630 | Rasasi La Yuqawam Pour Homme |
| 631 | Rave Now Black | 633 | Rayhaan Crimson |
| 634 | Rochas Moustache EDT 75 ml | 636 | Sabrina Carpenter Sweet Tooth |
| 663 | Victorinox Swiss Army Sport for Him | 696 | Tous Oh! The Origin |
| 698 | Tous Your Powers | 699 | Benetton Tribu |
| 702 | Valentino Donna Born In Roma Extradose | 703 | Valentino Uomo Born In Roma Coral Fantasy |
| 705 | Valentino Uomo Born In Roma Extradose Parfum | 723 | Viktor & Rolf Flowerbomb |
| 724 | Viktor & Rolf Spicebomb EDT 90 ml | — | — |

## No verificables todavía

Estas 100 filas conservan una URL plausible o una imagen del perfume base, pero **no deben etiquetarse como correctas** hasta relacionarlas con una página de producto exacta. En testers, la fuente actual solo acredita el perfume comercial; no la presentación tester.

| Referencias | Identidades pendientes de cierre |
|---|---|
| 501–502 | Lolita Lempicka Homme; Maison Alhambra Baroque Rouge Extrait |
| 506, 509, 511, 515, 521 | Como Moiselle (la fuente registrada es Chanel, no el producto Maison Alhambra); Glacier Bold; Jean Lowe Azure; No. 2 Men; Victorioso |
| 522–526 | Mancera Cedrat Boise Intense, Red Tobacco; Marc Jacobs Daisy Dream, Daisy Eau So Fresh y Daisy |
| 529–531 | Marc Jacobs Daisy Wild, Perfect Elixir, Perfect Intense |
| 549, 552–553, 556, 560–561 | Montblanc Explorer y Starwalker; Moschino Funny, Toy 2, Toy Boy 2, Toy Boy |
| 563, 565–567 | Nautica Blue Sail, Voyage, Voyage Heritage, Voyage Sport |
| 571, 573, 575, 584–588, 590–591 | Rabanne Fame, Invictus EDT, Invictus Parfum, Phantom, Phantom Intense, Pour Homme, Pure XS Hombre/Mujer; PDM Layton; Paris Corner Khair Pistachio |
| 594–598 | Paris Hilton Can Can, Paris Hilton Men, Dazzle, Just Me Mujer, Tease |
| 600–601, 603–604, 606, 608–609, 611–612 | Perry Ellis 18 Hombre/Orchid, 360 clásico/Green/Red Mujer/White, Love, Reserve Mujer; Prada Paradoxe |
| 614–616, 621–629, 632, 637 | Ralph; Hawas Atlantis/Black/Elixir/Fire/Ice/Kobra/London/Malibu/Pink/Tropical/Viper; Rayhaan Aquatica; Incanto Shine. Kobra y Malibu tienen coincidencia visual manual, pero aún no ficha independiente. |
| 662, 664 | Victorinox Altitude; Hermès Terre d’Hermès EDT |
| 665–672, 675–680, 682–687 | Todos los testers con imagen: Ari, Mod Blush, Thank U Next, Midnight Fantasy, L’Imperatrice, D&G Pour Femme, My Way Intense, Halloween Kiss, Touch of Pink, Toy 2, Toy Boy, Voyage, Nina, Swiss Army, Love Me Silver, Touch Sensual, Dylan Turquoise, Eros Flame, Versace Pour Homme; además Tommy Hilfiger Hombre |
| 700–701, 704, 706 | Valentino Donna Born In Roma Coral Fantasy, Donna Born In Roma, Uomo Born In Roma EDT, Uomo Born In Roma Intense |
| 710–722, 725 | Versace Crystal Noir EDT, Dylan Blue Femme/Homme, Dylan Turquoise, Eau Fraiche Extreme, Eros Energy/Flame/EDT/Parfum/Femme/Najim, Man Eau Fraiche, Pour Homme; Spicebomb Infrared EDP |

## Control de cobertura

La suma de las tres secciones es 51 + 21 + 103 = **175**, igual al número de filas con imagen dentro del rango. No se modificó catálogo, base de datos ni interfaz.

## Orden recomendado de corrección

1. Retirar primero las 21 imágenes incorrectas, sin reemplazarlas con resultados ambiguos.
2. Aplicar los cuatro reemplazos de fuente oficial ya identificados: refs. 550, 551, 613 y 708.
3. Resolver por edición los lanzamientos recientes refs. 557, 559, 574 y 581.
4. Buscar fotografía exacta para minis, estuches, tester y corporal; no reutilizar el frasco comercial si la tarjeta promete otra presentación.
5. Solo después separar el frasco del fondo y componer el fondo premium, conservando etiqueta, tapa, color y geometría del packshot original.
