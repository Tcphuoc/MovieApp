import { supabaseClient } from "@/utils/supabase";
import { ERROR_MSG } from "@/lib/constant/error";
import { getCookie } from "cookies-next";

async function getUserByToken() {
  const accessToken = await getCookie('accessToken');
  const response = await supabaseClient?.auth.getUser(accessToken);
  if (!response) {
    throw new Error(ERROR_MSG.no_response);
  }

  const { data, error } = response;
  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}

export { getUserByToken };
