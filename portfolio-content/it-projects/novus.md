---
_model: ItProject
id: novus
title: Novus
slug: novus
status: finalizado
featured: false
order: 3
kind: practicas
summary: Automatización del onboarding en DEUS que cubre en torno al 70 % del trabajo de RR. HH. en cada nueva incorporación.
role: Desarrollo en equipo de dos
teamSize: 2
startDate: "2026-03"
endDate: "2026-06"
technologies: [bun, typescript, notion, slack, googleworkspace]
repoUrl: ""
demoUrl: ""
cover: assets/it-projects/novus/cover.webp
gallery: []
---

## Qué es
Una herramienta interna de DEUS que automatiza el onboarding de cada nueva incorporación. La desarrollé durante mis prácticas (FCT), en un equipo de dos personas.

## Por qué
Cada incorporación obligaba a RR. HH. a repetir las mismas tareas: avisar a cada departamento, hacer seguimiento de lo que faltaba, enviar la bienvenida y organizar las reuniones. Novus automatiza en torno al 70 % de ese trabajo. El resto se dejó manual a propósito, porque RR. HH. quería seguir gestionando esos campos personalmente.

## Cómo
1. RR. HH. añade a la nueva persona en una tabla de Notion, que hace de base de datos.
2. Novus detecta la nueva entrada y envía por Slack una serie de mensajes a los distintos departamentos, cada uno con la tarea que le corresponde.
3. Cuando un departamento completa su tarea, lo indica interactuando con el mensaje de Slack, y Novus escribe ese estado en Notion.
4. Además, envía el email de bienvenida y agenda las reuniones en Google Calendar.

## Decisiones técnicas
- **Bun con TypeScript**: el runtime en el que está desarrollada toda la automatización.
- **Notion como base de datos**: la misma tabla en la que se da de alta a la persona sirve de disparador y de registro del estado de su onboarding.
- **Mensajes interactivos de Slack**: cada departamento marca sus tareas desde la herramienta que ya usa a diario, sin tener que entrar en otra aplicación.

## Retos y soluciones
- **Reto:** coordinar varios departamentos y saber en todo momento qué falta. → **Solución:** cada interacción en Slack actualiza Notion, así que RR. HH. ve el estado del onboarding en un solo sitio.
- **Reto:** decidir qué automatizar y qué no. → **Solución:** se respetaron los campos que RR. HH. prefería seguir gestionando a mano.

## Aprendizajes
Trabajar en una empresa que cuida la calidad del código: revisión de código y pull requests, convención de commits, tests, linters y tipado estricto. También responsabilizarme de un código que un departamento real usa en su día a día.
