import { create } from "zustand";
import { AuthType } from "../types";

type AuthStore = {
  isAuthenticated: boolean;
  user: AuthType | null;
  login: (matricule: string, password: string) => void;
  logout: () => void;
  register: (userData: AuthType) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  register: (userData: AuthType) => {
    console.log(userData);
  },
  login: (matricule: string, password: string) => {
    console.log(matricule);
    console.log(password);
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
