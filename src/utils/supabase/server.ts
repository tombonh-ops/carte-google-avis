import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** Client Supabase lié à la session de l'utilisateur courant. */
export function createClient(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Variables Supabase publiques manquantes.");
  }

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Un Server Component ne peut pas modifier les cookies. Le middleware
          // se charge de les rafraîchir avant que la requête ne lui parvienne.
        }
      },
    },
  });
}
