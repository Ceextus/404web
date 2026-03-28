-- Migration 006: Portfolio Projects
-- Run in: Supabase SQL Editor

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  client TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  is_featured BOOLEAN DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO projects (title, category, client, description, image_url, is_featured, sort_order) VALUES
  ('FinTech Mobile Application', 'Mobile Solutions', 'Global Bank Inc.', 'Fintech mobile application powered by edge biometric authentication and real-time ledger.', '/project1.jpg', true, 1),
  ('SaaS Dashboard Architecture', 'Web Architecture', 'TechFlow Analytics', 'Modern automotive platform with advanced search and high-speed multi-region booking capability.', '/project2.jpg', true, 2),
  ('E-Commerce Experience', 'Cinematic UI/UX', 'Aura Premium', 'Complete visual redesign with a highly responsive, cinematic brand identity system.', '/project3.jpg', true, 3),
  ('Global Tech Rebrand', 'Web Architecture', 'Nexus Systems', 'Hyper-scalable online retail store driven by a predictive personalized AI engine.', '/project4.jpg', true, 4),
  ('Enterprise Ecosystem', 'SaaS & Cloud Engines', 'DataCloud Inc.', 'Real-time analytics engine processing terabytes of logistics data per second.', '/project1.jpg', false, 5),
  ('HealthTech Companion', 'Mobile Solutions', 'MediLife', 'Proactive health tracking and automated prescription management mobile app.', '/project2.jpg', false, 6),
  ('Immersive VR Showcase', 'Cinematic UI/UX', 'Horizon Real Estate', 'Award-winning WebGL virtual property touring experience.', '/project3.jpg', false, 7),
  ('Automated Logistics Hub', 'SaaS & Cloud Engines', 'TransGlobal', 'Cloud-native freight processing dashboard with AI route optimization.', '/project4.jpg', false, 8)
ON CONFLICT DO NOTHING;

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read projects" ON projects;
DROP POLICY IF EXISTS "Auth manage projects" ON projects;
DROP POLICY IF EXISTS "Auth insert projects" ON projects;
DROP POLICY IF EXISTS "Auth delete projects" ON projects;
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Auth manage projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');
