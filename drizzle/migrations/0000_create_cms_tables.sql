CREATE TABLE public.content_blocks (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.content_blocks TO anon;
GRANT ALL ON public.content_blocks TO authenticated;
GRANT ALL ON public.content_blocks TO service_role;

ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read content blocks" ON public.content_blocks
  FOR SELECT USING (true);
CREATE POLICY "Admins can insert content blocks" ON public.content_blocks
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update content blocks" ON public.content_blocks
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete content blocks" ON public.content_blocks
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket_key TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX gallery_images_bucket_key_idx ON public.gallery_images (bucket_key, order_index);

GRANT SELECT ON public.gallery_images TO anon;
GRANT ALL ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read gallery images" ON public.gallery_images
  FOR SELECT USING (true);
CREATE POLICY "Admins can insert gallery images" ON public.gallery_images
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update gallery images" ON public.gallery_images
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery images" ON public.gallery_images
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.video_urls (
  slot_id TEXT PRIMARY KEY,
  url TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.video_urls TO anon;
GRANT ALL ON public.video_urls TO authenticated;
GRANT ALL ON public.video_urls TO service_role;

ALTER TABLE public.video_urls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read video urls" ON public.video_urls
  FOR SELECT USING (true);
CREATE POLICY "Admins can insert video urls" ON public.video_urls
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update video urls" ON public.video_urls
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete video urls" ON public.video_urls
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
