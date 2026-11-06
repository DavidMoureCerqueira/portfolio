import type { Media } from "@content-island/api-client";
import type { ItProjectApi } from "../api/api.model";
import { buildItProjectApi } from "../it-project.builders";
import { mapItProjectApiToDetailVm } from "./it-project-detail.mapper";

const prev = { slug: "portfolio", title: "Portfolio" };
const next = { slug: "novus", title: "Novus" };

const mapDetail = (overrides: Partial<ItProjectApi> = {}) =>
  mapItProjectApiToDetailVm(buildItProjectApi(overrides), prev, next);

const media = (url: string) => ({ url }) as Media;

describe("mapItProjectApiToDetailVm", () => {
  describe("isInternal", () => {
    it("should be true for an internship project without demo or repo", () => {
      const result = mapDetail({ kind: "practicas" });

      expect(result.isInternal).toBe(true);
    });

    it("should be false when the project has a repo", () => {
      const result = mapDetail({
        kind: "practicas",
        repoUrl: "https://github.com/user/repo",
      });

      expect(result.isInternal).toBe(false);
    });

    it("should be false when the project is not an internship", () => {
      const result = mapDetail({ kind: "academico" });

      expect(result.isInternal).toBe(false);
    });

    it("should be true when the URLs are empty or only spaces", () => {
      const result = mapDetail({
        kind: "practicas",
        demoUrl: "",
        repoUrl: "   ",
      });

      expect(result.isInternal).toBe(true);
    });
  });

  it.each([
    [1, "individual"],
    [2, "2 personas"],
    [undefined, undefined],
    [0, undefined],
  ])("should format a team of %s as %s", (teamSize, expected) => {
    const result = mapDetail({ teamSize });

    expect(result.team).toBe(expected);
  });

  describe("gallery", () => {
    it("should pair each image with its galleryAlt by position", () => {
      const result = mapDetail({
        gallery: [
          media("https://example.com/1.webp"),
          media("https://example.com/2.webp"),
        ],
        galleryAlt: ["Inicio", "Comparador"],
      });

      expect(result.gallery).toEqual([
        { url: "https://example.com/1.webp", alt: "Inicio" },
        { url: "https://example.com/2.webp", alt: "Comparador" },
      ]);
    });

    it("should use a default text when an alt is missing", () => {
      const result = mapDetail({
        title: "NeedToBrake",
        gallery: [
          media("https://example.com/1.webp"),
          media("https://example.com/2.webp"),
        ],
        galleryAlt: ["Inicio"],
      });

      expect(result.gallery[1].alt).toBe("Captura de NeedToBrake");
    });

    it("should return an empty list when there is no gallery", () => {
      const result = mapDetail({ gallery: undefined });

      expect(result.gallery).toEqual([]);
    });
  });

  it("should turn an empty role into undefined", () => {
    const result = mapDetail({ role: "" });

    expect(result.role).toBeUndefined();
  });

  it("should format the dates as a range", () => {
    const result = mapDetail({
      startDate: "2026-03-01",
      endDate: "2026-06-01",
    });

    expect(result.dates).toBe("Mar – Jun 2026");
  });

  it("should keep prev and next as they are", () => {
    const result = mapDetail();

    expect(result.prev).toEqual(prev);
    expect(result.next).toEqual(next);
  });
});
