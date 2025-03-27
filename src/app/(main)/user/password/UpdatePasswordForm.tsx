"use client";

import { useState } from "react";
import { ERROR_MSG } from "@/lib/constant/error";

import { updateUserPassword } from "@/lib/api/user.api";
import CustomButton from "@/components/ui/CustomButton";
import Input from "@/components/ui/CustomInput";
import { useDispatch } from "react-redux";
import { showAlertAction } from "@/store/alertSlice";
import errorHandler from "@/lib/utils/errorHandler";

interface Data {
  password: string;
  passwordConfirm: string;
  newPassword: string;
}

interface Error {
  passwordError: string;
  passwordConfirmError: string;
  newPasswordError: string;
}

interface FormProps {
  data: Data;
  errors: Error;
}

const DEFAULT_DATA = {
  password: "",
  passwordConfirm: "",
  newPassword: "",
};

const DEFAULT_ERROR = {
  passwordError: "",
  passwordConfirmError: "",
  newPasswordError: "",
};

const DEFAULT_PASSWORD_FORM: FormProps = {
  data: DEFAULT_DATA,
  errors: DEFAULT_ERROR,
};

export default function UpdatePasswordForm() {
  const [passwordData, setPasswordData] = useState<FormProps>(
    DEFAULT_PASSWORD_FORM
  );
  const { data: formData, errors: formErrors } = passwordData;
  const dispatch = useDispatch();

  async function submitHandler(formData: FormData) {
    const errors: Error = { ...DEFAULT_ERROR };
    const data: Data = {
      password: formData.get("password") as string,
      passwordConfirm: formData.get("password_confirm") as string,
      newPassword: formData.get("new_password") as string,
    };

    if (data.password.length < 6 || data.password.length > 60) {
      errors.passwordError = ERROR_MSG.password;
    }

    if (data.password && data.passwordConfirm !== data.password) {
      errors.passwordConfirmError = ERROR_MSG.password_confirm;
    }

    if (data.newPassword.length < 6 || data.newPassword.length > 60) {
      errors.newPasswordError = ERROR_MSG.password;
    }

    setPasswordData({ data, errors });
    if (
      errors.passwordError ||
      errors.passwordConfirmError ||
      errors.newPasswordError
    ) {
      return;
    }

    try {
      await updateUserPassword(data);
      dispatch(
        showAlertAction({
          type: "success",
          content: "Update user info success",
        })
      );
    } catch (error) {
      errorHandler(error, dispatch);
    }
  }

  return (
    <form action={submitHandler}>
      <Input
        label="Current password"
        id="password"
        type="password"
        className="my-5 w-full"
        error={!!formErrors.passwordError}
        defaultValue={formData.password}
        helperText={formErrors.passwordError}
      />
      <Input
        label="Password confirmation"
        id="password_confirm"
        type="password"
        className="my-5 w-full"
        defaultValue={formData.passwordConfirm}
        error={!!formErrors.passwordConfirmError}
        helperText={formErrors.passwordConfirmError}
      />
      <Input
        label="New password"
        id="new_password"
        type="password"
        className="my-5 w-full"
        defaultValue={formData.newPassword}
        error={!!formErrors.newPasswordError}
        helperText={formErrors.newPasswordError}
      />
      <div className="w-full flex justify-end">
        <CustomButton className="btn-primary mb-5" type="submit">
          Save
        </CustomButton>
      </div>
    </form>
  );
}
