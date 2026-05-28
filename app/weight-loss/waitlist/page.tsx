import { WeightLossWaitlistForm } from "@/components/weight-loss-waitlist-form";

export default function WeightLossWaitlistPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Weight Loss Care waitlist</p>
        <h1>Doctor-led metabolic care is coming soon.</h1>
        <p>
          Join the waitlist for eligibility screening, lab review, doctor supervision, lifestyle
          support, and tracking when this pathway becomes available. No medicine access or outcome
          is guaranteed.
        </p>
      </div>
      <div className="container">
        <WeightLossWaitlistForm />
      </div>
    </section>
  );
}
