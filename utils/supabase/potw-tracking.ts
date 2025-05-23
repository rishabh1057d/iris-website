import { createClient } from "./client"

export async function trackPOTWClick() {
  const supabase = createClient()

  // Get current month and year
  const now = new Date()
  const month = now.getMonth() + 1 // JavaScript months are 0-indexed
  const year = now.getFullYear()
  const monthYear = `${month}-${year}`

  // Check if entry exists for current month
  const { data, error } = await supabase.from("potw_clicks").select("*").eq("month_year", monthYear).single()

  if (error && error.code !== "PGSQL_ERROR_NO_DATA_FOUND") {
    console.error("Error checking POTW clicks:", error)
    return null
  }

  if (data) {
    // Update existing entry
    const { data: updatedData, error: updateError } = await supabase
      .from("potw_clicks")
      .update({ count: data.count + 1 })
      .eq("month_year", monthYear)
      .select()

    if (updateError) {
      console.error("Error updating POTW clicks:", updateError)
      return null
    }

    return updatedData[0]
  } else {
    // Create new entry
    const { data: newData, error: insertError } = await supabase
      .from("potw_clicks")
      .insert([{ month_year: monthYear, count: 1 }])
      .select()

    if (insertError) {
      console.error("Error inserting POTW clicks:", insertError)
      return null
    }

    return newData[0]
  }
}

export async function getPOTWClicksForCurrentMonth() {
  const supabase = createClient()

  // Get current month and year
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const monthYear = `${month}-${year}`

  const { data, error } = await supabase.from("potw_clicks").select("count").eq("month_year", monthYear).single()

  if (error && error.code !== "PGSQL_ERROR_NO_DATA_FOUND") {
    console.error("Error getting POTW clicks:", error)
    return 0
  }

  return data?.count || 0
}
