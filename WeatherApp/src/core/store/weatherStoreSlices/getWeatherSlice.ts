import { StateCreator } from "zustand";
import { IWeather } from "../../types/weatherTypes";
import { GetWeatherData } from "../../axios/services/weatherService";



export interface IGetWeatherSlice {
    isLoading: boolean;
    currentWeather: IWeather | null;
    lastUpdate: number | null;
    getWeather: (lat: number | null, lon: number | null) => Promise<IWeather | null>;

}



export const getWeatherSlice: StateCreator<IGetWeatherSlice, [], [], IGetWeatherSlice> = (set, get) => ({
    isLoading: false,
    currentWeather: null,
    lastUpdate: null,

    getWeather: async (lat, lon) => {
        const { currentWeather, lastUpdate } = get();
        const oneHour = 60 * 60 * 1000;
        if (currentWeather && lastUpdate && Date.now() - lastUpdate < oneHour) {
            return currentWeather;
        }

        set({ isLoading: true });
        try {
            const responseLocation = await GetWeatherData.getWeather(lat, lon);

            set({
                currentWeather: responseLocation.data,
                lastUpdate: Date.now(),
                isLoading: false,
            });
            return responseLocation.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
})