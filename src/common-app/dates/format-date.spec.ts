import { formatMonthYear, formatProjectDates } from "./format-dates";

describe("format-dates", () => {
  describe("formatMonthYear", () => {
    it("should return the short month and the year", () => {
      const date = "2026-11-09";
      const result = formatMonthYear(date);
      expect(result).toBe("Nov 2026");
    });
    it("should accept full ISO dates", () => {
      const date = "2026-11-01T00:00:00.000Z";
      const result = formatMonthYear(date);
      expect(result).toBe("Nov 2026");
    });
    it("should return empty string when there is no date", () => {
      const date = undefined;
      const result = formatMonthYear(date);
      expect(result).toBe("");
    });
    it("shoud return undefined when the date is not valid", () => {
      const date = "Not a valid date";
      const result = formatMonthYear(date);
      expect(result).toBe("");
    });
  });

  describe("formatProjectDates", () => {
    it("should show the year only at the end when both dates are in the same year", () => {
      const startDate = "2026-10";
      const endDate = "2026-11";
      const result = formatProjectDates(startDate, endDate);
      expect(result).toBe("Oct – Nov 2026");
    });
    it("should show the year after each month when both dates are in different years", () => {
      const startDate = "2024-09";
      const endDate = "2026-06";
      const result = formatProjectDates(startDate, endDate);
      expect(result).toBe("Sep 2024 – Jun 2026");
    });
    it("should show 'hoy' when there is no endDate", () => {
      const startDate = "2026-11";
      const endDate = "";
      const result = formatProjectDates(startDate, endDate);
      expect(result).toBe("Nov 2026 – hoy");
    });
    it("should show month and year from endDate when there is no startDate", () => {
      const startDate = "";
      const endDate = "2026-11";
      const result = formatProjectDates(startDate, endDate);
      expect(result).toBe("Nov 2026");
    });
    it("should return an empty string when there is no dates", () => {
      const startDate = "";
      const endDate = "";
      const result = formatProjectDates(startDate, endDate);
      expect(result).toBe("");
    });
    it("shoud ignore an invalid endDate", () => {
      const startDate = "2026-11";
      const endDate = "Not valid date";
      const result = formatProjectDates(startDate, endDate);
      expect(result).toBe("Nov 2026 – hoy");
    });
    it("should ignore an invalid startDate", () => {
      const startDate = "Not valid date";
      const endDate = "2026-11";
      const result = formatProjectDates(startDate, endDate);
      expect(result).toBe("Nov 2026");
    });
  });
});
