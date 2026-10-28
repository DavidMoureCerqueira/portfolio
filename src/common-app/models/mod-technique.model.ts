export const MODTECHNIQUES = [
  "impresion-3d",
  "restauracion",
  "pintura",
  "mecanizado",
  "electronica",
  "fibra",
  "tapiceria",
  "mecanica",
  "soldadura",
];

export type ModTechnique = (typeof MODTECHNIQUES)[number];

export const isModTechnique = (value: unknown): value is ModTechnique =>
  MODTECHNIQUES.includes(value as ModTechnique);
