/// <reference types="vite/client" />
import { createRootRoute } from "@tanstack/react-router";
import { MainLayout, RootDocument } from "../layouts";
import { NotFound } from "../common-app/components";
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
      // BASE_URL: "/" en local, "/portfolio/" en GitHub Pages
      {
        rel: "icon",
        type: "image/svg+xml",
        href: `${import.meta.env.BASE_URL}favicon.svg`,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: indexCss },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: () => (
    <RootDocument>
      <MainLayout />
    </RootDocument>
  ),
  notFoundComponent: NotFound,
});
