import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function createSupabaseAdmin(
  url: string | undefined,
  roleKey: string | undefined
) {
  if (!url || !roleKey) return;

  return createClient(url, roleKey);
}

function createSupabaseClient(
  url: string | undefined,
  anonKey: string | undefined
) {
  if (!url || !anonKey) return;

  return createClient(url, anonKey);
}

export const supabaseAdmin = createSupabaseAdmin(
  supabaseUrl,
  supabaseServiceRoleKey
);
export const supabaseClient = createSupabaseClient(
  supabaseUrl,
  supabaseAnonKey
);
