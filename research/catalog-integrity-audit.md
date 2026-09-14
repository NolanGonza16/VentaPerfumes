# Auditoría de integridad del catálogo

Fecha: 2026-09-13  
Alcance: los 731 registros de `catalog/august-products.json`  
Modo: auditoría local no destructiva; este informe no modifica el catálogo.

## Resumen machine-readable

```yaml
catalogo:
  total: 731
  por_tipo:
    Perfume: 641
    Estuche: 32
    Tester: 22
    Corporal: 19
    Decant: 9
    Miniatura: 8
integridad_estructural:
  origen_ref_unicos: true
  sku_unicos: true
  slug_unicos: true
  presentacion_proveedor_unica: true
  inconsistencias_ml_detectadas: 0
  contradicciones_genero_nombre_detectadas: 0
  metricas_fuera_de_rango: 0
contenido:
  fichas_verificadas_marcadas: 710
  fichas_requiere_revision: 10
  fichas_parciales: 8
  fichas_pendientes: 3
  registros_con_algun_campo_nucleo_vacio: 14
  registros_con_perfil_olfativo_practicamente_vacio: 13
  rendimiento_uniforme_3_3_3: 208
imagenes:
  con_imagen: 607
  sin_imagen: 124
  con_imagen_y_revision_exacta_registrada: 312
  con_imagen_sin_revision_en_image_sources_reviewed: 295
  urls_de_imagen_compartidas: 3
  compartidas_solo_por_misma_fragancia_en_otro_tamano: 3
fuentes:
  con_alguna_fuente_de_producto_aparente: 698
  solo_con_fuentes_genericas_o_de_metodologia: 21
  con_referencias_genericas_de_rendimiento: 657
riesgo:
  P0_probable_producto_equivocado: [107, 277, 278, 319, 328, 394, 505, 591, 592]
  P1_detalle_o_imagen_a_validar: [25, 71, 100, 164, 506, 609]
  P1_identidad_insuficiente: [6, 375, 564, 687, 691, 692, 693]
```

## Conclusión

El catálogo está bien formado como conjunto de datos: no hay claves técnicas duplicadas, no hay medidas de presencia fuera de rango y los mililitros estructurados concuerdan con la presentación del proveedor cuando esta expresa un tamaño. Sin embargo, `ficha_estado: verificada` no equivale todavía a **identidad y evidencia verificadas**. Hay nueve referencias con señales fuertes de que la imagen o la ficha pertenece a otro perfume, 295 imágenes visibles sin una entrada correspondiente en el registro de revisión exacta y 208 perfiles con el patrón editorial uniforme `3/3/3`.

## P0 — probable producto equivocado

Estas referencias deben bloquearse de una publicación “verificada” hasta revisar producto, edición, género, imagen y pirámide. La señal no es una similitud débil: la imagen o la fuente principal identifica otra marca, otro producto o la variante masculina/femenina contraria.

| Ref | Catálogo | Evidencia conflictiva | Acción requerida |
|---:|---|---|---|
| 107 | Armaf — The Pride Admiral | La imagen `fimgs` usa el ID 65447 de “The Pride / Admiral”; el mismo registro también contiene una ficha distinta de Armaf con ID 88215. | Resolver cuál identidad corresponde al texto del proveedor y sustituir imagen/datos como una unidad. |
| 277 | Armaf — Estuche Odyssey Limoni | Imagen y ficha enlazan a `Lattafa-Perfumes/Odyssey-Limoni-75904`. | Buscar el estuche Armaf exacto; no reutilizar la ficha Lattafa. |
| 278 | Armaf — Estuche Odyssey Mega | Imagen y ficha enlazan a `Lattafa-Perfumes/Odyssey-Mega-75806`. | Buscar el estuche Armaf exacto; no reutilizar la ficha Lattafa. |
| 319 | Giorgio Valenti — Rose Noire | La imagen es el ID 1076 de Byredo Rose Noire, aunque el registro también posee la ficha correcta Giorgio Valenti ID 9345. | Reemplazar imagen y comprobar que notas/perfil procedan de la ficha Giorgio Valenti. |
| 328 | Grandeur — Aura Pour Femme | Imagen y ficha corresponden a Mugler Aura ID 44942; existe además una página comercial de Grandeur en las fuentes. | Sustituir imagen y reconstruir detalles desde Grandeur. |
| 394 | Jean Paul Gaultier — Paradise Garden Mujer | Imagen/ficha ID 81633 corresponde a Paradise Garden masculino, mientras el proveedor especifica “MUJER”. | Confirmar si el producto real es La Belle Paradise Garden y corregir género, nombre, imagen y notas. |
| 505 | Maison Alhambra — Chants Tenderina | Imagen y única ficha corresponden a Chanel Chance Eau Tendre ID 52170. Ser una inspiración no convierte ambos productos en la misma ficha. | Investigar Chants Tenderina exacto y reemplazar todos los datos heredados de Chanel. |
| 591 | Paris Corner — Khair Pistachio | La imagen `fimgs` y ficha usada están bajo `Lattafa-Perfumes/Khai-Pistachio-90593`; hay una referencia comercial que sí identifica Paris Corner. | Validar la página de producto exacta y regenerar imagen/detalle desde esa identidad. |
| 592 | Paris Corner — Marshmallow Blush | Imagen/ficha ID 101291 están bajo Lattafa, aunque otra fuente del registro identifica Paris Corner. | Separar los productos homónimos y conservar solo evidencia de Paris Corner. |

