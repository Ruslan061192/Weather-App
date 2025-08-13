import { IAuthSlice } from "../../store/auth/authSlice";
import { WeatherSlice } from "../../store/weather/weatherSlice";

export type LS_STORAGE = WeatherSlice & IAuthSlice