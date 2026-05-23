import { Icon } from "@/components/icon";
import { TrackedAnchor, TrackedLink } from "@/components/tracked-link";
import { platformSteps, platformVerticals, siteConfig, trustPoints } from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <section className="platform-hero">
        <div className="container platform-hero__container">
          <div className="platform-hero__copy">
            <p className="eyebrow">Nidar Health platform</p>
            <h1>{siteConfig.tagline}</h1>
            <p className="platform-hero__story">{siteConfig.brandStory}</p>
            <p className="platform-hero__lead">
              One common health platform for focused care verticals. Start with Hair Care today,
              then expand into annual health, tracking, men&apos;s health, and women&apos;s health without
              rebuilding the care journey from scratch.
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
              <small>{siteConfig.brandStory}</small>
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
              Category-led care works best when every service feels like its own clear pathway.
              Nidar Health uses that platform idea with a narrower, India-ready launch path.
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
            <h2>Every vertical gets a dashboard before the quiz.</h2>
            <p>
              The home page introduces Nidar Health. Hair Care opens the focused dashboard. From
              there, users move into eligibility, photos, consult request, account status, and follow-up.
            </p>
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

      <section className="home-cta">
        <div className="container">
          <div className="home-cta__shell">
            <div className="home-cta__copy">
              <p className="eyebrow">Live care path</p>
              <h2>Hair Care is the first Nidar Health vertical.</h2>
              <p>
                Start with a focused adult male hair-loss dashboard, then continue into the quiz only
                when the user understands the pathway and clinical boundaries.
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
