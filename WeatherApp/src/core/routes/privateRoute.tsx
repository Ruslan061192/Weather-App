import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AUTH_ROUTE, HOME_ROUTE } from "../constants/routesConstants";
import { useUsersStore } from "../store/useUsersStore";
import { useEffect } from "react";
export const isAuth = false;

export default function PrivateRoute() {
  const { tokensData, getUser } = useUsersStore();
  const navigate = useNavigate();
  const location = useLocation();
  // useEffect(() => {
  //   const checkUser = () => {
  //     if (!tokensData.access_token) {
  //       return;
  //     }
  //     getUser();
  //     navigate(HOME_ROUTE);
  //   };
  //   checkUser();
  // }, [getUser, navigate, tokensData.access_token]);

  if (!tokensData.access_token) {
    return <Navigate to={AUTH_ROUTE} replace state={{ from: location }} />;
  }
  return <Outlet />;
}
