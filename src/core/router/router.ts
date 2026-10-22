import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen";

export const router = createRouter({ routeTree });

// Registra el router para que <Link to="..."> tenga autocompletado y errores de tipo
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
