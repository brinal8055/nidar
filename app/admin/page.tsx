import { Suspense } from "react";

import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="admin-page">
          <section className="card">
            <p className="eyebrow">Queue overview</p>
            <h2>Loading admin dashboard</h2>
            <p className="subtle">Preparing mock case filters.</p>
          </section>
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}
