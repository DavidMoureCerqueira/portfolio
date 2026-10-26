# Prompt para Claude Code: implementar la base del sistema de diseño

Pégalo en Claude Code en modo plan (Shift + Tab).

```text
Vamos a implementar la base del sistema de diseño del portfolio. La guía es design-system/GUIA_ESTILOS.md y los valores exactos están en design-system/tokens.json: léelos enteros antes de nada. El proyecto es TanStack Start con React, Tailwind 4 y daisyUI 5.

## Alcance (solo la base, sin maquetar páginas)
1. Fuentes: añade los <link> de Google Fonts (Space Grotesk, Inter, JetBrains Mono) en el head() de src/routes/__root.tsx.
2. Temas: en el CSS global, los dos temas de daisyUI "papel" (default) y "plano" (prefersdark) tal como están en la guía.
3. Tokens extra: declara por tema las variables que daisyUI no cubre (line, line-strong, grid, ink-muted, brand-text, accent-text, accent-soft, success-soft, focus) con los valores de tokens.json, incluido el caso sin data-theme con prefers-color-scheme: dark, y exponlas a Tailwind con @theme inline.
4. Tipografía: --font-display, --font-sans y --font-mono en @theme, y la escala de estilos de la guía como utilidades reutilizables.
5. Radios y movimiento: los radios de tokens.json y las duraciones y la curva de la sección "Movimiento" como variables, más el bloque de prefers-reduced-motion.
6. Cambio de tema: un componente ThemeToggle (botón con icono de lucide-react y aria-label) que alterna data-theme="papel"/"plano" en <html> y guarda la elección en localStorage. Sin elección guardada, no se pone data-theme y manda el sistema. Evita el parpadeo aplicando la elección guardada antes del primer pintado con un script en el head del root.
7. Componentes base: Button (principal, destacado, secundario, enlace), StatusBadge (los cinco estados del enum) y SectionHeader (cota + línea + título), siguiendo las fichas design-system/componente-*.md.

## Reglas
- Nada de colores hex sueltos en componentes: solo clases de daisyUI y de los tokens.
- Comprueba que no rompes nada existente y dime qué archivos vas a tocar antes de hacerlo.
- Al terminar, crea una ruta temporal /design que muestre los componentes en los dos temas para revisarlos.
```
