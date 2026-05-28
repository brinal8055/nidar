import Link from "next/link";

import { Icon } from "@/components/icon";
import { TrustSafetySection } from "@/components/trust-safety-section";
import { healthTrackingPackages, healthTrackingProfiles } from "@/lib/site-content";

const workflow = [
  {
    title: "Home sample collection",
    body: "Book partner-lab collection where available, or upload existing reports.",
  },
  {
    title: "AI-organized insights",
    body: "Reports are converted into structured biomarkers and trend-ready profiles.",
  },
  {
    title: "Doctor-reviewed guidance",
    body: "Clinical next steps are reviewed before being shown.",
  },
  {
    title: "Biomarker tracking",
    body: "Track Vitamin D, B12, TSH, HbA1c, lipids, liver, kidney, and CBC markers over time.",
  },
  {
    title: "Orders / reports",
    body: "See report uploads, lab booking status, and partner fulfilment placeholders in one place.",
  },
  {
    title: "Retest reminders",
    body: "Get reminders based on the test type and doctor guidance.",
  },
];

const dashboardCards = [
  { marker: "Vitamin D", current: "Low", trend: "Improving", next: "Doctor-reviewed guidance after report review" },
  { marker: "HbA1c", current: "Borderline", trend: "Unknown", next: "Next test in 3-6 months" },
  { marker: "TSH", current: "Normal", trend: "Stable", next: "Continue annual tracking" },
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
              <Link href="/health-tracking/intake" className="button button--primary">
                Join Health Tracking Beta
              </Link>
              <Link href="/pricing#health-tracking" className="button button--secondary">
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
            <article key={item.title} className="card">
              <Icon name="check_circle" />
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--soft">
        <div className="container section-heading section-heading--center">
          <p className="eyebrow">Dashboard preview</p>
          <h2>See why tracking is more useful than one-off PDFs.</h2>
          <p>Example dashboard. Actual insights depend on lab report values and doctor review.</p>
        </div>
        <div className="container health-preview-grid">
          <article className="card card--highlight health-preview-grid__summary">
            <p className="eyebrow">Health Summary</p>
            <h3>Annual baseline ready for doctor-reviewed guidance.</h3>
            <p>
              Reports, biomarkers, trend cards, orders, and reminders stay together so follow-up
              is easier to understand.
            </p>
            <Link href="/health-dashboard" className="button button--primary">
              Preview dashboard
            </Link>
          </article>
          {dashboardCards.map((card) => (
            <article key={card.marker} className="card">
              <p className="eyebrow">{card.marker}</p>
              <h3>Current: {card.current}</h3>
              <p>Trend: {card.trend}</p>
              <p>{card.next}</p>
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
              <Link href="/health-tracking/intake" className="button button--primary">
                Join beta
              </Link>
            </article>
          ))}
        </div>
      </section>

      <TrustSafetySection />
    </>
  );
}
