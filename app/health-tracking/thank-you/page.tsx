import Link from "next/link";

export default function HealthTrackingThankYouPage() {
  return (
    <section className="section">
      <div className="container card card--hero">
        <p className="eyebrow">Beta request received</p>
        <h1>Thanks for joining the Health Tracking beta.</h1>
        <p>
          The current beta request is stored locally for demo validation. Production booking will
          save consent, package selection, lab order status, and follow-up reminders to the backend.
        </p>
        <div className="button-row">
          <Link href="/health-dashboard" className="button button--primary">
            Preview dashboard
          </Link>
          <Link href="/" className="button button--secondary">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
