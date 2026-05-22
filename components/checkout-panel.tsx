"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-content";
import { emptyQuizData, normalizeQuizData, OrderRecord, QuizData, redFlagNoneValue, storageKeys } from "@/lib/storage";

function readStoredQuiz(): QuizData {
  if (typeof window === "undefined") {
    return emptyQuizData;
  }

  const savedQuiz = window.localStorage.getItem(storageKeys.quiz);

  if (!savedQuiz) {
    return emptyQuizData;
  }

  try {
    return normalizeQuizData(JSON.parse(savedQuiz));
  } catch {
    return emptyQuizData;
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
    trackEvent("consult_request_start", { source: "consult_request_page" });
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
          detail: "Expected turnaround within 24 hours for this launch flow.",
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
    trackEvent("consult_request_submitted", { consultFee: siteConfig.consultFee, source: formState.source });
    trackEvent("account_status_created", { method: "consult_request", hasOrder: true });
    router.push("/thank-you");
  }

  return (
    <div className="checkout-grid">
      <form className="card card--form" onSubmit={handleSubmit}>
        <div className="stack">
          <div>
            <p className="eyebrow">Consult request</p>
            <h2>Submit the initial doctor-review request</h2>
            <p>
              The request captures contact and intake details for doctor review. Treatment, labs,
              fulfilment, or referral depend on the doctor decision.
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
            Submit consult request
          </button>
          <p className="subtle">Payment collection should only be enabled after gateway callbacks and server verification are connected.</p>
        </div>
      </form>

      <aside className="card summary-card">
        <div className="summary-card__top">
          <p className="eyebrow">Request summary</p>
          <h3>Initial consult</h3>
          <strong>Rs {siteConfig.consultFee}</strong>
        </div>

        <ul className="summary-list">
          <li>Doctor review required before any prescription decision.</li>
          <li>Not for emergencies.</li>
          <li>Expected turnaround: {siteConfig.turnaround}.</li>
          <li>Eligibility route: {quiz.eligibilityOutcome || "pending submission"}.</li>
          <li>Reported pattern: {quiz.hairLossPattern || "not captured"}.</li>
          <li>Photo uploads captured: {quiz.photoNames.length || 0}.</li>
          <li>Red-flag checks selected: {quiz.redFlags.filter((item) => item !== redFlagNoneValue).length || 0}.</li>
        </ul>
      </aside>
    </div>
  );
}
