import { StateCreator } from "zustand";
import { IWeather } from "../../types/weatherTypes";




export interface IClearCacheSlice {
    coords: {
        lat: number | null;
        lon: number | null;
    };
    currentWeather: IWeather | null;
    lastUpdate: number | null;

    clearCache: () => void;


}



export const clearCacheSlice: StateCreator<IClearCacheSlice, [], [], IClearCacheSlice> = (set) => ({

    coords: { lat: null, lon: null },
    currentWeather: null,
    lastUpdate: null,

    clearCache: () => {
        sessionStorage.removeItem("weather-storage");
        set({
            currentWeather: null,
            lastUpdate: null,
            coords: {
                lat: null,
                lon: null,
            },
        });
    },
})