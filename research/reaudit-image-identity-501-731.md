# Reauditoría de identidad de imágenes — referencias 501–731

Fecha: 2026-09-19  
Alcance: correspondencia entre nombre, marca, concentración/presentación e imagen declarada en `catalog/august-products.json` y `catalog/image-manifest.json`. No se modificaron imágenes ni catálogo.

## Resultado

- Total revisado: **231** referencias.
- `exact`: **54**
- `wrong`: **4**
- `uncertain`: **151**
- `missing`: **22**

La clasificación es deliberadamente conservadora: `exact` sólo se asignó cuando el manifiesto ya declaraba `verified_exact` y no apareció contradicción nominal; `uncertain` no significa incorrecta, sino que la evidencia disponible no permite confirmar con rigor etiqueta, variante y volumen. El detalle máquina-a-máquina de las 231 referencias está en `research/reaudit-image-identity-501-731.json`.

## Errores concretos y faltantes

| Ref | Estado | Producto | Hallazgo | Sustitución/fuente propuesta |
|---:|---|---|---|---|
| 501 | wrong | Lolita Lempicka — Homme | La URL actual se llama Lolita-Lempicka.png y corresponde a la fragancia femenina clásica; la referencia solicitada es Lempicka Homme EDT 100 ml, cuyo frasco masculino es rectangular azul con tapa efecto madera. | [enlace](https://www.lilly.rs/download/katalog/Katalog_Lilly_Mart_2025.pdf) |
| 541 | wrong | Lattafa — Miniatura · Honor & Glory | La URL actual identifica explícitamente el frasco Honor & Glory de 100 ml; el SKU exige la miniatura original de 5 ml. | [enlace](https://www.miniaromas.cl/lattafa-badee-al-oud-honor-glory-miniatura-eau-de-parfum-5-ml) |
| 544 | wrong | Lattafa — Miniatura · Yara Candy | La imagen actual es el estuche completo Yara Mini Collection 4×5 ml, no la unidad Yara Candy 5 ml descrita por este registro. | [enlace](https://perfumedaddy.pk/products/lattafa-yara-candy-eau-de-parfum-for-women-mini-5ml) |
| 565 | wrong | Nautica — Voyage | El nombre del archivo actual contiene NAUVOY200M (presentación 200 ml), mientras el registro exige Nautica Voyage EDT 100 ml/3.4 oz. | [enlace](https://www.nautica.com/nautica-voyage-3.4-oz.-eau-de-toilette/5881552.html) |
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

## Evidencia web clave

- **Ref. 501:** el catálogo Lilly identifica *Lempicka Homme* como EDT 100 ml, y una pieza publicitaria muestra el frasco masculino rectangular azul con tapa efecto madera; esto contradice la imagen genérica femenina enlazada actualmente. [Catálogo Lilly](https://www.lilly.rs/download/katalog/Katalog_Lilly_Mart_2025.pdf) · [Pieza visual Lempicka Homme](https://www.latribunedemarrakech.com/wp-content/uploads/2025/02/Essaouira-Express-n1-SD_optimize.pdf)
- **Ref. 541:** Mini Aromas publica específicamente *Bade'e Al Oud Honor & Glory Miniatura Eau de Parfum 5 ml*, útil para reemplazar la foto actual de 100 ml. [Ficha 5 ml](https://www.miniaromas.cl/lattafa-badee-al-oud-honor-glory-miniatura-eau-de-parfum-5-ml)
- **Ref. 544:** Lattafa USA confirma que la colección mostrada actualmente es un set de **4 × 5 ml**; el registro, en singular, es *Yara Candy 5 ml*. [Lattafa USA — set 4×5 ml](https://www.lattafa-usa.com/products/yara-collection-set) · [Ficha unitaria 5 ml](https://perfumedaddy.pk/products/lattafa-yara-candy-eau-de-parfum-for-women-mini-5ml)
- **Ref. 565:** Nautica publica Voyage 3.4 oz (100 ml), mientras la URL actual del catálogo contiene `NAUVOY200M`. [Nautica — Voyage 3.4 oz](https://www.nautica.com/nautica-voyage-3.4-oz.-eau-de-toilette/5881552.html)
- **Refs. 640–644:** existen fichas específicas para los sets ausentes, pero la descripción del proveedor no siempre enumera los tamaños/componentes; antes de descargar conviene confirmar que el set ofrecido es exactamente el comprado. [JPG Le Male oficial](https://www.jeanpaulgaultier.com/eu/es_ES/p/linea-le-male/le-male-125-ml-y-gel-de-ducha-75-ml-estuche-de-regalo-000000000065225141) · [Mayar 2 piezas](https://dubaiperfumeshop.us/en/products/lattafa-mayar-2-pcs-gift-set-with-3-4-oz-edp-6-8-oz-edp) · [Yara 2 piezas](https://www.marshalls.com/us/store/jump/product/women-women-beauty-perfume-fragrance/clearance/2pc-Yara-Eau-De-Parfum-And-Body-Mist-Gift-Set/4000479204) · [Phantom 2 piezas](https://www.wilko.com/en-uk/paco-rabanne-phantom-eau-de-toilette-100ml-2-piece-gift-set/p/0794527)

## Notas de interpretación

- Las referencias corporales genéricas (646–661) carecen de variante/aroma concreto en varios casos; asignar una foto específica sería inventar identidad. Se mantienen como `missing` cuando no hay URL.
- La ref. 635 no tiene producto ni manifiesto: es un hueco real, no una imagen pendiente.
- Las URLs de CDN con nombre de producto coherente pero sin evidencia primaria quedaron `uncertain`, aunque probablemente muchas sean correctas. Deben revisarse visualmente antes del recorte.
- No se consideró una imagen exacta sólo porque el perfume “se parece”: variante, concentración y tamaño forman parte de la identidad requerida.
