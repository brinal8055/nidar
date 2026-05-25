import {
  backendDataSurfaces,
  opsCases,
  opsMetrics,
  opsWorkflow,
} from "@/lib/internal-portal-content";
import { InternalPortalShell } from "@/components/internal-portal-shell";

export default function AdminPage() {
  return (
    <InternalPortalShell
      active="ops"
      badge="Ops and admin"
      title="Control every care handoff without losing context."
      subtitle="This is where the team sees intake data, payment state, doctor queue, fulfilment, support risk, and follow-up tasks before the real backend is connected."
    >
      <section className="admin-page">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Today</p>
            <h2>Operational snapshot</h2>
          </div>
          <span className="admin-pill admin-pill--alert">Sandbox data</span>
        </div>

        <div className="admin-metrics-grid">
          {opsMetrics.map((metric) => (
            <article key={metric.label} className="admin-metric-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>

        <div className="admin-two-col">
          <section className="admin-page">
            <div className="admin-section-header">
              <div>
                <p className="eyebrow">Case queue</p>
                <h2>What ops needs to watch</h2>
              </div>
              <div className="admin-pill-row">
                <span className="admin-filter-chip admin-filter-chip--active">All</span>
                <span className="admin-filter-chip">Hair Care</span>
                <span className="admin-filter-chip">Health Tracking</span>
              </div>
            </div>

            <div className="admin-queue-list">
              {opsCases.map((item) => (
                <article key={item.id} className="admin-case-row">
                  <div className="admin-case-row__top">
                    <div>
                      <p className="eyebrow">{item.id}</p>
                      <h2>{item.patient}</h2>
                    </div>
                    <span className={`status-badge status-badge--${item.status}`}>{item.status.replaceAll("_", " ")}</span>
                  </div>
                  <p>{item.summary}</p>
                  <div className="admin-case-row__meta">
                    <span>{item.vertical}</span>
                    <span>{item.owner}</span>
                    <span>{item.updated}</span>
                  </div>
                  <div className="admin-case-row__footer">
                    <span className={`admin-pill${item.priority === "SLA risk" ? " admin-pill--alert" : ""}`}>
                      {item.priority}
                    </span>
                    <span className="admin-case-row__link">Open case once backend is connected</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="admin-page">
            <article className="admin-metric-card admin-metric-card--wide">
              <p className="eyebrow">Backend data</p>
              <h2>Where the admin sees data</h2>
              <p>
                Ops should not depend on browser localStorage. The backend should persist each step
                as a case record with audit history and role-based access.
              </p>
              <ul className="summary-list">
                {backendDataSurfaces.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="admin-metric-card admin-metric-card--wide">
              <p className="eyebrow">Workflow lanes</p>
              <h2>How the ops board should behave</h2>
              <div className="admin-workflow-list">
                {opsWorkflow.map((lane) => (
                  <div key={lane.title}>
                    <strong>{lane.title}</strong>
                    <ul className="summary-list">
                      {lane.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </div>
      </section>
    </InternalPortalShell>
  );
}
