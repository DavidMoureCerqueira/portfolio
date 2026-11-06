import { TechnologyApi } from "./technology.api-model";

export const buildTechnologyApi = (
  overrides: Partial<TechnologyApi> = {},
): TechnologyApi => ({
  id: "react",
  name: "React",
  category: "frontend",
  icon: "react",
  website: "https://react.dev",
  language: "es",
  lastUpdate: "2026-11-01T00:00:00.000Z",
  ...overrides,
});
