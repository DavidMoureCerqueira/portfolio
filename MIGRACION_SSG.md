# Migración del portfolio de SSR a SSG (GitHub Pages)

Handoff para Claude Code. Guarda este archivo en la raíz del repo, abre Claude Code, activa el modo plan (Shift + Tab) y escribe:

```text
Lee MIGRACION_SSG.md y ejecuta la migración completa siguiendo sus fases. Empieza por la fase 0 y preséntame el plan antes de tocar nada.
```

---

## Contexto

- Proyecto: portfolio personal de David Moure Cerqueira, TFM del programa de Lemoncode.
- Stack: TanStack Start (React), TypeScript, Tailwind 4, daisyUI 5. Contenido en Content Island (headless CMS) consumido con `@content-island/api-client`.
- Arquitectura: pods y escenas. Cada ruta tiene un `loader` que llama en paralelo (`Promise.all`) a server functions creadas con `createServerFn`; cada server function pide a Content Island, mapea a un modelo de vista y devuelve el dato o lanza un error.
- El cliente de Content Island está en un archivo `.server.ts` y lee `process.env.CONTENT_ISLAND_TOKEN`.
- Hay un botón de cambio de tema que alterna `data-theme="papel"` / `data-theme="plano"` en `<html>` y guarda la elección en `localStorage`.
- Hoy funciona en modo SSR. El objetivo es generar un sitio 100 % estático (SSG) y desplegarlo en GitHub Pages, que no tiene servidor.
- Repo: `https://github.com/DavidMoureCerqueira/portfolio`. Rama principal: `main`.

## Objetivo

Que `npm run build` genere una carpeta con HTML, CSS, JS y JSON estáticos que funcione completa en GitHub Pages:

- Todas las páginas prerenderizadas con su contenido.
- La navegación entre pestañas sin ninguna llamada a un servidor.
- El token de Content Island usado solo durante el build, nunca en el navegador.
- Un workflow de GitHub Actions que construya y despliegue en cada push a `main`, al pulsar "Run workflow" y cuando Content Island publique contenido (evento `repository_dispatch` de tipo `content-island-publish`).

## Reglas

- No cambies la arquitectura de pods y escenas, los modelos de vista, los mappers ni el diseño. Esto es una migración de infraestructura.
- No metas el token en código, en variables `VITE_` ni en archivos subidos al repo.
- Antes de editar cada fase, dime qué archivos vas a tocar.
- Si algo de este documento no encaja con lo que encuentres en el proyecto (versiones, nombres de archivo, carpeta de salida), detente y pregúntame en lugar de suponer.
- Las funciones estáticas de TanStack Start son experimentales: consulta la documentación oficial de "Static Prerendering" y "Static Server Functions" para la versión instalada antes de escribir la configuración.

---

## Fase 0 · Inventario (solo lectura)

1. Lee `package.json`, `vite.config.ts`, `src/routes/__root.tsx`, el router y todas las rutas.
2. Localiza todas las server functions (`createServerFn`) y lista: nombre, archivo, pod y ruta que la usa.
3. Localiza el cliente de Content Island y comprueba que solo se importa desde server functions.
4. Localiza el componente del botón de tema y cómo lee y escribe `localStorage`.
5. Busca cualquier uso de cookies, cabeceras de la petición, `getRequest`/`getWebRequest`, redirecciones en servidor o código que dependa de cada visita: en estático no funcionará.
6. Comprueba si hay `nitro()` en `vite.config.ts` o un `vercel.json` (restos de la configuración para Vercel).
7. Presenta el inventario y el plan de las fases siguientes. Espera mi aprobación.

## Fase 1 · Dependencias y configuración

1. Instala `@tanstack/start-static-server-functions`.
2. En `vite.config.ts`, activa el prerenderizado en el plugin `tanstackStart` con `enabled: true` y `crawlLinks: true`.
3. Elimina `nitro()` y `vercel.json` si existen, y cualquier dependencia que solo sirviera para eso.
4. Ruta base: GitHub Pages servirá la web en `/portfolio/`. Haz que sea configurable:
   - Lee `process.env.BASE_PATH` en `vite.config.ts` (por defecto `/`) y úsalo como `base` de Vite.
   - Pasa el mismo valor al `basepath` del router.
   - Comprueba que los enlaces internos, los recursos de `public/` y las fuentes respetan la ruta base.
   - En local, sin `BASE_PATH`, todo debe seguir funcionando en `/`.

