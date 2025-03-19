import { supabaseClient } from "@/lib/utils/supabase";
import { ERROR_MSG } from "@/lib/constant/error";

async function getUserByToken() {
  const response = await supabaseClient?.auth.getSession();
  if (!response) {
    throw new Error(ERROR_MSG.no_response);
  }

  const { data, error } = response;
  if (error) {
    throw new Error(error.message);
  }

  return data.session?.user;
}

async function getUserInfo() {
  const sessionResponse = await supabaseClient?.auth.getSession();
  const user = sessionResponse?.data.session?.user;
  if (!user) return;

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

export { getUserByToken, getUserInfo };
