import { isNotFound, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { client } from "../../../common-app/content-island.server";
import { staticFunctionMiddleware } from "../../../common-app/static-function.middleware";
import { mapCarProjectApiToDetailVm } from "../personal-project.mapper";
import type { CarProjectDetailVm } from "../personal-project.vm";
import type { CarProjectApi } from "./api.model";
import { sortPersonalProjects } from "./personal-project.sort";

export const getCarProjectDetail = createServerFn({ method: "GET" })
  // Se ejecuta en el build y el resultado se sirve como JSON estático (uno por slug); debe ser el último middleware
  .middleware([staticFunctionMiddleware])
  .validator((data: { slug: string }) => data)
  .handler(async ({ data: { slug } }): Promise<CarProjectDetailVm> => {
    try {
      // Lista en el mismo orden que el listado, para calcular anterior y siguiente
      const carProjects = sortPersonalProjects(
        await client.getContentList<CarProjectApi>({
          contentType: "CarProject",
          language: "es",
        }),
      );
      // Con las modificaciones completas, no solo sus ids
      const [carProject] = await client.getContentList<CarProjectApi>({
        contentType: "CarProject",
        language: "es",
        includeRelatedContent: 1,
        "fields.slug": slug,
      });
      const index = carProjects.findIndex((car) => car.slug === slug);
      if (!carProject || index === -1) throw notFound();

      // En bucle: el anterior del primero es el último y el siguiente del último, el primero
      const prev = carProjects.at(index - 1)!;
      const next = carProjects[(index + 1) % carProjects.length];

      return mapCarProjectApiToDetailVm(
        carProject,
        { slug: prev.slug, title: prev.title },
        { slug: next.slug, title: next.title },
      );
    } catch (error) {
      if (isNotFound(error)) throw error;
      console.error(`Error cargando el coche ${slug}: ${error}`);
      throw new Error("No se ha podido cargar el coche", { cause: error });
    }
  });
