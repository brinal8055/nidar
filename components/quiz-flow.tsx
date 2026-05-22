"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { trackEvent } from "@/lib/analytics";
import {
  emptyQuizData,
  normalizeQuizData,
  QuizData,
  redFlagNoneValue,
  safetyNoneValues,
  storageKeys,
} from "@/lib/storage";

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
  redFlagNoneValue,
  "Sudden patchy hair loss",
  "Scalp pain, pus, bleeding, sores, or active infection",
  "Hair loss after serious illness or unexplained weight loss",
  "Currently receiving cancer treatment",
  "Severe allergic reaction to prior treatment",
  "Child or teen patient",
];

const priorTreatmentOptions = [
  safetyNoneValues.priorTreatments,
  "Topical minoxidil",
  "Oral finasteride",
  "Topical finasteride",
  "Dutasteride",
  "Anti-dandruff shampoo",
  "Hair supplements",
  "PRP",
  "Hair transplant consult or procedure",
  "Other",
];

const currentMedicineOptions = [
  safetyNoneValues.currentMedicines,
  "Hair-loss medicine",
  "Blood pressure medicine",
  "Thyroid medicine",
  "Diabetes medicine",
  "Antidepressant or anxiety medicine",
  "Acne medicine or isotretinoin",
  "Steroids or hormone medicine",
  "Supplements",
  "Other",
];

const allergyOptions = [
  safetyNoneValues.allergies,
  "Minoxidil",
  "Finasteride or dutasteride",
  "Ketoconazole",
  "Propylene glycol or topical solution irritation",
  "Sulfa or antibiotic allergy",
  "Other",
];

const medicalConditionOptions = [
  safetyNoneValues.medicalConditions,
  "Thyroid disorder",
  "Anemia or low iron",
  "Diabetes",
  "High blood pressure",
  "Heart condition",
  "Liver or kidney disease",
  "Depression, anxiety, or mood disorder",
  "Scalp psoriasis, eczema, or fungal infection",
  "Recent surgery or major illness",
  "Other",
];

const photoGuide = [
  "Front hairline",
  "Left temple",
  "Right temple",
  "Crown or top view",
  "Close-up of flakes, redness, patches, or irritation if present",
];

const photoAngles = [
  {
    id: "front",
    title: "Front hairline",
    helper: "Face camera directly. Lift hair back so the full front hairline is visible.",
  },
  {
    id: "left",
    title: "Left temple",
    helper: "Turn slightly right so your left temple and hairline corner are visible.",
  },
  {
    id: "right",
    title: "Right temple",
    helper: "Turn slightly left so your right temple and hairline corner are visible.",
  },
  {
    id: "crown",
    title: "Crown / top",
    helper: "Tilt head down or ask someone to capture the top and crown area.",
  },
  {
    id: "close",
    title: "Scalp close-up",
    helper: "Only needed if there are flakes, redness, irritation, patches, or sores.",
  },
] as const;

type SafetyMultiKey = "priorTreatments" | "currentMedicines" | "allergies" | "medicalConditions";

const safetyOtherFields: Record<SafetyMultiKey, keyof QuizData> = {
  priorTreatments: "priorTreatmentsOther",
  currentMedicines: "currentMedicinesOther",
  allergies: "allergiesOther",
  medicalConditions: "medicalConditionsOther",
};

