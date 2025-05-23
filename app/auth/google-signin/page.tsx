"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

// Mock Google accounts for demonstration
const mockAccounts = [
  {
    email: "student1@ds.study.iitm.ac.in",
    name: "Student One",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    email: "student2@ds.study.iitm.ac.in",
    name: "Student Two",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    email: "personal@gmail.com",
    name: "Personal Account",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function GoogleSignIn() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleAccountSelect = async (email: string) => {
    setError("")
    setIsLoading(true)

    try {
      // Check if the email is from the allowed domain
      if (!email.endsWith("@ds.study.iitm.ac.in")) {
        throw new Error("Only IITM DS email addresses are allowed")
      }

      // In a real implementation, this would use the actual Google OAuth flow
      // For now, we'll simulate it with our mock function
      await signInWithGoogle()
      router.push("/dashboard")
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
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
          <Image src="/images/google-logo.png" alt="Google" width={50} height={50} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Sign in with Google</h1>
          <p className="text-gray-300">Choose an account to continue to IRIS Society</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card"
        >
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {mockAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => handleAccountSelect(account.email)}
                disabled={isLoading}
                className="w-full flex items-center p-3 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
              >
                <Image
                  src={account.avatar || "/placeholder.svg"}
                  alt={account.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div className="text-left">
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-gray-400">{account.email}</p>
                </div>
              </button>
            ))}

            <button className="w-full flex items-center p-3 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                <span className="text-xl">+</span>
              </div>
              <div className="text-left">
                <p className="font-medium">Use another account</p>
              </div>
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 flex items-center justify-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign In
            </Link>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs text-gray-400 text-center mt-8"
        >
          This is a demonstration of Google Sign-In. In a real implementation, this would use the actual Google OAuth
          API.
        </motion.p>
      </div>
      <Footer />
    </main>
  )
}
