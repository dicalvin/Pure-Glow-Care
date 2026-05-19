-- Optional seed for logo + Snapchat (run in Supabase SQL Editor)
INSERT INTO site_settings (key, value) VALUES
  ('logo_url', '""'),
  ('snapchat_username', '""'),
  ('snapchat_url', '""')
ON CONFLICT (key) DO NOTHING;
