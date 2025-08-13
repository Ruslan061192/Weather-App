import axios from "axios";
import { AUTH_URLS, USERS_URL} from "../../shared/model/constants/axiosConstants";
import { AuthTokenResponse } from "../../shared/model/types/userTypes";
import { LS_KEYS, Storage } from "../../shared/utils/storage";
import { PATHS } from "../../shared/model/constants/routesConstants";

export const usersInstance = axios.create({
    baseURL: USERS_URL
})

function isAuthTokenResponse(data: unknown): data is AuthTokenResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'access_token' in data &&
    'refresh_token' in data &&
    typeof data.access_token === 'string' &&
    typeof data.refresh_token === 'string'
  );
}

usersInstance.interceptors.request.use((config) => {
    const storageData = Storage.getFromLS(LS_KEYS.USER_STORE)
    
    if (storageData) {
        if (storageData?.state?.tokensData && isAuthTokenResponse(storageData?.state?.tokensData)) {
            config.headers.Authorization = `Bearer ${storageData.state.tokensData.access_token}`;
        }
    }

    return config;
});

usersInstance.interceptors.response.use(response => {
    return response
},
    async (error) => {
        const originalRequest = error.config;
        
        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            
            try {
                const storageData = Storage.getFromLS(LS_KEYS.USER_STORE);
                
                if (storageData) {
                    const refreshToken = storageData.state?.tokensData?.refresh_token;
                                        
                    if (!refreshToken) {
                        throw new Error("Refresh token ids missing");
                    }

                    const { data } = await axios.post(AUTH_URLS.REFRESH_TOKEN_URL, { refreshToken });
                    
                    const updateUserStore = {
                        ...storageData,
                        state: {
                            ...refreshToken.state, tokensData: {
                                access_token: data.access_token,
                                refresh_token: data.refresh_token || refreshToken
                            }
                        }
                    };

                    Storage.setToLS(LS_KEYS.USER_STORE, JSON.stringify(updateUserStore));
                    originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

                    return usersInstance(originalRequest)
                }
            } catch (error) {
                Storage.removeFromLS(LS_KEYS.USER_STORE);
                const currentUrl = new URL(window.location.href);

                if (currentUrl.pathname !== PATHS.AUTH_ROUTE) {
                    window.location.href = PATHS.AUTH_ROUTE;
                }

                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }

)
