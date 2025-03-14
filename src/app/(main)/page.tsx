"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { getUser } from "@/lib/api/services/user";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { AuthState } from "@/lib/store/authSlice";

export default function Home() {
  const [user, setUser] = useState<User>();
  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const { accessToken } = authState;

  useEffect(() => {
    async function fetchData() {
      if (accessToken) {
        const data = await getUser(accessToken);
        setUser(data.user);
      }
    }
    fetchData();
  }, [accessToken])

  return (
    <section>
      <h1>{ user?.email }</h1>
    </section>
  );
}
