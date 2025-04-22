import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function PublicPostPage({ params }: Props) {
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!post || error) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <article className="prose dark:prose-invert whitespace-pre-wrap">
        {post.content}
      </article>
    </div>
  );
}
