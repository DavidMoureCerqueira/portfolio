import type { ModificationApi } from "./api/api.model";
import type { ModificationVm } from "./modification.vm";
import { techniqueLabels } from "./api/mod-technique.labels";
import { categoryLabels } from "./api/mod-category.labels";
import { isStatus } from "../../../common-app/models/status.model";

export function mapModificationApiToVm(
  modification: ModificationApi,
): ModificationVm {
  return {
    title: modification.title,
    id: modification.id,
    status: isStatus(modification.status) ? modification.status : "idea",
    category: categoryLabels[modification.category] ?? modification.category,
    techniques: (modification.techniques ?? []).map(
      (technique) => techniqueLabels[technique] ?? technique,
    ),
    difficulty: modification.difficulty,
    startDate: modification.startDate,
    endDate: modification.endDate,
    summary: modification.summary,
    image: modification.image
      ? {
          url: modification.image.url,
          alt: modification.imageAlt || `Foto de ${modification.title}`,
        }
      : undefined,
    content: modification.content,
  };
}
