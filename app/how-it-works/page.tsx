import { TrackedLink } from "@/components/tracked-link";
import { careSteps, howItWorksHighlights } from "@/lib/site-content";

export default function HowItWorksPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">How it works</p>
        <h1>From ad click to follow-up, the launch flow stays intentionally narrow.</h1>
        <p>
          The point of this launch flow is not to look comprehensive. It is to process one case reliably from
          consent to doctor review to fulfilment and follow-up.
        </p>
      </div>

      <div className="container card-grid card-grid--three">
        {careSteps.map((step) => (
          <article key={step.title} className="card">
            <p className="eyebrow">{step.eyebrow}</p>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </article>
        ))}
      </div>

      <div className="container card section-card">
        <p className="eyebrow">What stays fixed</p>
        <ul className="summary-list">
          {howItWorksHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <TrackedLink
          href="/hair-care/intake"
          eventName="cta_click"
          eventPayload={{ location: "how_it_works" }}
          className="button button--primary"
        >
          Start the eligibility quiz
        </TrackedLink>
      </div>
    </section>
  );
}
