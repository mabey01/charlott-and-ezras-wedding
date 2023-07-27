export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Likes: {
        Row: {
          created_at: string | null
          id: string
          photo_id: string
          unique_user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          photo_id: string
          unique_user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          photo_id?: string
          unique_user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
