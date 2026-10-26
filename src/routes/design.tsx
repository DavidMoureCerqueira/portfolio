import { createFileRoute } from "@tanstack/react-router";
import { DesignScene } from "../scenes/design.scene";

// Ruta temporal para revisar el sistema de diseño en los dos temas. Borrar al terminar.
export const Route = createFileRoute("/design")({
  component: DesignScene,
});
