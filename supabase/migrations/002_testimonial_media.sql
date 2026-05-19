-- Run in Supabase SQL Editor after the base schema
-- Adds support for pictorial / video testimonials

ALTER TABLE testimonials
  ADD COLUMN IF NOT EXISTS media_url TEXT,
  ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image'
    CHECK (media_type IN ('image', 'video'));

COMMENT ON COLUMN testimonials.media_url IS 'Public URL from pure-glow-media bucket';
COMMENT ON COLUMN testimonials.media_type IS 'image or video';
