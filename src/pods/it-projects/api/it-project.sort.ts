import { sortByOrder } from "../../../common-app/sort/sort-by-order";
import type { ItProjectApi } from "./api.model";

type SortableItProject = Pick<ItProjectApi, "order" | "startDate">;

export const sortItProjects = <T extends SortableItProject>(
  projects: T[],
): T[] => sortByOrder(projects, (project) => project.startDate);
