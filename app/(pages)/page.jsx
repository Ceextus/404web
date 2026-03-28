import AboutSection from '@/components/AboutSection'
import HeroScene from '@/components/hero/HeroScene'
import Projects from '@/components/Projects'
import Core from '@/components/Core'
import WebDevelopmentSection from '@/components/WebDevelopmentSection'
import WorkingComponent from '@/components/WorkingComponent'
import { supabase } from '@/lib/supabase'
import React from 'react'

export const revalidate = 60;

export default async function HomePage() {
  // Fetch data from Supabase
  const [
    { data: slides },
    { data: brandStory },
    { data: pillars },
    { data: teamMembers },
    { data: coreValues },
    { data: featuredProjects }
  ] = await Promise.all([
    supabase.from("hero_slides").select("*").order("sort_order", { ascending: true }),
    supabase.from("homepage_about").select("*").limit(1).maybeSingle(),
    supabase.from("homepage_pillars").select("*").order("sort_order", { ascending: true }),
    supabase.from("team_members").select("*").order("sort_order", { ascending: true }),
    supabase.from("core_values").select("*").order("sort_order", { ascending: true }),
    supabase.from("projects").select("*").eq("is_featured", true).order("sort_order", { ascending: true }).limit(4)
  ]);

  return (
    <div>
      <HeroScene slides={slides || []} />
      <AboutSection brandStory={brandStory || null} pillars={pillars || []} />
      <WebDevelopmentSection />
      <WorkingComponent />
      <Projects projects={featuredProjects || []} />
      <Core members={teamMembers || []} coreValues={coreValues || []} />
    </div>
  )
}
