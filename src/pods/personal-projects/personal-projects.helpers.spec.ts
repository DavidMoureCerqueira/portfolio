import {
  buildCarProjectApi,
  buildModificationApi,
} from "./personal-project.builders";
import {
  mapCarProjectProgress,
  mapCover,
  mapModificationsToTechniques,
  mapSpec,
} from "./personal-project.helpers";

describe("personal-project.helpers", () => {
  describe("mapCarProjectProgress", () => {
    it("should count the modifications by status", () => {
      const carProject = buildCarProjectApi({
        modifications: [
          buildModificationApi({ status: "finalizado" }),
          buildModificationApi({ status: "finalizado" }),
          buildModificationApi({ status: "en-curso" }),
          buildModificationApi({ status: "pendiente" }),
        ],
      });

      const result = mapCarProjectProgress(carProject);

      expect(result.modificationsTotal).toBe(4);
      expect(result.progress).toEqual({
        idea: 0,
        pendiente: 1,
        "en-curso": 1,
        pausado: 0,
        finalizado: 2,
      });
    });

    it("should build the label with only the groups that have modifications", () => {
      const carProject = buildCarProjectApi({
        modifications: [
          buildModificationApi({ status: "finalizado" }),
          buildModificationApi({ status: "finalizado" }),
          buildModificationApi({ status: "pendiente" }),
        ],
      });

      const { progressLabel } = mapCarProjectProgress(carProject);

      expect(progressLabel).toBe(
        "3 modificaciones · 2 finalizadas · 1 pendiente",
      );
    });

    it("should use the singular when there is only one", () => {
      const carProject = buildCarProjectApi({
        modifications: [buildModificationApi({ status: "finalizado" })],
      });

      const { progressLabel } = mapCarProjectProgress(carProject);

      expect(progressLabel).toBe("1 modificación · 1 finalizada");
    });

    it("should list the groups in progress order, not in the order they come", () => {
      const carProject = buildCarProjectApi({
        modifications: [
          buildModificationApi({ status: "idea" }),
          buildModificationApi({ status: "pausado" }),
          buildModificationApi({ status: "en-curso" }),
          buildModificationApi({ status: "finalizado" }),
        ],
      });

      const { progressLabel } = mapCarProjectProgress(carProject);

      expect(progressLabel).toBe(
        "4 modificaciones · 1 finalizada · 1 en curso · 1 pausada · 1 idea",
      );
    });

    it("should handle a car without modifications", () => {
      const carProject = buildCarProjectApi({ modifications: undefined });

      const result = mapCarProjectProgress(carProject);

      expect(result.modificationsTotal).toBe(0);
      expect(result.progressLabel).toBe("Sin modificaciones");
      expect(Object.values(result.progress).every((count) => count === 0)).toBe(
        true,
      );
    });
  });

  describe("mapModificationsToTechniques", () => {
    it("should return each technique once, translated and without «mecánica»", () => {
      const modifications = [
        buildModificationApi({ techniques: ["soldadura", "mecanica"] }),
        buildModificationApi({ techniques: ["soldadura", "impresion-3d"] }),
      ];

      const result = mapModificationsToTechniques(modifications);

      expect(result).toEqual(["Soldadura", "Impresión 3D"]);
    });

    it("should return an empty list when no modification has techniques", () => {
      const modifications = [buildModificationApi({ techniques: undefined })];

      expect(mapModificationsToTechniques(modifications)).toEqual([]);
    });

    it("should return an empty list when there are no modifications", () => {
      expect(mapModificationsToTechniques(undefined)).toEqual([]);
    });
  });

  describe("mapSpec", () => {
    it("should join the year and the engine", () => {
      const carProject = buildCarProjectApi({
        year: 1990,
        engine: "2.3 turbo",
      });

      expect(mapSpec(carProject)).toBe("1990 · 2.3 turbo");
    });

    it("should show only the year when there is no engine", () => {
      expect(
        mapSpec(buildCarProjectApi({ year: 1990, engine: undefined })),
      ).toBe("1990");
    });

    it("should ignore an engine with only spaces", () => {
      expect(mapSpec(buildCarProjectApi({ year: 1990, engine: "   " }))).toBe(
        "1990",
      );
    });
  });

  describe("mapCover", () => {
    it("should use coverAlt as the alternative text", () => {
      const carProject = buildCarProjectApi({
        coverAlt: "El 940 en una tanda",
      });

      expect(mapCover(carProject).alt).toBe("El 940 en una tanda");
    });

    it("should use a default text when coverAlt is empty", () => {
      const carProject = buildCarProjectApi({
        title: "Volvo 940 Turbo",
        coverAlt: "",
      });

      expect(mapCover(carProject).alt).toBe("Portada de Volvo 940 Turbo");
    });
  });
});
