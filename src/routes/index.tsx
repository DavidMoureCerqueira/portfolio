import { createFileRoute } from "@tanstack/react-router";
import { ProfileScene } from "../scenes";
import { RouteError } from "../common-app/components";
import { getProfile } from "../pods/profile/api/profile.functions";
import { getTimeLineEntries } from "../pods/profile/time-line/api/time-line-entry.functions";
import { getFeaturedItProject } from "../pods/it-projects/api/it-preview.functions";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [profile, timeLine, featuredItProject] = await Promise.all([
      getProfile(),
      getTimeLineEntries(),
      getFeaturedItProject(),
    ]);
    return { profile, timeLine, featuredItProject };
  },
  staleTime: 5 * 60 * 1000,
  component: ProfileScene,
  pendingComponent: () => <p className="text-cota text-ink-muted">Cargando…</p>,
  errorComponent: RouteError,
});
