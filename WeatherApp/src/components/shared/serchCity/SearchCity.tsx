import { useRef, useState } from "react";
import styles from "././styles/index.module.css";
import { useDebounce } from "../../../core/hooks/useDebounce";
import { useCitySearch } from "../../../core/hooks/useCitySearch";
import SearchCiityForm from "../../ui/searchCityForm/SearchCityForm";
import SearchCityDropdown from "../../ui/searchCityDropdown/SearchCityDdropdown";
import { useGetWeather } from "../../../core/hooks/useGetWeather";

export default function SearchCity() {
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { handleItemClick, handleKeyDown } = useCitySearch({
    setIsOpen,
    setIsKeyboardNavigation,
    setActiveIndex,
    setValue,
    dropdownRef,
    value,
    activeIndex,
  });

  const debounce = useDebounce(isKeyboardNavigation ? "" : value, 100);

  const { handleChange, handleSubmit } = useGetWeather({
    debounce,
    value,
    setIsOpen,
    setValue,
    setActiveIndex,
    setIsKeyboardNavigation,
  });

  return (
    <div className={styles.formContainer} ref={dropdownRef}>
      <SearchCiityForm
        handleKeyDown={handleKeyDown}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        setIsOpen={setIsOpen}
      />
      {isOpen && value?.length >= 2 && (
        <SearchCityDropdown
          activeIndex={activeIndex}
          handleItemClick={handleItemClick}
          setActiveIndex={setActiveIndex}
          setIsKeyboardNavigation={setIsKeyboardNavigation}
        />
      )}
    </div>
  );
}
