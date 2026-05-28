import Link from "next/link";

const features = [
  "Eligibility screening",
  "Lab review before treatment decisions",
  "Doctor supervision",
  "Lifestyle and tracking support",
];

export default function WeightLossPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Waitlist only</p>
        <h1>Doctor-led metabolic care is coming soon.</h1>
        <p>
          Nidar is exploring a careful metabolic care pathway with eligibility screening, lab
          review, doctor supervision, lifestyle support, and tracking. GLP-1 suitability may be
          discussed only after licensed doctor review. No medicine access or weight-loss outcome is
          promised here.
        </p>
        <div className="button-row">
          <Link href="/weight-loss/waitlist" className="button button--primary">
            Join waitlist
          </Link>
          <Link href="/pricing" className="button button--secondary">
            View pricing
          </Link>
        </div>
      </div>

      <div className="container card-grid card-grid--three">
        {features.map((feature) => (
          <article key={feature} className="card">
            <p className="eyebrow">Weight Loss Care</p>
            <h2>{feature}</h2>
            <p>
              Built around eligibility, safety, doctor review, and follow-up rather than guaranteed
              outcomes, drug promotion, or transformation claims.
            </p>
          </article>
        ))}
      </div>

      <div className="container eligibility-note">
        <strong>Important disclaimer</strong>
        <p>Prescription decisions require licensed doctor review and eligibility screening.</p>
      </div>
    </section>
  );
}
