import { createFileRoute } from "@tanstack/react-router";
import { ItProjectsScene } from "../scenes";
import { getItProjectsPreview } from "../pods/it-projects/api/it-preview.functions";
import { RouteError } from "../common-app/components";

export const Route = createFileRoute("/it-projects")({
  loader: async () => {
    const itProjectsPreview = await getItProjectsPreview();
    return { itProjectsPreview };
  },
  staleTime: 5 * 60 * 1000,
  component: ItProjectsScene,
  pendingComponent: () => <p className="text-cota text-ink-muted">Cargando…</p>,
  errorComponent: RouteError,
});
