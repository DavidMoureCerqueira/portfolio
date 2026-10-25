import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Debe ir antes de react(): incluye el plugin del router, que genera src/routeTree.gen.ts
    tanstackStart(),
    react(),
    tailwindcss(),
  ],
})
