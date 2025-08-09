import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  getCurrentCoordsSlice,
  IGetCurrentCoordsSlice,
} from "./weatherStoreSlices/getCurrentCoordSlice";
import {
  getCityDataSlice,
  IGetCityDataSlice,
} from "./weatherStoreSlices/getCityDataSlice";
import {
  getWeatherSlice,
  IGetWeatherSlice,
} from "./weatherStoreSlices/getWeatherSlice";
import {
  getWeatherInCitySlice,
  IGetWeatherInCity,
} from "./weatherStoreSlices/getWeatherInCitySlice";
import {
  clearCacheSlice,
  IClearCacheSlice,
} from "./weatherStoreSlices/clearCacheSlice";

export type WeatherStore = IGetCurrentCoordsSlice &
  IGetCityDataSlice &
  IGetWeatherSlice &
  IGetWeatherInCity &
  IClearCacheSlice;

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (...a) => ({
      ...getCurrentCoordsSlice(...a),
      ...getCityDataSlice(...a),
      ...getWeatherSlice(...a),
      ...getWeatherInCitySlice(...a),
      ...clearCacheSlice(...a),
    }),
    {
      name: "weather-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        weatherData: state.currentWeather,
        lastUpdate: state.lastUpdate,
        coords: state.coords,
      }),
    }
  )
);
