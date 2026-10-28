export const MODCATEGORIES = [
  "motor",
  "transmision",
  "suspension",
  "frenos",
  "chasis",
  "carroceria",
  "interior",
  "electricidad",
  "estetica",
] as const;

export type ModCategory = (typeof MODCATEGORIES)[number];

export const isModCategory = (value: unknown): value is ModCategory =>
  MODCATEGORIES.includes(value as ModCategory);
