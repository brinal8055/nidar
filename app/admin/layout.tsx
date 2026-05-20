import { Suspense } from "react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";

function AdminSidebarFallback() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <span className="brand-mark__chip">N</span>
        <div>
          <strong>Nidar Ops</strong>
          <small>Doctor and ops workspace</small>
        </div>
      </div>
      <div className="admin-sidebar__section">
        <p className="eyebrow">Loading navigation</p>
        <p className="subtle">Preparing queue filters and workspace links.</p>
      </div>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-layout">
      <Suspense fallback={<AdminSidebarFallback />}>
        <AdminSidebar />
      </Suspense>
      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">Internal workspace</p>
            <h1>Doctor and ops dashboard</h1>
          </div>
          <p className="subtle">
            Internal preview only. Real auth, audit persistence, and role enforcement still need backend
            integration.
          </p>
        </header>
        <main className="admin-main__content">{children}</main>
      </div>
    </div>
  );
}
