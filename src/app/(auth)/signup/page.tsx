'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/lib/api/services/auth";
import { ERROR_MSG } from "@/lib/constant/error";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Alert from "@/components/ui/alert";

export default function SignupPage() {
  const [errors, setErrors] = useState<{
    firstNameError: string,
    lastNameError: string,
    accountError: string,
    passwordError: string,
    passwordConfirmError: string,
    apiError: string
  }>({
    firstNameError: "",
    lastNameError: "",
    accountError: "",
    passwordError: "",
    passwordConfirmError: "",
    apiError: "",
  });

  const [data, setData] = useState<{
    firstName: string,
    lastName: string,
    account: string,
    password: string,
    passwordConfirm: string,
  }>({
    firstName: "",
    lastName: "",
    account: "",
    password: "",
    passwordConfirm: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const route = useRouter();

  async function signupHandler(formData: FormData) {
    const account: string = formData.get('account') as string;
    const accountError: string = account.length === 0 ? ERROR_MSG.account : ""

    const password: string = formData.get('password') as string;
    const passwordError: string = password.length === 0 ? ERROR_MSG.password : ""

    const passwordConfirm: string = formData.get('password_confirm') as string;
    const passwordConfirmError: string = password && passwordConfirm !== password ? ERROR_MSG.password_confirm : ""

    const firstName: string = formData.get('first_name') as string;
    const firstNameError: string = firstName.length === 0 ? ERROR_MSG.first_name : ""

    const lastName: string = formData.get('last_name') as string;
    const lastNameError: string = lastName.length === 0 ? ERROR_MSG.last_name : ""

    setErrors({ firstNameError, lastNameError, accountError, passwordError, passwordConfirmError, apiError: "" });
    setData({ firstName, lastName, account, password, passwordConfirm });
    if (firstNameError || lastNameError || accountError || passwordError || passwordConfirmError) return;

    setShowAlert(true);
    setErrors((prev) => {
      return { ...prev, apiError: "Sign up failed" };
    })

    try {
      await signup({ account, password, first_name: firstName, last_name: lastName, password_confirmation: passwordConfirm });
      route.push("/signin");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setErrors((prev) => {
          return { ...prev, apiError: "Sign up failed" };
        })
      }
    }
  }

  return <section>
    {showAlert && (
      <Alert onClose={() => setShowAlert(false)}>
        <p>{ errors.apiError }</p>
      </Alert>
    )}
    <div className="bg-black w-130 py-15 px-20 mx-auto rounded-md">
      <h2 className="font-bold">Sign Up</h2>
      <form action={signupHandler}>
        <div className="flex justify-between my-5">
          <Input
            label="First name"
            id="first_name"
            type="text"
            className="w-42"
            error={errors.firstNameError}
            defaultValue={data.firstName}
          />
          <Input
            label="Last name"
            id="last_name"
            type="text"
            className="w-42"
            error={errors.lastNameError}
            defaultValue={data.lastName}
          />
        </div>
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
        <Input
          label="Password Confirmation"
          id="password_confirm"
          type="password"
          className="my-5"
          error={errors.passwordConfirmError}
          defaultValue={data.passwordConfirm}
        />
        <Button className="btn-primary w-full p-2 rounded-md my-5" type="submit">Sign up</Button>
      </form>
      <div className="flex">
        <p>Have an exist account?</p>
        <Link className="font-bold text-white ml-2 hover:underline" href="/signin">Sign in.</Link>
      </div>
    </div>
  </section>
}
