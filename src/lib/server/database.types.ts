export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      countries: {
        Row: {
          active: boolean | null
          created_at: string
          deleted: boolean | null
          draft: boolean | null
          id: string
          modified_at: string | null
          name: string
          type: Database["public"]["Enums"]["type"]
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          deleted?: boolean | null
          draft?: boolean | null
          id?: string
          modified_at?: string | null
          name: string
          type?: Database["public"]["Enums"]["type"]
        }
        Update: {
          active?: boolean | null
          created_at?: string
          deleted?: boolean | null
          draft?: boolean | null
          id?: string
          modified_at?: string | null
          name?: string
          type?: Database["public"]["Enums"]["type"]
        }
        Relationships: []
      }
      languages: {
        Row: {
          code: string
          created_at: string
          id: string
          language: Database["public"]["Enums"]["type"]
          modified_at: string | null
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          language?: Database["public"]["Enums"]["type"]
          modified_at?: string | null
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          language?: Database["public"]["Enums"]["type"]
          modified_at?: string | null
          name?: string
        }
        Relationships: []
      }
      miracle_images: {
        Row: {
          alternate_text: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string
          miracle_id: string | null
          modified_at: string | null
          position: number
        }
        Insert: {
          alternate_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          miracle_id?: string | null
          modified_at?: string | null
          position: number
        }
        Update: {
          alternate_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          miracle_id?: string | null
          modified_at?: string | null
          position?: number
        }
        Relationships: []
      }
      miracles: {
        Row: {
          approved_by: string | null
          base_translation: boolean
          blurb: string | null
          country_id: string
          created_at: string
          created_by: string | null
          deleted: boolean
          draft: boolean
          id: string
          language_code: string
          modified_at: string | null
          name: string
          occurrence_year: number | null
          published: boolean | null
          quotes: string[] | null
          slug: string | null
          story: string
          type: Database["public"]["Enums"]["type"]
        }
        Insert: {
          approved_by?: string | null
          base_translation?: boolean
          blurb?: string | null
          country_id?: string
          created_at?: string
          created_by?: string | null
          deleted?: boolean
          draft?: boolean
          id?: string
          language_code: string
          modified_at?: string | null
          name: string
          occurrence_year?: number | null
          published?: boolean | null
          quotes?: string[] | null
          slug?: string | null
          story: string
          type?: Database["public"]["Enums"]["type"]
        }
        Update: {
          approved_by?: string | null
          base_translation?: boolean
          blurb?: string | null
          country_id?: string
          created_at?: string
          created_by?: string | null
          deleted?: boolean
          draft?: boolean
          id?: string
          language_code?: string
          modified_at?: string | null
          name?: string
          occurrence_year?: number | null
          published?: boolean | null
          quotes?: string[] | null
          slug?: string | null
          story?: string
          type?: Database["public"]["Enums"]["type"]
        }
        Relationships: [
          {
            foreignKeyName: "miracles_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "miracles_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      our_lady: {
        Row: {
          approved_by: string | null
          base_translation: boolean | null
          blurb: string | null
          country_id: string
          created_at: string
          created_by: string | null
          deleted: boolean | null
          draft: boolean | null
          feast_day: string | null
          id: string
          language_code: string | null
          modified_at: string | null
          name: string
          occurrence_year: number | null
          published: boolean | null
          quotes: string[] | null
          slug: string | null
          story: string | null
          type: Database["public"]["Enums"]["type"]
        }
        Insert: {
          approved_by?: string | null
          base_translation?: boolean | null
          blurb?: string | null
          country_id?: string
          created_at?: string
          created_by?: string | null
          deleted?: boolean | null
          draft?: boolean | null
          feast_day?: string | null
          id?: string
          language_code?: string | null
          modified_at?: string | null
          name: string
          occurrence_year?: number | null
          published?: boolean | null
          quotes?: string[] | null
          slug?: string | null
          story?: string | null
          type?: Database["public"]["Enums"]["type"]
        }
        Update: {
          approved_by?: string | null
          base_translation?: boolean | null
          blurb?: string | null
          country_id?: string
          created_at?: string
          created_by?: string | null
          deleted?: boolean | null
          draft?: boolean | null
          feast_day?: string | null
          id?: string
          language_code?: string | null
          modified_at?: string | null
          name?: string
          occurrence_year?: number | null
          published?: boolean | null
          quotes?: string[] | null
          slug?: string | null
          story?: string | null
          type?: Database["public"]["Enums"]["type"]
        }
        Relationships: [
          {
            foreignKeyName: "our_lady_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "our_lady_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      our_lady_images: {
        Row: {
          alternate_text: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string
          modified_at: string | null
          our_lady_id: string | null
          position: number
        }
        Insert: {
          alternate_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          modified_at?: string | null
          our_lady_id?: string | null
          position: number
        }
        Update: {
          alternate_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          modified_at?: string | null
          our_lady_id?: string | null
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "our_lady_images_our_lady_id_fkey"
            columns: ["our_lady_id"]
            isOneToOne: false
            referencedRelation: "our_lady"
            referencedColumns: ["id"]
          },
        ]
      }
      saints: {
        Row: {
          approved_by: string | null
          base_translation: boolean | null
          beatified: boolean | null
          blurb: string | null
          canonized: boolean | null
          country_id: string
          created_at: string
          created_by: string | null
          deleted: boolean | null
          draft: boolean | null
          feast_day: string | null
          id: string
          language_code: string | null
          miraculous_communion: boolean | null
          modified_at: string | null
          name: string
          published: boolean | null
          quotes: string[] | null
          slug: string | null
          story: string | null
          type: Database["public"]["Enums"]["type"]
        }
        Insert: {
          approved_by?: string | null
          base_translation?: boolean | null
          beatified?: boolean | null
          blurb?: string | null
          canonized?: boolean | null
          country_id?: string
          created_at?: string
          created_by?: string | null
          deleted?: boolean | null
          draft?: boolean | null
          feast_day?: string | null
          id?: string
          language_code?: string | null
          miraculous_communion?: boolean | null
          modified_at?: string | null
          name: string
          published?: boolean | null
          quotes?: string[] | null
          slug?: string | null
          story?: string | null
          type?: Database["public"]["Enums"]["type"]
        }
        Update: {
          approved_by?: string | null
          base_translation?: boolean | null
          beatified?: boolean | null
          blurb?: string | null
          canonized?: boolean | null
          country_id?: string
          created_at?: string
          created_by?: string | null
          deleted?: boolean | null
          draft?: boolean | null
          feast_day?: string | null
          id?: string
          language_code?: string | null
          miraculous_communion?: boolean | null
          modified_at?: string | null
          name?: string
          published?: boolean | null
          quotes?: string[] | null
          slug?: string | null
          story?: string | null
          type?: Database["public"]["Enums"]["type"]
        }
        Relationships: [
          {
            foreignKeyName: "saints_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saints_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      saints_images: {
        Row: {
          alternate_text: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string
          modified_at: string | null
          position: number
          saint_id: string | null
        }
        Insert: {
          alternate_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          modified_at?: string | null
          position: number
          saint_id?: string | null
        }
        Update: {
          alternate_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          modified_at?: string | null
          position?: number
          saint_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saints_images_saint_id_fkey"
            columns: ["saint_id"]
            isOneToOne: false
            referencedRelation: "saints"
            referencedColumns: ["id"]
          },
        ]
      }
      user_data: {
        Row: {
          email: string | null
          id: string
          role: Database["public"]["Enums"]["role"]
          supabase_id: string | null
        }
        Insert: {
          email?: string | null
          id?: string
          role?: Database["public"]["Enums"]["role"]
          supabase_id?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          role?: Database["public"]["Enums"]["role"]
          supabase_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      slugify: {
        Args: {
          value: string
        }
        Returns: string
      }
      slugify_our_lady: {
        Args: {
          value: string
        }
        Returns: string
      }
      slugify_saints: {
        Args: {
          value: string
        }
        Returns: string
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
    }
    Enums: {
      role: "admin" | "editor" | "user"
      type:
        | "Saint"
        | "Miracle"
        | "Our Lady"
        | "Country"
        | "Language"
        | "Communion"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
