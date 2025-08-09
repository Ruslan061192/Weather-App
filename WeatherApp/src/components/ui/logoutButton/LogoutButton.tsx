import React from "react";
import { useUsersStore } from "../../../core/store/useUsersStore";
import styles from "./styles/index.module.css";

export default function LogoutButton() {
  const { logout } = useUsersStore();
  return (
    <div className={styles.logoutContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonLogout} onClick={logout}>
          <img src="/icons/Logout.svg" alt="logout" />
        </button>
      </div>
      <span>Logout</span>
    </div>
  );
}
