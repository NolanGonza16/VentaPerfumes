# Última búsqueda comercial precisa — refs 6, 25, 41, 164, 218, 249, 261, 264, 265, 268, 471 y 572

Fecha de revisión: 2026-09-19.

## Criterio

- La selección se hizo exclusivamente por `origen_ref`, no por posición del arreglo.
- Se copió literalmente `presentacion_proveedor` desde `catalog/august-products.json`.
- `APROBADO` exige coincidencia visible de marca, nombre/edición, concentración, volumen y formato. Además, la URL directa respondió HTTP 200 con `Content-Type: image/*`.
- Cuando la descripción del PDF no coincide con el producto documentado por la marca, no se fuerza una imagen: se deja la corrección demostrable.

## Resultado ejecutivo

- **APROBADO:** refs **25, 41, 218 y 572**.
- **CORRECCIÓN DE DATOS ANTES DE USAR IMAGEN:** refs **164 y 249**.
- **SIN_REEMPLAZO exacto:** refs **6, 261, 264, 265, 268 y 471**.

## Revisión por origen_ref

### Ref 6 — SIN_REEMPLAZO

- `presentacion_proveedor`: `ADIDAS HOMBRE EDT 100ML`
- Registro: Adidas · Hombre · EDT · 100 ml.
- Motivo: “Hombre” no identifica una fragancia. Adidas tiene múltiples EDT masculinos de 100 ml (Dynamic Pulse, Ice Dive, Team Force, Victory League, etc.). No existe un EAN, nombre de línea o fotografía del PDF que permita escoger uno sin inventar.

### Ref 25 — APROBADO

