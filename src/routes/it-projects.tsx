import { createFileRoute } from "@tanstack/react-router";
import { ItProjectsScene } from "../scenes";

export const Route = createFileRoute("/it-projects")({
  component: ItProjectsScene,
});
