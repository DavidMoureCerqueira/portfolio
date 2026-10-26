## Sistema de diseño

- La guía de estilos del front es `design-system/GUIA_ESTILOS.md` (concepto «Plano de taller») y los valores exactos están en `design-system/tokens.json`. Léelos antes de crear o cambiar cualquier estilo o componente visual.
- Las fichas `design-system/componente-*.md` describen Button, StatusBadge y SectionHeader: respeta sus variantes y reglas.
- Usa siempre los temas de daisyUI `papel` y `plano` y los tokens definidos (clases como `bg-base-200`, `text-ink-muted`, `border-line`). Nunca colores hex sueltos en los componentes.
- Reglas que no se negocian: una sola pieza amarilla (`accent`) por pantalla en Home y Proyectos IT; `accent` nunca como color de texto en el tema claro; foco visible con el token `focus`; respetar `prefers-reduced-motion`.
- Carácter por pestaña: Home azul, Proyectos IT azul con guiño de código en mono, Proyectos personales con más amarillo sobre base azul.
