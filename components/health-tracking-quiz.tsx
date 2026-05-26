"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type HealthQuizData = {
  age: string;
  gender: string;
  heightCm: string;
  weightKg: string;
  symptoms: string[];
  familyHistory: string[];
  existingConditions: string[];
  currentMedicines: string[];
  healthGoals: string[];
  preferredSlot: string;
  address: string;
  adultConfirmed: boolean;
  consentAccepted: boolean;
};

type HealthQuizKey = keyof HealthQuizData;

const storageKey = "nidar.healthTrackingQuiz.v1";

const emptyData: HealthQuizData = {
  age: "",
  gender: "",
  heightCm: "",
  weightKg: "",
  symptoms: [],
  familyHistory: [],
  existingConditions: [],
  currentMedicines: [],
  healthGoals: [],
  preferredSlot: "",
  address: "",
  adultConfirmed: false,
  consentAccepted: false,
};

const steps = [
  "Basic profile",
  "Health context",
  "Collection and consent",
] as const;

const optionSets: Record<"symptoms" | "familyHistory" | "existingConditions" | "currentMedicines" | "healthGoals", string[]> = {
  symptoms: ["Fatigue", "Hair fall", "Weight change", "Poor sleep", "Frequent thirst", "No current symptoms"],
  familyHistory: ["Diabetes", "Thyroid disorder", "Heart disease", "High cholesterol", "No known family history"],
  existingConditions: ["Diabetes", "Thyroid disorder", "High blood pressure", "Liver or kidney condition", "No known conditions"],
  currentMedicines: ["Thyroid medicine", "Diabetes medicine", "Blood pressure medicine", "Supplements", "No current medicines"],
  healthGoals: ["Annual baseline", "Improve energy", "Track sugar risk", "Understand deficiencies", "Track health over time"],
};

const noneValues: Partial<Record<keyof typeof optionSets, string>> = {
  symptoms: "No current symptoms",
  familyHistory: "No known family history",
  existingConditions: "No known conditions",
  currentMedicines: "No current medicines",
};

function getBmi(heightCm: string, weightKg: string) {
  const height = Number(heightCm);
  const weight = Number(weightKg);

  if (!height || !weight) {
    return "";
  }

  const meters = height / 100;
  return (weight / (meters * meters)).toFixed(1);
}

