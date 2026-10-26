import { mapperTechnologyApiToTechnologyVm } from "../../profile/technology/technology.mapper";
import { ItProjectApi } from "../api/api.model";
import { ItProjectPreview } from "./it-project-preview.vm";

// galleryAlt va en paralelo a gallery: el alt de la portada es el de su imagen en la galería
const getCoverAlt = (project: ItProjectApi): string => {
  const coverIndex =
    project.gallery?.findIndex(
      (media) =>
        media.url === project.cover?.url || media.name === project.cover?.name,
    ) ?? -1;
  return project.galleryAlt?.[coverIndex] ?? `Portada de ${project.title}`;
};

export function mapperItProjectApitoItProjectPreview(
  project: ItProjectApi,
): ItProjectPreview {
  return {
    title: project.title,
    slug: project.slug,
    status: project.status,
    summary: project.summary,
    kindLabel: project.kind,
    // Solo el año: "2026-06-01T00:00:00.000Z" → "2026"
    year: (project.endDate ?? project.startDate)?.slice(0, 4),
    cover: { url: project.cover?.url ?? "", alt: getCoverAlt(project) },
    technologies: project.technologies.map(mapperTechnologyApiToTechnologyVm),
    demoUrl: project.demoUrl,
    repoUrl: project.repoUrl,
  };
}
