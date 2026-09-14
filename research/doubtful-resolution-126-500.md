# Segunda resolución de imágenes dudosas — refs. 126–500

Fecha: 2026-09-13

## Alcance y criterio

Se revisaron únicamente las filas `NO_VERIFICABLE` solicitadas: referencias 126–250 del primer informe y 404, 483 y 500 del segundo. La comparación cruzó el nombre del catálogo, variante, concentración, volumen, rotulado y silueta del frasco con páginas de marca o fichas comerciales específicas. Las imágenes estaban en cuarentena (`imagen_url = null`) al hacer esta segunda ronda; “imagen actual” se refiere al asset documentado en la auditoría anterior.

`EXACTA_ACTUAL` significa que el asset auditado representa la identidad comercial exigida y puede restaurarse. `REEMPLAZAR` incluye un asset nuevo cuya respuesta fue comprobada como `HTTP 200 image/*`. `SIGUE_DUDOSA` no debe publicarse ni pasar a composición premium.

## Resultado

- Revisadas: **38**
- `EXACTA_ACTUAL`: **35**
- `REEMPLAZAR`: **1**
- `SIGUE_DUDOSA`: **2**

| Ref. | Estado | Verificación y decisión | Fuente exacta | Imagen utilizable |
|---:|---|---|---|---|
| 126 | **EXACTA_ACTUAL** | King Gold Edition, EDP, 100 ml; frasco dorado y denominación coinciden. | [Bharara King Gold Edition](https://bhararamensking.com/) | Restaurar asset auditado. |
| 128 | **EXACTA_ACTUAL** | Pharaoh Ramesses I, 100 ml; la ficha específica y el catálogo mayorista confirman variante y volumen. | [Bharara Australia](https://bharara.com.au/products/bharara-pharaoh-ramasses-eau-da-parfum) | Restaurar asset auditado. |
| 146 | **REEMPLAZAR** | El asset auditado declara `50ML` en el nombre del archivo y no acredita el producto de 100 ml. Se sustituye por el hero oficial de Her EDP 100 ml. | [Burberry Her EDP 100 ml](https://int.burberry.com/her-eau-de-parfum-100ml-p40804591) | `https://assets.burberry.com/is/image/Burberryltd/170DBE43-9B00-40B1-A766-F1482E6F263D?%24BBY_V3_SL_1%24=&hei=1500&wid=1501` — comprobado `HTTP 200`, `image/jpeg`. |
| 147 | **EXACTA_ACTUAL** | Anaïs Anaïs EDT 100 ml; asset y frasco blanco clásico corresponden a la variante EDT. | [Cacharel/L'Oréal, producto](https://www.cacharel.com/fr-fr/parfums/anais-anais) | Restaurar asset auditado. |
| 156 | **EXACTA_ACTUAL** | 212 VIP Rosé Elixir EDP 80 ml; denominación, acabado rosa con destellos y volumen coinciden. | [Carolina Herrera](https://www.carolinaherrera.com/es/es/p-fragrance/212-vip-rose-elixir?sku=000000000065198170) | Restaurar asset auditado. |
| 157 | **SIGUE_DUDOSA** | El archivo auditado se denomina `EDP`, mientras el producto exigido es Bad Boy clásico **EDT** 100 ml. Aunque la silueta es parecida, no debe reutilizarse sin un asset inequívoco de la concentración correcta. | [Bad Boy EDT 100 ml](https://www.carolinaherrera.com/ww/en/p-fragrance/bad-boy?sku=000000000065206727) | Mantener sin imagen. |
| 158 | **EXACTA_ACTUAL** | Bad Boy Cobalt EDP Électrique 100 ml; rayo azul degradado, variante y tamaño coinciden. | [Carolina Herrera](https://www.carolinaherrera.com/de/en/p-fragrance/badboy-cobalt?sku=000000000065176773) | Restaurar asset auditado. |
| 159 | **EXACTA_ACTUAL** | Bad Boy Extreme EDP 100 ml; acabado negro/dorado y concentración coinciden. | [Carolina Herrera](https://www.carolinaherrera.com/pt/pt/p-fragrance/badboy-extreme?sku=000000000065187305) | Restaurar asset auditado. |
| 166 | **EXACTA_ACTUAL** | Good Girl Jasmine Absolute EDP 80 ml; edición, stiletto y tamaño coinciden. | [Carolina Herrera](https://www.carolinaherrera.com/es/es/p-fragrance/goodgirl-jasmine-absolute?sku=000000000065225855) | Restaurar asset auditado. |
| 167 | **EXACTA_ACTUAL** | El nombre abreviado “Good Girl Very” corresponde a Very Good Girl EDP 80 ml; stiletto rojo y presentación coinciden. | [Carolina Herrera](https://www.carolinaherrera.com/es/es/p-fragrance/very-good-girl) | Restaurar asset auditado. |
| 168 | **EXACTA_ACTUAL** | La Bomba EDP 80 ml; frasco mariposa fucsia y volumen coinciden. | [Carolina Herrera](https://www.carolinaherrera.com/ww/en/p-fragrance/labomba?sku=000000000065195954) | Restaurar asset auditado. |
| 176 | **EXACTA_ACTUAL** | Charlie Gold EDT 100 ml; frasco ámbar/naranja y caja dorada coinciden con la presentación oficial. | [Revlon](https://revlon.co.in/products/charlie-gold-edt) | Restaurar asset auditado. |
| 177 | **EXACTA_ACTUAL** | CK Be EDT 200 ml; botella negra mate, concentración y volumen coinciden. | [Calvin Klein](https://www.calvinklein.gr/en/p/ck-be-eau-de-toilette-200ml-85710476311/) | Restaurar asset auditado. |
| 178 | **EXACTA_ACTUAL** | Contradiction for Men EDT 100 ml; botella cilíndrica metálica y presentación coinciden. | [Ficha específica](https://www.profumeriaweb.com/calvin-klein-contradiction-for-men-100ml.html) | Restaurar asset auditado. |
| 179 | **EXACTA_ACTUAL** | Escape for Men EDT 100 ml; identidad y volumen quedan confirmados por fichas específicas y el asset auditado conserva el frasco masculino correcto. | [Parkson, catálogo de marca](https://www.parkson.com.my/cms/upload_files/mailer/mailer_file_6012_000208.pdf) | Restaurar asset auditado. |
| 188 | **EXACTA_ACTUAL** | Davidoff Cool Water Man EDT 125 ml; frasco azul oscuro masculino y presentación coinciden. | [Ficha específica](https://www.fragrancex.com/products/davidoff/cool-water-cologne) | Restaurar asset auditado. |
| 189 | **EXACTA_ACTUAL** | Davidoff Cool Water Woman EDT 100 ml; frasco azul claro femenino y presentación coinciden. | [Ficha específica](https://www.fragrancex.com/products/davidoff/cool-water-perfume) | Restaurar asset auditado. |
| 204 | **EXACTA_ACTUAL** | Curve Wave para hombre, EDC 125 ml; el asset identifica explícitamente la variante masculina EDC. | [Ficha específica](https://www.fragrancex.com/products/liz-claiborne/curve-wave-cologne) | Restaurar asset auditado. |
| 219 | **EXACTA_ACTUAL** | Fahrenheit EDT 100 ml; degradado rojo/ámbar, concentración y capacidad coinciden. | [Dior](https://www.dior.com/fr_fr/beauty/products/fahrenheit-F006624009.html) | Restaurar asset auditado. |
| 220 | **EXACTA_ACTUAL** | J'adore EDP 100 ml; ánfora transparente, cuello dorado y presentación coinciden. | [Dior J'adore](https://www.dior.com/en_us/beauty/products/jadore-eau-de-parfum-Y0715201.html) | Restaurar asset auditado. |
| 221 | **EXACTA_ACTUAL** | Sauvage EDP 100 ml; frasco azul oscuro, rotulado EDP y volumen coinciden. | [Dior](https://www.dior.com/fr_fr/beauty/products/sauvage-eau-de-parfum-F078522009.html) | Restaurar asset auditado. |
| 223 | **EXACTA_ACTUAL** | DKNY Women EDP 100 ml; ficha y asset de la marca coinciden en SKU, botella y presentación. | [DKNY](https://dkny.sa/products/dkny00023) | Restaurar asset auditado. |
| 225 | **EXACTA_ACTUAL** | “Your Devotion” es el rótulo del proveedor para Devotion Eau de Parfum Intense mujer 100 ml; el asset auditado es la edición Intense y no la clásica. | [Dolce&Gabbana Devotion](https://www.dolcegabbana.com/en-us/beauty/perfumes-for-her/devotion/) | Restaurar asset auditado. |
| 226 | **EXACTA_ACTUAL** | Devotion For Men EDP 100 ml; frasco transparente, corazón plateado y variante masculina coinciden. | [Dolce&Gabbana](https://www.dolcegabbana.com/en-us/beauty/perfumes-for-him/devotion-for-men/devotion-for-men-eau-de-parfum---VT00PCVT0009V000.html) | Restaurar asset auditado. |
| 230 | **EXACTA_ACTUAL** | K by Dolce&Gabbana EDP 100 ml; azul más intenso y corona plateada oscura distinguen la EDP. | [Dolce&Gabbana](https://www.dolcegabbana.com/it-it/beauty/profumi-per-lui/k-by-dolceegabbana/k-by-dolceegabbana-eau-de-parfum---VP001UVP0009V000.html) | Restaurar asset auditado. |
| 231 | **EXACTA_ACTUAL** | K by Dolce&Gabbana EDT 100 ml; variante clásica, corona y tamaño coinciden. | [Colección oficial K](https://www.dolcegabbana.com/fr-fr/beaute/parfums-pour-lui/k-by-dolceetgabbana/) | Restaurar asset auditado. |
| 232 | **EXACTA_ACTUAL** | K by Dolce&Gabbana Parfum 100 ml; el EAN incluido en el asset y el acabado oscuro corresponden al Parfum. | [Colección oficial K](https://www.dolcegabbana.com/fr-fr/beaute/parfums-pour-lui/k-by-dolceetgabbana/) | Restaurar asset auditado. |
| 235 | **EXACTA_ACTUAL** | Light Blue mujer EDT 100 ml; asset oficial, acabado esmerilado y tapa azul coinciden. | [Dolce&Gabbana](https://www.dolcegabbana.com/en-us/beauty/perfumes-for-her/light-blue/new-lb-edt-100ml---158057971188192.html) | Restaurar asset auditado. |
| 239 | **EXACTA_ACTUAL** | Dolce&Gabbana Pour Femme EDT 100 ml, presentación histórica; el asset auditado corresponde a la botella roja EDT y no a la reformulación EDP. | [Ficha específica](https://www.fragrantica.com/perfume/Dolce-Gabbana/Dolce-Gabbana-1169.html) | Restaurar asset auditado. |
| 241 | **EXACTA_ACTUAL** | Q by Dolce&Gabbana EDP 100 ml; corona dorada/roja, botella gruesa y concentración coinciden. | [Dolce&Gabbana](https://www.dolcegabbana.com/en-us/beauty/perfumes-for-her/q-by-dolceandgabbana/eau-de-parfum---158057971183654.html) | Restaurar asset auditado. |
| 244 | **EXACTA_ACTUAL** | Drakkar Noir EDT 200 ml; frasco negro circular y tamaño del asset coinciden. | [Ficha específica](https://www.fragrancex.com/products/guy-laroche/drakkar-noir-cologne) | Restaurar asset auditado. |
| 246 | **EXACTA_ACTUAL** | Dumont Nitro Red EDP 100 ml; frasco rojo, rotulado y capacidad coinciden con la ficha de marca. | [Dumont](https://www.dumontparis.com/product/nitro-red/) | Restaurar asset auditado. |
| 247 | **EXACTA_ACTUAL** | Nitro Red Intensely Extrait de Parfum 100 ml; edición Intensely, concentración y tamaño coinciden. | [Dumont](https://dumontparfums.com/products/nitro-red-intensely) | Restaurar asset auditado. |
| 249 | **SIGUE_DUDOSA** | La identidad del catálogo dice Green Tea **EDP** 100 ml, pero la presentación comercial conocida y el asset auditado corresponden a **Eau Parfumée / EDT**. Es un problema de identidad del registro, no algo resoluble seleccionando otra foto. | [Elizabeth Arden Green Tea](https://www.elizabetharden.com/products/green-tea-scent-spray) | Mantener sin imagen hasta corregir/confirmar la concentración del catálogo. |
| 250 | **EXACTA_ACTUAL** | Red Door EDT 100 ml; frasco rojo, concentración y tamaño coinciden con el producto oficial 3.4 fl oz. | [Elizabeth Arden](https://www.elizabetharden.com/products/red-door-eau-de-toilette-spray) | Restaurar asset auditado. |
| 404 | **EXACTA_ACTUAL** | Game of Spades King, Parfum 100 ml; la página oficial confirma nombre, formulación Parfum y 3.4 oz/100 ml, y el asset `King.jpg` corresponde al hero oficial. | [Jo Milano Paris](https://jomilanoparis.com/products/game-of-spades-king) | Restaurar asset auditado. |
| 483 | **EXACTA_ACTUAL** | Qaed Al Fursan Untamed EDP 90 ml; aunque el slug heredado dice `unlimited`, la página de Lattafa identifica inequívocamente **Untamed**, UPC 6290362340645 y 90 ml. | [Lattafa USA](https://www.lattafa-usa.com/products/qaed-al-fursan-unlimited) | Restaurar asset auditado. |
| 500 | **EXACTA_ACTUAL** | Muharib Alpha EDP 85 ml existe en esa presentación; la ficha regional de 85 ml resuelve la discrepancia con la página europea de 100 ml. La botella del asset coincide. | [Jumia / Le Falcone 85 ml](https://www.jumia.com.eg/le-falcone-muharib-alpha-eau-de-perfume-85ml-134448277.html) | Restaurar asset auditado. |

## Bloqueos que deben mantenerse

1. **Ref. 157:** no restaurar el archivo nombrado como EDP para un registro EDT.
2. **Ref. 249:** confirmar primero si el PDF quiso decir Green Tea Scent Spray/EDT; no existe evidencia sólida para la etiqueta EDP actual.
3. Las imágenes aprobadas aquí pueden volver al catálogo, pero todavía deben conservarse sin filtros. El recorte y fondo premium se hará únicamente después de restaurar y validar la identidad final.
