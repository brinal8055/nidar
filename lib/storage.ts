export const storageKeys = {
  quiz: "nidar.quiz.v1",
  order: "nidar.order.v1",
} as const;

export type QuizData = {
  age: string;
  sex: string;
  location: string;
  duration: string;
  hairLossPattern: string;
  familyHistory: string;
  recentTriggers: string[];
  scalpSymptoms: string[];
  priorTreatments: string;
  currentMedicines: string;
  sexualMentalHealthHistory: string;
  pregnancyStatus: string;
  allergies: string;
  medicalConditions: string;
  photoNames: string[];
  redFlags: string[];
  eligibilityOutcome?: "eligible" | "needs_doctor_triage" | "not_supported";
  eligibilityReason?: string;
  consentAccepted: boolean;
  adultConfirmed: boolean;
  submittedAt?: string;
};

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