export function HealthTrackingQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<HealthQuizData>(emptyData);
  const [errors, setErrors] = useState<Partial<Record<HealthQuizKey, string>>>({});
  const bmi = useMemo(() => getBmi(data.heightCm, data.weightKg), [data.heightCm, data.weightKg]);

  function updateField<K extends HealthQuizKey>(key: K, value: HealthQuizData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function toggleOption(key: keyof typeof optionSets, value: string) {
    setData((current) => {
      const currentValues = current[key];
      const noneValue = noneValues[key];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      const active = value === noneValue && !currentValues.includes(value)
        ? [value]
        : nextValues.filter((item) => item !== noneValue);

      return { ...current, [key]: active };
    });
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function errorFor(key: HealthQuizKey) {
    return errors[key] ? <p className="field-error">{errors[key]}</p> : null;
  }

  function validateStep(stepIndex: number) {
    const nextErrors: Partial<Record<HealthQuizKey, string>> = {};
    const age = Number(data.age);

    if (stepIndex === 0) {
      if (!data.age || !Number.isFinite(age) || age < 18) {
        nextErrors.age = "Please enter an age of 18 or older.";
      }
      if (!data.gender) {
        nextErrors.gender = "Please select gender.";
      }
      if (!data.heightCm) {
        nextErrors.heightCm = "Please enter height in cm.";
      }
      if (!data.weightKg) {
        nextErrors.weightKg = "Please enter weight in kg.";
      }
    }

    if (stepIndex === 1) {
      if (!data.symptoms.length) {
        nextErrors.symptoms = "Select symptoms, or choose no current symptoms.";
      }
      if (!data.familyHistory.length) {
        nextErrors.familyHistory = "Select family history, or choose no known family history.";
      }
      if (!data.existingConditions.length) {
        nextErrors.existingConditions = "Select existing conditions, or choose no known conditions.";
      }
      if (!data.currentMedicines.length) {
        nextErrors.currentMedicines = "Select medicines, or choose no current medicines.";
      }
      if (!data.healthGoals.length) {
        nextErrors.healthGoals = "Select at least one health goal.";
      }
    }

    if (stepIndex === 2) {
      if (!data.preferredSlot) {
        nextErrors.preferredSlot = "Please select a preferred collection slot.";
      }
      if (!data.address.trim()) {
        nextErrors.address = "Please enter the sample collection address.";
      }
      if (!data.adultConfirmed) {
        nextErrors.adultConfirmed = "Please confirm you are 18 years or older.";
      }
      if (!data.consentAccepted) {
        nextErrors.consentAccepted = "Consent is required before joining the beta.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function nextStep() {
    if (!validateStep(step)) {
      return;
    }

    if (step === steps.length - 1) {
      window.localStorage.setItem(storageKey, JSON.stringify({ ...data, bmi, submittedAt: new Date().toISOString() }));
      router.push("/health-tracking/thank-you");
      return;
    }

    setStep((current) => current + 1);
  }

  function renderCheckGroup(key: keyof typeof optionSets, label: string) {
    return (
      <fieldset className={`check-group field--full${errors[key] ? " field--invalid" : ""}`}>
        <legend>{label}</legend>
        {optionSets[key].map((option) => (
          <label key={option} className="check-row">
            <input
              type="checkbox"
              checked={data[key].includes(option)}
              onChange={() => toggleOption(key, option)}
            />
            <span>{option}</span>
          </label>
        ))}
        {errorFor(key)}
      </fieldset>
    );
  }

  return (
    <div className="quiz-card">
      <div className="progress-shell" aria-hidden="true">
        <div className="progress-shell__bar" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>

      <div className="quiz-card__header">
        <div>
          <p className="eyebrow">Health Tracking Beta</p>
          <h2>{steps[step]}</h2>
          <p>AI can organize report data, but clinical guidance requires licensed doctor review.</p>
        </div>
        {bmi ? <p className="status-badge status-badge--operations">BMI {bmi}</p> : null}
      </div>

      {step === 0 ? (
        <div className="form-grid">
          <label className={`field${errors.age ? " field--invalid" : ""}`}>
            <span>Age</span>
            <input value={data.age} inputMode="numeric" onChange={(event) => updateField("age", event.target.value)} />
            {errorFor("age")}
          </label>
          <label className={`field${errors.gender ? " field--invalid" : ""}`}>
            <span>Gender</span>
            <select value={data.gender} onChange={(event) => updateField("gender", event.target.value)}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errorFor("gender")}
          </label>
          <label className={`field${errors.heightCm ? " field--invalid" : ""}`}>
            <span>Height</span>
            <input value={data.heightCm} inputMode="decimal" onChange={(event) => updateField("heightCm", event.target.value)} placeholder="cm" />
            {errorFor("heightCm")}
          </label>
          <label className={`field${errors.weightKg ? " field--invalid" : ""}`}>
            <span>Weight</span>
            <input value={data.weightKg} inputMode="decimal" onChange={(event) => updateField("weightKg", event.target.value)} placeholder="kg" />
            {errorFor("weightKg")}
          </label>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="form-grid">
          {renderCheckGroup("symptoms", "Symptoms")}
          {renderCheckGroup("familyHistory", "Family history")}
          {renderCheckGroup("existingConditions", "Existing conditions")}
          {renderCheckGroup("currentMedicines", "Current medicines")}
          {renderCheckGroup("healthGoals", "Health goals")}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="form-grid">
          <label className={`field${errors.preferredSlot ? " field--invalid" : ""}`}>
            <span>Preferred sample collection slot</span>
            <select value={data.preferredSlot} onChange={(event) => updateField("preferredSlot", event.target.value)}>
              <option value="">Select</option>
              <option value="weekday-morning">Weekday morning</option>
              <option value="weekday-evening">Weekday evening</option>
              <option value="weekend-morning">Weekend morning</option>
            </select>
            {errorFor("preferredSlot")}
          </label>
          <label className={`field field--full${errors.address ? " field--invalid" : ""}`}>
            <span>Sample collection address</span>
            <textarea value={data.address} rows={3} onChange={(event) => updateField("address", event.target.value)} />
            {errorFor("address")}
          </label>
          <label className="check-row field--full">
            <input
              type="checkbox"
              checked={data.adultConfirmed}
              onChange={(event) => updateField("adultConfirmed", event.target.checked)}
            />
            <span>I confirm I am 18 years or older.</span>
          </label>
          {errorFor("adultConfirmed")}
          <label className="check-row field--full">
            <input
              type="checkbox"
              checked={data.consentAccepted}
              onChange={(event) => updateField("consentAccepted", event.target.checked)}
            />
            <span>
              I consent to Nidar organizing my intake for beta follow-up. I understand AI does not
              diagnose or prescribe and doctor-reviewed guidance may be required.
            </span>
          </label>
          {errorFor("consentAccepted")}
        </div>
      ) : null}

      <div className="quiz-card__actions">
        <button type="button" className="button button--ghost" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0}>
          Back
        </button>
        <button type="button" className="button button--primary" onClick={nextStep}>
          {step === steps.length - 1 ? "Join beta" : "Next step"}
        </button>
      </div>
    </div>
  );
}
