"use client";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInternalRoute = pathname.startsWith("/admin") || pathname.startsWith("/doctor");

  if (isInternalRoute) {
    return <div className="admin-root-shell">{children}</div>;
  }

  return (
    <div className="page-shell">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
