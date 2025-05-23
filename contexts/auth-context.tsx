"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClient } from "@/utils/supabase/client"
import type { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthorized: boolean | null
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  checkAuthorization: (email: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Function to check if a user is authorized
  const checkAuthorization = async (email: string): Promise<boolean> => {
    if (!email) return false

    const { data, error } = await supabase.from("student").select("*").eq("email", email).single()

    return !!data && !error
  }

  useEffect(() => {
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user?.email) {
        // Check if user is authorized
        const authorized = await checkAuthorization(session.user.email)
        setIsAuthorized(authorized)

        // If not authorized, redirect to unauthorized page
        if (!authorized && event === "SIGNED_IN") {
          router.push("/auth/unauthorized")
          return
        }

        // Update user record if authorized
        if (authorized) {
          await supabase.from("users").upsert(
            {
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata.full_name || session.user.user_metadata.name || "User",
              avatar_url: session.user.user_metadata.avatar_url,
              last_sign_in: new Date().toISOString(),
            },
            { onConflict: "id" },
          )
        }
      } else {
        setIsAuthorized(null)
      }

      setIsLoading(false)
    })

    // Initial session check
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user?.email) {
        // Check if user is authorized
        const authorized = await checkAuthorization(session.user.email)
        setIsAuthorized(authorized)

        // If not authorized and on a protected page, redirect
        if (!authorized && window.location.pathname.includes("/dashboard")) {
          router.push("/auth/unauthorized")
        }
      }

      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) {
      console.error("Google sign-in error:", error)
      throw error
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthorized,
        signInWithGoogle,
        signOut,
        checkAuthorization,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
