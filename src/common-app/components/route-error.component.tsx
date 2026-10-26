import { useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "./button.component";

// errorComponent de las rutas: muestra el mensaje y permite reintentar la carga
export function RouteError({ error }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-body text-ink">
        {error instanceof Error
          ? error.message
          : "Ha habido un error inesperado"}
      </p>
      <Button variant="secundario" onClick={() => router.invalidate()}>
        Reintentar
      </Button>
    </div>
  );
}
