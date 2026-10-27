import { Button } from "./button.component";

// notFoundComponent del router; en GitHub Pages se sirve como 404.html
export function NotFound() {
  return (
    <section className="flex flex-col items-start gap-4 py-12 md:py-20">
      <p className="text-cota text-cota-text">404 · Página no encontrada</p>
      <h1 className="text-display-l text-ink">
        Esta pieza no está en el plano
      </h1>
      <p className="max-w-[50ch] text-lead text-ink-muted">
        La página que buscas no existe o ha cambiado de sitio.
      </p>
      <Button variant="principal" to="/" arrow className="mt-4">
        Volver al inicio
      </Button>
    </section>
  );
}
