import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "../../../common-app/static-function.middleware";
import { ItProjectApi } from "./api.model";
import { client } from "../../../common-app/content-island.server";
import { ItProjectPreviewVm } from "../it-projects-preview/it-project-preview.vm";
import { mapperItProjectApitoItProjectPreview } from "../it-projects-preview/it-project-preview.mapper";

export const getFeaturedItProject = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(async (): Promise<ItProjectPreviewVm | null> => {
    try {
      const [featuredItProject] = await client.getContentList<ItProjectApi>({
        contentType: "ItProject",
        language: "es",
        includeRelatedContent: 1,
        "fields.featured": true,
      });
      return featuredItProject
        ? mapperItProjectApitoItProjectPreview(featuredItProject)
        : null;
    } catch (error) {
      console.error(`Error cargando preview del proyecto: ${error}`);
      throw new Error("No se ha podido cargar la preview del proyecto", {
        cause: error,
      });
    }
  });

export const getItProjectsPreview = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(async (): Promise<ItProjectPreviewVm[]> => {
    try {
      const itProjects = await client.getContentList<ItProjectApi>({
        contentType: "ItProject",
        language: "es",
        includeRelatedContent: 1,
      });

      return itProjects.map(mapperItProjectApitoItProjectPreview);
    } catch (error) {
      console.error(`Error cargando previews de los proyectos: ${error}`);
      throw new Error("No se ha podido cargar la preview del proyecto", {
        cause: error,
      });
    }
  });
