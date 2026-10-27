import type { ItProjectKind } from "./api.model";

// Traducción del enum kind, compartida por la preview y el detalle
export const kindLabels: Record<ItProjectKind, string> = {
  practicas: "Prácticas",
  academico: "Académico",
  personal: "Personal",
  freelance: "Freelance",
};
