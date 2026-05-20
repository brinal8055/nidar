import { pricingCards } from "@/lib/site-content";

export default function PricingPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Pricing</p>
        <h1>Start with a paid consult, not a bloated subscription stack.</h1>
        <p>
          The launch model keeps pricing simple: collect the consult fee, route to doctor review, then
          handle treatment and follow-up only when the case is appropriate.
        </p>
      </div>

      <div className="container card-grid card-grid--three">
        {pricingCards.map((card) => (
          <article key={card.name} className="card pricing-card">
            <p className="eyebrow">{card.note}</p>
            <h2>{card.name}</h2>
            <strong>{card.price}</strong>
            <ul className="summary-list">
              {card.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
