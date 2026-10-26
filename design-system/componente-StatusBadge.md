# StatusBadge

Etiqueta de estado compartida por proyectos IT, coches y modificaciones; refleja el enum de estados de Content Island.

| Valor | Texto | Fondo | Color de texto | Detalle |
|---|---|---|---|---|
| `idea` | Idea | sin fondo | `ink-muted` | borde discontinuo `line-strong` |
| `pendiente` | Pendiente | `brand-soft` | `brand-text` | — |
| `en-curso` | En curso | `accent-soft` | `accent-text` | punto de 6px en `accent` |
| `pausado` | Pausado | `surface-raised` | `ink-muted` | — |
| `finalizado` | Finalizado | `success-soft` | `success` | — |

- Estilo de texto `label` (mono, 12px, mayúsculas), radio `radius-full`, padding 4px × 10px.
- El componente recibe el valor del enum (`en-curso`) y traduce él mismo la etiqueta visible: la web nunca muestra el valor crudo.
- Siempre lleva texto: el color solo refuerza, nunca informa por sí mismo.
