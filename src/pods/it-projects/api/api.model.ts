import type { Media } from "@content-island/api-client";
import { TechnologyApi } from "../../../common-app/technology/technology.api-model";

export type Status =
  "idea" | "pendiente" | "en-curso" | "pausado" | "finalizado";

export type ItProjectKind =
  "practicas" | "academico" | "personal" | "freelance";

export interface ItProjectApi {
  id: string;
  language: "es";
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  title: string;
  slug: string;
  status: Status;
  featured: boolean;
  order?: number;
  kind: ItProjectKind;
  summary: string;
  role?: string;
  teamSize?: number;
  startDate?: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  endDate?: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  technologies: TechnologyApi[];
  repoUrl?: string;
  demoUrl?: string;
  cover?: Media;
  coverAlt?: string;
  gallery?: Media[];
  galleryAlt?: string[];
  content: string;
}
