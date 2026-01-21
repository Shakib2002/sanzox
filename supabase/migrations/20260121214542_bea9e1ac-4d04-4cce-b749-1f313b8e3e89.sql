-- Create storage buckets for content images
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('services', 'services', true),
  ('works', 'works', true),
  ('blog', 'blog', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for services bucket
CREATE POLICY "Anyone can view service images"
ON storage.objects FOR SELECT
USING (bucket_id = 'services');

CREATE POLICY "Admins can upload service images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'services' AND public.is_admin());

CREATE POLICY "Admins can update service images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'services' AND public.is_admin());

CREATE POLICY "Admins can delete service images"
ON storage.objects FOR DELETE
USING (bucket_id = 'services' AND public.is_admin());

-- RLS policies for works bucket
CREATE POLICY "Anyone can view work images"
ON storage.objects FOR SELECT
USING (bucket_id = 'works');

CREATE POLICY "Admins can upload work images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'works' AND public.is_admin());

CREATE POLICY "Admins can update work images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'works' AND public.is_admin());

CREATE POLICY "Admins can delete work images"
ON storage.objects FOR DELETE
USING (bucket_id = 'works' AND public.is_admin());

-- RLS policies for blog bucket
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog');

CREATE POLICY "Admins can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog' AND public.is_admin());

CREATE POLICY "Admins can update blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog' AND public.is_admin());

CREATE POLICY "Admins can delete blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog' AND public.is_admin());

-- Add cover_image column to services table
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS cover_image text;