import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "../../../common-app/static-function.middleware";
import type { CarProjectPreviewVm } from "../personal-project-preview/personal-project-preview.vm";
import { client } from "../../../common-app/content-island.server";
import type { CarProjectApi } from "./api.model";
import { mapCarProjectApiToPreviewVm } from "../personal-project-preview/personal-project-preview.mapper";
import { sortPersonalProjects } from "./personal-project.sort";

export const getCarProjectsPreview = createServerFn({
  method: "GET",
})
  .middleware([staticFunctionMiddleware])
  .handler(async (): Promise<CarProjectPreviewVm[]> => {
    try {
      const carProjects = await client.getContentList<CarProjectApi>({
        contentType: "CarProject",
        language: "es",
        includeRelatedContent: 1,
      });

      return sortPersonalProjects(carProjects).map(mapCarProjectApiToPreviewVm);
    } catch (error) {
      console.error(
        `Error cargando previews de los proyectos personales: ${error}`,
      );
      throw new Error("No se han podido cargar los proyectos personales", {
        cause: error,
      });
    }
  });
