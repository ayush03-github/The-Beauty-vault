import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize Supabase client if keys are available, otherwise return null
console.log("Supabase config check:", {
  urlLength: supabaseUrl ? supabaseUrl.length : 0,
  keyLength: supabaseAnonKey ? supabaseAnonKey.length : 0,
  supabaseUrlExists: !!supabaseUrl,
  supabaseAnonKeyExists: !!supabaseAnonKey
});

export const supabase = 
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
