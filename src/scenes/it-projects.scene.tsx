import { getRouteApi } from "@tanstack/react-router";
import { ItProjectContainer } from "../pods/it-projects";

export const ItProjectsScene = () => {
  const routeApi = getRouteApi("/it-projects");
  const { itProjectsPreview } = routeApi.useLoaderData();

  return <ItProjectContainer projects={itProjectsPreview} />;
};
