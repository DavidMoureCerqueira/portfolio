import { useId, useState } from "react";
import { TechIcon } from "../../../common-app/components";
import { TechnologyVm } from "../../../common-app/technology/technology.vm";

interface Props {
  technologies: TechnologyVm[];
  // En el detalle se muestran todas, sin el «+N»
  showAll?: boolean;
}

export function ItProjectTechnologyList({
  technologies,
  showAll = false,
}: Props) {
  // En la tarjeta solo caben unas pocas tecnologías; el resto se resume en «+N»
  const MAX_TECHNOLOGIES = showAll ? Infinity : 6;

  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const technologiesId = useId();
  const hiddenTechnologies = Math.max(
    technologies.length - MAX_TECHNOLOGIES,
    0,
  );
  const visibleTechnologies = showAllTechnologies
    ? technologies
    : technologies.slice(0, MAX_TECHNOLOGIES);
  return (
    visibleTechnologies.length > 0 && (
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
    )
  );
}
