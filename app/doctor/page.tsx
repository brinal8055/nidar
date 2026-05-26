import { DoctorReviewPanel } from "@/components/doctor-review-panel";
import { InternalAuthGate } from "@/components/internal-auth-gate";
import { InternalPortalShell } from "@/components/internal-portal-shell";

const allowedRoles = ["doctor"] as const;

export default function DoctorPage() {
  return (
    <InternalAuthGate allowedRoles={[...allowedRoles]}>
      <InternalPortalShell
        active="doctor"
        badge="Doctor review"
        title="Review assigned cases only."
        subtitle="AI may organize intake data and flags, but clinical decisions are submitted by the signed-in doctor and written to the audit trail."
      >
        <DoctorReviewPanel />
      </InternalPortalShell>
    </InternalAuthGate>
  );
}
