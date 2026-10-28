import type { Status } from "../../../common-app/models/status.model";

export interface CarProjectPreviewVm {
  title: string;
  slug: string;
  status: Status;
  brand: string;
  model: string;
  version?: string;
  year: number;
  engine?: string;
  summary: string;
  cover: { url: string; alt: string };
  progress: Record<Status, number>;
  techniques: string[];
}
