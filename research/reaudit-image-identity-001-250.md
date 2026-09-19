# Reauditoría de identidad de imágenes — referencias 001–250

Fecha de corte: 2026-09-19.

## Resultado

- Registros existentes auditados: **240** (los refs. 132, 134, 135, 136, 137, 138, 169, 212, 213, 214 no existen en el catálogo/manifiesto).
- `exact`: **166**; `wrong`: **4**; `uncertain`: **59**; `missing`: **11**.
- Se contrastó el archivo local cuando existe, la URL actual del manifiesto, el nombre/marca/presentación del catálogo y las fuentes enlazadas. `uncertain` es deliberadamente conservador: no autoriza recorte.

## Errores y faltantes concretos

- **Ref. 1 — ABERCROMBIE & FITCH FIERCE COLOGNE EDC 100ML — `wrong`.** El archivo local muestra un frasco amarillo rotulado “OASIS”; no es Fierce Cologne. Reemplazo: https://www.abercrombie.com.mx/media/catalog/product/k/i/kic_164-1502-0218-270_prod1.jpg?quality=80&fit=bounds&height=1200&width=1200&canvas=1200:1200. Evidencia: https://www.abercrombie.com.mx/colonia-fierce-657819491.
- **Ref. 2 — ABERCROMBIE & FITCH NATURALLY FIERCE EDP 100ML — `wrong`.** El archivo local muestra un frasco rotulado “CUTULI”; no es Naturally Fierce. Reemplazo: https://f.nooncdn.com/p/pzsku/Z657ABCA319CCF6193E73Z/45/_/1696358289/524358a6-4fd3-424a-a47c-6687423a05bb.jpg. Evidencia: https://www.rossmann.pl/Produkt/Wody-perfumowane/Abercrombie-Fitch-Naturally-Fierce-woda-perfumowana-dla-kobiet-100-ml%2C2084064%2C13266.
- **Ref. 6 — ADIDAS HOMBRE EDT 100ML — `missing`.** No hay imagen asignada y la denominación del proveedor no permite proponer con seguridad una variante exacta. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.
- **Ref. 25 — ANTONIO B BLUE SEDUCCION SUMMER ESSENCE EDT 100ML — `wrong`.** La URL actual declara en su nombre de archivo Rave Now White 100 ml; además el nombre del proveedor no identifica inequívocamente una edición comercial de Antonio Banderas. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.
- **Ref. 68 — ARMAF ETER ARABIAN SKY EDP 100ML — `wrong`.** La ref. 68 reutiliza exactamente /products/cutouts/ref-0067.png (Dubai Delicacy Kunafa Chocolate), no Eter Arabian Sky. Reemplazo: https://armaf.com/products/eter-arabian-sky. Evidencia: https://armaf.com/products/eter-arabian-sky.
- **Ref. 164 — CAROLINA HERRERA GOOD GIRL BLUSH POLKA PARADISE100ML — `missing`.** No hay imagen asignada y la denominación del proveedor no permite proponer con seguridad una variante exacta. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.
- **Ref. 206 — DECANT ARIANA GRANDE CLOUD PINK 2ML — `missing`.** No hay imagen asignada. Para decants se requiere fotografía propia del atomizador rotulado; una botella retail no acredita la presentación vendida. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.
- **Ref. 207 — DECANT ARMAF ODYSSEY ARTISTO 5ML — `missing`.** No hay imagen asignada. Para decants se requiere fotografía propia del atomizador rotulado; una botella retail no acredita la presentación vendida. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.
- **Ref. 208 — DECANT ARMAF VENTANA 5ML — `missing`.** No hay imagen asignada. Para decants se requiere fotografía propia del atomizador rotulado; una botella retail no acredita la presentación vendida. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.
- **Ref. 209 — DECANT CAROLINA HERRERA 212 VIP ROSE 10ML — `missing`.** No hay imagen asignada. Para decants se requiere fotografía propia del atomizador rotulado; una botella retail no acredita la presentación vendida. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.
- **Ref. 210 — DECANT DIOR SAUVAGE EDT 5ML — `missing`.** No hay imagen asignada. Para decants se requiere fotografía propia del atomizador rotulado; una botella retail no acredita la presentación vendida. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.
- **Ref. 211 — DECANT LATTAFA ART OF NATURE 5ML — `missing`.** No hay imagen asignada. Para decants se requiere fotografía propia del atomizador rotulado; una botella retail no acredita la presentación vendida. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.
- **Ref. 215 — DECANT MOSCHINO FUNNY 5ML — `missing`.** No hay imagen asignada. Para decants se requiere fotografía propia del atomizador rotulado; una botella retail no acredita la presentación vendida. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.
- **Ref. 216 — DECANT MOSCHINO TOY 2 BUBBLE GUM 5ML — `missing`.** No hay imagen asignada. Para decants se requiere fotografía propia del atomizador rotulado; una botella retail no acredita la presentación vendida. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.
- **Ref. 217 — DECANT VERSACE DYLAN BLUE HOMBRE 2ML — `missing`.** No hay imagen asignada. Para decants se requiere fotografía propia del atomizador rotulado; una botella retail no acredita la presentación vendida. Sin URL propuesta segura. Evidencia: catalog/image-manifest.json.

## Correcciones respecto a la auditoría anterior

- Las refs. **1 y 2** habían sido marcadas exactas por validar una URL histórica, pero los archivos que realmente sirve el catálogo son Oasis y Cutuli. Ambas son `wrong`.
- Las refs. **41, 71, 100 y 190** ya apuntan a assets distintos de los observados en la auditoría anterior y ahora pasan la comprobación de identidad.
- La ref. **68** comparte byte por byte el archivo de la ref. 67; por eso no es una mera duda sino un error demostrado.
- Los decants 206–211 y 215–217 ya no tienen botella retail asignada: ahora son `missing`, que es más correcto que publicar una presentación equivocada.

## Fuentes clave

- Fierce 100 ml, página oficial: https://www.abercrombie.com.mx/colonia-fierce-657819491
- Naturally Fierce 100 ml, ficha de retailer con descripción visual explícita: https://www.rossmann.pl/Produkt/Wody-perfumowane/Abercrombie-Fitch-Naturally-Fierce-woda-perfumowana-dla-kobiet-100-ml%2C2084064%2C13266
- Eter Arabian Sky, página oficial ARMAF: https://armaf.com/products/eter-arabian-sky

El detalle completo fila por fila, con estado, asset actual, propuesta y evidencia, está en `research/reaudit-image-identity-001-250.json`.