function readStoredQuiz(): QuizData {
  if (typeof window === "undefined") {
    return emptyQuizData;
  }

  const savedValue = window.localStorage.getItem(storageKeys.quiz);

  if (!savedValue) {
    return emptyQuizData;
  }

  try {
    return normalizeQuizData(JSON.parse(savedValue));
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
  const meaningfulRedFlags = getMeaningfulRedFlags(formData.redFlags);

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
    meaningfulRedFlags.length > 0 ||
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

function getMeaningfulRedFlags(redFlags: string[]) {
  return redFlags.filter((item) => item !== redFlagNoneValue);
}

function PhotoAngleIllustration({ angle }: { angle: (typeof photoAngles)[number]["id"] }) {
  if (angle === "crown") {
    return (
      <svg viewBox="0 0 160 160" role="img" aria-label="Top view head photo angle">
        <circle className="angle-svg__skin" cx="80" cy="80" r="54" />
        <path className="angle-svg__hair" d="M31 79c0-34 21-55 49-55s49 21 49 55c-12-12-26-18-49-18S43 67 31 79Z" />
        <circle className="angle-svg__target" cx="80" cy="78" r="22" />
        <path className="angle-svg__line" d="M61 78h38M80 59v38" />
        <text x="80" y="136" textAnchor="middle">
          TOP
        </text>
      </svg>
    );
  }

  if (angle === "close") {
    return (
      <svg viewBox="0 0 160 160" role="img" aria-label="Scalp close-up photo angle">
        <rect className="angle-svg__skin" x="34" y="34" width="92" height="92" rx="28" />
        <path className="angle-svg__hairline" d="M45 75c14-21 55-24 72-4" />
        <path className="angle-svg__line" d="M53 92c8-8 16-8 24 0M83 96c10-9 20-9 30 0" />
        <circle className="angle-svg__target" cx="62" cy="66" r="5" />
        <circle className="angle-svg__target" cx="103" cy="84" r="5" />
        <text x="80" y="136" textAnchor="middle">
          CLOSE
        </text>
      </svg>
    );
  }

  const isLeft = angle === "left";
  const isRight = angle === "right";

  return (
    <svg viewBox="0 0 160 160" role="img" aria-label={`${angle} head photo angle`}>
      <ellipse className="angle-svg__skin" cx="80" cy="78" rx="42" ry="52" />
      <path
        className="angle-svg__hair"
        d={
          isLeft
            ? "M43 75c0-34 16-53 45-53 19 0 33 12 39 31-19-5-40-3-64 8-8 4-14 9-20 14Z"
            : isRight
              ? "M117 75c0-34-16-53-45-53-19 0-33 12-39 31 19-5 40-3 64 8 8 4 14 9 20 14Z"
              : "M39 69c2-31 18-48 41-48s39 17 41 48c-16-12-30-16-41-16S55 57 39 69Z"
        }
      />
      <path
        className="angle-svg__hairline"
        d={isLeft ? "M52 71c13-11 28-17 47-18" : isRight ? "M108 71c-13-11-28-17-47-18" : "M51 70c18-13 40-13 58 0"}
      />
      <circle className="angle-svg__target" cx={isLeft ? 55 : isRight ? 105 : 80} cy={isLeft || isRight ? 72 : 66} r="10" />
      <path className="angle-svg__line" d={isLeft ? "M37 76h28" : isRight ? "M95 76h28" : "M56 66h48"} />
      <text x="80" y="136" textAnchor="middle">
        {isLeft ? "LEFT" : isRight ? "RIGHT" : "FRONT"}
      </text>
    </svg>
  );
}

function PhotoAngleGuide() {
  return (
    <div className="photo-angle-guide field--full">
      <div className="photo-angle-guide__intro">
        <strong>Photo angle demo</strong>
        <p>Use bright light, keep the image sharp, and make sure hair is moved away from the area being captured.</p>
      </div>
      <div className="photo-angle-grid">
        {photoAngles.map((angle) => (
          <article key={angle.id} className="photo-angle-card">
            <div className="photo-angle-card__visual">
              <PhotoAngleIllustration angle={angle.id} />
            </div>
            <h3>{angle.title}</h3>
            <p>{angle.helper}</p>
          </article>
        ))}
      </div>
    </div>
  );
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
      const noneValue =
        key === "recentTriggers"
          ? "No major recent trigger"
          : key === "scalpSymptoms"
            ? "No scalp symptoms"
            : redFlagNoneValue;
      const isExclusiveNone = value === noneValue;
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      const active = isExclusiveNone ? [value] : nextValues.filter((item) => item !== noneValue);

      return { ...current, [key]: active };
    });
    setFieldError("");
  }

  function toggleSafetyValue(key: SafetyMultiKey, value: string) {
    setFormData((current) => {
      const currentValues = current[key];
      const noneValue = safetyNoneValues[key];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      const active = value === noneValue ? [value] : nextValues.filter((item) => item !== noneValue);

      return { ...current, [key]: active };
    });
    setFieldError("");
  }

  function updateOtherField(key: SafetyMultiKey, value: string) {
    updateField(safetyOtherFields[key], value);
  }

  function needsOtherDetail(key: SafetyMultiKey) {
    return formData[key].includes("Other") && !String(formData[safetyOtherFields[key]]).trim();
  }

  function renderSafetyGroup(key: SafetyMultiKey, label: string, helper: string, options: string[]) {
    const otherField = safetyOtherFields[key];

    return (
      <fieldset className="check-group check-group--cards field--full">
        <legend>{label}</legend>
        <p className="check-group__hint">{helper}</p>
        <div className="check-group__grid">
          {options.map((option) => (
            <label key={option} className="check-row check-row--card">
              <input
                type="checkbox"
                checked={formData[key].includes(option)}
                onChange={() => toggleSafetyValue(key, option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {formData[key].includes("Other") ? (
          <label className="field check-group__other">
            <span>Other details</span>
            <textarea
              value={String(formData[otherField])}
              onChange={(event) => updateOtherField(key, event.target.value)}
              placeholder="Add a short detail for doctor review"
              rows={2}
            />
          </label>
        ) : null}
      </fieldset>
    );
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

    if (stepIndex === 2 && (!formData.recentTriggers.length || !formData.scalpSymptoms.length || !formData.redFlags.length)) {
      setFieldError("Please select recent triggers, scalp symptoms, and red flags, even if none apply.");
      return false;
    }

    if (
      stepIndex === 3 &&
      (!formData.currentMedicines.length ||
        !formData.priorTreatments.length ||
        !formData.allergies.length ||
        !formData.medicalConditions.length ||
        needsOtherDetail("currentMedicines") ||
        needsOtherDetail("priorTreatments") ||
        needsOtherDetail("allergies") ||
        needsOtherDetail("medicalConditions") ||
        !formData.sexualMentalHealthHistory ||
        !formData.pregnancyStatus)
    ) {
      setFieldError("Please complete medicines, prior treatments, allergies, conditions, counselling flags, and pregnancy status.");
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
        redFlagCount: getMeaningfulRedFlags(formData.redFlags).length,
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
          {renderSafetyGroup(
            "currentMedicines",
            "Current medicines",
            "Select everything currently used. Choose none if the user takes no regular medicine.",
            currentMedicineOptions,
          )}
          {renderSafetyGroup(
            "priorTreatments",
            "Prior hair-loss treatments",
            "This helps the doctor understand what has already been tried and whether there were issues.",
            priorTreatmentOptions,
          )}
          {renderSafetyGroup(
            "allergies",
            "Allergies",
            "Select known allergies or sensitivities. Choose none if there are no known allergies.",
            allergyOptions,
          )}
          {renderSafetyGroup(
            "medicalConditions",
            "Medical conditions",
            "Select relevant diseases or health conditions. Choose none if nothing applies.",
            medicalConditionOptions,
          )}
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
          <PhotoAngleGuide />
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
