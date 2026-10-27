import { isNotFound, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { client } from "../../../common-app/content-island.server";
import { staticFunctionMiddleware } from "../../../common-app/static-function.middleware";
import { mapItProjectApiToDetailVm } from "../it-project-detail/it-project-detail.mapper";
import type { ItProjectDetailVm } from "../it-project-detail/it-project-detail.vm";
import type { ItProjectApi } from "./api.model";
import { sortItProjects } from "./it-project.sort";

export const getItProjectDetail = createServerFn({ method: "GET" })
  // Se ejecuta en el build y el resultado se sirve como JSON estático (uno por slug); debe ser el último middleware
  .middleware([staticFunctionMiddleware])
  .validator((data: { slug: string }) => data)
  .handler(async ({ data: { slug } }): Promise<ItProjectDetailVm> => {
    try {
      // Lista en el mismo orden que el listado, para calcular anterior y siguiente
      const itProjects = sortItProjects(
        await client.getContentList<ItProjectApi>({
          contentType: "ItProject",
          language: "es",
        }),
      );
      const [itProject] = await client.getContentList<ItProjectApi>({
        contentType: "ItProject",
        language: "es",
        includeRelatedContent: 1,
        "fields.slug": slug,
      });
      const index = itProjects.findIndex((project) => project.slug === slug);
      if (!itProject || index === -1) throw notFound();

      // En bucle: el anterior del primero es el último y el siguiente del último, el primero
      const prev = itProjects.at(index - 1)!;
      const next = itProjects[(index + 1) % itProjects.length];

      return mapItProjectApiToDetailVm(
        itProject,
        { slug: prev.slug, title: prev.title },
        { slug: next.slug, title: next.title },
      );
    } catch (error) {
      if (isNotFound(error)) throw error;
      console.error(`Error cargando el proyecto ${slug}: ${error}`);
      throw new Error("No se ha podido cargar el proyecto", { cause: error });
    }
  });
