# Modelo de contenido del portfolio (Content Island)

Este documento es el "contrato" entre los README y Content Island. Si no coinciden, manda Content Island: este documento se actualiza para reflejarlo. Cada archivo `.md` de esta carpeta es **una entrada** de un modelo. El bloque YAML de arriba (frontmatter) son los campos estructurados; el texto de debajo es el campo `content` (markdown).

## Convenciones

- **Nombres de campo en inglés y camelCase** (`startDate`, `repoUrl`): así el modelo TypeScript que genera Content Island queda limpio. El contenido va en español.
- **`_model`** indica a qué modelo pertenece el archivo. **`id`** es un slug único (`seat-ibiza-6k`, `react`) y sirve para relacionar entradas entre sí.
- **Relaciones**: se escriben con el `id` de la otra entrada (`technologies: [react, typescript]`). Al subirlas se convierten en referencias reales.
- **Imágenes**: ruta relativa dentro de `assets/` (`assets/cars/ibiza/cover.webp`). Se suben a la galería de medios y se enlazan al campo.
- **Fechas**: formato `YYYY-MM`, o `YYYY-MM-DD` si se conoce el día. `endDate: null` significa "actualidad".
- **Archivos que empiezan por `_`** (`_template.md`) son plantillas y no se suben.

## Estados (compartido por todos los proyectos y modificaciones)

| Valor        | Etiqueta en web | Uso                                        |
|--------------|-----------------|--------------------------------------------|
| `idea`       | Idea            | Pensado, sin fecha ni recursos             |
| `pendiente`  | Pendiente       | Decidido, aún no empezado                  |
| `en-curso`   | En curso        | Trabajando en ello                         |
| `pausado`    | Pausado         | Empezado y parado (falta pieza, tiempo...) |
| `finalizado` | Finalizado      | Terminado                                  |

En Content Island es el enum `Status`.

## Modelos

### Profile (entrada única) — pestaña Home
| Campo          | Tipo sugerido            | Obligatorio | Notas |
|----------------|--------------------------|-------------|-------|
| name           | Texto corto              | Sí | |
| role           | Texto corto              | Sí | "Desarrollador web Frontend · React" |
| headline       | Texto corto              | Sí | Una frase gancho bajo el nombre |
| avatar         | Media (webp, jpg, jpeg, png) | Sí | Foto |
| location       | Texto corto              | No | |
| availability   | Texto corto              | No | "Disponible para incorporación" |
| skills         | Lista de referencias → Technology | No | Stack principal |
| softSkills     | Lista de texto corto     | No | Aptitudes |
| languages      | Lista de texto corto     | No | Idioma y nivel |
| interests      | Lista de texto corto     | No | Pequeño toque personal |
| email, githubUrl, linkedinUrl | Texto corto | No | Contacto |
| cv             | Media (PDF)              | No | Botón de descarga |
| content        | Markdown                 | Sí | Minibio completa |

### TimelineEntry — línea temporal de Home
| Campo        | Tipo sugerido | Obligatorio | Notas |
|--------------|---------------|-------------|-------|
| title        | Texto corto | Sí | Puesto o título |
| organization | Texto corto | Sí | Empresa o centro |
| type         | Selección (TimelineType) | Sí | `practicas` · `laboral` · `formacion` |
| isTech       | Booleano    | Sí | Permite filtrar o estilizar distinto lo no tech |
| startDate / endDate | Fecha | Sí / No | El front ordena por startDate |
| location     | Texto corto | No | |
| summary      | Texto corto | Sí | 1 línea para la vista compacta |
| technologies | Lista de referencias → Technology | No | Solo en prácticas/formación tech |
| content      | Markdown    | No | Detalle desplegable: tareas y logros |

