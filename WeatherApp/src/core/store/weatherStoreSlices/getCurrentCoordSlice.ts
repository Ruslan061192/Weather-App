import { StateCreator } from "zustand";
import { GetWeatherData } from "../../axios/services/weatherService";
import { IWeather } from "../../types/weatherTypes";

export interface IGetCurrentCoordsSlice {
    isError: string | null;

    isLoading: boolean;

    currentWeather: IWeather | null;

    coords: {
        lat: number | null;
        lon: number | null;
    };
    getCurrentCoords: () => Promise<void>;

}




export const getCurrentCoordsSlice: StateCreator<IGetCurrentCoordsSlice, [], [], IGetCurrentCoordsSlice> = (set) => ({
    isLoading: false,
    isError: null,
    currentWeather: null,
    coords: { lat: null, lon: null },

    getCurrentCoords: async () => {
        set({ isLoading: true, isError: null });
        try {
            const position = await new Promise<GeolocationPosition>(
                (resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                }
            );

            const currentData = await GetWeatherData.getWeather(
                position.coords.latitude,
                position.coords.longitude
            );

            set({
                currentWeather: currentData.data,
                coords: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                },
                isLoading: false,
            });
        } catch (error: unknown) {
            set({
                isError:
                    error instanceof Error ? error.message : "Unknown message!",
                isLoading: false,
            });
        }
    },

})