"use client";

import { useEffect, useState } from "react";
import { ERROR_MSG } from "@/lib/constant/error";

import { getUserInfo, updateUserInfo } from "@/lib/api/user.api";
import CustomButton from "@/components/ui/CustomButton";
import Input from "@/components/ui/CustomInput";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/store/loadingSlice";
import dayjs from "dayjs";
import { showAlertAction } from "@/store/alertSlice";
import errorHandler from "@/lib/utils/errorHandler";

interface Data {
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  phoneNumber: string | null;
}

interface Error {
  firstNameError: string;
  lastNameError: string;
  dateOfBirthError: string;
  phoneNumberError: string;
}

interface FormProps {
  data: Data;
  errors: Error;
}

const DEFAULT_DATA = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dateOfBirth: null,
};

const DEFAULT_ERROR = {
  firstNameError: "",
  lastNameError: "",
  dateOfBirthError: "",
  phoneNumberError: "",
};

const DEFAULT_PROFILE_FORM: FormProps = {
  data: DEFAULT_DATA,
  errors: DEFAULT_ERROR,
};

export default function ProfileForm() {
  const [profileData, setProfileData] =
    useState<FormProps>(DEFAULT_PROFILE_FORM);
  const { data: formData, errors: formErrors } = profileData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openLoading());
    getUserInfo()
      .then((data) => {
        if (!data) return;

        setProfileData((prev) => {
          return { ...prev, data };
        });
      })
      .catch((error) => errorHandler(error, dispatch))
      .finally(() => dispatch(closeLoading()));
  }, [dispatch]);

  async function submitHandler(formData: FormData) {
    const errors: Error = { ...DEFAULT_ERROR };
    const data: Data = {
      firstName: formData.get("first_name") as string,
      lastName: formData.get("last_name") as string,
      dateOfBirth: formData.get("date_of_birth") as string | null,
      phoneNumber: formData.get("phone_number") as string | null,
    };

    if (data.firstName.length === 0) {
      errors.firstNameError = ERROR_MSG.first_name;
    }

    if (data.lastName.length === 0) {
      errors.lastNameError = ERROR_MSG.last_name;
    }

    if (dayjs(data.dateOfBirth).isAfter(dayjs())) {
      errors.dateOfBirthError = ERROR_MSG.invalid_date_future;
    }

    if (data.phoneNumber && data.phoneNumber.length !== 10) {
      errors.phoneNumberError = ERROR_MSG.phoneNumber;
    }

    setProfileData({ data, errors });
    if (
      errors.firstNameError ||
      errors.lastNameError ||
      errors.dateOfBirthError ||
      errors.phoneNumberError
    ) {
      return;
    }

    try {
      await updateUserInfo(data);
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

  function changeHandler(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    inputName: string
  ) {
    setProfileData((prev) => {
      return {
        ...prev,
        data: {
          ...prev.data,
          [inputName]: event.target.value,
        },
      };
    });
  }

  return (
    <form action={submitHandler}>
      <Input
        label="First name"
        id="first_name"
        type="text"
        className="my-5 w-full"
        error={!!formErrors.firstNameError}
        value={formData.firstName}
        helperText={formErrors.firstNameError}
        onChange={(event) => changeHandler(event, "firstName")}
      />
      <Input
        label="Last name"
        id="last_name"
        type="text"
        className="my-5 w-full"
        error={!!formErrors.lastNameError}
        value={formData.lastName}
        helperText={formErrors.lastNameError}
        onChange={(event) => changeHandler(event, "lastName")}
      />
      <CustomDatePicker
        disableFuture={true}
        defaultValue={formData.dateOfBirth ?? ""}
        errorMessage={formErrors.dateOfBirthError}
        label="Date of birth"
        name="date_of_birth"
      />
      <Input
        label="Phone number"
        id="phone_number"
        type="text"
        className="my-5 w-full"
        error={!!formErrors.phoneNumberError}
        value={formData.phoneNumber}
        helperText={formErrors.phoneNumberError}
        onChange={(event) => changeHandler(event, "phoneNumber")}
      />
      <div className="w-full flex justify-end">
        <CustomButton className="btn-primary mb-5" type="submit">
          Save
        </CustomButton>
      </div>
    </form>
  );
}
