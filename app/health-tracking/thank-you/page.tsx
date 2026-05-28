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
        <ul className="summary-list">
          <li>Our team will confirm availability, lab coverage, and pricing before booking.</li>
          <li>Sample collection or report upload status is visible in Account on this device.</li>
          <li>AI-organized summaries do not replace doctor-reviewed guidance.</li>
        </ul>
        <div className="button-row">
          <Link href="/account" className="button button--primary">
            View account status
          </Link>
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
