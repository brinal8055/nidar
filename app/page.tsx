import { FaqList } from "@/components/faq-list";
import { Icon } from "@/components/icon";
import { TrackedAnchor, TrackedLink } from "@/components/tracked-link";
import {
  ecosystemFeatures,
  faqs,
  heroFilmstrip,
  homepageShowcases,
  homepageTabs,
  trustBarItems,
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container home-hero__container">
          <div className="home-hero__intro">
            <p className="eyebrow">Adults 18+ · Hair-loss launch</p>
            <h1>Doctor-reviewed hair-loss care from home.</h1>
            <p className="home-hero__lead">
              A focused online flow for adult male pattern hair loss: eligibility screening, standard
              photos, doctor review, treatment only when appropriate, and structured follow-up.
            </p>
            <div className="button-row">
              <TrackedLink
                href="/quiz"
                eventName="cta_click"
                eventPayload={{ location: "hero_primary" }}
                className="button button--primary"
              >
                Start assessment
              </TrackedLink>
              <TrackedLink
                href="/how-it-works"
                eventName="cta_click"
                eventPayload={{ location: "hero_how_it_works" }}
                className="button button--secondary"
              >
                How it works
              </TrackedLink>
            </div>
          </div>

          <div className="hero-filmstrip" aria-label="Nidar care highlights">
            <div className="hero-filmstrip__track">
              {heroFilmstrip.map((item) => (
                <article key={item.title} className={`hero-filmstrip__card hero-filmstrip__card--${item.tone}`}>
                  <div className="hero-filmstrip__visual" aria-hidden="true">
                    <span className="hero-filmstrip__icon">
                      <Icon name={item.icon} />
                    </span>
                    <strong>{item.stat}</strong>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="hero-filmstrip__copy">
                    <strong>{item.title}</strong>
                    <span>{item.caption}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-tabbar" role="navigation" aria-label="Homepage category sections">
            {homepageTabs.map((item, index) => (
              <TrackedAnchor
                key={item.id}
                href={`#${item.id}`}
                eventName="cta_click"
                eventPayload={{ location: "hero_tab", tab: item.id }}
                className={`hero-tabbar__item${index === 0 ? " hero-tabbar__item--active" : ""}`}
              >
                <span className="hero-tabbar__icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <span className="hero-tabbar__text">
                  <strong>{item.label}</strong>
                  <small>{item.status}</small>
                </span>
              </TrackedAnchor>
            ))}
          </div>
        </div>
      </section>

      {homepageShowcases.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`showcase-block showcase-block--${section.tone}${index % 2 === 1 ? " showcase-block--reverse" : ""}`}
        >
          <div className="container showcase-block__outer">
            <div className="showcase-block__rail">
              <span>{section.verticalLabel}</span>
            </div>

            <div className="showcase-block__copy">
              <p className="eyebrow">Launch module</p>
              <h2>
                {section.title} <em>{section.emphasis}</em>
              </h2>
              <ul className="showcase-block__checklist">
                {section.bullets.map((item) => (
                  <li key={item}>
                    <Icon name="check_circle" className="showcase-block__check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>{section.body}</p>
              <TrackedLink
                href={section.ctaHref}
                eventName="cta_click"
                eventPayload={{ location: "showcase_cta", section: section.id }}
                className="button button--primary"
              >
                {section.ctaLabel}
              </TrackedLink>
            </div>

            <div className="showcase-block__media">
              <div className={`showcase-visual showcase-visual--${section.tone}`}>
                <div className="showcase-visual__screen">
                  <span className="showcase-visual__icon" aria-hidden="true">
                    <Icon name={section.visualIcon} />
                  </span>
                  <strong>{section.visualTitle}</strong>
                  <p>{section.visualBody}</p>
                  <div className="showcase-visual__scan" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="showcase-visual__support">
                  <span className="showcase-visual__support-icon" aria-hidden="true">
                    <Icon name={section.supportIcon} />
                  </span>
                  <div>
                    <strong>{section.supportTitle}</strong>
                    <small>{section.supportBody}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="ecosystem-section">
        <div className="container ecosystem-section__container">
          <div className="ecosystem-section__copy">
            <p className="eyebrow">Connected experience</p>
            <h2>Everything, all-in-one place.</h2>
            <p>
              Screening, photo quality checks, doctor notes, fulfilment updates, side-effect check-ins,
              and refill reminders should feel like one clear product surface.
            </p>

            <div className="ecosystem-feature-grid">
              {ecosystemFeatures.map((item) => (
                <article key={item.title} className="ecosystem-feature-card">
                  <div className="ecosystem-feature-card__icon">
                    <Icon name={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="ecosystem-phone">
            <div className="ecosystem-phone__frame">
              <div className="ecosystem-phone__screen" aria-label="Nidar account status">
                <div className="ecosystem-phone__top">
                  <span>Nidar</span>
                  <strong>Review pending</strong>
                </div>
                <div className="ecosystem-phone__status">
                  <Icon name="photo_camera" className="ecosystem-phone__status-icon" />
                  <div>
                    <strong>4 photos received</strong>
                    <small>Doctor review queue</small>
                  </div>
                </div>
                <div className="ecosystem-phone__timeline">
                  <span>Intake complete</span>
                  <span>Doctor review</span>
                  <span>14-day check-in</span>
                  <span>90-day photos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="container trust-section__container">
          <p className="eyebrow">Built around a real care workflow</p>
          <h2 className="trust-section__heading">Simple for patients. Structured for doctors.</h2>
          <div className="trust-section__bar">
            {trustBarItems.map((item) => (
              <span key={item} className="trust-section__mark">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted" id="faq">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Common questions</p>
            <h2>Premium design still needs clear answers.</h2>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <div className="home-cta__shell">
            <div className="home-cta__copy">
              <p className="eyebrow">Start with clarity</p>
              <h2>Check eligibility first. Treatment moves forward only after doctor review.</h2>
              <p>
                The launch promise stays narrow: adult male pattern hair loss, no instant prescribing,
                no guaranteed regrowth, and clear escalation when online care is not suitable.
              </p>
            </div>
            <div className="button-row">
              <TrackedLink
                href="/quiz"
                eventName="cta_click"
                eventPayload={{ location: "bottom_cta_primary" }}
                className="button button--primary"
              >
                Start assessment
              </TrackedLink>
              <TrackedLink
                href="/pricing"
                eventName="cta_click"
                eventPayload={{ location: "bottom_cta_secondary" }}
                className="button button--secondary"
              >
                See pricing
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
