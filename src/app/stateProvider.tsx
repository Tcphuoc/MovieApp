"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";

export default function StateProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}
