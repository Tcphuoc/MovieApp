"use client";

import { useEffect, useState } from "react";
import { ERROR_MSG } from "@/lib/constant/error";

import { getUserInfo } from "@/lib/api/user.api";
import CustomButton from "@/components/ui/CustomButton";
import Input from "@/components/ui/CustomInput";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import dayjs from "dayjs";

interface Data {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phoneNumber?: string;
}

interface Error {
  firstNameError: string;
  lastNameError: string;
  dateOfBirthError: string;
  phoneNumberError: string;
  apiError: string;
}

interface FormProps {
  data: Data;
  errors: Error;
}

const DEFAULT_DATA = {
  firstName: "",
  lastName: "",
};

const DEFAULT_ERROR = {
  firstNameError: "",
  lastNameError: "",
  dateOfBirthError: "",
  phoneNumberError: "",
  apiError: "",
};

const DEFAULT_PROFILE_FORM: FormProps = {
  data: DEFAULT_DATA,
  errors: DEFAULT_ERROR,
};

export default function ProfileForm() {
  const [profileData, setProfileData] =
    useState<FormProps>(DEFAULT_PROFILE_FORM);
  const { data: formData, errors: formErrors } = profileData;

  useEffect(() => {
    async function fetchData() {
      const data = await getUserInfo();
      if (!data) return;

      setProfileData((prev) => {
        return { ...prev, data };
      });
    }
    fetchData();
  }, []);

  async function submitHandler(formData: FormData) {
    const errors: Error = { ...DEFAULT_ERROR };
    const data: Data = {
      firstName: formData.get("first_name") as string,
      lastName: formData.get("last_name") as string,
      dateOfBirth: formData.get("date_of_birth") as string,
      phoneNumber: formData.get("phone_number") as string,
    };

    if (data.firstName.length === 0) {
      errors.firstNameError = ERROR_MSG.first_name;
    }

    data.lastName = formData.get("last_name") as string;
    if (data.lastName.length === 0) {
      errors.lastNameError = ERROR_MSG.last_name;
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
    <div className="bg-black w-full px-30 py-10 mx-auto rounded-md">
      <h2 className="font-bold">Update profile</h2>
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
          defaultValue={dayjs(formData.dateOfBirth)}
        />
        <div className="w-full flex justify-end">
          <CustomButton className="btn-primary mb-5" type="submit">
            Save
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
