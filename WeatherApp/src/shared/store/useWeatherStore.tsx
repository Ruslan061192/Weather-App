import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getWeatherSlice, WeatherSlice } from "./weather/weatherSlice";

export type WeatherStore = WeatherSlice

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (...a) => ({
      ...getWeatherSlice(...a),
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
