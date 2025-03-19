"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/lib/api/auth.api";
import { ERROR_MSG } from "@/lib/constant/error";
import { useDispatch } from "react-redux";
import { loginAction } from "@/store/authSlice";

import Input from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import { showAlertAction } from "@/store/alertSlice";

interface Data {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

interface Error {
  emailError: string;
  passwordError: string;
  passwordConfirmError: string;
  firstNameError: string;
  lastNameError: string;
}

interface FormProps {
  data: Data;
  errors: Error;
}

const DEFAULT_DATA = {
  email: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
  lastName: "",
};

const DEFAULT_ERROR = {
  emailError: "",
  passwordError: "",
  passwordConfirmError: "",
  firstNameError: "",
  lastNameError: "",
};

const DEFAULT_SIGNUP_FORM: FormProps = {
  data: DEFAULT_DATA,
  errors: DEFAULT_ERROR,
};

export default function SignupPage() {
  const [authData, setAuthData] = useState<FormProps>(DEFAULT_SIGNUP_FORM);

  const route = useRouter();
  const dispatch = useDispatch();

  async function authHandler(formData: FormData) {
    const errors: Error = { ...DEFAULT_ERROR };
    const data: Data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      passwordConfirm: formData.get("password_confirm") as string,
      firstName: formData.get("first_name") as string,
      lastName: formData.get("last_name") as string,
    };

    if (data.email.length === 0) {
      errors.emailError = ERROR_MSG.email;
    }

    if (data.password.length < 6 || data.password.length > 60) {
      errors.passwordError = ERROR_MSG.password;
    }

    if (data.password && data.passwordConfirm !== data.password) {
      errors.passwordConfirmError = ERROR_MSG.password_confirm;
    }

    if (data.firstName.length === 0) {
      errors.firstNameError = ERROR_MSG.first_name;
    }

    if (data.lastName.length === 0) {
      errors.lastNameError = ERROR_MSG.last_name;
    }

    setAuthData({ data, errors });
    if (
      errors.firstNameError ||
      errors.lastNameError ||
      errors.emailError ||
      errors.passwordError ||
      errors.passwordConfirmError
    ) {
      return;
    }

    try {
      const { user, session } = await signup(data);
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
    <section>
      <div className="bg-black w-130 py-15 px-20 mx-auto rounded-md">
        <h2 className="font-bold">Sign Up</h2>
        <form action={authHandler}>
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
          <Input
            label="Password Confirmation"
            id="password_confirm"
            type="password"
            className="my-5"
            error={!!authData.errors.passwordConfirmError}
            defaultValue={authData.data.passwordConfirm}
            helperText={authData.errors.passwordConfirmError}
          />
          <CustomButton className="btn-primary w-full mb-5" type="submit">
            Sign up
          </CustomButton>
        </form>
        <div className="flex">
          <p>Have an exist email?</p>
          <Link
            className="font-bold text-white ml-2 hover:underline"
            href="/signin"
          >
            Sign in.
          </Link>
        </div>
      </div>
    </section>
  );
}
