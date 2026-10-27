import { TechnologyVm } from "../profile/technology/technology.vm";
import type { Status } from "../../common-app/components";

export interface ItProjectVm {
  title: string;
  slug: string;
  status: Status;
  summary: string;
  kindLabel: string;
  role?: string;
  teamSize?: number;
  startDate?: string;
  endDate?: string;
  cover?: { url: string; alt: string };
  gallery: { url: string; alt: string }[];
  technologies: TechnologyVm[];
  demoUrl?: string;
  repoUrl?: string;
  content: string;
}