### Technology — catálogo reutilizable
| Campo    | Tipo sugerido | Obligatorio | Notas |
|----------|---------------|-------------|-------|
| name     | Texto corto | Sí | "React" |
| category | Selección (TechCategory) | Sí | `frontend` · `backend` · `database` · `testing` · `devops` · `tooling` · `design` |
| icon     | Texto corto | No | Slug de [simple-icons](https://simpleicons.org) (`react`), evita subir imágenes. Vacío si no existe: el front muestra solo el nombre |
| website  | Texto corto | No | |

Se reutiliza en Profile, TimelineEntry y ItProject: si cambias un icono, cambia en toda la web.

### ItProject — pestaña Proyectos IT
| Campo        | Tipo sugerido | Obligatorio | Notas |
|--------------|---------------|-------------|-------|
| title, slug  | Texto corto | Sí | `slug` para la ruta `/proyectos/:slug` |
| status       | Selección (Estados) | Sí | |
| featured     | Booleano | Sí | Aparece en "Destacados" de Home |
| order        | Número | No | |
| kind         | Selección (ItProjectKind) | Sí | `practicas` · `academico` · `personal` · `freelance` |
| summary      | Texto corto | Sí | Qué hace, en 1–2 líneas (tarjeta) |
| role         | Texto corto | No | "Frontend", "Full stack"... |
| teamSize     | Número | No | 1 = individual |
| startDate / endDate | Fecha | No | |
| technologies | Lista de referencias → Technology | Sí | |
| repoUrl, demoUrl | Texto corto | No | |
| cover        | Media | No | Imagen de la tarjeta |
| coverAlt     | Texto corto | No | Texto alternativo de la portada |
| gallery      | Lista de media | No | Capturas |
| galleryAlt   | Lista de texto corto | No | Un alt por imagen de `gallery`, en el mismo orden (en los `.md`, el `alt` de cada imagen) |
| content      | Markdown | Sí | Qué / por qué / cómo / decisiones / retos / aprendizajes |

### CarProject — pestaña Proyectos Personales
| Campo        | Tipo sugerido | Obligatorio | Notas |
|--------------|---------------|-------------|-------|
| title, slug  | Texto corto | Sí | Puede ser el apodo del coche |
| status, featured, order | Igual que ItProject | | |
| brand, model, version | Texto corto | Sí / Sí / No | |
| year         | Número | Sí | Año de fabricación |
| engine       | Texto corto | No | "1.9 TDI 90 cv" |
| acquiredDate | Fecha | No | |
| summary      | Texto corto | Sí | Tarjeta |
| goals        | Markdown (checklist) | No | `- [x]` cumplida, `- [ ]` pendiente |
| modifications | Lista de referencias → Modification | No | Ordenadas |
| cover        | Media | Sí | |
| coverAlt     | Texto corto | No | Texto alternativo de la portada |
| gallery      | Lista de media | No | |
| galleryAlt   | Lista de texto corto | No | Un alt por imagen de `gallery`, en el mismo orden |
| content      | Markdown | Sí | Historia, compra, estado inicial |

### Modification — cada trabajo hecho a un coche
| Campo       | Tipo sugerido | Obligatorio | Notas |
|-------------|---------------|-------------|-------|
| title       | Texto corto | Sí | |
| car         | Referencia → CarProject | Sí | |
| status      | Selección (Estados) | Sí | |
| category    | Selección (ModCategory) | Sí | `motor` · `transmision` · `suspension` · `frenos` · `chasis` · `carroceria` · `interior` · `electricidad` · `estetica` |
| techniques  | Selección múltiple (ModTechnique) | No | `soldadura` · `impresion-3d` · `restauracion` · `pintura` · `mecanizado` · `electronica` · `fibra` · `tapiceria` · `mecanica` |
| difficulty  | Número (1–5) | No | |
| startDate / endDate | Fecha | No | |
| summary     | Texto corto | Sí | 1–2 líneas: es la parte principal de la ficha |
| image       | Media | No | Una sola foto de la modificación |
| imageAlt    | Texto corto | No | Texto alternativo de `image` |
| content     | Markdown | No | Solo en las modificaciones con algo que contar: motivo, proceso, resultado |

## Estructura de carpetas

```
portfolio-content/
├── CONTENT_MODEL.md        ← este documento
├── _UPLOAD_PROMPT.md       ← prompt para cargarlo con Claude Code
├── profile/profile.md      ← única entrada de Profile
├── timeline/               ← una entrada por etapa
├── technologies/           ← una por tecnología
├── it-projects/            ← uno por proyecto IT
├── car-projects/           ← uno por coche
├── modifications/          ← una por modificación (prefijo con el coche)
└── assets/                 ← imágenes (.webp) y el CV (.pdf)
    ├── _IMAGES.md          ← lista de imágenes pendientes
    ├── profile/
    ├── it-projects/<proyecto>/
    └── cars/<coche>/  (y mods/ para las modificaciones)
```

## Orden de carga en Content Island

Primero lo que no depende de nada y después lo que referencia: Technology → Profile → TimelineEntry → ItProject → Modification → CarProject (y se enlazan las modificaciones al coche).
