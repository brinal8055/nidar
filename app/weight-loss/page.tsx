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
        <p className="eyebrow">Coming soon</p>
        <h1>Doctor-led Weight Loss Care is coming soon.</h1>
        <p>
          Nidar is exploring a careful weight-loss pathway where GLP-1 suitability can be discussed
          after eligibility screening, lab review, and licensed doctor consultation. No treatment,
          prescription, or outcome is promised here.
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
              transformation claims.
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