## P1 — inconsistencias o evidencia insuficiente

| Ref | Riesgo | Acción |
|---:|---|---|
| 25 | Blue Seduccion Summer Essence no tiene género, familia, notas, ocasiones, presencia ni descripción. | Investigar edición exacta, sin confundirla con Blue Seduction estándar. |
| 71 | Armaf Island Breeze usa un archivo llamado `islandbliss...webp`. | Inspección visual humana contra botella/etiqueta oficial; el nombre del CDN sugiere otro producto. |
| 100 | Armaf Odyssey Wild One usa `armafbeach_12.png`. | Inspección visual humana contra empaque oficial. |
| 164 | Good Girl Blush Polka Paradise usa la imagen/ficha de Good Girl Blush base, pero la presentación es una edición de empaque Polka Paradise. | Confirmar si cambia solo el empaque; la tarjeta debe mostrar la edición vendida. |
| 506 | Maison Alhambra Como Moiselle tiene imagen comercial plausible, pero los detalles se apoyan únicamente en Chanel Coco Mademoiselle. | Sustituir la ficha aromática por evidencia del producto Maison Alhambra. |
| 609 | Perry Ellis Love tiene familia, género, notas y presencia, pero `acordes` está vacío. | Derivar acordes solo desde una fuente exacta ya comprobada. |

### Identidad insuficiente para búsqueda exacta

Las referencias `6, 375, 564, 687, 691, 692, 693` usan nombres demasiado genéricos (`Hombre`, `Mujer`, `Clásico`, `(Dorado)`, `(Plateado)`, `Kids Bear`). Antes de buscar imágenes o notas hace falta identificar el nombre comercial exacto mediante la fila original, SKU, fotografía del proveedor o empaque.

## Campos núcleo incompletos

Los 14 registros con al menos un vacío en familia, género, ocasiones, acordes, notas, presencia, descripción o fuentes son:

```yaml
incompletos:
  - {ref: 6, tipo: Perfume, marca: Adidas, nombre: Hombre, faltan: [familia, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
  - {ref: 25, tipo: Perfume, marca: Antonio Banderas, nombre: Blue Seduccion Summer Essence, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion]}
  - {ref: 609, tipo: Perfume, marca: Perry Ellis, nombre: Love, faltan: [acordes]}
  - {ref: 653, tipo: Corporal, marca: Por confirmar, nombre: Corporal Nino Variado, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
  - {ref: 654, tipo: Corporal, marca: Paris Hilton, nombre: Corporal Paris Hilton, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
  - {ref: 655, tipo: Corporal, marca: Perry Ellis, nombre: Corporal Perry Ellis, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
  - {ref: 656, tipo: Corporal, marca: Victoria's Secret, nombre: Corporal Victoria's Secret, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
  - {ref: 657, tipo: Corporal, marca: Victoria's Secret, nombre: Corporal Victoria's Secret, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
  - {ref: 658, tipo: Corporal, marca: Armaf, nombre: Corporal Armaf, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
  - {ref: 660, tipo: Corporal, marca: Lattafa, nombre: Corporal Lattafa, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
  - {ref: 661, tipo: Corporal, marca: Maison Alhambra, nombre: Corporal Maison Alhambra, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
  - {ref: 691, tipo: Perfume, marca: Tous, nombre: Dorado, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
  - {ref: 692, tipo: Perfume, marca: Tous, nombre: Plateado, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
  - {ref: 693, tipo: Perfume, marca: Tous, nombre: Kids Bear, faltan: [familia, genero, ocasiones, acordes, salida, corazon, fondo, duracion, proyeccion, estela, descripcion, fuentes]}
```

## Cobertura y trazabilidad de imágenes

