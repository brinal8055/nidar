import Link from "next/link";

const pricingSections = [
  {
    title: "Hair Care",
    intro: "For the current launch flow: structured hair intake, photo review, doctor assessment, and follow-up planning.",
    cards: [
      {
        name: "Hair Assessment",
        price: "₹499",
        note: "Paid before doctor review",
        details: [
          "Adult hair-loss eligibility intake",
          "Standard photo set before review",
          "Doctor assessment before any prescription decision",
          "Treatment may be declined if unsuitable",
        ],
        ctaLabel: "Start Hair Assessment",
        ctaHref: "/hair-care/intake",
      },
      {
        name: "Hair Care Plan",
        price: "₹899/month onwards",
        note: "Only if appropriate after review",
        details: [
          "Follow-up workflow and refill planning",
          "Progress tracking reminders",
          "Medicine cost may vary based on doctor prescription.",
        ],
        ctaLabel: "Start Assessment",
        ctaHref: "/hair-care/intake",
      },
    ],
  },
  {
    title: "Health Tracking",
    intro: "For annual or focused blood-test packages with partner-led sample collection and doctor-reviewed guidance.",
    cards: [
      {
        name: "Basic Annual Health",
        price: "₹1,499-₹2,499",
        note: "Yearly baseline",
        details: ["CBC", "Thyroid, liver, kidney, lipid, and sugar profile", "Home sample collection through partner labs", "Plain-language report summary", "Doctor-reviewed guidance"],
        ctaLabel: "Join Beta",
        ctaHref: "/health-tracking/intake",
      },
      {
        name: "Vitamin & Fatigue",
        price: "₹1,999-₹3,499",
        note: "Deficiency focused",
        details: ["Vitamin D", "Vitamin B12, ferritin, CBC, and thyroid profile", "Retest reminder where appropriate"],
        ctaLabel: "Join Beta",
        ctaHref: "/health-tracking/intake",
      },
      {
        name: "Diabetes Risk",
        price: "₹1,999-₹3,999",
        note: "Metabolic tracking",
        details: ["HbA1c and fasting glucose", "Lipid and kidney profile", "Trend-ready dashboard preview"],
        ctaLabel: "Join Beta",
        ctaHref: "/health-tracking/intake",
      },
    ],
    footer: "Final test package pricing may vary by city and lab partner.",
  },
  {
    title: "Coming Soon",
    intro: "Future verticals will launch only after the care, compliance, and partner workflows are ready.",
    cards: [
      {
        name: "Weight Loss Care",
        price: "Coming soon",
        note: "Doctor-led pathway planned",
        details: [
          "Eligibility screening",
          "Lab review and doctor supervision",
          "GLP-1 suitability may be discussed only after licensed doctor review.",
          "No specific drug promotion or weight-loss guarantee.",
        ],
        ctaLabel: "Join Waitlist",
        ctaHref: "/weight-loss/waitlist",
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Pricing</p>
        <h1>Simple pricing for focused care and annual tracking.</h1>
        <p>
          Homepage pricing stays as a teaser. This page explains what each vertical starts with,
          while keeping clinical decisions doctor-reviewed and partner fulfilment transparent.
        </p>
      </div>

      <div className="container pricing-tabs">
        {pricingSections.map((section) => (
          <a key={section.title} href={`#${section.title.toLowerCase().replaceAll(" ", "-")}`}>
            {section.title}
          </a>
        ))}
      </div>

      {pricingSections.map((section) => (
        <section key={section.title} className="pricing-section" id={section.title.toLowerCase().replaceAll(" ", "-")}>
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{section.title}</p>
              <h2>{section.intro}</h2>
              {section.footer ? <p>{section.footer}</p> : null}
            </div>

            <div className="card-grid card-grid--three">
              {section.cards.map((card) => (
                <article key={card.name} className="card pricing-card">
                  <p className="eyebrow">{card.note}</p>
                  <h3>{card.name}</h3>
                  <strong>{card.price}</strong>
                  <ul className="summary-list">
                    {card.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <Link href={card.ctaHref} className="button button--primary">
                    {card.ctaLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="container home-cta__shell">
        <div className="home-cta__copy">
          <p className="eyebrow">Start safely</p>
          <h2>Pick the path that matches today’s need.</h2>
          <p>
            Hair Care is live first. Annual Health Tracking is open for beta interest. Weight
            Loss Care is waitlist-only and requires licensed doctor review before any clinical decision.
          </p>
        </div>
        <div className="button-row">
          <Link href="/hair-care/intake" className="button button--primary">
            Start Hair Assessment
          </Link>
          <Link href="/health-tracking/intake" className="button button--secondary">
            Join Health Tracking Beta
          </Link>
        </div>
      </div>
      <div className="container eligibility-note">
        <strong>Pricing notes</strong>
        <p>
          Final pricing may vary by city and lab partner. Prescription medicine cost is separate
          unless explicitly included. No medication is guaranteed. Clinical guidance requires
          licensed doctor review.
        </p>
      </div>
    </section>
  );
}
