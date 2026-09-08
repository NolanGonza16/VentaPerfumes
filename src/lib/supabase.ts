import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL?.trim();
const supabasePublishableKey =
  import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

function hasValidPublicConfiguration(): boolean {
  if (!supabaseUrl || !supabasePublishableKey) return false;
  try {
    const url = new URL(supabaseUrl);
    return (
      url.protocol === "https:" ||
      (url.protocol === "http:" &&
        ["localhost", "127.0.0.1"].includes(url.hostname))
    );
  } catch {
    return false;
  }
}

export const isSupabaseConfigured = hasValidPublicConfiguration();

// The brochure and demo remain usable before configuring Supabase.
// Only the public publishable key belongs in this browser client.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabasePublishableKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  : null;
