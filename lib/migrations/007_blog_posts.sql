-- Migration 007: Blog Posts
-- Run in: Supabase SQL Editor

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  author_name TEXT NOT NULL DEFAULT '',
  author_role TEXT NOT NULL DEFAULT '',
  read_time TEXT NOT NULL DEFAULT '',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure slug is unique for URL routing
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_unique ON blog_posts (slug);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published posts" ON blog_posts;
DROP POLICY IF EXISTS "Auth manage posts" ON blog_posts;
DROP POLICY IF EXISTS "Auth insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Auth delete posts" ON blog_posts;
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Auth manage posts" ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth insert posts" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth delete posts" ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');

-- Admin needs to read ALL posts (including drafts)
DROP POLICY IF EXISTS "Auth read all posts" ON blog_posts;
CREATE POLICY "Auth read all posts" ON blog_posts FOR SELECT USING (auth.role() = 'authenticated');
