import { isStatus } from "../../../common-app/models/status.model";
import type { ModificationApi } from "./api/api.model";
import { categoryLabels } from "./api/mod-category.labels";
import { techniqueLabels } from "./api/mod-technique.labels";
import type { ModificationVm } from "./modification.vm";

export function mapModificationApiToVm(
  modification: ModificationApi,
): ModificationVm {
  return {
    id: modification.id,
    title: modification.title,
    status: isStatus(modification.status) ? modification.status : "idea",
    categoryLabel:
      categoryLabels[modification.category] ?? modification.category,
    techniques: (modification.techniques ?? []).map(
      (technique) => techniqueLabels[technique] ?? technique,
    ),
    summary: modification.summary,
    // "" o espacios → undefined, para que la tarjeta solo compruebe si existe
    content: modification.content?.trim() || undefined,
    image: modification.image
      ? {
          url: modification.image.url,
          alt: modification.imageAlt || `Foto de ${modification.title}`,
        }
      : undefined,
  };
}
