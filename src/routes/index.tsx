import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ProfileScene } from "../scenes";
import { getProfile } from "../pods/profile/api/profile.functions";
import { getTimeLineEntries } from "../pods/profile/time-line/api/time-line-entry.functions";

export const Route = createFileRoute("/")({
  loader:  async () => { 
    const [profile,timeLine]=await Promise.all([getProfile(),getTimeLineEntries()])
    return {profile,timeLine}
  },
  staleTime: 5 * 60 * 1000,
  component: ProfileScene,
  pendingComponent: () => <p className="loading-dots">Cargando</p>,
  errorComponent: ({ error,  }) =>{
  const router = useRouter(); 
  return (
    <div>
      <p>{error instanceof Error ? error.message : "Ha habido un error inesperado"}</p>
      <button className="btn" onClick={() => router.invalidate()}>Reintentar</button>
    </div>
  );
}})
