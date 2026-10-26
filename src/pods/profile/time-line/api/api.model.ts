import { TechnologyApi } from "../../technology/api/api.model";

export type TimelineType = "practicas" | "laboral" | "formacion";

export interface TimelineEntryApi {
  id: string;
  language: "es";
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  title: string;
  organization: string;
  type: TimelineType;
  isTech: boolean;
  startDate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  endDate?: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  location?: string;
  summary: string;
  technologies?: TechnologyApi[]; // Stores the ID of the related entity
  content?: string;
}
