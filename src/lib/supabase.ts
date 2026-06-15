import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          role: 'admin' | 'manager' | 'agent' | 'support';
          branch_id: string | null;
          avatar_url: string | null;
          is_online: boolean;
          last_seen: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          role?: 'admin' | 'manager' | 'agent' | 'support';
          branch_id?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: 'admin' | 'manager' | 'agent' | 'support';
          branch_id?: string | null;
          avatar_url?: string | null;
          is_online?: boolean;
          last_seen?: string;
        };
      };
      branches: {
        Row: {
          id: string;
          name: string;
          address: string;
          city: string;
          phone: string | null;
          email: string | null;
          manager_id: string | null;
          is_active: boolean;
          coordinates: { lat: number; lng: number } | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          address: string;
          city: string;
          phone?: string | null;
          email?: string | null;
          manager_id?: string | null;
          is_active?: boolean;
          coordinates?: { lat: number; lng: number } | null;
        };
        Update: {
          name?: string;
          address?: string;
          city?: string;
          phone?: string | null;
          email?: string | null;
          manager_id?: string | null;
          is_active?: boolean;
          coordinates?: { lat: number; lng: number } | null;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          property_type: 'apartment' | 'house' | 'office' | 'commercial';
          status: 'available' | 'sold' | 'rented' | 'pending';
          transaction_type: 'sale' | 'rent';
          price: number;
          area: number;
          rooms: number | null;
          floor: number | null;
          total_floors: number | null;
          address: string;
          city: string;
          district: string | null;
          coordinates: { lat: number; lng: number } | null;
          features: Record<string, boolean | string | number> | null;
          owner_name: string | null;
          owner_phone: string | null;
          owner_email: string | null;
          branch_id: string | null;
          created_by: string | null;
          views_count: number;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description?: string | null;
          property_type: 'apartment' | 'house' | 'office' | 'commercial';
          status?: 'available' | 'sold' | 'rented' | 'pending';
          transaction_type: 'sale' | 'rent';
          price: number;
          area: number;
          rooms?: number | null;
          floor?: number | null;
          total_floors?: number | null;
          address: string;
          city: string;
          district?: string | null;
          coordinates?: { lat: number; lng: number } | null;
          features?: Record<string, boolean | string | number> | null;
          owner_name?: string | null;
          owner_phone?: string | null;
          owner_email?: string | null;
          branch_id?: string | null;
          created_by?: string | null;
          is_featured?: boolean;
        };
        Update: {
          title?: string;
          description?: string | null;
          property_type?: 'apartment' | 'house' | 'office' | 'commercial';
          status?: 'available' | 'sold' | 'rented' | 'pending';
          transaction_type?: 'sale' | 'rent';
          price?: number;
          area?: number;
          rooms?: number | null;
          floor?: number | null;
          total_floors?: number | null;
          address?: string;
          city?: string;
          district?: string | null;
          coordinates?: { lat: number; lng: number } | null;
          features?: Record<string, boolean | string | number> | null;
          owner_name?: string | null;
          owner_phone?: string | null;
          owner_email?: string | null;
          branch_id?: string | null;
          is_featured?: boolean;
        };
      };
      property_images: {
        Row: {
          id: string;
          property_id: string;
          url: string;
          caption: string | null;
          is_primary: boolean;
          order_index: number;
          created_at: string;
        };
        Insert: {
          property_id: string;
          url: string;
          caption?: string | null;
          is_primary?: boolean;
          order_index?: number;
        };
        Update: {
          url?: string;
          caption?: string | null;
          is_primary?: boolean;
          order_index?: number;
        };
      };
      clients: {
        Row: {
          id: string;
          full_name: string;
          email: string | null;
          phone: string;
          status: 'lead' | 'active' | 'closed' | 'blocked';
          source: string | null;
          budget_min: number | null;
          budget_max: number | null;
          preferred_property_type: string | null;
          preferred_city: string | null;
          preferred_district: string | null;
          preferred_rooms: number | null;
          preferred_area_min: number | null;
          preferred_area_max: number | null;
          notes: string | null;
          assigned_manager_id: string | null;
          branch_id: string | null;
          last_contact: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          full_name: string;
          email?: string | null;
          phone: string;
          status?: 'lead' | 'active' | 'closed' | 'blocked';
          source?: string | null;
          budget_min?: number | null;
          budget_max?: number | null;
          preferred_property_type?: string | null;
          preferred_city?: string | null;
          preferred_district?: string | null;
          preferred_rooms?: number | null;
          preferred_area_min?: number | null;
          preferred_area_max?: number | null;
          notes?: string | null;
          assigned_manager_id?: string | null;
          branch_id?: string | null;
          last_contact?: string | null;
        };
        Update: {
          full_name?: string;
          email?: string | null;
          phone?: string;
          status?: 'lead' | 'active' | 'closed' | 'blocked';
          source?: string | null;
          budget_min?: number | null;
          budget_max?: number | null;
          preferred_property_type?: string | null;
          preferred_city?: string | null;
          preferred_district?: string | null;
          preferred_rooms?: number | null;
          preferred_area_min?: number | null;
          preferred_area_max?: number | null;
          notes?: string | null;
          assigned_manager_id?: string | null;
          branch_id?: string | null;
          last_contact?: string | null;
        };
      };
      client_notes: {
        Row: {
          id: string;
          client_id: string;
          author_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          client_id: string;
          author_id: string;
          content: string;
        };
        Update: {
          content?: string;
        };
      };
      meetings: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          client_id: string | null;
          property_id: string | null;
          manager_id: string;
          scheduled_at: string;
          duration_minutes: number;
          status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
          location: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description?: string | null;
          client_id?: string | null;
          property_id?: string | null;
          manager_id: string;
          scheduled_at: string;
          duration_minutes?: number;
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
          location?: string | null;
          notes?: string | null;
        };
        Update: {
          title?: string;
          description?: string | null;
          client_id?: string | null;
          property_id?: string | null;
          manager_id?: string;
          scheduled_at?: string;
          duration_minutes?: number;
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
          location?: string | null;
          notes?: string | null;
        };
      };
      inquiries: {
        Row: {
          id: string;
          client_id: string | null;
          subject: string;
          status: 'open' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed';
          priority: 'low' | 'normal' | 'high' | 'urgent';
          category: string | null;
          assigned_to: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
          resolved_at: string | null;
        };
        Insert: {
          subject: string;
          client_id?: string | null;
          status?: 'open' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed';
          priority?: 'low' | 'normal' | 'high' | 'urgent';
          category?: string | null;
          assigned_to?: string | null;
          created_by?: string | null;
        };
        Update: {
          subject?: string;
          status?: 'open' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed';
          priority?: 'low' | 'normal' | 'high' | 'urgent';
          category?: string | null;
          assigned_to?: string | null;
          resolved_at?: string | null;
        };
      };
      inquiry_messages: {
        Row: {
          id: string;
          inquiry_id: string;
          sender_id: string | null;
          sender_type: 'staff' | 'client' | 'ai';
          message: string;
          is_from_ai: boolean;
          created_at: string;
        };
        Insert: {
          inquiry_id: string;
          sender_type: 'staff' | 'client' | 'ai';
          message: string;
          sender_id?: string | null;
          is_from_ai?: boolean;
        };
        Update: {
          message?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string | null;
          data: Record<string, unknown> | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: string;
          title: string;
          message?: string | null;
          data?: Record<string, unknown> | null;
          is_read?: boolean;
        };
        Update: {
          is_read?: boolean;
        };
      };
      ai_conversations: {
        Row: {
          id: string;
          client_id: string | null;
          session_id: string | null;
          context: Record<string, unknown> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          client_id?: string | null;
          session_id?: string | null;
          context?: Record<string, unknown> | null;
        };
        Update: {
          context?: Record<string, unknown> | null;
        };
      };
      ai_messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          recommendations: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          conversation_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          recommendations?: Record<string, unknown> | null;
        };
        Update: {
          content?: string;
          recommendations?: Record<string, unknown> | null;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          entity_type: string | null;
          entity_id: string | null;
          details: Record<string, unknown> | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          action: string;
          user_id?: string | null;
          entity_type?: string | null;
          entity_id?: string | null;
          details?: Record<string, unknown> | null;
          ip_address?: string | null;
          user_agent?: string | null;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          property_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          property_id: string;
        };
      };
      property_views: {
        Row: {
          id: string;
          property_id: string;
          viewer_id: string | null;
          ip_address: string | null;
          user_agent: string | null;
          referrer: string | null;
          duration_seconds: number | null;
          created_at: string;
        };
        Insert: {
          property_id: string;
          viewer_id?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          duration_seconds?: number | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Branch = Database['public']['Tables']['branches']['Row'];
export type Property = Database['public']['Tables']['properties']['Row'];
export type PropertyImage = Database['public']['Tables']['property_images']['Row'];
export type Client = Database['public']['Tables']['clients']['Row'];
export type ClientNote = Database['public']['Tables']['client_notes']['Row'];
export type Meeting = Database['public']['Tables']['meetings']['Row'];
export type Inquiry = Database['public']['Tables']['inquiries']['Row'];
export type InquiryMessage = Database['public']['Tables']['inquiry_messages']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];
export type AIConversation = Database['public']['Tables']['ai_conversations']['Row'];
export type AIMessage = Database['public']['Tables']['ai_messages']['Row'];
export type ActivityLog = Database['public']['Tables']['activity_logs']['Row'];
export type Favorite = Database['public']['Tables']['favorites']['Row'];
export type PropertyView = Database['public']['Tables']['property_views']['Row'];
