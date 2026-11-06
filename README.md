# Portfolio · David Moure Cerqueira

Portfolio personal de **David Moure Cerqueira**, desarrollador Full Stack junior y exmecánico de automoción. Reúne quién soy, mi trayectoria, mis proyectos de desarrollo y mis coches proyecto, y es mi **trabajo de fin del programa de especialización en Front End moderno y herramientas de IA de [Lemoncode](https://lemoncode.net)**, patrocinado por Luckia.

🔗 **Web:** [davidmourecerqueira.github.io/portfolio](https://davidmourecerqueira.github.io/portfolio/)

Todo el contenido vive en un CMS headless ([Content Island](https://contentisland.net)): añadir un proyecto o cambiar el estado de una modificación de un coche no requiere tocar código. La web se genera como sitio estático y se vuelve a publicar sola cada vez que se publica contenido.

---

## Índice

- [Secciones](#secciones)
- [Stack](#stack)
- [Arquitectura](#arquitectura)
- [Contenido](#contenido)
- [Generación estática y despliegue](#generación-estática-y-despliegue)
- [Puesta en marcha](#puesta-en-marcha)
- [Scripts](#scripts)
- [Tests](#tests)
- [Sistema de diseño](#sistema-de-diseño)
- [IA en el flujo de trabajo](#ia-en-el-flujo-de-trabajo)
- [Próximos pasos](#próximos-pasos)

---

## Secciones

| Ruta | Contenido |
| --- | --- |
| `/` | **Inicio:** perfil, stack agrupado por categorías, idiomas, aptitudes, trayectoria y proyecto destacado |
| `/it-projects` | **Proyectos IT:** listado de proyectos de desarrollo |
| `/it-projects/:slug` | Detalle de cada proyecto: ficha, qué es, por qué, cómo, decisiones técnicas, retos y capturas |
| `/personal-projects` | **Proyectos personales:** mis coches proyecto con el progreso de sus modificaciones |
| `/personal-projects/:slug` | Detalle de cada coche: ficha, metas, historia y modificaciones filtrables por estado |

Tema claro y oscuro (por defecto, el del sistema) y diseño adaptado a móvil.

## Stack

| Ámbito | Tecnologías |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router), TypeScript |
| Estilos | Tailwind CSS 4, daisyUI 5 (temas propios), `@tailwindcss/typography` |
| Contenido | Content Island (`@content-island/api-client`), `react-markdown` + `remark-gfm` |
| Tests | Vitest, Testing Library, jsdom |
| Calidad | ESLint, Prettier |
| Despliegue | GitHub Actions, GitHub Pages |

## Arquitectura

El código se organiza en **pods y escenas**:

- **Escena:** cada página es una escena que compone componentes de varios pods.
- **Pod:** una parte de la web con sus propias capas: server functions para pedir los datos, mappers, modelos de vista y componentes.

Los datos siempre siguen el mismo camino:

```text
Content Island
   ↓  server function (se ejecuta en el build)
Respuesta de la API
   ↓  mapper
Modelo de vista
   ↓  loader de la ruta
Escena → componentes del pod
```

Separar las capas permite que los componentes solo pinten lo que reciben y que la lógica (formato de fechas, ordenaciones, mappers) se pueda testear sin montar ninguna página.

```text
src/
├── routes/          # Rutas de TanStack Router (loaders y metadatos)
├── scenes/          # Una escena por página: compone los pods
├── pods/
│   ├── profile/             # Perfil, stack y trayectoria
│   ├── it-projects/         # Listado, destacado y detalle de proyectos IT
│   └── personal-projects/   # Coches, modificaciones y su progreso
├── common-app/      # Piezas compartidas: componentes, mappers, modelos, fechas, cliente de Content Island
├── core/            # Tema y componentes base
└── layouts/         # Documento raíz y layout principal

config/test/         # Configuración de Vitest
design-system/       # Guía de estilos y tokens
portfolio-content/   # Origen del contenido cargado en Content Island (markdown)
```

## Contenido

El contenido está modelado en Content Island en seis modelos relacionados entre sí:

| Modelo | Qué guarda |
| --- | --- |
| `Profile` | Perfil, bio, idiomas, aptitudes y skills (referencias a `Technology`) |
| `TimelineEntry` | Etapas de la trayectoria: formación, prácticas y experiencia laboral |
| `Technology` | Catálogo común de tecnologías, reutilizado por el perfil, la trayectoria y los proyectos |
| `ItProject` | Proyectos de desarrollo con su contenido en markdown y su galería |
| `CarProject` | Coches proyecto, sus metas y sus modificaciones |
| `Modification` | Cada trabajo hecho a un coche, con su estado, categoría y técnicas |

Los proyectos, los coches y las modificaciones comparten los mismos estados: `idea`, `pendiente`, `en-curso`, `pausado` y `finalizado`.

La carpeta `portfolio-content/` contiene el contenido original en markdown y el modelo de contenido (`CONTENT_MODEL.md`) que se usó para cargarlo en el CMS.

## Generación estática y despliegue

El proyecto empezó con renderizado en servidor (SSR) y se migró a **generación estática (SSG)**: el contenido de un portfolio cambia poco, así que basta con generar las páginas una vez, en el build.

- **Prerender:** TanStack Start genera todas las páginas en el build siguiendo los enlaces desde la página de inicio.
- **Server functions estáticas:** se ejecutan una vez en el build y guardan su resultado como JSON, así que la web publicada no llama a la API de Content Island en ningún momento. El middleware está adaptado para respetar la ruta base `/portfolio/` de GitHub Pages.
- **Despliegue:** el workflow `.github/workflows/deploy.yml` construye y publica en GitHub Pages:
  - con cada push a `main`,
  - manualmente, desde la pestaña Actions,
  - y cuando se publica contenido en Content Island, mediante su webhook de GitHub (evento `content-island-publish`).

El token de Content Island solo se usa durante el build: nunca llega al navegador.

## Puesta en marcha

**Requisitos:** Node.js 20.6 o superior (el CI usa Node 22) y un token de lectura de Content Island.

```bash
git clone https://github.com/DavidMoureCerqueira/portfolio.git
cd portfolio
npm install
cp .env.example .env
```

Rellena el `.env` con el token de lectura (pestaña *General* del proyecto en Content Island):

```env
CONTENT_ISLAND_READ_TOKEN=tu_token_de_lectura
```

Y arranca el servidor de desarrollo:

```bash
npm run dev
```

**Variables de entorno**

| Variable | Uso | Dónde |
| --- | --- | --- |
| `CONTENT_ISLAND_READ_TOKEN` | Token de lectura de Content Island | `.env` en local; secreto del repositorio en GitHub Actions |
| `BASE_PATH` | Ruta base del sitio (`/` por defecto) | La pone el workflow: `/portfolio/` en GitHub Pages |

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Comprueba los tipos y genera el sitio estático en `dist/client` |
| `npm run preview` | Sirve el build en local |
| `npm test` | Tests en modo observación |
| `npm run test:run` | Ejecuta los tests una vez |
| `npm run lint` | ESLint |
| `npm run format` / `format:check` | Formatea o comprueba el formato con Prettier |

Para comprobar el build tal como lo sirve GitHub Pages, sin servidor:

```bash
npm run build
npx serve dist/client
```

## Tests

Tests con **Vitest** y **Testing Library**, junto a cada archivo que prueban (`*.spec.ts` / `*.spec.tsx`). La configuración está en `config/test/`.

- **Funciones puras:** formato de fechas, estados, ordenaciones, troceo del markdown en secciones, progreso de los coches y anterior/siguiente.
- **Mappers:** de la respuesta de Content Island a los modelos de vista, incluidos los casos límite (campos vacíos, valores desconocidos, galerías con su texto alternativo).
- **Componentes con comportamiento:** el patrón «Reto → Solución» del markdown, los filtros de modificaciones, el despliegue de detalles, la ficha y el cambio de tema.

Lo puramente visual no se testea: los tests comprueban lo que ve y hace el usuario, no clases CSS.

```bash
npm run test:run
```

## Sistema de diseño

**«Plano de taller»:** el azul de un plano técnico y un único amarillo señal, como el de un taller. Tema claro (*Papel*) y oscuro (*Plano*), tipografías Space Grotesk, Inter y JetBrains Mono, formas redondeadas y un color protagonista por pestaña. La guía completa y los tokens están en `design-system/`.

## IA en el flujo de trabajo

- **Contenido:** modelado con Claude y cargado en Content Island con Claude Code y el servidor MCP de Content Island.
- **Diseño:** guía de estilos y previews de cada pantalla antes de programar.
- **Implementación:** documentos de traspaso (handoffs) por fases que fijan arquitectura y diseño, ejecutados con Claude Code en modo plan y revisados antes de aplicarse.
- **Skills** de Content Island para el cliente de la API y la arquitectura de pods en TanStack Start.

## Próximos pasos

- **Versión en inglés:** rutas con `/en`, textos de la interfaz en diccionarios y contenido traducido en Content Island.
- **CI en pull requests:** ejecutar lint, tipos y tests antes de fusionar.

---

Hecho por **David Moure Cerqueira** · [GitHub](https://github.com/DavidMoureCerqueira) · [LinkedIn](https://www.linkedin.com/in/david-moure-cerqueira)
