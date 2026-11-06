import { toOptionalUrl } from "./url.mapper";

describe("toOptionalUrl", () => {
  it("should keep a normal URL as it is", () => {
    expect(toOptionalUrl("https://example.com")).toBe("https://example.com");
  });

  it.each([
    ["an empty string", ""],
    ["only spaces", "   "],
    ["undefined", undefined],
  ])("should return undefined for %s", (_, url) => {
    expect(toOptionalUrl(url)).toBeUndefined();
  });
});
