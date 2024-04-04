import { createSlice } from "@reduxjs/toolkit";

type UserLoginResponse = {
  userId: string;
  token: string;
  name: string;
  firstName: string;
  matricule: number;
};

type AuthState = {
  isAuthenticated: boolean;
  user: UserLoginResponse | null;
};

const storageUser = localStorage.getItem("authInfo");
const initialUser: UserLoginResponse = storageUser
  ? JSON.parse(storageUser)
  : null;

const initialState: AuthState = {
  isAuthenticated: initialUser ? true : false,
  user: initialUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      localStorage.setItem("authInfo", JSON.stringify(user));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("authInfo");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
