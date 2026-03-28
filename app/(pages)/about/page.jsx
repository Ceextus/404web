import { supabase } from "@/lib/supabase";
import AboutContent from "@/components/AboutContent";
import CoreTeamSection from "@/components/Core";

export const revalidate = 60;

export default async function AboutPage() {
  const [
    { data: aboutData },
    { data: teamMembers },
    { data: coreValues }
  ] = await Promise.all([
    supabase.from("about_content").select("section_key, title, body"),
    supabase.from("team_members").select("*").order("sort_order", { ascending: true }),
    supabase.from("core_values").select("*").order("sort_order", { ascending: true }),
  ]);

  const about = {};
  if (aboutData) {
    aboutData.forEach((row) => {
      about[row.section_key] = { title: row.title, body: row.body };
    });
  }

  return (
    <>
      <AboutContent about={about} />
      <CoreTeamSection members={teamMembers || []} coreValues={coreValues || []} />
    </>
  );
}