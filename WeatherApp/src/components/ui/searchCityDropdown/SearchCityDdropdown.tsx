import { useRef } from "react";
import { useWeatherStore } from "../../../core/store/useWeatherStore";
import styles from "./styles/index.module.css";

interface ISearchCityDropdown {
  activeIndex: number;
  handleItemClick: (id: number | undefined) => void;
  setActiveIndex: (activeIndex: number) => void;
  setIsKeyboardNavigation: (isKeyboardNavigation: boolean) => void;
}

export default function SearchCityDropdown({
  activeIndex,
  handleItemClick,
  setActiveIndex,
  setIsKeyboardNavigation,
}: ISearchCityDropdown) {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { city } = useWeatherStore();

  return (
    <div className={styles.dropdawnContainer}>
      {city.map((el, index) => (
        <div
          ref={(el) => (itemsRef.current[index] = el)}
          className={`${styles.dropdawnItem} ${
            index === activeIndex ? styles.activeItem : ""
          }`}
          key={el.id}
          id={String(el.id)}
          onClick={() => handleItemClick(el.id)}
          onMouseEnter={() => {
            setActiveIndex(index);
            setIsKeyboardNavigation(true);
          }}
        >
          <span>{el.name}</span>
        </div>
      ))}
    </div>
  );
}