- `presentacion_proveedor`: `ANTONIO B BLUE SEDUCCION SUMMER ESSENCE EDT 100ML`
- Identidad confirmada: **Antonio Banderas Blue Seduction Summer Essence EDT 100 ml**, EAN **8411061084038**.
- Evidencia: la [página oficial de Banderas](https://banderasperfumes.com/int/en/womens-fragrances/blue-seduction-summer-essence/) confirma nombre, EDT y 100 ml; [Jomashop](https://www.jomashop.com/antonio-banderas-mens-blue-seduction-summer-essence-edt-spray-3-4-oz-fragrances-8411061084038.html) y [Ripley](https://simple.ripley.cl/perfume-banderas-blue-seduction-men-summer-essence-hombre-edt-100-ml-2000403113428p?contenido_perfume=100-ml&s=mdco) confirman el EAN.
- Inspección visual: botella y caja azul cobalto, texto amarillo `BLUE SEDUCTION SUMMER ESSENCE`, marca `BANDERAS`, `EAU DE TOILETTE NATURAL SPRAY FOR MEN`, `100 ml / 3.4 FL.OZ`.
- URL directa aprobada: `https://yauras.cl/cdn/shop/files/RaveNowWhite100MlEdp_74_ed014bcd-2f10-4805-a139-4e621d79fc8c_700x700.jpg?v=1779905842`
- Validación: HTTP 200, `image/jpeg`.

### Ref 41 — APROBADO (mercado latinoamericano)

- `presentacion_proveedor`: `ARIANA GRANDE THANK U NEXT 2.0 EDP 100ML`
- Identidad confirmada: **Ariana Grande Thank U Next 2.0 EDP 100 ml**.
- Evidencia: la [página oficial](https://arianagrandefragrances.com/products/thank-u-next-2-0) confirma el nombre y la botella lavanda; su catálogo estadounidense solo muestra 30 y 7 ml. Sin embargo, [Falabella Colombia](https://www.falabella.com.co/falabella-co/product/73693826/ariana-grande-thank-u-next-2-0-edp) documenta expresamente la versión EDP 100 ml, modelo **ARG5LR21110LE**, vendida directamente por Falabella.
- Inspección visual: botella y estuche lavanda con corazón roto y texto `thank u, next 2.0`; la ficha enlazada corresponde a la variante 100 ml.
- URL directa aprobada: `https://media.falabella.com/falabellaCO/73693826_1/public`
- Validación: HTTP 200, `image/jpeg`.
- Nota de integridad: conservar la referencia comercial latinoamericana en el manifiesto, ya que el sitio oficial de EE. UU. no lista actualmente 100 ml.

### Ref 164 — CORRECCIÓN DE DATOS, SIN_REEMPLAZO 100 ml

- `presentacion_proveedor`: `CAROLINA HERRERA GOOD GIRL BLUSH POLKA PARADISE100ML`
- La [página oficial de Carolina Herrera](https://www.carolinaherrera.com/uk/en/editorial/fragrance-good-girl-blush-polka-paradise) identifica **Good Girl Blush Polka Paradise Collector's Edition Eau de Parfum de 80 ml**.
- La botella correcta es el tacón blanco con lunares negros y tacón dorado. No se encontró edición oficial de 100 ml.
- Corrección demostrable: `tamano_ml: 80`, `concentracion: Eau de Parfum`, nombre normalizado `Good Girl Blush Polka Paradise Collector's Edition`.
- Estado: no aprobar una imagen como “100 ml”; primero corregir el dato o confirmar con el proveedor si la fila corresponde a otro producto.

### Ref 218 — APROBADO

- `presentacion_proveedor`: `DESODORANTE PERRY ELLIS 360 RED HOMBRE 170ML`
- Identidad confirmada: **Perry Ellis 360° Red For Men Deodorizing Body Spray, 6 oz / 170 g**.
- Evidencia: [Walmart](https://www.walmart.com/ip/153310055) lo identifica como body spray 6.8/6 oz y aporta UPC **8440610105290**; [Drogasil](https://www.drogasil.com.br/desodorante-spray-perfumado-masculino-perry-ellis-360-red-170-grs-1386220.html) documenta 170 g y EAN **7891186114393** para el mercado brasileño.
- Inspección visual: aerosol rojo, tipografía negra `360° RED`, `PERRY ELLIS FOR MEN`, `DEODORIZING BODY SPRAY`, `NET WT. 6 OZ / 170 g`.
- URL directa aprobada: `https://foreverlux.com/cdn/shop/files/1418201__74385.1698007912.1280.1280.png?v=1761779160`
- Validación visual mediante la ficha exacta de [ForeverLux](https://foreverlux.com/products/360-red-by-perry-ellis-6-oz-body-spray-men); URL directa verificada como imagen.

### Ref 249 — CORRECCIÓN DE DATOS; IMAGEN CONDICIONAL

- `presentacion_proveedor`: `ELIZABETH ARDEN GREEN TEA EDP 100ML`
- La [marca Elizabeth Arden](https://www.elizabetharden.com/products/green-tea-scent-spray) vende **Green Tea Scent Spray 3.4 fl oz (~100 ml)** y su colección oficial lo clasifica como **Eau de Toilette**, no EDP.
- Corrección demostrable: cambiar `concentracion` de `Eau de Parfum` a `Eau de Toilette` (o mantener el nombre comercial oficial `Scent Spray`).
- Imagen oficial exacta, usable después de corregir concentración: `http://www.elizabetharden.com/cdn/shop/files/pdp-green-tea-spray-3.3oz.jpg?crop=center&height=1024&v=1766526887&width=1024`
- Inspección visual: frasco rectangular transparente verdoso, tapa metálica y etiqueta `Green Tea Elizabeth Arden`; tamaño oficial 3.4 fl oz.
- Estado: no se marca `APROBADO` contra la fila actual porque EDP ≠ EDT.

### Ref 261 — SIN_REEMPLAZO exacto de formato

- `presentacion_proveedor`: `EMPER STALLION 53 DONNA INTENSE EDP 100ML`
- Identidad comercial encontrada: **Donna Intense by Stallion 53**, EAN **6294021908146**, pero se comercializa documentadamente como set **100 ml + 20 ml** ([GiftExpress](https://www.giftexpress.com/donna-intense-2pcs-gift-set-gxp-15644.html), [Ivory](https://www.ivory.co.il/catalog.php?id=168034)).
- Imagen verificada del set: `https://www.giftexpress.com/media/catalog/product/cache/34455ffd320f2e86e287ef2f61a6a701/g/x/gxp-15644.jpg` (HTTP 200, `image/jpeg`).
- Estado: no aprobar para una fila marcada solo 100 ml hasta confirmar que el proveedor omitió el mini de 20 ml. La fotografía muestra inequívocamente caja + frasco 100 ml + atomizador 20 ml.

### Ref 264 — SIN_REEMPLAZO

- `presentacion_proveedor`: `EMPER STALLION 53 LA FURIA EDP 100ML`
- Se confirma que existe **La Furia by Stallion 53 / Emper, EDP 100 ml**, pero las fuentes localizadas no entregan una URL directa estable con imagen donde se lean simultáneamente nombre, EDP, 100 ml y formato individual.
- Las fotografías comerciales halladas suelen ser sets 100 + 20 ml o composiciones generadas por tiendas. No se aprueba una imagen aproximada.

### Ref 265 — SIN_REEMPLAZO exacto de formato

- `presentacion_proveedor`: `EMPER STALLION 53 LAHAB EDP 100ML`
- Identidad encontrada: **Lahab by Stallion 53 / Emper**, EAN de set **6294021908948**, comercializado como **100 ml + 20 ml** ([Jomashop](https://www.jomashop.com/emper-unisex-lahab-gift-set-fragrances-6294021908948.html)).
- Imagen exacta del set: `https://cdn2.jomashop.com/media/catalog/product/cache/b3e31d40bbb1abcc90b26106659d5d3f/e/m/emper-unisex-lahab-gift-set-fragrances-6294021908948.jpg?height=800&width=800`.
- Estado: no aprobar para la fila “100ML” individual sin confirmar que el proveedor realmente vende el set. La imagen contiene botella 100 ml + vial 20 ml + caja azul con dragón dorado.

### Ref 268 — SIN_REEMPLAZO exacto de formato

- `presentacion_proveedor`: `EMPER STALLION 53 MORNING DIVE EDP 100ML`
- Identidad encontrada: **Morning Dive by Stallion 53 / Emper**, SKU/EAN **6294021908986**, comercializado como set **100 ml + 20 ml** ([GPM McAllen](https://www.gpmcallen.com/emper-morning-dive-34oz-20ml-by-stallion-53.html)).
- Imagen exacta del set: `https://www.gpmcallen.com/media/catalog/product/cache/1030f3c94d9e16fabbb26c0b6b66b556/6/2/6294021908986_wfwGXhUYHIrPzZ6y.jpg`.
- Estado: no aprobar para formato individual hasta validar con proveedor. La foto muestra frasco azul 100 ml, vial 20 ml y caja de olas.

### Ref 471 — SIN_REEMPLAZO

- `presentacion_proveedor`: `LATTAFA LUXE EDP 100ML`
- “Luxe” no es identificador suficiente. Catálogos mayoristas documentan al menos **Sheikh Al Shuyukh Luxe Edition** EDP 100 ml, EAN **6291106053981**, mientras otras fichas comercializan un producto corto “Lattafa Luxe” y existen nombres como **Ra'ed Luxe**.
- Sin EAN ni nombre completo en el PDF no es posible escoger con rigor entre esas presentaciones. No se aprueba ninguna imagen.

### Ref 572 — APROBADO

- `presentacion_proveedor`: `PACO RABANNE INVICTUS AQUA EDT 100ML`
- Identidad confirmada: **Paco Rabanne Invictus Aqua EDT 100 ml**, EAN **3349668536504**; validado por [Bulk Depot](https://www.bulkdepotusa.com/products/paco-rabanne-invictus-aqua-eau-de-toilett-3-4-oz-100-ml), [United Perfumes](https://www.unitedperfumes.com/up-pacr-163/) y [CS Megastore](https://www.csmegastore.dk/i/4569408/paco-rabanne-invictus-aqua-100-ml).
- Inspección visual: frasco azul translúcido en forma de trofeo, asas/tapa plateadas; caja gris con alas, texto `INVICTUS AQUA`, `paco rabanne`, `EAU DE TOILETTE NATURAL SPRAY 100 ml / 3.4 FL.OZ`.
- URL directa aprobada: `https://cdn.shopify.com/s/files/1/0309/3164/8647/products/mainAqua_1024x1024%402x.jpg?v=1607853386`
- Nota: corresponde a la presentación comercial asociada al EAN 3349668536504; no debe mezclarse con Invictus original ni con Invictus Parfum.

## URLs aprobadas para aplicación automática

```json
{
  "25": "https://yauras.cl/cdn/shop/files/RaveNowWhite100MlEdp_74_ed014bcd-2f10-4805-a139-4e621d79fc8c_700x700.jpg?v=1779905842",
  "41": "https://media.falabella.com/falabellaCO/73693826_1/public",
  "218": "https://foreverlux.com/cdn/shop/files/1418201__74385.1698007912.1280.1280.png?v=1761779160",
  "572": "https://cdn.shopify.com/s/files/1/0309/3164/8647/products/mainAqua_1024x1024%402x.jpg?v=1607853386"
}
```

## Correcciones de catálogo demostrables

1. Ref 164: 100 ml → **80 ml**, concentración **Eau de Parfum**, según Carolina Herrera.
2. Ref 249: EDP → **Eau de Toilette / Green Tea Scent Spray**, 3.4 fl oz, según Elizabeth Arden.
3. Refs 261, 265 y 268: las presentaciones verificables son sets **100 + 20 ml**; requieren confirmación del proveedor antes de cambiar el formato.

