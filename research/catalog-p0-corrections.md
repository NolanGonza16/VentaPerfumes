# Correcciones investigadas para los nueve P0

Fecha de revisión: 2026-09-13  
Alcance: referencias `107, 277, 278, 319, 328, 394, 505, 591, 592` del catálogo de agosto.  
Estado: propuesta investigada; este documento no modifica `catalog/august-products.json`.

## Criterio

- La identidad del PDF/proveedor se conserva como punto de partida.
- Las notas se toman primero de la marca. Si no existe una ficha oficial accesible, se usa una ficha exacta de Fragrantica, Parfumo o un comercio reconocido.
- `duración`, `proyección` y `estela` se convierten a la escala visual de 1–5 desde métricas comunitarias sobre 10. Cuando la fuente solo ofrece *sillage*, proyección y estela comparten esa referencia y se marca explícitamente que no son mediciones independientes.
- Todas las imágenes propuestas respondieron HTTP 200 y su página de origen identifica exactamente marca, producto y presentación.
- Las ocasiones que no aparecen literalmente en la página oficial se marcan como recomendación editorial basada en familia, carácter y consenso de uso; no como dato oficial.

## Resumen machine-readable

```yaml
correcciones:
  107: {identidad: confirmada, imagen: reemplazar, ficha: reemplazar, confianza: alta}
  277: {identidad: confirmada, imagen: reemplazar, ficha: reemplazar, confianza: alta}
  278: {identidad: confirmada, imagen: reemplazar, ficha: reemplazar, confianza: alta}
  319: {identidad: confirmada, imagen: reemplazar, ficha: reemplazar_parcialmente, confianza: alta}
  328: {identidad: confirmada, imagen: reemplazar, ficha: reemplazar, confianza: media}
  394: {identidad: confirmada_como_la_belle, imagen: reemplazar, ficha: reemplazar, confianza: alta}
  505: {identidad: confirmada, imagen: reemplazar, ficha: reemplazar, confianza: alta}
  591: {identidad: confirmada, imagen: reemplazar, ficha: reemplazar, confianza: alta}
  592: {identidad: confirmada, imagen: reemplazar, ficha: reemplazar, confianza: alta}
```

## Ref. 107 — The Pride of Armaf Admiral

```yaml
origen_ref: 107
nombre: The Pride of Armaf Admiral
marca: Armaf
presentacion: Eau de Parfum 100 ml
imagen_url: https://armaf.com/cdn/shop/files/NewProject-2024-03-21T105616.640.jpg?v=1739111655&width=1600
familia_olfativa: Ámbar especiada avainillada
genero: Hombre
ocasiones: [Noche, Citas, Eventos, Formal, Otoño, Invierno]
notas:
  salida: [Cardamomo, Pimienta rosa]
  corazon: [Lavanda, Incienso]
  fondo: [Vainilla, Haba tonka, Ámbar, Pachulí]
presencia:
  duracion: "4/5 - aproximadamente 8 a 9 horas según reseña y 8.0/10 comunitario"
  proyeccion: "4/5 - alta a moderada, derivada de sillage 7.6/10"
  estela: "4/5 - marcada; no existe medición separada de la proyección"
descripcion: "Fragancia masculina cálida y envolvente que combina especias luminosas, lavanda e incienso con una base cremosa de vainilla, tonka y ámbar. Elegante para noches, citas y eventos en clima fresco."
```

Corrección: eliminar la ficha y la imagen del ID Fragrantica `65447`. La identidad correcta es la ficha Armaf `88215` y la botella azul oficial. La web oficial clasifica el producto como ámbar, masculino, EDP de 3.4 oz y recomienda noche, ocasiones especiales, otoño e invierno. Parfumo reporta longevidad 8.0/10 y sillage 7.6/10 sobre 19 valoraciones.

