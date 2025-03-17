'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signin } from "@/lib/api/services/auth";
import { ERROR_MSG } from "@/lib/constant/error";
import { useDispatch } from "react-redux";
import { login } from "@/lib/store/authSlice";

import Input from "@/components/ui/input";
import { Alert } from "@mui/material";
import { createPortal } from "react-dom";
import CustomButton from "@/components/ui/customButton";

interface SigninData {
  email: string;
  password: string;
};

interface SigninError {
  emailError: string;
  passwordError: string;
  apiError: string;
}

interface SigninForm {
  data: SigninData;
  errors: SigninError;
}

const DEFAULT_DATA = {
  email: "",
  password: "",
}

const DEFAULT_ERROR = {
  emailError: "",
  passwordError: "",
  apiError: "",
}

const DEFAULT_SIGIN_FORM: SigninForm = {
  data: DEFAULT_DATA,
  errors: DEFAULT_ERROR,
}

export default function SigninPage() {
  const [authData, setAuthData] = useState<SigninForm>(DEFAULT_SIGIN_FORM);
  const [showAlert, setShowAlert] = useState(false);

  const route = useRouter();
  const dispatch = useDispatch();

  async function authHandler(formData: FormData) {
    const errors: SigninError = { ...DEFAULT_ERROR };
    const data: SigninData = { ...DEFAULT_DATA };

    data.email = formData.get('email') as string;
    if (data.email.length === 0) {
      errors.emailError = ERROR_MSG.email;
    }

    data.password = formData.get('password') as string;
    if (data.password.length < 6 || data.password.length > 60) {
      errors.passwordError = ERROR_MSG.password;
    }

    setAuthData({ data, errors })
    if (errors.emailError || errors.passwordError) return;

    try {
      const session = await signin(data);
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
      <h2 className="font-bold">Sign In</h2>
      <form action={authHandler}>
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
        <CustomButton className="btn-primary w-full mb-5" variant="contained" type="submit">Sign in</CustomButton>
      </form>
      <div className="flex">
        <p>New to Movie App?</p>
        <Link className="font-bold text-white ml-2 hover:underline" href="/signup">Sign up now.</Link>
      </div>
    </div>
  </section>
}
