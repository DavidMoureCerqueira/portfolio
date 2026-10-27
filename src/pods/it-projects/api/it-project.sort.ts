import type { ItProjectApi } from "./api.model";

type SortableItProject = Pick<ItProjectApi, "order" | "startDate">;

// Orden del listado y de anterior/siguiente: order (sin order, al final) y después startDate descendente
export const sortItProjects = <T extends SortableItProject>(
  projects: T[],
): T[] =>
  [...projects].sort((a, b) => {
    if (a.order !== b.order) {
      if (a.order === undefined) return 1;
      if (b.order === undefined) return -1;
      return a.order - b.order;
    }
    return (b.startDate ?? "").localeCompare(a.startDate ?? "");
  });
