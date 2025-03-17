import { TextField, styled, TextFieldProps } from "@mui/material";

const WhiteTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
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
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
});

export default function CustomInput({ className, ...props }: TextFieldProps) {
  return <div className={className}>
    <WhiteTextField {...props} name={props.id} className="w-full" variant="outlined" />
  </div>
}
