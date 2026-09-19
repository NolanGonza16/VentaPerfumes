# Verificación precisa de imágenes — refs 732, 733, 736, 738, 740 y 742

Fecha de revisión: 2026-09-19

## Criterio

- Se trabajó por `origen_ref`, no por posición del arreglo.
- Se conservó literalmente `presentacion_proveedor`.
- Para aprobar se exigió coincidencia de marca, nombre/variante, concentración y volumen/formato, además de una URL directa pública que respondió HTTP 200 con `Content-Type: image/jpeg`.
- La inspección visual se contrastó con la ficha del mismo producto. No se aceptaron imágenes de inspiraciones, variantes vecinas, sets distintos, testers, recargas ni botellas genéricas.

## Resultados

### Ref 732 — APROBADO

- `presentacion_proveedor`: `VOLARE TEMPTATION ||| EDP 100ML`
- Producto verificado: Volaré Temptation III, Eau de Parfum, 100 ml.
- Imagen directa: https://luxurious-fragrances.com/wp-content/uploads/2025/08/Temptation-III.jpg
- Verificación técnica: HTTP 200, `image/jpeg`, 1000 × 1000 px.
- Evidencia de identidad: la ficha enlazada por el propio registro y otras tiendas coinciden en `Temptation III`, Volaré, 100 ml, y muestran la misma botella/caja. La grafía `|||` del proveedor representa `III`.
- Fuente de producto: https://luxurious-fragrances.com/en/product/eau-de-parfum-temptation-iii/

### Ref 733 — APROBADO

- `presentacion_proveedor`: `VOLARE VIP ROMANTIC ROSE EDP`
- Producto verificado: Volaré Romantic Rose VIP, Eau de Parfum para mujer, 100 ml.
- Imagen directa: https://f.nooncdn.com/p/pzsku/Z5B92B6606972B75DD45CZ/45/_/1739965586/d85eb22c-b082-4a92-9ab8-b51a96ebb7e0.jpg
- Verificación técnica: HTTP 200, `image/jpeg`, 830 × 1132 px.
- Evidencia de identidad: el asset pertenece a la ficha `Romantic Rose VIP Eau De Parfum for Women - 100ML`, marca Volare; la ficha muestra explícitamente `EDP | 100ml` y el mismo producto en botella y caja.
- Fuente de producto: https://www.noon.com/egypt-en/romantic-rose-vip-eau-de-parfum-for-women-100ml/Z5B92B6606972B75DD45CZ/p/

### Ref 736 — APROBADO

- `presentacion_proveedor`: `YARA ROSADO 10ML`
- Producto verificado: Yara Pink/Rosado, **aceite perfumado roll-on de 10 ml**.
- Imagen directa: https://thehouseoffragrances.co.uk/cdn/shop/files/s-l1600_12.jpg?v=1729110567&width=1946
- Verificación técnica: HTTP 200, `image/jpeg`, 600 × 600 px.
- Evidencia de formato: dos fichas independientes describen esta presentación exacta como `Yara Pink 10ML Roll on Perfume` / `Roller Oil 10ML`; Walmart especifica literalmente `Presentación en formato Roller Oil de 10mL`. La imagen inspeccionada muestra el roll-on comercial, no la botella EDP de 100 ml, un mini spray ni un decant rellenado.
- Nota de control: la presentación de 10 ml se comercializa también bajo referencias de Ard Al Zaafaran; por ello la aprobación se limita a la presentación visual exacta `Yara Pink/Rosado 10 ml roll-on` y no debe sustituirse por la botella Lattafa EDP de 100 ml.
- Fuentes de producto:
  - https://thehouseoffragrances.co.uk/products/yara-pink-10ml-roll-on-perfume-by-lattafa-inspired-by-poison-girl-dior
  - https://www.walmart.com.mx/ip/mini-perfume-yara-para-mujer-lattafa-roller-oil-10ml/00642308073117

### Ref 738 — APROBADO

