import axios from 'axios';
import { WEATHER_URL } from '../../shared/model/constants/axiosConstants';

export const weatherInstance = axios.create({
    baseURL: WEATHER_URL,
        headers: {
            "Access-Control-Allow-Origin": "*",  
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
        }
})
