import type { Status } from "../../common-app/models/status.model";
import type { ModificationVm } from "./modifications/modification.vm";

export interface CarGoalVm {
  label: string;
  done: boolean;
}

export interface CarProjectDetailVm {
  slug: string;
  title: string;
  status: Status;
  brand: string;
  model: string;
  version?: string;
  year: number;
  engine?: string;
  // Línea técnica corta en mono: "1994 · 1.5 turbo · 116 CV"
  spec: string;
  acquiredDate?: string; // "Dic 2016"
  summary: string;
  goals: CarGoalVm[];
  cover: { url: string; alt: string };
  gallery: { url: string; alt: string }[];
  content: string;
  progress: Record<Status, number>;
  modificationsTotal: number;
  // "9 modificaciones · 6 finalizadas · 2 en curso · 1 pendiente"
  progressLabel: string;
  techniques: string[];
  modifications: ModificationVm[];
}
