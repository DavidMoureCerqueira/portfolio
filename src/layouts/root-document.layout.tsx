import type { ReactNode } from "react";
import { HeadContent, Scripts } from "@tanstack/react-router";

// Aplica el tema guardado antes del primer pintado para evitar el parpadeo
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="papel"||t==="plano")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

// Documento HTML completo: con TanStack Start lo renderiza el servidor (sustituye a index.html)
// Sin data-theme fijo: manda prefers-color-scheme hasta que el usuario elige tema
export const RootDocument = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
};
