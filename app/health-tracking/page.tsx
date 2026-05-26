import Link from "next/link";

import { Icon } from "@/components/icon";
import { healthTrackingPackages, healthTrackingProfiles } from "@/lib/site-content";

const workflow = [
  "Home sample collection through partner labs",
  "AI-organized report insights",
  "Doctor-reviewed guidance",
  "Biomarker tracking over time",
  "Medicines or supplements via licensed pharmacy partners where appropriate",
  "Retest reminders",
];

export default function HealthTrackingPage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-shell">
          <div className="hero-copy hero-copy--premium">
            <p className="eyebrow">Annual Health Tracking</p>
            <h1>Understand your reports and track your body over time.</h1>
            <p className="hero-copy__lead">
              Book partner-lab sample collection or bring existing reports into a dashboard that
              organizes biomarkers, trends, reminders, and doctor-reviewed guidance.
            </p>
            <div className="button-row">
              <Link href="/health-tracking/quiz" className="button button--primary">
                Join Health Tracking Beta
              </Link>
              <Link href="/health-tracking/plans" className="button button--secondary">
                View Plans
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-device">
              <div className="hero-device__screen">
                <div className="hero-device__screen-top">
                  <span>Health summary</span>
                  <strong>7 profiles</strong>
                </div>
                {healthTrackingProfiles.slice(0, 5).map((profile) => (
                  <div key={profile} className="hero-device__mini-card">
                    <Icon name="fact_check" />
                    <span>{profile}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container card-grid card-grid--three">
          {workflow.map((item) => (
            <article key={item} className="card">
              <Icon name="check_circle" />
              <h2>{item}</h2>
              <p>Designed for plain-language understanding, consent-first handling, and careful review.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--soft">
        <div className="container section-heading section-heading--center">
          <p className="eyebrow">Beta plans</p>
          <h2>Start with focused packages, not an overwhelming catalog.</h2>
        </div>
        <div className="container platform-package-grid">
          {healthTrackingPackages.map((plan) => (
            <article key={plan.name} className="platform-package">
              <span className="platform-package__badge">{plan.badge}</span>
              <h3>{plan.name}</h3>
              <p>{plan.bestFor}</p>
              <strong>{plan.price}</strong>
              <ul className="summary-list">
                {plan.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
