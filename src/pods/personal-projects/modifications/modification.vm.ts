import type { Status } from "../../../common-app/models/status.model";

export interface ModificationVm {
  id: string; // para el key de la lista
  title: string;
  status: Status;
  categoryLabel: string; // «Motor», «Interior»…
  techniques: string[]; // «Soldadura», «Impresión 3D»…
  summary: string;
  content?: string; // markdown opcional
  image?: { url: string; alt: string };
}