## Fase 2 · Server functions estáticas

1. Añade `staticFunctionMiddleware` a todas las server functions del inventario. Debe ser el último middleware de la cadena.
2. Las que reciben parámetros (detalle por `slug`, por ejemplo) también, siempre que las páginas que las usan se prerendericen.
3. No cambies lo que devuelven ni su manejo de errores.

## Fase 3 · Descubrimiento de páginas y 404

1. Verifica que todas las páginas de detalle (proyectos IT y coches) están enlazadas desde algún listado, para que `crawlLinks` las genere. Si alguna no lo está, añádela en la opción `pages` del prerender.
2. Haz que la página de "no encontrado" del router se prerenderice como `404.html` en la raíz de la salida, para que GitHub Pages la sirva en rutas inexistentes.

## Fase 4 · Tema compatible con estático

1. El componente del botón no debe leer `window` ni `localStorage` durante el render: el estado inicial es `null` y se rellena en un `useEffect` leyendo `document.documentElement.dataset.theme`.
2. En el `<head>` de `__root.tsx`, añade un script inline que, antes del primer pintado, aplique la elección guardada:
   `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`
   Usa la misma clave y los mismos valores (`papel`, `plano`) que el botón. Si el botón usa otra clave, unifica en la que ya existe y ajusta el script.
3. Añade `suppressHydrationWarning` a `<html>`.
4. Sin elección guardada no se pone `data-theme`: manda el tema del sistema (daisyUI con `prefersdark` en `plano`).

## Fase 5 · Workflow de GitHub Actions

Crea `.github/workflows/deploy.yml` con este contenido. Ajusta la carpeta de salida (`dist/client`) a la que genere realmente el build, en las dos líneas donde aparece:

```yaml
name: Desplegar en GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:
  repository_dispatch:
    types: [content-island-publish]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - name: Build estático
        run: npm run build
        env:
          CONTENT_ISLAND_TOKEN: ${{ secrets.CONTENT_ISLAND_TOKEN }}
          BASE_PATH: /portfolio/
      - run: touch dist/client/.nojekyll
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/client

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Fase 6 · Verificación

1. `npm run build` sin errores ni avisos de hidratación.
2. Lista los archivos HTML generados y confirma que están todas las páginas (Home, Proyectos IT, Proyectos personales, cada detalle y `404.html`), y que su HTML contiene el contenido real, no solo el esqueleto.
3. Busca en la carpeta de salida el valor del token y la cadena `CONTENT_ISLAND_TOKEN`: no debe aparecer en ningún archivo.
4. Sirve la carpeta de salida con un servidor estático (`npx serve <carpeta>`) y dime qué comprobar en el navegador: navegar por las tres pestañas con la pestaña Network abierta, comprobando que solo se piden archivos estáticos (incluidos `.json`) y ninguna llamada a server functions; recargar en una ruta interna; probar el botón de tema y recargar.
5. Haz también un build con `BASE_PATH=/portfolio/` y confirma que las rutas de recursos y enlaces del HTML generado llevan ese prefijo.
6. Resume los cambios por archivo.

## Fuera del alcance (lo hago yo)

- Crear el secreto `CONTENT_ISLAND_TOKEN` en GitHub (Settings > Secrets and variables > Actions).
- Elegir "GitHub Actions" como fuente en Settings > Pages.
- Configurar el webhook de GitHub en Content Island (propietario `DavidMoureCerqueira`, repositorio `portfolio`, evento `content-island-publish`, token fine-grained con Contents: Read and write).
- Si más adelante uso un dominio propio o el repo `DavidMoureCerqueira.github.io`, cambiar `BASE_PATH` a `/` en el workflow.

Al terminar, recuérdame estos pasos.
