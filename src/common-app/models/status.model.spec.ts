import { isStatus, STATUSES } from "./status.model";

describe("status.model", () => {
  describe("isStatus", () => {
    it.each(STATUSES)("should accept <%s>", (status) => {
      const result = isStatus(status);
      expect(result).toBe(true);
    });
    it("should reject an unknown value", () => {
      const result = isStatus("Valor no aceptado");
      expect(result).toBe(false);
    });
    it("should reject a null value", () => {
      const result = isStatus(null);
      expect(result).toBe(false);
    });
  });
});
