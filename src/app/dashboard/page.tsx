// app/dashboard/page.tsx
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let posts = [];

  if (user) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      posts = data || [];
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="mb-6 text-gray-600">
        {user ? (
          <>
            Welcome, user.email! Here are your posts.
            <br />
            <LogoutButton />
          </>
        ) : (
          "Sign in to create and manage your posts."
        )}
      </p>

      {user ? (
        <>
          <Link
            href="/dashboard/new"
            className="inline-block mb-4 text-blue-600 underline"
          >
            ➕ Create New Post
          </Link>

          {posts.length === 0 ? (
            <p>No posts yet. Start writing your first one!</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="border p-4 rounded">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-sm text-gray-500">
                    {post.published ? "Published" : "Draft"}
                    <br />
                    {post.content}
                  </p>
                  <div className="mt-2 space-x-2">
                    <Link
                      href={`/dashboard/edit/${post.id}`}
                      className="text-blue-500"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-green-500"
                    >
                      View
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="mt-4">
          <Link href="/login" className="text-blue-600 underline">
            🔐 Sign In
          </Link>
          to manage your posts.
        </div>
      )}
    </div>
  );
}
