"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { trackEvent } from "@/lib/analytics";
import { QuizData, storageKeys } from "@/lib/storage";

const emptyQuizData: QuizData = {
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

const steps = [
  {
    title: "Basics",
    description: "Confirm this launch is the right starting point before asking for sensitive details.",
  },
  {
    title: "Pattern and timeline",
    description: "Separate gradual male-pattern thinning from cases that need a different route.",
  },
  {
    title: "Triggers and scalp symptoms",
    description: "Look for recent illness, stress, weight change, inflammation, patches, or infection signs.",
  },
  {
    title: "Treatment safety",
    description: "Capture medicines, allergies, conditions, and counselling flags before doctor review.",
  },
  {
    title: "Photos and consent",
    description: "Collect standard photos and confirm the doctor-review boundary in plain language.",
  },
];

const hairLossPatternOptions = [
  { value: "hairline", label: "Hairline recession" },
  { value: "crown", label: "Crown or top thinning" },
  { value: "hairline-and-crown", label: "Hairline and crown thinning" },
  { value: "diffuse", label: "Diffuse shedding across the scalp" },
  { value: "patchy", label: "Round or patchy bald spots" },
  { value: "scalp-disease", label: "Hair loss with scaling, pain, pus, or scarring" },
];

const recentTriggerOptions = [
  "Recent fever, illness, surgery, or major infection",
  "Major stress in the last 3 months",
  "Rapid weight loss or diet change",
  "New medicine started recently",
  "No major recent trigger",
];

const scalpSymptomOptions = [
  "Dandruff or flakes",
  "Itching",
  "Redness or scaling",
  "Pain, pus, bleeding, or sores",
  "Round patches",
  "No scalp symptoms",
];

const redFlagOptions = [
  "Sudden patchy hair loss",
  "Scalp pain, pus, bleeding, sores, or active infection",
  "Hair loss after serious illness or unexplained weight loss",
  "Currently receiving cancer treatment",
  "Severe allergic reaction to prior treatment",
  "Child or teen patient",
];

const photoGuide = [
  "Front hairline",
  "Left temple",
  "Right temple",
  "Crown or top view",
  "Close-up of flakes, redness, patches, or irritation if present",
];

function readStoredQuiz(): QuizData {
  if (typeof window === "undefined") {
    return emptyQuizData;
  }

  const savedValue = window.localStorage.getItem(storageKeys.quiz);

  if (!savedValue) {
    return emptyQuizData;
  }

  try {
    const parsed = JSON.parse(savedValue) as QuizData;
    return { ...emptyQuizData, ...parsed };
  } catch {
    window.localStorage.removeItem(storageKeys.quiz);
    return emptyQuizData;
  }
}

function getRequiredPhotoCount(formData: QuizData) {
  const needsCloseUp = formData.scalpSymptoms.some((symptom) => symptom !== "No scalp symptoms");
  return needsCloseUp ? 5 : 4;
}

function getEligibility(formData: QuizData): Pick<QuizData, "eligibilityOutcome" | "eligibilityReason"> {
  const age = Number.parseInt(formData.age, 10);

  if (!Number.isFinite(age) || age < 18) {
    return {
      eligibilityOutcome: "not_supported",
      eligibilityReason: "This launch is only for adults 18+.",
    };
  }

  if (formData.sex !== "male") {
    return {
      eligibilityOutcome: "not_supported",
      eligibilityReason: "This MVP currently supports adult male hair-loss cases only.",
    };
  }

  if (formData.pregnancyStatus === "pregnant" || formData.pregnancyStatus === "planning") {
    return {
      eligibilityOutcome: "not_supported",
      eligibilityReason: "Pregnancy or pregnancy planning needs a different clinical pathway.",
    };
  }

  if (
    formData.hairLossPattern === "patchy" ||
    formData.hairLossPattern === "scalp-disease" ||
    formData.redFlags.length > 0 ||
    formData.scalpSymptoms.includes("Pain, pus, bleeding, or sores") ||
    formData.scalpSymptoms.includes("Round patches")
  ) {
    return {
      eligibilityOutcome: "not_supported",
      eligibilityReason: "Patchy, painful, infected, or rapidly changing hair loss should be reviewed in person.",
    };
  }

  if (
    formData.hairLossPattern === "diffuse" ||
    formData.duration === "under-3-months" ||
    formData.recentTriggers.some((trigger) => trigger !== "No major recent trigger") ||
    formData.scalpSymptoms.some((symptom) => symptom !== "No scalp symptoms") ||
    formData.sexualMentalHealthHistory === "yes" ||
    formData.sexualMentalHealthHistory === "prefer-doctor" ||
    formData.pregnancyStatus === "partner-pregnant"
  ) {
    return {
      eligibilityOutcome: "needs_doctor_triage",
      eligibilityReason: "The case can be sent for doctor review, but it may need labs, counselling, or referral.",
    };
  }

  return {
    eligibilityOutcome: "eligible",
    eligibilityReason: "The intake looks suitable for the adult male pattern hair-loss review flow.",
  };
}

export function QuizFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuizData>(readStoredQuiz);
  const [fieldError, setFieldError] = useState("");

  useEffect(() => {
    trackEvent("quiz_start", { source: "quiz_page" });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(storageKeys.quiz, JSON.stringify(formData));
  }, [formData]);

  const progress = useMemo(() => `${((currentStep + 1) / steps.length) * 100}%`, [currentStep]);
  const requiredPhotoCount = useMemo(() => getRequiredPhotoCount(formData), [formData]);
  const eligibility = useMemo(() => getEligibility(formData), [formData]);

  function updateField<K extends keyof QuizData>(key: K, value: QuizData[K]) {
    setFormData((current) => ({ ...current, [key]: value }));
    setFieldError("");
  }

  function toggleListValue(key: "recentTriggers" | "scalpSymptoms" | "redFlags", value: string) {
    setFormData((current) => {
      const currentValues = current[key];
      const noneValue = key === "recentTriggers" ? "No major recent trigger" : "No scalp symptoms";
      const isExclusiveNone = key !== "redFlags" && value === noneValue;
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      const active = isExclusiveNone ? [value] : nextValues.filter((item) => item !== noneValue);

      return { ...current, [key]: active };
    });
    setFieldError("");
  }

  function handleFileChange(files: FileList | null) {
    const photoNames = files ? Array.from(files).map((file) => file.name) : [];
    updateField("photoNames", photoNames);
  }

  function validateStep(stepIndex: number) {
    if (stepIndex === 0) {
      const age = Number.parseInt(formData.age, 10);
      if (!formData.age || !formData.sex || !formData.location) {
        setFieldError("Please complete age, sex, and location before continuing.");
        return false;
      }

      if (!Number.isFinite(age) || age < 18 || formData.sex !== "male") {
        setFieldError("This launch is currently for adult men with suspected pattern hair loss only.");
        return false;
      }
    }

    if (stepIndex === 1 && (!formData.duration || !formData.hairLossPattern || !formData.familyHistory)) {
      setFieldError("Please complete duration, hair-loss pattern, and family history.");
      return false;
    }

    if (stepIndex === 2 && (!formData.recentTriggers.length || !formData.scalpSymptoms.length)) {
      setFieldError("Please select recent triggers and scalp symptoms, even if none apply.");
      return false;
    }

    if (
      stepIndex === 3 &&
      (!formData.currentMedicines ||
        !formData.allergies ||
        !formData.medicalConditions ||
        !formData.sexualMentalHealthHistory ||
        !formData.pregnancyStatus)
    ) {
      setFieldError("Please complete medicines, allergies, conditions, counselling flags, and pregnancy status.");
      return false;
    }

    if (
      stepIndex === 4 &&
      (formData.photoNames.length < requiredPhotoCount || !formData.consentAccepted || !formData.adultConfirmed)
    ) {
      setFieldError(
        `Please add at least ${requiredPhotoCount} photos, confirm you are 18+, and accept the consent notice.`,
      );
      return false;
    }

    return true;
  }

  function goNext() {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep === steps.length - 1) {
      if (eligibility.eligibilityOutcome === "not_supported") {
        setFieldError(eligibility.eligibilityReason || "This case is not supported in the current MVP.");
        return;
      }

      const submission = {
        ...formData,
        ...eligibility,
        submittedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(storageKeys.quiz, JSON.stringify(submission));
      trackEvent("quiz_complete", {
        redFlagCount: formData.redFlags.length,
        photoCount: formData.photoNames.length,
        eligibilityOutcome: eligibility.eligibilityOutcome,
      });
      router.push("/checkout");
      return;
    }

    setCurrentStep((step) => step + 1);
  }

  function goBack() {
    setFieldError("");
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  return (
    <div className="quiz-card">
      <div className="progress-shell" aria-hidden="true">
        <div className="progress-shell__bar" style={{ width: progress }} />
      </div>

      <div className="quiz-card__header">
        <div>
          <p className="eyebrow">Step {currentStep + 1}</p>
          <h2>{steps[currentStep].title}</h2>
          <p>{steps[currentStep].description}</p>
        </div>
        <p className="subtle">Saved locally on this device while you complete the form.</p>
      </div>

      {currentStep === 0 ? (
        <div className="form-grid">
          <label className="field">
            <span>Age</span>
            <input
              value={formData.age}
              onChange={(event) => updateField("age", event.target.value)}
              inputMode="numeric"
              placeholder="e.g. 29"
            />
          </label>
          <label className="field">
            <span>Sex</span>
            <select value={formData.sex} onChange={(event) => updateField("sex", event.target.value)}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="field field--full">
            <span>Location</span>
            <input
              value={formData.location}
              onChange={(event) => updateField("location", event.target.value)}
              placeholder="City, state"
            />
          </label>
          <div className="eligibility-note field--full">
            <strong>Current MVP boundary</strong>
            <p>We are starting with adult male pattern hair loss. Female hair loss, minors, patchy loss, and severe scalp disease should use a different clinical pathway.</p>
          </div>
        </div>
      ) : null}

      {currentStep === 1 ? (
        <div className="form-grid">
          <label className="field">
            <span>How long has hair loss been happening?</span>
            <select
              value={formData.duration}
              onChange={(event) => updateField("duration", event.target.value)}
            >
              <option value="">Select</option>
              <option value="under-3-months">Under 3 months</option>
              <option value="3-12-months">3 to 12 months</option>
              <option value="1-3-years">1 to 3 years</option>
              <option value="3-plus-years">3+ years</option>
            </select>
          </label>
          <label className="field">
            <span>Hair-loss pattern</span>
            <select
              value={formData.hairLossPattern}
              onChange={(event) => updateField("hairLossPattern", event.target.value)}
            >
              <option value="">Select</option>
              {hairLossPatternOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field field--full">
            <span>Family history of pattern hair loss</span>
            <select
              value={formData.familyHistory}
              onChange={(event) => updateField("familyHistory", event.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unsure">Not sure</option>
            </select>
          </label>
        </div>
      ) : null}

      {currentStep === 2 ? (
        <div className="form-grid">
          <fieldset className="check-group field--full">
            <legend>Recent triggers</legend>
            {recentTriggerOptions.map((option) => (
              <label key={option} className="check-row">
                <input
                  type="checkbox"
                  checked={formData.recentTriggers.includes(option)}
                  onChange={() => toggleListValue("recentTriggers", option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="check-group field--full">
            <legend>Scalp symptoms</legend>
            {scalpSymptomOptions.map((option) => (
              <label key={option} className="check-row">
                <input
                  type="checkbox"
                  checked={formData.scalpSymptoms.includes(option)}
                  onChange={() => toggleListValue("scalpSymptoms", option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="check-group field--full">
            <legend>Referral red flags</legend>
            {redFlagOptions.map((option) => (
              <label key={option} className="check-row">
                <input
                  type="checkbox"
                  checked={formData.redFlags.includes(option)}
                  onChange={() => toggleListValue("redFlags", option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>
        </div>
      ) : null}

      {currentStep === 3 ? (
        <div className="form-grid">
          <label className="field field--full">
            <span>Current medicines</span>
            <textarea
              value={formData.currentMedicines}
              onChange={(event) => updateField("currentMedicines", event.target.value)}
              placeholder="List everything you take. Write none if not applicable."
              rows={3}
            />
          </label>
          <label className="field field--full">
            <span>Prior hair-loss treatments</span>
            <textarea
              value={formData.priorTreatments}
              onChange={(event) => updateField("priorTreatments", event.target.value)}
              placeholder="Minoxidil, finasteride, shampoos, supplements, PRP, transplant consult, or none."
              rows={3}
            />
          </label>
          <label className="field field--full">
            <span>Allergies</span>
            <textarea
              value={formData.allergies}
              onChange={(event) => updateField("allergies", event.target.value)}
              placeholder="List known drug or ingredient allergies. Write none if not applicable."
              rows={3}
            />
          </label>
          <label className="field field--full">
            <span>Medical conditions</span>
            <textarea
              value={formData.medicalConditions}
              onChange={(event) => updateField("medicalConditions", event.target.value)}
              placeholder="Thyroid, anemia, diabetes, hypertension, scalp disease, recent surgery, or none."
              rows={3}
            />
          </label>
          <label className="field">
            <span>Sexual or mental health history relevant to counselling</span>
            <select
              value={formData.sexualMentalHealthHistory}
              onChange={(event) => updateField("sexualMentalHealthHistory", event.target.value)}
            >
              <option value="">Select</option>
              <option value="no">No</option>
              <option value="yes">Yes, I want the doctor to review this carefully</option>
              <option value="prefer-doctor">Prefer to discuss with doctor</option>
            </select>
          </label>
          <label className="field">
            <span>Pregnancy or pregnancy planning</span>
            <select
              value={formData.pregnancyStatus}
              onChange={(event) => updateField("pregnancyStatus", event.target.value)}
            >
              <option value="">Select</option>
              <option value="not-applicable">Not applicable</option>
              <option value="pregnant">Pregnant</option>
              <option value="planning">Planning pregnancy</option>
              <option value="partner-pregnant">Partner is pregnant or planning</option>
            </select>
          </label>
        </div>
      ) : null}

      {currentStep === 4 ? (
        <div className="form-grid">
          <div className="eligibility-note field--full">
            <strong>Photo set needed before doctor review</strong>
            <ul className="summary-list">
              {photoGuide.map((item, index) => (
                <li key={item}>
                  {index + 1}. {item}
                </li>
              ))}
            </ul>
          </div>
          <label className="field field--full">
            <span>Recent scalp or hair photos</span>
            <input type="file" accept="image/*" multiple onChange={(event) => handleFileChange(event.target.files)} />
          </label>
          {formData.photoNames.length ? (
            <div className="upload-list field--full">
              {formData.photoNames.map((name) => (
                <span key={name} className="pill">
                  {name}
                </span>
              ))}
            </div>
          ) : null}
          <div className={`eligibility-note field--full eligibility-note--${eligibility.eligibilityOutcome || "eligible"}`}>
            <strong>Pre-screen result</strong>
            <p>{eligibility.eligibilityReason}</p>
            <p>AI may summarize and flag this intake, but diagnosis and prescribing stay with the doctor.</p>
          </div>
          <label className="check-row field--full">
            <input
              type="checkbox"
              checked={formData.adultConfirmed}
              onChange={(event) => updateField("adultConfirmed", event.target.checked)}
            />
            <span>I confirm that I am 18 years or older.</span>
          </label>
          <label className="check-row field--full">
            <input
              type="checkbox"
              checked={formData.consentAccepted}
              onChange={(event) => updateField("consentAccepted", event.target.checked)}
            />
            <span>
              I understand this is not for emergencies, AI does not diagnose or prescribe, and a doctor
              must review my case before any treatment decision.
            </span>
          </label>
        </div>
      ) : null}

      {fieldError ? <p className="form-error">{fieldError}</p> : null}

      <div className="quiz-card__actions">
        <button type="button" className="button button--ghost" onClick={goBack} disabled={currentStep === 0}>
          Back
        </button>
        <button type="button" className="button button--primary" onClick={goNext}>
          {currentStep === steps.length - 1 ? "Continue to doctor-review payment" : "Next step"}
        </button>
      </div>
    </div>
  );
}
