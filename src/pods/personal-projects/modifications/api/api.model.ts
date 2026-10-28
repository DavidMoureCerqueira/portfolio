import type { Media } from "@content-island/api-client";
import type { Status } from "../../../../common-app/models/status.model";

export type ModCategory =
  | "motor"
  | "transmision"
  | "suspension"
  | "frenos"
  | "chasis"
  | "carroceria"
  | "interior"
  | "electricidad"
  | "estetica";

export type ModTechnique =
  | "soldadura"
  | "impresion-3d"
  | "restauracion"
  | "pintura"
  | "mecanizado"
  | "electronica"
  | "fibra"
  | "tapiceria"
  | "mecanica";

export interface ModificationApi {
  id: string;
  language: "es";
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  title: string;
  car: string; // Stores the ID of the related entity
  status: Status;
  category: ModCategory;
  techniques?: ModTechnique[];
  difficulty?: number;
  startDate?: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  endDate?: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  summary: string;
  image?: Media;
  imageAlt?: string;
  content?: string;
}
