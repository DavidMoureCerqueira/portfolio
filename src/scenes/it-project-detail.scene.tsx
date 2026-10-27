import { getRouteApi } from "@tanstack/react-router";
import { ItProjectDetailContainer } from "../pods/it-projects";

export const ItProjectDetailScene = () => {
  const routeApi = getRouteApi("/it-projects_/$slug");
  const itProject = routeApi.useLoaderData();

  return <ItProjectDetailContainer itProject={itProject} />;
};
