import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../../common-app/components";

// TEMPORAL: el detalle del coche aún no existe; la ruta está para que «Ver coche» enlace y el build compile.
// "personal-projects_": la URL es /personal-projects/$slug, pero la ruta no se anida dentro del listado
export const Route = createFileRoute("/personal-projects_/$slug")({
  head: () => ({
    meta: [{ title: "Proyectos personales · David Moure Cerqueira" }],
  }),
  component: () => (
    <section className="flex flex-col items-start gap-4 py-12 md:py-20">
      <p className="text-cota text-accent-text">En construcción</p>
      <h1 className="text-display-l text-ink">
        El detalle de este coche está en el taller
      </h1>
      <Button
        variant="principal"
        to="/personal-projects"
        arrow
        className="mt-4"
      >
        Volver a Proyectos personales
      </Button>
    </section>
  ),
});
