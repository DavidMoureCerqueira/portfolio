import { getNeighbors } from "./get-neighbors";

const items = [
  { slug: "portfolio", title: "Portfolio" },
  { slug: "needtobrake", title: "NeedToBrake" },
  { slug: "novus", title: "Novus" },
];

describe("getNeighbors", () => {
  it("should return the previous and next items", () => {
    const result = getNeighbors(items, "needtobrake");

    expect(result).toEqual({
      prev: { slug: "portfolio", title: "Portfolio" },
      next: { slug: "novus", title: "Novus" },
    });
  });

  it("should use the last item as previous of the first one", () => {
    const result = getNeighbors(items, "portfolio");
    expect(result?.prev.slug).toBe("novus");
  });

  it("should use the first item as next of the last one", () => {
    const result = getNeighbors(items, "novus");
    expect(result?.next.slug).toBe("portfolio");
  });

  it("should return null when the slug is not in the list", () => {
    const result = getNeighbors(items, "no-existe");
    expect(result).toBeNull();
  });

  it("should return only the slug and the title", () => {
    const projects = [
      { slug: "a", title: "A", summary: "…", status: "finalizado" },
      { slug: "b", title: "B", summary: "…", status: "en-curso" },
    ];

    const result = getNeighbors(projects, "a");

    expect(result?.next).toEqual({ slug: "b", title: "B" });
  });

  it("should point to itself when the list has only one item", () => {
    const result = getNeighbors([{ slug: "solo", title: "Solo" }], "solo");

    expect(result).toEqual({
      prev: { slug: "solo", title: "Solo" },
      next: { slug: "solo", title: "Solo" },
    });
  });
});
