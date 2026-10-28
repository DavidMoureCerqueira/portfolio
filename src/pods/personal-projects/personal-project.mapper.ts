import type { Fact } from "../../common-app/components";
import { formatMonthYear } from "../../common-app/dates/format-dates";
import { isStatus } from "../../common-app/models/status.model";
import type { CarProjectApi } from "./api/api.model";
import { mapModificationApiToVm } from "./modifications/modification.map";
import {
  mapCarProjectProgress,
  mapCover,
  mapSpec,
} from "./personal-project.helpers";
import type {
  CarGoalVm,
  CarProjectDetailVm,
  CarProjectLinkVm,
} from "./personal-project.vm";

// Una meta por línea del checklist: "- [x] Rodar en tandas de drift"
const GOAL_LINE = /^\s*[-*]\s+\[([ xX])\]\s+(.+)$/;

// Las líneas que no siguen el patrón se ignoran
const mapGoals = (goals = ""): CarGoalVm[] =>
  goals
    .split(/\r?\n/)
    .map((line) => line.match(GOAL_LINE))
    .filter((match) => match !== null)
    .map(([, mark, text]) => ({ text: text.trim(), done: mark !== " " }));

// Los datos vacíos los omite la ficha
const mapFacts = (carProject: CarProjectApi): Fact[] => [
  { label: "Marca", value: carProject.brand },
  {
    label: "Modelo",
    value: [carProject.model, carProject.version].filter(Boolean).join(" "),
  },
  { label: "Año", value: String(carProject.year) },
  { label: "Motor", value: carProject.engine?.trim() },
  { label: "Comprado", value: formatMonthYear(carProject.acquiredDate) },
];

export function mapCarProjectApiToDetailVm(
  carProject: CarProjectApi,
  prev: CarProjectLinkVm,
  next: CarProjectLinkVm,
): CarProjectDetailVm {
  return {
    slug: carProject.slug,
    title: carProject.title,
    spec: mapSpec(carProject),
    status: isStatus(carProject.status) ? carProject.status : "idea",
    summary: carProject.summary,
    cover: mapCover(carProject),
    facts: mapFacts(carProject),
    goals: mapGoals(carProject.goals),
    ...mapCarProjectProgress(carProject),
    content: carProject.content,
    modifications: (carProject.modifications ?? []).map(mapModificationApiToVm),
    prev,
    next,
  };
}
