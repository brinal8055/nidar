import { HealthTrackingQuiz } from "@/components/health-tracking-quiz";

export default function HealthTrackingQuizPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Health Tracking Beta</p>
        <h1>Tell us what you want to track.</h1>
        <p>
          This beta intake helps Nidar understand your goals, testing needs, sample collection
          preference, and consent before any follow-up.
        </p>
      </div>
      <div className="container">
        <HealthTrackingQuiz />
      </div>
    </section>
  );
}
