import { mapperTechnologyApiToTechnologyVm } from "../../../common-app/technology/technology.mapper";
import { ItProjectApi } from "../api/api.model";
import { ItProjectPreviewVm } from "./it-project-preview.vm";
import { kindLabels } from "../api/it-project-kind.labels";
import { isStatus } from "../../../common-app/models/status.model";

export function mapperItProjectApitoItProjectPreview(
  project: ItProjectApi,
): ItProjectPreviewVm {
  return {
    title: project.title,
    slug: project.slug,
    status: isStatus(project.status) ? project.status : "idea",
    summary: project.summary,
    kindLabel: kindLabels[project.kind],
    // Solo el año: "2026-06-01T00:00:00.000Z" → "2026"
    year: (project.endDate ?? project.startDate)?.slice(0, 4),
    cover: project.cover?.url
      ? {
          url: project.cover.url,
          alt: project.coverAlt ?? `Portada de ${project.title}`,
        }
      : undefined,
    technologies: project.technologies.map(mapperTechnologyApiToTechnologyVm),
    demoUrl: project.demoUrl,
    repoUrl: project.repoUrl,
  };
}
