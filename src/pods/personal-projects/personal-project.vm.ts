import type { Fact } from "../../common-app/components";
import type { Status } from "../../common-app/models/status.model";
import type { ModificationVm } from "./modifications/modification.vm";

export interface CarGoalVm {
  text: string;
  done: boolean;
}

export interface CarProjectLinkVm {
  slug: string;
  title: string;
}

export interface CarProjectDetailVm {
  slug: string;
  title: string;
  // Línea técnica corta en mono, la misma que en el listado: "1994 · 1.5 turbo · 116 CV"
  spec: string;
  status: Status;
  summary: string;
  cover: { url: string; alt: string };
  // Marca, Modelo (+ versión), Año, Motor, Comprado
  facts: Fact[];
  goals: CarGoalVm[];
  progress: Record<Status, number>;
  modificationsTotal: number;
  // "9 modificaciones · 6 finalizadas · 2 en curso · 1 pendiente"
  progressLabel: string;
  // Markdown: El coche, Cómo llegó a mí, Estado inicial, Planteamiento
  content: string;
  // En el orden en que están referenciadas en el coche
  modifications: ModificationVm[];
  prev: CarProjectLinkVm;
  next: CarProjectLinkVm;
}
