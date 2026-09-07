/*
# United MediLab — Seed Data

## Summary
Inserts initial data for:
- site_settings: Business info (phone, address, name, etc.)
- services: 10 laboratory service categories
- faqs: 5 initial FAQs
- packages: All health packages + promotional offers + complete body check-up (from source document)
- package_tests: Tests for each package (preserving source terminology)

## Notes
- Package data preserves the source document wording including spelling (e.g., "HBAIC", "POTTASIUM", "ROUT EIN", "DIABETIES")
- Prices are from the supplied material
- No medical claims or certifications invented
*/

-- ============================================================================
-- SITE SETTINGS
-- ============================================================================
INSERT INTO public.site_settings (key, value, category, description) VALUES
  ('business_name', 'United MediLab', 'general', 'Business name'),
  ('business_phone', '9539900048', 'contact', 'Primary phone number'),
  ('business_whatsapp', '', 'contact', 'WhatsApp number'),
  ('business_email', '', 'contact', 'Contact email'),
  ('business_address', 'Pattal, Perumbavoor - Kuruppampady Road, Near Indian Oil Petrol Pump, Perumbavoor, Kerala 683542, India', 'contact', 'Business address'),
  ('business_address_short', 'Perumbavoor, Kerala 683542', 'contact', 'Short address for display'),
  ('google_maps_url', '', 'contact', 'Google Maps embed URL'),
  ('latitude', '', 'contact', 'Map latitude'),
  ('longitude', '', 'contact', 'Map longitude'),
  ('opening_hours', '', 'contact', 'Opening hours'),
  ('social_facebook', '', 'social', 'Facebook URL'),
  ('social_instagram', '', 'social', 'Instagram URL'),
  ('social_twitter', '', 'social', 'Twitter/X URL'),
  ('social_youtube', '', 'social', 'YouTube URL'),
  ('seo_title', 'United MediLab — Diagnostic Laboratory in Perumbavoor, Kerala', 'seo', 'Default SEO title'),
  ('seo_description', 'Reliable laboratory testing and diagnostic services in Perumbavoor, Kerala. Secure digital access to your reports. Book health check packages online.', 'seo', 'Default SEO description'),
  ('og_image', '', 'seo', 'Open Graph image URL'),
  ('report_portal_message', 'Access your laboratory report securely using your Patient ID and date of birth.', 'portal', 'Message shown on report portal'),
  ('home_collection_available', 'true', 'home_collection', 'Whether home collection is available'),
  ('home_collection_phone', '9539900048', 'home_collection', 'Phone for home collection booking'),
  ('home_collection_message', 'Book home sample collection from the comfort of your home.', 'home_collection', 'Home collection message'),
  ('announcement_text', '', 'general', 'Announcement bar text (empty = disabled)'),
  ('announcement_enabled', 'false', 'general', 'Whether announcement bar is enabled')
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- SERVICES
-- ============================================================================
INSERT INTO public.services (name, slug, description, icon, display_order, is_active) VALUES
  ('Clinical Pathology', 'clinical-pathology', 'Comprehensive clinical pathology testing for accurate diagnosis.', 'microscope', 1, true),
  ('Hematology', 'hematology', 'Complete blood count and blood disorder diagnostics.', 'droplet', 2, true),
  ('Biochemistry', 'biochemistry', 'Biochemical analysis of blood, urine and other body fluids.', 'flask-conical', 3, true),
  ('Microbiology', 'microbiology', 'Identification of infectious microorganisms and antibiotic sensitivity.', 'bug', 4, true),
  ('Immunology', 'immunology', 'Immune system testing and antibody analysis.', 'shield', 5, true),
  ('Hormone Testing', 'hormone-testing', 'Comprehensive hormone level testing and endocrine evaluation.', 'activity', 6, true),
  ('Diabetes Testing', 'diabetes-testing', 'Blood sugar monitoring, HbA1c and diabetes-related diagnostics.', 'gauge', 7, true),
  ('Thyroid Testing', 'thyroid-testing', 'TSH, T3, T4 and comprehensive thyroid function tests.', 'heart-pulse', 8, true),
  ('Vitamin Testing', 'vitamin-testing', 'Vitamin D, B12 and other essential vitamin level assessments.', 'pill', 9, true),
  ('Routine Health Screening', 'routine-health-screening', 'Preventive health check-ups and routine screening packages.', 'clipboard-check', 10, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- FAQS
-- ============================================================================
INSERT INTO public.faqs (question, answer, category, display_order, is_active) VALUES
  ('How do I access my report?', 'You can access your laboratory report through our secure online portal. Visit the Patient Reports page, enter your Patient ID and date of birth, and your report will be available for secure viewing and download.', 'reports', 1, true),
  ('How do I book a laboratory test?', 'You can book a test by visiting the Book a Test page, calling us directly, or by booking one of our health check packages from the Packages page.', 'booking', 2, true),
  ('How do I book a package?', 'Browse our Health Packages page, select the package that suits your needs, and click Book Package. Fill in your contact details and our team will reach out to confirm your appointment.', 'booking', 3, true),
  ('Can I receive my report online?', 'Yes, all reports are securely available through our online patient report portal using your Patient ID and date of birth.', 'reports', 4, true),
  ('How can I contact United MediLab?', 'You can reach us by phone at 9539900048, visit our facility at Pattal, Perumbavoor - Kuruppampady Road, Near Indian Oil Petrol Pump, Perumbavoor, Kerala 683542, or use the contact form on our Contact page.', 'contact', 5, true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PACKAGES — Health check packages from source document
-- ============================================================================
-- PRIMARY HEALTH PACKAGE — ABOVE 40 YEARS MALE
INSERT INTO public.packages (name, slug, category, gender, description, short_description, original_price, offer_price, is_featured, is_active, display_order, preparation_instructions, turnaround_time)
VALUES ('Primary Health Package — Above 40 Years Male', 'primary-health-package-male-40', 'primary', 'male',
  'A comprehensive primary health screening designed for men above 40 years, covering essential diabetes, lipid, liver, kidney and prostate markers.',
  'Essential health screening for men above 40', 2530, 799, true, true, 1,
  'Please fast for 10-12 hours before sample collection. Inform our team about any medications you are taking.',
  'Reports typically available within 24-48 hours')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.package_tests (package_id, test_name, test_group, display_order)
SELECT p.id, t.test_name, t.test_group, t.display_order
FROM public.packages p
CROSS JOIN (VALUES
  ('FBS', NULL, 1),
  ('PPBS', NULL, 2),
  ('LIPID PROFILE', NULL, 3),
  ('LFT', NULL, 4),
  ('RFT', NULL, 5),
  ('CALCIUM', NULL, 6),
  ('PSA', NULL, 7),
  ('HBAIC', NULL, 8),
  ('URINE ROUTEIN', NULL, 9)
) AS t(test_name, test_group, display_order)
WHERE p.slug = 'primary-health-package-male-40'
ON CONFLICT DO NOTHING;

-- PRIMARY HEALTH PACKAGE — ABOVE 40 YEARS FEMALE
INSERT INTO public.packages (name, slug, category, gender, description, short_description, original_price, offer_price, is_featured, is_active, display_order, preparation_instructions, turnaround_time)
VALUES ('Primary Health Package — Above 40 Years Female', 'primary-health-package-female-40', 'primary', 'female',
  'A comprehensive primary health screening designed for women above 40 years, covering essential diabetes, lipid, liver, kidney, thyroid and bone markers.',
  'Essential health screening for women above 40', 2550, 799, true, true, 2,
  'Please fast for 10-12 hours before sample collection. Inform our team about any medications you are taking.',
  'Reports typically available within 24-48 hours')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.package_tests (package_id, test_name, test_group, display_order)
SELECT p.id, t.test_name, t.test_group, t.display_order
FROM public.packages p
CROSS JOIN (VALUES
  ('FBS', NULL, 1),
  ('PPBS', NULL, 2),
  ('LIPID', NULL, 3),
  ('LFT', NULL, 4),
  ('RFT', NULL, 5),
  ('CBC', NULL, 6),
  ('URINE ROUTEIN', NULL, 7),
  ('TFT', NULL, 8),
  ('HBAIC', NULL, 9),
  ('CALCIUM', NULL, 10)
) AS t(test_name, test_group, display_order)
WHERE p.slug = 'primary-health-package-female-40'
ON CONFLICT DO NOTHING;

-- BASIC HEALTH PACKAGE
INSERT INTO public.packages (name, slug, category, gender, description, short_description, original_price, offer_price, is_featured, is_active, display_order, preparation_instructions, turnaround_time)
VALUES ('Basic Health Package', 'basic-health-package', 'basic', 'any',
  'A fundamental health check covering essential blood sugar, lipid, liver and kidney markers — an ideal starting point for routine health monitoring.',
  'Essential baseline health check', 1150, 599, true, true, 3,
  'Please fast for 10-12 hours before sample collection.',
  'Reports typically available within 24 hours')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.package_tests (package_id, test_name, test_group, display_order)
SELECT p.id, t.test_name, t.test_group, t.display_order
FROM public.packages p
CROSS JOIN (VALUES
  ('FBS', NULL, 1),
  ('LIPID', NULL, 2),
  ('LFT', NULL, 3),
  ('CBC', NULL, 4),
  ('URINE ROUTEIN', NULL, 5)
) AS t(test_name, test_group, display_order)
WHERE p.slug = 'basic-health-package'
ON CONFLICT DO NOTHING;

-- MASTER HEALTH PACKAGE — MALE
INSERT INTO public.packages (name, slug, category, gender, description, short_description, original_price, offer_price, is_featured, is_active, display_order, preparation_instructions, turnaround_time)
VALUES ('Master Health Package — Male', 'master-health-package-male', 'master', 'male',
  'An advanced health screening for men covering diabetes, lipid, liver, kidney, cardiac, bone, electrolytes, vitamins and prostate markers.',
  'Comprehensive health screening for men', 4330, 1499, true, true, 4,
  'Please fast for 10-12 hours before sample collection. Inform our team about any medications you are taking.',
  'Reports typically available within 48-72 hours')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.package_tests (package_id, test_name, test_group, display_order)
SELECT p.id, t.test_name, t.test_group, t.display_order
FROM public.packages p
CROSS JOIN (VALUES
  ('FBS', NULL, 1),
  ('PPBS', NULL, 2),
  ('LIPID', NULL, 3),
  ('LFT', NULL, 4),
  ('RFT', NULL, 5),
  ('CBC', NULL, 6),
  ('URINE ROUTEIN', NULL, 7),
  ('PSA', NULL, 8),
  ('CALCIUM', NULL, 9),
  ('SODIUM', NULL, 10),
  ('POTTASIUM', NULL, 11),
  ('URINE MICROALBUMIN', NULL, 12),
  ('VITAMIN D', NULL, 13),
  ('HBAIC', NULL, 14)
) AS t(test_name, test_group, display_order)
WHERE p.slug = 'master-health-package-male'
ON CONFLICT DO NOTHING;

-- MASTER HEALTH PACKAGE — FEMALE
INSERT INTO public.packages (name, slug, category, gender, description, short_description, original_price, offer_price, is_featured, is_active, display_order, preparation_instructions, turnaround_time)
VALUES ('Master Health Package — Female', 'master-health-package-female', 'master', 'female',
  'An advanced health screening for women covering diabetes, lipid, liver, kidney, thyroid, bone, electrolytes and vitamin markers.',
  'Comprehensive health screening for women', 4330, 1499, true, true, 5,
  'Please fast for 10-12 hours before sample collection. Inform our team about any medications you are taking.',
  'Reports typically available within 48-72 hours')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.package_tests (package_id, test_name, test_group, display_order)
SELECT p.id, t.test_name, t.test_group, t.display_order
FROM public.packages p
CROSS JOIN (VALUES
  ('FBS', NULL, 1),
  ('PPBS', NULL, 2),
  ('LIPID', NULL, 3),
  ('LFT', NULL, 4),
  ('RFT', NULL, 5),
  ('CBC', NULL, 6),
  ('URINE ROUTEIN', NULL, 7),
  ('TFT', NULL, 8),
  ('CALCIUM', NULL, 9),
  ('SODIUM', NULL, 10),
  ('POTTASIUM', NULL, 11),
  ('URINE MICROALBUMIN', NULL, 12),
  ('VITAMIN D', NULL, 13),
  ('HBAIC', NULL, 14)
) AS t(test_name, test_group, display_order)
WHERE p.slug = 'master-health-package-female'
ON CONFLICT DO NOTHING;

-- EXECUTIVE HEALTH PACKAGE — MALE
INSERT INTO public.packages (name, slug, category, gender, description, short_description, original_price, offer_price, is_featured, is_active, display_order, preparation_instructions, turnaround_time)
VALUES ('Executive Health Package — Male', 'executive-health-package-male', 'executive', 'male',
  'A premium full-body diagnostic screening for men covering diabetes, lipid profile, liver function, pancreas, bone, infection, cardiac, electrolytes, renal, iron deficiency and vitamins.',
  'Premium comprehensive full-body check for men', 11000, 5999, true, true, 6,
  'Please fast for 12 hours before sample collection. Inform our team about any medications you are taking.',
  'Reports typically available within 72 hours')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.package_tests (package_id, test_name, test_group, display_order)
SELECT p.id, t.test_name, t.test_group, t.display_order
FROM public.packages p
CROSS JOIN (VALUES
  ('FBS', 'DIABETIES', 1),
  ('PPBS', 'DIABETIES', 2),
  ('HBAIC', 'DIABETIES', 3),
  ('CHO', 'LIPID PROFILE', 4),
  ('TRIGLYCERIDES', 'LIPID PROFILE', 5),
  ('HDL', 'LIPID PROFILE', 6),
  ('LDL', 'LIPID PROFILE', 7),
  ('VLDL', 'LIPID PROFILE', 8),
  ('HDL CHOLESTEROL', 'LIPID PROFILE', 9),
  ('LD CHOLESTEROL', 'LIPID PROFILE', 10),
  ('BILIRUBIN TOTAL', 'LIVER FUNCTION TEST', 11),
  ('BILIRUBIN DIRECT', 'LIVER FUNCTION TEST', 12),
  ('SGOT', 'LIVER FUNCTION TEST', 13),
  ('SGPT', 'LIVER FUNCTION TEST', 14),
  ('ALKALINE PHOSPHATASE', 'LIVER FUNCTION TEST', 15),
  ('TOTAL PROTEIN', 'LIVER FUNCTION TEST', 16),
  ('ALBUMIN', 'LIVER FUNCTION TEST', 17),
  ('GLOBULIN', 'LIVER FUNCTION TEST', 18),
  ('A/G RATIO', 'LIVER FUNCTION TEST', 19),
  ('GAMMA GT', 'LIVER FUNCTION TEST', 20),
  ('AMYLASE', 'PANCREAS PROFILE', 21),
  ('LIPASE', 'PANCREAS PROFILE', 22),
  ('CALCIUM', 'BONE PROFILE', 23),
  ('MAGNESIUM', 'BONE PROFILE', 24),
  ('HBSAG SCREENING', 'INFECTION PROFILE', 25),
  ('HIV SCREENING', 'INFECTION PROFILE', 26),
  ('HCV SCREENING', 'INFECTION PROFILE', 27),
  ('CPK', 'CARDIAC MARKER', 28),
  ('CKMB', 'CARDIAC MARKER', 29),
  ('SODIUM', 'ELECTROLYTES', 30),
  ('POTTASIUM', 'ELECTROLYTES', 31),
  ('CHLORIDE', 'ELECTROLYTES', 32),
  ('UREA', 'RENAL FUNCTION TEST', 33),
  ('CREATININE', 'RENAL FUNCTION TEST', 34),
  ('URICE ACID', 'RENAL FUNCTION TEST', 35),
  ('URINE MICROALBUMIN', 'RENAL FUNCTION TEST', 36),
  ('Ggfr', 'RENAL FUNCTION TEST', 37),
  ('BUN', 'RENAL FUNCTION TEST', 38),
  ('IRON', 'IRON DEFECINECY PROFILE', 39),
  ('FERITTIN', 'IRON DEFECINECY PROFILE', 40),
  ('CBC', 'IRON DEFECINECY PROFILE', 41),
  ('TIBC', 'IRON DEFECINECY PROFILE', 42),
  ('VITAMIN-D', 'VITAMINS', 43),
  ('VITAMIN B12', 'VITAMINS', 44),
  ('FOLIC ACID', 'VITAMINS', 45),
  ('PSA', 'VITAMINS', 46)
) AS t(test_name, test_group, display_order)
WHERE p.slug = 'executive-health-package-male'
ON CONFLICT DO NOTHING;

-- EXECUTIVE HEALTH PACKAGE — FEMALE
INSERT INTO public.packages (name, slug, category, gender, description, short_description, original_price, offer_price, is_featured, is_active, display_order, preparation_instructions, turnaround_time)
VALUES ('Executive Health Package — Female', 'executive-health-package-female', 'executive', 'female',
  'A premium full-body diagnostic screening for women covering diabetes, lipid profile, liver function, pancreas, bone, infection, cardiac, electrolytes, renal, iron deficiency, vitamins and thyroid profile.',
  'Premium comprehensive full-body check for women', 11000, 5999, true, true, 7,
  'Please fast for 12 hours before sample collection. Inform our team about any medications you are taking.',
  'Reports typically available within 72 hours')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.package_tests (package_id, test_name, test_group, display_order)
SELECT p.id, t.test_name, t.test_group, t.display_order
FROM public.packages p
CROSS JOIN (VALUES
  ('FBS', 'DIABETIES', 1),
  ('PPBS', 'DIABETIES', 2),
  ('HBAIC', 'DIABETIES', 3),
  ('CHO', 'LIPID PROFILE', 4),
  ('TRIGLYCERIDES', 'LIPID PROFILE', 5),
  ('HDL', 'LIPID PROFILE', 6),
  ('LDL', 'LIPID PROFILE', 7),
  ('VLDL', 'LIPID PROFILE', 8),
  ('HDL CHOLESTEROL', 'LIPID PROFILE', 9),
  ('LD CHOLESTEROL', 'LIPID PROFILE', 10),
  ('BILIRUBIN TOTAL', 'LIVER FUNCTION TEST', 11),
  ('BILIRUBIN DIRECT', 'LIVER FUNCTION TEST', 12),
  ('SGOT', 'LIVER FUNCTION TEST', 13),
  ('SGPT', 'LIVER FUNCTION TEST', 14),
  ('ALKALINE PHOSPHATASE', 'LIVER FUNCTION TEST', 15),
  ('TOTAL PROTEIN', 'LIVER FUNCTION TEST', 16),
  ('ALBUMIN', 'LIVER FUNCTION TEST', 17),
  ('GLOBULIN', 'LIVER FUNCTION TEST', 18),
  ('A/G RATIO', 'LIVER FUNCTION TEST', 19),
  ('GAMMA GT', 'LIVER FUNCTION TEST', 20),
  ('AMYLASE', 'PANCREAS PROFILE', 21),
  ('LIPASE', 'PANCREAS PROFILE', 22),
  ('CALCIUM', 'BONE PROFILE', 23),
  ('MAGNESIUM', 'BONE PROFILE', 24),
  ('HBSAG SCREENING', 'INFECTION PROFILE', 25),
  ('HIV SCREENING', 'INFECTION PROFILE', 26),
  ('HCV SCREENING', 'INFECTION PROFILE', 27),
  ('CPK', 'CARDIAC MARKER', 28),
  ('CKMB', 'CARDIAC MARKER', 29),
  ('SODIUM', 'ELECTROLYTES', 30),
  ('POTTASIUM', 'ELECTROLYTES', 31),
  ('CHLORIDE', 'ELECTROLYTES', 32),
  ('UREA', 'RENAL FUNCTION TEST', 33),
  ('CREATININE', 'RENAL FUNCTION TEST', 34),
  ('URICE ACID', 'RENAL FUNCTION TEST', 35),
  ('URINE MICROALBUMIN', 'RENAL FUNCTION TEST', 36),
  ('Ggfr', 'RENAL FUNCTION TEST', 37),
  ('BUN', 'RENAL FUNCTION TEST', 38),
  ('IRON', 'IRON DEFECINECY PROFILE', 39),
  ('FERITTIN', 'IRON DEFECINECY PROFILE', 40),
  ('CBC', 'IRON DEFECINECY PROFILE', 41),
  ('TIBC', 'IRON DEFECINECY PROFILE', 42),
  ('VITAMIN-D', 'VITAMINS', 43),
  ('VITAMIN B12', 'VITAMINS', 44),
  ('FOLIC ACID', 'VITAMINS', 45),
  ('T3', 'THYROID PROFILE TEST', 46),
  ('T4', 'THYROID PROFILE TEST', 47),
  ('TSH', 'THYROID PROFILE TEST', 48)
) AS t(test_name, test_group, display_order)
WHERE p.slug = 'executive-health-package-female'
ON CONFLICT DO NOTHING;

-- PCOD PROFILE TEST
INSERT INTO public.packages (name, slug, category, gender, description, short_description, original_price, offer_price, is_featured, is_active, display_order, preparation_instructions, turnaround_time)
VALUES ('PCOD Profile Test', 'pcod-profile-test', 'pcod', 'female',
  'A specialized panel for polycystic ovarian disease screening covering CBC, insulin, LH, FSH, testosterone, prolactin and TSH.',
  'PCOD screening panel for women', 3000, 1999, false, true, 8,
  'Please fast for 10-12 hours before sample collection. Sample collection is typically scheduled in the morning.',
  'Reports typically available within 48 hours')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.package_tests (package_id, test_name, test_group, display_order)
SELECT p.id, t.test_name, t.test_group, t.display_order
FROM public.packages p
CROSS JOIN (VALUES
  ('CBC', NULL, 1),
  ('INSULIN FASTING', NULL, 2),
  ('LH', NULL, 3),
  ('FSH', NULL, 4),
  ('TESTOSTERONE', NULL, 5),
  ('PROLACTIN', NULL, 6),
  ('TSH', NULL, 7)
) AS t(test_name, test_group, display_order)
WHERE p.slug = 'pcod-profile-test'
ON CONFLICT DO NOTHING;

-- COMPLETE BODY CHECK-UP
INSERT INTO public.packages (name, slug, category, gender, description, short_description, offer_price, is_featured, is_active, display_order, preparation_instructions, turnaround_time)
VALUES ('Complete Body Check-up', 'complete-body-check-up', 'complete_body', 'any',
  'A comprehensive full-body check-up covering fasting blood sugar, complete lipid profile, liver function, kidney function, complete urine analysis, iron, vitamins, thyroid and CBC with ESR.',
  'Comprehensive full-body health check-up', 999, true, true, 9,
  'Please fast for 10-12 hours before sample collection.',
  'Reports typically available within 48 hours')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.package_tests (package_id, test_name, test_group, display_order)
SELECT p.id, t.test_name, t.test_group, t.display_order
FROM public.packages p
CROSS JOIN (VALUES
  ('FASTING BLOOD SUGAR (FBS)', NULL, 1),
  ('TOTAL CHOLESTEROL', 'LIPID PROFILE', 2),
  ('TRIGLYCERIDE', 'LIPID PROFILE', 3),
  ('HDL CHOLESTEROL', 'LIPID PROFILE', 4),
  ('LDL CHOLESTEROL', 'LIPID PROFILE', 5),
  ('VLDL CHOLESTEROL', 'LIPID PROFILE', 6),
  ('CHOLESTEROL / HDL RATIO', 'LIPID PROFILE', 7),
  ('LDL / HDL RATIO', 'LIPID PROFILE', 8),
  ('TOTAL BILIRUBIN', 'LIVER FUNCTION TEST', 9),
  ('DIRECT BILIRUBIN', 'LIVER FUNCTION TEST', 10),
  ('INDIRECT BILIRUBIN', 'LIVER FUNCTION TEST', 11),
  ('SGOT', 'LIVER FUNCTION TEST', 12),
  ('SGPT', 'LIVER FUNCTION TEST', 13),
  ('ALKALINE PHOSPHATASE', 'LIVER FUNCTION TEST', 14),
  ('TOTAL PROTEIN', 'LIVER FUNCTION TEST', 15),
  ('ALBUMIN', 'LIVER FUNCTION TEST', 16),
  ('GLOBULIN', 'LIVER FUNCTION TEST', 17),
  ('A/G RATIO', 'LIVER FUNCTION TEST', 18),
  ('GGT', 'LIVER FUNCTION TEST', 19),
  ('BLOOD UREA', 'KIDNEY FUNCTION TESTS', 20),
  ('SERUM CREATININE', 'KIDNEY FUNCTION TESTS', 21),
  ('URIC ACID', 'KIDNEY FUNCTION TESTS', 22),
  ('BLOOD UREA NITROGEN (BUN)', 'KIDNEY FUNCTION TESTS', 23),
  ('COLOUR', 'URINE COMPLETE ANALYSIS', 24),
  ('APPEARANCE', 'URINE COMPLETE ANALYSIS', 25),
  ('VOLUME', 'URINE COMPLETE ANALYSIS', 26),
  ('SPECIFIC GRAVITY', 'URINE COMPLETE ANALYSIS', 27),
  ('PH', 'URINE COMPLETE ANALYSIS', 28),
  ('NITRATE', 'URINE COMPLETE ANALYSIS', 29),
  ('KETONE', 'URINE COMPLETE ANALYSIS', 30),
  ('UROBILINOGEN', 'URINE COMPLETE ANALYSIS', 31),
  ('ALBUMIN', 'URINE COMPLETE ANALYSIS', 32),
  ('SUGAR', 'URINE COMPLETE ANALYSIS', 33),
  ('PUS CELLS', 'URINE COMPLETE ANALYSIS', 34),
  ('RBC', 'URINE COMPLETE ANALYSIS', 35),
  ('EPITHELIAL CELLS', 'URINE COMPLETE ANALYSIS', 36),
  ('CAST', 'URINE COMPLETE ANALYSIS', 37),
  ('CRYSTAL', 'URINE COMPLETE ANALYSIS', 38),
  ('BACTERIA', 'URINE COMPLETE ANALYSIS', 39),
  ('IRON', NULL, 40),
  ('VITAMIN B12', NULL, 41),
  ('FREE T3', NULL, 42),
  ('FREE T4', NULL, 43),
  ('TSH', NULL, 44),
  ('CBC + ESR', NULL, 45)
) AS t(test_name, test_group, display_order)
WHERE p.slug = 'complete-body-check-up'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PROMOTIONAL OFFERS (TEST 1-9)
-- ============================================================================
INSERT INTO public.packages (name, slug, category, gender, description, short_description, offer_price, is_featured, is_active, display_order, turnaround_time)
VALUES
  ('Test - 1', 'test-1', 'promotional', 'any', 'Complete Blood Count (CBC) full parameters and ESR.', 'CBC + ESR basic check', 99, false, true, 100, 'Reports typically available within 24 hours'),
  ('Test - 2', 'test-2', 'promotional', 'any', 'FBS, EGFR, RFT (full parameters) and UR/E (full parameters).', 'Blood sugar and kidney function', 299, false, true, 101, 'Reports typically available within 24 hours'),
  ('Test - 3', 'test-3', 'promotional', 'any', 'Iron, TIBC, Ferritin, CBC (full parameters) and ESR.', 'Iron deficiency profile', 599, false, true, 102, 'Reports typically available within 24 hours'),
  ('Test - 4', 'test-4', 'promotional', 'any', 'FBS, HbA1c, CBC (full parameters), ESR, RFT (full parameters), UR/E (full parameters) and Lipid (full parameters).', 'Diabetes and lipid screening', 799, false, true, 103, 'Reports typically available within 24 hours'),
  ('Test - 5', 'test-5', 'promotional', 'any', 'FBS, EGFR, HbA1c, Microalbumin, Creatinine, CBC (full parameters) and Lipid (full parameters).', 'Comprehensive diabetes check', 899, false, true, 104, 'Reports typically available within 24 hours'),
  ('Test - 6', 'test-6', 'promotional', 'any', 'hsCRP, Lipase, Amylase, LDH, CBC (full parameters) and ESR.', 'Inflammation and pancreatic markers', 1499, false, true, 105, 'Reports typically available within 24-48 hours'),
  ('Test - 7', 'test-7', 'promotional', 'any', 'CRP, ASO, RA, Calcium, CBC (full parameters), RFT (full parameters), UR/E (full parameters), Lipid (full parameters) and LFT (full parameters).', 'Comprehensive inflammation and organ panel', 1999, false, true, 106, 'Reports typically available within 24-48 hours'),
  ('Test - 8', 'test-8', 'promotional', 'any', 'FBS, HbA1c, Microalbumin, TSH, Anti TPO, Calcium, Electrolytes, CBC (full parameters), RFT (full parameters), UR/E (full parameters), UR/FE (full parameters), Lipid profile (full parameters) and LFT (full parameters).', 'Diabetes and thyroid comprehensive panel', 2499, false, true, 107, 'Reports typically available within 48 hours'),
  ('Test - 9', 'test-9', 'promotional', 'any', 'EGFR, HbA1c, GGT, Anti TPO, Testo, Amylase, Iron, Lipase, T3, T4, TSH, CBC (full parameters), ESR, RFT (full parameters), Lipid (full parameters) and LFT (full parameters).', 'Premium full diagnostic panel', 2999, false, true, 108, 'Reports typically available within 48 hours')
ON CONFLICT (slug) DO NOTHING;

-- Test - 1 tests
INSERT INTO public.package_tests (package_id, test_name, display_order)
SELECT p.id, t.test_name, t.display_order FROM public.packages p
CROSS JOIN (VALUES ('Complete Blood Count (CBC) full parameters', 1), ('ESR', 2)) AS t(test_name, display_order)
WHERE p.slug = 'test-1' ON CONFLICT DO NOTHING;

-- Test - 2 tests
INSERT INTO public.package_tests (package_id, test_name, display_order)
SELECT p.id, t.test_name, t.display_order FROM public.packages p
CROSS JOIN (VALUES ('FBS', 1), ('EGFR', 2), ('RFT (FULL PARAMETERS)', 3), ('UR/E (FULL PARAMETERS)', 4)) AS t(test_name, display_order)
WHERE p.slug = 'test-2' ON CONFLICT DO NOTHING;

-- Test - 3 tests
INSERT INTO public.package_tests (package_id, test_name, display_order)
SELECT p.id, t.test_name, t.display_order FROM public.packages p
CROSS JOIN (VALUES ('IRON', 1), ('TIBC', 2), ('FERRITIN', 3), ('CBC (Full parameters)', 4), ('ESR', 5)) AS t(test_name, display_order)
WHERE p.slug = 'test-3' ON CONFLICT DO NOTHING;

-- Test - 4 tests
INSERT INTO public.package_tests (package_id, test_name, display_order)
SELECT p.id, t.test_name, t.display_order FROM public.packages p
CROSS JOIN (VALUES ('FBS', 1), ('HBA1C', 2), ('CBC (Full parameters)', 3), ('ESR', 4), ('RFT (Full parameters)', 5), ('UR/E (Full parameters)', 6), ('Lipid (Full parameters)', 7)) AS t(test_name, display_order)
WHERE p.slug = 'test-4' ON CONFLICT DO NOTHING;

-- Test - 5 tests
INSERT INTO public.package_tests (package_id, test_name, display_order)
SELECT p.id, t.test_name, t.display_order FROM public.packages p
CROSS JOIN (VALUES ('FBS', 1), ('EGFR', 2), ('HBA1C', 3), ('MICROALBUMIN', 4), ('CREATININE', 5), ('CBC (Full parameters)', 6), ('Lipid (Full parameters)', 7)) AS t(test_name, display_order)
WHERE p.slug = 'test-5' ON CONFLICT DO NOTHING;

-- Test - 6 tests
INSERT INTO public.package_tests (package_id, test_name, display_order)
SELECT p.id, t.test_name, t.display_order FROM public.packages p
CROSS JOIN (VALUES ('HSCRP', 1), ('LIPASE', 2), ('AMYLASE', 3), ('LDH', 4), ('CBC (Full parameters)', 5), ('ESR', 6)) AS t(test_name, display_order)
WHERE p.slug = 'test-6' ON CONFLICT DO NOTHING;

-- Test - 7 tests
INSERT INTO public.package_tests (package_id, test_name, display_order)
SELECT p.id, t.test_name, t.display_order FROM public.packages p
CROSS JOIN (VALUES ('CRP', 1), ('ASO', 2), ('RA', 3), ('CALCIUM', 4), ('CBC (Full parameters)', 5), ('RFT (Full parameters)', 6), ('UR/E (Full parameters)', 7), ('LIPID (Full parameters)', 8), ('LFT (Full parameters)', 9)) AS t(test_name, display_order)
WHERE p.slug = 'test-7' ON CONFLICT DO NOTHING;

-- Test - 8 tests
INSERT INTO public.package_tests (package_id, test_name, display_order)
SELECT p.id, t.test_name, t.display_order FROM public.packages p
CROSS JOIN (VALUES ('FBS', 1), ('HBA1C', 2), ('MICROALBUMIN', 3), ('TSH', 4), ('ANTI TPO', 5), ('CALCIUM', 6), ('ELECTROLYTES', 7), ('CBC (Full parameters)', 8), ('RFT (Full parameters)', 9), ('UR/E (Full parameters)', 10), ('UR/FE (Full parameters)', 11), ('LIPID PROFILE (Full parameters)', 12), ('LFT (Full parameters)', 13)) AS t(test_name, display_order)
WHERE p.slug = 'test-8' ON CONFLICT DO NOTHING;

-- Test - 9 tests
INSERT INTO public.package_tests (package_id, test_name, display_order)
SELECT p.id, t.test_name, t.display_order FROM public.packages p
CROSS JOIN (VALUES ('EGFR', 1), ('HBA1C', 2), ('GGT', 3), ('ANTI TPO', 4), ('TESTO', 5), ('AMYLASE', 6), ('IRON', 7), ('LIPASE', 8), ('T3', 9), ('T4', 10), ('TSH', 11), ('CBC (Full parameters)', 12), ('ESR', 13), ('RFT (Full parameters)', 14), ('LIPID (Full parameters)', 15), ('LFT (Full parameters)', 16)) AS t(test_name, display_order)
WHERE p.slug = 'test-9' ON CONFLICT DO NOTHING;
