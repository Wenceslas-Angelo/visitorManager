import { create } from "zustand";
import { authApi } from "../API/auth";
import { AuthType } from "../types";

type AuthStore = {
  isAuthenticated: boolean;
  user: { userId: string; token: string } | null;
  errorMsg: string | null;
  signUpIsSuccess: boolean;
  successMsg: string | null;
  login: (matricule: string, password: string) => void;
  logout: () => void;
  signup: (userData: AuthType) => void;
};

const storageUser = localStorage.getItem("user");
const initialUser = storageUser ? JSON.parse(storageUser) : null;

const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: initialUser ? true : false,
  user: initialUser ? initialUser : null,
  errorMsg: null,
  successMsg: null,
  signUpIsSuccess: false,
  signup: async (userData: AuthType) => {
    try {
      set({ errorMsg: null, signUpIsSuccess: false });
      const response = await authApi.signup(userData);
      if (response.message) {
        set({ successMsg: response.message, signUpIsSuccess: true });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ errorMsg: error.message });
    }
  },
  login: async (matricule: string, password: string) => {
    try {
      set({ errorMsg: null });
      const user = await authApi.login(matricule, password);

      if (user) {
        set({ isAuthenticated: true, user });
        set({ successMsg: "You are logged in successfully!" });
        localStorage.setItem("user", JSON.stringify(user));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ errorMsg: error.message });
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
