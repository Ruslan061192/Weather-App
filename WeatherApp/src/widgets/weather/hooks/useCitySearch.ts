import { RefObject, useEffect } from "react";
import { useWeatherStore } from "../../../shared/store/useWeatherStore";
import { useClickOutside } from "../../../shared/hooks/useClickOutside";


interface IUseCitySearch {
    value: string
    activeIndex: number
    dropdownRef: RefObject<HTMLDivElement>;
    setValue: React.Dispatch<React.SetStateAction<string>>
    handleClose: () => void
    handleOpen: () => void
    setIsKeyboardNavigation: (keyboardNavigation: boolean) => void
    setActiveIndex: (activeIndex: number) => void
}

export const useCitySearch = ({ handleClose, handleOpen,setIsKeyboardNavigation, setActiveIndex, setValue, dropdownRef, value, activeIndex }: IUseCitySearch) => {
    const { getWeatherInCity, city } = useWeatherStore();

    useEffect(() => {
        console.log("useCitySearch useEffect value:", value);
        if (activeIndex >= 0 && city && city[activeIndex]) {
            setValue(city[activeIndex].name);
        }
    }, [activeIndex, city, setValue]);

   useClickOutside(dropdownRef, () => handleClose());

    const handleItemClick = (id: number | undefined) => {
        const elementId = `id:${id}`;
        console.log("useCitySearch Key pressed handleItemClick:", id, elementId);

        getWeatherInCity(elementId);
        setValue("");
        handleClose();
        setIsKeyboardNavigation(false);
    };

    const handleArrowNavigation = (direction: number) => {
        setIsKeyboardNavigation(true);
        handleOpen();
        console.log("useCitySearch Key pressed handleArrowNavigation:", direction);

        let newIndex;

        if (activeIndex === -1) {
            newIndex = direction === 1 ? 0 : city.length - 1;
        } else {
            newIndex = activeIndex + direction;
            if (newIndex < 0) newIndex = city.length - 1;
            if (newIndex >= city.length) newIndex = 0;
        }

        setActiveIndex(newIndex);
        setValue(city[newIndex].name);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!city || city.length === 0) return;

        console.log("useCitySearch Key pressed handleKeyDown:", e.key);

        switch (e.key) {
            case "ArrowDown":
                setIsKeyboardNavigation(true);
                handleArrowNavigation(1);

                break;
            case "ArrowUp":
                setIsKeyboardNavigation(true);
                handleArrowNavigation(-1);

                break;
            case "Enter":
                getWeatherInCity(value);

                if (activeIndex >= 0 && city[activeIndex]) {
                    handleItemClick(city[activeIndex].id);
                }

                break;
            case "Escape":
                handleClose();
                break;
            default:
                setIsKeyboardNavigation(false);
        }
    };

    return { value, city, handleArrowNavigation, handleItemClick, handleKeyDown }
}