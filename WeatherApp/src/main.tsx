import ReactDOM from "react-dom/client";
import "./core/styles/index.css";
import { RouterProvider } from "react-router";
import { router } from "./core/routes/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
