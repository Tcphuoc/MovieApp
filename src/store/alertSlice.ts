import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

export interface AlertState {
  content: string;
  open: boolean;
  type?: AlertColor;
}

const initialState: AlertState = {
  content: "",
  open: false,
};

interface ShowAlertAction {
  content: string;
  type?: AlertColor;
}

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlertAction(state, action: PayloadAction<ShowAlertAction>) {
      state.open = true;
      state.content = action.payload.content;
      state.type = action.payload.type;
    },
    closeAlertAction(state) {
      state.open = false;
      state.content = "";
      state.type = undefined;
    },
  },
});

export default alertSlice.reducer;
export const { showAlertAction, closeAlertAction } = alertSlice.actions;
