import { supabase } from "@/lib/supabase";
import InsightsContent from "@/components/InsightsContent";

export const revalidate = 60;

export default async function InsightsPage() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return <InsightsContent posts={posts || []} />;
}
