# Diseño: sistema híbrido de imágenes premium

## Objetivo

Dar a cada producto del catálogo una representación visual fiel al artículo real y coherente con la estética de lujo del sitio. El frasco, la tapa, la etiqueta, los colores, el empaque y las proporciones no deben ser reinterpretados. El fondo puede sustituirse o construirse para lograr una presentación editorial premium.

## Alcance

- Auditar las 731 referencias del catálogo.
- Conservar imágenes editoriales existentes cuando sean exactas, nítidas y visualmente compatibles.
- Sustituir enlaces rotos, imágenes incorrectas, duplicados indebidos y placeholders.
- Obtener una fotografía exacta del producto para cada referencia identificable.
- Crear fondos personalizados para fotografías simples o con fondos deficientes.
- Tratar los 13 registros ambiguos con una imagen honesta de categoría hasta conocer la variante exacta.
- Guardar los recursos finales bajo control propio y actualizar `imagen_url` sin modificar identidad, precio ni ficha olfativa.

## Estrategia visual

Cada imagen final tendrá formato vertical 4:5 y una zona segura central para que funcione tanto en cards como en el detalle. La botella ocupará aproximadamente 55–72 % de la altura. No habrá texto decorativo generado, marcas de agua ni elementos que compitan con la etiqueta.

Los escenarios se derivarán del perfil del producto:

- Frescos, cítricos y marinos: vidrio, agua, bruma, piedra clara y luz fría.
- Dulces, gourmand y avainillados: ámbar, caramelo, seda, luz cálida y reflejos suaves.
- Amaderados, cuero y tabaco: piedra oscura, madera, humo sutil y luz lateral.
- Florales y afrutados: pétalos o fruta abstracta, sin convertir la imagen en una composición recargada.
- Orientales, oud y especiados: metal champagne, piedra negra, resinas y contraluz dorado.

Las familias visuales compartirán lenguaje, pero cada producto tendrá combinación de color, iluminación y utilería derivada de sus propios datos.

## Arquitectura de recursos

1. El catálogo conserva la URL de la imagen final en `imagen_url`.
2. Un manifiesto interno registra por referencia: fuente del producto, estado de fidelidad, tratamiento aplicado, archivo final y fecha de revisión.
3. Los archivos finales se almacenan en Supabase Storage con nombres estables basados en `origen_ref` y `slug`.
4. Se generan tamaños optimizados para catálogo y detalle, priorizando WebP o AVIF cuando el flujo disponible preserve la calidad.
5. La aplicación mantiene un fallback local únicamente para fallos de red o referencias ambiguas.

## Flujo de producción

1. Auditar cobertura, resolución, formato, disponibilidad y coincidencia visual de las imágenes actuales.
2. Resolver primero imágenes oficiales o de distribuidores reconocidos.
3. Validar que la presentación coincida con el nombre, concentración y tamaño del PDF.
4. Para packshots limpios, conservar el producto y reemplazar solo el fondo.
5. Para fotografías con entornos utilizables, aplicar únicamente ajustes necesarios de encuadre y coherencia.
6. Para fondos difíciles, hacer edición individual con invariantes explícitas de producto.
7. Inspeccionar visualmente la salida antes de publicarla.
8. Subir a Storage, actualizar Supabase y desplegar desde GitHub/Vercel.

## Protección de fidelidad

- No generar una botella desde cero cuando exista fotografía del producto real.
- No alterar logotipo, tipografía, texto, color del líquido, silueta, atomizador o tapa.
- No usar la imagen de otro tamaño o flanker si cambia el diseño comercial de forma relevante.
- No presentar como exacta una imagen cuya variante no pueda confirmarse.
- Si una edición no puede verificarse, mantenerla en revisión y usar un arte de categoría claramente neutral.

## Aplicación y rendimiento

- Las cards cargarán imágenes diferidas salvo las primeras visibles.
- Se reservará la relación de aspecto para evitar saltos de diseño.
- La vista de detalle reutilizará el mismo arte en mayor resolución.
- Los fondos de la interfaz complementarán la imagen sin duplicar blancos planos.
- Los errores de carga mostrarán un fallback premium, nunca un icono roto.

## Verificación

- Auditoría automatizada: cobertura total, URLs HTTPS, referencias únicas y ausencia de placeholders entre productos identificables.
- Verificación visual por lotes: botella correcta, etiqueta legible, fondo premium, encuadre 4:5 y ausencia de artefactos.
- Pruebas de cards y detalle en anchos de celular, tablet y escritorio.
- Comprobación de Storage, Supabase, compilación, GitHub y despliegue Vercel.

## Criterios de aceptación

- Cada producto identificable muestra la botella o presentación exacta.
- Ninguna imagen final se percibe como un packshot blanco sin dirección artística.
- Los fondos se sienten personalizados y coherentes con el perfume.
- La etiqueta y el envase permanecen fieles y reconocibles.
- La carga funciona correctamente en móvil y escritorio.
- Los 13 registros ambiguos no muestran una variante inventada.
