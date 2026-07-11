import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** Client Supabase destiné exclusivement aux composants navigateur. */
export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Variables Supabase publiques manquantes.");
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
