import { getRouteApi } from "@tanstack/react-router";
import { ProfileContainer } from "../pods/profile";
import { FeaturedItProject } from "../pods/it-projects/components/featured-it-project";

export const ProfileScene = () => {
  const routeApi = getRouteApi("/");
  const { profile, timeLine, featuredItProject } = routeApi.useLoaderData();

  return (
    <>
      <ProfileContainer profile={profile} timeLine={timeLine} />
      {featuredItProject && <FeaturedItProject itProject={featuredItProject} />}
    </>
  );
};