Fuentes: [Armaf oficial](https://armaf.com/products/the-pride-of-armaf-admiral), [Fragrantica exacta](https://www.fragrantica.com/perfume/Armaf/The-Pride-Of-Armaf-Admiral-88215.html), [Parfumo](https://www.parfumo.com/Perfumes/Armaf/the-pride-of-armaf-admiral).

## Ref. 277 — Estuche Armaf Odyssey Limoni 4 piezas

```yaml
origen_ref: 277
nombre: Estuche — Odyssey Limoni 4
marca: Armaf
presentacion: "4 piezas: EDP 100 ml, shower gel 100 ml, body spray 50 ml y shampoo 250 ml"
imagen_url: https://armaf.com/cdn/shop/files/GS-OdysseyLimoni_PhotoGrid.pngDisplayingGS-OdysseyLimoni_PhotoGrid.png..png?v=1757025819&width=2048
familia_olfativa: Cítrica aromática acuática
genero: Unisex
ocasiones: [Diario, Casual, Exterior, Primavera, Verano]
notas:
  salida: [Limón, Naranja dulce, Bergamota, Mandarina]
  corazon: [Jengibre, Flor de azahar, Notas marinas]
  fondo: [Ámbar, Almizcle, Té azul]
presencia:
  duracion: "3/5 - promedio comunitario 6.0/10; alrededor de 6 horas como referencia frecuente"
  proyeccion: "3/5 - moderada, derivada de sillage 6.0/10"
  estela: "3/5 - moderada; no existe medición separada de la proyección"
descripcion: "Estuche unisex de frescura cítrica intensa: una apertura de limón, naranja y mandarina evoluciona hacia jengibre, azahar y acordes marinos, con un fondo limpio de té, almizcle y ámbar. Ideal para días cálidos y uso casual."
```

Corrección: la imagen y ficha actuales pertenecen erróneamente a `Lattafa-Perfumes/Odyssey-Limoni-75904`. Armaf publica el estuche exacto y su contenido. La ficha de la fragancia se denomina **Odyssey Limoni Fresh Edition** en Parfumo.

Fuentes: [Armaf oficial, estuche](https://armaf.com/products/odyssey-limoni-gift-set), [Armaf UAE](https://www.armaf.ae/products/odyssey-limoni-fresh-4-pieces-gift-set), [Parfumo](https://www.parfumo.com/Perfumes/Armaf/odyssey-limoni-fresh-edition).

## Ref. 278 — Estuche Armaf Odyssey Mega 4 piezas

```yaml
origen_ref: 278
nombre: Estuche — Odyssey Mega 4 Pzs
marca: Armaf
presentacion: "4 piezas: EDP 100 ml, travel spray 10 ml, shower gel 100 ml y body spray 200 ml"
imagen_url: https://armaf.com/cdn/shop/files/ODYSSEYMEGAGIFTSET.png?v=1770764674&width=2048
familia_olfativa: Fougère aromática amaderada
genero: Hombre
ocasiones: [Diario, Oficina, Casual, Actividad, Primavera, Verano]
notas:
  salida: [Jengibre, Bergamota, Naranja, Limón, Menta]
  corazon: [Piña, Salvia, Enebro, Bayas, Geranio]
  fondo: [Almizcle, Cedro, Vetiver, Haba tonka]
presencia:
  duracion: "3/5 - promedio comunitario 6.6/10, con experiencias variables"
  proyeccion: "3/5 - moderada, derivada de sillage 6.7/10"
  estela: "3/5 - moderada; no existe medición separada de la proyección"
descripcion: "Estuche masculino fresco y energético, con cítricos, jengibre y menta sobre un corazón frutal-aromático y una base limpia de cedro, vetiver, musk y tonka. Versátil para oficina, diario y clima cálido."
```

Corrección: la imagen y ficha actuales pertenecen a una página mal atribuida a Lattafa. Armaf confirma tanto el estuche como la pirámide del perfume Odyssey Mega. Las ocasiones son una recomendación editorial coherente con el carácter fresco-cítrico y las reseñas; Armaf no publica ocasiones para este estuche.

Fuentes: [Armaf oficial, estuche](https://armaf.com/products/313544), [Armaf oficial, fragancia](https://armaf.com/products/odyssey-mega-man), [Parfumo](https://www.parfumo.com/Perfumes/Armaf/odyssey-mega).

## Ref. 319 — Giorgio Valenti Rose Noire

```yaml
origen_ref: 319
nombre: Rose Noire
marca: Giorgio Valenti
presentacion: Parfum de Toilette / Eau de Parfum 100 ml
imagen_url: https://www.giorgio-valenti.com/img/femme/rosenoire-100ml.jpg
familia_olfativa: Floral empolvada almizclada
genero: Mujer
ocasiones: [Formal, Noche, Eventos, Otoño, Invierno]
notas:
  salida: [Geranio, Bergamota, Jazmín, Rosa]
  corazon: [Sándalo, Vetiver, Iris]
  fondo: [Vainilla, Ámbar, Almizcle, Musgo de roble]
presencia:
  duracion: "4/5 - 7.9/10 en Parfumo"
  proyeccion: "4/5 - alta, derivada de sillage 7.9/10"
  estela: "4/5 - intensa y persistente; no existe medición separada de proyección"
descripcion: "Floral femenino de carácter clásico, elegante y empolvado. Rosa, iris y jazmín descansan sobre sándalo, vainilla, musgo y almizcle para crear una presencia sofisticada, ideal para eventos, noches y clima fresco."
```

Corrección: sustituir la imagen de **Byredo Rose Noire ID 1076**. El registro ya contiene la ficha correcta Giorgio Valenti ID 9345, pero la imagen no la sigue. La web oficial confirma botella, género, familia y pirámide. Existe una inconsistencia de nomenclatura histórica: la marca muestra “Eau de parfum” junto a la botella mientras Parfumo cataloga la edición como “Parfum de Toilette”; no debe inventarse una concentración única hasta contrastar el empaque físico del PDF.

Fuentes: [Giorgio Valenti oficial](https://www.giorgio-valenti.com/img/femme/rosenoire-en.html), [Parfumo](https://www.parfumo.com/Perfumes/Giorgio_Valenti/rose-noire-parfum-de-toilette).

## Ref. 328 — Grandeur Aura Pour Femme

```yaml
origen_ref: 328
nombre: Aura Pour Femme
marca: Grandeur
presentacion: Eau de Parfum 100 ml
imagen_url: https://cdn2.jomashop.com/media/catalog/product/cache/b3e31d40bbb1abcc90b26106659d5d3f/g/r/grandeur-ladies-aura-pour-femme-edp-spray-3-4-oz-fragrances-5055810035921.jpg?width=800&height=800
familia_olfativa: Floral amaderada ambarada
genero: Mujer
ocasiones: [Diario, Oficina, Citas, Eventos]
notas:
  salida: [Jazmín sambac]
  corazon: [Cashmeran]
  fondo: [Ámbar blanco]
presencia:
  duracion: "No verificable con suficiente evidencia comunitaria específica"
  proyeccion: "No verificable con suficiente evidencia comunitaria específica"
  estela: "No verificable con suficiente evidencia comunitaria específica"
descripcion: "Fragancia femenina floral-amaderada de estructura minimalista: jazmín sambac luminoso, un corazón aterciopelado de cashmeran y una base cálida de ámbar blanco. Pulida y versátil para el día, la oficina o una ocasión elegante."
```

Corrección: eliminar imagen y datos de **Mugler Aura ID 44942**. El producto exacto se valida por marca, nombre, 100 ml y UPC `5055810035921`. Hay pirámides contradictorias entre comercios: Jomashop y otros distribuidores describen jazmín/cashmeran/ámbar; otras páginas publican limón/Buddha wood/cereus/sándalo o violeta/peonía/vainilla. Se recomienda la ficha de Jomashop por su UPC exacto, pero se marca la confianza de notas como **media**, no oficial. No se encontró una métrica comunitaria específica suficientemente sólida; no asignar números de presencia.

Fuentes: [Jomashop, UPC exacto](https://www.jomashop.com/aura-pour-femme-edp-100-ml-3-4oz-by-grandeur-5055810035921.html), [distribuidor alternativo](https://www.angelopouloshair.gr/en/grandeur-elite-aura-pour-femme-eau-de-parfum-100ml), [Soghaat, pirámide conflictiva](https://soghaat.co.uk/fr/products/aura-pour-femme-100ml-edp-by-grandeur).

## Ref. 394 — Jean Paul Gaultier La Belle Paradise Garden

```yaml
origen_ref: 394
nombre: La Belle Paradise Garden
marca: Jean Paul Gaultier
presentacion: Eau de Parfum 100 ml
imagen_url: https://medias.jeanpaulgaultier.com/cdn-cgi/image/width=3840,quality=90,format=avif/medias/sys_master/images/h36/h1a/9862236012574/9862235947038/9862235947038.png
familia_olfativa: Floral ambarada acuática
genero: Mujer
ocasiones: [Citas, Eventos, Día, Noche, Primavera, Verano]
notas:
  salida: [Loto azul]
  corazon: [Iris]
  fondo: [Vainilla]
presencia:
  duracion: "4/5 - 7.8/10 en Parfumo"
  proyeccion: "4/5 - alta/moderada, derivada de sillage 7.5/10"
  estela: "4/5 - marcada; no existe medición separada de proyección"
descripcion: "Un floral ambarado femenino, acuático y sensual. El loto azul aporta una frescura de laguna, el iris una textura elegante y empolvada, y la vainilla un fondo cremoso que funciona especialmente bien en citas y días cálidos."
```

Corrección: el PDF dice `PARADISE GARDEN MUJER`; la identidad exacta es **La Belle Paradise Garden**, no el masculino **Le Beau Paradise Garden ID 81633**. La marca confirma la botella femenina azul, EDP 100 ml, familia floral ámbar y la pirámide de tres notas. Las ocasiones son una síntesis editorial de su carácter y reseñas; no son una clasificación oficial de la marca.

Fuentes: [Jean Paul Gaultier oficial](https://www.jeanpaulgaultier.com/ww/en/p/range-la-belle/la-belle-paradise-garden-eau-de-parfum-000000000065199791), [Fragrantica exacta](https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/La-Belle-Paradise-Garden-88873.html), [Parfumo](https://www.parfumo.com/Perfumes/Jean_Paul_Gaultier/la-belle-paradise-garden-la-belle-fleur-terrible).

## Ref. 505 — Maison Alhambra Chants Tenderina

```yaml
origen_ref: 505
nombre: Chants Tenderina
marca: Maison Alhambra
presentacion: Eau de Parfum 100 ml
imagen_url: https://f.nooncdn.com/p/pzsku/Z03D2913DCAB8FECB5024Z/45/_/1714423574/29aeb09f-2a25-4a69-8357-4aa63647e567.jpg
familia_olfativa: Floral fresca cítrica afrutada
genero: Mujer
ocasiones: [Diario, Oficina, Casual, Citas, Primavera, Verano]
notas:
  salida: [Bergamota, Flor de pomelo, Durazno]
  corazon: [Rosa, Jazmín, Iris]
  fondo: [Almizcle blanco, Vainilla, Vetiver, Pachulí]
presencia:
  duracion: "3/5 - 6.4/10 en Parfumo"
  proyeccion: "3/5 - moderada a íntima, derivada de sillage 5.8/10"
  estela: "3/5 - moderada a íntima; no existe medición separada de proyección"
descripcion: "Fragancia femenina fresca y delicada, con cítricos y durazno sobre un corazón de rosa, jazmín e iris. Su base de musk blanco, vainilla, vetiver y pachulí deja una sensación limpia y elegante para diario, oficina y citas suaves."
```

Corrección: no usar imagen, notas ni descripción de Chanel Chance Eau Tendre. Chants Tenderina posee ficha propia de Maison Alhambra, ID Fragrantica `89034`, y pirámide confirmada por Fragrantica y Parfumo. La imagen propuesta muestra el frasco y caja Maison Alhambra exactos.

Fuentes: [Fragrantica exacta](https://www.fragrantica.com/perfume/Maison-Alhambra/Chants-Tenderina-89034.html), [Parfumo](https://www.parfumo.com/Perfumes/maison-alhambra/chants-tenderina), [Noon, imagen del producto](https://www.noon.com/saudi-en/chants-tenderina-maison-alhambra-edp-100ml/Z03D2913DCAB8FECB5024Z/p/).

## Ref. 591 — Paris Corner Khair Pistachio

```yaml
origen_ref: 591
nombre: Khair Pistachio
marca: Paris Corner
presentacion: Eau de Parfum 100 ml
imagen_url: https://www.pariscornerperfumes.com/cdn/shop/files/KHAIRPISTACHIO01.jpg?v=1718466745&width=1600
familia_olfativa: Gourmand floral oriental
genero: Unisex
ocasiones: [Citas, Casual, Noche, Eventos, Otoño, Invierno]
notas:
  salida: [Bergamota italiana, Gelato de pistacho, Avellana, Ron dulce, Cardamomo]
  corazon: [Geranio, Peonía blanca, Lirio del valle, Jazmín, Frambuesa, Durazno blanco, Pera]
  fondo: [Crema batida, Malvavisco, Algodón de azúcar, Acorde de delicia turca, Cacao, Cedro, Sándalo, Haba tonka]
presencia:
  duracion: "4/5 - 7.2/10 en Parfumo"
  proyeccion: "4/5 - moderada/alta, derivada de sillage 7.1/10"
  estela: "4/5 - dulce y perceptible; no existe medición separada de proyección"
descripcion: "Gourmand unisex cremoso y juguetón, construido alrededor de pistacho, avellana y ron. Flores y frutas iluminan el corazón antes de un fondo de crema, malvavisco, cacao, tonka y maderas, ideal para citas y noches frescas."
```

Corrección: sustituir el ID/imágenes atribuidos a Lattafa. Paris Corner mantiene una página oficial exacta con fotografía y pirámide completas; Fragrantica identifica la ficha correcta como `Paris-Corner/Khair-Pistachio-92766`.

Fuentes: [Paris Corner oficial](https://www.pariscornerperfumes.com/products/khair-pistachio), [Fragrantica exacta](https://www.fragrantica.com/perfume/Paris-Corner/Khair-Pistachio-92766.html), [Parfumo](https://www.parfumo.com/Perfumes/paris-corner/khair-pistachio-eau-de-parfum).

## Ref. 592 — Paris Corner Marshmallow Blush

```yaml
origen_ref: 592
nombre: Marshmallow Blush
marca: Paris Corner
presentacion: Eau de Parfum 100 ml
imagen_url: https://www.pariscornerperfumes.com/cdn/shop/files/WhatsAppImage2025-01-21at1.14.06PM.jpg?v=1737450880&width=1600
familia_olfativa: Gourmand frutal almizclada
genero: Unisex
ocasiones: [Diario, Citas, Casual, Noche, Primavera, Otoño]
notas:
  salida: [Fresa, Frambuesa, Limón]
  corazon: [Ambroxan, Flor de azahar, Crema batida]
  fondo: [Almizcle, Malvavisco, Vainilla]
presencia:
  duracion: "4/5 - 7.5/10 en Parfumo"
  proyeccion: "4/5 - moderada/alta, derivada de sillage 7.2/10"
  estela: "4/5 - dulce y notoria; no existe medición separada de proyección"
descripcion: "Gourmand unisex suave y goloso, con fresas y frambuesas avivadas por limón. Un corazón de azahar, ambroxan y crema se funde con malvavisco, vainilla y musk para una estela reconfortante y divertida."
```

Corrección: la imagen y ficha actuales son de un registro atribuido a Lattafa ID `101291`. La ficha correcta es Paris Corner ID `102791`; la página oficial confirma la botella, 100 ml y una pirámide más completa que Fragrantica. Se conserva la crema batida y la vainilla porque aparecen expresamente en la fuente oficial.

Fuentes: [Paris Corner oficial](https://www.pariscornerperfumes.com/products/marshmallow-blush), [Fragrantica exacta](https://www.fragrantica.com/perfume/PARIS-CORNER/Marshmallow-Blush-102791.html), [Parfumo](https://www.parfumo.com/Perfumes/paris-corner/marshmallow-blush).

## Campos no verificables o con reserva

```yaml
reservas:
  319:
    concentracion: "La web de marca y Parfumo usan denominaciones distintas; contrastar caja física."
  328:
    notas: "Confianza media: distribuidores del UPC exacto discrepan entre sí y no se halló ficha oficial de la marca."
    duracion: null
    proyeccion: null
    estela: null
  todos:
    estela_independiente: "Parfumo publica sillage, no separa proyección y estela."
```

## Resultado

- Las nueve identidades del PDF quedaron resueltas.
- Se localizaron nueve imágenes congruentes y accesibles.
- Ocho fichas pueden corregirse con confianza alta.
- La ref. 328 puede corregir con seguridad identidad, imagen, marca, género y familia general, pero sus notas tienen confianza media y su rendimiento debe permanecer sin cifra hasta encontrar evidencia específica.
- Ninguna recomendación reutiliza la ficha del perfume de inspiración como si fuera el producto vendido.
