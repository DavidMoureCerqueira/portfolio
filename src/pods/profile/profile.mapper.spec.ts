import type { Media } from "@content-island/api-client";
import type { ProfileApi } from "./api/api.model";
import { mapperProfileApiToProfileVm } from "./profile.mapper";
import { TechnologyApi } from "../../common-app/technology/technology.api-model";

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

const buildProfileApi = (overrides: Partial<ProfileApi> = {}): ProfileApi => ({
  id: "profile",
  language: "es",
  lastUpdate: "2026-11-01T00:00:00.000Z",
  name: "David Moure Cerqueira",
  role: "Desarrollador Full Stack Junior",
  headline: "Perseverante por naturaleza",
  avatar: { url: "https://example.com/avatar.webp" } as Media,
  location: "A Coruña, Galicia",
  skills: [],
  softSkills: [],
  languages: [],
  interests: [],
  email: "moure96@gmail.com",
  githubUrl: "https://github.com/DavidMoureCerqueira",
  linkedinUrl: "https://www.linkedin.com/in/david-moure-cerqueira",
  content: "",
  ...overrides,
});

describe("mapperProfileApiToProfileVm", () => {
  describe("skillGroups", () => {
    it("should put each skill in the group of its category", () => {
      const profile = buildProfileApi({
        skills: [
          buildTechnologyApi({ name: "React", category: "frontend" }),
          buildTechnologyApi({ name: "FastAPI", category: "backend" }),
          buildTechnologyApi({ name: "MySQL", category: "database" }),
          buildTechnologyApi({ name: "Docker", category: "devops" }),
          buildTechnologyApi({ name: "Vitest", category: "testing" }),
        ],
      });

      const result = mapperProfileApiToProfileVm(profile);

      const summary = result.skillGroups.map((group) => ({
        label: group.label,
        skills: group.skills.map((skill) => skill.name),
      }));
      expect(summary).toEqual([
        { label: "Frontend", skills: ["React"] },
        { label: "Backend", skills: ["FastAPI"] },
        { label: "Datos y despliegue", skills: ["MySQL", "Docker"] },
        { label: "Herramientas e IA", skills: ["Vitest"] },
      ]);
    });

    it("should not include groups without skills", () => {
      const profile = buildProfileApi({
        skills: [buildTechnologyApi({ category: "frontend" })],
      });

      const result = mapperProfileApiToProfileVm(profile);

      expect(result.skillGroups.map((group) => group.label)).toEqual([
        "Frontend",
      ]);
    });

    it("should leave out skills whose category has no group", () => {
      const profile = buildProfileApi({
        skills: [buildTechnologyApi({ name: "Figma", category: "design" })],
      });

      const result = mapperProfileApiToProfileVm(profile);

      expect(result.skillGroups).toEqual([]);
    });
  });

  it("should leave cvUrl empty when there is no CV", () => {
    const result = mapperProfileApiToProfileVm(
      buildProfileApi({ cv: undefined }),
    );

    expect(result.cvUrl).toBeUndefined();
  });
});
