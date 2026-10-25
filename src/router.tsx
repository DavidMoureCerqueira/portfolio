import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// TanStack Start busca esta función en src/router.tsx para crear el router en servidor y cliente
export function getRouter() {
  return createRouter({ routeTree, scrollRestoration: true });
}
