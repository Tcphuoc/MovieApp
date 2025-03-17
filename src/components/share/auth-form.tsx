'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup, signin } from "@/lib/api/services/auth";
import { ERROR_MSG } from "@/lib/constant/error";
import { useDispatch } from "react-redux";
import { login } from "@/lib/store/authSlice";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Alert } from "@mui/material";
import { createPortal } from "react-dom";

interface AuthData {
  email: string;
  password: string;
  passwordConfirm?: string;
  firstName?: string;
  lastName?: string;
};

interface AuthError {
  emailError: string;
  passwordError: string;
  passwordConfirmError?: string;
  firstNameError?: string;
  lastNameError?: string;
  apiError: string;
}

interface AuthForm {
  data: AuthData;
  errors: AuthError;
}

const DEFAULT_AUTH_DATA = {
  email: "",
  password: "",
}

const DEFAULT_AUTH_ERROR = {
  emailError: "",
  passwordError: "",
  apiError: "",
}

const DEFAULT_DATA: AuthForm = {
  data: DEFAULT_AUTH_DATA,
  errors: DEFAULT_AUTH_ERROR,
}

export default function AuthForm({ isSignin }: { isSignin: boolean }) {
  const [authData, setAuthData] = useState<AuthForm>(DEFAULT_DATA);
  const [showAlert, setShowAlert] = useState(false);

  const route = useRouter();
  const dispatch = useDispatch();

  async function authHandler(formData: FormData) {
    const errors: AuthError = { ...DEFAULT_AUTH_ERROR };
    const data: AuthData = { ...DEFAULT_AUTH_DATA };

    data.email = formData.get('email') as string;
    if (data.email.length === 0) {
      errors.emailError = ERROR_MSG.email;
    }

    data.password = formData.get('password') as string;
    if (data.password.length < 6 || data.password.length > 60) {
      errors.passwordError = ERROR_MSG.password;
    }

    if (!isSignin) {
      data.passwordConfirm = formData.get('password_confirm') as string;
      if (data.password && data.passwordConfirm !== data.password) {
        errors.passwordConfirmError = ERROR_MSG.password_confirm;
      }

      data.firstName = formData.get('first_name') as string;
      if (data.firstName.length === 0) {
        errors.firstNameError = ERROR_MSG.first_name;
      }

      data.lastName = formData.get('last_name') as string;
      if (data.lastName.length === 0) {
        errors.lastNameError = ERROR_MSG.last_name;
      }
    }

    setAuthData({ data, errors })
    if (errors.firstNameError || errors.lastNameError || errors.emailError || errors.passwordError || errors.passwordConfirmError) return;

    try {
      const session = isSignin ? await signin(data) : await signup(data);
      if (!session) throw new Error(ERROR_MSG.failed_signup);

      dispatch(login({ accessToken: session.access_token, expiredTime: session.expires_in }));
      route.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setShowAlert(true);
        setAuthData((prev) => {
          return {
            ...prev,
            errors: {
              ...prev.errors,
              apiError: error.message
            },
          }
        })
      }
    }
  }

  return <section>
    {showAlert && createPortal((
      <Alert severity="error" onClose={() => setShowAlert(false)}>
        { authData.errors.apiError }
      </Alert>
    ), document.getElementById('auth_alert') as HTMLElement)}
    <div className="bg-black w-130 py-15 px-20 mx-auto rounded-md">
      <h2 className="font-bold">{ isSignin ? "SIgn In" : "Sign Up" }</h2>
      <form action={authHandler}>
        {!isSignin && (
          <div className="flex justify-between my-5">
            <Input
              label="First name"
              id="first_name"
              type="text"
              className="w-42"
              error={!!authData.errors.firstNameError}
              defaultValue={authData.data.firstName}
              helperText={authData.errors.firstNameError}
            />
            <Input
              label="Last name"
              id="last_name"
              type="text"
              className="w-42"
              error={!!authData.errors.lastNameError}
              defaultValue={authData.data.lastName}
              helperText={authData.errors.lastNameError}
            />
          </div>
        )}
        <Input
          label="Email"
          id="email"
          type="text"
          className="mt-5 w-full"
          error={!!authData.errors.emailError}
          defaultValue={authData.data.email}
          helperText={authData.errors.emailError}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          className="my-5"
          error={!!authData.errors.passwordError}
          defaultValue={authData.data.password}
          helperText={authData.errors.passwordError}
        />
        {!isSignin && (
          <Input
            label="Password Confirmation"
            id="password_confirm"
            type="password"
            className="my-5"
            error={!!authData.errors.passwordConfirmError}
            defaultValue={authData.data.passwordConfirm}
            helperText={authData.errors.passwordConfirmError}
          />
        )}
        <Button className="btn-primary w-full mb-5" type="submit">{isSignin ? "Sign in" : "Sign up"}</Button>
      </form>
      {isSignin ? (
        <div className="flex">
          <p>New to Movie App?</p>
          <Link className="font-bold text-white ml-2 hover:underline" href="/signup">Sign up now.</Link>
        </div>
      ) : (
        <div className="flex">
          <p>Have an exist email?</p>
          <Link className="font-bold text-white ml-2 hover:underline" href="/signin">Sign in.</Link>
        </div>
      )}
    </div>
  </section>
}
