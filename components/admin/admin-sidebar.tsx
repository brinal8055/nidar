"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { adminNavigation } from "@/lib/admin/mock-data";

const previewRoles = ["Doctor", "Medical director", "Operations", "Support"];

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function isNavActive(href: string) {
    if (pathname.startsWith("/admin/cases")) {
      return href === "/admin";
    }

    const [targetPath, queryString] = href.split("?");

    if (pathname !== targetPath) {
      return false;
    }

    if (!queryString) {
      return !searchParams.get("status");
    }

    const targetParams = new URLSearchParams(queryString);
    return Array.from(targetParams.entries()).every(([key, value]) => searchParams.get(key) === value);
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <span className="brand-mark__chip">N</span>
        <div>
          <strong>Nidar Ops</strong>
          <small>Doctor and ops workspace</small>
        </div>
      </div>

      <nav className="admin-sidebar__nav" aria-label="Admin navigation">
        {adminNavigation.map((item) => {
          const isActive = isNavActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link${isActive ? " admin-nav-link--active" : ""}`}
            >
              <strong>{item.label}</strong>
              <span>{item.description}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar__section">
        <p className="eyebrow">RBAC preview</p>
        <div className="admin-pill-row">
          {previewRoles.map((role) => (
            <span key={role} className="admin-pill">
              {role}
            </span>
          ))}
        </div>
        <p className="subtle">
          Real auth and role gates are still pending, but the shell is structured around the planned
          doctor, medical-director, ops, and support roles.
        </p>
      </div>
    </aside>
  );
}
