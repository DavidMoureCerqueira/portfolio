import type { Media } from "@content-island/api-client";
import { mapCover } from "./cover.mapper";

const cover = { url: "https://example.com/cover.webp" } as Media;

describe("mapCover", () => {
  it("should return undefined when there is no cover", () => {
    const item = { title: "Volvo 940 Turbo" };

    expect(mapCover(item)).toBeUndefined();
  });

  it("should use coverAlt as the alternative text", () => {
    const item = {
      title: "Volvo 940 Turbo",
      cover,
      coverAlt: "El 940 en una tanda",
    };

    expect(mapCover(item)).toEqual({
      url: "https://example.com/cover.webp",
      alt: "El 940 en una tanda",
    });
  });

  it("should use a default text when coverAlt is empty", () => {
    const item = { title: "Volvo 940 Turbo", cover, coverAlt: "" };

    expect(mapCover(item)?.alt).toBe("Portada de Volvo 940 Turbo");
  });
});
