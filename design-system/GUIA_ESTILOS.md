# David Moure · Portfolio

Guía de estilos del portfolio de David Moure Cerqueira, desarrollador Full Stack y exmecánico de automoción. El concepto es **«Plano de taller»**: la estética de un plano técnico, azul y preciso, con un único amarillo señal que marca lo importante, como la cinta y los rotuladores de un taller.

## Concepto

David viene de diagnosticar motores, soldar a medida y diseñar piezas en Fusion 360, y hoy construye aplicaciones web. El sistema traduce esa doble vida a tres ideas visuales:

- **El azul del plano.** El tema oscuro es literalmente un plano: fondo `bg` azul noche, líneas finas en `line` y una cuadrícula técnica en `grid`. El tema claro es el mismo plano impreso en papel.
- **El amarillo señal.** `accent` es el color favorito de David y se usa como en un taller: para marcar, no para decorar. Botón destacado, punto de la línea temporal, subrayado de una palabra clave, anillo de foco en oscuro.
- **Las cotas.** Las anotaciones en mono (`cota`) numeran secciones y acompañan fechas y datos, como las medidas de un plano: `01 · Sobre mí`, `Mar 2026 – Jun 2026`, `1994 · 1.5 turbo`.

## Principios

1. **Preciso, no frío.** Líneas finas y alineación estricta, suavizadas por formas muy redondeadas y un texto cercano en primera persona.
2. **Profesional con guiños.** La base es sobria; la personalidad aparece en detalles reconocibles: las cotas, el marcador amarillo, la cuadrícula de plano y el movimiento.
3. **Una pieza amarilla por pantalla en Home e IT.** En esas pestañas, un solo elemento protagonista en `accent`. En Proyectos personales el amarillo gana presencia (ver «Carácter por pestaña»).
4. **Líneas antes que sombras.** Las tarjetas se separan con un borde `line` de 1px. `shadow-float` solo para lo que flota (menú móvil, visor).
5. **Datos reales, sin relleno.** Nada de estadísticas inventadas ni texto de relleno: si falta un dato, no se pinta el bloque.

## Voz y contenido

- Español, primera persona, frases cortas. «Lo compré en 2019», no «El vehículo fue adquirido».
- Técnico sin presumir: se nombran las piezas y las tecnologías por su nombre (turbo TD04HL-18T, FastAPI), sin adjetivos de marketing.
- Títulos de sección con personalidad y cota delante: `01 · Sobre mí` + «Del taller al código»; `05 · Fuera del código` + «En el garaje».
- Estados siempre con texto, nunca solo con color.

## Color

Dos temas con los mismos nombres de token: **Papel** (claro, `light`) y **Plano** (oscuro, `dark`). Por defecto se muestra el que tenga el sistema del visitante (`prefers-color-scheme`), y se puede cambiar con un botón en la cabecera que recuerda la elección.

| Rol | Tokens | Regla |
|---|---|---|
| Fondo y superficies | `bg`, `surface`, `surface-raised` | `bg` para la página, `surface` para tarjetas, `surface-raised` para etiquetas y bloques secundarios. |
| Texto | `ink`, `ink-muted` | `ink` para títulos y lectura; `ink-muted` para metadatos. Ambos pasan 4.5:1 sobre las tres superficies en los dos temas. |
| Líneas | `line`, `line-strong`, `grid` | `line` separa; `line-strong` delimita controles (3:1); `grid` es solo decoración. |
| Marca azul | `brand`, `brand-hover`, `brand-ink`, `brand-text`, `brand-soft` | Botón principal en `brand` con texto `brand-ink`; enlaces en `brand-text`. |
| Amarillo señal | `accent`, `accent-ink`, `accent-text`, `accent-soft` | `accent` solo como relleno con `accent-ink` encima. Para texto amarillo, `accent-text`. **Nunca `accent` como color de texto en claro** (1.4:1). |
| Éxito | `success`, `success-soft` | Estado Finalizado. |
| Foco | `focus` | Anillo de 2px con 2px de separación. Azul en claro, amarillo en oscuro. |

### Estados

El mismo juego de etiquetas para proyectos IT, coches y modificaciones (componente **StatusBadge**). Se distinguen por luminosidad y texto, no solo por tono.

