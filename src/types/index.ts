export type UserRole = 'admin' | 'manager' | 'agent' | 'support';
export type PropertyStatus = 'available' | 'sold' | 'rented' | 'pending';
export type PropertyType = 'apartment' | 'house' | 'office' | 'commercial';
export type TransactionType = 'sale' | 'rent';
export type ClientStatus = 'lead' | 'active' | 'closed' | 'blocked';
export type MeetingStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';
export type InquiryStatus = 'open' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed';
export type InquiryPriority = 'low' | 'normal' | 'high' | 'urgent';

// Profile type for auth store
export type Profile = User;

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
  branch_id: string | null;
  avatar_url: string | null;
  is_online: boolean;
  last_seen: string;
  created_at: string;
  branch?: Branch;
}

export interface Branch {
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
  manager?: User;
}

export interface Property {
  id: string;
  title: string;
  description: string | null;
  property_type: PropertyType;
  status: PropertyStatus;
  transaction_type: TransactionType;
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
  images?: PropertyImage[];
  branch?: Branch;
  creator?: User;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  caption: string | null;
  is_primary: boolean;
  order_index: number;
}

export interface Client {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  status: ClientStatus;
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
  manager?: User;
  notes_list?: ClientNote[];
}

export interface ClientNote {
  id: string;
  client_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: User;
}

export interface Meeting {
  id: string;
  title: string;
  description: string | null;
  client_id: string | null;
  property_id: string | null;
  manager_id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: MeetingStatus;
  location: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  client?: Client;
  property?: Property;
  manager?: User;
}

export interface Inquiry {
  id: string;
  client_id: string | null;
  subject: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  category: string | null;
  assigned_to: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  client?: Client;
  assignee?: User;
  messages?: InquiryMessage[];
}

export interface InquiryMessage {
  id: string;
  inquiry_id: string;
  sender_id: string | null;
  sender_type: 'staff' | 'client' | 'ai';
  message: string;
  is_from_ai: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string | null;
  data: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
}

export interface AIConversation {
  id: string;
  client_id: string | null;
  session_id: string | null;
  context: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  messages?: AIMessage[];
}

export interface AIMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  recommendations: Record<string, unknown> | null;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  rentedProperties: number;
  totalClients: number;
  activeClients: number;
  newClientsMonth: number;
  totalMeetings: number;
  upcomingMeetings: number;
  openInquiries: number;
  averageViews: number;
  totalRevenue: number;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

export interface FilterParams {
  search?: string;
  status?: string;
  type?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  rooms?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
}
