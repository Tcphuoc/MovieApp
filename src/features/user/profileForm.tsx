"use client";

import { useEffect, useState } from "react";
import { ERROR_MSG } from "@/lib/constant/error";

import { getUserByToken } from "@/lib/api/services/user";
import CustomButton from "@/components/ui/customButton";
import Input from "@/components/ui/input";
import CustomAlert from "@/components/ui/customAlert";

interface Data {
  email: string;
  firstName: string;
  lastName: string;
}

interface Error {
  emailError: string;
  firstNameError: string;
  lastNameError: string;
  apiError: string;
}

interface FormProps {
  data: Data;
  errors: Error;
}

const DEFAULT_DATA = {
  email: "",
  firstName: "",
  lastName: "",
};

const DEFAULT_ERROR = {
  emailError: "",
  firstNameError: "",
  lastNameError: "",
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
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserByToken();
      setProfileData((prev) => {
        return {
          ...prev,
          data: {
            email: data.email as string,
            firstName: "",
            lastName: "",
          }
        }
      });
    }
    fetchData();
  }, []);

  async function submitHandler(formData: FormData) {
    const errors: Error = { ...DEFAULT_ERROR };
    const data: Data = { ...DEFAULT_DATA };

    data.email = formData.get("email") as string;
    if (data.email.length === 0) {
      errors.emailError = ERROR_MSG.email;
    }

    data.firstName = formData.get("first_name") as string;
    if (data.firstName.length === 0) {
      errors.firstNameError = ERROR_MSG.first_name;
    }

    data.lastName = formData.get("last_name") as string;
    if (data.lastName.length === 0) {
      errors.lastNameError = ERROR_MSG.last_name;
    }

    setProfileData({ data, errors });
    if (errors.firstNameError || errors.lastNameError || errors.emailError)
      return;
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
          [inputName]: event.target.value
        }
      }
    })
  }

  return (
    <>
      <CustomAlert
        open={openAlert}
        content={formErrors.apiError}
        targetId="main_alert"
        onClose={() => setOpenAlert(false)}
      />
      <div className="bg-black w-full px-30 py-10 mx-auto rounded-md">
        <h2 className="font-bold">Update profile</h2>
        <form action={submitHandler}>
          <Input
            label="First name"
            id="first_name"
            type="text"
            className="mt-5 w-full"
            error={!!formErrors.firstNameError}
            value={formData.firstName}
            helperText={formErrors.firstNameError}
          />
          <Input
            label="Last name"
            id="last_name"
            type="text"
            className="mt-5 w-full"
            error={!!formErrors.lastNameError}
            value={formData.lastName}
            helperText={formErrors.lastNameError}
          />
          <Input
            label="Email"
            id="email"
            type="text"
            className="my-5 w-full"
            error={!!formErrors.emailError}
            value={formData.email}
            helperText={formErrors.emailError}
            onChange={(event) => changeHandler(event, 'email')}
          />
          <div className="w-full flex justify-end">
            <CustomButton className="btn-primary mb-5" type="submit">
              Save
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
}
