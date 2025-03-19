"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { AlertState, closeAlertAction } from "@/store/alertSlice";
import { useEffect } from "react";
import { Alert } from "@mui/material";

export default function CustomAlert() {
  const alertState: AlertState = useSelector((state: RootState) => state.alert);
  const { open, content, type } = alertState;
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(closeAlertAction());
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, open]);

  return (
    open && (
      <Alert severity={type} onClose={() => dispatch(closeAlertAction())}>
        {content}
      </Alert>
    )
  );
}
