"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { createHealthTrackingRequest } from "@/lib/care-repository";

type CollectionMode = "sample_collection" | "report_upload";

type HealthQuizData = {
  age: string;
  gender: string;
  heightCm: string;
  weightKg: string;
  cityState: string;
  contact: string;
  goals: string[];
  symptoms: string[];
  familyHistory: string[];
  currentMedicines: string;
  knownConditions: string;
  diet: string;
  smokingAlcohol: string;
  packageType: string;
  collectionMode: CollectionMode;
  address: string;
  preferredDate: string;
  preferredSlot: string;
  fastingAcknowledged: boolean;
  reportFileNames: string[];
  healthDataConsent: boolean;
  labShareConsent: boolean;
  doctorReviewConsent: boolean;
  noEmergencyAck: boolean;
};

type HealthQuizKey = keyof HealthQuizData;

const emptyData: HealthQuizData = {
  age: "",
  gender: "",
  heightCm: "",
  weightKg: "",
  cityState: "",
  contact: "",
  goals: [],
  symptoms: [],
  familyHistory: [],
  currentMedicines: "",
  knownConditions: "",
  diet: "",
  smokingAlcohol: "",
  packageType: "",
  collectionMode: "sample_collection",
  address: "",
  preferredDate: "",
  preferredSlot: "",
  fastingAcknowledged: false,
  reportFileNames: [],
  healthDataConsent: false,
  labShareConsent: false,
  doctorReviewConsent: false,
  noEmergencyAck: false,
};

const steps = [
  "Basics",
  "Health goals",
  "Symptoms and history",
  "Package selection",
  "Collection or upload",
  "Consent",
] as const;

const goals = [
  "Annual baseline",
  "Fatigue / vitamin deficiency",
  "Diabetes risk",
  "Thyroid tracking",
  "Liver/kidney/lipid tracking",
  "Hair-loss supportive labs",
  "Upload existing report only",
];

const symptoms = ["Fatigue", "Weight change", "Sleep issues", "No current symptoms"];
const familyHistory = ["Diabetes", "Thyroid disorder", "Heart disease", "No known family history"];

const packages = [
  "Basic Annual Health",
  "Vitamin & Fatigue",
  "Diabetes Risk",
  "Upload Existing Report",
];

const maxReportSize = 8 * 1024 * 1024;
const reportTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

function getBmi(heightCm: string, weightKg: string) {
  const height = Number(heightCm);
  const weight = Number(weightKg);

  if (!height || !weight) {
    return "";
  }

  const meters = height / 100;
  return (weight / (meters * meters)).toFixed(1);
}

