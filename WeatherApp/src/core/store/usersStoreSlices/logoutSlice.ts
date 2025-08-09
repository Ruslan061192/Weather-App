import { StateCreator } from "zustand";
import { AuthTokenResponse, IUser } from "../../types/userTypes";
import { userProfile } from "../../constants/userConstants";
import { tokensData } from "../../constants/storeConstants";




export interface ILogoutSlice {

    userProfile: IUser;
    tokensData: AuthTokenResponse;

    logout: () => void;
}




export const logoutSlice: StateCreator<ILogoutSlice, [], [], ILogoutSlice> = (set) => ({
    userProfile,
    tokensData,

    logout: () => {
        set({
            userProfile,

            tokensData: { access_token: "", refresh_token: "" },
        });
    },
})

