-- Migration 004: Homepage About Section
-- Run in: Supabase SQL Editor

-- Brand story text (left column)
CREATE TABLE IF NOT EXISTS homepage_about (
  id SERIAL PRIMARY KEY,
  heading_line1 TEXT NOT NULL DEFAULT '',
  heading_glow TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  cta_text TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO homepage_about (heading_line1, heading_glow, body, cta_text) VALUES (
  'Solving the',
  '"Unsolvable"',
  'In the architecture of the internet, the **404 Not Found** error is a signal of failure. It is the moment a journey stops, a link breaks, and progress halts. For most, it is a digital dead end.

> At 404services, we see it differently.

We founded this company on the belief that the most impactful innovations exist in the spaces others have overlooked or abandoned. We reclaimed the ''404'' identity because we specialize in engineering the impossible.

Where other agencies say a feature cannot be built, or a timeline is too tight, or a system is too complex—that is exactly where our work begins. We don''t just fix errors; we architect the solutions that didn''t exist yesterday.',
  'Discover Our Method'
) ON CONFLICT DO NOTHING;

ALTER TABLE homepage_about ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read hp_about" ON homepage_about;
DROP POLICY IF EXISTS "Auth update hp_about" ON homepage_about;
CREATE POLICY "Public read hp_about" ON homepage_about FOR SELECT USING (true);
CREATE POLICY "Auth update hp_about" ON homepage_about FOR UPDATE USING (auth.role() = 'authenticated');

-- Four Pillars (right column)
CREATE TABLE IF NOT EXISTS homepage_pillars (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  icon_name TEXT NOT NULL DEFAULT 'Zap',
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO homepage_pillars (title, subtitle, description, icon_name, sort_order) VALUES
  ('Velocity', 'Beyond Just Speed', 'Next.js + Expo, SSR, edge-caching. We build for near-instantaneous load times (LCP < 1.2s). In a competitive landscape, being second is the same as being last.', 'Zap', 1),
  ('Hyper-Scalability', 'Elastic Architecture', 'Modular architecture, decoupled microservices, and serverless functions. Build for today, but architect for a million users tomorrow.', 'Layers', 2),
  ('Fortified Security', 'Privacy by Design', 'AES-256 encryption, OAuth 2.0, OWASP standards. Security is not an add-on; it is the foundation of user trust.', 'ShieldCheck', 3),
  ('Cinematic Aesthetic', 'UX Excellence', 'High-contrast interfaces, glassmorphism, 60fps animations. Software should be a joy to use—we specialize in ''Visual Retention''.', 'MonitorPlay', 4)
ON CONFLICT DO NOTHING;

ALTER TABLE homepage_pillars ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read pillars" ON homepage_pillars;
DROP POLICY IF EXISTS "Auth manage pillars" ON homepage_pillars;
DROP POLICY IF EXISTS "Auth insert pillars" ON homepage_pillars;
DROP POLICY IF EXISTS "Auth delete pillars" ON homepage_pillars;
CREATE POLICY "Public read pillars" ON homepage_pillars FOR SELECT USING (true);
CREATE POLICY "Auth manage pillars" ON homepage_pillars FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth insert pillars" ON homepage_pillars FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth delete pillars" ON homepage_pillars FOR DELETE USING (auth.role() = 'authenticated');