export function HealthTrackingQuiz({ defaultMode = "sample_collection" }: { defaultMode?: CollectionMode }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<HealthQuizData>({ ...emptyData, collectionMode: defaultMode });
  const [errors, setErrors] = useState<Partial<Record<HealthQuizKey, string>>>({});
  const [formError, setFormError] = useState("");
  const bmi = useMemo(() => getBmi(data.heightCm, data.weightKg), [data.heightCm, data.weightKg]);

  function updateField<K extends HealthQuizKey>(key: K, value: HealthQuizData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
    setFormError("");
  }

  function toggleList(key: "goals" | "symptoms" | "familyHistory", value: string) {
    setData((current) => {
      const currentValues = current[key];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...current, [key]: nextValues };
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
      if (!data.cityState.trim()) {
        nextErrors.cityState = "Please enter city and state.";
      }
      if (!data.contact.trim()) {
        nextErrors.contact = "Please add a phone number or email.";
      }
    }

    if (stepIndex === 1 && !data.goals.length) {
      nextErrors.goals = "Select at least one health goal.";
    }

    if (stepIndex === 2) {
      if (!data.symptoms.length) {
        nextErrors.symptoms = "Select symptoms, or choose no current symptoms.";
      }
      if (!data.familyHistory.length) {
        nextErrors.familyHistory = "Select family history, or choose no known family history.";
      }
      if (!data.currentMedicines.trim()) {
        nextErrors.currentMedicines = "Enter current medicines, or write none.";
      }
      if (!data.knownConditions.trim()) {
        nextErrors.knownConditions = "Enter known conditions, or write none.";
      }
      if (!data.diet) {
        nextErrors.diet = "Please select diet.";
      }
    }

    if (stepIndex === 3 && !data.packageType) {
      nextErrors.packageType = "Please select a beta package.";
    }

    if (stepIndex === 4) {
      if (data.collectionMode === "sample_collection") {
        if (!data.address.trim()) {
          nextErrors.address = "Please enter the sample collection address.";
        }
        if (!data.preferredDate) {
          nextErrors.preferredDate = "Please choose a preferred date.";
        }
        if (!data.preferredSlot) {
          nextErrors.preferredSlot = "Please select a preferred time slot.";
        }
        if (!data.fastingAcknowledged) {
          nextErrors.fastingAcknowledged = "Please acknowledge fasting may be required.";
        }
      } else if (!data.reportFileNames.length) {
        nextErrors.reportFileNames = "Please upload a PDF or image report.";
      }
    }

    if (stepIndex === 5) {
      if (!data.healthDataConsent) {
        nextErrors.healthDataConsent = "Health data processing consent is required.";
      }
      if (data.collectionMode === "sample_collection" && !data.labShareConsent) {
        nextErrors.labShareConsent = "Lab partner sharing consent is required for sample collection.";
      }
      if (!data.doctorReviewConsent) {
        nextErrors.doctorReviewConsent = "Doctor-reviewed guidance consent is required.";
      }
      if (!data.noEmergencyAck) {
        nextErrors.noEmergencyAck = "Please acknowledge this is not emergency care.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleReportUpload(files: FileList | null) {
    const selected = files ? Array.from(files) : [];
    const invalid = selected.find((file) => !reportTypes.includes(file.type) || file.size > maxReportSize);

    if (invalid) {
      setErrors((current) => ({
        ...current,
        reportFileNames: "Reports must be PDF, JPG, PNG, or WEBP and under 8 MB.",
      }));
      return;
    }

    updateField("reportFileNames", Array.from(new Set([...data.reportFileNames, ...selected.map((file) => file.name)])));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removeReport(name: string) {
    updateField(
      "reportFileNames",
      data.reportFileNames.filter((item) => item !== name),
    );
  }

  async function nextStep() {
    if (!validateStep(step)) {
      return;
    }

    if (step === steps.length - 1) {
      try {
        await createHealthTrackingRequest({
          packageType: data.packageType,
          cityState: data.cityState,
          contact: data.contact,
          collectionMode: data.collectionMode,
          bmi,
          goals: data.goals,
          reportFileNames: data.reportFileNames,
        });
        router.push("/health-tracking/thank-you");
      } catch {
        setFormError("We could not save this beta request on this device. Please try again.");
      }
      return;
    }

    setStep((current) => current + 1);
  }

  function renderCheckGroup(key: "goals" | "symptoms" | "familyHistory", label: string, options: string[]) {
    return (
      <fieldset className={`check-group field--full${errors[key] ? " field--invalid" : ""}`}>
        <legend>{label}</legend>
        <div className="check-group__grid">
          {options.map((option) => (
            <label key={option} className="check-row check-row--card">
              <input type="checkbox" checked={data[key].includes(option)} onChange={() => toggleList(key, option)} />
              <span>{option}</span>
            </label>
          ))}
        </div>
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
          <p>Beta request first. Our team confirms availability, lab coverage, and pricing before booking.</p>
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
          <label className={`field${errors.cityState ? " field--invalid" : ""}`}>
            <span>City/state</span>
            <input value={data.cityState} onChange={(event) => updateField("cityState", event.target.value)} />
            {errorFor("cityState")}
          </label>
          <label className={`field${errors.contact ? " field--invalid" : ""}`}>
            <span>Phone or email</span>
            <input value={data.contact} onChange={(event) => updateField("contact", event.target.value)} />
            {errorFor("contact")}
          </label>
        </div>
      ) : null}

      {step === 1 ? <div className="form-grid">{renderCheckGroup("goals", "Health goals", goals)}</div> : null}

      {step === 2 ? (
        <div className="form-grid">
          {renderCheckGroup("symptoms", "Symptoms", symptoms)}
          {renderCheckGroup("familyHistory", "Family history", familyHistory)}
          <label className={`field${errors.currentMedicines ? " field--invalid" : ""}`}>
            <span>Current medicines</span>
            <textarea value={data.currentMedicines} rows={2} onChange={(event) => updateField("currentMedicines", event.target.value)} placeholder="Write none if not applicable" />
            {errorFor("currentMedicines")}
          </label>
          <label className={`field${errors.knownConditions ? " field--invalid" : ""}`}>
            <span>Known conditions</span>
            <textarea value={data.knownConditions} rows={2} onChange={(event) => updateField("knownConditions", event.target.value)} placeholder="Write none if not applicable" />
            {errorFor("knownConditions")}
          </label>
          <label className={`field${errors.diet ? " field--invalid" : ""}`}>
            <span>Diet</span>
            <select value={data.diet} onChange={(event) => updateField("diet", event.target.value)}>
              <option value="">Select</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-vegetarian</option>
              <option value="eggetarian">Eggetarian</option>
              <option value="vegan">Vegan</option>
            </select>
            {errorFor("diet")}
          </label>
          <label className="field">
            <span>Smoking/alcohol</span>
            <input value={data.smokingAlcohol} onChange={(event) => updateField("smokingAlcohol", event.target.value)} placeholder="Optional" />
          </label>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="form-grid">
          <fieldset className={`check-group field--full${errors.packageType ? " field--invalid" : ""}`}>
            <legend>Package</legend>
            <div className="check-group__grid">
              {packages.map((option) => (
                <label key={option} className="check-row check-row--card">
                  <input type="radio" name="package" checked={data.packageType === option} onChange={() => updateField("packageType", option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errorFor("packageType")}
          </fieldset>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="form-grid">
          <fieldset className="check-group field--full">
            <legend>Choose path</legend>
            <div className="check-group__grid">
              <label className="check-row check-row--card">
                <input type="radio" checked={data.collectionMode === "sample_collection"} onChange={() => updateField("collectionMode", "sample_collection")} />
                <span>Book home sample collection</span>
              </label>
              <label className="check-row check-row--card">
                <input type="radio" checked={data.collectionMode === "report_upload"} onChange={() => updateField("collectionMode", "report_upload")} />
                <span>Upload existing report</span>
              </label>
            </div>
          </fieldset>

          {data.collectionMode === "sample_collection" ? (
            <>
              <label className={`field field--full${errors.address ? " field--invalid" : ""}`}>
                <span>Address</span>
                <textarea value={data.address} rows={3} onChange={(event) => updateField("address", event.target.value)} />
                {errorFor("address")}
              </label>
              <label className={`field${errors.preferredDate ? " field--invalid" : ""}`}>
                <span>Preferred date</span>
                <input value={data.preferredDate} onChange={(event) => updateField("preferredDate", event.target.value)} placeholder="e.g. 5 June 2026" />
                {errorFor("preferredDate")}
              </label>
              <label className={`field${errors.preferredSlot ? " field--invalid" : ""}`}>
                <span>Preferred time slot</span>
                <select value={data.preferredSlot} onChange={(event) => updateField("preferredSlot", event.target.value)}>
                  <option value="">Select</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
                {errorFor("preferredSlot")}
              </label>
              <label className="check-row field--full">
                <input type="checkbox" checked={data.fastingAcknowledged} onChange={(event) => updateField("fastingAcknowledged", event.target.checked)} />
                <span>I understand fasting may be required depending on the selected package.</span>
              </label>
              {errorFor("fastingAcknowledged")}
            </>
          ) : (
            <>
              <label className={`field field--full${errors.reportFileNames ? " field--invalid" : ""}`}>
                <span>Report PDF or image</span>
                <input ref={fileInputRef} type="file" accept=".pdf,image/jpeg,image/png,image/webp" multiple onChange={(event) => handleReportUpload(event.target.files)} />
                {errorFor("reportFileNames")}
              </label>
              {data.reportFileNames.length ? (
                <div className="upload-list field--full">
                  {data.reportFileNames.map((name) => (
                    <span key={name} className="pill pill--removable">
                      <span>{name}</span>
                      <button type="button" onClick={() => removeReport(name)} aria-label={`Remove ${name}`}>
                        x
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      ) : null}

      {step === 5 ? (
        <div className="form-grid">
          <div className="eligibility-note field--full">
            <strong>Beta next steps</strong>
            <p>Our team will confirm availability, lab coverage, and pricing before booking.</p>
          </div>
          <label className="check-row field--full">
            <input type="checkbox" checked={data.healthDataConsent} onChange={(event) => updateField("healthDataConsent", event.target.checked)} />
            <span>I consent to Nidar processing my health data for this beta request.</span>
          </label>
          {errorFor("healthDataConsent")}
          <label className="check-row field--full">
            <input type="checkbox" checked={data.labShareConsent} onChange={(event) => updateField("labShareConsent", event.target.checked)} />
            <span>I consent to required information being shared with a lab partner if sample collection is booked.</span>
          </label>
          {errorFor("labShareConsent")}
          <label className="check-row field--full">
            <input type="checkbox" checked={data.doctorReviewConsent} onChange={(event) => updateField("doctorReviewConsent", event.target.checked)} />
            <span>I understand clinical guidance is doctor-reviewed and AI only organizes information.</span>
          </label>
          {errorFor("doctorReviewConsent")}
          <label className="check-row field--full">
            <input type="checkbox" checked={data.noEmergencyAck} onChange={(event) => updateField("noEmergencyAck", event.target.checked)} />
            <span>I understand this is not emergency care.</span>
          </label>
          {errorFor("noEmergencyAck")}
        </div>
      ) : null}

      {formError ? <p className="form-error">{formError}</p> : null}

      <div className="quiz-card__actions">
        <button type="button" className="button button--ghost" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0}>
          Back
        </button>
        <button type="button" className="button button--primary" onClick={nextStep}>
          {step === steps.length - 1 ? "Submit beta request" : "Next step"}
        </button>
      </div>
    </div>
  );
}
