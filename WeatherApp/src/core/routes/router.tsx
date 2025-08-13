import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../MainLayout";
import AuthPage from "../../pages/Auth/AuthPage";
import PrivateRoute from "./privateRoute";
import {
  PATHS
} from "../../shared/model/constants/routesConstants";
import PublicRoute from "./publicRoute";
import ErrorPage from "../../pages/Error/ErrorPage";
import React from "react";

const HomePage = () => { React.lazy(() => import("../../pages/Home/HomePage")); }  

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATHS.MAIN,
        element: <PrivateRoute />,
        children: [
          { 
            path: PATHS.HOME_ROUTE, 
            element: <HomePage /> 
          }],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: PATHS.AUTH_ROUTE,
            element: <AuthPage />,
          },
        ],
      },
      // {
      //   path: PATHS.ERROR_ROUTE,
      //   element: <ErrorPage />,
      // },
    ],
  },
]);
