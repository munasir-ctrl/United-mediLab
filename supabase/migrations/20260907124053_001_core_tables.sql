/*
# United MediLab — Core Database Schema

## Summary
Creates the foundational database tables for a medical diagnostic laboratory platform:
- profiles: Admin/staff user profiles with role-based access (super_admin, admin, lab_staff, reception)
- patients: Patient records with patient_id lookup field for report portal
- reports: Laboratory reports linked to patients, stored as PDFs in private storage
- report_access_logs: Audit trail of patient report portal access attempts
- packages: Health check packages (marketplace catalog)
- package_tests: Individual tests within packages (grouped)
- package_bookings: Patient booking requests for packages
- services: Laboratory service categories (editable)
- tests: Individual diagnostic tests catalog (editable)
- appointments: Test booking appointments
- contact_messages: Contact form submissions
- faqs: Frequently asked questions (editable)
- testimonials: Patient testimonials (admin-managed, no fake reviews)
- site_settings: Key-value business configuration
- audit_logs: Admin action audit trail

## Security
- RLS enabled on ALL tables
- Public read for: packages, package_tests, services, tests, faqs, testimonials, site_settings
- Staff-only: patients, reports, report_access_logs, audit_logs
- Public insert: package_bookings, appointments, contact_messages

## Notes
- All tables use gen_random_uuid() for primary keys
- updated_at triggers auto-maintain modification timestamps
- patient_id on patients is a human-readable unique identifier
- report_number on reports is a unique human-readable identifier
*/

-- ============================================================================
-- HELPER: updated_at trigger function
-- ============================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- PROFILES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'reception' CHECK (role IN ('super_admin', 'admin', 'lab_staff', 'reception')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_authenticated" ON public.profiles;
CREATE POLICY "profiles_select_authenticated" ON public.profiles
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DO $$ BEGIN
  CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================================
-- PATIENTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id text UNIQUE NOT NULL,
  full_name text NOT NULL,
  date_of_birth date NOT NULL,
  phone text,
  email text,
  gender text,
  address text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "patients_select_staff" ON public.patients;
CREATE POLICY "patients_select_staff" ON public.patients
  FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "patients_insert_staff" ON public.patients;
CREATE POLICY "patients_insert_staff" ON public.patients
  FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "patients_update_staff" ON public.patients;
CREATE POLICY "patients_update_staff" ON public.patients
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "patients_delete_staff" ON public.patients;
CREATE POLICY "patients_delete_staff" ON public.patients
  FOR DELETE TO authenticated USING (true);

DO $$ BEGIN
  CREATE TRIGGER patients_set_updated_at BEFORE UPDATE ON public.patients
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_patients_patient_id ON public.patients(patient_id);
CREATE INDEX IF NOT EXISTS idx_patients_date_of_birth ON public.patients(date_of_birth);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON public.patients(phone);
CREATE INDEX IF NOT EXISTS idx_patients_created_at ON public.patients(created_at DESC);

-- ============================================================================
-- REPORTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.patients(id) ON DELETE RESTRICT,
  report_number text UNIQUE NOT NULL,
  test_name text NOT NULL,
  report_date date NOT NULL,
  file_path text NOT NULL,
  file_name text NOT NULL,
  file_size bigint,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
  uploaded_by uuid REFERENCES public.profiles(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "reports_select_staff" ON public.reports;
CREATE POLICY "reports_select_staff" ON public.reports
  FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "reports_insert_staff" ON public.reports;
CREATE POLICY "reports_insert_staff" ON public.reports
  FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "reports_update_staff" ON public.reports;
CREATE POLICY "reports_update_staff" ON public.reports
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "reports_delete_staff" ON public.reports;
CREATE POLICY "reports_delete_staff" ON public.reports
  FOR DELETE TO authenticated USING (true);

DO $$ BEGIN
  CREATE TRIGGER reports_set_updated_at BEFORE UPDATE ON public.reports
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_reports_patient_id ON public.reports(patient_id);
CREATE INDEX IF NOT EXISTS idx_reports_report_number ON public.reports(report_number);
CREATE INDEX IF NOT EXISTS idx_reports_report_date ON public.reports(report_date);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at DESC);

-- ============================================================================
-- REPORT_ACCESS_LOGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.report_access_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES public.reports(id) ON DELETE CASCADE,
  patient_id uuid REFERENCES public.patients(id) ON DELETE CASCADE,
  access_time timestamptz NOT NULL DEFAULT now(),
  action text NOT NULL CHECK (action IN ('view', 'download', 'failed_attempt')),
  success boolean NOT NULL DEFAULT false,
  user_agent text,
  ip_address text,
  patient_id_attempt text
);

ALTER TABLE public.report_access_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "report_access_logs_select_staff" ON public.report_access_logs;
CREATE POLICY "report_access_logs_select_staff" ON public.report_access_logs
  FOR SELECT TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_report_access_logs_report_id ON public.report_access_logs(report_id);
