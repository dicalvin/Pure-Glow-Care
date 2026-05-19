-- Storage: create bucket "pure-glow-media" (public) in Dashboard > Storage
-- Then run these policies in SQL Editor:

-- Public read
CREATE POLICY "Public read media"
ON storage.objects FOR SELECT
USING (bucket_id = 'pure-glow-media');

-- Authenticated upload / update / delete
CREATE POLICY "Admin upload media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'pure-glow-media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'pure-glow-media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete media"
ON storage.objects FOR DELETE
USING (bucket_id = 'pure-glow-media' AND auth.role() = 'authenticated');
