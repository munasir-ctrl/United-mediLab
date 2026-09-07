/*
# United MediLab — Storage Buckets

## Summary
Creates three storage buckets:
- public-assets: For public website assets (logos, etc.)
- package-images: For package promotional images (publicly readable)
- reports-private: For patient report PDFs (PRIVATE — no public access)

## Security
- public-assets and package-images: public read, authenticated write
- reports-private: NO public access. Only authenticated staff can upload. 
  Signed URLs are generated server-side via edge functions for patient access.
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('public-assets', 'public-assets', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('package-images', 'package-images', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('reports-private', 'reports-private', false, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- public-assets: public read, authenticated write
DROP POLICY IF EXISTS "public_assets_read" ON storage.objects;
CREATE POLICY "public_assets_read" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'public-assets');

DROP POLICY IF EXISTS "public_assets_write" ON storage.objects;
CREATE POLICY "public_assets_write" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'public-assets');

DROP POLICY IF EXISTS "public_assets_update" ON storage.objects;
CREATE POLICY "public_assets_update" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'public-assets');

DROP POLICY IF EXISTS "public_assets_delete" ON storage.objects;
CREATE POLICY "public_assets_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'public-assets');

-- package-images: public read, authenticated write
DROP POLICY IF EXISTS "package_images_read" ON storage.objects;
CREATE POLICY "package_images_read" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'package-images');

DROP POLICY IF EXISTS "package_images_write" ON storage.objects;
CREATE POLICY "package_images_write" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'package-images');

DROP POLICY IF EXISTS "package_images_update" ON storage.objects;
CREATE POLICY "package_images_update" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'package-images');

DROP POLICY IF EXISTS "package_images_delete" ON storage.objects;
CREATE POLICY "package_images_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'package-images');

-- reports-private: NO public read. Authenticated staff can read/write.
-- Patient access is ONLY through the edge function which generates signed URLs.
DROP POLICY IF EXISTS "reports_private_read_staff" ON storage.objects;
CREATE POLICY "reports_private_read_staff" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'reports-private');

DROP POLICY IF EXISTS "reports_private_write_staff" ON storage.objects;
CREATE POLICY "reports_private_write_staff" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'reports-private');

DROP POLICY IF EXISTS "reports_private_update_staff" ON storage.objects;
CREATE POLICY "reports_private_update_staff" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'reports-private');

DROP POLICY IF EXISTS "reports_private_delete_staff" ON storage.objects;
CREATE POLICY "reports_private_delete_staff" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'reports-private');
