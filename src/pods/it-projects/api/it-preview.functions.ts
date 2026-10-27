import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "../../../common-app/static-function.middleware";
import { ItProjectApi } from "./api.model";
import { client } from "../../../common-app/content-island.server";
import { ItProjectPreview } from "../it-projects-preview/it-project-preview.vm";
import { mapperItProjectApitoItProjectPreview } from "../it-projects-preview/it-project-preview.mapper";

export const getFeaturedItProject = createServerFn({ method: "GET" })
  // Se ejecuta en el build y el resultado se sirve como JSON estático; debe ser el último middleware
  .middleware([staticFunctionMiddleware])
  .handler(async (): Promise<ItProjectPreview | null> => {
    try {
      // getContentList devuelve [] si no hay ninguno destacado, sin lanzar error
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
