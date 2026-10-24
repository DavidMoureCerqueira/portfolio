---
_model: ItProject
id: portfolio
title: Portfolio
slug: portfolio
status: en-curso
featured: false
order: 1
kind: academico
summary: Mi portfolio personal y TFM de Lemoncode, hecho en React y alimentado por Content Island como headless CMS.
role: Desarrollo completo
teamSize: 1
startDate: "2026-10"
endDate: null
technologies: [react, typescript, vite, react-router, tailwindcss, daisyui, contentisland, claude, eslint, prettier]
repoUrl: https://github.com/DavidMoureCerqueira/portfolio
demoUrl: ""
cover: assets/it-projects/portfolio/cover.webp      # pendiente: captura cuando haya diseño
gallery: []
---

## Qué es
La web que estás viendo. Reúne quién soy, mi trayectoria, mis proyectos de desarrollo y mis proyectos de coches, y es mi trabajo de fin del programa de especialización en Front End moderno y herramientas de IA de Lemoncode, patrocinado por Luckia.

## Por qué
Quería un único sitio donde enseñar las dos cosas que me definen: el código y el taller. Además, separar el contenido del código me permite añadir un proyecto o actualizar el estado de una modificación del coche sin tocar una línea ni volver a desplegar.

## Cómo
Una SPA en React con TypeScript, construida con Vite y con React Router para las tres pestañas: Home, Proyectos IT y Proyectos Personales. Todo el contenido vive en Content Island y la web lo consume desde su API.

El contenido está organizado en modelos (perfil, línea temporal, tecnologías, proyectos IT, coches y modificaciones) que se relacionan entre sí. Por ejemplo, cada proyecto referencia sus tecnologías desde un catálogo común, así que un cambio en una tecnología se refleja en toda la web.

## Decisiones técnicas
- **Content Island**: un headless CMS que separa contenido y presentación. El contenido se edita en el panel y la web solo lo pinta.
- **IA junto al CMS**: el contenido se redacta y estructura con ayuda de Claude y se carga directamente en Content Island, siguiendo un modelo de contenido definido de antemano.
- **Tailwind CSS y daisyUI**: los mismos que usé en NeedToBrake y BadgeBattles, para maquetar rápido con un sistema de componentes y temas coherente.
- **ESLint y Prettier**: calidad y formato del código desde el primer commit, una costumbre que me traje de DEUS.

## Retos y soluciones
- **Reto:** diseñar un modelo de contenido que sirva para dos mundos muy distintos, proyectos de software y coches. → **Solución:** modelos separados que comparten las mismas etiquetas de estado, de modo que la web trata igual un proyecto en curso que una modificación pendiente.