- `presentacion_proveedor`: `YSL LIBRE LE PARFUM 90ML`
- Producto verificado: Yves Saint Laurent Libre Le Parfum, 90 ml.
- Imagen directa oficial: https://www.yslbeauty.com/dw/image/v2/BDCR_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw51c36b6e/pdp/WW-51020YSL/WW-51020YSL-LIBRE-LE-PARFUM-1.jpg
- Verificación técnica: HTTP 200, `image/jpeg`, 2000 × 2000 px.
- Evidencia de identidad: asset del PDP oficial `WW-51020YSL`, cuyo selector oficial confirma 90 ml; visualmente corresponde a Libre **Le Parfum**, con líquido ámbar oscuro y acabado dorado/negro, no a Libre EDP ni Intense.
- Fuente oficial: https://www.ysl-beauty.nl/parfums/parfum-voor-haar/libre/libre-le-parfum/WW-51020YSL.html?dwvar_WW-51020YSL_size=90+ml

### Ref 740 — APROBADO

- `presentacion_proveedor`: `YSL Y EDP 100ML`
- Producto verificado: Yves Saint Laurent Y Eau de Parfum, 100 ml.
- Imagen directa oficial: https://www.yslbeauty.com/dw/image/v2/BDCR_PRD/on/demandware.static/-/Sites-ysl-master-catalog/en/dw65951c69/images/PACKSHOTS/FRAGRANCE/FOR_HIM/WW-50194YSL_y-edp-refill/00-3614272050358_100ml_y-eau-de-parfum_Alt1.jpg
- Verificación técnica: HTTP 200, `image/jpeg`, 1000 × 1000 px.
- Evidencia de identidad: asset oficial del PDP `WW-50194YSL`; el nombre del archivo identifica `100ml_y-eau-de-parfum`, y el selector oficial confirma 100 ml. La botella azul degradada corresponde al EDP, no al EDT ni a Le Parfum.
- Fuente oficial: https://www.yslbeauty.com/int/fragrance/fragrance-for-him/y/y--eau-de-parfum/WW-50194YSL.html

### Ref 742 — APROBADO

- `presentacion_proveedor`: `YSL Y EDT 100ML`
- Producto verificado: Yves Saint Laurent Y Eau de Toilette, 100 ml.
- Imagen directa oficial: https://www.yslbeauty.com/dw/image/v2/BDCR_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw5d16ecc1/images/PACKSHOTS/FRAGRANCE/FOR_HIM/WW-50959YSL_yedt/3614273683401_YEDT_100ML_alt_main.jpg
- Verificación técnica: HTTP 200, `image/jpeg`, 1000 × 1000 px.
- Evidencia de identidad: asset oficial del PDP `WW-50959YSL`; el archivo identifica `YEDT_100ML` y el selector oficial confirma 100 ml. Visualmente corresponde a la botella cristalina azul clara con Y plateada del EDT, no a la botella azul oscura del EDP.
- Fuente oficial: https://www.yslbeauty.com/int/fragrance/fragrance-for-him/y/y--eau-de-toilette/WW-50959YSL.html

## Resumen utilizable

| origen_ref | estado | URL directa aprobada |
|---:|---|---|
| 732 | APROBADO | https://luxurious-fragrances.com/wp-content/uploads/2025/08/Temptation-III.jpg |
| 733 | APROBADO | https://f.nooncdn.com/p/pzsku/Z5B92B6606972B75DD45CZ/45/_/1739965586/d85eb22c-b082-4a92-9ab8-b51a96ebb7e0.jpg |
| 736 | APROBADO | https://thehouseoffragrances.co.uk/cdn/shop/files/s-l1600_12.jpg?v=1729110567&width=1946 |
| 738 | APROBADO | https://www.yslbeauty.com/dw/image/v2/BDCR_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw51c36b6e/pdp/WW-51020YSL/WW-51020YSL-LIBRE-LE-PARFUM-1.jpg |
| 740 | APROBADO | https://www.yslbeauty.com/dw/image/v2/BDCR_PRD/on/demandware.static/-/Sites-ysl-master-catalog/en/dw65951c69/images/PACKSHOTS/FRAGRANCE/FOR_HIM/WW-50194YSL_y-edp-refill/00-3614272050358_100ml_y-eau-de-parfum_Alt1.jpg |
| 742 | APROBADO | https://www.yslbeauty.com/dw/image/v2/BDCR_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw5d16ecc1/images/PACKSHOTS/FRAGRANCE/FOR_HIM/WW-50959YSL_yedt/3614273683401_YEDT_100ML_alt_main.jpg |

No quedó ningún `SIN_REEMPLAZO` dentro de este bloque.
