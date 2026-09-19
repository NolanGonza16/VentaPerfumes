# Auditoría de imágenes faltantes — referencias 616–680

Fecha de revisión: 2026-09-14

## Criterio

Se contrastó cada fila con `catalog/august-products.json`. Una imagen solo se marca **APROBADO** cuando la ficha fuente identifica la misma marca, nombre/variante, concentración, tamaño y formato, la URL directa responde `HTTP 200` con `image/*`, y la inspección visual muestra el producto correspondiente. Los nombres genéricos del proveedor no se completaron por inferencia.

## Resultados

| Ref. | Producto del catálogo | Estado | URL directa | Evidencia / discrepancia |
|---:|---|---|---|---|
| 619 | Rasasi Hawas Clásico Mujer EDP 100 ml | **SIN_REEMPLAZO** | — | “Hawas Clásico Mujer” no identifica inequívocamente una edición oficial; no es seguro asumir que sea Hawas for Her. |
| 620 | Rasasi Hawas Diva EDP 100 ml | **SIN_REEMPLAZO** | — | No se localizó una ficha primaria o retailer fiable que confirme exactamente el nombre “Hawas Diva”, EDP y 100 ml. |
| 638 | Armaf set Intense + Sillage + Milestone, 3 × 30 ml | **APROBADO** | https://armaf.com.kw/cdn/shop/products/revcollectorscollection1.jpg?v=1654751201&width=1946 | Ficha oficial Armaf “A Collector’s Pride”: Intense Man, Sillage y Milestone, 30 ml cada uno. Inspección: caja negra y los tres frascos correctos; 200 `image/jpeg`. |
| 639 | Armaf set Untold + Iconic + Impériale, 3 × 30 ml | **APROBADO** | https://www.albasha.store/cdn/shop/files/IMG_7454_ProductStaging.jpg?v=1777077122&width=480 | Ficha identifica exactamente los tres Parfum de 30 ml. Inspección: estuche blanco/dorado y frascos azul, blanco y morado correspondientes; 200 `image/jpeg`. |
| 640 | Jean Paul Gaultier Le Male set 2 piezas | **SIN_REEMPLAZO** | — | Existen múltiples sets de dos piezas (75 ml, 125 ml, gel o travel spray). La fila no declara tamaños ni contenido; no se puede elegir uno sin inventar. |
| 641 | Lattafa Mayar set 2 piezas | **SIN_REEMPLAZO** | — | Hay combinaciones distintas de Mayar (EDP, travel spray, hair mist). El catálogo no indica contenido ni tamaños exactos. |
| 642 | Lattafa Yara set 2 piezas | **SIN_REEMPLAZO** | — | Se localizaron sets Yara EDP + mist y sets de dos fragancias diferentes; la fila no especifica cuál corresponde. |
| 644 | Rabanne Phantom Clásico set 2 piezas | **SIN_REEMPLAZO** | — | La fila no declara concentración, tamaños ni segundo artículo; se mantienen las conclusiones de `replacements-critical-c.md`. |
| 646 | Ariana Grande splash 236 ml | **SIN_REEMPLAZO** | — | Marca y volumen no identifican el aroma (Ari, Cloud, Sweet Like Candy, etc.). |
| 647 | Bath & Body Works splash 236 ml | **SIN_REEMPLAZO** | — | No hay nombre de fragancia/SKU; la marca tiene cientos de mists de 236 ml. |
| 648 | Victoria’s Secret Bombshell splash 250 ml | **SIN_REEMPLAZO** | — | “Bombshell” tiene varias variantes de mist de 250 ml; no se confirmó edición/SKU exacto del proveedor. |
| 649 | Britney Spears splash 236 ml | **SIN_REEMPLAZO** | — | Falta el nombre del aroma; no es seguro asumir Midnight Fantasy u otra línea. |
| 650 | Elizabeth Arden splash 236 ml | **SIN_REEMPLAZO** | — | Falta la fragancia concreta/SKU. |
| 651 | Guess splash “Nuevos” 236 ml | **SIN_REEMPLAZO** | — | “Nuevos” describe surtido, no un producto identificable. |
| 652 | Mast Perfume Rome Mujer splash 236 ml | **SIN_REEMPLAZO** | — | No se encontró ficha verificable con imagen directa estable del producto exacto. |
| 653 | Splash Niño variado | **SIN_REEMPLAZO** | — | Marca, aroma, tamaño y SKU sin identificar. Es una fila surtida, no un producto único. |
| 654 | Paris Hilton splash 236 ml | **SIN_REEMPLAZO** | — | Falta el aroma/edición concreta. |
| 655 | Perry Ellis splash 236 ml | **SIN_REEMPLAZO** | — | Falta el aroma/edición concreta. |
| 656 | Victoria’s Secret Pink splash 250 ml | **SIN_REEMPLAZO** | — | PINK es una familia con múltiples mists; falta el aroma/SKU. |
| 657 | Victoria’s Secret splash | **SIN_REEMPLAZO** | — | Falta nombre, volumen y SKU. |
| 658 | Armaf spray corporal 200 ml | **SIN_REEMPLAZO** | — | Falta el aroma exacto; Armaf comercializa varias referencias de 200 ml. |
| 660 | Lattafa spray corporal 200 ml | **SIN_REEMPLAZO** | — | Falta el aroma exacto. |
| 661 | Maison Alhambra spray corporal 200 ml | **SIN_REEMPLAZO** | — | Falta el aroma exacto. |
| 665 | Tester Ariana Grande Ari EDP 100 ml | **SIN_REEMPLAZO** | — | Se confirmó el tester 100 ml, pero las imágenes públicas halladas son del empaque retail y la propia ficha advierte que no representa la presentación tester. |
| 666 | Tester Ariana Grande Mod Blush EDP 100 ml | **SIN_REEMPLAZO** | — | Se confirmó la variante tester 100 ml, pero la foto localizada muestra caja retail y no acredita el formato tester. |
| 667 | Tester Ariana Grande Thank U, Next EDP 100 ml | **APROBADO** | https://cdn2.jomashop.com/media/catalog/product/cache/b3e31d40bbb1abcc90b26106659d5d3f/a/r/ariana-grande-ladies-ari-thank-u-next-edp-spray-34-oz-tester-fragrances-812256024323.jpg?width=800&height=800 | Jomashop identifica tester 100 ml, UPC 812256024323. Inspección: frasco corazón rosa correcto, sin tapa, consistente con tester; 200 `image/jpeg`. |
| 668 | Tester Britney Spears Midnight Fantasy EDP 100 ml | **APROBADO** | https://cdn.notinoimg.com/detail_main_lq/britney-spears/bspfmnw_bedp/fantasy-midnight___121215.jpg | Notino identifica EDP tester para mujer 100 ml. Inspección: frasco azul Midnight Fantasy sin tapa; 200 `image/jpeg`. |
| 669 | Tester Dolce & Gabbana L’Imperatrice EDT 100 ml | **APROBADO** | https://www.lesens.it/16884-large_default/tester-l-imperatrice-pour-femme-eau-de-toilette-100ml-spray.jpg | Ficha identifica tester EDT 100 ml, EAN 8057971182046. Inspección: frasco L’Imperatrice correcto; 200 `image/jpeg`. |
| 670 | Tester Dolce & Gabbana Pour Femme EDT 100 ml | **SIN_REEMPLAZO** | — | Discrepancia crítica: las fichas fiables localizadas del producto de 100 ml lo identifican como **EDP**, mientras el catálogo exige EDT. No se aprueba hasta aclarar la fila. |
| 671 | Tester Giorgio Armani My Way Intense EDP 90 ml | **APROBADO** | https://www.sfiabo.com/wp-content/uploads/2025/06/375x500.68596.jpg | Ficha tester 90 ml y código 3614273348508. Inspección: frasco azul/rosa My Way Intense correcto; 200 `image/jpeg`. |
| 672 | Tester Halloween Kiss EDT 100 ml | **APROBADO** | https://perfumeschile.cl/cdn/shop/files/Halloween-Kiss-EDT-Tester_1.jpg?v=1784574301&width=600 | Ficha retailer identifica tester EDT 100 ml. Inspección: frasco correcto junto a caja de demostración rotulada “TESTER - NOT FOR SALE”; 200 `image/jpeg`. |
| 673 | Tester Halloween Kiss Sexy EDT 100 ml | **APROBADO** | https://mundoaromas.cl/cdn/shop/products/Tester-Halloween-Kiss-Sexy-Edp-100ml-Mujer.jpg?v=1646240536 | Aunque el slug dice `edp`, el título y descripción identifican EDT tester 100 ml; inspección muestra el frasco rosado Kiss Sexy correcto. URL 200 `image/jpeg`. |
| 674 | Tester Issey Miyake Mujer EDT 100 ml | **SIN_REEMPLAZO** | — | “Mujer” no identifica inequívocamente la línea; no se puede asumir L’Eau d’Issey aunque sea la clásica más probable. |
| 675 | Tester Lacoste Touch of Pink 90 ml | **APROBADO** | https://veronnaperfumeria.com/cdn/shop/products/image_a0cae130-b50e-4101-9a74-ef0f9cc7a732.jpg?v=1775112136 | La variante Shopify enlaza esta imagen específicamente al tester 90 ml. Inspección: frasco Touch of Pink correcto; 200 `image/jpeg`. |
| 676 | Tester Moschino Toy 2 EDP 100 ml | **APROBADO** | https://cmx.prodejparfemu.cz/img/products/28/542616_toy_2_edp_tester_l.jpg | Ficha seleccionada “100 ml - Tester”. Inspección: frasco oso transparente/blanco Toy 2 correcto; 200 `image/jpeg`. |
| 677 | Tester Moschino Toy Boy EDP 100 ml | **APROBADO** | https://momperfume.in/cdn/shop/files/rn-image_picker_lib_temp_97a0d992-da43-4e20-9ad3-627d6292dbf8.jpg?v=1754854059&width=416 | Ficha retailer “TESTER - MOSCHINO TOYBOY 100ML EDP”. Inspección: frasco oso negro Toy Boy correcto; 200 `image/jpeg`. |
| 678 | Tester Nautica Voyage EDT 100 ml | **SIN_REEMPLAZO** | — | Se confirmó que el formato existe, pero no se obtuvo una URL directa pública y estable cuya fotografía acreditara el tester exacto sin depender de un asset genérico. |
| 679 | Tester Nina Ricci “Clásico” EDT 80 ml | **SIN_REEMPLAZO** | — | “Clásico” no determina inequívocamente si el proveedor se refiere a Nina u otra fragancia clásica de la casa; no se aprueba por aproximación. |
| 680 | Tester Victorinox/Swiss Army Clásico Hombre EDT 100 ml | **SIN_REEMPLAZO** | — | Se localizó Swiss Army Classic comercial, pero no una ficha-imagen estable que acredite exactamente tester 100 ml. |

