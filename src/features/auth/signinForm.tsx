"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signin } from "@/lib/api/auth.api";
import { ERROR_MSG } from "@/lib/constant/error";
import { useDispatch } from "react-redux";
import { loginAction } from "@/store/authSlice";

import Input from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import { showAlertAction } from "@/store/alertSlice";

interface Data {
  email: string;
  password: string;
}

interface Error {
  emailError: string;
  passwordError: string;
}

interface FromProps {
  data: Data;
  errors: Error;
}

const DEFAULT_DATA = {
  email: "",
  password: "",
};

const DEFAULT_ERROR = {
  emailError: "",
  passwordError: "",
};

const DEFAULT_SIGIN_FORM: FromProps = {
  data: DEFAULT_DATA,
  errors: DEFAULT_ERROR,
};

export default function SigninForm() {
  const [authData, setAuthData] = useState<FromProps>(DEFAULT_SIGIN_FORM);

  const route = useRouter();
  const dispatch = useDispatch();

  async function authHandler(formData: FormData) {
    const errors: Error = { ...DEFAULT_ERROR };
    const data: Data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (data.email.length === 0) {
      errors.emailError = ERROR_MSG.email;
    }

    if (data.password.length < 6 || data.password.length > 60) {
      errors.passwordError = ERROR_MSG.password;
    }

    setAuthData({ data, errors });
    if (errors.emailError || errors.passwordError) return;

    try {
      const { user, session } = await signin(data);
      if (!session || !user) throw new Error(ERROR_MSG.failed_signup);

      dispatch(
        loginAction({
          accessToken: session.access_token,
          expiredTime: session.expires_in,
          id: user.id,
        })
      );
      route.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        dispatch(showAlertAction({ type: "error", content: error.message }));
      }
    }
  }

  return (
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
      <CustomButton
        className="btn-primary w-full mb-5"
        variant="contained"
        type="submit"
      >
        Sign in
      </CustomButton>
    </form>
  );
}
