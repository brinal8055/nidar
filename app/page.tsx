import { Icon } from "@/components/icon";
import { TrackedAnchor, TrackedLink } from "@/components/tracked-link";
import {
  healthTrackingPackages,
  platformOperatingModules,
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
              Health Tracking follows with annual testing, biomarker trends, and doctor-reviewed guidance.
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
            <p className="eyebrow">Platform model</p>
            <h2>Common infrastructure. Vertical-specific experiences.</h2>
            <p>
              The same operating layer can support questionnaires, lab orders, report storage,
              doctor reviews, prescriptions, pharmacy orders, notifications, and follow-ups across
              multiple care paths.
            </p>
            <div className="platform-module-cloud">
              {platformOperatingModules.map((module) => (
                <span key={module}>{module}</span>
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
          <div className="section-heading">
            <p className="eyebrow">Health Tracking beta scope</p>
            <h2>Start with three packages, not twenty.</h2>
            <p>
              Health Tracking should begin small: reports explained, doctors review, biomarkers tracked,
              and retest reminders built around a few high-value packages.
            </p>
          </div>
          <div className="platform-package-grid">
            {healthTrackingPackages.map((item) => (
              <article key={item.name} className="platform-package">
                <h3>{item.name}</h3>
                <p>{item.goal}</p>
                <span>{item.markers}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <div className="home-cta__shell">
            <div className="home-cta__copy">
              <p className="eyebrow">Live care path</p>
              <h2>Hair Care launches first. Health Tracking deepens the platform.</h2>
              <p>
                Start with the focused adult male hair-loss dashboard, then use learnings from that
                funnel to launch Health Tracking for 100-200 beta users with partner labs.
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
