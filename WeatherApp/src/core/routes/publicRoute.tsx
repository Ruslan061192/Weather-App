import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AUTH_ROUTE, HOME_ROUTE } from "../constants/routesConstants";
import { useUsersStore } from "../store/useUsersStore";
import { useEffect } from "react";
export const isAuth = false;

export default function PublicRoute() {
  const { tokensData } = useUsersStore();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!tokensData.access_token) {
      navigate(AUTH_ROUTE);
    }
  }, [tokensData.access_token, navigate]);

  if (tokensData.access_token) {
    return <Navigate to={HOME_ROUTE} state={{ from: location }} />;
  }
  return <Outlet />;
}
