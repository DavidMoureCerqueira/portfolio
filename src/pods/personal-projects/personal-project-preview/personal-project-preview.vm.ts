import type { Status } from "../../../common-app/models/status.model";

export interface CarProjectPreviewVm {
  slug: string;
  title: string;
  // Línea técnica corta en mono: "1994 · 1.5 turbo · 116 CV"
  spec: string;
  status: Status;
  summary: string;
  cover: { url: string; alt: string };
  progress: Record<Status, number>;
  modificationsTotal: number;
  // "9 modificaciones · 6 finalizadas · 2 en curso · 1 pendiente"
  progressLabel: string;
  techniques: string[];
}
