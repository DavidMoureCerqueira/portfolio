---
_model: ItProject
id: badgebattles
title: BadgeBattles
slug: badgebattles
status: finalizado
featured: false
order: 4
kind: academico
summary: Simulador de combates Pokémon en Flask en el que cada victoria da una medalla, hasta conseguir las 8.
role: Desarrollo en pareja
teamSize: 2
startDate: "2025-08"
endDate: "2026-03"
technologies: [python, flask, sqlite, pokeapi, html5, tailwindcss, daisyui]
repoUrl: https://github.com/DavidMoureCerqueira/BadgeBattles
demoUrl: ""
cover: assets/it-projects/badgebattles/pokemon-battle.webp
coverAlt: Combate en curso con las barras de vida y los movimientos disponibles
gallery:
  - src: assets/it-projects/badgebattles/welcome.webp
    alt: Pantalla de bienvenida de BadgeBattles con el formulario de entrada del entrenador
  - src: assets/it-projects/badgebattles/register-page.webp
    alt: Registro de entrenador con nombre, contraseña y género
  - src: assets/it-projects/badgebattles/pokemon-list.webp
    alt: Listado de Pokémon en cartas con su tipo y estadísticas
  - src: assets/it-projects/badgebattles/pokemon-details.webp
    alt: Ficha de un Pokémon con sus estadísticas y movimientos
  - src: assets/it-projects/badgebattles/pokemon-battle.webp
    alt: Combate en curso con las barras de vida y los movimientos disponibles
  - src: assets/it-projects/badgebattles/winner-page.webp
    alt: Pantalla de resultado con el registro completo del combate
  - src: assets/it-projects/badgebattles/trainer-details.webp
    alt: Ficha del entrenador con sus victorias, derrotas e historial de combates
  - src: assets/it-projects/badgebattles/battle-detail.webp
    alt: Detalle de un combate pasado entre dos entrenadores
---

## Qué es
Una aplicación web de combates Pokémon por turnos. Haciendo honor a su nombre, cada victoria contra un entrenador da una medalla, hasta un máximo de 8. Cada jugador se registra como entrenador, elige su Pokémon entre las cartas del listado y combate contra rivales; su historial de victorias y derrotas queda guardado.

## Por qué
Es el proyecto de la asignatura de Desarrollo en Servidor del ciclo de DAW, hecho en pareja.

## Cómo
- **Flask** con blueprints que reparten las rutas en tres áreas: inicio, Pokémon y combate. Las vistas protegidas usan un decorador que comprueba el login.
- **Arquitectura por capas**: servicios con la lógica (Pokémon y combate), repositorios para el acceso a datos y modelos para los objetos Pokémon y combate.
- **Plantillas** que heredan de una base común con cabecera y pie, con estilos en Tailwind CSS y daisyUI.
- **Datos**: los Pokémon se obtienen de la PokéAPI, y los entrenadores y combates se guardan en SQLite3.

## Decisiones técnicas
- **Lógica de combate propia**: en cada turno se decide quién ataca primero, se comprueba si el ataque acierta según su precisión, se calcula el daño y se resta la vida. Todo queda en un registro que se muestra al terminar el combate.
- **Resultado guardado desde el punto de vista del atacante**: cada combate guarda un único booleano, y al consultar el historial se invierte si el usuario fue el defensor. Así una sola fila sirve a los dos entrenadores.
- **Pokémon shiny**: a partir del ID del Pokémon se calcula una probabilidad controlada de que aparezca en su versión shiny.

## Retos y soluciones
- **Reto:** la primera versión leía los Pokémon de un JSON local, lo que limitaba los datos disponibles. → **Solución:** migrar a la PokéAPI y dejar en SQLite solo lo propio de la aplicación, los entrenadores y los combates.

## Aprendizajes
Organizar una aplicación de servidor en capas desde cero y modelar un sistema de reglas, el de combate, que tiene que ser coherente turno a turno.
