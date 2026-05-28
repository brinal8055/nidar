import { HealthTrackingQuiz } from "@/components/health-tracking-quiz";

export default function HealthTrackingIntakePage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Health Tracking Beta</p>
        <h1>Join the annual health tracking beta.</h1>
        <p>
          Submit goals, package preference, sample collection or report upload details, and consent.
          Our team confirms availability, lab coverage, and pricing before booking.
        </p>
      </div>
      <div className="container">
        <HealthTrackingQuiz />
      </div>
    </section>
  );
}
