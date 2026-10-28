import { createFileRoute } from "@tanstack/react-router";
import { CarProjectDetailScene } from "../../scenes";
import { getCarProjectDetail } from "../../pods/personal-projects/api/personal-project-detail.functions";
import { Button, RouteError } from "../../common-app/components";

// "personal-projects_": la URL es /personal-projects/$slug, pero la ruta no se anida dentro del listado
export const Route = createFileRoute("/personal-projects_/$slug")({
  loader: ({ params }) => getCarProjectDetail({ data: { slug: params.slug } }),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} · David Moure Cerqueira` },
          { name: "description", content: loaderData.summary },
        ]
      : [],
  }),
  staleTime: 5 * 60 * 1000,
  component: CarProjectDetailScene,
  pendingComponent: () => <p className="text-cota text-ink-muted">Cargando…</p>,
  errorComponent: RouteError,
  notFoundComponent: () => (
    <section className="flex flex-col items-start gap-4 py-12 md:py-20">
      <p className="text-cota text-accent-text">404 · Coche no encontrado</p>
      <h1 className="text-display-l text-ink">
        Este coche no está en el garaje
      </h1>
      <p className="max-w-[50ch] text-lead text-ink-muted">
        No hay ningún proyecto personal con esa dirección.
      </p>
      <Button
        variant="principal"
        to="/personal-projects"
        arrow
        className="mt-4"
      >
        Ver todos los coches
      </Button>
    </section>
  ),
});
