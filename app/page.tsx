import type { CSSProperties } from "react";

import { Icon } from "@/components/icon";
import { TrustSafetySection } from "@/components/trust-safety-section";
import { TrackedLink } from "@/components/tracked-link";
import {
  healthTrackingProfiles,
  healthTrackingPackages,
  platformHowItWorks,
  platformTrustItems,
  platformSteps,
  platformVerticals,
  siteConfig,
  trustPoints,
} from "@/lib/site-content";

const orbitPositions: Record<string, { x: number; y: number }> = {
  "weight-loss": { x: 20, y: 29 },
  "health-tracking": { x: 62, y: 16 },
  "hair-care": { x: 88, y: 50 },
  "womens-health": { x: 62, y: 84 },
  "mens-health": { x: 20, y: 71 },
};

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
              One consumer health platform for focused care journeys, annual health tracking,
              private reports, partner-led fulfilment, and licensed doctor review where clinical
              guidance is needed.
            </p>
            <div className="button-row">
              <TrackedLink
                href="/hair-care/intake"
                eventName="cta_click"
                eventPayload={{ location: "platform_hero_hair_assessment" }}
                className="button button--primary"
              >
                Start Hair Assessment
              </TrackedLink>
              <TrackedLink
                href="/health-tracking/intake"
                eventName="cta_click"
                eventPayload={{ location: "platform_hero_health_tracking" }}
                className="button button--secondary"
              >
                Explore Health Tracking
              </TrackedLink>
            </div>
          </div>

          <div className="platform-orbit" aria-label="Nidar Health care verticals">
            <div className="platform-orbit__core">
              <span>N</span>
              <strong>Care platform</strong>
            </div>
            {platformVerticals.map((vertical) => (
              <div
                key={vertical.id}
                className={`platform-orbit__pill platform-orbit__pill--${vertical.tone} platform-orbit__pill--${vertical.id}`}
                style={
                  {
                    "--orbit-x": `${orbitPositions[vertical.id]?.x ?? 50}%`,
                    "--orbit-y": `${orbitPositions[vertical.id]?.y ?? 50}%`,
                  } as CSSProperties
                }
              >
                <Icon name={vertical.icon} />
                <span>{vertical.label}</span>
              </div>
            ))}
          </div>
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
            <h2>Three verticals, one trusted care layer.</h2>
            <p>
              Hair Care is live. Annual Health Tracking is the beta product. Weight Loss Care,
              Men&apos;s Health, and Women&apos;s Health are coming-soon verticals with careful,
              doctor-reviewed positioning.
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
            <p className="eyebrow">How it works</p>
            <h2>A common workflow across every Nidar vertical.</h2>
            <p>
              The exact intake changes by vertical, but the safety model stays consistent: AI
              organizes information, and clinical guidance requires licensed doctor review.
            </p>
            <div className="health-dashboard-grid">
              {platformHowItWorks.map((item, index) => (
                <article key={item} className="health-dashboard-feature">
                  <span className="platform-step__mini">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item}</h3>
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
            <p className="eyebrow">Annual Health Tracking preview</p>
            <h2>Track the health profiles people ask about most.</h2>
            <p>
              Reports are organized into clear profiles, trends, and next-step context before any
              doctor-reviewed guidance is shown.
            </p>
          </div>
          <div className="platform-vertical-grid platform-vertical-grid--profiles">
            {healthTrackingProfiles.map((profile) => (
              <article key={profile} className="platform-card platform-card--blue">
                <div className="platform-card__top">
                  <span className="platform-card__icon" aria-hidden="true">
                    <Icon name="fact_check" />
                  </span>
                  <span className="platform-card__status">Preview</span>
                </div>
                <h3>{profile}</h3>
                <p>Trend-ready marker grouping for annual tracking and doctor-reviewed guidance.</p>
              </article>
            ))}
          </div>
          <div className="section-heading section-heading--packages">
            <p className="eyebrow">Pricing teaser</p>
            <h2>Simple starting packages for beta validation.</h2>
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
                <TrackedLink
                  href="/health-tracking/intake"
                  eventName="cta_click"
                  eventPayload={{ location: "health_tracking_package", package: item.name }}
                  className="button button--primary"
                >
                  Join beta
                </TrackedLink>
              </article>
            ))}
          </div>
          <p className="platform-package-note">
            Final availability, partner lab coverage, and pricing are confirmed before booking.
          </p>
        </div>
      </section>

      <section className="platform-trust platform-trust--expanded">
        <div className="container">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">Trust model</p>
            <h2>Built for healthcare caution, not hype.</h2>
          </div>
          <div className="platform-vertical-grid">
            {platformTrustItems.map((item) => (
              <article key={item} className="platform-card platform-card--tan">
                <h3>{item}</h3>
                <p>No AI-only diagnosis, no automated prescribing, and no guaranteed outcomes.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TrustSafetySection />

      <section className="home-cta">
        <div className="container">
          <div className="home-cta__shell">
            <div className="home-cta__copy">
              <p className="eyebrow">Live care path</p>
              <h2>Hair Care launches first. Health Tracking deepens the platform.</h2>
              <p>
                Start with the focused hair assessment, or explore Annual Health Tracking for
                at-home testing, explained reports, biomarker trends, and doctor-reviewed guidance.
              </p>
            </div>
            <div className="button-row">
              <TrackedLink
                href="/hair-care/intake"
                eventName="cta_click"
                eventPayload={{ location: "platform_bottom_hair_care" }}
                className="button button--primary"
              >
                Start Hair Assessment
              </TrackedLink>
              <TrackedLink
                href="/health-tracking/intake"
                eventName="cta_click"
                eventPayload={{ location: "platform_bottom_health_tracking" }}
                className="button button--secondary"
              >
                Explore Health Tracking
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
