import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Fetch the CSV file
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IRIS_%20Photography%20Society%20%28Responses%29-T6bYw5rCgQ0m1fqtqteHo0V4FmZW8A.csv",
    )
    const csvText = await response.text()

    // Parse CSV
    const rows = csvText.split("\n")
    const headers = rows[0].split(",")

    // Find the indices of the email and name columns
    const emailIndex = headers.findIndex((h) => h.trim() === "Email Address")
    const nameIndex = headers.findIndex((h) => h.trim() === "Name")

    if (emailIndex === -1 || nameIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "CSV format is not as expected. Could not find Email Address or Name columns.",
        },
        { status: 400 },
      )
    }

    // Parse the data rows
    const users = []
    for (let i = 1; i < rows.length; i++) {
      if (!rows[i].trim()) continue // Skip empty rows

      const columns = rows[i].split(",")
      const email = columns[emailIndex].trim()
      const name = columns[nameIndex].trim()

      if (email && name) {
        users.push({ email, name })
      }
    }

    // Insert into Supabase
    const { error } = await supabase.from("student").upsert(users, { onConflict: "email" })

    if (error) {
      console.error("Error uploading authorized users:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, count: users.length })
  } catch (error) {
    console.error("Error in seed API route:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
