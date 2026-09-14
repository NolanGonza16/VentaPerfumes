# Verificación de imágenes — lote 3

Alcance: 60 registros `tipo_producto = Perfume` con imagen faltante, excluyendo referencias tratadas en `image-verification-next-batch.md`, `image-verification-batch-2.md` y P0. Se exigió coincidencia exacta de marca, nombre/edición, concentración y ml; no se aplicaron candidatos parciales. No se modificó catálogo, Supabase, UI ni git.

## Coincidencias exactas aplicables

No hubo coincidencias aplicables con URL directa comprobada como HTTP 200 y `image/*` en este lote.

## No resueltos

| Ref | Nombre | Marca | Presentación | image_url | Razón |
|---:|---|---|---|---|---|
| 4 | Magic Red | Acqua di Parisis | EDP 100 ml | — | Sin asset exacto verificable. |
| 6 | Hombre | Adidas | EDT 100 ml | — | Nombre insuficiente para edición exacta. |
| 25 | Blue Seduccion Summer Essence | Antonio Banderas | EDT 100 ml | — | Sin asset exacto verificable. |
| 206 | Decant · Cloud Pink | Ariana Grande | 2 ml | — | No se validó packshot del decant de 2 ml. |
| 218 | Corporal · 360 Red Hombre | Perry Ellis | Desodorante 170 ml | — | Sin asset exacto verificable. |
| 236 | Light Blue Mujer | Dolce & Gabbana | 200 ml | — | No se reutilizó asset de 100 ml. |
| 252 | Elsatys Bloom | Elsatys | EDP 75 ml | — | Sin asset exacto verificable. |
| 258 | Shinning City | Emper | EDP 100 ml | — | Sin asset exacto verificable. |
| 259 | Stallion 53 9 To 9 | Emper | EDP 100 ml | — | Sin ficha/asset exacto. |
| 260 | Stallion 53 Blue Stallion | Emper | EDP 100 ml | — | Sin ficha/asset exacto. |
| 261 | Stallion 53 Donna Intense | Emper | EDP 100 ml | — | Sin ficha/asset exacto. |
| 264 | Stallion 53 La Furia | Emper | EDP 100 ml | — | Sin ficha/asset exacto. |
| 265 | Stallion 53 Lahab | Emper | EDP 100 ml | — | Sin ficha/asset exacto. |
| 266 | Stallion 53 Mandora | Emper | EDP 100 ml | — | Sin ficha/asset exacto. |
| 267 | Stallion 53 Mangofizz | Emper | EDP 100 ml | — | Sin ficha/asset exacto. |
| 268 | Stallion 53 Morning Dive | Emper | EDP 100 ml | — | Sin ficha/asset exacto. |
| 270 | The Black 92 | Emper | EDP 100 ml | — | Sin ficha/asset exacto. |
| 276 | Estuche · El Cielo 4 Pzs | Armaf | Set | — | Sin imagen exacta del estuche. |
| 296 | Rouge | Flaunt | EDP 100 ml | — | Sin asset exacto verificable. |
| 302 | Veneno Bianco | French Avenue | Extrait 100 ml | — | Sin asset exacto verificable. |
| 306 | Corporal · Bath & Body Works | Bath & Body Works | Gel 295 ml | — | Sin SKU/edición exactos. |
| 307 | Elsatys | Elsatys | EDP 100 ml | — | Sin ficha/asset exacto. |
| 310 | Acqua Di Gio Profondo | Giorgio Armani | EDP 200 ml | — | No se reutilizó asset de 100 ml. |
| 329 | Montage Intense | Grandeur | EDP 100 ml | — | Sin asset exacto verificable. |
| 330 | Private Pink | Grandeur | EDP 100 ml | — | Sin asset exacto verificable. |
| 331 | Tribal Blue | Grandeur | EDP 100 ml | — | Sin asset exacto verificable. |
| 365 | Bottled Gris | Hugo Boss | Parfum 100 ml | — | Sin asset exacto verificable. |
| 375 | Mujer | Issey Miyake | EDT 100 ml | — | Nombre insuficiente para edición exacta. |
| 382 | Corporal · Bath & Body Works | Bath & Body Works | Jabón 259 ml | — | Sin SKU/edición exactos. |
| 416 | L12 Blanco | Lacoste | EDT 175 ml | — | Sin asset exacto de 175 ml. |
| 470 | Kids Variados | Lattafa | EDP 75 ml | — | Nombre no identifica edición. |
| 471 | Luxe | Lattafa | EDP 100 ml | — | Sin asset exacto verificable. |
| 479 | Oud Al Rumaan | Lattafa | EDP 100 ml | — | Sin asset exacto verificable. |
| 517 | Precious Pink | Maison Alhambra | EDP 80 ml | — | Sin asset exacto verificable. |
| 519 | Salvo | Maison Alhambra | EDP 100 ml | — | Sin asset exacto verificable. |
| 532 | Peace For Him | Mast Perfume | EDP 100 ml | — | Sin asset exacto verificable. |
| 536 | Sweet Velvet | Mast Perfume | EDP 100 ml | — | Sin asset exacto verificable. |
| 537 | Santorini | Matin Martin | EDP 100 ml | — | Sin asset exacto verificable. |
| 538 | Red | Merazur | EDP 100 ml | — | Nombre genérico; sin asset exacto. |
| 539 | Messi | Messi | EDP 100 ml | — | Sin asset exacto verificable. |
| 540 | Miniatura · Amethyst | Lattafa | 5 ml | — | Sin packshot exacto de miniatura. |
| 541 | Miniatura · Honor & Glory | Lattafa | 5 ml | — | Sin packshot exacto de miniatura. |
| 544 | Miniatura · Yara Candy | Lattafa | 5 ml | — | Sin packshot exacto de miniatura. |
| 568 | Amber Rouge Unisex | Orientica | EDP 80 ml | — | Sin asset exacto verificable. |
| 569 | Royal Amber | Orientica | EDP 80 ml | — | Sin asset exacto verificable. |
| 599 | Perfume Niños Variado | Por confirmar | 100 ml | — | Marca/edición no identificadas. |
| 619 | Hawas Clasico Mujer | Rasasi | EDP 100 ml | — | Edición exacta no confirmada. |
| 620 | Hawas Diva | Rasasi | EDP 100 ml | — | Sin asset exacto verificable. |
| 638 | Estuche · Intense + Sillage + Milestone | Armaf | Set 30 ml | — | Sin imagen exacta del estuche. |
| 639 | Estuche · Untold + Iconic + Imperiale | Armaf | Set 30 ml | — | Sin imagen exacta del estuche. |
| 640 | Estuche · Le Male 2 Pzs | Jean Paul Gaultier | Set | — | Sin imagen exacta del estuche. |
| 641 | Estuche · Mayar 2Pzs | Lattafa | Set | — | Sin imagen exacta del estuche. |
| 642 | Estuche · Yara 2Pzs | Lattafa | Set | — | Sin imagen exacta del estuche. |
| 646 | Corporal · Ariana Grande | Ariana Grande | Splash 236 ml | — | Sin SKU/edición exactos. |
| 647 | Corporal · Bath & Body Works | Bath & Body Works | Splash 236 ml | — | Sin SKU/edición exactos. |
| 648 | Corporal · Bombshell | Victoria's Secret | Splash 250 ml | — | Sin asset exacto verificable. |
| 649 | Corporal · Britney Spears | Britney Spears | Splash 236 ml | — | Sin SKU/edición exactos. |
| 650 | Corporal · Elizabeth Arden | Elizabeth Arden | Splash 236 ml | — | Sin SKU/edición exactos. |
| 651 | Corporal · Nuevos | Guess | Splash 236 ml | — | Nombre no identifica edición. |
| 652 | Corporal · Rome Mujer | Mast Perfume | Splash 236 ml | — | Sin asset exacto verificable. |
