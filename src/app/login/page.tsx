"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      alert("Check your email to confirm your account.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>

      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={handleSignUp}
          className="w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
