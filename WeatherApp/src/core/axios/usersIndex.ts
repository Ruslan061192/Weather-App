import axios from "axios";
import { REFRESH_TOKEN_URL, USERS_URL } from "../constants/axiosConstants";



export const usersInstance = axios.create({
    baseURL: USERS_URL
})



usersInstance.interceptors.request.use((config) => {
    const storageData = localStorage.getItem('user-store');
    if (storageData) {
        const { state } = JSON.parse(storageData);
        config.headers.Authorization = `Bearer ${state.tokensData.access_token}`;
    }
    return config;
});






usersInstance.interceptors.response.use(response => {
    return response
},
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const storageData = localStorage.getItem('user-store');
                if (storageData) {
                    const { state } = JSON.parse(storageData);
                    const refreshToken = state?.tokensData?.refresh_token
                    if (!refreshToken) {
                        throw new Error("Refresh  token ids  missing")
                    }
                    const { data } = await axios.post(REFRESH_TOKEN_URL, { refreshToken })
                    const updateUserStore = {
                        ...JSON.parse(storageData),
                        state: {
                            ...state, tokensData: {
                                ...state.tokensData,
                                access_token: data.access_token,
                                refresh_token: data.refresh_token || refreshToken
                            }
                        }
                    }
                    localStorage.setItem("user-store", JSON.stringify(updateUserStore))
                    originalRequest.headers.Authorization = `Bearer ${data.access_token}`
                    return usersInstance(originalRequest)
                }
            } catch (error) {
                localStorage.removeItem('user-store');
                const currentUrl = new URL(window.location.href);

                if (currentUrl.pathname !== '/auth') {
                    window.location.href = '/auth';
                }
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }

)
