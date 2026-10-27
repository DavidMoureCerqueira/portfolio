// Refleja el enum Status de Content Island
export const STATUSES = [
  "idea",
  "pendiente",
  "en-curso",
  "pausado",
  "finalizado",
] as const;

export type Status = (typeof STATUSES)[number];

export const isStatus = (value: unknown): value is Status =>
  STATUSES.includes(value as Status);
