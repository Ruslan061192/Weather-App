import { useWeatherStore } from '../store/useWeatherStore';
import { useEffect } from "react";



interface IUseGetWeather {
    debounce: string
    value: string
    setIsOpen: (isOpen: boolean) => void
    setValue: (valie: string) => void
    setActiveIndex: (activeIndex: number) => void
    setIsKeyboardNavigation: (keyBoardNavigation: boolean) => void
}



export const useGetWeather = ({ debounce, value, setIsOpen, setValue, setActiveIndex, setIsKeyboardNavigation }: IUseGetWeather) => {
    const { getCityData, getWeatherInCity } = useWeatherStore();

    useEffect(() => {
        if (debounce) {
            getCityData(debounce);
        } else if ((!debounce && !value) || debounce === null) {
            setIsOpen(false);
            getWeatherInCity("");
        }
    }, [debounce, getCityData, getWeatherInCity, setIsOpen, value]);
    console.log(debounce);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValue(value);
        setIsOpen(true);
        setActiveIndex(-1);
        setIsKeyboardNavigation(false);
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        getWeatherInCity(value);
        setValue("");
    };


    return { handleChange, handleSubmit }

}