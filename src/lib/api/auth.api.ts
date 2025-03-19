import { supabaseClient } from "@/lib/utils/supabase";
import { ERROR_MSG } from "@/lib/constant/error";

interface AuthParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

async function signin(payload: AuthParams) {
  const response = await supabaseClient?.auth.signInWithPassword(payload);
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
      },
    },
  });
  if (!response) throw new Error(ERROR_MSG.no_response);

  const { data, error } = response;
  if (error) throw new Error(error.message);

  return data;
}

async function logout() {
  const response = await supabaseClient?.auth.signOut();
  if (response?.error) {
    throw new Error(response.error?.message);
  }
}

export { signin, signup, logout };
