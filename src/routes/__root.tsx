/// <reference types="vite/client" />
import { createRootRoute, Navigate } from "@tanstack/react-router";
import { MainLayout, RootDocument } from "../layouts";
import indexCss from "../core/theme/index.css?url";
import appCss from "../core/theme/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "Portfolio" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: indexCss },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: () => (
    <RootDocument>
      <MainLayout />
    </RootDocument>
  ),
  notFoundComponent: () => <Navigate to="/" replace />,
});
