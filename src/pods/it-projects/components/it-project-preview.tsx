import { useId, useState } from "react";
import { Button, StatusBadge, TechIcon } from "../../../common-app/components";
import type { ItProjectKind } from "../api/api.model";
import type { ItProjectPreviewVm as ItProjectPreviewVm } from "../it-projects-preview/it-project-preview.vm";

interface ItProjectPreviewProps {
  itProject: ItProjectPreviewVm;
  // Portada a la izquierda y datos a la derecha (desde md), para el proyecto destacado
  horizontal?: boolean;
}

const kindLabel: Record<ItProjectKind, string> = {
  practicas: "Prácticas",
  academico: "Académico",
  personal: "Personal",
  freelance: "Freelance",
};

// En la tarjeta solo caben unas pocas tecnologías; el resto se resume en «+N»
const MAX_TECHNOLOGIES = 6;

export function ItProjectPreview({
  itProject,
  horizontal = false,
}: ItProjectPreviewProps) {
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const technologiesId = useId();
  const hiddenTechnologies = Math.max(
    itProject.technologies.length - MAX_TECHNOLOGIES,
    0,
  );
  const visibleTechnologies = showAllTechnologies
    ? itProject.technologies
    : itProject.technologies.slice(0, MAX_TECHNOLOGIES);

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-lg border border-line bg-base-100 transition-[translate,border-color] duration-250 ease-plano hover:-translate-y-1 hover:border-brand motion-reduce:hover:translate-y-0 ${horizontal ? "md:grid md:grid-cols-2" : ""}`}
    >
      {itProject.cover.url && (
        <img
          className={`aspect-video w-full border-b border-line object-cover object-top ${horizontal ? "md:aspect-auto md:h-full md:border-r md:border-b-0" : ""}`}
          src={itProject.cover.url}
          alt={itProject.cover.alt}
          loading="lazy"
        />
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <StatusBadge status={itProject.status} />
          <span className="text-label text-ink-muted">
            {kindLabel[itProject.kindLabel]}
          </span>
          {itProject.year && (
            <span className="ml-auto text-cota text-ink-muted">
              {itProject.year}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-title text-ink">{itProject.title}</h3>
        <p className="mt-2 text-small text-ink-muted">{itProject.summary}</p>

        {visibleTechnologies.length > 0 && (
          <ul
            id={technologiesId}
            className="mt-4 flex flex-wrap gap-2"
            aria-label="Tecnologías"
          >
            {visibleTechnologies.map((technology, index) => (
              <li
                key={technology.id}
                className={`inline-flex items-center gap-1.5 rounded-sm bg-base-300 px-2 py-0.5 text-cota text-ink-muted ${index >= MAX_TECHNOLOGIES ? "animate-reveal" : ""}`}
              >
                <TechIcon slug={technology.icon} size={14} />
                {technology.name}
              </li>
            ))}
            {hiddenTechnologies > 0 && (
              <li>
                {/* El after amplía la zona pulsable sin agrandar la etiqueta */}
                <button
                  type="button"
                  aria-expanded={showAllTechnologies}
                  aria-controls={technologiesId}
                  aria-label={
                    showAllTechnologies
                      ? "Ver menos tecnologías"
                      : `Ver ${hiddenTechnologies} tecnologías más`
                  }
                  onClick={() => setShowAllTechnologies(!showAllTechnologies)}
                  className="relative cursor-pointer rounded-sm border border-line-strong px-2 py-0.5 text-cota text-brand-text transition-colors duration-150 ease-plano after:absolute after:-inset-2 after:content-[''] hover:bg-brand-soft"
                >
                  {showAllTechnologies ? "Ver menos" : `+${hiddenTechnologies}`}
                </button>
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {/* TODO: enlazar a /it-projects/$slug cuando exista la ruta de detalle */}
          <Button variant="principal" arrow>
            Ver proyecto
          </Button>
          {itProject.demoUrl && (
            <Button
              variant="secundario"
              href={itProject.demoUrl}
              external
              arrow
            >
              Demo
            </Button>
          )}
          {itProject.repoUrl && (
            <Button
              variant="secundario"
              href={itProject.repoUrl}
              external
              arrow
            >
              Código
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
