import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUsersStore } from "../../shared/store/useUsersStore";
import { PATHS } from "../../shared/model/constants/routesConstants";

export default function PublicRoute() {
  const { tokensData } = useUsersStore();
  const location = useLocation();

  // console.log('PublicRoute', 'tokensData:', tokensData);

  return tokensData?.access_token ? 
    <Navigate to={PATHS.HOME_ROUTE} state={{ from: location }} />:
    <Outlet/>
}
