"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { trackEvent } from "@/lib/analytics";
import { addPendingHairPhotos, removePendingHairPhoto } from "@/lib/hair-photo-cache";
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
    helper: "Straight-on face photo. Pull hair back so the forehead and full front hairline are visible.",
  },
  {
    id: "left",
    title: "Left temple",
    helper: "Temple means the side corner above the eyebrow. Turn slightly right and capture the left corner.",
  },
  {
    id: "right",
    title: "Right temple",
    helper: "Temple means the side corner above the eyebrow. Turn slightly left and capture the right corner.",
  },
  {
    id: "crown",
    title: "Crown / top",
    helper: "Top/back thinning area. Tilt head down or ask someone to take the photo from above.",
  },
  {
    id: "close",
    title: "Scalp close-up",
    helper: "Move closer to the problem spot and fill the frame with flakes, redness, patches, or sores.",
  },
] as const;

const maxPhotoSize = 8 * 1024 * 1024;
const photoTypes = ["image/jpeg", "image/png", "image/webp"];

type SafetyMultiKey = "priorTreatments" | "currentMedicines" | "allergies" | "medicalConditions";
type ValidationKey =
  | "age"
  | "sex"
  | "location"
  | "duration"
  | "hairLossPattern"
  | "familyHistory"
  | "recentTriggers"
  | "scalpSymptoms"
  | "redFlags"
  | SafetyMultiKey
  | "sexualMentalHealthHistory"
  | "pregnancyStatus"
  | "photoNames"
  | "adultConfirmed"
  | "consentAccepted";

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
      eligibilityReason: "This launch currently supports adult male hair-loss cases only.",
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
  const ariaLabel = `${photoAngles.find((item) => item.id === angle)?.title ?? angle} photo angle demo`;

  if (angle === "crown") {
    return (
      <svg viewBox="0 0 220 180" role="img" aria-label={ariaLabel}>
        <rect className="angle-svg__phone" x="18" y="12" width="184" height="142" rx="24" />
        <circle className="angle-svg__camera-dot" cx="186" cy="30" r="5" />
        <rect className="angle-svg__viewfinder" x="34" y="34" width="152" height="96" rx="18" />
        <circle className="angle-svg__skin" cx="110" cy="82" r="44" />
        <path className="angle-svg__hair" d="M66 80c0-31 18-51 44-51s44 20 44 51c-14-11-28-15-44-15s-30 4-44 15Z" />
        <path className="angle-svg__hair-detail" d="M82 66c12-10 43-12 58 0M75 84c19-10 51-10 70 0" />
        <circle className="angle-svg__target" cx="110" cy="83" r="23" />
        <path className="angle-svg__line" d="M89 83h42M110 62v42" />
        <path className="angle-svg__corner" d="M57 52h18M57 52v18M163 52h-18M163 52v18M57 112h18M57 112V94M163 112h-18M163 112V94" />
        <text x="110" y="169" textAnchor="middle">
          TAKE FROM ABOVE
        </text>
      </svg>
    );
  }

  if (angle === "close") {
    return (
      <svg viewBox="0 0 220 180" role="img" aria-label={ariaLabel}>
        <rect className="angle-svg__phone" x="18" y="12" width="184" height="142" rx="24" />
        <circle className="angle-svg__camera-dot" cx="186" cy="30" r="5" />
        <rect className="angle-svg__viewfinder" x="34" y="34" width="152" height="96" rx="18" />
        <rect className="angle-svg__skin" x="58" y="45" width="104" height="70" rx="24" />
        <path className="angle-svg__hair-detail" d="M67 61c15-13 27-13 42 0M106 62c16-13 31-13 47 0M67 83c19-15 37-15 56 0M101 101c15-10 30-10 45 0" />
        <circle className="angle-svg__spot" cx="83" cy="73" r="5" />
        <circle className="angle-svg__spot" cx="130" cy="88" r="5" />
        <circle className="angle-svg__spot angle-svg__spot--small" cx="112" cy="70" r="3" />
        <circle className="angle-svg__magnifier" cx="111" cy="82" r="41" />
        <path className="angle-svg__line" d="M141 112l23 23" />
        <path className="angle-svg__corner" d="M52 48h18M52 48v18M168 48h-18M168 48v18M52 122h18M52 122v-18M168 122h-18M168 122v-18" />
        <text x="110" y="169" textAnchor="middle">
          CLOSE-UP OF SPOT
        </text>
      </svg>
    );
  }

  const isLeft = angle === "left";
  const isRight = angle === "right";
  const turnText = isLeft ? "TURN RIGHT" : isRight ? "TURN LEFT" : "FACE CAMERA";
  const focusX = isLeft ? 80 : isRight ? 140 : 110;
  const focusY = isLeft || isRight ? 72 : 64;

  return (
    <svg viewBox="0 0 220 180" role="img" aria-label={ariaLabel}>
      <rect className="angle-svg__phone" x="18" y="12" width="184" height="142" rx="24" />
      <circle className="angle-svg__camera-dot" cx="186" cy="30" r="5" />
      <rect className="angle-svg__viewfinder" x="34" y="34" width="152" height="96" rx="18" />
      <path className="angle-svg__shoulders" d="M65 130c8-19 26-30 45-30s37 11 45 30v24H65Z" />
      <rect className="angle-svg__skin" x="96" y="101" width="28" height="25" rx="12" />
      <ellipse className="angle-svg__skin" cx="110" cy="78" rx={isLeft || isRight ? 35 : 39} ry="49" />
      <ellipse className="angle-svg__ear" cx={isLeft ? 143 : 77} cy="82" rx="7" ry="12" />
      <path
        className="angle-svg__hair"
        d={
          isLeft
            ? "M75 76c0-31 16-52 44-52 22 0 38 14 43 36-21-5-43-3-65 8-8 4-15 7-22 8Z"
            : isRight
              ? "M145 76c0-31-16-52-44-52-22 0-38 14-43 36 21-5 43-3 65 8 8 4 15 7 22 8Z"
              : "M70 70c2-30 18-49 40-49s38 19 40 49c-16-11-29-15-40-15s-24 4-40 15Z"
        }
      />
      <path
        className="angle-svg__hairline"
        d={
          isLeft
            ? "M80 76c18-13 34-19 57-20"
            : isRight
              ? "M140 76c-18-13-34-19-57-20"
              : "M78 70c19-14 45-14 64 0"
        }
      />
      <path
        className="angle-svg__face-line"
        d={
          isLeft
            ? "M102 80h.01M127 80h.01M114 84c-3 10-2 16 4 18M101 111c8 5 18 5 26 0"
            : isRight
              ? "M93 80h.01M118 80h.01M106 84c3 10 2 16-4 18M93 111c8 5 18 5 26 0"
              : "M94 82h.01M126 82h.01M110 86c-4 10-3 17 0 20M97 114c8 6 18 6 26 0"
        }
      />
      <circle className="angle-svg__target" cx={focusX} cy={focusY} r={isLeft || isRight ? 13 : 16} />
      <path className="angle-svg__line" d={isLeft ? "M55 72h38" : isRight ? "M165 72h-38" : "M80 64h60"} />
      <path className="angle-svg__corner" d="M49 48h18M49 48v18M171 48h-18M171 48v18M49 117h18M49 117V99M171 117h-18M171 117V99" />
      <text x="110" y="169" textAnchor="middle">
        {turnText}
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
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuizData>(readStoredQuiz);
  const [fieldError, setFieldError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Partial<Record<ValidationKey, string>>>({});

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

  function scrollToFirstInvalidField(errors: Partial<Record<ValidationKey, string>>) {
    const firstErrorKey = Object.keys(errors)[0];

    if (!firstErrorKey) {
      return;
    }

    window.requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(`[data-validation-key="${firstErrorKey}"]`);

      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "center" });
      const focusTarget = target.querySelector<HTMLElement>("input, select, textarea, button");
      focusTarget?.focus({ preventScroll: true });
    });
  }

  function clearValidationError(key?: keyof QuizData | ValidationKey) {
    if (!key) {
      setValidationErrors({});
      setFieldError("");
      return;
    }

    setValidationErrors((current) => {
      if (!(key in current)) {
        return current;
      }

      const next = { ...current };
      delete next[key as ValidationKey];
      return next;
    });
    setFieldError("");
  }

  function errorFor(key: ValidationKey) {
    return validationErrors[key] ? <p className="field-error">{validationErrors[key]}</p> : null;
  }

  function updateField<K extends keyof QuizData>(key: K, value: QuizData[K]) {
    setFormData((current) => ({ ...current, [key]: value }));
    clearValidationError(key);
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
      const active = isExclusiveNone && !currentValues.includes(value) ? [value] : nextValues.filter((item) => item !== noneValue);

      return { ...current, [key]: active };
    });
    clearValidationError(key);
  }

  function toggleSafetyValue(key: SafetyMultiKey, value: string) {
    setFormData((current) => {
      const currentValues = current[key];
      const noneValue = safetyNoneValues[key];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      const active = value === noneValue && !currentValues.includes(value) ? [value] : nextValues.filter((item) => item !== noneValue);

      return { ...current, [key]: active };
    });
    clearValidationError(key);
  }

  function updateOtherField(key: SafetyMultiKey, value: string) {
    updateField(safetyOtherFields[key], value);
    clearValidationError(key);
  }

  function needsOtherDetail(key: SafetyMultiKey) {
    return formData[key].includes("Other") && !String(formData[safetyOtherFields[key]]).trim();
  }

  function renderSafetyGroup(key: SafetyMultiKey, label: string, helper: string, options: string[]) {
    const otherField = safetyOtherFields[key];

    return (
      <fieldset
        className={`check-group check-group--cards field--full${validationErrors[key] ? " field--invalid" : ""}`}
        data-validation-key={key}
      >
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
        {errorFor(key)}
      </fieldset>
    );
  }

  function handleFileChange(files: FileList | null) {
    const selectedFiles = files ? Array.from(files) : [];
    const invalidFile = selectedFiles.find((file) => !photoTypes.includes(file.type) || file.size > maxPhotoSize);

    if (invalidFile) {
      setValidationErrors((current) => ({
        ...current,
        photoNames: "Photos must be JPG, PNG, or WEBP and under 8 MB each.",
      }));
      return;
    }

    const selectedNames = selectedFiles.map((file) => file.name);

    if (!selectedNames.length) {
      return;
    }

    addPendingHairPhotos(selectedFiles);
    setFormData((current) => ({
      ...current,
      photoNames: Array.from(new Set([...current.photoNames, ...selectedNames])),
    }));
    clearValidationError("photoNames");

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  }

  function removePhotoName(name: string) {
    removePendingHairPhoto(name);
    setFormData((current) => ({
      ...current,
      photoNames: current.photoNames.filter((item) => item !== name),
    }));

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  }

  function validateStep(stepIndex: number) {
    const errors: Partial<Record<ValidationKey, string>> = {};

    if (stepIndex === 0) {
      const age = Number.parseInt(formData.age, 10);
      if (!formData.age) {
        errors.age = "Please enter your age.";
      }
      if (formData.age && (!Number.isFinite(age) || age < 18)) {
        errors.age = "This launch is currently for adults 18+.";
      }
      if (!formData.sex) {
        errors.sex = "Please select sex.";
      }
      if (formData.sex && formData.sex !== "male") {
        errors.sex = "This launch currently supports adult male hair-loss cases only.";
      }
      if (!formData.location) {
        errors.location = "Please enter city and state.";
      }
    }

    if (stepIndex === 1) {
      if (!formData.duration) {
        errors.duration = "Please select how long this has been happening.";
      }
      if (!formData.hairLossPattern) {
        errors.hairLossPattern = "Please select the closest hair-loss pattern.";
      }
      if (!formData.familyHistory) {
        errors.familyHistory = "Please select yes, no, or not sure.";
      }
    }

    if (stepIndex === 2) {
      if (!formData.recentTriggers.length) {
        errors.recentTriggers = "Select one or more triggers, or choose no major recent trigger.";
      }
      if (!formData.scalpSymptoms.length) {
        errors.scalpSymptoms = "Select one or more symptoms, or choose no scalp symptoms.";
      }
      if (!formData.redFlags.length) {
        errors.redFlags = "Select any red flags, or choose none of these red flags.";
      }
    }

    if (stepIndex === 3) {
      const safetyLabels: Record<SafetyMultiKey, string> = {
        currentMedicines: "current medicines",
        priorTreatments: "prior treatments",
        allergies: "allergies",
        medicalConditions: "medical conditions",
      };

      (Object.keys(safetyLabels) as SafetyMultiKey[]).forEach((key) => {
        if (!formData[key].length) {
          errors[key] = `Select ${safetyLabels[key]}, or choose none.`;
        } else if (needsOtherDetail(key)) {
          errors[key] = "You selected Other. Please add details, or unselect Other.";
        }
      });

      if (!formData.sexualMentalHealthHistory) {
        errors.sexualMentalHealthHistory = "Please select No, Yes, or Prefer to discuss with doctor.";
      }
      if (!formData.pregnancyStatus) {
        errors.pregnancyStatus = "Please select Not applicable if this does not apply.";
      }
    }

    if (stepIndex === 4) {
      if (formData.photoNames.length < requiredPhotoCount) {
        errors.photoNames = `Please add at least ${requiredPhotoCount} photos for this intake.`;
      }
      if (!formData.adultConfirmed) {
        errors.adultConfirmed = "Please confirm you are 18 years or older.";
      }
      if (!formData.consentAccepted) {
        errors.consentAccepted = "Please accept the doctor-review consent notice.";
      }
    }

    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      setFieldError("");
      scrollToFirstInvalidField(errors);
      return false;
    }

    setValidationErrors({});
    setFieldError("");
    return true;
  }

  function goNext() {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep === steps.length - 1) {
      if (eligibility.eligibilityOutcome === "not_supported") {
        setFieldError(eligibility.eligibilityReason || "This case is not supported in the current launch flow.");
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
    clearValidationError();
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
          <label className={`field${validationErrors.age ? " field--invalid" : ""}`} data-validation-key="age">
            <span>Age</span>
            <input
              value={formData.age}
              onChange={(event) => updateField("age", event.target.value)}
              inputMode="numeric"
              placeholder="e.g. 29"
            />
            {errorFor("age")}
          </label>
          <label className={`field${validationErrors.sex ? " field--invalid" : ""}`} data-validation-key="sex">
            <span>Sex</span>
            <select value={formData.sex} onChange={(event) => updateField("sex", event.target.value)}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errorFor("sex")}
          </label>
          <label
            className={`field field--full${validationErrors.location ? " field--invalid" : ""}`}
            data-validation-key="location"
          >
            <span>Location</span>
            <input
              value={formData.location}
              onChange={(event) => updateField("location", event.target.value)}
              placeholder="City, state"
            />
            {errorFor("location")}
          </label>
          <div className="eligibility-note field--full">
            <strong>Current launch boundary</strong>
            <p>We are starting with adult male pattern hair loss. Female hair loss, minors, patchy loss, and severe scalp disease should use a different clinical pathway.</p>
          </div>
        </div>
      ) : null}

      {currentStep === 1 ? (
        <div className="form-grid">
          <label className={`field${validationErrors.duration ? " field--invalid" : ""}`} data-validation-key="duration">
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
            {errorFor("duration")}
          </label>
          <label
            className={`field${validationErrors.hairLossPattern ? " field--invalid" : ""}`}
            data-validation-key="hairLossPattern"
          >
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
            {errorFor("hairLossPattern")}
          </label>
          <label
            className={`field field--full${validationErrors.familyHistory ? " field--invalid" : ""}`}
            data-validation-key="familyHistory"
          >
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
            {errorFor("familyHistory")}
          </label>
        </div>
      ) : null}

      {currentStep === 2 ? (
        <div className="form-grid">
          <fieldset
            className={`check-group field--full${validationErrors.recentTriggers ? " field--invalid" : ""}`}
            data-validation-key="recentTriggers"
          >
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
            {errorFor("recentTriggers")}
          </fieldset>
          <fieldset
            className={`check-group field--full${validationErrors.scalpSymptoms ? " field--invalid" : ""}`}
            data-validation-key="scalpSymptoms"
          >
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
            {errorFor("scalpSymptoms")}
          </fieldset>
          <fieldset
            className={`check-group field--full${validationErrors.redFlags ? " field--invalid" : ""}`}
            data-validation-key="redFlags"
          >
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
            {errorFor("redFlags")}
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
          <label
            className={`field${validationErrors.sexualMentalHealthHistory ? " field--invalid" : ""}`}
            data-validation-key="sexualMentalHealthHistory"
          >
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
            {errorFor("sexualMentalHealthHistory")}
          </label>
          <label
            className={`field${validationErrors.pregnancyStatus ? " field--invalid" : ""}`}
            data-validation-key="pregnancyStatus"
          >
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
            {errorFor("pregnancyStatus")}
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
          <label
            className={`field field--full${validationErrors.photoNames ? " field--invalid" : ""}`}
            data-validation-key="photoNames"
          >
            <span>Recent scalp or hair photos</span>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(event) => handleFileChange(event.target.files)}
            />
            <p className="subtle">Upload progress is shown at submission. Photos are kept private and uploaded to secure case media storage when the backend is configured.</p>
            {errorFor("photoNames")}
          </label>
          {formData.photoNames.length ? (
            <div className="upload-list field--full" aria-label="Selected photo files">
              {formData.photoNames.map((name) => (
                <span key={name} className="pill pill--removable">
                  <span>{name}</span>
                  <button type="button" onClick={() => removePhotoName(name)} aria-label={`Remove ${name}`}>
                    x
                  </button>
                </span>
              ))}
            </div>
          ) : null}
          <div className={`eligibility-note field--full eligibility-note--${eligibility.eligibilityOutcome || "eligible"}`}>
            <strong>Pre-screen result</strong>
            <p>{eligibility.eligibilityReason}</p>
            <p>AI may summarize and flag this intake, but diagnosis and prescribing stay with the doctor.</p>
          </div>
          <label className="check-row field--full" data-validation-key="adultConfirmed">
            <input
              type="checkbox"
              checked={formData.adultConfirmed}
              onChange={(event) => updateField("adultConfirmed", event.target.checked)}
            />
            <span>I confirm that I am 18 years or older.</span>
          </label>
          {errorFor("adultConfirmed")}
          <label className="check-row field--full" data-validation-key="consentAccepted">
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
          {errorFor("consentAccepted")}
        </div>
      ) : null}

      {fieldError ? <p className="form-error">{fieldError}</p> : null}

      <div className="quiz-card__actions">
        <button type="button" className="button button--ghost" onClick={goBack} disabled={currentStep === 0}>
          Back
        </button>
        <button type="button" className="button button--primary" onClick={goNext}>
          {currentStep === steps.length - 1 ? "Continue to consult request" : "Next step"}
        </button>
      </div>
    </div>
  );
}
