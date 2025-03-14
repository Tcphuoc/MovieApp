import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  isLoading: true,
}

interface LoginSuccessAction {
  accessToken: string;
  expiredTime: number;
}

export const loadUserFromLocal = createAsyncThunk(
  'auth/loadUserFromLocal',
  async () => {
    return await getCookie('accessToken');
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginSuccessAction>) {
      const { accessToken, expiredTime } = action.payload;
      if (accessToken) {
        setCookie('accessToken', accessToken, { maxAge: expiredTime });
        state.accessToken = accessToken;
        state.isAuthenticated = true;
      }
    },
    logout(state) {
      state.accessToken = null;
      state.isAuthenticated = false;
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
          state.accessToken = action.payload
        }
      })
  }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
