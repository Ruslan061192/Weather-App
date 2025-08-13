import { redirect } from "react-router";
import { useUsersOperationStore } from "../../../shared/store/useUsersStore";
import { AUTH_ROUTE, HOME_ROUTE, MAIN } from "../../../shared/model/constants/routesConstants";



export const publicLoader = () => {
    const { tokensData } = useUsersOperationStore.getState();
    if (!tokensData.access_token && window.location.pathname === MAIN) {
        return redirect(AUTH_ROUTE)
    }

    return null;
}