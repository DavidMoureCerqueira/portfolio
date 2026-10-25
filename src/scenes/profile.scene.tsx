import { getRouteApi } from "@tanstack/react-router";
import { ProfileContainer } from "../pods/profile";

export const ProfileScene = () => {
    const routeApi = getRouteApi("/");
 const {profile,timeLine} = routeApi.useLoaderData();

return <ProfileContainer profile={profile} timeLine={timeLine}/>;}
