import { redirect, useNavigate } from "react-router-dom";
import { useUsersOperationStore } from "../../../shared/store/useUsersStore";
import { AUTH_ROUTE, ERROR_ROUTE, HOME_ROUTE, MAIN } from "../../../shared/model/constants/routesConstants";
import { FC } from "react";



function isPublicRoute(path: string) {
  return [MAIN, ERROR_ROUTE].includes(path);
}

export const isAuthenticated = () => {
  // Получаем токен из localStorage напрямую
  // const authData = localStorage.getItem("user-store");
  //     const { state } = JSON.parse(authData);
  const { tokensData } = useUsersOperationStore.getState();
  if (!tokensData.access_token) {
    return redirect(AUTH_ROUTE)
  }

  return null
}





