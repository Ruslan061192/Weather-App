import { StateCreator } from "zustand";
import { AuthTokenResponse, IUser, IUserAuth } from "../../types/userTypes";
import { userProfile } from "../../constants/userConstants";
import { tokensData } from "../../constants/storeConstants";
import { UsersService } from "../../axios/services/usersService";


export interface ILoginSlice {

    isLoading: boolean;
    userProfile: IUser;
    tokensData: AuthTokenResponse;
    isAuth: string;

    login: (data: IUserAuth) => Promise<void>;
}



export const loginLSice: StateCreator<ILoginSlice, [], [], ILoginSlice> = (set) => ({
    isLoading: false,
    userProfile,
    tokensData,
    isAuth: "Authorization",

    login: async (data) => {
        set({ isLoading: true, isAuth: "" });
        try {
            const response = await UsersService.authorization(data);

            if (!response.data.access_token) {
                return;
            }
            const responseProfile = await UsersService.getProfile();
            await UsersService.checkAuth({ email: responseProfile.data.email });
            set({
                userProfile: responseProfile.data,
                isAuth: "Authorization",
                tokensData: response.data,
                isLoading: false,
            });
        } catch (error) {
            set({
                tokensData: tokensData,
                isAuth: "Registration",
                isLoading: false,
            });
        }
    },
})