## Resumen

- **APROBADO:** 11 (`638, 639, 667, 668, 669, 671, 672, 673, 675, 676, 677`).
- **SIN_REEMPLAZO:** 28.
- Las 18 filas corporales permanecen sin imagen porque el texto del proveedor describe surtidos o solo una marca, no un SKU/aroma único.
- Las filas 640–642 y 644 requieren contenido/tamaños del set; las filas 619, 620, 674 y 679 requieren aclarar el nombre comercial exacto.

## Fuentes de identidad consultadas

- Armaf Kuwait, ficha oficial “Club de Nuit Parfum: A Collector’s Pride”.
- Albasha, ficha del set Armaf Iconic + Impériale + Untold 3 × 30 ml.
- Jomashop, tester Thank U, Next 100 ml (UPC 812256024323).
- Notino, Midnight Fantasy EDP tester 100 ml.
- LeSenso, L’Imperatrice EDT tester 100 ml (EAN 8057971182046).
- Sfiabo, My Way Intense EDP tester 90 ml (EAN 3614273348508).
- Perfumes Chile y Mundo Aromas, fichas tester Halloween Kiss y Kiss Sexy.
- Veronna Perfumería, variante tester Touch of Pink 90 ml.
- ProdejParfemu, Toy 2 EDP tester 100 ml.
- MOM Perfumes, Toy Boy EDP tester 100 ml.
