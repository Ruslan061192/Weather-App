import { useEffect, useRef, useState } from "react";
import AccordeonMenuContainer from "../../ui/accordeonMenuContainer/AccordeonMenuContainer";

export default function AccordeonMenu() {
  const [activeAccordeonMenu, setActiveAccordeonMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        e.target instanceof Node &&
        !menuRef.current.contains(e.target)
      ) {
        setActiveAccordeonMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleChangeMenu = () => {
    if (activeAccordeonMenu) {
      setActiveAccordeonMenu(false);
    } else {
      setActiveAccordeonMenu(true);
    }
  };

  return (
    <>
      <AccordeonMenuContainer
        activeAccordeonMenu={activeAccordeonMenu}
        menuRef={menuRef}
        handleChangeMenu={handleChangeMenu}
      />
    </>
  );
}
