import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "../../../../common-app/static-function.middleware";
import { TimeLineEntryVm } from "../time-line-entry.vm";
import { TimelineEntryApi } from "./api.model";
import { client } from "../../../../common-app/content-island.server";
import { mapperTimeLineEntriesApiToTimeLineEntriesVmArray } from "../time-line-entry.mapper";

export const getTimeLineEntries = createServerFn({ method: "GET" })
  // Se ejecuta en el build y el resultado se sirve como JSON estático; debe ser el último middleware
  .middleware([staticFunctionMiddleware])
  .handler(async (): Promise<TimeLineEntryVm[]> => {
    try {
      const timeLineEntries = await client.getContentList<TimelineEntryApi>({
        contentType: "TimeLineEntry",
        language: "es",
        includeRelatedContent: 1,
      });
      return mapperTimeLineEntriesApiToTimeLineEntriesVmArray(timeLineEntries);
    } catch (error) {
      console.error(`Error cargando las historia de tiempo: ${error}`);
      throw new Error("No se ha podido cargar el historial laboral", {
        cause: error,
      });
    }
  });
