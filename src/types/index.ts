export type UserRole = 'super_admin' | 'admin' | 'lab_staff' | 'reception';

export type PackageCategory = 'basic' | 'primary' | 'master' | 'executive' | 'pcod' | 'promotional' | 'complete_body';
export type PackageGender = 'male' | 'female' | 'any' | null;
export type ReportStatus = 'active' | 'archived' | 'deleted';
export type BookingStatus = 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
export type MessageStatus = 'new' | 'read' | 'responded' | 'archived';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: string;
  patient_id: string;
  full_name: string;
  date_of_birth: string;
  phone: string | null;
  email: string | null;
  gender: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  patient_id: string;
  report_number: string;
  test_name: string;
  report_date: string;
  file_path: string;
  file_name: string;
  file_size: number | null;
  status: ReportStatus;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
  patients?: Pick<Patient, 'id' | 'patient_id' | 'full_name' | 'date_of_birth' | 'phone'>;
}

export interface ReportAccessLog {
  id: string;
  report_id: string | null;
  patient_id: string | null;
  access_time: string;
  action: string;
  success: boolean;
  user_agent: string | null;
  ip_address: string | null;
  patient_id_attempt: string | null;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  category: PackageCategory;
  gender: PackageGender;
  description: string | null;
  short_description: string | null;
  original_price: number | null;
  offer_price: number | null;
  currency: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  image_url: string | null;
  preparation_instructions: string | null;
  turnaround_time: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  package_tests?: PackageTest[];
}

export interface PackageTest {
  id: string;
  package_id: string;
  test_name: string;
  test_group: string | null;
  display_order: number;
  created_at: string;
}

export interface PackageBooking {
  id: string;
  package_id: string | null;
  package_name: string | null;
  patient_name: string;
  phone: string;
  email: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  status: BookingStatus;
  internal_note: string | null;
  created_at: string;
  updated_at: string;
  packages?: Pick<Package, 'id' | 'name' | 'slug'>;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Test {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string | null;
  sample_type: string | null;
  preparation: string | null;
  turnaround_time: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  test_or_package: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  status: BookingStatus;
  internal_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  subject: string | null;
  message: string;
  status: MessageStatus;
  internal_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  date: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  value_json: unknown;
  category: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  user_email: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: unknown;
  created_at: string;
}

export interface SiteSettings {
  business_name: string;
  business_phone: string;
  business_whatsapp: string;
  business_email: string;
  business_address: string;
  business_address_short: string;
  google_maps_url: string;
  latitude: string;
  longitude: string;
  opening_hours: string;
  social_facebook: string;
  social_instagram: string;
  social_twitter: string;
  social_youtube: string;
  seo_title: string;
  seo_description: string;
  og_image: string;
  report_portal_message: string;
  home_collection_available: boolean;
  home_collection_phone: string;
  home_collection_message: string;
  announcement_text: string;
  announcement_enabled: boolean;
}

export interface ReportVerifyResponse {
  patientName: string;
  reports: {
    id: string;
    reportNumber: string;
    testName: string;
    reportDate: string;
    fileName: string;
    signedUrl: string;
    createdAt: string;
  }[];
}

export interface CreateAdminRequest {
  email: string;
  password: string;
  fullName: string;
  role?: UserRole;
}