| Valor | Etiqueta | Fondo | Texto | Detalle |
|---|---|---|---|---|
| `idea` | Idea | transparente | `ink-muted` | borde `line-strong` discontinuo |
| `pendiente` | Pendiente | `brand-soft` | `brand-text` | — |
| `en-curso` | En curso | `accent-soft` | `accent-text` | punto `accent` delante |
| `pausado` | Pausado | `surface-raised` | `ink-muted` | — |
| `finalizado` | Finalizado | `success-soft` | `success` | — |

## Carácter por pestaña

Un solo sistema, con un color protagonista por pestaña. Cambia el protagonismo, no la paleta.

| Pestaña | Protagonista | Cómo se nota |
|---|---|---|
| Home | Azul (`brand`) | Cuadrícula de plano en el hero, foto en duotono azul, cotas en `brand-text` (claro). Una sola pieza amarilla: «Descargar CV». |
| Proyectos IT | Azul + código | Guiño sutil a código: tecnologías, fechas, rol y tamaño de equipo en `mono`; nombres de tecnología como etiquetas `radius-sm`. Sin estética de terminal. Una sola pieza amarilla por pantalla. |
| Proyectos personales | Amarillo sobre base azul | Franja `accent` bajo la cabecera de la página y de cada coche (8px, `radius-full`), cotas en `accent-text` en ambos temas, datos técnicos del coche (año, motor, CV) en `mono`. Los botones principales siguen en `brand`. |

El elemento activo de la navegación toma el color protagonista de su pestaña: `brand-soft` con texto `brand-text` en Home e IT, `accent-soft` con texto `accent-text` en Proyectos personales.

## Tipografía

Tres familias de Google Fonts, cada una con un papel:

- **Space Grotesk** (`display`): títulos. Geométrica y técnica, con carácter.
- **Inter** (`sans`): lectura y controles.
- **JetBrains Mono** (`mono`): cotas, etiquetas de estado, fechas y código.

Escala: `display-xl` 64 / `display-l` 44 / `heading` 32 / `title` 21 / `lead` 20 / `body` 16 / `small` 14 / `cota` 13 / `label` 12. En móvil, `display-xl` baja a 44px y `display-l` a 34px.

Carga en el `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Espaciado y forma

- Escala de 4px: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-6` 24 · `space-8` 32 · `space-12` 48 · `space-20` 80.
- Contenedor de 1200px máximo, con `space-6` de margen lateral.
- Formas muy redondeadas: todo lo que se pulsa o etiqueta es una píldora (`radius-full`: botones, estados, chips); las tarjetas e imágenes usan `radius-lg` (24px), los paneles `radius-md` (16px) y las etiquetas de tecnología `radius-sm` (10px).

## Motivos gráficos

- **Cuadrícula de plano.** Fondo del hero con una cuadrícula de 24px en `grid`. Solo ahí.
- **Cota de sección.** Antes de cada `h2`: número y nombre en `cota`, color `brand-text` en claro y `accent-text` en oscuro, seguidos de una línea `line` que llega al borde (componente **SectionHeader**).
- **Marcas de registro.** Las imágenes de portada pueden llevar cuatro esquinas en L de 12px en `line-strong`, como las marcas de un plano.
- **Foto en duotono azul.** La foto del hero se tiñe con la marca: imagen en escala de grises sobre un fondo `brand` con `mix-blend-mode: multiply` en claro, y sobre `brand-soft` con `mix-blend-mode: luminosity` en oscuro. Recorte con `radius-lg`.
- **Franja amarilla.** Exclusiva de Proyectos personales: barra de 8px en `accent` con `radius-full` bajo el título de la página y de cada coche.
- **Marcador amarillo.** Para destacar una palabra en un titular, subrayado grueso en `accent` detrás del texto (el texto sigue en `ink`).

## Movimiento

Con vida, pero al servicio del contenido. Tres duraciones y una curva:

| Uso | Duración | Detalle |
|---|---|---|
| Microinteracciones | 150ms | Hover de botones y enlaces; pulsar un botón lo escala a 0.97. |
| Transiciones | 250ms | Tarjetas al hover: suben 4px y su borde pasa a `brand` (a `accent` en Proyectos personales). Despliegue de la línea temporal. Cambio de tema. |
| Apariciones | 450ms | Al entrar en pantalla con el scroll, cada bloque aparece desde 16px más abajo con opacidad de 0 a 1; los elementos de una lista se escalonan 60ms. |

