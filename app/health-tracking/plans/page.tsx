import Link from "next/link";

import { healthTrackingPackages } from "@/lib/site-content";

export default function HealthTrackingPlansPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Health Tracking plans</p>
        <h1>Choose a beta package for at-home testing and guided tracking.</h1>
        <p>
          Final package pricing may vary by city and lab partner. Reports can be organized by AI,
          but clinical guidance requires licensed doctor review where needed.
        </p>
      </div>

      <div className="container platform-package-grid">
        {healthTrackingPackages.map((plan) => (
          <article key={plan.name} className="platform-package">
            <div className="platform-package__top">
              <span className="platform-package__badge">{plan.badge}</span>
              <div className="platform-package__price">
                <strong>{plan.price}</strong>
                <small>{plan.priceNote}</small>
              </div>
            </div>
            <h2>{plan.name}</h2>
            <p>{plan.bestFor}</p>
            <div className="platform-package__section">
              <span>Includes</span>
              <ul>
                {plan.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="platform-package__section platform-package__section--muted">
              <span>What you get</span>
              <ul>
                {plan.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Link href="/health-tracking/quiz" className="button button--primary">
              Join beta
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
