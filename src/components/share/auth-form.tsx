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
import Alert from "@/components/ui/alert";

interface SigninErrors {
  emailError: string;
  passwordError: string;
  apiError: string;
}

interface SignupErrors extends SigninErrors {
  firstNameError: string;
  lastNameError: string;
  passwordConfirmError: string;
}

const DEFAULT_SIGNIN_ERRORS: SigninErrors = {
  emailError: "",
  passwordError: "",
  apiError: "",
}

const DEFAULT_SIGNUP_ERRORS: SignupErrors = {
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: "",
  passwordConfirmError: "",
  apiError: "",
}

interface SigninData {
  email: string;
  password: string;
}

interface SignupData extends SigninData {
  firstName: string;
  lastName: string;
  passwordConfirm: string;
}

const DEFAULT_SIGNIN_DATA: SigninData = {
  email: "",
  password: "",
}

const DEFAULT_SIGNUP_DATA: SignupData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
}

export default function AuthForm({ isSignin }: { isSignin: boolean }) {
  const [signinErrors, setSigninErrors] = useState<SigninErrors>(DEFAULT_SIGNIN_ERRORS);
  const [signupErrors, setSignupErrors] = useState<SignupErrors>(DEFAULT_SIGNUP_ERRORS);
  const [signinData, setSigninData] = useState<SigninData>(DEFAULT_SIGNIN_DATA);
  const [signupData, setSignupData] = useState<SignupData>(DEFAULT_SIGNUP_DATA);
  const [showAlert, setShowAlert] = useState(false);

  const route = useRouter();
  const dispatch = useDispatch();

  async function signinHandler(formData: FormData) {
    const errors: SigninErrors = {...DEFAULT_SIGNIN_ERRORS};

    const email: string = formData.get('email') as string;
    if (email.length === 0) {
      errors.emailError = ERROR_MSG.email;
    }

    const password: string = formData.get('password') as string;
    if (password.length < 4) {
      errors.passwordError = ERROR_MSG.password;
    }

    setSigninErrors({ ...errors });
    setSigninData({ email, password });
    if (errors.emailError || errors.passwordError) return;

    try {
      const session = await signin({ email, password });
      if (!session) throw new Error(ERROR_MSG.failed_auth);

      dispatch(login({ accessToken: session.access_token, expiredTime: session.expires_in }));
      route.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setShowAlert(true);
        setSigninErrors((prev) => {
          return { ...prev, apiError: error.message };
        })
      }
    }
  }

  async function signupHandler(formData: FormData) {
    const errors: SignupErrors = {...DEFAULT_SIGNUP_ERRORS};

    const firstName: string = formData.get('first_name') as string;
    if (firstName.length === 0) {
      errors.firstNameError = ERROR_MSG.first_name;
    }

    const lastName: string = formData.get('last_name') as string;
    if (lastName.length === 0) {
      errors.lastNameError = ERROR_MSG.last_name;
    }

    const email: string = formData.get('email') as string;
    if (email.length === 0) {
      errors.emailError = ERROR_MSG.email;
    }

    const password: string = formData.get('password') as string;
    if (password.length < 4) {
      errors.passwordError = ERROR_MSG.password;
    }

    const passwordConfirm: string = formData.get('password_confirm') as string;
    if (password && passwordConfirm.length < 4) {
      errors.passwordConfirmError = ERROR_MSG.password_confirm;
    }

    setSignupErrors({ ...errors });
    setSignupData({ firstName, lastName, email, password, passwordConfirm });
    if (errors.firstNameError || errors.lastNameError || errors.emailError || errors.passwordError || errors.passwordConfirmError) return;

    try {
      const session = await signup({ email, password, first_name: firstName, last_name: lastName });
      if (!session) throw new Error(ERROR_MSG.failed_signup);

      dispatch(login({ accessToken: session.access_token, expiredTime: session.expires_in }));
      route.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setShowAlert(true);
        setSignupErrors((prev) => {
          return { ...prev, apiError: error.message };
        })
      }
    }
  }

  return <section>
    {showAlert && (
      <Alert onClose={() => setShowAlert(false)}>
        <p className="mb-10">{ signinErrors.apiError || signupErrors.apiError }</p>
      </Alert>
    )}
    <div className="bg-black w-130 py-15 px-20 mx-auto rounded-md">
      <h2 className="font-bold">Sign Up</h2>
      <form action={isSignin ? signinHandler : signupHandler}>
        {!isSignin && (
          <div className="flex justify-between my-5">
            <Input
              label="First name"
              id="first_name"
              type="text"
              className="w-42"
              error={signupErrors.firstNameError}
              defaultValue={signupData.firstName}
            />
            <Input
              label="Last name"
              id="last_name"
              type="text"
              className="w-42"
              error={signupErrors.lastNameError}
              defaultValue={signupData.lastName}
            />
          </div>
        )}
        <Input
          label="Email or mobile number"
          id="email"
          type="text"
          className="my-5"
          error={isSignin ? signinErrors.emailError : signupErrors.emailError}
          defaultValue={isSignin ? signinData.email : signupData.email}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          className="my-5"
          error={isSignin ? signinErrors.passwordError : signupErrors.passwordError}
          defaultValue={isSignin ? signinData.password : signupData.password}
        />
        {!isSignin && (
          <Input
            label="Password Confirmation"
            id="password_confirm"
            type="password"
            className="my-5"
            error={signupErrors.passwordConfirmError}
            defaultValue={signupData.passwordConfirm}
          />
        )}
        <Button className="btn-primary w-full p-2 rounded-md my-5" type="submit">{isSignin ? "Sign in" : "Sign up"}</Button>
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
