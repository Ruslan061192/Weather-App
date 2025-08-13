import { StateCreator } from "zustand";
import { IWeather, Location } from "../../model/types/weatherTypes";
import { GetWeatherData } from "../../../core/axios/services/weatherService";
import { LS_KEYS, Storage } from "../../utils/storage";


const ONE_HOUR = 60 * 60 * 1000;


export interface WeatherSliceState  {
    city: Location[];
    currentWeather: IWeather | null;
    lastUpdate: number | null;
    coords: {
        lat: number | null;
        lon: number | null;
    };
    isLoading: boolean;
    isError: string;
}

export interface  WeatherSliceActions {
    clearCache: () => void;    
    getCityData: (location: string) => Promise<void>;    
    getCurrentCoords: () => Promise<void>;
    getWeatherInCity: (value: string) => Promise<void>;
    getWeather: (lat: number | null, lon: number | null) => Promise<IWeather | null>;
}


export type WeatherSlice = WeatherSliceState & WeatherSliceActions;


export const getWeatherSlice: StateCreator<WeatherSlice, [], [], WeatherSlice> = (set, get) => ({
    city: [],
    currentWeather: null,
    coords: { lat: null, lon: null },
    lastUpdate: null,
    isLoading: false,
    isError: '',

      clearCache: () => {
        Storage.removeFromSS(LS_KEYS.WEATHER_STORAGE);
        set({
            city: [],
            currentWeather: null,
            coords: { lat: null, lon: null },
            lastUpdate: null,
            isLoading: false,
            isError: '',
        });
    },

     getWeatherInCity: async (value) => {
        set({ isLoading: true, isError: '' });

        if (!value.trim()) {
            set({
                isLoading: false,
                // isError: 'Value not trimmed!'
            })
            return
        }
        
        try {
            const responseData = await GetWeatherData.getCityWeather(value);

            console.log('WEATHERSLICE getWeatherInCity --->', value, responseData.data);

            set({
                isLoading: false,
                currentWeather: responseData.data,
            });
        } catch (error) {
            set({
                isLoading: false,
                isError: `City not found! Value: ${value}`
            })
            console.log(error);
        }
    },

    getCityData: async (location: string) => {
        set({ isLoading: true, isError: '' });
    if (!location.trim()) {
        console.log('WEATHERSLICE getCityData --->', location);
        set({
            isLoading: false,
            // isError: 'Value not trimmed!'
        })
    }

    const controller = new AbortController();
    
    try {
      const signal = controller.signal;

      const responseCity = await GetWeatherData.getCity(location, {
        signal,
      });

      set({
        isLoading: false,
        city: responseCity.data
      });
    } catch (error) {
      controller.abort()
      set({
        isLoading: false,
        isError: `City not found! Value: ${location}`
    })
    }
  },
  
    getWeather: async (lat = 55.751, lon = 37.618) => {
        console.log('WEATHERSLICE getWeather --->', lat, lon);

        set({ isLoading: true, isError: '' });
        
        const state = get();

        try {
            const responseLocation = await GetWeatherData.getWeather(lat, lon);

            set({
                currentWeather: state.currentWeather && state.lastUpdate && Date.now() - state.lastUpdate < ONE_HOUR ? state.currentWeather : responseLocation.data,
                lastUpdate: Date.now(),
                isLoading: false,
            });
            return responseLocation.data;
        } catch (error) {
            set({ isLoading: false, isError: "City is not found!" });
            console.log(error);
            return null;
        }
    },

    getCurrentCoords: async () => {
        console.log('WEATHERSLICE getCurrentCoords --->');

        set({ isLoading: true, isError: '' });

        try {
            // const position = await new Promise<GeolocationPosition>(
            //     (resolve, reject) => {
            //         navigator.geolocation.getCurrentPosition(resolve, reject);
            //     }
            // );
            // const lat = 55.751244;
            // const lon = 37.618423;

            const currentData = await GetWeatherData.getWeather(
                55.7,
                37.6,
                // position.coords.latitude,
                // position.coords.longitude
            );

            set({
                currentWeather: currentData.data,
                coords: {
                    lat: 55.7,
                    lon: 37.6,
                    // lat: position.coords.latitude,
                    // lon: position.coords.longitude,
                },
                isLoading: false,
            });
        } catch (error: unknown) {
            set({
                isError: error instanceof Error ? error.message : "Unknown message!",
                isLoading: false,
            });
        }
    },
})