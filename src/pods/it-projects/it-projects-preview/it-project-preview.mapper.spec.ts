import type { Media } from "@content-island/api-client";
import type { Status } from "../../../common-app/models/status.model";
import type { TechnologyApi } from "../../../common-app/technology/technology.api-model";
import { buildItProjectApi } from "../it-project.builders";
import { mapperItProjectApitoItProjectPreview } from "./it-project-preview.mapper";
import { buildTechnologyApi } from "./../../../common-app/technology/technology.builders";

const cover = { url: "https://example.com/cover.webp" } as Media;

describe("mapperItProjectApitoItProjectPreview", () => {
  it("should translate the kind into its label", () => {
    const result = mapperItProjectApitoItProjectPreview(
      buildItProjectApi({ kind: "practicas" }),
    );

    expect(result.kindLabel).toBe("Prácticas");
  });

  it("should use «idea» when the status is unknown", () => {
    const project = buildItProjectApi({ status: "terminado" as Status });

    expect(mapperItProjectApitoItProjectPreview(project).status).toBe("idea");
  });

  it("should take the year from the end date, or from the start date if there is none", () => {
    expect(
      mapperItProjectApitoItProjectPreview(
        buildItProjectApi({ startDate: "2025-08-01", endDate: "2026-03-01" }),
      ).year,
    ).toBe("2026");
    expect(
      mapperItProjectApitoItProjectPreview(
        buildItProjectApi({ startDate: "2026-10-01", endDate: undefined }),
      ).year,
    ).toBe("2026");
  });

  it("should map the technologies", () => {
    const project = buildItProjectApi({
      technologies: [buildTechnologyApi({ name: "Angular" })],
    });

    expect(
      mapperItProjectApitoItProjectPreview(project).technologies.map(
        (t) => t.name,
      ),
    ).toEqual(["Angular"]);
  });

  describe("cover", () => {
    it("should not have a cover when the project has no image", () => {
      expect(
        mapperItProjectApitoItProjectPreview(
          buildItProjectApi({ cover: undefined }),
        ).cover,
      ).toBeUndefined();
    });

    it("should use coverAlt as the alternative text", () => {
      const project = buildItProjectApi({
        cover,
        coverAlt: "Página de inicio",
      });

      expect(mapperItProjectApitoItProjectPreview(project).cover?.alt).toBe(
        "Página de inicio",
      );
    });

    it("should use a default text when coverAlt is empty", () => {
      const project = buildItProjectApi({
        title: "NeedToBrake",
        cover,
        coverAlt: "",
      });

      expect(mapperItProjectApitoItProjectPreview(project).cover?.alt).toBe(
        "Portada de NeedToBrake",
      );
    });
  });

  it("should not fail when the API sends no technologies", () => {
    const project = buildItProjectApi({
      technologies: undefined as unknown as TechnologyApi[],
    });

    expect(mapperItProjectApitoItProjectPreview(project).technologies).toEqual(
      [],
    );
  });

  it("should turn empty URLs into undefined", () => {
    const project = buildItProjectApi({ demoUrl: "", repoUrl: "   " });

    const result = mapperItProjectApitoItProjectPreview(project);

    expect(result.demoUrl).toBeUndefined();
    expect(result.repoUrl).toBeUndefined();
  });
});
