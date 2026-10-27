import { mapperTechnologyApiToTechnologyVm } from "../profile/technology/technology.mapper";
import { ItProjectApi } from "./api/api.model";
import type { ItProjectKind } from "./api/api.model";
import { ItProjectVm } from "./it-project.vm";

const kindLabels: Record<ItProjectKind, string> = {
  practicas: "Prácticas",
  academico: "Académico",
  personal: "Personal",
  freelance: "Freelance",
};

// galleryAlt va en paralelo a gallery: se emparejan por posición aquí y ningún componente lo conoce
const mapGallery = (project: ItProjectApi): ItProjectVm["gallery"] =>
  (project.gallery ?? []).map((media, index) => ({
    url: media.url,
    alt: project.galleryAlt?.[index] ?? `Captura de ${project.title}`,
  }));

export function mapperItProjectApiToItProjectVm(
  project: ItProjectApi,
): ItProjectVm {
  return {
    title: project.title,
    slug: project.slug,
    status: project.status,
    summary: project.summary,
    kindLabel: kindLabels[project.kind],
    role: project.role,
    teamSize: project.teamSize,
    startDate: project.startDate,
    endDate: project.endDate,
    cover: project.cover?.url
      ? {
          url: project.cover.url,
          alt: project.coverAlt ?? `Portada de ${project.title}`,
        }
      : undefined,
    gallery: mapGallery(project),
    technologies: project.technologies.map(mapperTechnologyApiToTechnologyVm),
    demoUrl: project.demoUrl,
    repoUrl: project.repoUrl,
    content: project.content,
  };
}
