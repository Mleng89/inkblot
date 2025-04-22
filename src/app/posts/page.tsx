import { createClient } from "@/utils/supabase/server";

export default async function Posts() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase.from("posts").select();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No posts found</div>;
  }

  return <pre>{JSON.stringify(posts, null, 2)}</pre>;
}
