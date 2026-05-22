import { QuizFlow } from "@/components/quiz-flow";

export default function QuizPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Eligibility quiz</p>
        <h1>Screen first. Treat only when the case is suitable.</h1>
        <p>
          This launch starts with adult male pattern hair loss. The quiz checks timeline, pattern, scalp
          symptoms, medicines, counselling flags, and standard photos before doctor review.
        </p>
      </div>

      <div className="container">
        <QuizFlow />
      </div>
    </section>
  );
}
