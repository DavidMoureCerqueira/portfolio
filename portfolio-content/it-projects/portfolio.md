---
_model: ItProject
id: portfolio
title: Portfolio
slug: portfolio
status: en-curso
featured: false
order: 1
kind: academico
summary: "Mi portfolio personal y TFM de Lemoncode: una web estática hecha con TanStack Start, alimentada por Content Island y desplegada automáticamente en GitHub Pages."
role: Desarrollo completo
teamSize: 1
startDate: "2026-10-01"
endDate: null
technologies: [tanstack-start, react, typescript, vite, tailwindcss, daisyui, contentisland, githubactions, githubpages, claude, mcp, eslint, prettier]
repoUrl: https://github.com/DavidMoureCerqueira/portfolio
demoUrl: https://davidmourecerqueira.github.io/
cover: assets/it-projects/portfolio/cover.webp
coverAlt: Página de inicio del portfolio con la presentación de David Moure Cerqueira
gallery: []
---

## Qué es
La web que estás viendo. Reúne quién soy, mi trayectoria, mis proyectos de desarrollo y mis proyectos de coches, y es mi trabajo de fin del programa de especialización en Front End moderno y herramientas de IA de Lemoncode, patrocinado por Luckia.

## Por qué
Quería un único sitio donde enseñar las dos cosas que me definen: el código y el taller. Además, separar el contenido del código me permite añadir un proyecto o actualizar el estado de una modificación del coche sin tocar una línea: publico en el CMS y la web se regenera sola.

## Cómo
Una web en React construida con TanStack Start y generada como sitio estático (SSG). Todo el contenido vive en Content Island: las server functions lo leen durante el build y cada página se prerenderiza con sus datos, así que la web publicada no hace ninguna llamada a la API.

El despliegue es automático con GitHub Actions en GitHub Pages: cada push a la rama principal y cada publicación en Content Island, a través de su webhook, lanzan un nuevo build.

El contenido está organizado en modelos (perfil, línea temporal, tecnologías, proyectos IT, coches y modificaciones) relacionados entre sí. Por ejemplo, cada proyecto referencia sus tecnologías desde un catálogo común, así que un cambio en una tecnología se refleja en toda la web.

El código sigue una arquitectura por pods y escenas: cada página es una escena que compone componentes de varios pods, y cada pod separa su capa de datos (server functions, mappers y modelos de vista) de la presentación.

## Decisiones técnicas
- **TanStack Start en SSG**: empecé con renderizado en servidor y lo migré a generación estática. El contenido cambia poco, la web carga más rápido, el token del CMS solo se usa durante el build y se puede alojar gratis en GitHub Pages.
- **Content Island con webhook**: el contenido se edita en el panel y, al publicar, un webhook lanza el build. La web se mantiene al día sin necesidad de un servidor.
- **Sistema de diseño propio**: «Plano de taller», con tokens para tema claro y oscuro, tipografías y componentes base, aplicados con Tailwind CSS y temas de daisyUI.
- **IA en el flujo de trabajo**: el contenido se redactó y estructuró con Claude y se cargó en Content Island mediante MCP. Para implementar, preparo documentos de traspaso que fijan la arquitectura y el diseño, y trabajo sobre ellos con Claude Code.
- **ESLint y Prettier**: calidad y formato del código desde el primer commit, una costumbre que me traje de DEUS.

## Retos y soluciones
- **Reto:** diseñar un modelo de contenido que sirva para dos mundos muy distintos, proyectos de software y coches. → **Solución:** modelos separados que comparten las mismas etiquetas de estado, de modo que la web trata igual un proyecto en curso que una modificación pendiente.
- **Reto:** pasar de SSR a SSG sin renunciar a las server functions. → **Solución:** marcarlas como funciones estáticas: se ejecutan en el build y su resultado se guarda como JSON, así que la navegación entre páginas tampoco necesita servidor.
