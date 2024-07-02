// store/useUserStore.ts
import { create } from "zustand";

interface UserState {
  userName: string;
  userRole: number;
  setUserName: (role: string) => void;
  setUserRole: (name: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userRole: 1,
  userName: "",
  setUserName: (name) => set({ userName: name }),
  setUserRole: (role) => set({ userRole: role }),
}));
