import type { CarProjectApi } from "./api.model";

export const sortPersonalProjects = (
  projects: CarProjectApi[],
): CarProjectApi[] =>
  [...projects].sort((a, b) => {
    if (a.order !== b.order) {
      if (a.order === undefined) return 1;
      if (b.order === undefined) return -1;
      return a.order - b.order;
    }
    return (b.acquiredDate ?? "").localeCompare(a.acquiredDate ?? "");
  });
