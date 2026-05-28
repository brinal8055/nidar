const biomarkers = [
  { name: "Vitamin D", value: "18", unit: "ng/mL", status: "low" },
  { name: "B12", value: "312", unit: "pg/mL", status: "borderline" },
  { name: "TSH", value: "2.4", unit: "mIU/L", status: "normal" },
  { name: "HbA1c", value: "5.8", unit: "%", status: "borderline" },
  { name: "LDL", value: "128", unit: "mg/dL", status: "high" },
  { name: "SGPT", value: "34", unit: "U/L", status: "normal" },
  { name: "Creatinine", value: "1.4", unit: "mg/dL", status: "critical" },
];

export default function HealthDashboardPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Demo dashboard</p>
        <h1>Health Tracking dashboard preview.</h1>
        <p>
          Demo-safe static data only. Real reports should appear here only after auth, consent,
          role rules, and private storage access are fully wired.
        </p>
      </div>

      <div className="container admin-metrics-grid">
        {biomarkers.map((marker) => (
          <article key={marker.name} className="admin-metric-card">
            <span>{marker.name}</span>
            <strong>
              {marker.value} <small>{marker.unit}</small>
            </strong>
            <p className={`status-badge status-badge--${marker.status}`}>{marker.status}</p>
          </article>
        ))}
      </div>

      <div className="container admin-detail__grid">
        <section className="admin-detail__main">
          <article className="admin-metric-card admin-metric-card--wide">
            <p className="eyebrow">Latest report summary</p>
            <h2>Annual baseline report organized for review.</h2>
            <p>
              This preview shows how report markers can be grouped into trends and next-step
              context. AI-assisted summaries do not replace doctor guidance.
            </p>
          </article>
          <article className="admin-metric-card admin-metric-card--wide">
            <p className="eyebrow">Trend placeholders</p>
            <h2>Vitamin D, B12, TSH, HbA1c, LDL, SGPT</h2>
            <div className="trend-placeholder-grid">
              {biomarkers.map((marker) => (
                <div key={marker.name} className="trend-placeholder">
                  <span>{marker.name}</span>
                  <div />
                </div>
              ))}
            </div>
          </article>
          <article className="admin-metric-card admin-metric-card--wide">
            <p className="eyebrow">Doctor-reviewed insights</p>
            <h2>Guidance appears only after review.</h2>
            <p>Low Vitamin D and borderline HbA1c may need follow-up, but final guidance belongs to a licensed doctor.</p>
          </article>
        </section>
        <aside className="admin-detail__side">
          <article className="admin-metric-card admin-metric-card--wide">
            <p className="eyebrow">Care plan</p>
            <h2>Demo next steps</h2>
            <ul className="summary-list">
              <li>Repeat selected markers in 90 days where appropriate.</li>
              <li>Discuss supplement or medicine options only after review.</li>
              <li>Track lifestyle actions and report uploads over time.</li>
            </ul>
          </article>
          <article className="admin-metric-card admin-metric-card--wide">
            <p className="eyebrow">Orders</p>
            <h2>Partner fulfilment placeholder</h2>
            <p>Lab, supplement, or medicine orders will be shown only after appropriate workflow approval.</p>
          </article>
          <article className="admin-metric-card admin-metric-card--wide">
            <p className="eyebrow">Reminders</p>
            <h2>Retest reminders</h2>
            <p>90-day Vitamin D check, 6-month HbA1c tracking, and annual baseline reminders.</p>
          </article>
        </aside>
      </div>
    </section>
  );
}
