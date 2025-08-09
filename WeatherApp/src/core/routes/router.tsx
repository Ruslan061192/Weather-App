import { createBrowserRouter } from "react-router-dom";
import App from "../../App/App";
import HomePage from "../../pages/Home/HomePage";
import AuthPage from "../../pages/Auth/AuthPage";
import PrivateRoute from "./privateRoute";
import {
  AUTH_ROUTE,
  ERROR_ROUTE,
  HOME_ROUTE,
  MAIN,
} from "../constants/routesConstants";
import PublicRoute from "./publicRoute";
import ErrorPage from "../../pages/Error/ErrorPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: MAIN,
        element: <PrivateRoute />,
        children: [{ path: HOME_ROUTE, element: <HomePage /> }],
      },

      {
        element: <PublicRoute />,
        children: [
          {
            path: AUTH_ROUTE,
            element: <AuthPage />,
          },
        ],
      },
      {
        path: ERROR_ROUTE,
        element: <ErrorPage />,
      },
    ],
  },
]);
