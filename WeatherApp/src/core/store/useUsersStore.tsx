import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ILoginSlice, loginLSice } from "./usersStoreSlices/loginSlice";
import {
  IRegisterSlice,
  registerSlice,
} from "./usersStoreSlices/registerSlice";
import { getUserSlice, IGetUserSlice } from "./usersStoreSlices/getUserSlice";
import { ILogoutSlice, logoutSlice } from "./usersStoreSlices/logoutSlice";

export type UsersStore = ILoginSlice &
  IRegisterSlice &
  IGetUserSlice &
  ILogoutSlice;

export const useUsersStore = create<UsersStore>()(
  persist(
    (...a) => ({
      ...loginLSice(...a),
      ...registerSlice(...a),
      ...getUserSlice(...a),
      ...logoutSlice(...a),
    }),

    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tokensData: state.tokensData,
        userProfile: state.userProfile,
      }),
    }
  )
);
