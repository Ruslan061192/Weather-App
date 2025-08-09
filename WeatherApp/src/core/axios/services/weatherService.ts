import { AxiosRequestConfig, AxiosResponse } from "axios";
import { CURRENT_DATA_URL, FORECAST_DATA_URL, SERCH_DATA_URL } from "../../constants/axiosConstants";
import { IWeather, RootWeatherResponse, Location } from "../../types/weatherTypes";
import { weatherInstance } from '../weatherIndex';
import { ResponseLocation } from "../../types/weatherSearchType";




export class GetWeatherData {
    static async getWeather(lat: number | null, lon: number | null): Promise<AxiosResponse<IWeather>> {
        return weatherInstance.get<IWeather>(`${FORECAST_DATA_URL}&q=${lat},${lon}&hour&aqi=no`)
    }
    static async getCity(location: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Location[]>> {
        return weatherInstance.get<Location[]>(`${SERCH_DATA_URL}&q=${location}&aqi=no`, config)
    }
    static async getCityWeather(value: string, config?: AxiosRequestConfig): Promise<AxiosResponse<RootWeatherResponse>> {
        return weatherInstance.get<RootWeatherResponse>(`${FORECAST_DATA_URL}&q=${value}&aqi=no`, config)
    }

}