"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { StaffProfile, StaffRole } from "@/lib/backend-contract";
import { getSupabaseBrowserClient, hasSupabaseConfig } from "@/lib/supabase-browser";

type AuthState =
  | { status: "checking" }
  | { status: "missing-config" }
  | { status: "unauthenticated" }
  | { status: "denied"; profile?: StaffProfile }
  | { status: "authorized"; profile: StaffProfile };

type InternalAuthGateProps = {
  allowedRoles: StaffRole[];
  children: React.ReactNode;
};

function authCard(title: string, body: string, action?: React.ReactNode) {
  return (
    <section className="auth-page">
      <div className="auth-panel card card--hero">
        <p className="eyebrow">Restricted workspace</p>
        <h1>{title}</h1>
        <p>{body}</p>
        {action}
      </div>
    </section>
  );
}

export function InternalAuthGate({ allowedRoles, children }: InternalAuthGateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>(() =>
    hasSupabaseConfig() ? { status: "checking" } : { status: "missing-config" },
  );

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(async ({ data }) => {
      const userId = data.session?.user.id;

      if (!userId) {
        setAuthState({ status: "unauthenticated" });
        router.replace(`/staff/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, full_name, role, active")
        .eq("id", userId)
        .single();

      const profile = profileData as StaffProfile | null;

      if (!profile?.active) {
        setAuthState({ status: "denied" });
        return;
      }

      if (!allowedRoles.includes(profile.role)) {
        setAuthState({ status: "denied", profile });
        return;
      }

      setAuthState({ status: "authorized", profile });
    });
  }, [allowedRoles, pathname, router]);

  if (!hasSupabaseConfig() || authState.status === "missing-config") {
    return authCard(
      "Internal access needs Supabase configuration.",
      "Set the public Supabase URL and publishable key in Cloudflare Pages. Patient data should only load after Supabase Auth, RLS, and role checks are active.",
      <Link href="/staff/login" className="button button--secondary">
        Open staff login
      </Link>,
    );
  }

  if (authState.status === "checking") {
    return authCard("Checking staff access.", "Verifying your session before loading internal case data.");
  }

  if (authState.status === "unauthenticated") {
    return authCard(
      "Please sign in to continue.",
      "Internal dashboards are only available to active Nidar staff accounts.",
      <Link href={`/staff/login?next=${encodeURIComponent(pathname)}`} className="button button--primary">
        Staff login
      </Link>,
    );
  }

  if (authState.status === "denied") {
    return authCard(
      "This account does not have access here.",
      "Ask an admin to confirm your role, active status, and assigned workspace before trying again.",
      <Link href="/staff/login" className="button button--secondary">
        Switch account
      </Link>,
    );
  }

  return <>{children}</>;
}
