export const opsMetrics = [
  { label: "New intakes", value: "18", detail: "6 need photo quality checks" },
  { label: "Doctor queue", value: "9", detail: "3 priority reviews today" },
  { label: "Orders pending", value: "7", detail: "Pharmacy handoff or lab booking" },
  { label: "SLA risk", value: "2", detail: "Older than 20 hours" },
];

export const opsCases = [
  {
    id: "NH-HC-1048",
    patient: "Male, 29",
    vertical: "Hair Care",
    stage: "doctor",
    status: "awaiting_review",
    priority: "Priority",
    summary: "Gradual crown thinning, complete photo set, no red flags, paid consult received.",
    owner: "Dr review queue",
    updated: "18 min ago",
  },
  {
    id: "NH-HT-2031",
    patient: "Female, 34",
    vertical: "Health Tracking",
    stage: "operations",
    status: "order_created",
    priority: "Routine",
    summary: "Vitamin & Fatigue package selected. Home sample collection needs slot confirmation.",
    owner: "Ops coordinator",
    updated: "42 min ago",
  },
  {
    id: "NH-HC-1045",
    patient: "Male, 41",
    vertical: "Hair Care",
    stage: "support",
    status: "needs_follow_up",
    priority: "SLA risk",
    summary: "Photo set missing crown view. WhatsApp reminder sent, no response yet.",
    owner: "Care support",
    updated: "2 hr ago",
  },
  {
    id: "NH-HT-2027",
    patient: "Male, 38",
    vertical: "Health Tracking",
    stage: "doctor",
    status: "in_review",
    priority: "Priority",
    summary: "Uploaded reports show low Vitamin D and high HbA1c. Doctor guidance in progress.",
    owner: "Dr review queue",
    updated: "3 hr ago",
  },
];

export const opsWorkflow = [
  {
    title: "Intake",
    items: ["Quiz completed", "Photos or reports attached", "Consent captured", "Payment status checked"],
  },
  {
    title: "Clinical review",
    items: ["AI summary generated", "Contraindications flagged", "Doctor decision recorded", "Referral or labs requested"],
  },
  {
    title: "Fulfilment",
    items: ["Prescription or lab order verified", "Pharmacy/lab partner assigned", "Delivery or collection tracked"],
  },
  {
    title: "Follow-up",
    items: ["14-day check-in", "30-day side-effect check", "90-day progress or retest reminder"],
  },
];

export const backendDataSurfaces = [
  "users and consent records",
  "questionnaire responses",
  "photo/report uploads",
  "AI summaries and flags",
  "doctor reviews and decisions",
  "prescriptions, lab orders, and pharmacy orders",
  "support notes, audit logs, and follow-up tasks",
];

export const doctorMetrics = [
  { label: "Ready to review", value: "9", detail: "Complete intake and media" },
  { label: "Needs counselling", value: "3", detail: "Finasteride or mental-health flags" },
  { label: "Needs labs", value: "4", detail: "Diffuse shedding or health markers" },
  { label: "Referral suggested", value: "2", detail: "Patchy, painful, or unclear cases" },
];

export const doctorReviewCase = {
  id: "NH-HC-1048",
  patient: "Male, 29",
  vertical: "Hair Care",
  status: "awaiting_review",
  reason: "Adult male with gradual crown thinning and family history.",
  aiSummary:
    "The intake suggests simple male-pattern hair loss may be possible. Photos are complete. No pregnancy relevance, no current medicines, no listed drug allergies, and no severe scalp symptoms were selected.",
  transcript: [
    "Hair loss started gradually over 18 months, mainly at crown and hairline.",
    "Family history present on father side.",
    "No sudden patchy loss, scalp pain, bleeding, pus, or fever reported.",
    "Prior treatment: no prior hair-loss treatment selected.",
    "Counselling: patient accepted doctor-review boundary and understands AI does not diagnose or prescribe.",
  ],
  flags: [
    { label: "Photo set complete", tone: "doctor" },
    { label: "No red flags selected", tone: "doctor" },
    { label: "Finasteride counselling required", tone: "priority" },
  ],
  photos: ["Front hairline", "Left temple", "Right temple", "Crown/top", "Scalp close-up"],
  decisionOptions: ["Approve treatment plan", "Request labs", "Ask for video consult", "Refer to dermatologist", "Decline online care"],
};

export const doctorQueue = [
  { id: "NH-HC-1048", label: "Hair Care", status: "awaiting_review", detail: "Complete photo set, paid consult" },
  { id: "NH-HT-2027", label: "Health Tracking", status: "in_review", detail: "Report guidance needed" },
  { id: "NH-HC-1042", label: "Hair Care", status: "priority", detail: "Mental-health counselling flag" },
  { id: "NH-HC-1039", label: "Hair Care", status: "needs_follow_up", detail: "Possible scalp dermatitis" },
];
