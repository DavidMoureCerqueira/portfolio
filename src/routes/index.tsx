import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ProfileScene } from "../scenes";
import { Button } from "../common-app/components";
import { getProfile } from "../pods/profile/api/profile.functions";
import { getTimeLineEntries } from "../pods/profile/time-line/api/time-line-entry.functions";

export const Route = createFileRoute("/")({
  loader:  async () => { 
    const [profile,timeLine]=await Promise.all([getProfile(),getTimeLineEntries()])
    return {profile,timeLine}
  },
  staleTime: 5 * 60 * 1000,
  component: ProfileScene,
  pendingComponent: () => <p className="text-cota text-ink-muted">Cargando…</p>,
  errorComponent: ({ error,  }) =>{
  const router = useRouter(); 
  return (
    <div>
      <p>{error instanceof Error ? error.message : "Ha habido un error inesperado"}</p>
      <Button variant="secundario" onClick={() => router.invalidate()}>Reintentar</Button>
    </div>
  );
}})
