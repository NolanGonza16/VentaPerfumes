# Reauditoría de identidad de imágenes — referencias 501–731

Fecha: 2026-09-19  
Alcance: correspondencia entre nombre, marca, concentración/presentación e imagen declarada en `catalog/august-products.json` y `catalog/image-manifest.json`. No se modificaron imágenes ni catálogo.

## Resultado

- Total revisado: **231** referencias.
- `exact`: **203**
- `wrong`: **5**
- `uncertain`: **1**
- `missing`: **22**

La clasificación es deliberadamente conservadora: `exact` se asignó cuando el manifiesto ya declaraba `verified_exact` o cuando una ficha específica del retailer confirmó producto, concentración y tamaño y enlazó el mismo archivo CDN; `uncertain` no significa incorrecta, sino que aún falta evidencia suficiente de variante y formato. El detalle máquina-a-máquina de las 231 referencias está en `research/reaudit-image-identity-501-731.json`.

## Errores concretos y faltantes

| Ref | Estado | Producto | Hallazgo | Sustitución/fuente propuesta |
|---:|---|---|---|---|
| 501 | wrong | Lolita Lempicka — Homme | La URL actual se llama Lolita-Lempicka.png y corresponde a la fragancia femenina clásica; la referencia solicitada es Lempicka Homme EDT 100 ml, cuyo frasco masculino es rectangular azul con tapa efecto madera. | [imagen directa](https://www.lolitalempicka.com/cdn/shop/files/F100000_LempickaHommeBox100mlssvoice_600x600.jpg?v=1714477756) |
| 541 | wrong | Lattafa — Miniatura · Honor & Glory | La URL actual identifica explícitamente el frasco Honor & Glory de 100 ml; el SKU exige la miniatura original de 5 ml. | [imagen directa](https://cdnx.jumpseller.com/miniaromas/image/78165967/36FBF6B8-57A3-485C-BBCF-2FFCB0372825.png?1782331205) |
| 544 | wrong | Lattafa — Miniatura · Yara Candy | La imagen actual es el estuche completo Yara Mini Collection 4×5 ml, no la unidad Yara Candy 5 ml descrita por este registro. | [imagen directa](https://perfumedaddy.pk/cdn/shop/files/LattafaYaraCandyEauDeParfumForWomenMini5ml.png?v=1775423119) |
| 565 | wrong | Nautica — Voyage | El nombre del archivo actual contiene NAUVOY200M (presentación 200 ml), mientras el registro exige Nautica Voyage EDT 100 ml/3.4 oz. | [imagen directa](https://www.perfumes.com.ph/cdn/shop/files/nautica-voyage-edt-100ml-perfume-philippines-best-price.webp?v=1698313943&width=2048) |
| 581 | wrong | Rabanne — One Million Night Elixir | La imagen actual muestra 1 Million Elixir estándar (lingote dorado con degradado negro y texto `MILLION ELIXIR`), no la edición limitada Night Elixir de lingote negro. | [imagen directa](https://media.sephora.eu/content/dam/gdam/europe/digital/pim/published/R/RABANNE_FRAGRANCES/804952/400321-media_swatch-0.jpg?scaleHeight=750&scaleMode=fit&scaleWidth=750) |
| 599 | missing | Por confirmar — Perfume Niños Variado | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 635 | missing | — | No existe registro de producto para este origen_ref. | No proponible sin identificar el SKU exacto |
| 640 | missing | Jean Paul Gaultier — Estuche · Le Male 2 Pzs | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | [enlace](https://www.jeanpaulgaultier.com/eu/es_ES/p/linea-le-male/le-male-125-ml-y-gel-de-ducha-75-ml-estuche-de-regalo-000000000065225141) |
| 641 | missing | Lattafa — Estuche · Mayar 2Pzs | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | [enlace](https://dubaiperfumeshop.us/en/products/lattafa-mayar-2-pcs-gift-set-with-3-4-oz-edp-6-8-oz-edp) |
| 642 | missing | Lattafa — Estuche · Yara 2Pzs | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | [enlace](https://www.marshalls.com/us/store/jump/product/women-women-beauty-perfume-fragrance/clearance/2pc-Yara-Eau-De-Parfum-And-Body-Mist-Gift-Set/4000479204) |
| 644 | missing | Rabanne — Estuche · Phantom Clasico 2 Pzs | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | [enlace](https://www.wilko.com/en-uk/paco-rabanne-phantom-eau-de-toilette-100ml-2-piece-gift-set/p/0794527) |
| 646 | missing | Ariana Grande — Corporal · Ariana Grande | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 647 | missing | Bath & Body Works — Corporal · Bath & Body Works | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 648 | missing | Victoria's Secret — Corporal · Bombshell | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 649 | missing | Britney Spears — Corporal · Britney Spears | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 650 | missing | Elizabeth Arden — Corporal · Elizabeth Arden | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 651 | missing | Guess — Corporal · Nuevos | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 652 | missing | Mast Perfume — Corporal · Rome Mujer | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 653 | missing | Por confirmar — Corporal · Nino Variado | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 654 | missing | Paris Hilton — Corporal · Paris Hilton | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 655 | missing | Perry Ellis — Corporal · Perry Ellis | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 656 | missing | Victoria's Secret — Corporal · Victoria's Secret | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 657 | missing | Victoria's Secret — Corporal · Victoria's Secret | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 658 | missing | Armaf — Corporal · Armaf | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 660 | missing | Lattafa — Corporal · Lattafa | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 661 | missing | Maison Alhambra — Corporal · Maison Alhambra | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | No proponible sin identificar el SKU exacto |
| 674 | missing | Issey Miyake — Tester · Mujer | No hay imagen_url/source_url utilizable en catálogo ni manifiesto. | [enlace](https://www.isseymiyakeparfums.com/en/issey-miyake-l-eau-d-issey-eau-de-toilette-EI_EDT.html) |

## Resoluciones adicionales con ficha específica del retailer

Se resolvieron **77** referencias antes marcadas como `uncertain` al cruzar el archivo CDN actual con la ficha y variantes de PerfumeOnline.ca. En cada registro JSON queda la URL de la ficha, el título y las variantes que confirman concentración y formato. Referencias: 502, 509, 511, 515, 521, 522, 523, 524, 525, 526, 529, 530, 531, 549, 552, 553, 556, 561, 563, 566, 567, 571, 573, 575, 584, 585, 586, 587, 588, 590, 594, 595, 596, 597, 598, 600, 601, 603, 604, 606, 608, 609, 611, 612, 614, 615, 616, 621, 622, 623, 625, 627, 628, 629, 632, 637, 662, 664, 687, 700, 701, 704, 706, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 725.

En la revisión exhaustiva del tramo **501–620** se resolvieron otras **19** referencias mediante fichas oficiales o retailers específicos y contraste visual de frasco/etiqueta: **532, 536, 539, 543, 550, 551, 557, 559, 560, 568, 569, 572, 574, 576, 589, 591, 593, 619 y 620**. El JSON conserva para cada una la URL directa propuesta y la evidencia de producto, concentración y tamaño. La ref. 581 pasó a `wrong` al comprobar que la foto es 1 Million Elixir estándar y no Night Elixir; la ref. 599 continúa `missing` porque “Perfume Niños Variado 100ML” no identifica un SKU único.

### Resoluciones por metadatos explícitos en URL de ficha/retailer

Se resolvieron **28** referencias adicionales porque la URL directa identifica nominalmente producto, variante, concentración y tamaño/formato, sin depender de parecido visual. Referencias: 517, 519, 537, 538, 540, 542, 545, 546, 547, 613, 645, 659, 665, 667, 669, 670, 672, 673, 678, 679, 680, 681, 683, 684, 685, 688, 692, 707.

## Evidencia web clave

- **Ref. 501:** el catálogo Lilly identifica *Lempicka Homme* como EDT 100 ml, y una pieza publicitaria muestra el frasco masculino rectangular azul con tapa efecto madera; esto contradice la imagen genérica femenina enlazada actualmente. [Catálogo Lilly](https://www.lilly.rs/download/katalog/Katalog_Lilly_Mart_2025.pdf) · [Pieza visual Lempicka Homme](https://www.latribunedemarrakech.com/wp-content/uploads/2025/02/Essaouira-Express-n1-SD_optimize.pdf)
- **Ref. 541:** Mini Aromas publica específicamente *Bade'e Al Oud Honor & Glory Miniatura Eau de Parfum 5 ml*, útil para reemplazar la foto actual de 100 ml. [Ficha 5 ml](https://www.miniaromas.cl/lattafa-badee-al-oud-honor-glory-miniatura-eau-de-parfum-5-ml)
- **Ref. 544:** Lattafa USA confirma que la colección mostrada actualmente es un set de **4 × 5 ml**; el registro, en singular, es *Yara Candy 5 ml*. [Lattafa USA — set 4×5 ml](https://www.lattafa-usa.com/products/yara-collection-set) · [Ficha unitaria 5 ml](https://perfumedaddy.pk/products/lattafa-yara-candy-eau-de-parfum-for-women-mini-5ml)
- **Ref. 565:** Nautica publica Voyage 3.4 oz (100 ml), mientras la URL actual del catálogo contiene `NAUVOY200M`. [Nautica — Voyage 3.4 oz](https://www.nautica.com/nautica-voyage-3.4-oz.-eau-de-toilette/5881552.html)
- **Refs. 572, 574 y 576:** la inspección directa confirmó respectivamente Invictus Aqua EDT 100 ml, el nuevo Invictus Elixir Parfum 100 ml (trofeo dorado-negro, sin V frontal) e Invictus Victory EDP Extrême 100 ml (frasco negro con V dorada). [Invictus Aqua 100 ml](https://www.noon.com/saudi-en/invictus-aqua-edt-100ml/N15244404A/p/) · [Invictus Elixir 100 ml](https://www.sephora.es/p/invictus-elixir---parfum-hombre-804954.html) · [Invictus Victory EDP Extrême 100 ml](https://www.iciparisxl.be/fr/rabanne/invictus-victory/eau-de-parfum-extreme/p/BP_1110218?varSel=1110197)
- **Ref. 581:** la foto enlazada es 1 Million Elixir estándar; Night Elixir es una edición limitada diferente, en lingote negro, ofrecida como Parfum Elixir 100 ml. [Night Elixir 100 ml](https://www.sephora.fr/p/1-million-night-elixir-%E2%80%93-parfum-elixir-804952.html)
- **Refs. 589 y 593:** se confirmaron visualmente Ultrared femenino EDP 80 ml y Can Can Burlesque EDP; la ref. 593 no declara capacidad, por lo que sus presentaciones documentadas de 50/100 ml no generan conflicto. [Ultrared EDP 80 ml](https://www.shop-apotheke.com/beauty/upmWL2TAH/paco-rabanne-ultrared-eau-de-parfum-spray.htm) · [Can Can Burlesque](https://www.fragrantica.com/perfume/Paris-Hilton/Can-Can-Burlesque-24464.html)
- **Refs. 640–644:** existen fichas específicas para los sets ausentes, pero la descripción del proveedor no siempre enumera los tamaños/componentes; antes de descargar conviene confirmar que el set ofrecido es exactamente el comprado. [JPG Le Male oficial](https://www.jeanpaulgaultier.com/eu/es_ES/p/linea-le-male/le-male-125-ml-y-gel-de-ducha-75-ml-estuche-de-regalo-000000000065225141) · [Mayar 2 piezas](https://dubaiperfumeshop.us/en/products/lattafa-mayar-2-pcs-gift-set-with-3-4-oz-edp-6-8-oz-edp) · [Yara 2 piezas](https://www.marshalls.com/us/store/jump/product/women-women-beauty-perfume-fragrance/clearance/2pc-Yara-Eau-De-Parfum-And-Body-Mist-Gift-Set/4000479204) · [Phantom 2 piezas](https://www.wilko.com/en-uk/paco-rabanne-phantom-eau-de-toilette-100ml-2-piece-gift-set/p/0794527)

## Notas de interpretación

- Las referencias corporales genéricas (646–661) carecen de variante/aroma concreto en varios casos; asignar una foto específica sería inventar identidad. Se mantienen como `missing` cuando no hay URL.
- La ref. 635 no tiene producto ni manifiesto: es un hueco real, no una imagen pendiente.
- Las URLs del CDN de PerfumeOnline.ca sólo pasaron a `exact` cuando se localizaron en una ficha específica del mismo retailer con una variante coincidente en concentración y tamaño; las demás siguen `uncertain`.
- No se consideró una imagen exacta sólo porque el perfume “se parece”: variante, concentración y tamaño forman parte de la identidad requerida.

Se resolvieron **25** registros adicionales mediante contraste visual de la imagen directa y fichas oficiales o retailers específicos. Pasaron a `exact`: 638, 639, 666, 668, 671, 675, 676, 677, 682, 686, 689, 690, 691, 693, 694, 695, 697, 708, 709, 726, 727, 728, 729, 730 y 731.

Permanecen deliberadamente sin resolver:

- **643** (`uncertain`): “Perfect 2 piezas” no incluye tamaños/componentes. La foto actual parece EDP + atomizador de viaje, pero también se comercializan sets legítimos EDP + loción en diferentes capacidades; sin UPC o desglose del proveedor no puede identificarse el SKU comprado.
- **635** (`missing`): no existe registro de producto.
- **640, 641, 642, 644 y 674** (`missing`): nombre insuficiente para elegir de forma segura entre múltiples sets o líneas. Se retiraron enlaces de página que no eran URLs directas de imagen ni probaban una variante única.
- **646–658, 660–661** (`missing`): descripciones corporales genéricas o “variado/nuevos” sin aroma/variante identificable; asignar una imagen concreta inventaría el SKU.

La validación visual comprobó texto legible de nombre/concentración/capacidad cuando aparecía en caja o frasco. Para imágenes de tester sin tamaño visible se exigió además una ficha específica que ofreciera exactamente la variante tester solicitada.
