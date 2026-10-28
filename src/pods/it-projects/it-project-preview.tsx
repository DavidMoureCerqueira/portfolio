import { Link } from "@tanstack/react-router";
import { Card } from "../../common-app/components";
import type { ItProjectPreviewVm } from "./it-projects-preview/it-project-preview.vm";
import { ItProjectCover } from "./components/it-project-cover";
import { ItProjectPreviewBody } from "./components/it-project-preview-body";

interface ItProjectPreviewProps {
  itProject: ItProjectPreviewVm;
  // Portada a la izquierda y datos a la derecha (desde md), para el proyecto destacado
  horizontal?: boolean;
}

export function ItProjectPreview({
  itProject,
  horizontal = false,
}: ItProjectPreviewProps) {
  return (
    <Card
      className={`flex h-full flex-col overflow-hidden ${horizontal ? "md:grid md:grid-cols-2" : ""}`}
    >
      {itProject.cover && (
        // Fuera del orden de tabulación: el enlace accesible es «Ver proyecto»
        <Link
          to="/it-projects/$slug"
          params={{ slug: itProject.slug }}
          tabIndex={-1}
          aria-hidden="true"
          className={`block ${horizontal ? "md:h-full" : ""}`}
        >
          <ItProjectCover cover={itProject.cover} horizontal={horizontal} />
        </Link>
      )}
      <ItProjectPreviewBody itProject={itProject} />
    </Card>
  );
}
