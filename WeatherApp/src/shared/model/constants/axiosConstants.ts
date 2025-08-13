const  API_KEY = import.meta.env.VITE_API_KEY;
// 'b2454e4309ff4b37ac5122134253005'

export const USERS_URL: string = "https://api.escuelajs.co/api/v1"
export const WEATHER_URL: string = 'https://api.weatherapi.com/v1'

export const WEATHER_URLS = {
    FORECAST_DATA_URL: `/forecast.json?key=${API_KEY}`,
    SERCH_DATA_URL:  `/search.json?key=${API_KEY}`
};

export const AUTH_URLS = {
    USER_AUTHORIZATION_URL: "/auth/login",
    GET_USER_PROFILE_URL: "/auth/profile",
    CHECK_USER_AUTH:  "/users/is-available",
    CREATE_USER:  "/users/",
    REFRESH_TOKEN_URL:  `${USERS_URL}/auth/refresh-token`,
}

// https://api.escuelajs.co/api/v1/users/
