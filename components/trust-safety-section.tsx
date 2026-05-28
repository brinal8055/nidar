import Link from "next/link";

const trustItems = [
  "Doctor-reviewed before clinical guidance",
  "AI organizes information; doctors decide",
  "Private photos and reports",
  "Consent-first health data handling",
  "Partner-led lab collection",
  "Licensed pharmacy fulfilment where applicable",
  "No emergency care",
  "No guaranteed medication or outcome",
];

export function TrustSafetySection() {
  return (
    <section className="section section--soft">
      <div className="container section-heading section-heading--center">
        <p className="eyebrow">Trust & Safety</p>
        <h2>Clear boundaries before care moves forward.</h2>
      </div>
      <div className="container card-grid card-grid--three">
        {trustItems.map((item) => (
          <article key={item} className="card">
            <h3>{item}</h3>
            <p>Built for consent, privacy, partner transparency, and licensed doctor review.</p>
          </article>
        ))}
      </div>
      <div className="container button-row trust-link-row">
        <Link href="/trust-safety" className="button button--primary">
          Trust & Safety
        </Link>
        <Link href="/legal/privacy" className="button button--secondary">
          Privacy Policy
        </Link>
        <Link href="/legal/consent" className="button button--ghost">
          Consent Notice
        </Link>
        <Link href="/legal/refund" className="button button--ghost">
          Refund Policy
        </Link>
      </div>
    </section>
  );
}
