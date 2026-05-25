"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getStaffHome, StaffProfile, StaffRole } from "@/lib/backend-contract";
import { getSupabaseBrowserClient, hasSupabaseConfig } from "@/lib/supabase-browser";

type LoginState = "idle" | "checking" | "submitting";

function isStaffRole(role: string): role is StaffRole {
  return role === "admin" || role === "ops" || role === "doctor" || role === "support";
}

function getNextPath(role: StaffRole) {
  if (typeof window === "undefined") {
    return getStaffHome(role);
  }

  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");

  if (next?.startsWith("/admin") && (role === "admin" || role === "ops")) {
    return next;
  }

  if (next?.startsWith("/doctor") && role === "doctor") {
    return next;
  }

  return getStaffHome(role);
}

export function StaffLoginPanel() {
  const router = useRouter();
  const [state, setState] = useState<LoginState>(() => (hasSupabaseConfig() ? "checking" : "idle"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const routeIfAuthorized = useCallback(async (userId: string) => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setState("idle");
      return;
    }

    const { data, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, role, active")
      .eq("id", userId)
      .single();

    const profile = data as StaffProfile | null;

    if (profileError || !profile || !profile.active || !isStaffRole(profile.role)) {
      setError("This account is not enabled for Nidar staff access.");
      setState("idle");
      return;
    }

    router.replace(getNextPath(profile.role));
  }, [router]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const userId = data.session?.user.id;

      if (userId) {
        void routeIfAuthorized(userId);
        return;
      }

      setState("idle");
    });
  }, [routeIfAuthorized]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setState("submitting");

    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase is not configured for this deployment yet.");
      setState("idle");
      return;
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !data.user) {
      setError(signInError?.message || "Unable to sign in with these credentials.");
      setState("idle");
      return;
    }

    await routeIfAuthorized(data.user.id);
  }

  if (!hasSupabaseConfig()) {
    return (
      <div className="auth-panel card card--hero">
        <p className="eyebrow">Backend setup required</p>
        <h1>Staff login is ready for Supabase credentials.</h1>
        <p>
          Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
          in Cloudflare Pages before using staff/admin/doctor access.
        </p>
        <Link href="/" className="button button--secondary">
          Return home
        </Link>
      </div>
    );
  }

  return (
    <form className="auth-panel card card--form" onSubmit={handleSubmit}>
      <div className="stack">
        <div>
          <p className="eyebrow">Staff access</p>
          <h1>Sign in to Nidar Health.</h1>
          <p>
            Admin, ops, and doctor accounts are provisioned in Supabase. Patient data
            stays behind role checks and row-level security.
          </p>
        </div>

        <label className="field">
          <span>Email</span>
          <input
            autoComplete="email"
            inputMode="email"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="doctor@nidar.health"
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            autoComplete="current-password"
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}
      </div>

      <button type="submit" className="button button--primary" disabled={state === "submitting" || state === "checking"}>
        {state === "submitting" || state === "checking" ? "Checking access..." : "Sign in"}
      </button>
    </form>
  );
}
