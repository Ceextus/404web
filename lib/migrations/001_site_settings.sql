-- Migration 001: Site Settings
-- Run in: Supabase SQL Editor

CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO site_settings (key, value) VALUES
  ('company_name', '404 Services'),
  ('logo_url', '/404 slogo.png')
ON CONFLICT (key) DO NOTHING;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read" ON site_settings;
DROP POLICY IF EXISTS "Allow auth update" ON site_settings;
DROP POLICY IF EXISTS "Allow auth insert" ON site_settings;

CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow auth update" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth insert" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
