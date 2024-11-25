// import { create } from "zustand";
// import { UserType } from "../interfaces";

// export interface UserStoreType {
//   currentUser: UserType | null;
//   setCurrentUser: (user: UserType) => void;
//   updateUser: (updatedUser: Partial<UserType>) => void;
// }

// const userGlobalStore = create((set) => ({
//   currentUser: null,
//   setCurrentUser: (user: UserType) => set({ currentUser: user }),
//   updatedUser: (updatedUser: Partial<UserType>) =>
//     set((state: UserStoreType) => ({
//       currentUser: { ...state.currentUser, ...updatedUser },
//     })),
// }));

// export default userGlobalStore;

import { create } from "zustand";
import { UserType } from "../interfaces";

export interface UserStoreType {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType) => void;
  updateUser: (updatedUser: Partial<UserType>) => void;
}

const userGlobalStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (user: UserType) => set({ currentUser: user }),
  updateUser: (updatedUser: Partial<UserType>) =>
    set((state: UserStoreType) => ({
      currentUser: { ...state.currentUser, ...updatedUser },
    })),
}));

export default userGlobalStore;
