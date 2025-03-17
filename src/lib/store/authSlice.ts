import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { getUserByToken } from "../api/services/user";

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
}

interface LoginSuccessAction {
  accessToken: string;
  expiredTime: number;
  id: string;
}

export const loadUserFromLocal = createAsyncThunk(
  'auth/loadUserFromLocal',
  async () => {
    const accessToken = await getCookie('accessToken');
    if (!accessToken) return { accessToken: null };

    const user = await getUserByToken(accessToken);
    return { accessToken, currentUserId: user.id };
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginSuccessAction>) {
      const { accessToken, expiredTime, id } = action.payload;
      if (accessToken) {
        setCookie('accessToken', accessToken, { maxAge: expiredTime });
        state.accessToken = accessToken;
        state.isAuthenticated = true;
        state.currentUserId = id;
      }
    },
    logout(state) {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.currentUserId = null;
      deleteCookie('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserFromLocal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserFromLocal.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.accessToken = action.payload.accessToken
          state.currentUserId = action.payload.currentUserId ?? null
        }
      })
  }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
