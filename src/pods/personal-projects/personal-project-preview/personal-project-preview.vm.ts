import { Status } from "../../../common-app/components";

export interface CarProjectVM {
  title: string;
  slug: string;
  status: Status;
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
  progress: Record<Status, number>;
}
