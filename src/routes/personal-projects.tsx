import { createFileRoute } from "@tanstack/react-router";
import { PersonalProjectsScene } from "../scenes";
import { getCarProjectsPreview } from "../pods/personal-projects/api/personal-project.functions";
import { RouteError } from "../common-app/components";

export const Route = createFileRoute("/personal-projects")({
  loader: async () => {
    const carProjectsPreview = await getCarProjectsPreview();
    return { carProjectsPreview };
  },
  head: () => ({
    meta: [{ title: "Proyectos personales · David Moure Cerqueira" }],
  }),
  staleTime: 5 * 60 * 1000,
  component: PersonalProjectsScene,
  pendingComponent: () => <p className="text-cota text-ink-muted">Cargando…</p>,
  errorComponent: RouteError,
});
