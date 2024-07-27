import { createSlice } from "@reduxjs/toolkit";

type LoadingState = "idle" | "loading" | "succeeded" | "failed";

export type AuthData = {
  id?: string;
  email?: string;
  username?: string;
  accessToken?: string;
  refreshToken?: string;
  avatar?: string;
  role?: string;
};

export interface AuthState {
  loadingState: LoadingState;
  data: AuthData;
  isSignedIn: boolean;
  isLoaded: boolean;
}

const initialState: AuthState = {
  loadingState: "idle",
  isSignedIn: false,
  isLoaded: false,
  data: {
    accessToken: undefined,
    email: undefined,
    username: undefined,
    avatar: undefined,
    id: undefined,
    role: undefined,
    refreshToken: undefined,
  },
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loadingState = "loading";
      state.isLoaded = false;
      state.isSignedIn = false;
      state.data = {};
    },
    loginSuccess: (state, action) => {
      state.loadingState = "succeeded";
      state.isSignedIn = true;
      state.isLoaded = true;
      state.data = {
        ...action.payload,
      };
    },
    loginFailed: (state) => {
      state.loadingState = "failed";
      state.isSignedIn = false;
      state.isLoaded = true;
      state.data = {};
    },
    logoutStart: (state) => {
      state.loadingState = "loading";
      state.isLoaded = false;
    },
    logoutSuccess: (state) => {
      state.loadingState = "succeeded";
      state.isSignedIn = false;
      state.isLoaded = true;
      state.data = {};
    },
    logoutFailed: (state) => {
      state.loadingState = "failed";
      state.isSignedIn = false;
      state.isLoaded = true;
      state.data = {};
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = AuthSlice.actions;

export default AuthSlice.reducer;
