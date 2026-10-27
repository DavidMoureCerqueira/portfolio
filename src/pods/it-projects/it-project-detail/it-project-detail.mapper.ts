import { isStatus } from "../../../common-app/models/status.model";
import { mapperTechnologyApiToTechnologyVm } from "../../../common-app/technology/technology.mapper";
import type { ItProjectApi } from "../api/api.model";
import { kindLabels } from "../api/it-project-kind.labels";
import { formatProjectDates } from "./format-project-dates";
import type {
  ItProjectDetailVm,
  ItProjectLinkVm,
} from "./it-project-detail.vm";

// "" o espacios → undefined, para que los componentes solo comprueben si existe
const toOptionalUrl = (url?: string) => url?.trim() || undefined;

const formatTeam = (teamSize?: number) => {
  if (!teamSize) return undefined;
  return teamSize === 1 ? "individual" : `${teamSize} personas`;
};

// galleryAlt va en paralelo a gallery: se emparejan por posición aquí y ningún componente lo conoce
const mapGallery = (project: ItProjectApi): ItProjectDetailVm["gallery"] =>
  (project.gallery ?? []).map((media, index) => ({
    url: media.url,
    alt: project.galleryAlt?.[index] || `Captura de ${project.title}`,
  }));

export function mapItProjectApiToDetailVm(
  project: ItProjectApi,
  prev: ItProjectLinkVm,
  next: ItProjectLinkVm,
): ItProjectDetailVm {
  const demoUrl = toOptionalUrl(project.demoUrl);
  const repoUrl = toOptionalUrl(project.repoUrl);

  return {
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    status: isStatus(project.status) ? project.status : "idea",
    kindLabel: kindLabels[project.kind],
    dates: formatProjectDates(project.startDate, project.endDate),
    role: project.role || undefined,
    team: formatTeam(project.teamSize),
    cover: project.cover?.url
      ? {
          url: project.cover.url,
          alt: project.coverAlt || `Portada de ${project.title}`,
        }
      : undefined,
    technologies: project.technologies.map(mapperTechnologyApiToTechnologyVm),
    demoUrl,
    repoUrl,
    isInternal: !demoUrl && !repoUrl && project.kind === "practicas",
    content: project.content,
    gallery: mapGallery(project),
    prev,
    next,
  };
}
