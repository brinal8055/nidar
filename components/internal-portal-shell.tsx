import Link from "next/link";

import { siteConfig } from "@/lib/site-content";

type InternalPortalShellProps = {
  active: "ops" | "doctor";
  badge: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const internalNav = [
  {
    id: "ops",
    href: "/admin",
    label: "Ops dashboard",
    description: "Cases, orders, support, SLA",
  },
  {
    id: "doctor",
    href: "/doctor",
    label: "Doctor portal",
    description: "AI transcript, flags, decisions",
  },
];

export function InternalPortalShell({ active, badge, title, subtitle, children }: InternalPortalShellProps) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar" aria-label="Internal workspace navigation">
        <Link href="/" className="admin-sidebar__brand" aria-label={`${siteConfig.name} home`}>
          <span className="brand-mark__chip">N</span>
          <span>
            <strong>{siteConfig.shortName}</strong>
            <small>Internal workspace</small>
          </span>
        </Link>

        <nav className="admin-sidebar__nav" aria-label="Internal portals">
          {internalNav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`admin-nav-link${active === item.id ? " admin-nav-link--active" : ""}`}
            >
              <strong>{item.label}</strong>
              <span>{item.description}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar__section">
          <p className="subtle">
            Sample data only. Real patient data should appear here after authentication,
            role-based access, audit logs, and backend persistence are connected.
          </p>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <span className="status-badge status-badge--operations">{badge}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <Link href="/" className="button button--secondary button--compact">
            Public site
          </Link>
        </div>

        <div className="admin-main__content">{children}</div>
      </main>
    </div>
  );
}
