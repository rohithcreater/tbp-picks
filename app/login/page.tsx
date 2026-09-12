"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!isSupabaseConfigured) {
      setStatus("error");
      setMessage(
        "Supabase isn't connected yet. Add your project URL and anon key to .env.local to enable sign in."
      );
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    router.push("/");
  }

  async function handleGoogleSignIn() {
    if (!isSupabaseConfigured) {
      setStatus("error");
      setMessage("Supabase isn't connected yet.");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <main className="flex min-h-screen items-center bg-bone px-6 py-16">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-center">
          <Link href="/" className="font-display text-xl font-medium text-ink">
            TBP Picks
          </Link>
          <h1 className="mt-6 font-display text-3xl text-ink">Welcome back</h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Sign in to keep track of the picks you care about.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-ink">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-line bg-white/70 px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-gold"
              placeholder="you@example.com"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-ink">
            Password
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-line bg-white/70 px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-gold"
              placeholder="At least 6 characters"
            />
          </label>

          {message && (
            <p className={`text-sm ${status === "error" ? "text-red-700" : "text-ink-soft"}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 rounded-full bg-ink px-6 py-3.5 text-[15px] text-bone transition-colors hover:bg-gold-deep disabled:opacity-60"
          >
            {status === "loading" ? "Please wait..." : "Sign in"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-[15px] text-ink transition-colors hover:border-ink"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-ink-soft">
          New to TBP Picks?{" "}
          <Link href="/signup" className="text-ink underline underline-offset-2">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}