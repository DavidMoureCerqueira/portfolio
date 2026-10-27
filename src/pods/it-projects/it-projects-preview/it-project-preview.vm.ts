import type { Status } from "../../../common-app/components";
import { TechnologyVm } from "../../profile/technology/technology.vm";

export interface ItProjectPreviewVm {
  title: string;
  slug: string;
  status: Status;
  summary: string;
  kindLabel: string;
  year?: string;
  cover?: { url: string; alt: string };
  technologies: TechnologyVm[];
  demoUrl?: string;
  repoUrl?: string;
}
