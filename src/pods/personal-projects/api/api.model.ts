import type { Media } from "@content-island/api-client";
import { Status } from "../../../common-app/components";

export interface CarProject {
  id: string;
  language: "es";
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  title: string;
  slug: string;
  status: Status;
  featured: boolean;
  order?: number;
  brand: string;
  model: string;
  version?: string;
  year: number;
  engine?: string;
  acquiredDate?: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  summary: string;
  goals?: string;
  cover: Media;
  gallery?: Media[];
  galleryAlt?: string[];
  content: string;
  modifications?: string[]; // Stores the ID of the related entity
  coverAlt?: string;
}
