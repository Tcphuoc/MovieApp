'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "@/lib/api/services/auth";
import { ERROR_MSG } from "@/lib/constant/error";
import { login } from "@/lib/store/authSlice";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";

export default function SigninPage() {
  const [errors, setErrors] = useState<{accountError: string, passwordError: string, apiError: string}>({
    accountError: "",
    passwordError: "",
    apiError: "",
  });
  const [data, setData] = useState<{ account: string, password: string }>({
    account: "",
    password: ""
  });
  const dispatch = useDispatch();
  const route = useRouter();

  async function signinHandler(formData: FormData) {
    const account: string = formData.get('account') as string;
    const accountError: string = account.length === 0 ? ERROR_MSG.account : ""

    const password: string = formData.get('password') as string;
    const passwordError: string = password.length === 0 ? ERROR_MSG.password : ""

    setErrors({ accountError, passwordError, apiError: "" });
    setData({ account, password });
    if (accountError || passwordError) return;

    try {
      const result = await signin({ account, password });
      if (!result) throw new Error("No response");

      dispatch(login({ accessToken: result.accessToken }));
      route.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setErrors((prev) => {
          return { ...prev, apiError: "Sign in failed" };
        })
      }
    }
  }

  return <section>
    {errors.apiError && (
      <Modal>
        <p>{ errors.apiError }</p>
      </Modal>
    )}
    <div className="bg-black w-1/3 py-15 px-20 mx-auto rounded-md">
      <h2 className="font-bold">Sign In</h2>
      <form action={signinHandler}>
        <Input
          label="Email or mobile number"
          id="account"
          type="text"
          className="my-5"
          error={errors.accountError}
          defaultValue={data.account}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          className="my-5"
          error={errors.passwordError}
          defaultValue={data.password}
        />
        <Button className="btn-primary w-full p-2 rounded-md my-5" type="submit">Sign in</Button>
      </form>
      <div className="flex">
        <p>New to Movie App?</p>
        <Link className="font-bold text-white ml-2 hover:underline" href="/signup">Sign up now.</Link>
      </div>
    </div>
  </section>
}
