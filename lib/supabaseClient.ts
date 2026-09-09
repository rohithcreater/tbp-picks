import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// createClient() throws immediately if given an empty string, which would
// crash the whole app on import before .env.local is set up. Fall back to
// a harmless placeholder URL when not configured yet — isSupabaseConfigured
// (checked in login/signup before calling supabase.auth.*) prevents any
// real auth calls from being attempted against it.
//
// This client works as soon as NEXT_PUBLIC_SUPABASE_URL and
// NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local (copy
// .env.local.example and fill in your project's values from
// Supabase → Project Settings → API).
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : "https://placeholder.supabase.co",
  isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key"
);