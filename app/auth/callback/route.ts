import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"
  const error = searchParams.get("error")
  const error_description = searchParams.get("error_description")

  // Handle authentication errors
  if (error) {
    console.error("Auth error:", error, error_description)
    return NextResponse.redirect(`${origin}/auth/error?error=${encodeURIComponent(error_description || error)}`)
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error("Code exchange error:", exchangeError)
      return NextResponse.redirect(`${origin}/auth/error?error=${encodeURIComponent(exchangeError.message)}`)
    }

    // Get the user from the session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session?.user?.email) {
      // Check if user is authorized by looking up their email in the student table
      const { data, error } = await supabase.from("student").select("*").eq("email", session.user.email).single()

      if (error && error.code !== "PGSQL_ERROR_NO_DATA_FOUND") {
        console.error("Auth check error:", error)
        return NextResponse.redirect(`${origin}/auth/error?error=${encodeURIComponent(error.message)}`)
      }

      if (data) {
        // User is authorized, store user details
        const { error: userUpdateError } = await supabase.from("users").upsert(
          {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata.full_name || session.user.user_metadata.name || "User",
            avatar_url: session.user.user_metadata.avatar_url,
            last_sign_in: new Date().toISOString(),
            created_at: new Date().toISOString(),
          },
          { onConflict: "id" },
        )

        if (userUpdateError) {
          console.error("User update error:", userUpdateError)
        }

        // Redirect to dashboard
        return NextResponse.redirect(`${origin}${next}`)
      } else {
        // User is not authorized, redirect to unauthorized page
        return NextResponse.redirect(`${origin}/auth/unauthorized`)
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error`)
}
