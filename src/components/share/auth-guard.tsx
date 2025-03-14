"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { AuthState, loadUserFromLocal } from "@/lib/store/authSlice";
import { useRouter } from "next/navigation";
import Modal from "../ui/modal";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocal());
  }, [dispatch]);

  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, isLoading } = authState;

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      route.replace("/signin");
    }
  }, [isLoading, isAuthenticated, route]);

  if (isLoading) {
    return <>
      <Modal>
        <div className="bg-dark">
          <p>Loading...</p>
        </div>
      </Modal>
      {children}
    </>;
  }

  return <>{children}</>;
}
