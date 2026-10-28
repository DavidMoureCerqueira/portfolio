import { isStatus } from "../../../common-app/models/status.model";
import type { CarProjectApi } from "../api/api.model";
import {
  mapCarProjectProgress,
  mapCover,
  mapModificationsToTechniques,
  mapSpec,
} from "../personal-project.helpers";
import type { CarProjectPreviewVm } from "./personal-project-preview.vm";

export function mapCarProjectApiToPreviewVm(
  carProject: CarProjectApi,
): CarProjectPreviewVm {
  return {
    slug: carProject.slug,
    title: carProject.title,
    spec: mapSpec(carProject),
    status: isStatus(carProject.status) ? carProject.status : "idea",
    summary: carProject.summary,
    cover: mapCover(carProject),
    ...mapCarProjectProgress(carProject),
    techniques: mapModificationsToTechniques(carProject.modifications),
  };
}
