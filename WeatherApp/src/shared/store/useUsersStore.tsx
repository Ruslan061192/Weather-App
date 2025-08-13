import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { authSlice, IAuthSlice  } from "./auth/authSlice";

export type UsersStore = IAuthSlice

export const useUsersStore = create<UsersStore>()(
  persist(
    (...a) => ({...authSlice(...a),}),
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
