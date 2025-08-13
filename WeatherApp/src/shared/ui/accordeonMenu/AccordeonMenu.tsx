import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

import styles from "./styles/index.module.scss";
import HomeWeatherButton from "../../../widgets/weather/ui/homeWeatherButton/HomeWeatherButton";
import LogoutButton from "../../../widgets/auth/logoutButton/LogoutButton";
import { SVGIcon } from "../svg-icon/SVGIcon";


export default function AccordeonMenu() {
  const [activeAccordeonMenu, setActiveAccordeonMenu] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(menuRef, () => setActiveAccordeonMenu(false))

  const handleToggleMenu = useCallback(() => {
      setActiveAccordeonMenu(state => !state);
  },[]);

  // Руслан, Зачем menuRef навешан на div с классом accordeonMenuContainer, если он уже есть на родительском div?
  // Можно было бы навесить его на div с классом accordeonMenu,

  return (
    <div ref={menuRef} className={styles.accordeonMenuContainer}>
      <div
        // ref={menuRef}
        className={`${styles.accordeonIcon} ${
          activeAccordeonMenu ? styles.activeMenuIcon : ""
        }`}
        onClick={handleToggleMenu}
      >
        <SVGIcon iconName="AccordeonRight" />
      </div>
      <div
        // ref={menuRef}
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



