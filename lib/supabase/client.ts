import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  console.log("[v0] Environment check:", {
    hasNextPublicUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL
  })

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 

  console.log("[v0] Supabase client creation:", {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey
  })

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables. Please check your environment configuration.")
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
