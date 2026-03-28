-- Migration 005: Team Members & Core Values
-- Run in: Supabase SQL Editor

CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  linkedin_url TEXT DEFAULT '',
  twitter_url TEXT DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO team_members (name, role, bio, image_url, linkedin_url, twitter_url, sort_order) VALUES
  ('Godson Ogundare', 'Chief Executive Officer', 'Visionary leader driving the strategic direction and cinematic UI/UX excellence of 404 Services.', '/godson.jpg', '', '', 1),
  ('Chukwunonso Timothy Obi', 'Chief Technology Officer', 'Head of engineering, architecting next-generation mobile and web platforms for massive scale.', '/nonso.jpg', '', '', 2),
  ('Sixtus Joseph', 'Chief Operations Officer', 'Lead engineer orchestrating frontend development, aggressive operations, and scalable Next.js architectures.', '/sixtus.jpeg', '', '', 3),
  ('Basil Okwute', 'Senior Backend Engineer', 'Systems architect focused on decoupled microservices, secure cloud infrastructure, and robust API logic.', '/basil.jpg', '', '', 4),
  ('Ifeanyi Okolo', 'Business Analyst', 'Translates complex business needs into precise technical requirements and strategic blueprints.', '/ifeanyiokolo.jpg', '', '', 5),
  ('Ifeanyi Emmanuel Opara', 'Product Manager', 'Guides product lifecycles from ideation to deployment, ensuring surgical precision in market delivery.', '/ifeanyi_ie.jpg', '', '', 6),
  ('Mathias Oyinane', 'Legal Counsel', 'Ensures enterprise-grade compliance, intellectual property protection, and absolute confidentiality.', '/mathias.jpg', '', '', 7)
ON CONFLICT DO NOTHING;

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read team" ON team_members;
DROP POLICY IF EXISTS "Auth manage team" ON team_members;
DROP POLICY IF EXISTS "Auth insert team" ON team_members;
DROP POLICY IF EXISTS "Auth delete team" ON team_members;
CREATE POLICY "Public read team" ON team_members FOR SELECT USING (true);
CREATE POLICY "Auth manage team" ON team_members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth insert team" ON team_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth delete team" ON team_members FOR DELETE USING (auth.role() = 'authenticated');

-- Core Values
CREATE TABLE IF NOT EXISTS core_values (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0
);

INSERT INTO core_values (title, description, sort_order) VALUES
  ('Absolute Integrity', 'We write code with accountability. Zero technical debt, complete transparency.', 1),
  ('Surgical Precision', 'Every pixel, every API route, and every database query is optimized for velocity.', 2),
  ('Confidentiality', 'Enterprise-grade security and strict NDA compliance for all proprietary systems.', 3)
ON CONFLICT DO NOTHING;

ALTER TABLE core_values ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read values" ON core_values;
DROP POLICY IF EXISTS "Auth manage values" ON core_values;
DROP POLICY IF EXISTS "Auth insert values" ON core_values;
DROP POLICY IF EXISTS "Auth delete values" ON core_values;
CREATE POLICY "Public read values" ON core_values FOR SELECT USING (true);
CREATE POLICY "Auth manage values" ON core_values FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth insert values" ON core_values FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth delete values" ON core_values FOR DELETE USING (auth.role() = 'authenticated');
