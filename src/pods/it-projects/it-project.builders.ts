import type { ItProjectApi } from "./api/api.model";

export const buildItProjectApi = (
  overrides: Partial<ItProjectApi> = {},
): ItProjectApi => ({
  id: "needtobrake",
  language: "es",
  lastUpdate: "2026-11-01T00:00:00.000Z",
  title: "NeedToBrake",
  slug: "needtobrake",
  status: "finalizado",
  featured: true,
  kind: "academico",
  summary: "Comparador de discos de freno.",
  startDate: "2026-03-01",
  endDate: "2026-06-01",
  technologies: [],
  content: "",
  ...overrides,
});