CREATE INDEX IF NOT EXISTS idx_report_access_logs_access_time ON public.report_access_logs(access_time DESC);

-- ============================================================================
-- PACKAGES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL DEFAULT 'basic' CHECK (category IN ('basic', 'primary', 'master', 'executive', 'pcod', 'promotional', 'complete_body')),
  gender text CHECK (gender IN ('male', 'female', 'any') OR gender IS NULL),
  description text,
  short_description text,
  original_price numeric(10,2),
  offer_price numeric(10,2),
  currency text NOT NULL DEFAULT 'INR',
  is_featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  image_url text,
  preparation_instructions text,
  turnaround_time text,
  created_by uuid REFERENCES public.profiles(id),
  updated_by uuid REFERENCES public.profiles(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "packages_select_public" ON public.packages;
CREATE POLICY "packages_select_public" ON public.packages
  FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "packages_insert_staff" ON public.packages;
CREATE POLICY "packages_insert_staff" ON public.packages
  FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "packages_update_staff" ON public.packages;
CREATE POLICY "packages_update_staff" ON public.packages
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "packages_delete_staff" ON public.packages;
CREATE POLICY "packages_delete_staff" ON public.packages
  FOR DELETE TO authenticated USING (true);

DO $$ BEGIN
  CREATE TRIGGER packages_set_updated_at BEFORE UPDATE ON public.packages
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_packages_slug ON public.packages(slug);
CREATE INDEX IF NOT EXISTS idx_packages_is_active ON public.packages(is_active);
CREATE INDEX IF NOT EXISTS idx_packages_category ON public.packages(category);
CREATE INDEX IF NOT EXISTS idx_packages_is_featured ON public.packages(is_featured);
CREATE INDEX IF NOT EXISTS idx_packages_display_order ON public.packages(display_order);

-- ============================================================================
-- PACKAGE_TESTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.package_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  test_name text NOT NULL,
  test_group text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.package_tests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "package_tests_select_public" ON public.package_tests;
CREATE POLICY "package_tests_select_public" ON public.package_tests
  FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "package_tests_insert_staff" ON public.package_tests;
CREATE POLICY "package_tests_insert_staff" ON public.package_tests
  FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "package_tests_update_staff" ON public.package_tests;
CREATE POLICY "package_tests_update_staff" ON public.package_tests
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "package_tests_delete_staff" ON public.package_tests;
CREATE POLICY "package_tests_delete_staff" ON public.package_tests
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_package_tests_package_id ON public.package_tests(package_id);
CREATE INDEX IF NOT EXISTS idx_package_tests_display_order ON public.package_tests(display_order);

-- ============================================================================
-- PACKAGE_BOOKINGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.package_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid REFERENCES public.packages(id) ON DELETE SET NULL,
  package_name text,
  patient_name text NOT NULL,
  phone text NOT NULL,
  email text,
  preferred_date date,
  preferred_time text,
  message text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  internal_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.package_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "package_bookings_insert_public" ON public.package_bookings;
CREATE POLICY "package_bookings_insert_public" ON public.package_bookings
  FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "package_bookings_select_staff" ON public.package_bookings;
CREATE POLICY "package_bookings_select_staff" ON public.package_bookings
  FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "package_bookings_update_staff" ON public.package_bookings;
CREATE POLICY "package_bookings_update_staff" ON public.package_bookings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "package_bookings_delete_staff" ON public.package_bookings;
CREATE POLICY "package_bookings_delete_staff" ON public.package_bookings
  FOR DELETE TO authenticated USING (true);

DO $$ BEGIN
  CREATE TRIGGER package_bookings_set_updated_at BEFORE UPDATE ON public.package_bookings
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_package_bookings_status ON public.package_bookings(status);
CREATE INDEX IF NOT EXISTS idx_package_bookings_created_at ON public.package_bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_package_bookings_package_id ON public.package_bookings(package_id);

-- ============================================================================
-- SERVICES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "services_select_public" ON public.services;
CREATE POLICY "services_select_public" ON public.services
  FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "services_insert_staff" ON public.services;
CREATE POLICY "services_insert_staff" ON public.services
  FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "services_update_staff" ON public.services;
CREATE POLICY "services_update_staff" ON public.services
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "services_delete_staff" ON public.services;
CREATE POLICY "services_delete_staff" ON public.services
  FOR DELETE TO authenticated USING (true);

DO $$ BEGIN
  CREATE TRIGGER services_set_updated_at BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON public.services(is_active);

-- ============================================================================
-- TESTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  category text,
  sample_type text,
  preparation text,
  turnaround_time text,
  is_featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "tests_select_public" ON public.tests;
CREATE POLICY "tests_select_public" ON public.tests
  FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "tests_insert_staff" ON public.tests;
CREATE POLICY "tests_insert_staff" ON public.tests
  FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "tests_update_staff" ON public.tests;
CREATE POLICY "tests_update_staff" ON public.tests
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "tests_delete_staff" ON public.tests;
CREATE POLICY "tests_delete_staff" ON public.tests
  FOR DELETE TO authenticated USING (true);

DO $$ BEGIN
  CREATE TRIGGER tests_set_updated_at BEFORE UPDATE ON public.tests
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_tests_slug ON public.tests(slug);
CREATE INDEX IF NOT EXISTS idx_tests_category ON public.tests(category);
CREATE INDEX IF NOT EXISTS idx_tests_is_active ON public.tests(is_active);

-- ============================================================================
-- APPOINTMENTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  phone text NOT NULL,
  email text,
  test_or_package text,
  preferred_date date,
  preferred_time text,
  message text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  internal_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "appointments_insert_public" ON public.appointments;
CREATE POLICY "appointments_insert_public" ON public.appointments
  FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "appointments_select_staff" ON public.appointments;
CREATE POLICY "appointments_select_staff" ON public.appointments
  FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "appointments_update_staff" ON public.appointments;
CREATE POLICY "appointments_update_staff" ON public.appointments
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "appointments_delete_staff" ON public.appointments;
CREATE POLICY "appointments_delete_staff" ON public.appointments
  FOR DELETE TO authenticated USING (true);

DO $$ BEGIN
  CREATE TRIGGER appointments_set_updated_at BEFORE UPDATE ON public.appointments
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);

