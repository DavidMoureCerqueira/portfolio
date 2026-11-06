import { isStatus } from "../../../common-app/models/status.model";
import { mapperTechnologyApiToTechnologyVmArray } from "../../../common-app/technology/technology.mapper";
import { mapCover } from "../../../common-app/mappers/cover.mapper";
import { toOptionalUrl } from "../../../common-app/mappers/url.mapper";
import type { ItProjectApi } from "../api/api.model";
import { kindLabels } from "../api/it-project-kind.labels";
import { formatProjectDates } from "../../../common-app/dates/format-dates";
import type {
  ItProjectDetailVm,
  ItProjectLinkVm,
} from "./it-project-detail.vm";

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
    cover: mapCover(project),
    technologies: mapperTechnologyApiToTechnologyVmArray(project.technologies),
    demoUrl,
    repoUrl,
    isInternal: !demoUrl && !repoUrl && project.kind === "practicas",
    content: project.content,
    gallery: mapGallery(project),
    prev,
    next,
  };
}
