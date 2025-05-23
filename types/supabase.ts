export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      student: {
        Row: {
          email: string
          name: string
        }
        Insert: {
          email: string
          name: string
        }
        Update: {
          email?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          last_sign_in: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string | null
          last_sign_in?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          last_sign_in?: string
          created_at?: string
        }
        Relationships: []
      }
      potw_clicks: {
        Row: {
          id: number
          month_year: string
          count: number
          created_at: string
        }
        Insert: {
          id?: number
          month_year: string
          count: number
          created_at?: string
        }
        Update: {
          id?: number
          month_year?: string
          count?: number
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
