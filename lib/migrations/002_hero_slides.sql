-- Migration 002: Hero Slides
-- Run in: Supabase SQL Editor

CREATE TABLE IF NOT EXISTS hero_slides (
  id SERIAL PRIMARY KEY,
  pill TEXT NOT NULL DEFAULT '',
  h1_main TEXT NOT NULL DEFAULT '',
  h1_glow TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO hero_slides (pill, h1_main, h1_glow, description, sort_order) VALUES
  ('Digital Excellence', 'Rewriting the ', 'Digital Standard.', 'At 404services, we don''t just build software; we architect scalable digital ecosystems. From high-performance React Native apps to Next.js web architectures.', 1),
  ('Beyond The Error', 'Precision-Engineered ', 'Solutions.', 'We specialize in solving the ''unsolvable''. Where other agencies say a feature is impossible, or a system is too complex — that is where our work begins.', 2),
  ('Hyper-Scalability', 'Architecting the ', 'Future System.', 'Build for today, but architect for a million users tomorrow. We eliminate the need for costly total rewrites as your business scales and traffic spikes.', 3)
ON CONFLICT DO NOTHING;

ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read hero" ON hero_slides;
DROP POLICY IF EXISTS "Auth manage hero" ON hero_slides;
DROP POLICY IF EXISTS "Auth insert hero" ON hero_slides;
DROP POLICY IF EXISTS "Auth delete hero" ON hero_slides;

CREATE POLICY "Public read hero" ON hero_slides FOR SELECT USING (true);
CREATE POLICY "Auth manage hero" ON hero_slides FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth insert hero" ON hero_slides FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth delete hero" ON hero_slides FOR DELETE USING (auth.role() = 'authenticated');
