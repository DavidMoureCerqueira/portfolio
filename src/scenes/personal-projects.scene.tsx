import { getRouteApi } from "@tanstack/react-router";
import { PersonalProjectContainer } from "../pods/personal-projects";

export const PersonalProjectsScene = () => {
  const routeApi = getRouteApi("/personal-projects");

  const { carProjectsPreview } = routeApi.useLoaderData();
  return <PersonalProjectContainer carProjects={carProjectsPreview} />;
};
