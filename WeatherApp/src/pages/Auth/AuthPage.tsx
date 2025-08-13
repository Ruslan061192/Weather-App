import { useUsersStore } from "../../shared/store/useUsersStore";

import styles from "./styles/index.module.scss";
import { Authentication } from "../../widgets/auth/authentication/Authentication";
import { Registration } from "../../widgets/auth/registration/Registration";
import AuthSpinner from "../../shared/ui/loaders/authSpinner/AuthSpinner";

export default function AuthPage() {
  const state = useUsersStore();

  // console.log('AuthPage: ', state.isAuth, state.isLoading);

  return (
    <div className={styles.wrap}>
      <div className={styles.authForms}>
        SOMETHING
        {state.isLoading && <AuthSpinner />}
        {!state.isAuth && <Registration />}
        {state.isAuth && <Authentication />}
      </div>
    </div>
  );
}

