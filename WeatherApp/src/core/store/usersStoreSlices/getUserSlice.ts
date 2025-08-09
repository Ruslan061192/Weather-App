import { StateCreator } from 'zustand';
import { UsersService } from '../../axios/services/usersService';
import { userProfile } from '../../constants/userConstants';
import { IUser } from '../../types/userTypes';






export interface IGetUserSlice {
    userProfile: IUser;

    getUser: () => Promise<void>;
}



export const getUserSlice: StateCreator<IGetUserSlice, [], [], IGetUserSlice> = (set) => ({
    userProfile,

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
})