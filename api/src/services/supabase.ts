export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      authors: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      books: {
        Row: {
          all_copies: number;
          author_id: number;
          category_id: number;
          copies_in_stock: number;
          picture: string | null;
          created_at: string;
          deposit: number;
          description: string | null;
          id: number;
          publish_year: number | null;
          regular_price: number;
          title: string;
          cloudinary_public_id?: string | null;
        };
        Insert: {
          all_copies: number;
          author_id?: number;
          category_id?: number;
          copies_in_stock: number;
          picture?: string | null;
          created_at?: string;
          deposit: number;
          description?: string | null;
          id?: number;
          publish_year?: number | null;
          regular_price: number;
          title: string;
          cloudinary_public_id?: string | null;
        };
        Update: {
          all_copies?: number;
          author_id?: number;
          category_id?: number;
          copies_in_stock?: number;
          picture?: string | null;
          created_at?: string;
          deposit?: number;
          description?: string | null;
          id?: number;
          publish_year?: number | null;
          regular_price?: number;
          title?: string;
          cloudinary_public_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_author";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "authors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_category";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      borrow_books: {
        Row: {
          book_id: number;
          borrow_id: number;
          id: number;
        };
        Insert: {
          book_id?: number;
          borrow_id?: number;
          id?: number;
        };
        Update: {
          book_id?: number;
          borrow_id?: number;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_book";
            columns: ["book_id"];
            isOneToOne: false;
            referencedRelation: "books";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_borrow";
            columns: ["borrow_id"];
            isOneToOne: false;
            referencedRelation: "borrows";
            referencedColumns: ["id"];
          }
        ];
      };
      borrows: {
        Row: {
          borrow_status: Database["public"]["Enums"]["borrow_status_type"];
          borrowing_date: string;
          created_at: string;
          delivery_fees: number;
          deposit: number;
          id: number;
          is_paid: boolean;
          pay_method: Database["public"]["Enums"]["pay_method_type"];
          regular_price: number;
          return_date: string;
          total: number;
          user_id: number;
        };
        Insert: {
          borrow_status: Database["public"]["Enums"]["borrow_status_type"];
          borrowing_date: string;
          created_at?: string;
          delivery_fees: number;
          deposit: number;
          id?: number;
          is_paid?: boolean;
          pay_method: Database["public"]["Enums"]["pay_method_type"];
          regular_price: number;
          return_date: string;
          total: number;
          user_id?: number;
        };
        Update: {
          borrow_status?: Database["public"]["Enums"]["borrow_status_type"];
          borrowing_date?: string;
          created_at?: string;
          delivery_fees?: number;
          deposit?: number;
          id?: number;
          is_paid?: boolean;
          pay_method?: Database["public"]["Enums"]["pay_method_type"];
          regular_price?: number;
          return_date?: string;
          total?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      categories: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          created_at: string;
          id: number;
          notification: string;
          seen: boolean;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          notification: string;
          seen?: boolean;
          user_id?: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          notification?: string;
          seen?: boolean;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          address: string | null;
          borrow_id: number;
          id: number;
          is_paid: boolean;
          order_status: Database["public"]["Enums"]["order_status_type"];
          user_id: number;
        };
        Insert: {
          address?: string | null;
          borrow_id?: number;
          id?: number;
          is_paid?: boolean;
          order_status?: Database["public"]["Enums"]["order_status_type"];
          user_id?: number;
        };
        Update: {
          address?: string | null;
          borrow_id?: number;
          id?: number;
          is_paid?: boolean;
          order_status?: Database["public"]["Enums"]["order_status_type"];
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_borrow";
            columns: ["borrow_id"];
            isOneToOne: false;
            referencedRelation: "borrows";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      settings: {
        Row: {
          borrow_days: number;
          delay_fees_per_day: number;
          delivery_fees: number;
          id: number;
        };
        Insert: {
          borrow_days: number;
          delay_fees_per_day: number;
          delivery_fees: number;
          id?: number;
        };
        Update: {
          borrow_days?: number;
          delay_fees_per_day?: number;
          delivery_fees?: number;
          id?: number;
        };
        Relationships: [];
      };
      tokens: {
        Row: {
          created_at: string;
          id: number;
          refresh_token: string;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          refresh_token: string;
          user_id?: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          refresh_token?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          cloudinary_public_id: string | null;
          created_at: string;
          email: string;
          full_name: string;
          id: number;
          password: string;
          phone: string | null;
          picture: string | null;
          role: Database["public"]["Enums"]["role_type"];
          wallet: number;
        };
        Insert: {
          cloudinary_public_id?: string | null;
          created_at?: string;
          email: string;
          full_name: string;
          id?: number;
          password: string;
          phone: string| null;
          picture?: string | null;
          role: Database["public"]["Enums"]["role_type"];
          wallet?: number;
        };
        Update: {
          cloudinary_public_id?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: number;
          password?: string;
          phone?: string| null;
          picture?: string | null;
          role?: Database["public"]["Enums"]["role_type"];
          wallet?: number;
        };
        Relationships: [];
      };
      wishlist: {
        Row: {
          book_id: number;
          id: number;
          user_id: number;
        };
        Insert: {
          book_id?: number;
          id?: number;
          user_id?: number;
        };
        Update: {
          book_id?: number;
          id?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_book";
            columns: ["book_id"];
            isOneToOne: false;
            referencedRelation: "books";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      borrow_status_type:
        | "delivered"
        | "not_delivered_yet"
        | "picked_up"
        | "returned"
        | "wait_for_approval";
      order_status_type:
        | "delivered"
        | "not_delivered_yet"
        | "on_the_way"
        | "problem";
      pay_method_type: "cash" | "visa";
      role_type: "super_admin" | "admin" | "courier" | "user";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
