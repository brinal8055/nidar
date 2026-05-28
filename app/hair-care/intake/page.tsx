import { QuizFlow } from "@/components/quiz-flow";

export default function HairCareIntakePage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Hair Care intake</p>
        <h1>Start with eligibility, photos, consent, and doctor review.</h1>
        <p>
          This launch supports adults 18+ with male pattern hair-loss concerns. AI may organize the
          intake, but treatment decisions require licensed doctor review.
        </p>
      </div>

      <div className="container">
        <QuizFlow />
      </div>
    </section>
  );
}
