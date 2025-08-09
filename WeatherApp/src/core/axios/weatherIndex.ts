import axios from 'axios';
import { WEATHER_URL } from '../constants/axiosConstants';




export const weatherInstance = axios.create({
    baseURL: WEATHER_URL
})