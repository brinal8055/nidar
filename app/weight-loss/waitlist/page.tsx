import Link from "next/link";

export default function WeightLossWaitlistPage() {
  return (
    <section className="section">
      <div className="container card card--hero">
        <p className="eyebrow">Weight Loss Care waitlist</p>
        <h1>Join the coming-soon list.</h1>
        <p>
          This is a conservative demand-validation page. GLP-1 suitability, prescriptions, and
          clinical recommendations require licensed doctor review and eligibility screening.
        </p>
        <div className="button-row">
          <a
            href="mailto:support@nidar.health?subject=Weight%20Loss%20Care%20waitlist"
            className="button button--primary"
          >
            Email interest
          </a>
          <Link href="/weight-loss" className="button button--secondary">
            Back
          </Link>
        </div>
      </div>
    </section>
  );
}
