"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase-browser";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const rawNext = params.get("next") || "";
  // Only allow same-app relative paths under /preview/ — anything else (an
  // absolute URL, "//host", etc.) could be used as an open-redirect target.
  const next = rawNext.startsWith("/preview/") ? rawNext : "/preview/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = getBrowserSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push(next);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-1">RestoRefine</p>
        <h1 className="text-xl font-bold text-white mb-6">Sign in to preview</h1>

        <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-1.5">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white outline-none focus:border-zinc-600"
        />

        <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-1.5">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white outline-none focus:border-zinc-600"
        />

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest py-3 transition"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function PreviewLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
