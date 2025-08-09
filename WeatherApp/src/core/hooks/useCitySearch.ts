import { RefObject, useEffect } from "react";
import { useWeatherStore } from "../store/useWeatherStore";




interface IUseCitySearch {
    setValue: (value: string) => void
    setIsOpen: (isOpen: boolean) => void
    setIsKeyboardNavigation: (keyboardNavigation: boolean) => void
    setActiveIndex: (activeIndex: number) => void
    dropdownRef: RefObject<HTMLDivElement>;

    activeIndex: number
    value: string


}

export const useCitySearch = ({ setIsOpen, setIsKeyboardNavigation, setActiveIndex, setValue, dropdownRef, value, activeIndex }: IUseCitySearch) => {
    const { getWeatherInCity, city } = useWeatherStore();

    useEffect(() => {
        if (activeIndex >= 0 && city && city[activeIndex]) {
            setValue(city[activeIndex].name);
        }
    }, [activeIndex, city, setValue]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (
                dropdownRef.current &&
                e.target instanceof Node &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    });

    const handleItemClick = (id: number | undefined) => {
        const elementId = `id:${id}`;
        getWeatherInCity(elementId);
        setValue("");
        setIsOpen(false);
        setIsKeyboardNavigation(false);
    };

    const handleArrowNavigation = (direction: number) => {
        setIsKeyboardNavigation(true);
        setIsOpen(true);

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
        if (!city || city.length === 0) return;
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setIsKeyboardNavigation(true);
                handleArrowNavigation(1);

                break;
            case "ArrowUp":
                e.preventDefault();
                setIsKeyboardNavigation(true);
                handleArrowNavigation(-1);

                break;
            case "Enter":
                e.preventDefault();
                getWeatherInCity(value);

                if (activeIndex >= 0 && city[activeIndex]) {
                    handleItemClick(city[activeIndex].id);
                }

                break;
            case "Escape":
                e.preventDefault();
                setIsOpen(false);
                break;
            default:
                setIsKeyboardNavigation(false);
        }
    };

    return { value, city, handleArrowNavigation, handleItemClick, handleKeyDown }
}