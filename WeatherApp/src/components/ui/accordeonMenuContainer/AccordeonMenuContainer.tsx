import styles from "./styles/index.module.css";
import HomeWeatherButton from "../homeWeatherButton/HomeWeatherButton";
import LogoutButton from "../logoutButton/LogoutButton";

interface IAccordeonMenuContainer {
  activeAccordeonMenu: boolean;

  menuRef?: React.Ref<HTMLDivElement>;
  handleChangeMenu: () => void;
}

export default function AccordeonMenuContainer({
  activeAccordeonMenu,
  menuRef,
  handleChangeMenu,
}: IAccordeonMenuContainer) {
  return (
    <div ref={menuRef} className={styles.accordeonMenuContainer}>
      <div
        ref={menuRef}
        className={`${styles.accordeonIcon} ${
          activeAccordeonMenu ? styles.activeMenuIcon : ""
        }`}
        onClick={handleChangeMenu}
      >
        <img src="/icons/AccordeonRight.svg" alt="" />
      </div>
      <div
        ref={menuRef}
        className={`${styles.accordeonMenu} ${
          activeAccordeonMenu ? styles.activeAccordeonMenu : ""
        }`}
      >
        <LogoutButton />
        <HomeWeatherButton />
      </div>
    </div>
  );
}
