import { sortByOrder } from "../../../common-app/sort/sort-by-order";
import type { CarProjectApi } from "./api.model";

type SortablePersonalProject = Pick<CarProjectApi, "order" | "acquiredDate">;

export const sortPersonalProjects = <T extends SortablePersonalProject>(
  projects: T[],
): T[] => sortByOrder(projects, (project) => project.acquiredDate);
