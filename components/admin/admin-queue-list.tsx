import Link from "next/link";

import { PatientCase, roleMeta } from "@/lib/admin/mock-data";
import { StatusBadge } from "@/components/admin/status-badge";

type AdminQueueListProps = {
  cases: PatientCase[];
};

export function AdminQueueList({ cases }: AdminQueueListProps) {
  if (!cases.length) {
    return (
      <div className="card">
        <p className="eyebrow">Queue</p>
        <h2>No matching cases</h2>
        <p>Try clearing the status or team filters to return to the full review queue.</p>
      </div>
    );
  }

  return (
    <div className="admin-queue-list">
      {cases.map((item) => (
        <Link key={item.id} href={`/admin/cases/${item.id}`} className="admin-case-row">
          <div className="admin-case-row__top">
            <div>
              <p className="eyebrow">Case {item.id}</p>
              <h2>{item.patient.name}</h2>
            </div>
            <div className="admin-chip-row">
              <StatusBadge tone={item.status} />
              <StatusBadge tone={item.priority} />
            </div>
          </div>

          <div className="admin-case-row__meta">
            <span>
              {item.patient.age}, {item.patient.sex}
            </span>
            <span>{item.patient.location}</span>
            <span>{roleMeta[item.assignedRole].label}</span>
            <span>{item.assignedTo}</span>
          </div>

          <p>{item.clinical.summary}</p>

          <div className="admin-case-row__footer">
            <div className="admin-chip-row">
              <span className="admin-pill">{item.intake.photoCount} photos</span>
              <span className="admin-pill">{item.intake.redFlags.length} red flags</span>
              <span className="admin-pill">Due {item.reviewDueAt}</span>
            </div>
            <span className="admin-case-row__link">Open case</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
