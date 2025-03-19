"use client";

import Loading from "@/components/share/Loading";
import { LoadingState } from "@/store/loadingSlice";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function AuthLoading() {
  const { open }: LoadingState = useSelector(
    (state: RootState) => state.loading
  );

  return open && <Loading />;
}
