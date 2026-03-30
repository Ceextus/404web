import { supabase } from "@/lib/supabase";
import ArticleContent from "@/components/ArticleContent";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function ArticleDetail({ params }) {
  const { id } = await params;

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", id)
    .eq("is_published", true)
    .maybeSingle();

  if (!post) notFound();

  return <ArticleContent post={post} />;
}
