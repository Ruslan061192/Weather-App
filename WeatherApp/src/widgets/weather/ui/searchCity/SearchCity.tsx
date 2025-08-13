import { useRef, useState } from "react";

import { useCitySearch } from "../../hooks/useCitySearch";
import { useDebounce } from "../../../../shared/hooks/useDebounce";
import { useGetWeather } from "../../hooks/useGetWeather";
import SearchCityForm from "../searchCityForm/SearchCityForm";
import SearchCityDropdown from "../searchCityDropdown/SearchCityDropdown";
import { useModal } from "../../../../shared/hooks/useModal";

import styles from "././styles/index.module.scss";


export default function SearchCity() {
  const { isOpen, handleOpen, handleClose} = useModal();
  
  const [value, setValue] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { handleItemClick, handleKeyDown } = useCitySearch({
    handleOpen,
    handleClose,
    setValue,
    setActiveIndex,
    setIsKeyboardNavigation,
    dropdownRef,
    value,
    activeIndex,
  });

  // const debounceValue = useDebounce(isKeyboardNavigation ? "" : value, 100);

  const { handleChange, handleSubmit } = useGetWeather({
    // debounceValue,
    value,
    handleClose,
    setValue,
    handleOpen,
    setActiveIndex,
    setIsKeyboardNavigation,
  });

  console.log("SearchCity rendered", value, isOpen);  

  return (
    <div className={styles.formContainer} ref={dropdownRef}>
      <SearchCityForm
        value={value}
        handleOpen={handleOpen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
      />
      {isOpen && value?.length >= 2 && (
        <SearchCityDropdown
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          handleItemClick={handleItemClick}
          setIsKeyboardNavigation={setIsKeyboardNavigation}
        />
      )}
    </div>
  );
}
