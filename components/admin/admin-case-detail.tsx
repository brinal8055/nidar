import Link from "next/link";

import {
  PatientCase,
  fulfilmentMeta,
  roleMeta,
  supportTagLabels,
} from "@/lib/admin/mock-data";
import { StatusBadge } from "@/components/admin/status-badge";

type AdminCaseDetailProps = {
  item: PatientCase;
};

export function AdminCaseDetail({ item }: AdminCaseDetailProps) {
  return (
    <div className="admin-detail">
      <div className="admin-detail__header card">
        <div>
          <p className="eyebrow">Case {item.id}</p>
          <h1>{item.patient.name}</h1>
          <p>
            {item.patient.age} years old, {item.patient.sex}, based in {item.patient.location}
          </p>
        </div>
        <div className="admin-chip-row">
          <StatusBadge tone={item.status} />
          <StatusBadge tone={item.priority} />
        </div>
      </div>

      <div className="admin-detail__grid">
        <div className="admin-detail__main">
          <section className="card">
            <p className="eyebrow">Patient profile</p>
            <div className="admin-key-grid">
              <div>
                <strong>Phone</strong>
                <span>{item.patient.phone}</span>
              </div>
              <div>
                <strong>Email</strong>
                <span>{item.patient.email}</span>
              </div>
              <div>
                <strong>Assigned role</strong>
                <span>{roleMeta[item.assignedRole].label}</span>
              </div>
              <div>
                <strong>Assigned owner</strong>
                <span>{item.assignedTo}</span>
              </div>
              <div>
                <strong>Submitted</strong>
                <span>{item.submittedAt}</span>
              </div>
              <div>
                <strong>Review due</strong>
                <span>{item.reviewDueAt}</span>
              </div>
            </div>
          </section>

          <section className="card">
            <p className="eyebrow">Intake snapshot</p>
            <div className="stack">
              <div>
                <strong>Hair-loss duration</strong>
                <p>{item.intake.duration}</p>
              </div>
              <div>
                <strong>Pattern summary</strong>
                <p>{item.intake.hairLossPattern}</p>
              </div>
              <div>
                <strong>Family history</strong>
                <p>{item.intake.familyHistory}</p>
              </div>
              <div className="admin-chip-row">
                {item.intake.recentTriggers.map((entry) => (
                  <span key={entry} className="admin-pill">
                    {entry}
                  </span>
                ))}
              </div>
              <div className="admin-chip-row">
                {item.intake.scalpSymptoms.map((entry) => (
                  <span key={entry} className="admin-pill">
                    {entry}
                  </span>
                ))}
              </div>
              <div className="admin-chip-row">
                {item.intake.priorTreatments.map((entry) => (
                  <span key={entry} className="admin-pill">
                    {entry}
                  </span>
                ))}
              </div>
              <div className="admin-chip-row">
                {item.intake.currentMedicines.map((entry) => (
                  <span key={entry} className="admin-pill">
                    {entry}
                  </span>
                ))}
                {!item.intake.currentMedicines.length ? <span className="admin-pill">No current medicines</span> : null}
              </div>
              <div className="admin-chip-row">
                {item.intake.conditions.map((entry) => (
                  <span key={entry} className="admin-pill">
                    {entry}
                  </span>
                ))}
                {!item.intake.conditions.length ? <span className="admin-pill">No conditions noted</span> : null}
              </div>
              <div className="admin-chip-row">
                {item.intake.redFlags.length ? (
                  item.intake.redFlags.map((entry) => (
                    <span key={entry} className="admin-pill admin-pill--alert">
                      {entry}
                    </span>
                  ))
                ) : (
                  <span className="admin-pill">No red flags selected</span>
                )}
              </div>
            </div>
          </section>

          <section className="card">
            <p className="eyebrow">Clinical review template</p>
            <div className="stack">
              <div>
                <strong>AI pre-screening note</strong>
                <p>{item.clinical.aiPrescreen}</p>
              </div>
              <div>
                <strong>Doctor decision path</strong>
                <p>{item.clinical.doctorDecision}</p>
              </div>
              <div>
                <strong>Structured summary</strong>
                <p>{item.clinical.summary}</p>
              </div>
              <div>
                <strong>Eligibility note</strong>
                <p>{item.clinical.eligibility}</p>
              </div>
              <div>
                <strong>Contraindications</strong>
                <ul className="summary-list">
                  {item.clinical.contraindications.length ? (
                    item.clinical.contraindications.map((entry) => <li key={entry}>{entry}</li>)
                  ) : (
                    <li>No contraindications captured yet.</li>
                  )}
                </ul>
              </div>
              <div>
                <strong>Follow-up plan</strong>
                <p>{item.clinical.followUpPlan}</p>
              </div>
            </div>
          </section>

          <section className="card">
            <p className="eyebrow">Audit log</p>
            <div className="timeline">
              {item.auditLog.map((entry) => (
                <div key={`${entry.time}-${entry.action}`} className="timeline__item timeline__item--complete">
                  <strong>
                    {entry.action} by {entry.actor}
                  </strong>
                  <p>{entry.detail}</p>
                  <span className="timeline__meta">
                    {entry.time} · {roleMeta[entry.role].label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="admin-detail__side">
          <section className="card">
            <p className="eyebrow">Consent and uploads</p>
            <div className="stack">
              <div className="admin-chip-row">
                <StatusBadge
                  tone={item.intake.consent.teleconsult ? "approved" : "declined"}
                  label={item.intake.consent.teleconsult ? "Teleconsult consent" : "Teleconsult missing"}
                />
                <StatusBadge
                  tone={item.intake.consent.privacy ? "approved" : "declined"}
                  label={item.intake.consent.privacy ? "Privacy consent" : "Privacy missing"}
                />
                <StatusBadge
                  tone={item.intake.consent.prescriptionTransfer ? "approved" : "declined"}
                  label={
                    item.intake.consent.prescriptionTransfer
                      ? "Prescription transfer allowed"
                      : "Rx transfer not yet allowed"
                  }
                />
              </div>
              <p>{item.intake.photoCount} photos uploaded.</p>
              <p>{item.intake.uploadNotes}</p>
            </div>
          </section>

          <section className="card">
            <p className="eyebrow">Prescription panel</p>
            <div className="stack">
              <div className="admin-chip-row">
                <StatusBadge tone={item.prescription.decision} />
              </div>
              <div>
                <strong>Doctor</strong>
                <p>
                  {item.prescription.doctor}
                  <br />
                  {item.prescription.registration}
                </p>
              </div>
              <div>
                <strong>Plan</strong>
                <p>{item.prescription.plan}</p>
              </div>
              <div>
                <strong>Dosage and duration</strong>
                <p>
                  {item.prescription.dosage}
                  <br />
                  {item.prescription.duration}
                </p>
              </div>
              <div>
                <strong>Instructions</strong>
                <p>{item.prescription.instructions}</p>
              </div>
              <div className="button-row">
                <button type="button" className="button button--secondary">
                  Approve in workflow
                </button>
                <button type="button" className="button button--ghost">
                  Request follow-up
                </button>
              </div>
            </div>
          </section>

          <section className="card">
            <p className="eyebrow">Fulfilment and support</p>
            <div className="stack">
              <div className="admin-chip-row">
                <StatusBadge tone={item.fulfilment.status} label={fulfilmentMeta[item.fulfilment.status]} />
              </div>
              <div>
                <strong>Pharmacy</strong>
                <p>{item.fulfilment.pharmacy}</p>
              </div>
              <div>
                <strong>ETA</strong>
                <p>{item.fulfilment.eta}</p>
              </div>
              <div>
                <strong>Ops note</strong>
                <p>{item.fulfilment.notes}</p>
              </div>
              <div>
                <strong>Support watch</strong>
                <p>{item.support.latestMessage}</p>
              </div>
              <div className="admin-chip-row">
                {item.support.tags.length ? (
                  item.support.tags.map((tag) => <StatusBadge key={tag} tone={tag} label={supportTagLabels[tag]} />)
                ) : (
                  <span className="admin-pill">No active support tags</span>
                )}
                {item.support.grievanceOpen ? <span className="admin-pill admin-pill--alert">Grievance open</span> : null}
              </div>
            </div>
          </section>

          <section className="card">
            <p className="eyebrow">Next navigation</p>
            <div className="stack">
              <Link href="/admin" className="button button--secondary">
                Back to queue
              </Link>
              <Link href="/admin?status=follow_up" className="button button--ghost">
                View refill queue
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
