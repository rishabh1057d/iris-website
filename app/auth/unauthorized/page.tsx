"use client"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowLeft } from "lucide-react"

export default function Unauthorized() {
  const { user, signOut } = useAuth()

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
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-300">You are not authorized to access this platform</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8"
        >
          <div className="flex items-center justify-center mb-6 text-yellow-400">
            <AlertTriangle size={48} />
          </div>

          <p className="text-gray-300 mb-4 text-center">
            Your email address <span className="font-semibold">{user?.email}</span> is not on the authorized list for
            IRIS Society members.
          </p>

          <p className="text-gray-300 mb-6 text-center">
            If you believe this is an error, please contact the IRIS Society administrators.
          </p>

          <div className="flex flex-col space-y-4">
            <button
              onClick={signOut}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Sign Out
            </button>

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
