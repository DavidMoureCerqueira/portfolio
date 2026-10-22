import { createFileRoute } from "@tanstack/react-router";
import { ProfileScene } from "../scenes";

export const Route = createFileRoute("/")({
  component: ProfileScene,
});
