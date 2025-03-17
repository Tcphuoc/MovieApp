import { Alert } from "@mui/material";
import { createPortal } from "react-dom";

export default function CustomAlert({
  open,
  content,
  targetId,
  onClose,
}: {
  open: boolean;
  content: string;
  targetId: string;
  onClose: () => void;
}) {
  return (
    open &&
    createPortal(
      <Alert severity="error" onClose={onClose}>
        {content}
      </Alert>,
      document.getElementById(targetId) as HTMLElement
    )
  );
}
