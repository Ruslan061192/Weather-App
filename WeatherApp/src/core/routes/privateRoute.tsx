import { Navigate, Outlet } from "react-router-dom";
import { useUsersStore } from "../../shared/store/useUsersStore";
import { useEffect } from "react";
import { PATHS } from "../../shared/model/constants/routesConstants";

export default function PrivateRoute() {
  const { tokensData, getUser, userProfile } = useUsersStore();

  useEffect(() => {
    if (!tokensData?.access_token || !userProfile) {
       getUser();
    }
  }, [getUser, tokensData?.access_token, userProfile]);


  if (!tokensData?.access_token) {
    return <Navigate to={PATHS.AUTH_ROUTE} />;
  }

  return <Outlet/>
}
