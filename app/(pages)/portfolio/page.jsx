import { supabase } from "@/lib/supabase";
import PortfolioContent from "@/components/PortfolioContent";

export const revalidate = 60;

export default async function PortfolioPage() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  // Extract unique categories from database
  const categories = ["All"];
  if (projects) {
    const uniqueCats = [...new Set(projects.map((p) => p.category))];
    categories.push(...uniqueCats);
  }

  return <PortfolioContent projects={projects || []} categories={categories} />;
}