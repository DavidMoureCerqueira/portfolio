# SectionHeader

Cabecera de sección con cota técnica: número y nombre en mono, una línea fina hasta el borde y el título debajo; es la firma visual del sistema.

- Cota: estilo `cota`, formato `NN · Nombre` («01 · Sobre mí»). Color `brand-text` en el tema claro y `accent-text` en el oscuro; en Proyectos personales, `accent-text` en ambos temas.
- En Proyectos personales, la cabecera de página lleva además la franja amarilla (8px, `accent`, `radius-full`) bajo el título.
- Al aparecer con el scroll, la línea de la cota crece de izquierda a derecha (450ms).
- Línea: 1px en `line`, ocupa el espacio restante a la derecha de la cota, alineada a su línea media.
- Título: estilo `heading` (h2) en `ink`, `space-3` por debajo de la cota.
- Opcional: una entradilla en `ink-muted` y un enlace de acción a la derecha («Ver todos los proyectos IT →»).
- Opcional, una vez por página: una palabra del título con el marcador amarillo (subrayado de 10px en `accent` detrás del texto).
- La numeración es correlativa dentro de cada página.
