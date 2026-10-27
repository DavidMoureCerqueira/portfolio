import { TechnologyVm } from "../../profile/technology/technology.vm";
import { ItProjectKind, Status } from "../api/api.model";

export interface ItProjectPreviewVm {
  title: string;
  slug: string;
  status: Status;
  summary: string;
  kindLabel: ItProjectKind;
  year?: string;
  cover: { url: string; alt: string };
  technologies: TechnologyVm[];
  demoUrl?: string;
  repoUrl?: string;
}
