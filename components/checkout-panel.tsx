"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-content";
import { OrderRecord, QuizData, storageKeys } from "@/lib/storage";

const emptyQuiz: QuizData = {
  age: "",
  sex: "",
  location: "",
  duration: "",
  hairLossPattern: "",
  familyHistory: "",
  recentTriggers: [],
  scalpSymptoms: [],
  priorTreatments: "",
  currentMedicines: "",
  sexualMentalHealthHistory: "",
  pregnancyStatus: "",
  allergies: "",
  medicalConditions: "",
  photoNames: [],
  redFlags: [],
  consentAccepted: false,
  adultConfirmed: false,
};

function readStoredQuiz(): QuizData {
  if (typeof window === "undefined") {
    return emptyQuiz;
  }

  const savedQuiz = window.localStorage.getItem(storageKeys.quiz);

  if (!savedQuiz) {
    return emptyQuiz;
  }

  try {
    return { ...emptyQuiz, ...(JSON.parse(savedQuiz) as QuizData) };
  } catch {
    return emptyQuiz;
  }
}

export function CheckoutPanel() {
  const router = useRouter();
  const [quiz] = useState<QuizData>(readStoredQuiz);
  const [formState, setFormState] = useState({
    fullName: "",
    phone: "",
    email: "",
    coupon: "",
    source: "direct",
  });

  useEffect(() => {
    trackEvent("checkout_start", { source: "checkout_page" });
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const order: OrderRecord = {
      ...formState,
      consultFee: siteConfig.consultFee,
      createdAt: new Date().toISOString(),
      reviewEta: siteConfig.turnaround,
      quizSummary: quiz,
      messages: [
        "Your eligibility form has been received.",
        "A doctor review is required before any prescription decision is made.",
        "Visible improvement usually takes 3-6 months if treatment is approved and used consistently.",
      ],
      statuses: [
        {
          label: "Eligibility form received",
          detail: "Your intake, consent, and uploads are in the review queue.",
          state: "complete",
        },
        {
          label: "Doctor review pending",
          detail: "Expected turnaround within 24 hours for the MVP flow.",
          state: "current",
        },
        {
          label: "Prescription and fulfilment",
          detail: "If approved, the prescription can be sent to the pharmacy with your consent.",
          state: "upcoming",
        },
        {
          label: "14/30/90 day follow-up",
          detail: "Check-ins can track usage, side effects, progress photos, and refill timing.",
          state: "upcoming",
        },
      ],
    };

    window.localStorage.setItem(storageKeys.order, JSON.stringify(order));
    trackEvent("payment_success", { consultFee: siteConfig.consultFee, source: formState.source });
    trackEvent("account_signup", { method: "checkout_demo" });
    router.push("/thank-you");
  }

  return (
    <div className="checkout-grid">
      <form className="card card--form" onSubmit={handleSubmit}>
        <div className="stack">
          <div>
            <p className="eyebrow">Checkout</p>
            <h2>Reserve the initial doctor-reviewed consult</h2>
            <p>
              This mock reserves payment for the initial doctor review. Treatment, labs, fulfilment, or
              referral depend on the doctor decision.
            </p>
          </div>

          <label className="field">
            <span>Full name</span>
            <input
              required
              value={formState.fullName}
              onChange={(event) => setFormState((current) => ({ ...current, fullName: event.target.value }))}
              placeholder="Your full name"
            />
          </label>
          <label className="field">
            <span>Phone</span>
            <input
              required
              value={formState.phone}
              onChange={(event) => setFormState((current) => ({ ...current, phone: event.target.value }))}
              placeholder="+91"
            />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              required
              type="email"
              value={formState.email}
              onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
              placeholder="you@example.com"
            />
          </label>
          <label className="field">
            <span>Coupon code</span>
            <input
              value={formState.coupon}
              onChange={(event) => setFormState((current) => ({ ...current, coupon: event.target.value }))}
              placeholder="Optional"
            />
          </label>
          <label className="field">
            <span>Traffic source</span>
            <select
              value={formState.source}
              onChange={(event) => setFormState((current) => ({ ...current, source: event.target.value }))}
            >
              <option value="direct">Direct</option>
              <option value="search">Search</option>
              <option value="meta">Meta</option>
              <option value="referral">Referral</option>
            </select>
          </label>
        </div>

        <div className="checkout-actions">
          <button type="submit" className="button button--primary">
            Continue to secure payment
          </button>
          <p className="subtle">UTM capture, gateway callbacks, and server verification can be layered in next.</p>
        </div>
      </form>

      <aside className="card summary-card">
        <div className="summary-card__top">
          <p className="eyebrow">Order summary</p>
          <h3>Initial consult</h3>
          <strong>Rs {siteConfig.consultFee}</strong>
        </div>

        <ul className="summary-list">
          <li>Doctor review required before any prescription decision.</li>
          <li>Not for emergencies.</li>
          <li>Expected turnaround: {siteConfig.turnaround}.</li>
          <li>Eligibility route: {quiz.eligibilityOutcome || "not submitted yet"}.</li>
          <li>Reported pattern: {quiz.hairLossPattern || "not captured"}.</li>
          <li>Photo uploads captured: {quiz.photoNames.length || 0}.</li>
          <li>Red-flag checks selected: {quiz.redFlags.length || 0}.</li>
        </ul>
      </aside>
    </div>
  );
}
