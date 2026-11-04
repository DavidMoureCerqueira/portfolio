import { sortPersonalProjects } from "./personal-project.sort";

describe("sortItProjects", () => {
  it("should sort by order ascending", () => {
    const projects = [{ order: 2 }, { order: 1 }, { order: 3 }];
    const result = sortPersonalProjects(projects);
    expect(result.map((project) => project.order)).toEqual([1, 2, 3]);
  });

  it("should put projects withour order at the end", () => {
    const projects = [{ order: undefined }, { order: 1 }, { order: 3 }];
    const result = sortPersonalProjects(projects);
    expect(result.map((project) => project.order)).toEqual([1, 3, undefined]);
  });

  it("should order by date when the order is the same", () => {
    const projects = [
      { order: 1, acquiredDate: "2026-10-01" },
      { order: 1, acquiredDate: "2026-11-01" },
    ];
    const result = sortPersonalProjects(projects);
    expect(result.map((project) => project.acquiredDate)).toEqual([
      "2026-11-01",
      "2026-10-01",
    ]);
  });

  it("should not modify the original array ", () => {
    const projects = [{ order: 2 }, { order: 1 }];
    sortPersonalProjects(projects);
    expect(projects.map((project) => project.order)).toEqual([2, 1]);
  });

  it("should treat null order from API like no order", () => {
    const projects = [
      { order: null as unknown as number },
      { order: 2 },
      { order: 1 },
    ];
    const result = sortPersonalProjects(projects);
    expect(result.map((project) => project.order)).toEqual([1, 2, null]);
  });
});
