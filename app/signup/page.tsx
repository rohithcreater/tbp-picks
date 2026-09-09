"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!isSupabaseConfigured) {
      setStatus("error");
      setMessage(
        "Supabase isn't connected yet. Add your project URL and anon key to .env.local to enable sign up."
      );
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("success");
    setMessage("Account created. Check your inbox to confirm your email.");
  }

  return (
    <main className="flex min-h-screen items-center bg-bone px-6 py-16">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-center">
          <Link href="/" className="font-display text-xl font-medium text-ink">
            TBP Picks
          </Link>
          <h1 className="mt-6 font-display text-3xl text-ink">Create your account</h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Save picks and pick up where you left off.
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
              disabled={status === "success"}
              className="rounded-lg border border-line bg-white/70 px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-gold disabled:opacity-60"
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
              disabled={status === "success"}
              className="rounded-lg border border-line bg-white/70 px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-gold disabled:opacity-60"
              placeholder="At least 6 characters"
            />
          </label>

          {message && (
            <p
              className={`text-sm ${
                status === "error" ? "text-red-700" : "text-ink-soft"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="mt-2 rounded-full bg-ink px-6 py-3.5 text-[15px] text-bone transition-colors hover:bg-gold-deep disabled:opacity-60"
          >
            {status === "loading"
              ? "Please wait..."
              : status === "success"
              ? "Account created"
              : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Already have an account?{" "}
          <Link href="/login" className="text-ink underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
