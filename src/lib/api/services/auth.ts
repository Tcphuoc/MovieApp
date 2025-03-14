import { SigninParams, SignupParams } from "../models/Auth";
import { supabaseClient } from "@/utils/supabase";
import { ERROR_MSG } from "@/lib/constant/error";

// async function signup(payload: SignupParams) {
//   await POST<SignupParams, SignupResponse>({ payload, endpoint: "auth/signup" });
//   return;
// }

async function signin(payload: SigninParams) {
  const response = await supabaseClient?.auth.signInWithPassword(payload)
  if (!response) throw new Error(ERROR_MSG.no_response);

  const { data, error } = response;
  if (error) throw new Error(ERROR_MSG.failed_auth);

  return data.session;
}

async function signup(payload: SignupParams) {
  const response = await supabaseClient?.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        first_name: payload.first_name,
        last_name: payload.last_name,
      }
    }
  })
  if (!response) throw new Error(ERROR_MSG.no_response);

  console.log(response);
  const { data, error } = response;
  if (error) throw new Error(error.message);

  return data.session;
}

export { signin, signup };
