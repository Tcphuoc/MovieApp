import { Alert, AlertColor } from "@mui/material";

export default function CustomAlert({
  open,
  content,
  type,
  onClose,
}: {
  open: boolean;
  content: string;
  type: AlertColor;
  onClose: () => void;
}) {
  return (
    open && (
      <Alert severity={type} onClose={onClose}>
        {content}
      </Alert>
    )
  );
}
