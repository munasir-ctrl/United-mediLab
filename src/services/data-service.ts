import { supabase } from '@/lib/supabase';
import type {
  Package, PackageTest, PackageBooking, Service, Test, FAQ,
  Testimonial, SiteSetting, SiteSettings, Patient, Report,
  ContactMessage, Appointment, AuditLog, ReportAccessLog,
} from '@/types';
import type { PostgrestError } from '@supabase/supabase-js';

// ============================================================================
// PACKAGES
// ============================================================================
export async function getActivePackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('*, package_tests(*)')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as Package[];
}

export async function getFeaturedPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('*, package_tests(*)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as Package[];
}

export async function getPromotionalPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('*, package_tests(*)')
    .eq('is_active', true)
    .eq('category', 'promotional')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as Package[];
}

export async function getPackageBySlug(slug: string) {
  const { data, error } = await supabase
    .from('packages')
    .select('*, package_tests(*)')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as Package | null;
}

export async function getAllPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as Package[];
}

export async function createPackage(pkg: Partial<Package>, tests: Partial<PackageTest>[]) {
  const { data, error } = await supabase
    .from('packages')
    .insert(pkg)
    .select()
    .single();
  if (error) throw error;

  if (tests.length > 0 && data) {
    const testsWithId = tests.map((t, i) => ({
      ...t,
      package_id: data.id,
      display_order: t.display_order ?? i,
    }));
    const { error: testsError } = await supabase
      .from('package_tests')
      .insert(testsWithId);
    if (testsError) throw testsError;
  }

  return data as Package;
}

export async function updatePackage(id: string, pkg: Partial<Package>, tests: Partial<PackageTest>[]) {
  const { error } = await supabase
    .from('packages')
    .update(pkg)
    .eq('id', id);
  if (error) throw error;

  if (tests !== undefined) {
    await supabase.from('package_tests').delete().eq('package_id', id);
    if (tests.length > 0) {
      const testsWithId = tests.map((t, i) => ({
        test_name: t.test_name,
        test_group: t.test_group || null,
        package_id: id,
        display_order: t.display_order ?? i,
      }));
      const { error: testsError } = await supabase
        .from('package_tests')
        .insert(testsWithId);
      if (testsError) throw testsError;
    }
  }
}

export async function deletePackage(id: string) {
  const { error } = await supabase.from('packages').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================================
// SERVICES
// ============================================================================
export async function getActiveServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as Service[];
}

export async function getAllServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as Service[];
}

// ============================================================================
// TESTS
// ============================================================================
export async function getActiveTests() {
  const { data, error } = await supabase
    .from('tests')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as Test[];
}

export async function getAllTests() {
  const { data, error } = await supabase
    .from('tests')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as Test[];
}

// ============================================================================
// FAQS
// ============================================================================
export async function getActiveFaqs() {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as FAQ[];
}

export async function getAllFaqs() {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as FAQ[];
}

// ============================================================================
// TESTIMONIALS
// ============================================================================
export async function getPublishedTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as Testimonial[];
}

export async function getAllTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Testimonial[];
}

// ============================================================================
// SITE SETTINGS
// ============================================================================
export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*');
  if (error) throw error;

  const settings: Record<string, string> = {};
  (data || []).forEach((s: SiteSetting) => {
    settings[s.key] = s.value ?? '';
  });

  return {
    business_name: settings.business_name || 'United MediLab',
    business_phone: settings.business_phone || '',
    business_whatsapp: settings.business_whatsapp || '',
    business_email: settings.business_email || '',
    business_address: settings.business_address || '',
    business_address_short: settings.business_address_short || '',
    google_maps_url: settings.google_maps_url || '',
    latitude: settings.latitude || '',
    longitude: settings.longitude || '',
    opening_hours: settings.opening_hours || '',
    social_facebook: settings.social_facebook || '',
    social_instagram: settings.social_instagram || '',
    social_twitter: settings.social_twitter || '',
    social_youtube: settings.social_youtube || '',
    seo_title: settings.seo_title || '',
    seo_description: settings.seo_description || '',
    og_image: settings.og_image || '',
    report_portal_message: settings.report_portal_message || 'Access your laboratory report securely using your Patient ID and date of birth.',
    home_collection_available: settings.home_collection_available === 'true',
    home_collection_phone: settings.home_collection_phone || '',
    home_collection_message: settings.home_collection_message || 'Book home sample collection from the comfort of your home.',
    announcement_text: settings.announcement_text || '',
    announcement_enabled: settings.announcement_enabled === 'true',
  };
}

export async function getAllSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .order('category', { ascending: true });
  if (error) throw error;
  return (data || []) as SiteSetting[];
}

export async function updateSiteSetting(key: string, value: string) {
  const { error } = await supabase
    .from('site_settings')
    .update({ value })
    .eq('key', key);
  if (error) throw error;
}

