export type AdminRole = "doctor" | "medical_director" | "operations" | "support";

export type CaseStatus = "new" | "in_review" | "approved" | "declined" | "follow_up" | "urgent";

export type CasePriority = "routine" | "priority" | "urgent";

export type PrescriptionDecision = "pending" | "approved" | "declined" | "needs_follow_up";

export type FulfilmentStatus =
  | "awaiting_review"
  | "rx_ready"
  | "sent_to_pharmacy"
  | "order_created"
  | "shipped"
  | "delivered";

export type SupportTag = "refund" | "delay" | "side_effect" | "privacy_request" | "cancellation";

export type ConsentStatus = {
  teleconsult: boolean;
  privacy: boolean;
  prescriptionTransfer: boolean;
};

export type AuditEvent = {
  time: string;
  actor: string;
  role: AdminRole;
  action: string;
  detail: string;
  category: "triage" | "clinical" | "ops" | "support" | "privacy";
};

export type PatientCase = {
  id: string;
  status: CaseStatus;
  priority: CasePriority;
  assignedRole: AdminRole;
  assignedTo: string;
  submittedAt: string;
  reviewDueAt: string;
  patient: {
    name: string;
    age: number;
    sex: string;
    location: string;
    phone: string;
    email: string;
    adultConfirmed: boolean;
  };
  intake: {
    duration: string;
    hairLossPattern: string;
    familyHistory: string;
    recentTriggers: string[];
    scalpSymptoms: string[];
    priorTreatments: string[];
    currentMedicines: string[];
    allergies: string[];
    conditions: string[];
    redFlags: string[];
    photoCount: number;
    uploadNotes: string;
    consent: ConsentStatus;
  };
  clinical: {
    aiPrescreen: string;
    doctorDecision: string;
    summary: string;
    eligibility: string;
    contraindications: string[];
    followUpPlan: string;
  };
  prescription: {
    decision: PrescriptionDecision;
    doctor: string;
    registration: string;
    plan: string;
    dosage: string;
    duration: string;
    instructions: string;
  };
  fulfilment: {
    status: FulfilmentStatus;
    pharmacy: string;
    eta: string;
    notes: string;
  };
  support: {
    tags: SupportTag[];
    latestMessage: string;
    grievanceOpen: boolean;
    refundRisk: "low" | "medium" | "high";
  };
  auditLog: AuditEvent[];
};

export const statusMeta: Record<CaseStatus, { label: string; description: string }> = {
  new: {
    label: "New",
    description: "Fresh intake waiting for first pass review.",
  },
  in_review: {
    label: "In review",
    description: "Currently in a doctor or medical-director review queue.",
  },
  approved: {
    label: "Approved",
    description: "Prescription decision completed and ready for ops.",
  },
  declined: {
    label: "Declined",
    description: "Not suitable for remote prescription flow.",
  },
  follow_up: {
    label: "Follow-up",
    description: "Needs refill or ongoing follow-up action.",
  },
  urgent: {
    label: "Urgent",
    description: "Escalation or red-flag handling required.",
  },
};

export const roleMeta: Record<AdminRole, { label: string; shortLabel: string }> = {
  doctor: { label: "Doctor", shortLabel: "MD" },
  medical_director: { label: "Medical director", shortLabel: "Med Dir" },
  operations: { label: "Operations", shortLabel: "Ops" },
  support: { label: "Support", shortLabel: "CS" },
};

export const fulfilmentMeta: Record<FulfilmentStatus, string> = {
  awaiting_review: "Waiting on clinical decision",
  rx_ready: "Prescription is ready for pharmacy handoff",
  sent_to_pharmacy: "Prescription transferred to pharmacy",
  order_created: "Pharmacy order has been created",
  shipped: "Order shipped to patient",
  delivered: "Delivered and ready for refill tracking",
};

export const supportTagLabels: Record<SupportTag, string> = {
  refund: "Refund",
  delay: "Delay",
  side_effect: "Side effect",
  privacy_request: "Privacy request",
  cancellation: "Cancellation",
};

export const adminNavigation = [
  {
    href: "/admin",
    label: "Queue overview",
    description: "All active doctor, ops, and support cases",
  },
  {
    href: "/admin?status=in_review",
    label: "Doctor review",
    description: "Clinical work waiting on review",
  },
  {
    href: "/admin?status=follow_up",
    label: "Follow-ups",
    description: "Refills, renewals, and reminders",
  },
  {
    href: "/admin?status=urgent",
    label: "Urgent",
    description: "Red flags and escalations",
  },
];

