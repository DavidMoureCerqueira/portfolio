import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Ruta base del sitio: "/" en local, "/portfolio/" en GitHub Pages (lo pasa el workflow).
// TanStack Start la usa también como basepath del router.
const base = process.env.BASE_PATH ?? '/'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base,
  plugins: [
    // Debe ir antes de react(): incluye el plugin del router, que genera src/routeTree.gen.ts
    tanstackStart({
      // Sitio 100 % estático: todas las páginas se generan en el build
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      // GitHub Pages sirve 404.html en cualquier ruta que no exista. Es la carcasa de la app
      // (sin contenido de ruta): al cargar, el router del cliente pinta el notFoundComponent.
      // maskPath tiene que ser una ruta que exista (si no, responde 404 y el prerender falla),
      // pero no "/" a secas: la carcasa sustituiría a la Home. De ahí la query.
      // Solo en el build: en `vite dev` el modo spa desactivaría el SSR de todas las páginas.
      spa: {
        enabled: command === 'build',
        maskPath: '/?shell',
        prerender: { outputPath: '/404' },
      },
    }),
    react(),
    tailwindcss(),
  ],
}))
