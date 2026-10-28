import type { Media } from "@content-island/api-client";
import { Status } from "../../../../common-app/components";
import { ModCategory } from "../../../../common-app/models/mod-category.model";
import { ModTechnique } from "../../../../common-app/models/mod-technique.model";

export interface ModificationAPI {
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
  beforeImage?: Media;
  afterImage?: Media;
  gallery?: Media[];
  galleryAlt?: string[];
  content?: string;
}
