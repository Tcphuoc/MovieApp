import { AuthParams } from "../models/Auth";
import { supabaseClient } from "@/utils/supabase";
import { ERROR_MSG } from "@/lib/constant/error";

async function signin(payload: AuthParams) {
  const response = await supabaseClient?.auth.signInWithPassword(payload)
  if (!response) throw new Error(ERROR_MSG.no_response);

  const { data, error } = response;
  if (error) throw new Error(ERROR_MSG.failed_auth);

  return data;
}

async function signup(payload: AuthParams) {
  const response = await supabaseClient?.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        first_name: payload.firstName,
        last_name: payload.lastName,
      }
    }
  })
  if (!response) throw new Error(ERROR_MSG.no_response);

  console.log(response);
  const { data, error } = response;
  if (error) throw new Error(error.message);

  return data;
}

export { signin, signup };
