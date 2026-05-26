"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { trackEvent } from "@/lib/analytics";
import { createCaseOnBackend, uploadCaseMediaFiles } from "@/lib/backend-api";
import { clearPendingHairPhotos, getPendingHairPhotos } from "@/lib/hair-photo-cache";
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
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    trackEvent("consult_request_start", { source: "consult_request_page" });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionError("");
    setIsSubmitting(true);

    const backendCase = await createCaseOnBackend({
      contact: formState,
      quizSummary: quiz,
    });

    if (backendCase.configured && backendCase.error) {
      setSubmissionError(backendCase.error);
      setIsSubmitting(false);
      return;
    }

    const backendCaseData = backendCase.configured ? backendCase.data : undefined;
    const isBackendStored = Boolean(backendCaseData);
    let uploadedPhotoCount = 0;
    let uploadErrors: string[] = [];

    if (isBackendStored && backendCaseData?.caseId) {
      const pendingPhotos = getPendingHairPhotos();

      if (pendingPhotos.length) {
        const mediaResult = await uploadCaseMediaFiles({
          caseId: backendCaseData.caseId,
          contactEmail: formState.email,
          files: pendingPhotos.map((photo) => photo.file),
        });

        if (mediaResult.configured) {
          uploadedPhotoCount = mediaResult.uploaded;
          uploadErrors = mediaResult.errors;

          if (!mediaResult.errors.length) {
            clearPendingHairPhotos();
          }
        }
      }
    }

    const order: OrderRecord = {
      ...(isBackendStored
        ? {
            fullName: "Submitted request",
            phone: "",
            email: "",
            coupon: "",
            source: formState.source,
          }
        : formState),
      consultFee: siteConfig.consultFee,
      createdAt: new Date().toISOString(),
      reviewEta: siteConfig.turnaround,
      quizSummary: isBackendStored
        ? {
            ...emptyQuizData,
            eligibilityOutcome: quiz.eligibilityOutcome,
            submittedAt: quiz.submittedAt,
          }
        : quiz,
      backendStored: isBackendStored,
      backendCaseId: backendCaseData?.caseId,
      caseNumber: backendCaseData?.caseNumber,
      messages: [
        isBackendStored
          ? "Your eligibility form has been securely saved to the backend."
          : "Your eligibility form has been received on this device for local testing.",
        uploadedPhotoCount
          ? `${uploadedPhotoCount} photo upload${uploadedPhotoCount === 1 ? "" : "s"} saved to private storage.`
          : "Photo uploads are queued for secure storage when private upload is available.",
        ...uploadErrors.map((error) => `Photo upload needs retry: ${error}`),
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
    trackEvent("consult_request_submitted", {
      backendStored: isBackendStored,
      consultFee: siteConfig.consultFee,
      source: formState.source,
      uploadedPhotoCount,
      uploadErrorCount: uploadErrors.length,
    });
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
          {submissionError ? <p className="form-error">{submissionError}</p> : null}
          <button type="submit" className="button button--primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting securely..." : "Submit consult request"}
          </button>
          <p className="subtle">
            With Supabase configured, the full request is saved to the backend. Local storage keeps
            only minimal status context for this device.
          </p>
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
          <li>Backend storage: {quiz.submittedAt ? "quiz completed" : "pending quiz completion"}.</li>
          <li>Eligibility route: {quiz.eligibilityOutcome || "pending submission"}.</li>
          <li>Reported pattern: {quiz.hairLossPattern || "not captured"}.</li>
          <li>Photo uploads captured: {quiz.photoNames.length || 0}.</li>
          <li>Red-flag checks selected: {quiz.redFlags.filter((item) => item !== redFlagNoneValue).length || 0}.</li>
        </ul>
      </aside>
    </div>
  );
}
