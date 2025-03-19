"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { AlertState, closeAlertAction } from "@/store/alertSlice";
import CustomAlert from "@/components/ui/CustomAlert";

export default function AuthAlert() {
  const alertState: AlertState = useSelector((state: RootState) => state.alert);
  const { open, content, type } = alertState;
  const dispatch = useDispatch();

  return (
    <CustomAlert
      open={open}
      content={content}
      type={type || "error"}
      onClose={() => dispatch(closeAlertAction())}
    />
  );
}
