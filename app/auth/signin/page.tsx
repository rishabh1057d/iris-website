"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import GoogleAuthButton from "@/components/google-auth-button"
import { AlertCircle } from "lucide-react"

export default function SignIn() {
  const { user, isLoading, isAuthorized, signInWithGoogle } = useAuth()
  const router = useRouter()
  const [authLoading, setAuthLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If user is authenticated and authorized, redirect to dashboard
    if (user && isAuthorized === true) {
      router.push("/dashboard")
    }
    // If user is authenticated but not authorized, redirect to unauthorized page
    else if (user && isAuthorized === false) {
      router.push("/auth/unauthorized")
    }
  }, [user, isAuthorized, router])

  const handleGoogleSignIn = async () => {
    setAuthLoading(true)
    setError(null)
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error("Google sign-in error:", error)
      setError("Failed to sign in with Google. Please try again.")
    } finally {
      setAuthLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Navbar />
      <div className="pt-24 pb-12 px-6 w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Image src="/images/logo.png" alt="IRIS Society Logo" width={100} height={100} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Sign In</h1>
          <p className="text-gray-300 mb-6">Welcome to IRIS Society</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8 text-center"
        >
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <p className="text-gray-300 mb-8">
            Sign in with your Google account to access the IRIS Society portal. Only authorized members with verified
            email addresses can access the platform.
          </p>

          <GoogleAuthButton onClick={handleGoogleSignIn} isLoading={authLoading} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs text-gray-400 text-center mt-8"
        >
          Only members of IRIS Society with authorized email addresses can access this platform.
        </motion.p>
      </div>
      <Footer />
    </main>
  )
}
