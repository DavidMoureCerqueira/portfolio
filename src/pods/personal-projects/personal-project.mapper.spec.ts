import type { CarProjectApi } from "./api/api.model";
import { buildCarProjectApi } from "./personal-project.builders";
import { mapCarProjectApiToDetailVm } from "./personal-project.mapper";

const prev = { slug: "hyundai-scoupe-turbo", title: "Hyundai Scoupe Turbo" };
const next = { slug: "volvo-v40-t4", title: "Volvo V40 T4" };

const mapDetail = (overrides: Partial<CarProjectApi> = {}) =>
  mapCarProjectApiToDetailVm(buildCarProjectApi(overrides), prev, next);

const factValue = (
  result: ReturnType<typeof mapDetail>,
  label: string,
): string | undefined =>
  result.facts.find((fact) => fact.label === label)?.value;

describe("mapCarProjectApiToDetailVm", () => {
  describe("goals", () => {
    it("should mark checked items as done and unchecked items as pending", () => {
      const result = mapDetail({
        goals: "- [x] Rodar en tandas\n- [ ] Llegar a 300 CV",
      });

      expect(result.goals).toEqual([
        { text: "Rodar en tandas", done: true },
        { text: "Llegar a 300 CV", done: false },
      ]);
    });

    it("should accept an uppercase X and * as bullet", () => {
      const result = mapDetail({ goals: "* [X] Cambiar el encendido" });

      expect(result.goals).toEqual([
        { text: "Cambiar el encendido", done: true },
      ]);
    });

    it("should accept Windows line breaks", () => {
      const result = mapDetail({
        goals: "- [x] Rodar en tandas\r\n- [ ] Llegar a 300 CV",
      });

      expect(result.goals).toEqual([
        { text: "Rodar en tandas", done: true },
        { text: "Llegar a 300 CV", done: false },
      ]);
    });

    it("should ignore lines that do not follow the pattern", () => {
      const result = mapDetail({
        goals: "Metas del coche\n\n- [x] Rodar en tandas\n- sin casilla",
      });

      expect(result.goals).toEqual([{ text: "Rodar en tandas", done: true }]);
    });

    it("should trim the text", () => {
      const result = mapDetail({ goals: "- [ ]   Llegar a 300 CV   " });

      expect(result.goals).toEqual([{ text: "Llegar a 300 CV", done: false }]);
    });

    it("should return an empty list when there are no goals", () => {
      const result = mapDetail({ goals: undefined });

      expect(result.goals).toEqual([]);
    });
  });

  describe("facts", () => {
    it("should join the model and the version", () => {
      const result = mapDetail({ model: "940", version: "Turbo" });

      expect(factValue(result, "Modelo")).toBe("940 Turbo");
    });

    it("should show only the model when there is no version", () => {
      const result = mapDetail({ model: "940", version: undefined });

      expect(factValue(result, "Modelo")).toBe("940");
    });

    it("should trim the engine", () => {
      const result = mapDetail({ engine: "  2.3 turbo · 165 CV  " });

      expect(factValue(result, "Motor")).toBe("2.3 turbo · 165 CV");
    });

    it("should leave the engine empty when it is only spaces", () => {
      const result = mapDetail({ engine: "   " });

      expect(factValue(result, "Motor")).toBe("");
    });

    it("should format the purchase date", () => {
      const result = mapDetail({ acquiredDate: "2019-01-01" });

      expect(factValue(result, "Comprado")).toBe("Ene 2019");
    });

    it("should keep empty facts as empty text or undefined", () => {
      // Arrange: sin motor ni fecha de compra
      const project = { engine: undefined, acquiredDate: undefined };

      // Act
      const result = mapDetail(project);

      // Assert: siguen en la lista; los omite FactsBand al pintar
      expect(result.facts.map((fact) => fact.label)).toEqual([
        "Marca",
        "Modelo",
        "Año",
        "Motor",
        "Comprado",
      ]);
      expect(factValue(result, "Motor")).toBeUndefined();
      expect(factValue(result, "Comprado")).toBe("");
    });
  });
});
