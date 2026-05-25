import { doctorMetrics, doctorQueue, doctorReviewCase } from "@/lib/internal-portal-content";
import { InternalPortalShell } from "@/components/internal-portal-shell";

export default function DoctorPage() {
  return (
    <InternalPortalShell
      active="doctor"
      badge="Doctor review"
      title="Review AI-prepared cases, then make the clinical decision."
      subtitle="The doctor portal separates AI assistance from medical judgement: AI can summarize, flag, and organize, but the doctor approves, requests labs, refers, or declines."
    >
      <section className="admin-page">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Clinical queue</p>
            <h2>Doctor workspace</h2>
          </div>
          <span className="admin-pill admin-pill--alert">No auto-prescribing</span>
        </div>

        <div className="admin-metrics-grid">
          {doctorMetrics.map((metric) => (
            <article key={metric.label} className="admin-metric-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>

        <div className="admin-detail__grid">
          <section className="admin-detail__main">
            <article className="admin-case-row">
              <div className="admin-detail__header admin-section-header">
                <div>
                  <p className="eyebrow">{doctorReviewCase.id}</p>
                  <h1>{doctorReviewCase.patient}</h1>
                  <p>{doctorReviewCase.reason}</p>
                </div>
                <span className={`status-badge status-badge--${doctorReviewCase.status}`}>
                  {doctorReviewCase.status.replaceAll("_", " ")}
                </span>
              </div>

              <div className="admin-chip-row">
                {doctorReviewCase.flags.map((flag) => (
                  <span key={flag.label} className={`status-badge status-badge--${flag.tone}`}>
                    {flag.label}
                  </span>
                ))}
              </div>
            </article>

            <article className="admin-metric-card admin-metric-card--wide">
              <p className="eyebrow">AI transcript preview</p>
              <h2>Structured summary for the doctor</h2>
              <p>{doctorReviewCase.aiSummary}</p>
              <ul className="summary-list">
                {doctorReviewCase.transcript.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="admin-metric-card admin-metric-card--wide">
              <p className="eyebrow">Decision panel</p>
              <h2>Doctor chooses the next safe action</h2>
              <div className="admin-decision-grid">
                {doctorReviewCase.decisionOptions.map((option) => (
                  <button key={option} type="button" className="admin-decision-button">
                    {option}
                  </button>
                ))}
              </div>
            </article>
          </section>

          <aside className="admin-detail__side">
            <article className="admin-metric-card admin-metric-card--wide">
              <p className="eyebrow">Review queue</p>
              <h2>Cases waiting for judgement</h2>
              <div className="admin-queue-list">
                {doctorQueue.map((item) => (
                  <div key={item.id} className="admin-mini-row">
                    <div>
                      <strong>{item.id}</strong>
                      <p>{item.detail}</p>
                    </div>
                    <span className={`status-badge status-badge--${item.status}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-metric-card admin-metric-card--wide">
              <p className="eyebrow">Media checklist</p>
              <h2>Photos available for review</h2>
              <ul className="summary-list">
                {doctorReviewCase.photos.map((photo) => (
                  <li key={photo}>{photo}</li>
                ))}
              </ul>
            </article>

            <article className="admin-metric-card admin-metric-card--wide">
              <p className="eyebrow">Clinical boundary</p>
              <h2>What this portal must enforce</h2>
              <p>
                Doctors should see the full intake, source media, flags, and prior decisions before
                signing any prescription, lab request, referral, or decline note.
              </p>
            </article>
          </aside>
        </div>
      </section>
    </InternalPortalShell>
  );
}
