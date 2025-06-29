import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error('Invalid Supabase URL format');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          username: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          username: string;
        };
        Update: {
          email?: string;
          username?: string;
          updated_at?: string;
        };
      };
      daily_skills: {
        Row: {
          id: string;
          title: string;
          description: string;
          content: string;
          date: string;
          created_at: string;
        };
      };
      explanations: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: string;
          created_at: string;
        };
      };
      roadmaps: {
        Row: {
          id: string;
          title: string;
          description: string;
          price: number;
          image_url: string;
          content: string;
          created_at: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          roadmap_id: string;
          payment_status: string;
          enrolled_at: string;
        };
      };
    };
  };
};