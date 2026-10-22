import { createRootRoute, Navigate } from "@tanstack/react-router";
import { MainLayout } from "../layouts";

export const Route = createRootRoute({
  component: MainLayout,
  notFoundComponent: () => <Navigate to="/" replace />,
});
