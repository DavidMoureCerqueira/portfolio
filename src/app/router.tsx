import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "../features/home/pages/HomePage";
import ITProjectsPage from "../features/it-projects/pages/ITProjectsPage";
import PersonalProjectsPage from "../features/personal-projects/pages/PersonalProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "it-projects", element: <ITProjectsPage /> },
      { path: "personal-projects", element: <PersonalProjectsPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
