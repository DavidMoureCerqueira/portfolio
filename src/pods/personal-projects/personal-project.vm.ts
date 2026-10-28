import { Status } from "../../common-app/models/status.model";
import { ModificationVm } from "./modifications/modification.vm";

export interface CarProjectApi {
  title: string;
  slug: string;
  status: Status;
  featured: boolean;
  brand: string;
  model: string;
  version?: string;
  year: number;
  engine?: string;
  acquiredDate?: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  summary: string;
  goals?: string;
  cover: { url: string; alt: string };
  content: string;
  modifications?: ModificationVm[];
}
