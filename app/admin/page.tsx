import { AdminOpsPanel } from "@/components/admin-ops-panel";
import { InternalAuthGate } from "@/components/internal-auth-gate";
import { InternalPortalShell } from "@/components/internal-portal-shell";

const allowedRoles = ["admin", "ops"] as const;

export default function AdminPage() {
  return (
    <InternalAuthGate allowedRoles={[...allowedRoles]}>
      <InternalPortalShell
        active="ops"
        badge="Ops and admin"
        title="Operate live cases from the backend source of truth."
        subtitle="Admin and ops users can see cases allowed by RLS, assign doctors, update fulfilment, write support notes, and inspect audit events."
      >
        <AdminOpsPanel />
      </InternalPortalShell>
    </InternalAuthGate>
  );
}
