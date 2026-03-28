-- Migration 003: About Content
-- Run in: Supabase SQL Editor

CREATE TABLE IF NOT EXISTS about_content (
  id SERIAL PRIMARY KEY,
  section_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed the 3 About sections
INSERT INTO about_content (section_key, title, body) VALUES
  ('who_we_are', 'Defining the Standard for Global Tech.', '404 Services is a leading architecture firm specializing in developing and deploying elite technologies for efficient business management. With a dedicated team of software experts, we construct innovative solutions that massively enhance velocity in the academic, business, and social sectors.

We believe in building powerful relationships with our clients through extreme precision, radical transparency, and a profound understanding of core infrastructure. This approach allows us to establish mutual trust and engineer tailored systems.

We actively promote a culture of trust, objectivity, perfection, corporate loyalty, and swift execution. We are always ready to take on impossible challenges and deliver architectures that exceed expectations, transforming your operations permanently.'),
  ('vision', 'Vision', 'Our vision is to be the global vanguard in technology development, recognized exclusively for our commitment to absolute excellence and extreme innovation. We aim to fundamentally transform how enterprises operate and scale, creating a future where technology seamlessly empowers greater efficiency, collaboration, and unprecedented success.'),
  ('mission', 'Mission', 'Our mission is to arm businesses and individuals with weaponized technology solutions. We strive to multiply productivity, streamline massive data processes, and drive parabolic growth by delivering cutting-edge software architectures that surgically meet the operational demands of our clients across all sectors.')
ON CONFLICT (section_key) DO NOTHING;

ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read about" ON about_content;
DROP POLICY IF EXISTS "Auth update about" ON about_content;
DROP POLICY IF EXISTS "Auth insert about" ON about_content;

CREATE POLICY "Public read about" ON about_content FOR SELECT USING (true);
CREATE POLICY "Auth update about" ON about_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth insert about" ON about_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
