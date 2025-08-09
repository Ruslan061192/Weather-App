import { StateCreator } from "zustand";
import { GetWeatherData } from "../../axios/services/weatherService";
import { Location } from "../../types/weatherTypes";




export interface IGetCityDataSlice {
  city: Location[];
  isError: string | null;

  getCityData: (location: string) => Promise<void>;

}



export const getCityDataSlice: StateCreator<IGetCityDataSlice, [], [], IGetCityDataSlice> = (set) => ({

  city: [],
  isError: null,

  getCityData: async (location) => {
    if (!location.trim()) return;
    try {
      const controller = new AbortController();
      const signal = controller.signal;

      const responseCity = await GetWeatherData.getCity(location, {
        signal,
      });

      set({
        city: responseCity.data
      });
    } catch (error) {
      set({ isError: "City is not found!" });
    }
  },

})