-- ============================================================================
-- CONTACT_MESSAGES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  internal_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contact_messages_insert_public" ON public.contact_messages;
CREATE POLICY "contact_messages_insert_public" ON public.contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "contact_messages_select_staff" ON public.contact_messages;
CREATE POLICY "contact_messages_select_staff" ON public.contact_messages
  FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "contact_messages_update_staff" ON public.contact_messages;
CREATE POLICY "contact_messages_update_staff" ON public.contact_messages
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "contact_messages_delete_staff" ON public.contact_messages;
CREATE POLICY "contact_messages_delete_staff" ON public.contact_messages
  FOR DELETE TO authenticated USING (true);

DO $$ BEGIN
  CREATE TRIGGER contact_messages_set_updated_at BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);

-- ============================================================================
-- FAQS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "faqs_select_public" ON public.faqs;
CREATE POLICY "faqs_select_public" ON public.faqs
  FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "faqs_insert_staff" ON public.faqs;
CREATE POLICY "faqs_insert_staff" ON public.faqs
  FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "faqs_update_staff" ON public.faqs;
CREATE POLICY "faqs_update_staff" ON public.faqs
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "faqs_delete_staff" ON public.faqs;
CREATE POLICY "faqs_delete_staff" ON public.faqs
  FOR DELETE TO authenticated USING (true);

DO $$ BEGIN
  CREATE TRIGGER faqs_set_updated_at BEFORE UPDATE ON public.faqs
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON public.faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_display_order ON public.faqs(display_order);

-- ============================================================================
-- TESTIMONIALS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  review text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  date date,
  is_published boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "testimonials_select_public" ON public.testimonials;
CREATE POLICY "testimonials_select_public" ON public.testimonials
  FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "testimonials_insert_staff" ON public.testimonials;
CREATE POLICY "testimonials_insert_staff" ON public.testimonials
  FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "testimonials_update_staff" ON public.testimonials;
CREATE POLICY "testimonials_update_staff" ON public.testimonials
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "testimonials_delete_staff" ON public.testimonials;
CREATE POLICY "testimonials_delete_staff" ON public.testimonials
  FOR DELETE TO authenticated USING (true);

DO $$ BEGIN
  CREATE TRIGGER testimonials_set_updated_at BEFORE UPDATE ON public.testimonials
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_testimonials_is_published ON public.testimonials(is_published);

-- ============================================================================
-- SITE_SETTINGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  value_json jsonb,
  category text NOT NULL DEFAULT 'general',
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "site_settings_select_public" ON public.site_settings;
CREATE POLICY "site_settings_select_public" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "site_settings_insert_staff" ON public.site_settings;
CREATE POLICY "site_settings_insert_staff" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "site_settings_update_staff" ON public.site_settings;
CREATE POLICY "site_settings_update_staff" ON public.site_settings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "site_settings_delete_staff" ON public.site_settings;
CREATE POLICY "site_settings_delete_staff" ON public.site_settings
  FOR DELETE TO authenticated USING (true);

DO $$ BEGIN
  CREATE TRIGGER site_settings_set_updated_at BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_site_settings_key ON public.site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON public.site_settings(category);

-- ============================================================================
-- AUDIT_LOGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_email text,
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  details jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "audit_logs_select_staff" ON public.audit_logs;
CREATE POLICY "audit_logs_select_staff" ON public.audit_logs
  FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "audit_logs_insert_staff" ON public.audit_logs;
CREATE POLICY "audit_logs_insert_staff" ON public.audit_logs
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
