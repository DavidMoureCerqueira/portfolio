import { createFileRoute } from "@tanstack/react-router";
import { PersonalProjectsScene } from "../scenes";

export const Route = createFileRoute("/personal-projects")({
  component: PersonalProjectsScene,
});
