-- Wigged up BY J&K — optional site_settings seeds (run in SQL Editor)
INSERT INTO site_settings (key, value) VALUES
  ('business_name', '"Wigged up"'),
  ('business_subtitle', '"BY J&K"'),
  ('tagline', '"Slay. Switch. Wigged up."'),
  ('hero_headline', '"Get Wigged Up"'),
  ('hero_subheadline', '"Premium wigs curated by J&K — lace fronts, bundles, and full glam units."')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
