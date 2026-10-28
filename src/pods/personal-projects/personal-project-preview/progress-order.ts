import type { Status } from "../../../common-app/models/status.model";

// Orden de los grupos de modificaciones en la barra de progreso y en su texto
export const PROGRESS_ORDER: Status[] = [
  "finalizado",
  "en-curso",
  "pendiente",
  "pausado",
  "idea",
];
