"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { AuthState, loadUserFromLocal } from "@/lib/store/authSlice";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const pathName = usePathname();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocal());
  }, [dispatch, pathName]);

  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, isLoading } = authState;

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      route.replace("/signin");
    }
  }, [isLoading, isAuthenticated, route]);

  return <>
    {children}
  </>;
}
