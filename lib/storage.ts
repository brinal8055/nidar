export const storageKeys = {
  quiz: "nidar.quiz.v1",
  order: "nidar.order.v1",
} as const;

export const safetyNoneValues = {
  priorTreatments: "No prior hair-loss treatment",
  currentMedicines: "No current medicines",
  allergies: "No known drug or ingredient allergies",
  medicalConditions: "No known medical conditions",
} as const;

export const redFlagNoneValue = "None of these red flags";

export type QuizData = {
  age: string;
  sex: string;
  location: string;
  duration: string;
  hairLossPattern: string;
  familyHistory: string;
  recentTriggers: string[];
  scalpSymptoms: string[];
  priorTreatments: string[];
  priorTreatmentsOther: string;
  currentMedicines: string[];
  currentMedicinesOther: string;
  sexualMentalHealthHistory: string;
  pregnancyStatus: string;
  allergies: string[];
  allergiesOther: string;
  medicalConditions: string[];
  medicalConditionsOther: string;
  photoNames: string[];
  redFlags: string[];
  eligibilityOutcome?: "eligible" | "needs_doctor_triage" | "not_supported";
  eligibilityReason?: string;
  consentAccepted: boolean;
  adultConfirmed: boolean;
  submittedAt?: string;
};

export const emptyQuizData: QuizData = {
  age: "",
  sex: "",
  location: "",
  duration: "",
  hairLossPattern: "",
  familyHistory: "",
  recentTriggers: [],
  scalpSymptoms: [],
  priorTreatments: [],
  priorTreatmentsOther: "",
  currentMedicines: [],
  currentMedicinesOther: "",
  sexualMentalHealthHistory: "",
  pregnancyStatus: "",
  allergies: [],
  allergiesOther: "",
  medicalConditions: [],
  medicalConditionsOther: "",
  photoNames: [],
  redFlags: [],
  consentAccepted: false,
  adultConfirmed: false,
};

const noneWords = new Set(["none", "no", "n/a", "na", "nil", "not applicable"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function readBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false;
}

function readStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function readLegacyChoiceArray(value: unknown, noneLabel: string) {
  if (Array.isArray(value)) {
    return readStringArray(value);
  }

  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  return noneWords.has(value.trim().toLowerCase()) ? [noneLabel] : ["Other"];
}

function readLegacyOtherText(value: unknown) {
  if (typeof value !== "string" || !value.trim() || noneWords.has(value.trim().toLowerCase())) {
    return "";
  }

  return value.trim();
}

export function normalizeQuizData(value: unknown): QuizData {
  const input = isRecord(value) ? value : {};

  return {
    ...emptyQuizData,
    age: readString(input.age),
    sex: readString(input.sex),
    location: readString(input.location),
    duration: readString(input.duration),
    hairLossPattern: readString(input.hairLossPattern),
    familyHistory: readString(input.familyHistory),
    recentTriggers: readStringArray(input.recentTriggers),
    scalpSymptoms: readStringArray(input.scalpSymptoms),
    priorTreatments: readLegacyChoiceArray(input.priorTreatments, safetyNoneValues.priorTreatments),
    priorTreatmentsOther: readString(input.priorTreatmentsOther) || readLegacyOtherText(input.priorTreatments),
    currentMedicines: readLegacyChoiceArray(input.currentMedicines, safetyNoneValues.currentMedicines),
    currentMedicinesOther: readString(input.currentMedicinesOther) || readLegacyOtherText(input.currentMedicines),
    sexualMentalHealthHistory: readString(input.sexualMentalHealthHistory),
    pregnancyStatus: readString(input.pregnancyStatus),
    allergies: readLegacyChoiceArray(input.allergies, safetyNoneValues.allergies),
    allergiesOther: readString(input.allergiesOther) || readLegacyOtherText(input.allergies),
    medicalConditions: readLegacyChoiceArray(input.medicalConditions, safetyNoneValues.medicalConditions),
    medicalConditionsOther: readString(input.medicalConditionsOther) || readLegacyOtherText(input.medicalConditions),
    photoNames: readStringArray(input.photoNames),
    redFlags: readStringArray(input.redFlags),
    eligibilityOutcome:
      input.eligibilityOutcome === "eligible" ||
      input.eligibilityOutcome === "needs_doctor_triage" ||
      input.eligibilityOutcome === "not_supported"
        ? input.eligibilityOutcome
        : undefined,
    eligibilityReason: readString(input.eligibilityReason),
    consentAccepted: readBoolean(input.consentAccepted),
    adultConfirmed: readBoolean(input.adultConfirmed),
    submittedAt: readString(input.submittedAt),
  };
}

export type OrderStatus = {
  label: string;
  detail: string;
  state: "complete" | "current" | "upcoming";
};

export type OrderRecord = {
  fullName: string;
  phone: string;
  email: string;
  coupon: string;
  source: string;
  consultFee: number;
  createdAt: string;
  reviewEta: string;
  quizSummary: QuizData;
  messages: string[];
  statuses: OrderStatus[];
};
