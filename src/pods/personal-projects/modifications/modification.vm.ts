import type { Status } from "../../../common-app/models/status.model";

export interface ModificationVm {
  title: string;
  id: string; // para el key de la lista
  status: Status;
  category: string;
  techniques: string[];
  difficulty?: number;
  startDate?: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  endDate?: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  summary: string;
  image?: { url: string; alt: string };
  content?: string;
}
