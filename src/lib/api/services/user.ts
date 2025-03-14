import { supabaseClient } from "@/utils/supabase";
import { ERROR_MSG } from "@/lib/constant/error";

async function getUser(accessToken: string) {
  const response = await supabaseClient?.auth.getUser(accessToken)
  if (!response) {
    throw new Error(ERROR_MSG.no_response);
  }

  const { data, error } = response;
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export { getUser };
