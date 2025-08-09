import { StateCreator } from "zustand";
import { UsersService } from "../../axios/services/usersService";
import { userProfile } from "../../constants/userConstants";
import { tokensData } from "../../constants/storeConstants";
import { AuthTokenResponse, IUser, IUserAuth } from "../../types/userTypes";




export interface IRegisterSlice {
    isLoading: boolean;
    userProfile: IUserAuth;
    tokensData: AuthTokenResponse;
    isAuth: string;

    register: (dataReg: IUserAuth) => Promise<void>;
}



export const registerSlice: StateCreator<IRegisterSlice, [], [], IRegisterSlice> = (set) => ({

    isLoading: false,
    userProfile,
    tokensData,
    isAuth: "Authorization",

    register: async (dataReg) => {
        set({ isLoading: true, isAuth: "" });

        try {
            const registerResponse = await UsersService.registration(dataReg);

            const authResponse = await UsersService.authorization({
                email: registerResponse.data.email,
                password: registerResponse.data.password,
            });
            set({
                userProfile: registerResponse.data,
                tokensData: authResponse.data,
                isAuth: "Authorization",
                isLoading: false,
            });
        } catch (error) {
            console.log(error);
        }
    },
})