El manifiesto revisado contiene 312 imágenes visibles con estado exacto (`277 matched` y `35 matched_manual_exact`). Las otras 295 imágenes visibles están en el catálogo pero no tienen entrada en `research/image-sources-reviewed.json`; por lo tanto, no deben asumirse congruentes únicamente porque carguen correctamente.

Los tres usos repetidos de una URL de imagen son coherentes con el mismo perfume en tamaños distintos y no son, por sí solos, errores: refs `15/16`, `85/86` y `377/378`.

### Referencias sin imagen (124)

```yaml
sin_imagen:
  Perfume: [4, 6, 25, 223, 235, 236, 252, 258, 259, 260, 261, 264, 265, 266, 267, 268, 270, 296, 302, 307, 309, 310, 329, 330, 331, 332, 333, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 354, 355, 365, 375, 415, 416, 453, 470, 471, 479, 504, 510, 512, 513, 517, 519, 532, 536, 537, 538, 539, 564, 568, 569, 570, 599, 618, 619, 620, 634, 688, 689, 690, 691, 692, 693, 694, 695, 697, 707, 709, 726, 727, 728, 729, 730, 731, 732, 733, 736, 737, 738, 739, 740, 742]
  Corporal: [218, 306, 382, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 660, 661]
  Estuche: [276, 638, 639, 640, 641, 642]
  Miniatura: [540, 541, 544]
  Tester: [673, 674, 681]
  Decant: [206]
```

Para el objetivo visual inmediato conviene priorizar los 93 perfumes completos, luego testers/decants/minis/estuches y al final los 18 corporales genéricos, pues estos últimos no identifican una variante concreta.

## Calidad de fuentes y presencia

- `698` registros tienen al menos una URL que parece apuntar a un producto concreto, pero eso no confirma que la identidad sea correcta; los P0 demuestran por qué la coincidencia debe verificarse.
- `21` registros solo conservan páginas de inicio, búsqueda, categoría o metodología general. Referencias: `13, 60, 76, 91, 167, 192, 193, 470, 476, 478, 479, 480, 569, 599, 619, 638, 639, 646, 649, 650, 651`.
- `657` registros citan las mismas tres páginas generales sobre concentración, duración, proyección y estela. Esas páginas explican una metodología, pero no prueban el rendimiento individual de cada perfume.
- `208` registros muestran exactamente `duración 3 / proyección 3 / estela 3`. Este patrón es válido como estimación editorial provisional, no como valoración investigada del producto.
- `valoracion` falta en `637` registros. No es un campo núcleo solicitado por esta auditoría, pero la interfaz no debería presentarlo como opinión real si no hay evidencia.

## Normalización pendiente

Las familias olfativas poseen más de cien variantes textuales por capitalización, género gramatical y sinónimos (`Floral frutal`, `floral frutal`, `Floral afrutada`; `Ámbar`, `Oriental`, etc.). Esto no invalida cada ficha, pero fragmenta los filtros. Se recomienda conservar el texto descriptivo original y añadir una taxonomía normalizada separada para filtros, sin sobrescribir evidencia.

## Método y límites

1. Se recorrieron programáticamente los 731 registros y todos sus campos.
2. Se compararon claves, presentaciones, tamaños, rangos, nombres, género, fuentes, imágenes y el manifiesto de revisión.
3. Se usó el mapa Graphify para seguir los flujos `Coincidencia de fuentes`, `Evidencia investigada`, `Auditoría de imágenes`, `Rendimiento editorial` y `Catálogo y filtros`.
4. La auditoría relacional detecta conflictos internos y URLs semánticamente incongruentes. No sustituye la inspección visual de cada botella ni la verificación web final de 731 productos.
5. Los nombres y marcas del proveedor se trataron como identidad autoritativa, tal como exige el proyecto. Las páginas de perfumes “inspirados en” otro producto no se aceptaron como la misma identidad.

## Orden recomendado de corrección

1. Corregir los nueve P0 como unidades atómicas: identidad, imagen, familia, notas, género, ocasiones, descripción y presencia.
2. Resolver las siete identidades ambiguas antes de hacer búsquedas masivas.
3. Verificar las 295 imágenes existentes sin manifiesto; empezar por refs 71 y 100 y por cualquier imagen de comercio con filename que no mencione el producto.
4. Adquirir las 93 imágenes faltantes de tipo Perfume.
5. Sustituir estimaciones `3/3/3` solo cuando exista evidencia específica del producto; mientras tanto, etiquetarlas internamente como editoriales.
6. Normalizar taxonomía de familias para los filtros sin alterar el texto de fuente.