- Curva para todo: `cubic-bezier(0.22, 1, 0.36, 1)`, rápida al empezar y suave al llegar.
- Guiños con movimiento: el punto de «Disponible» late suavemente; la franja amarilla de Proyectos personales se dibuja de izquierda a derecha al aparecer; el subrayado marcador crece al pasar el ratón por un enlace destacado.
- Cada elemento aparece una sola vez: al volver a subir no se repite la animación.
- Con `prefers-reduced-motion: reduce`, nada se desplaza: las apariciones son solo un fundido de 150ms y los latidos se detienen.

## Iconografía

[Lucide](https://lucide.dev) (`lucide-react`), trazo 1.75, tamaño 20px (16px dentro de botones y etiquetas), color heredado del texto. Sin emojis ni iconos de relleno. Los logos de tecnologías salen del campo `icon` de Content Island (slugs de Simple Icons) y se pintan en `ink-muted`.

## Accesibilidad

- Contraste comprobado en ambos temas: texto ≥ 4.5:1 sobre `bg`, `surface` y `surface-raised`; bordes de control y foco ≥ 3:1.
- Objetivos táctiles de 44px mínimo.
- Foco visible siempre con el token `focus`; nunca `outline: none` sin sustituto.
- Respeta `prefers-reduced-motion` (ver «Movimiento»).

## Implementación con Tailwind 4 y daisyUI 5

Los dos temas como temas de daisyUI. El fondo de la página va en `bg-base-200`; las tarjetas en `bg-base-100`.

```css
@plugin "daisyui/theme" {
  name: "papel";
  default: true;
  color-scheme: light;
  --color-base-100: #ffffff;
  --color-base-200: #f2f5fa;
  --color-base-300: #e7edf6;
  --color-base-content: #0b1f3a;
  --color-primary: #1d4ed8;
  --color-primary-content: #ffffff;
  --color-secondary: #dce6fb;
  --color-secondary-content: #1a43bf;
  --color-accent: #ffc72c;
  --color-accent-content: #0b1f3a;
  --color-neutral: #0b1f3a;
  --color-neutral-content: #f2f5fa;
  --color-info: #1d4ed8;
  --color-info-content: #ffffff;
  --color-success: #0b6b4a;
  --color-success-content: #ffffff;
  --color-warning: #ffc72c;
  --color-warning-content: #0b1f3a;
  --color-error: #b42318;
  --color-error-content: #ffffff;
  --radius-selector: 999px;
  --radius-field: 999px;
  --radius-box: 24px;
  --border: 1px;
  --depth: 0;
  --noise: 0;
}

@plugin "daisyui/theme" {
  name: "plano";
  prefersdark: true;
  color-scheme: dark;
  --color-base-100: #0f1f42;
  --color-base-200: #0a1630;
  --color-base-300: #15295a;
  --color-base-content: #eaf0ff;
  --color-primary: #7ea6ff;
  --color-primary-content: #0a1630;
  --color-secondary: #1a3270;
  --color-secondary-content: #9dbbff;
  --color-accent: #ffd23f;
  --color-accent-content: #0a1630;
  --color-neutral: #eaf0ff;
  --color-neutral-content: #0a1630;
  --color-info: #7ea6ff;
  --color-info-content: #0a1630;
  --color-success: #5fd3a6;
  --color-success-content: #0a1630;
  --color-warning: #ffd23f;
  --color-warning-content: #0a1630;
  --color-error: #ff8a7a;
  --color-error-content: #0a1630;
  --radius-selector: 999px;
  --radius-field: 999px;
  --radius-box: 24px;
  --border: 1px;
  --depth: 0;
  --noise: 0;
}
```

Los tokens que daisyUI no cubre (`line`, `line-strong`, `grid`, `ink-muted`, `brand-text`, `accent-text`, `accent-soft`, `success-soft`, `focus`) se declaran como variables CSS en cada tema y se exponen a Tailwind con `@theme inline`. Las familias tipográficas, como `--font-display`, `--font-sans` y `--font-mono`.

El cambio de tema se hace poniendo `data-theme="papel"` o `data-theme="plano"` en `<html>`, guardando la elección del usuario y usando `prefers-color-scheme` cuando no hay elección.
