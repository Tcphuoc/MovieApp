"use client";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function CustomDatePicker({
  disableFuture,
  errorMessage,
  defaultValue,
}: {
  disableFuture: boolean;
  errorMessage?: string;
  defaultValue: dayjs.Dayjs;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Basic date picker"
        name=""
        sx={{
          "& .MuiFormLabel-root": {
            color: "white",
          },
          "& .MuiFormLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiInputBase-root": {
            color: "white",
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
          "& .MuiFormHelperText-root": {
            color: "var(--primary-color)",
          },
        }}
        disableFuture={disableFuture}
        slotProps={{
          textField: {
            helperText: errorMessage,
            error: !!errorMessage,
          },
        }}
        value={defaultValue}
      />
    </LocalizationProvider>
  );
}
