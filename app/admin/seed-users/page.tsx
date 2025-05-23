"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SeedUsers() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; count?: number; error?: string } | null>(null)
  const router = useRouter()

  const runSeedApi = async () => {
    try {
      setIsLoading(true)
      setResult(null)

      const response = await fetch("/api/seed-authorized-users")
      const data = await response.json()

      setResult(data)
    } catch (error) {
      setResult({ success: false, error: error instanceof Error ? error.message : "Unknown error" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/admin/dashboard" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Seed Authorized Users</h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <p className="text-gray-300 mb-6">
            This page will run the API route to seed the authorized users from the CSV file into your Supabase database.
            This will populate the <code className="bg-gray-700 px-1 rounded">authorized_users</code> table with email
            addresses and names from the CSV file.
          </p>

          <button
            onClick={runSeedApi}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {isLoading ? "Running..." : "Run Seed API"}
          </button>

          {result && (
            <div className={`mt-6 p-4 rounded ${result.success ? "bg-green-900/30" : "bg-red-900/30"}`}>
              {result.success ? (
                <p className="text-green-200">Success! {result.count} users uploaded to the authorized_users table.</p>
              ) : (
                <p className="text-red-200">Error: {result.error}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
