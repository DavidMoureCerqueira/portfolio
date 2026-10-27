import type { Status } from "../../../common-app/models/status.model";
import type { TechnologyVm } from "../../../common-app/technology/technology.vm";

export interface ItProjectLinkVm {
  slug: string;
  title: string;
}

export interface ItProjectDetailVm {
  slug: string;
  title: string;
  summary: string;
  status: Status;
  kindLabel: string;
  // «Mar – Jun 2026», «Ago 2025 – Mar 2026», «Oct 2026 – hoy» o ""
  dates: string;
  role?: string;
  // 1 → "individual", n → "n personas"
  team?: string;
  cover?: { url: string; alt: string };
  technologies: TechnologyVm[];
  demoUrl?: string;
  repoUrl?: string;
  // Sin repo ni demo y de prácticas: herramienta interna de empresa
  isInternal: boolean;
  content: string;
  gallery: { url: string; alt: string }[];
  prev: ItProjectLinkVm;
  next: ItProjectLinkVm;
}
