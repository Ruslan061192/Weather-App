import { StateCreator } from "zustand";
import { GetWeatherData } from "../../axios/services/weatherService";
import { IWeather } from "../../types/weatherTypes";



export interface IGetWeatherInCity {
    currentWeather: IWeather | null;
    getWeatherInCity: (value: string) => Promise<void>;

}



export const getWeatherInCitySlice: StateCreator<IGetWeatherInCity, [], [], IGetWeatherInCity> = (set) => ({
    currentWeather: null,

    getWeatherInCity: async (value) => {
        if (!value) {
            return;
        }
        try {
            const responseData = await GetWeatherData.getCityWeather(value);

            set({
                currentWeather: responseData.data,
            });
        } catch (error) {
            console.log(error);
        }
    },

})