// ============================================================================
// PACKAGE BOOKINGS
// ============================================================================
export async function createPackageBooking(booking: Partial<PackageBooking>) {
  const { data, error } = await supabase
    .from('package_bookings')
    .insert(booking)
    .select()
    .single();
  if (error) throw error;
  return data as PackageBooking;
}

export async function getAllPackageBookings() {
  const { data, error } = await supabase
    .from('package_bookings')
    .select('*, packages(id, name, slug)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as PackageBooking[];
}

export async function updatePackageBooking(id: string, updates: Partial<PackageBooking>) {
  const { error } = await supabase
    .from('package_bookings')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
}

// ============================================================================
// APPOINTMENTS
// ============================================================================
export async function createAppointment(appt: Partial<Appointment>) {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appt)
    .select()
    .single();
  if (error) throw error;
  return data as Appointment;
}

export async function getAllAppointments() {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Appointment[];
}

export async function updateAppointment(id: string, updates: Partial<Appointment>) {
  const { error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
}

// ============================================================================
// CONTACT MESSAGES
// ============================================================================
export async function createContactMessage(msg: Partial<ContactMessage>) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert(msg)
    .select()
    .single();
  if (error) throw error;
  return data as ContactMessage;
}

export async function getAllContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as ContactMessage[];
}

export async function updateContactMessage(id: string, updates: Partial<ContactMessage>) {
  const { error } = await supabase
    .from('contact_messages')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
}

// ============================================================================
// PATIENTS (admin)
// ============================================================================
export async function getAllPatients() {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Patient[];
}

export async function searchPatients(query: string) {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .or(`patient_id.ilike.%${query}%,full_name.ilike.%${query}%,phone.ilike.%${query}%`)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return (data || []) as Patient[];
}

export async function createPatient(patient: Partial<Patient>) {
  const { data, error } = await supabase
    .from('patients')
    .insert(patient)
    .select()
    .single();
  if (error) throw error;
  return data as Patient;
}

export async function updatePatient(id: string, updates: Partial<Patient>) {
  const { error } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
}

export async function getPatientReports(patientId: string) {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Report[];
}

// ============================================================================
// REPORTS (admin)
// ============================================================================
export async function getAllReports() {
  const { data, error } = await supabase
    .from('reports')
    .select('*, patients(id, patient_id, full_name, date_of_birth, phone)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Report[];
}

export async function uploadReportFile(file: File, reportNumber: string) {
  const ext = file.name.split('.').pop();
  const filePath = `${reportNumber}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from('reports-private')
    .upload(filePath, file, { upsert: false });
  if (error) throw error;
  return filePath;
}

export async function createReport(report: Partial<Report>) {
  const { data, error } = await supabase
    .from('reports')
    .insert(report)
    .select()
    .single();
  if (error) throw error;
  return data as Report;
}

export async function updateReport(id: string, updates: Partial<Report>) {
  const { error } = await supabase
    .from('reports')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
}

export async function getReportSignedUrl(filePath: string) {
  const { data, error } = await supabase.storage
    .from('reports-private')
    .createSignedUrl(filePath, 1800);
  if (error) throw error;
  return data?.signedUrl ?? null;
}

// ============================================================================
// AUDIT LOGS
// ============================================================================
export async function getAuditLogs(limit = 100) {
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data || []) as AuditLog[];
}

export async function logAudit(action: string, entityType?: string, entityId?: string, details?: unknown) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('audit_logs').insert({
      user_id: user?.id,
      user_email: user?.email,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details: details as never,
    });
  } catch (e) {
    // Silently fail — audit logging should not block operations
  }
}

// ============================================================================
// REPORT ACCESS LOGS (admin view)
// ============================================================================
export async function getReportAccessLogs(limit = 100) {
  const { data, error } = await supabase
    .from('report_access_logs')
    .select('*')
    .order('access_time', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data || []) as ReportAccessLog[];
}

// ============================================================================
// DASHBOARD STATS
// ============================================================================
export async function getDashboardStats() {
  const [patients, reports, bookings, accessLogs] = await Promise.all([
    supabase.from('patients').select('id', { count: 'exact', head: true }),
    supabase.from('reports').select('id', { count: 'exact', head: true }),
    supabase.from('package_bookings').select('id', { count: 'exact', head: true }),
    supabase.from('report_access_logs').select('id', { count: 'exact', head: true }),
  ]);

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [reportsThisMonth, pendingBookings, failedAccess] = await Promise.all([
    supabase.from('reports').select('id', { count: 'exact', head: true }).gte('created_at', monthStart),
    supabase.from('package_bookings').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('report_access_logs').select('id', { count: 'exact', head: true }).eq('success', false),
  ]);

  return {
    totalPatients: patients.count ?? 0,
    totalReports: reports.count ?? 0,
    reportsThisMonth: reportsThisMonth.count ?? 0,
    totalBookings: bookings.count ?? 0,
    pendingBookings: pendingBookings.count ?? 0,
    totalAccessLogs: accessLogs.count ?? 0,
    failedAccess: failedAccess.count ?? 0,
  };
}

export { supabase };
