import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Singleton browser client that persists an auth session (localStorage).
 * Used only by /preview, so a signed-in CMS user can read draft rows via the
 * "authenticated read all" RLS policy already on blog_posts/portfolio_projects.
 */
export function getBrowserSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  }
  return client;
}
