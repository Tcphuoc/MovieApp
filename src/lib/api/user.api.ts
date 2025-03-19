import { supabaseClient } from "@/lib/utils/supabase";
import { ERROR_MSG } from "@/lib/constant/error";

async function getCurrentUser() {
  const response = await supabaseClient?.auth.getSession();
  if (!response) {
    throw new Error(ERROR_MSG.no_response);
  }

  const { data, error } = response;
  if (error) {
    throw new Error(error.message);
  }

  const user = data.session?.user;
  if (!user) {
    throw new Error(ERROR_MSG.failed_auth);
  }

  return user;
}

async function getUserInfo() {
  const user = await getCurrentUser();

  const profileResponse = await supabaseClient
    ?.from("profiles")
    .select("*")
    .eq("id", user.id);

  if (!profileResponse?.data) {
    throw new Error(ERROR_MSG.no_response);
  }

  const data = profileResponse.data[0];

  return {
    firstName: data.first_name,
    lastName: data.last_name,
    dateOfBirth: data.date_of_birth,
    phoneNumber: data.phone_number,
  };
}

async function updateUserInfo({
  firstName,
  lastName,
  dateOfBirth,
  phoneNumber,
}: {
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  phoneNumber: string | null;
}) {
  const user = await getCurrentUser();

  const response = await supabaseClient
    ?.from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      phone_number: phoneNumber,
    })
    .eq("id", user.id);

  if (response?.status !== 204) {
    throw new Error(ERROR_MSG.update_failed);
  }
}

export { getCurrentUser, getUserInfo, updateUserInfo };
