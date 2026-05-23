import { Icon } from "@/components/icon";
import { TrackedAnchor, TrackedLink } from "@/components/tracked-link";
import {
  healthTrackingDashboardFeatures,
  healthTrackingPackages,
  platformPillars,
  platformSteps,
  platformVerticals,
  siteConfig,
  trustPoints,
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <section className="platform-hero">
        <div className="container platform-hero__container">
          <div className="platform-hero__copy">
            <p className="eyebrow">Nidar Health platform</p>
            <h1>{siteConfig.title}</h1>
            <p className="platform-hero__story">{siteConfig.brandStory}</p>
            <p className="platform-hero__lead">
              Treat specific issues and track your body over time from one consumer health platform.
              Hair Care brings fast, high-intent acquisition. Health Tracking becomes the long-term
              retention engine.
            </p>
            <div className="button-row">
              <TrackedLink
                href="/hair-care"
                eventName="cta_click"
                eventPayload={{ location: "platform_hero_hair_care" }}
                className="button button--primary"
              >
                Explore Hair Care
              </TrackedLink>
              <TrackedAnchor
                href="#platform-verticals"
                eventName="cta_click"
                eventPayload={{ location: "platform_hero_verticals" }}
                className="button button--secondary"
              >
                View verticals
              </TrackedAnchor>
            </div>
          </div>

          <div className="platform-orbit" aria-label="Nidar Health care verticals">
            <div className="platform-orbit__core">
              <span>N</span>
              <strong>Nidar Health</strong>
              <small>{siteConfig.tagline}</small>
            </div>
            {platformVerticals.map((vertical) => (
              <div key={vertical.id} className={`platform-orbit__pill platform-orbit__pill--${vertical.tone}`}>
                <Icon name={vertical.icon} />
                <span>{vertical.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="platform-pillars">
        <div className="container platform-pillars__grid">
          {platformPillars.map((pillar) => (
            <article key={pillar.id} className={`platform-pillar platform-pillar--${pillar.tone}`}>
              <div className="platform-pillar__meta">
                <span className="platform-card__icon" aria-hidden="true">
                  <Icon name={pillar.icon} />
                </span>
                <span>{pillar.role}</span>
              </div>
              <div>
                <p className="eyebrow">{pillar.label}</p>
                <h2>{pillar.title}</h2>
              </div>
              <p>{pillar.description}</p>
              <div className="platform-pillar__flow">{pillar.flow}</div>
              {pillar.href ? (
                <TrackedLink
                  href={pillar.href}
                  eventName="cta_click"
                  eventPayload={{ location: "platform_pillar", pillar: pillar.id }}
                  className="button button--primary"
                >
                  {pillar.ctaLabel}
                </TrackedLink>
              ) : (
                <span className="button button--ghost platform-card__disabled">{pillar.ctaLabel}</span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="platform-trust">
        <div className="container platform-trust__bar">
          {trustPoints.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="platform-verticals" id="platform-verticals">
        <div className="container">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">Care verticals</p>
            <h2>One platform. Focused care journeys.</h2>
            <p>
              The brand stays broad, but each vertical stays specific. Hair Care is live first;
              Health Tracking combines annual checks, report analysis, trends, guidance, orders, and reminders.
            </p>
          </div>

          <div className="platform-vertical-grid">
            {platformVerticals.map((vertical) => (
              <article key={vertical.id} className={`platform-card platform-card--${vertical.tone}`}>
                <div className="platform-card__top">
                  <span className="platform-card__icon" aria-hidden="true">
                    <Icon name={vertical.icon} />
                  </span>
                  <span className="platform-card__status">{vertical.status}</span>
                </div>
                <h3>{vertical.label}</h3>
                <p>{vertical.description}</p>
                {vertical.href ? (
                  <TrackedLink
                    href={vertical.href}
                    eventName="cta_click"
                    eventPayload={{ location: "platform_vertical_card", vertical: vertical.id }}
                    className="button button--primary button--compact"
                  >
                    {vertical.ctaLabel}
                  </TrackedLink>
                ) : (
                  <span className="button button--ghost button--compact platform-card__disabled">
                    {vertical.ctaLabel}
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platform-flow">
        <div className="container platform-flow__container">
          <div>
            <p className="eyebrow">Health Tracking dashboard</p>
            <h2>Your checkups, reports, and trends in one place.</h2>
            <p>
              Health Tracking is the ongoing home for annual checks, uploaded reports, biomarker
              trends, care guidance, medication or supplement orders, and retest reminders.
            </p>
            <div className="health-dashboard-grid">
              {healthTrackingDashboardFeatures.map((item) => (
                <article key={item.title} className="health-dashboard-feature">
                  <Icon name={item.icon} />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="platform-flow__steps">
            {platformSteps.map((step, index) => (
              <article key={step.title} className="platform-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platform-packages">
        <div className="container">
          <div className="section-heading section-heading--packages">
            <p className="eyebrow">Health Tracking packages</p>
            <h2>Choose the checkup that matches what you want to understand.</h2>
            <p>
              At-home sample collection, lab reports explained clearly, doctor-reviewed guidance,
              and reminders to retest when it matters.
            </p>
          </div>
          <div className="platform-package-grid">
            {healthTrackingPackages.map((item) => (
              <article key={item.name} className="platform-package">
                <div className="platform-package__top">
                  <span className="platform-package__badge">{item.badge}</span>
                  <div className="platform-package__price">
                    <strong>{item.price}</strong>
                    <small>{item.priceNote}</small>
                  </div>
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.bestFor}</p>
                </div>
                <div className="platform-package__section">
                  <span>Includes</span>
                  <ul>
                    {item.includes.map((included) => (
                      <li key={included}>
                        <Icon name="check_circle" />
                        {included}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="platform-package__section platform-package__section--muted">
                  <span>What you get</span>
                  <ul>
                    {item.deliverables.map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
                <TrackedAnchor
                  href={`mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(`${item.name} beta interest`)}`}
                  eventName="cta_click"
                  eventPayload={{ location: "health_tracking_package", package: item.name }}
                  className="button button--primary"
                >
                  Join beta
                </TrackedAnchor>
              </article>
            ))}
          </div>
          <p className="platform-package-note">
            Final availability, partner lab coverage, and pricing are confirmed before booking.
          </p>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <div className="home-cta__shell">
            <div className="home-cta__copy">
              <p className="eyebrow">Live care path</p>
              <h2>Hair Care launches first. Health Tracking deepens the platform.</h2>
              <p>
                Start with the focused adult male hair-loss dashboard, or register interest in Health
                Tracking packages for at-home testing, explained reports, and doctor-reviewed guidance.
              </p>
            </div>
            <div className="button-row">
              <TrackedLink
                href="/hair-care"
                eventName="cta_click"
                eventPayload={{ location: "platform_bottom_hair_care" }}
                className="button button--primary"
              >
                Open Hair Care
              </TrackedLink>
              <TrackedLink
                href="/quiz"
                eventName="cta_click"
                eventPayload={{ location: "platform_bottom_quiz" }}
                className="button button--secondary"
              >
                Start quiz
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
