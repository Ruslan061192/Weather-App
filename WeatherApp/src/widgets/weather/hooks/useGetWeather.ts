import { useWeatherStore } from '../../../shared/store/useWeatherStore';
import { useEffect } from "react";

interface IUseGetWeather {
    value: string
    // debounceValue: string
    handleOpen: () => void
    handleClose: () => void
    setValue: React.Dispatch<React.SetStateAction<string>>
    setActiveIndex: (activeIndex: number) => void
    setIsKeyboardNavigation: (keyBoardNavigation: boolean) => void
}

export const useGetWeather = ({ 
    // debounceValue,
     value, handleClose, handleOpen, setValue, setActiveIndex, setIsKeyboardNavigation }: IUseGetWeather) => {
    const { getCityData, getWeatherInCity } = useWeatherStore();

    useEffect(() => {
        if (value.length >= 2) {
            getCityData(value);
        } else if ((!value && !value) || value === null) {
            handleClose();
            getWeatherInCity("");
        }
    }, [value, getCityData, getWeatherInCity, handleClose, value]);
    
    // useEffect(() => {
    //     if (debounceValue) {
    //         getCityData(debounceValue);
    //     } else if ((!debounceValue && !value) || debounceValue === null) {
    //         handleClose();
    //         getWeatherInCity("");
    //     }
    // }, [debounceValue, getCityData, getWeatherInCity, handleClose, value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        console.log('useGetWeather handleChange value:', value);

        setValue(value);
        handleOpen();
        setActiveIndex(-1);
        setIsKeyboardNavigation(false);
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        console.log('useGetWeather handleSubmit value:', value);
        
        getWeatherInCity(value);
        setValue("");
    };


    return { handleChange, handleSubmit }

}