---
_model: ItProject
id: needtobrake
title: NeedToBrake
slug: needtobrake
status: finalizado
featured: true
order: 2
kind: academico
summary: Buscador y comparador visual a escala de discos de freno, con foro y garaje virtual. Mi proyecto de fin de ciclo.
role: Full stack
teamSize: 1
startDate: "2026-03"
endDate: "2026-06"
technologies: [angular, typescript, tailwindcss, daisyui, konva, python, fastapi, sqlmodel, alembic, mysql, jwt, docker, cloudinary, githubactions, netlify, render, aiven]
repoUrl: https://github.com/DavidMoureCerqueira/NeedToBrakeApp
demoUrl: https://needtobrake.netlify.app
cover: assets/it-projects/needtobrake/landing-page.webp
gallery:
  - src: assets/it-projects/needtobrake/landing-page.webp
    alt: Página de inicio de NeedToBrake con un coche en circuito de fondo
  - src: assets/it-projects/needtobrake/select-page.webp
    alt: Búsqueda del disco actual y del deseado por marca, modelo y versión
  - src: assets/it-projects/needtobrake/select-page-with-results.webp
    alt: Resultados de búsqueda con las medidas de cada disco compatible
  - src: assets/it-projects/needtobrake/comparer-page.webp
    alt: Comparativa visual a escala entre el disco actual y el deseado, con tabla de diferencias
  - src: assets/it-projects/needtobrake/forum-list-page.webp
    alt: Listado de publicaciones del foro
  - src: assets/it-projects/needtobrake/post-detail-page.webp
    alt: Detalle de una publicación del foro con sus comentarios
  - src: assets/it-projects/needtobrake/profile-page.webp
    alt: Perfil de usuario con avatar, garaje virtual y sus publicaciones
  - src: assets/it-projects/needtobrake/register-page.webp
    alt: Formulario de registro
  - src: assets/it-projects/needtobrake/sign-in-page.webp
    alt: Formulario de inicio de sesión
---

## Qué es
Una plataforma web para buscar, comparar y hablar de discos de freno de coche. Permite encontrar los discos compatibles con un vehículo por marca, modelo, versión y año, o filtrarlos por medidas, y comparar dos discos con una representación visual a escala.

Además tiene comunidad: un foro con publicaciones, comentarios y likes, y un perfil para cada usuario con su garaje virtual y su vehículo favorito.

## Por qué
No existe ninguna plataforma que ofrezca un comparador de discos de freno, y es una herramienta muy útil a la hora de desarrollar kits de freno. Empresas del sector que lo han visto y probado me han dado feedback sobre él.

## Cómo
- **Frontend**: SPA en Angular 20 con TypeScript. Los estilos van con Tailwind CSS v4 y daisyUI, y la comparativa se dibuja en canvas con Konva.js.
- **Backend**: API REST en FastAPI organizada por capas (rutas, servicios, repositorios y modelos). El acceso a MySQL se hace con SQLModel y las migraciones con Alembic. La autenticación es stateless con JWT.
- **Servicios externos**: Cloudinary para los avatares y la API de RestCountries para elegir la nacionalidad en el perfil.
- **Infraestructura**: Docker Compose en local. En producción, la SPA está en Netlify, la API en Render y la base de datos MySQL en Aiven, con GitHub Actions para CI.

## Decisiones técnicas
- **Konva.js**: permite pintar los discos en un canvas a escala real entre ellos. Así la diferencia de diámetro o de espesor se ve de un vistazo, en lugar de tener que leerla en una tabla.
- **FastAPI**: la API queda autodocumentada con Swagger, lo que facilita probarla y consumirla desde el frontend.
- **SQLModel y Alembic**: un mismo modelo sirve para validar los datos y para la base de datos, y los cambios de esquema quedan versionados en migraciones.
- **Arquitectura por capas en el backend**: separar las rutas, la lógica de negocio y el acceso a datos mantiene cada parte pequeña y fácil de probar. El backend incluye tests con informe de cobertura.

## Retos y soluciones
- **Reto:** conseguir un catálogo real de discos y vehículos. → **Solución:** partí de un Excel de EBC Brakes. Lo limpié, quitando marcas raras y versiones comerciales, y lo convertí en un JSON de más de 600.000 líneas. Un script de seed lo carga en la base de datos y detecta si ya hay datos para no duplicarlos.
- **Reto:** comprender el funcionamiento de Angular y adaptarme a su forma de trabajar, que fue una parte importante del proyecto.

## Aprendizajes
Llevar un proyecto entero yo solo, desde los datos hasta el despliegue, y ver que resuelve un problema real: empresas del sector lo han probado y me han dado su opinión.
