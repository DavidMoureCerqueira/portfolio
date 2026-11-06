import type { Media } from "@content-island/api-client";
import type { CarProjectApi } from "./api/api.model";
import type { ModificationApi } from "./modifications/api/api.model";

export const buildModificationApi = (
  overrides: Partial<ModificationApi> = {},
): ModificationApi => ({
  id: "mod-1",
  language: "es",
  lastUpdate: "2026-11-01T00:00:00.000Z",
  title: "Línea de escape",
  car: "car-1",
  status: "finalizado",
  category: "motor",
  summary: 'Línea de escape completa en 3".',
  ...overrides,
});

export const buildCarProjectApi = (
  overrides: Partial<CarProjectApi> = {},
): CarProjectApi => ({
  id: "car-1",
  language: "es",
  lastUpdate: "2026-11-01T00:00:00.000Z",
  title: "Volvo 940 Turbo",
  slug: "volvo-940-turbo",
  status: "en-curso",
  featured: false,
  brand: "Volvo",
  model: "940",
  year: 1990,
  summary: "Mi coche de drift.",
  cover: { url: "https://example.com/cover.webp" } as Media,
  content: "",
  ...overrides,
});
