import { ERROR_MSG } from "../constant/error";
import { supabaseClient } from "../utils/supabase";

async function fetchAllMovies() {
  const response = await supabaseClient?.from("movies").select("*");
  if (!response) throw new Error(ERROR_MSG.no_response);

  const { data, error } = response;
  if (error) throw new Error(error.message);

  return data;
}

export { fetchAllMovies };
