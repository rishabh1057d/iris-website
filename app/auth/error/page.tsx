"use client"

import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { AlertOctagon, ArrowLeft } from "lucide-react"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

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
          <h1 className="text-3xl font-bold mb-2">Authentication Error</h1>
          <p className="text-gray-300">There was a problem signing you in</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8"
        >
          <div className="flex items-center justify-center mb-6 text-red-400">
            <AlertOctagon size={48} />
          </div>

          <p className="text-gray-300 mb-4 text-center">We encountered an error during the authentication process:</p>

          {error ? (
            <div className="bg-red-900/30 border border-red-500 text-red-200 p-4 rounded-md mb-6">{error}</div>
          ) : (
            <p className="text-gray-300 mb-6 text-center">
              This could be due to a network issue, a problem with your Google account, or an issue with our
              authentication service.
            </p>
          )}

          <div className="flex flex-col space-y-4">
            <Link
              href="/auth/signin"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-center"
            >
              Try Again
            </Link>

            <Link href="/" className="flex items-center justify-center text-blue-400 hover:text-blue-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}
