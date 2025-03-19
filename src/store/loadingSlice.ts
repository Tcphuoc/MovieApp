import { createSlice } from "@reduxjs/toolkit";

export interface LoadingState {
  open: boolean;
}

const initialState: LoadingState = {
  open: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    openLoading(state) {
      state.open = true;
    },
    closeLoading(state) {
      state.open = false;
    },
  },
});

export default loadingSlice.reducer;
export const { openLoading, closeLoading } = loadingSlice.actions;
