import { Button, ButtonProps } from "@mui/material";

export default function CustomButton({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <div className={className}>
      <Button className="w-full" variant="contained" {...props}>
        {children}
      </Button>
    </div>
  );
}
