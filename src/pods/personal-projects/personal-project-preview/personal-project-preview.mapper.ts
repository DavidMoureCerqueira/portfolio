import {
  isStatus,
  Status,
  STATUSES,
} from "../../../common-app/models/status.model";
import type { CarProjectApi } from "../api/api.model";
import type { ModificationApi } from "../modifications/api/api.model";
import { techniqueLabels } from "../modifications/api/mod-technique.labels";
import type { CarProjectPreviewVm } from "./personal-project-preview.vm";

function mapModificationsToProgress(
  modifications: ModificationApi[] = [],
): Record<Status, number> {
  return Object.fromEntries(
    STATUSES.map((status) => [
      status,
      modifications.filter((mod) => mod.status === status).length,
    ]),
  ) as Record<Status, number>;
}

function mapModificationsToTechniques(
  modifications: ModificationApi[] = [],
): string[] {
  const techniques = modifications.flatMap((mod) => mod.techniques ?? []);
  return [...new Set(techniques)].map(
    (technique) => techniqueLabels[technique] ?? technique,
  );
}

export function mapCarProjectApiToPreviewVm(
  carProject: CarProjectApi,
): CarProjectPreviewVm {
  return {
    title: carProject.title,
    slug: carProject.slug,
    status: isStatus(carProject.status) ? carProject.status : "idea",
    brand: carProject.brand,
    model: carProject.model,
    version: carProject.version,
    year: carProject.year,
    engine: carProject.engine,
    summary: carProject.summary,
    cover: {
      url: carProject.cover.url,
      alt: carProject.coverAlt || `Portada de ${carProject.title}`,
    },
    progress: mapModificationsToProgress(carProject.modifications),
    techniques: mapModificationsToTechniques(carProject.modifications),
  };
}
