import { AxiosRequestConfig, AxiosResponse } from "axios";
import { WEATHER_URLS } from "../../../shared/model/constants/axiosConstants";
import { IWeather, Location } from "../../../shared/model/types/weatherTypes";
import { weatherInstance } from '../weatherIndex';

export class GetWeatherData {
    static async getWeather(lat: number | null, lon: number | null): Promise<AxiosResponse<IWeather>> {
        const data = weatherInstance.get<IWeather>(`${WEATHER_URLS.FORECAST_DATA_URL}&q=${lat},${lon}&hour&aqi=no`)
        return data;
    }
    static async getCity(location: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Location[]>> {
        const data = weatherInstance.get<Location[]>(`${WEATHER_URLS.SERCH_DATA_URL}&q=${location}&aqi=no`, config);
        return data;
        
    }
    static async getCityWeather(value: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IWeather>> {
        const data = weatherInstance.get<IWeather>(`${WEATHER_URLS.FORECAST_DATA_URL}&q=${value}&aqi=no`, config);
        return data;
    }

}