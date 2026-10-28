import { formatMonthYear } from "../../common-app/dates/format-dates";
import { isStatus } from "../../common-app/models/status.model";
import type { CarProjectApi } from "./api/api.model";
import { mapModificationApiToVm } from "./modifications/modification.map";
import {
  mapCarProjectProgress,
  mapCover,
  mapModificationsToTechniques,
  mapSpec,
} from "./personal-project.helpers";
import type { CarGoalVm, CarProjectDetailVm } from "./personal-project.vm";

// Una meta por línea del checklist: "- [x] Rodar en tandas de drift"
const GOAL_LINE = /^\s*[-*]\s+\[([ xX])\]\s+(.+)$/;

const mapGoals = (goals = ""): CarGoalVm[] =>
  goals
    .split(/\r?\n/)
    .map((line) => line.match(GOAL_LINE))
    .filter((match) => match !== null)
    .map(([, mark, label]) => ({ label: label.trim(), done: mark !== " " }));

// galleryAlt va en paralelo a gallery: se emparejan por posición
const mapGallery = (carProject: CarProjectApi) =>
  (carProject.gallery ?? []).map((media, index) => ({
    url: media.url,
    alt: carProject.galleryAlt?.[index] || `Foto de ${carProject.title}`,
  }));

export function mapCarProjectApiToDetailVm(
  carProject: CarProjectApi,
): CarProjectDetailVm {
  return {
    slug: carProject.slug,
    title: carProject.title,
    status: isStatus(carProject.status) ? carProject.status : "idea",
    brand: carProject.brand,
    model: carProject.model,
    version: carProject.version,
    year: carProject.year,
    engine: carProject.engine,
    spec: mapSpec(carProject),
    acquiredDate: formatMonthYear(carProject.acquiredDate) || undefined,
    summary: carProject.summary,
    goals: mapGoals(carProject.goals),
    cover: mapCover(carProject),
    gallery: mapGallery(carProject),
    content: carProject.content,
    ...mapCarProjectProgress(carProject),
    techniques: mapModificationsToTechniques(carProject.modifications),
    modifications: (carProject.modifications ?? []).map(mapModificationApiToVm),
  };
}
