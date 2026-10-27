import { createFileRoute } from "@tanstack/react-router";
import { ItProjectDetailScene } from "../../scenes";
import { getItProjectDetail } from "../../pods/it-projects/api/it-project-detail.functions";
import { Button, RouteError } from "../../common-app/components";

// "it-projects_": la URL es /it-projects/$slug, pero la ruta no se anida dentro del listado
export const Route = createFileRoute("/it-projects_/$slug")({
  loader: ({ params }) => getItProjectDetail({ data: { slug: params.slug } }),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} · David Moure Cerqueira` },
          { name: "description", content: loaderData.summary },
        ]
      : [],
  }),
  staleTime: 5 * 60 * 1000,
  component: ItProjectDetailScene,
  pendingComponent: () => <p className="text-cota text-ink-muted">Cargando…</p>,
  errorComponent: RouteError,
  notFoundComponent: () => (
    <section className="flex flex-col items-start gap-4 py-12 md:py-20">
      <p className="text-cota text-cota-text">404 · Proyecto no encontrado</p>
      <h1 className="text-display-l text-ink">
        Este proyecto no está en el plano
      </h1>
      <p className="max-w-[50ch] text-lead text-ink-muted">
        No hay ningún proyecto IT con esa dirección.
      </p>
      <Button variant="principal" to="/it-projects" arrow className="mt-4">
        Ver todos los proyectos IT
      </Button>
    </section>
  ),
});
