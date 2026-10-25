import type { ReactNode } from "react";
import { HeadContent, Scripts } from "@tanstack/react-router";

// Documento HTML completo: con TanStack Start lo renderiza el servidor (sustituye a index.html)
export const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="es" data-theme="light">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
};
