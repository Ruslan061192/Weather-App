import { useUsersStore } from "../../../shared/store/useUsersStore";
import styles from "./styles/index.module.scss";
import { SVGIcon } from "../../../shared/ui/svg-icon/SVGIcon";

export default function LogoutButton() {
  const { logout } = useUsersStore();

  return (
    <div className={styles.logoutContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonLogout} onClick={logout}>
          <SVGIcon iconName="Logout" />
        </button>
      </div>
      <span>Logout</span>
    </div>
  );
}