export const caseStatusFilters = [
  "all",
  "new",
  "in_review",
  "approved",
  "declined",
  "follow_up",
  "urgent",
] as const;

export const roleFilters = ["all", "doctor", "medical_director", "operations", "support"] as const;

export const adminCases: PatientCase[] = [
  {
    id: "HL-1042",
    status: "new",
    priority: "routine",
    assignedRole: "doctor",
    assignedTo: "Dr. Ananya Rao",
    submittedAt: "Apr 17, 2026, 11:10 IST",
    reviewDueAt: "Apr 17, 2026, 15:00 IST",
    patient: {
      name: "Rohit S.",
      age: 29,
      sex: "Male",
      location: "Bengaluru, Karnataka",
      phone: "+91 98xxxxxx41",
      email: "rohit.s@example.com",
      adultConfirmed: true,
    },
    intake: {
      duration: "3 to 12 months",
      hairLossPattern: "Gradual thinning around crown and frontal hairline.",
      familyHistory: "Father and older brother report similar crown thinning.",
      recentTriggers: ["No major recent trigger"],
      scalpSymptoms: ["No scalp symptoms"],
      priorTreatments: ["No prior prescription treatment"],
      currentMedicines: ["Vitamin D supplement"],
      allergies: ["No known drug allergies reported"],
      conditions: ["Seasonal allergies"],
      redFlags: [],
      photoCount: 4,
      uploadNotes: "Good lighting, top and front angle covered.",
      consent: {
        teleconsult: true,
        privacy: true,
        prescriptionTransfer: false,
      },
    },
    clinical: {
      aiPrescreen: "Adult male, gradual hairline and crown thinning, complete core history, no red flags. Missing prescription-transfer consent.",
      doctorDecision: "Simple pattern hair loss: online prescription may be possible after doctor counselling and consent.",
      summary: "Likely straightforward androgenetic hair-loss intake with no immediate remote-care exclusions.",
      eligibility: "Suitable for standard first-pass doctor review.",
      contraindications: [],
      followUpPlan: "If approved, set 30-day follow-up reminder after fulfilment.",
    },
    prescription: {
      decision: "pending",
      doctor: "Dr. Ananya Rao",
      registration: "KA-MED-PLACEHOLDER-1042",
      plan: "Awaiting doctor review",
      dosage: "Pending",
      duration: "Pending",
      instructions: "Doctor review required before any treatment recommendation is finalized.",
    },
    fulfilment: {
      status: "awaiting_review",
      pharmacy: "Launch partner pending",
      eta: "No ETA yet",
      notes: "Cannot transmit to pharmacy until prescription-transfer consent is captured.",
    },
    support: {
      tags: [],
      latestMessage: "Patient completed intake and is waiting for first update.",
      grievanceOpen: false,
      refundRisk: "low",
    },
    auditLog: [
      {
        time: "Apr 17, 2026, 11:10 IST",
        actor: "System",
        role: "operations",
        action: "Intake created",
        detail: "Eligibility quiz, consent flags, and photo uploads were stored.",
        category: "triage",
      },
    ],
  },
  {
    id: "HL-1041",
    status: "in_review",
    priority: "priority",
    assignedRole: "doctor",
    assignedTo: "Dr. Ananya Rao",
    submittedAt: "Apr 17, 2026, 10:25 IST",
    reviewDueAt: "Apr 17, 2026, 13:30 IST",
    patient: {
      name: "Karan M.",
      age: 34,
      sex: "Male",
      location: "Mumbai, Maharashtra",
      phone: "+91 97xxxxxx82",
      email: "karan.m@example.com",
      adultConfirmed: true,
    },
    intake: {
      duration: "1 to 3 years",
      hairLossPattern: "Diffuse thinning with patient concern about scalp tenderness.",
      familyHistory: "Paternal family history of thinning.",
      recentTriggers: ["New medicine started recently"],
      scalpSymptoms: ["Itching", "Redness or scaling"],
      priorTreatments: ["Topical minoxidil from local purchase"],
      currentMedicines: ["Topical minoxidil from local purchase"],
      allergies: ["No known drug allergies reported"],
      conditions: ["Mild hypertension"],
      redFlags: ["Scalp pain, bleeding, or active infection"],
      photoCount: 3,
      uploadNotes: "Photos are usable but need one tighter crown shot.",
      consent: {
        teleconsult: true,
        privacy: true,
        prescriptionTransfer: true,
      },
    },
    clinical: {
      aiPrescreen: "Adult male, but diffuse thinning plus scalp tenderness and irritation should be clarified before approval.",
      doctorDecision: "Needs more information: request tighter scalp photo and consider video consult before treatment.",
      summary: "Requires doctor review because scalp tenderness may need a closer look before a standard remote plan.",
      eligibility: "Hold in review until scalp symptoms are clarified.",
      contraindications: ["Scalp pain requires extra clinical review before treatment approval."],
      followUpPlan: "Send a clarification message and request one extra scalp image before final decision.",
    },
    prescription: {
      decision: "pending",
      doctor: "Dr. Ananya Rao",
      registration: "KA-MED-PLACEHOLDER-1041",
      plan: "Pending clarification",
      dosage: "Pending",
      duration: "Pending",
      instructions: "Do not approve until red-flag note is resolved.",
    },
    fulfilment: {
      status: "awaiting_review",
      pharmacy: "Launch partner pending",
      eta: "Blocked on doctor review",
      notes: "Ops should not move the case until clinical clearance is complete.",
    },
    support: {
      tags: ["side_effect"],
      latestMessage: "Patient reported mild scalp irritation from a previous self-started product.",
      grievanceOpen: false,
      refundRisk: "medium",
    },
    auditLog: [
      {
        time: "Apr 17, 2026, 10:25 IST",
        actor: "System",
        role: "operations",
        action: "Intake created",
        detail: "Case routed into doctor review with red-flag marker.",
        category: "triage",
      },
      {
        time: "Apr 17, 2026, 10:40 IST",
        actor: "Ops queue",
        role: "operations",
        action: "Escalated to doctor",
        detail: "Scalp pain flag and previous product irritation noted for review.",
        category: "triage",
      },
    ],
  },
  {
    id: "HL-1038",
    status: "approved",
    priority: "routine",
    assignedRole: "operations",
    assignedTo: "Ops queue",
    submittedAt: "Apr 16, 2026, 18:10 IST",
    reviewDueAt: "Apr 17, 2026, 11:00 IST",
    patient: {
      name: "Aditya P.",
      age: 31,
      sex: "Male",
      location: "Pune, Maharashtra",
      phone: "+91 96xxxxxx18",
      email: "aditya.p@example.com",
      adultConfirmed: true,
    },
    intake: {
      duration: "1 to 3 years",
      hairLossPattern: "Receding frontal line and crown thinning, otherwise stable.",
      familyHistory: "Strong family history on father's side.",
      recentTriggers: ["No major recent trigger"],
      scalpSymptoms: ["No scalp symptoms"],
      priorTreatments: ["No prior prescription treatment"],
      currentMedicines: [],
      allergies: ["No known drug allergies reported"],
      conditions: [],
      redFlags: [],
      photoCount: 5,
      uploadNotes: "Complete set of photos received.",
      consent: {
        teleconsult: true,
        privacy: true,
        prescriptionTransfer: true,
      },
    },
    clinical: {
      aiPrescreen: "Adult male, gradual hairline and crown pattern, complete 5-photo set, no red flags or listed contraindications.",
      doctorDecision: "Simple pattern hair loss: online prescription and pharmacy handoff approved after counselling.",
      summary: "Doctor review completed with no exclusion criteria for the planned remote workflow.",
      eligibility: "Approved for treatment initiation and pharmacy handoff.",
      contraindications: [],
      followUpPlan: "Set refill reminder for 28 days after delivery confirmation.",
    },
    prescription: {
      decision: "approved",
      doctor: "Dr. Ananya Rao",
      registration: "KA-MED-PLACEHOLDER-1038",
      plan: "Topical-first starter plan",
      dosage: "As per doctor-reviewed starter regimen",
      duration: "30 days",
      instructions: "Start only after reading the doctor instructions in the patient account.",
    },
    fulfilment: {
      status: "order_created",
      pharmacy: "Partner Pharmacy A",
      eta: "Dispatch expected by Apr 18",
      notes: "Prescription transferred with patient consent. Ops should monitor dispatch SLA.",
    },
    support: {
      tags: ["delay"],
      latestMessage: "Patient asked whether shipment can be sent to office address instead.",
      grievanceOpen: false,
      refundRisk: "low",
    },
    auditLog: [
      {
        time: "Apr 16, 2026, 18:10 IST",
        actor: "System",
        role: "operations",
        action: "Intake created",
        detail: "New patient consult created.",
        category: "triage",
      },
      {
        time: "Apr 17, 2026, 09:20 IST",
        actor: "Dr. Ananya Rao",
        role: "doctor",
        action: "Approved treatment plan",
        detail: "Doctor completed review and approved starter plan.",
        category: "clinical",
      },
      {
        time: "Apr 17, 2026, 10:05 IST",
        actor: "Ops queue",
        role: "operations",
        action: "Sent to pharmacy",
        detail: "Prescription and patient delivery details handed to Partner Pharmacy A.",
        category: "ops",
      },
    ],
  },
  {
    id: "HL-1034",
    status: "urgent",
    priority: "urgent",
    assignedRole: "medical_director",
    assignedTo: "Dr. Priya Mehta",
    submittedAt: "Apr 16, 2026, 14:50 IST",
    reviewDueAt: "Apr 17, 2026, 12:15 IST",
    patient: {
      name: "Rahul T.",
      age: 38,
      sex: "Male",
      location: "Delhi NCR",
      phone: "+91 95xxxxxx64",
      email: "rahul.t@example.com",
      adultConfirmed: true,
    },
    intake: {
      duration: "Under 3 months",
      hairLossPattern: "Rapid patchy loss with concern about inflamed scalp areas.",
      familyHistory: "No clear family history reported.",
      recentTriggers: ["Major stress in the last 3 months"],
      scalpSymptoms: ["Pain, pus, bleeding, or sores", "Round patches"],
      priorTreatments: ["Recent steroid cream from in-person doctor"],
      currentMedicines: ["Recent steroid cream from in-person doctor"],
      allergies: ["Unknown"],
      conditions: ["Psoriasis history"],
      redFlags: [
        "Sudden patchy hair loss",
        "Scalp pain, bleeding, or active infection",
      ],
      photoCount: 2,
      uploadNotes: "Photos show scalp irritation; image quality is limited.",
      consent: {
        teleconsult: true,
        privacy: true,
        prescriptionTransfer: false,
      },
    },
    clinical: {
      aiPrescreen: "Patchy rapid loss plus inflamed scalp and limited photos. This is outside the simple remote starter pathway.",
      doctorDecision: "Refer offline: dermatologist or in-person evaluation preferred before any hair-loss medicine.",
      summary: "Not a standard remote starter case. Rapid change plus inflamed scalp requires escalation.",
      eligibility: "Likely unsuitable for first-line remote prescription workflow.",
      contraindications: [
        "Rapid patchy loss requires closer evaluation.",
        "Inflammation suggests possible in-person assessment.",
      ],
      followUpPlan: "Medical director to confirm decline and direct toward in-person care.",
    },
    prescription: {
      decision: "needs_follow_up",
      doctor: "Dr. Priya Mehta",
      registration: "MH-MED-PLACEHOLDER-1034",
      plan: "Escalation review",
      dosage: "Not applicable",
      duration: "Not applicable",
      instructions: "Do not prescribe until escalation decision is complete.",
    },
    fulfilment: {
      status: "awaiting_review",
      pharmacy: "Not assigned",
      eta: "On hold",
      notes: "No pharmacy handoff should occur for escalated case.",
    },
    support: {
      tags: ["refund", "privacy_request"],
      latestMessage: "Patient asked how uploaded images will be handled if the case is declined.",
      grievanceOpen: true,
      refundRisk: "high",
    },
    auditLog: [
      {
        time: "Apr 16, 2026, 14:50 IST",
        actor: "System",
        role: "operations",
        action: "Intake created",
        detail: "Case auto-flagged for urgent review because of rapid patchy loss plus scalp inflammation.",
        category: "triage",
      },
      {
        time: "Apr 16, 2026, 15:05 IST",
        actor: "Ops queue",
        role: "operations",
        action: "Escalated to medical director",
        detail: "Moved out of normal queue because of combined red flags.",
        category: "triage",
      },
      {
        time: "Apr 17, 2026, 09:15 IST",
        actor: "Support queue",
        role: "support",
        action: "Opened privacy request",
        detail: "Patient requested clarity on image handling if remote treatment is not suitable.",
        category: "privacy",
      },
    ],
  },
  {
    id: "HL-1029",
    status: "follow_up",
    priority: "routine",
    assignedRole: "support",
    assignedTo: "Support queue",
    submittedAt: "Apr 10, 2026, 09:15 IST",
    reviewDueAt: "Apr 18, 2026, 10:00 IST",
    patient: {
      name: "Neel V.",
      age: 27,
      sex: "Male",
      location: "Ahmedabad, Gujarat",
      phone: "+91 94xxxxxx33",
      email: "neel.v@example.com",
      adultConfirmed: true,
    },
    intake: {
      duration: "3 to 12 months",
      hairLossPattern: "Stable thinning with month-one treatment completed.",
      familyHistory: "Family history already captured at baseline.",
      recentTriggers: ["No major recent trigger"],
      scalpSymptoms: ["No scalp symptoms"],
      priorTreatments: ["Doctor-reviewed starter regimen"],
      currentMedicines: ["Doctor-reviewed starter regimen"],
      allergies: ["No known drug allergies reported"],
      conditions: [],
      redFlags: [],
      photoCount: 4,
      uploadNotes: "Baseline photos and month-one progress photos saved.",
      consent: {
        teleconsult: true,
        privacy: true,
        prescriptionTransfer: true,
      },
    },
    clinical: {
      aiPrescreen: "Follow-up case with baseline and progress photos available. No new red flags recorded.",
      doctorDecision: "Continue follow-up: verify side effects and adherence before refill renewal.",
      summary: "Existing patient entering refill and follow-up stage.",
      eligibility: "Continue through refill review if no new contraindications appear.",
      contraindications: [],
      followUpPlan: "Collect refill confirmation and queue for doctor follow-up review.",
    },
    prescription: {
      decision: "approved",
      doctor: "Dr. Ananya Rao",
      registration: "KA-MED-PLACEHOLDER-1029",
      plan: "Month-two refill review",
      dosage: "Continue existing doctor-reviewed regimen",
      duration: "Next 30 days",
      instructions: "Support should verify adherence and side-effect status before renewal handoff.",
    },
    fulfilment: {
      status: "delivered",
      pharmacy: "Partner Pharmacy A",
      eta: "Delivered Apr 13",
      notes: "Ready for refill reminder and follow-up coordination.",
    },
    support: {
      tags: [],
      latestMessage: "Patient asked whether refill reminder can be moved up by two days.",
      grievanceOpen: false,
      refundRisk: "low",
    },
    auditLog: [
      {
        time: "Apr 13, 2026, 16:40 IST",
        actor: "Ops queue",
        role: "operations",
        action: "Marked delivered",
        detail: "Pharmacy delivery confirmed by patient.",
        category: "ops",
      },
      {
        time: "Apr 16, 2026, 18:00 IST",
        actor: "System",
        role: "support",
        action: "Refill reminder scheduled",
        detail: "Reminder card should surface in patient account and support queue.",
        category: "support",
      },
    ],
  },
];

