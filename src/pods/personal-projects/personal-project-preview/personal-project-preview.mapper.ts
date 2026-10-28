import {
  isStatus,
  type Status,
  STATUSES,
} from "../../../common-app/models/status.model";
import type { CarProjectApi } from "../api/api.model";
import type { ModificationApi } from "../modifications/api/api.model";
import { techniqueLabels } from "../modifications/api/mod-technique.labels";
import type { CarProjectPreviewVm } from "./personal-project-preview.vm";
import { PROGRESS_ORDER } from "./progress-order";

// Singular y plural de cada grupo en el texto del progreso (concuerda con «modificación»)
const progressWords: Record<Status, [string, string]> = {
  finalizado: ["finalizada", "finalizadas"],
  "en-curso": ["en curso", "en curso"],
  pendiente: ["pendiente", "pendientes"],
  pausado: ["pausada", "pausadas"],
  idea: ["idea", "ideas"],
};

const pluralize = (count: number, [singular, plural]: [string, string]) =>
  `${count} ${count === 1 ? singular : plural}`;

// "Mecánica" está en casi todas las modificaciones: no aporta en la tarjeta
const HIDDEN_TECHNIQUES = ["mecanica"];

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

// "9 modificaciones · 6 finalizadas · 2 en curso · 1 pendiente": solo los grupos con valor
function mapProgressToLabel(
  progress: Record<Status, number>,
  total: number,
): string {
  if (total === 0) return "Sin modificaciones";

  const groups = PROGRESS_ORDER.filter((status) => progress[status] > 0).map(
    (status) => pluralize(progress[status], progressWords[status]),
  );
  return [pluralize(total, ["modificación", "modificaciones"]), ...groups].join(
    " · ",
  );
}

export function mapModificationsToTechniques(
  modifications: ModificationApi[] = [],
): string[] {
  const techniques = modifications
    .flatMap((mod) => mod.techniques ?? [])
    .filter((technique) => !HIDDEN_TECHNIQUES.includes(technique));
  return [...new Set(techniques)].map(
    (technique) => techniqueLabels[technique] ?? technique,
  );
}

// "1990 · 2.3 turbo · 200 CV": año y motor, omitiendo el motor si no hay
const mapSpec = (carProject: CarProjectApi) =>
  [carProject.year, carProject.engine?.trim()].filter(Boolean).join(" · ");

export function mapCarProjectApiToPreviewVm(
  carProject: CarProjectApi,
): CarProjectPreviewVm {
  const progress = mapModificationsToProgress(carProject.modifications);
  const modificationsTotal = carProject.modifications?.length ?? 0;

  return {
    slug: carProject.slug,
    title: carProject.title,
    spec: mapSpec(carProject),
    status: isStatus(carProject.status) ? carProject.status : "idea",
    summary: carProject.summary,
    cover: {
      url: carProject.cover.url,
      alt: carProject.coverAlt || `Portada de ${carProject.title}`,
    },
    progress,
    modificationsTotal,
    progressLabel: mapProgressToLabel(progress, modificationsTotal),
    techniques: mapModificationsToTechniques(carProject.modifications),
  };
}
