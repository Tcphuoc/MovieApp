import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { getCurrentUser } from "../lib/api/user.api";

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  currentUserId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  isLoading: true,
  currentUserId: null,
};

interface LoginSuccessAction {
  accessToken: string;
  expiredTime: number;
  id: string;
}

export const loadUserFromLocalAction = createAsyncThunk(
  "auth/loadUserFromLocalAction",
  async () => {
    try {
      const accessToken = await getCookie("accessToken");
      if (!accessToken) return { accessToken: null };

      const user = await getCurrentUser();
      return { accessToken, currentUserId: user?.id };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return { accessToken: null };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction(state, action: PayloadAction<LoginSuccessAction>) {
      const { accessToken, expiredTime, id } = action.payload;
      if (accessToken) {
        setCookie("accessToken", accessToken, { maxAge: expiredTime });
        state.accessToken = accessToken;
        state.isAuthenticated = true;
        state.currentUserId = id;
      }
    },
    logoutAction(state) {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.currentUserId = null;
      deleteCookie("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserFromLocalAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserFromLocalAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = !!action.payload.accessToken;
        state.accessToken = action.payload.accessToken;
        state.currentUserId = action.payload.currentUserId ?? null;
      });
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
