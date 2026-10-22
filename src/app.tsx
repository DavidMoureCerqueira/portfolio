import "./core/theme/app.css";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./core/router/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
