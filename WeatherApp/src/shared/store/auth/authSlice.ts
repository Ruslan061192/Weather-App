import { StateCreator } from "zustand";
import { AuthTokenResponse, IUser, IUserAuth } from "../../model/types/userTypes";
import { UsersService } from "../../../core/axios/services/usersService";

// const a = {
//     "state":
//     {"tokensData":
//         {
//             "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI5MiwiaWF0IjoxNzU1MDI3NTc0LCJleHAiOjE3NTY3NTU1NzR9.rPlJffLuuxTvQlwggixApvTS7K0ZC3qm22Bm_NZdVVI",
//             "refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI5MiwiaWF0IjoxNzU1MDI3NTc0LCJleHAiOjE3NTUwNjM1NzR9.Et_iaFLc5zOEo8dgR2aSsMLoJ4frkEA4l6Nlq93-cVA"
//         },
//     "userProfile":{
//         "id":292,
//         "email":"aaa@ya.ru",
//         "password":"aaaa",
//         "name":"aaa",
//         "role":"customer",
//         "avatar":"https://i.imgur.com/LDOO4Qs.jpg",
//         "creationAt":"2025-08-12T19:39:34.000Z",
//         "updatedAt":"2025-08-12T19:39:34.000Z"
//     }},"version":0}

export interface IAuthSliceState {
    isLoading: boolean;
    userProfile: IUser | null;
    tokensData: AuthTokenResponse | null;
    isAuth: boolean;
}
export interface IAuthSliceActions {
    register: (dataReg: IUserAuth) => Promise<void>;
    logout: () => void;
    login: (data: IUserAuth) => Promise<void>;
    getUser: () => Promise<void>;
}

export type IAuthSlice = IAuthSliceState & IAuthSliceActions


export const authSlice: StateCreator<IAuthSlice, [], [], IAuthSlice> = (set) => ({
    isLoading: false,
    userProfile: null,
    tokensData: null,
    isAuth: false,
    
    register: async (dataReg) => {
        set({ isLoading: true });

        try {
            const registerResponse = await UsersService.registration(dataReg);

            const authResponse = await UsersService.authorization({
                email: registerResponse.data.email,
                password: registerResponse.data.password,
            });
            
            set({
                userProfile: registerResponse.data,
                tokensData: authResponse.data,
                isAuth: true,
                isLoading: false,
            });
        } catch (error) {
            set({ isLoading: false })
            console.log(error);
        }
    },

     logout: () => {
        set({
            isAuth: false,
            isLoading: false,
            tokensData: null,
            userProfile: null,
        });
    },

    getUser: async () => {
        try {
            const response = await UsersService.getProfile();

            set({
                userProfile: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    },
    login: async (data) => {
        set({ isLoading: true });
        try {
            const response = await UsersService.authorization(data);

            if (!response.data.access_token) {
                return;
            }
            
            const responseProfile = await UsersService.getProfile();
            await UsersService.checkAuth({ email: responseProfile.data.email });

            set({
                userProfile: responseProfile.data,
                isAuth: true,
                tokensData: response.data,
                isLoading: false,
            });
        } catch (error) {
            set({
                tokensData: null,
                isAuth: false,
                isLoading: false,
            });
        }
    },
})