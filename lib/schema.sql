-- ==========================================
-- 404 Services — Supabase Schema Setup
-- ==========================================
-- Run this ONCE in Supabase SQL Editor

-- 1. Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Seed initial rows
INSERT INTO site_settings (key, value) VALUES
  ('company_name', '404 Services'),
  ('logo_url', '/404 slogo.png')
ON CONFLICT (key) DO NOTHING;

-- 3. Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 4. Policies (safe to re-run: drops first if they exist)
DROP POLICY IF EXISTS "Allow public read" ON site_settings;
DROP POLICY IF EXISTS "Allow auth update" ON site_settings;
DROP POLICY IF EXISTS "Allow auth insert" ON site_settings;

CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow auth update" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth insert" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ==========================================
-- STORAGE: Create these manually in the UI
-- ==========================================
-- 1. Storage → New Bucket → name: "assets" → toggle PUBLIC
-- 2. Click bucket → Policies → New Policy (full customization):
--    a) Name: "Public read"   | Operation: SELECT | Definition: true
--    b) Name: "Auth upload"   | Operation: INSERT | Target: authenticated | Definition: true

-- ==========================================
-- HERO SLIDES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS hero_slides (
  id SERIAL PRIMARY KEY,
  pill TEXT NOT NULL DEFAULT '',
  h1_main TEXT NOT NULL DEFAULT '',
  h1_glow TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed the 3 existing slides
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
