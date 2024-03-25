import { create } from "zustand";

type UserLoginResponse = {
  userId: string;
  token: string;
  name: string;
  firstName: string;
  matricule: number;
};

type AuthStore = {
  isAuthenticated: boolean;
  user: UserLoginResponse | null;
  login: (user: UserLoginResponse) => void;
  logout: () => void;
};

const storageUser = localStorage.getItem("user");
const initialUser = storageUser ? JSON.parse(storageUser) : null;

const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: initialUser ? true : false,
  user: initialUser ? initialUser : null,

  login: (user: UserLoginResponse) => {
    set({ isAuthenticated: true, user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
