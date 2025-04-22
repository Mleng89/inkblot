// app/dashboard/edit/[id]/page.tsx
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!post || error) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

      <form action="/api/edit-post" method="POST" className="space-y-4">
        <input
          name="title"
          defaultValue={post.title}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content"
          defaultValue={post.content}
          rows={10}
          className="w-full p-2 border rounded"
        />
        <input type="hidden" name="id" value={post.id} />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}
