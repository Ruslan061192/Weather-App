import { useUsersStore } from "../../core/store/useUsersStore";

import styles from "./styles/index.module.css";
import { Authentication } from "../../components/shared/authentication/Authentication";
import { Registration } from "../../components/shared/registration/Registration";
import AuthSpinner from "../../components/ui/spinners/authSpinner/AuthSpinner";

export default function AuthPage() {
  const { isAuth, isLoading } = useUsersStore();

  return (
    <div className={styles.wrap}>
      <div className={styles.authForms}>
        {isLoading && <AuthSpinner />}
        {isAuth === "Registration" && <Registration />}
        {isAuth === "Authorization" && <Authentication />}
      </div>
    </div>
  );
}
