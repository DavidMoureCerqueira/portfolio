import { getRouteApi } from "@tanstack/react-router";
import { CarDetailContainer } from "../pods/personal-projects";

export const CarProjectDetailScene = () => {
  const routeApi = getRouteApi("/personal-projects_/$slug");
  const car = routeApi.useLoaderData();

  return <CarDetailContainer car={car} />;
};
