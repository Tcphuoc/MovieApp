"use client";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface DatePickerProps extends React.HTMLAttributes<HTMLInputElement> {
  disableFuture: boolean;
  errorMessage: string;
  label: string;
  name: string;
  defaultValue: string;
};

export default function CustomDatePicker({
  disableFuture,
  errorMessage,
  defaultValue,
  label,
  name,
  className,
}: DatePickerProps) {
  return (
    <div className={className}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          name={name}
          className="w-full"
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
          value={dayjs(defaultValue)}
        />
      </LocalizationProvider>
    </div>
  );
}