export function getCaseById(caseId: string) {
  return adminCases.find((item) => item.id === caseId);
}

export function getCaseStatuses() {
  return caseStatusFilters;
}

export function getRoleFilters() {
  return roleFilters;
}

export function isCaseStatus(value: string): value is CaseStatus {
  return value in statusMeta;
}

export function isAdminRole(value: string): value is AdminRole {
  return value in roleMeta;
}

export function filterCases(params: { status?: string; team?: string }) {
  const { status, team } = params;

  return adminCases.filter((item) => {
    const statusMatch = !status || status === "all" ? true : item.status === status;
    const teamMatch = !team || team === "all" ? true : item.assignedRole === team;

    return statusMatch && teamMatch;
  });
}

export function getOverviewMetrics(cases: PatientCase[]) {
  const urgentCount = cases.filter((item) => item.priority === "urgent" || item.status === "urgent").length;
  const followUpCount = cases.filter((item) => item.status === "follow_up").length;
  const supportLoad = cases.filter((item) => item.support.tags.length > 0 || item.support.grievanceOpen).length;
  const approvedCount = cases.filter((item) => item.prescription.decision === "approved").length;

  return [
    {
      label: "Active queue",
      value: `${cases.length}`,
      helper: "Cases visible across doctor, ops, and support queues",
    },
    {
      label: "Urgent escalations",
      value: `${urgentCount}`,
      helper: "Requires same-day review or escalation handling",
    },
    {
      label: "Follow-ups due",
      value: `${followUpCount}`,
      helper: "Refill and ongoing care reminders needing action",
    },
    {
      label: "Support watchlist",
      value: `${supportLoad}`,
      helper: `${approvedCount} cases already have an approved treatment decision`,
    },
  ];
}

export function getQueueInsights() {
  return [
    "MVP scope is adult male pattern hair loss. Female hair loss, minors, patchy loss, and severe scalp symptoms should route out.",
    "AI can summarize and flag missing photos or contraindications, but every clinical action remains attributable to a real doctor.",
    "Prescription-transfer consent should be confirmed before ops sends anything to a pharmacy partner.",
    "Follow-up should track 14-day usage, 30-day side effects, and 90-day progress photos before refill planning.",
  ];
}
