export const siteConfig = {
  name: "Nidar Health",
  shortName: "Nidar",
  title: "Doctor-reviewed treatment plans for adult male hair loss, from home.",
  description:
    "A web-first telehealth MVP focused on adult male pattern hair-loss screening, photo review, doctor consult, and follow-up.",
  consultFee: 499,
  supportEmail: "support@nidar.health",
  privacyEmail: "privacy@nidar.health",
  supportPhone: "+91 90000 00000",
  turnaround: "within 24 hours",
  grievanceHours: "Mon-Sat, 9:00 AM to 7:00 PM IST",
} as const;

export const navigation = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/account", label: "Account" },
];

export const trustPoints = [
  "Doctor-reviewed care for adults 18+",
  "Discreet shipping and online follow-ups",
  "Clear consent, privacy, and status updates",
];

export const homeStats = [
  { value: "18+", label: "Adults only for MVP launch" },
  { value: "24h", label: "Target doctor review turnaround" },
  { value: "1", label: "Single launch wedge to keep care reliable" },
];

export const heroPrograms = [
  { label: "Hair Loss", status: "Live focus" },
  { label: "Men's Health", status: "Next phase" },
  { label: "Dermatology", status: "Later" },
  { label: "Metabolic Care", status: "Later" },
];

export const includedFeatures = [
  "Doctor-reviewed care decisions",
  "Structured intake with photo upload",
  "Clear consult pricing before treatment",
  "Discreet delivery workflow if appropriate",
  "Status tracking and follow-up visibility",
];

export const careExperienceCards = [
  {
    title: "A stronger first impression",
    description:
      "The site should feel premium and calm from the first screen, not like a crowded health catalog.",
  },
  {
    title: "A portal that feels real",
    description:
      "Users should immediately understand that this is a guided care workflow with progress tracking, not a one-page landing ad.",
  },
  {
    title: "Less friction, more clarity",
    description:
      "Larger type, stronger contrast, and simpler content hierarchy make the flow easier to scan on mobile and desktop.",
  },
];

export const supportHighlights = [
  {
    title: "Everything in one place",
    body: "Quiz status, doctor review, support messages, and refill reminders live in one account flow.",
  },
  {
    title: "Built for mobile attention spans",
    body: "Tap targets, cards, and visual hierarchy are designed to stay readable on Indian mobile traffic.",
  },
  {
    title: "Service-led, not hype-led",
    body: "The UI speaks in clear service language and avoids making unsupported medical promises.",
  },
];

export const heroFilmstrip = [
  {
    title: "Private intake",
    caption: "Adult male pattern hair-loss screening",
    tone: "sage",
    icon: "assignment",
    stat: "5 min",
  },
  {
    title: "Doctor counselling",
    caption: "Clear counselling before treatment",
    tone: "gold",
    icon: "stethoscope",
    stat: "MD",
  },
  {
    title: "Photo review",
    caption: "Hairline, temples, crown, and scalp close-ups",
    tone: "tan",
    icon: "photo_camera",
    stat: "4+",
  },
  {
    title: "Progress follow-up",
    caption: "30, 60, and 90 day check-ins",
    tone: "blue",
    icon: "event_repeat",
    stat: "90d",
  },
];

export const homepageTabs = [
  {
    id: "male-pattern",
    label: "Male Pattern",
    status: "MVP focus",
    icon: "dermatology",
  },
  {
    id: "photo-review",
    label: "Photo Review",
    status: "Required",
    icon: "photo_camera",
  },
  {
    id: "doctor-review",
    label: "Doctor Decision",
    status: "No auto-prescribe",
    icon: "stethoscope",
  },
  {
    id: "follow-up",
    label: "Follow-up",
    status: "8-12 weeks",
    icon: "event_repeat",
  },
];

export const homepageShowcases = [
  {
    id: "male-pattern",
    verticalLabel: "Adult male pattern hair-loss MVP",
    title: "Male hair loss",
    emphasis: "reviewed from home",
    body:
      "The launch flow is intentionally narrow: adult men with gradual hairline or crown thinning can start with screening, photos, and a paid doctor review.",
    bullets: [
      "Adults 18+ only for the launch",
      "Built for gradual hairline or crown thinning",
      "No guaranteed regrowth or cure claims",
    ],
    ctaLabel: "Start assessment",
    ctaHref: "/quiz",
    tone: "lavender",
    visualIcon: "male",
    visualTitle: "MVP screen",
    visualBody: "Adult male, gradual hairline or crown thinning, no severe scalp symptoms.",
    supportIcon: "rule",
    supportTitle: "Route",
    supportBody: "Eligible, triage, or refer",
  },
  {
    id: "photo-review",
    verticalLabel: "Standard photo set before review",
    title: "Photos before",
    emphasis: "prescribing",
    body:
      "The app asks for front hairline, left temple, right temple, crown, and a close-up if there is dandruff, redness, patches, or irritation.",
    bullets: [
      "Photo review is required before checkout",
      "Missing or poor photos can be flagged before doctor review",
      "Patchy or inflamed cases are routed away from simple treatment",
    ],
    ctaLabel: "See how it works",
    ctaHref: "/how-it-works",
    tone: "orange",
    visualIcon: "photo_camera",
    visualTitle: "4 standard photos",
    visualBody: "Front, left temple, right temple, crown. Add a close-up for flakes or irritation.",
    supportIcon: "fact_check",
    supportTitle: "Quality check",
    supportBody: "Missing photos flagged",
  },
  {
    id: "doctor-review",
    verticalLabel: "Doctor decision required",
    title: "AI prepares",
    emphasis: "doctors decide",
    body:
      "AI can summarize answers, check missing photos, and flag contraindications. It does not diagnose, counsel independently, or prescribe.",
    bullets: [
      "Doctor reviews history, medicines, photos, and flags",
      "Finasteride counselling is handled before approval",
      "Doctor may prescribe, request labs, or refer offline",
    ],
    ctaLabel: "View admin workflow",
    ctaHref: "/admin",
    tone: "tan",
    visualIcon: "clinical_notes",
    visualTitle: "Doctor workspace",
    visualBody: "AI summary, contraindication flags, history, images, and final doctor decision.",
    supportIcon: "verified",
    supportTitle: "Decision",
    supportBody: "Prescribe, labs, video, refer",
  },
  {
    id: "follow-up",
    verticalLabel: "Treatment is slow and monitored",
    title: "Follow-up",
    emphasis: "built in",
    body:
      "Patients should understand that visible improvement usually takes months, initial shedding may happen, and consistency plus follow-up matters.",
    bullets: [
      "14-day adherence and usage check-in",
      "30-day side-effect and counselling check",
      "90-day photo progress review and refill planning",
    ],
    ctaLabel: "Preview account flow",
    ctaHref: "/account",
    tone: "blue",
    visualIcon: "timeline",
    visualTitle: "Follow-up ladder",
    visualBody: "Usage at 14 days, side effects at 30 days, progress photos at 90 days.",
    supportIcon: "inventory_2",
    supportTitle: "Refill",
    supportBody: "Only after review",
  },
];

export const ecosystemFeatures = [
  {
    icon: "video_camera_front",
    title: "Everything, all in one place",
    body: "Eligibility, photo uploads, doctor review, fulfilment updates, and refill reminders sit inside the same patient journey.",
  },
  {
    icon: "science",
    title: "Structured clinical intake",
    body: "Pattern, timeline, triggers, scalp symptoms, medicines, and contraindication flags are captured before payment.",
  },
  {
    icon: "local_pharmacy",
    title: "Prescription and fulfilment visibility",
    body: "The doctor can prescribe, request labs, ask for video review, decline, or refer before any pharmacy handoff.",
  },
];

export const trustBarItems = [
  "Doctor Review",
  "Private Intake",
  "Care Plan",
  "Tracked Delivery",
  "Follow-up Ready",
];

export const careSteps = [
  {
    eyebrow: "Step 1",
    title: "Check eligibility",
    description:
      "A mobile-first intake captures symptoms, treatment history, medicines, allergies, and scalp photos.",
  },
  {
    eyebrow: "Step 2",
    title: "Doctor review",
    description:
      "A licensed doctor reviews the case, confirms suitability, and decides whether a prescription is appropriate.",
  },
  {
    eyebrow: "Step 3",
    title: "Treatment and follow-up",
    description:
      "If approved, treatment is arranged through the pharmacy workflow and the patient gets refill reminders.",
  },
];

export const valueCards = [
  {
    title: "Private by default",
    description:
      "A discreet, premium-but-accessible flow designed for adults who want care from home without unnecessary friction.",
  },
  {
    title: "Built for compliance",
    description:
      "The UI keeps consent, doctor review, status updates, and grievance handling visible instead of hidden in the fine print.",
  },
  {
    title: "Focused launch scope",
    description:
      "Hair loss first keeps the workflow narrow enough to launch, measure, and harden before expanding to new indications.",
  },
];

export const pricingCards = [
  {
    name: "Initial consult",
    price: "Rs 499",
    note: "Paid upfront",
    details: [
      "Eligibility review and structured intake",
      "Doctor assessment before any prescription",
      "Expected response window within 24 hours",
    ],
  },
  {
    name: "Treatment plan",
    price: "After review",
    note: "Case dependent",
    details: [
      "Medication is only offered if clinically appropriate",
      "Pharmacy and delivery charges vary by plan",
      "No guaranteed outcomes or exaggerated claims",
    ],
  },
  {
    name: "Follow-up and refill",
    price: "From Rs 999",
    note: "When applicable",
    details: [
      "Monthly follow-up and refill reminders",
      "Status tracking through the account area",
      "Designed to evolve into automated renewals later",
    ],
  },
];

export const faqs = [
  {
    question: "Is a doctor involved before treatment is sent?",
    answer:
      "Yes. Every prescription decision must be reviewed and signed off by a licensed doctor. The product does not auto-diagnose or auto-prescribe.",
  },
  {
    question: "Is this suitable for emergencies?",
    answer:
      "No. The service is not for emergencies. Sudden severe symptoms, breathing problems, or acute distress should be taken to emergency care immediately.",
  },
  {
    question: "Who can use the launch version?",
    answer:
      "The MVP is designed for adult men in India with gradual hairline or crown thinning that may fit a male-pattern hair-loss review.",
  },
  {
    question: "Will I definitely receive medication?",
    answer:
      "No. Medication is only considered after doctor review and may be declined if the case is unsuitable or needs in-person care.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "The intake asks about age, sex, location, pattern, duration, family history, recent illness or stress, scalp symptoms, medicines, allergies, counselling flags, and standard photos.",
  },
  {
    question: "What cases are not handled online in this MVP?",
    answer:
      "Children, female hair loss, sudden patchy bald spots, painful or infected scalp symptoms, scarring, pus, severe systemic symptoms, PRP, transplant care, and unclear cases should be routed to in-person or specialist review.",
  },
  {
    question: "Can the experience support Hinglish later?",
    answer:
      "Yes. The information architecture is built English-first for launch with room to add Hinglish copy once the live funnel is stable.",
  },
];

export const howItWorksHighlights = [
  "One public funnel: landing page to eligibility quiz to paid consult checkout.",
  "One care workflow: intake, doctor review, prescription decision, and pharmacy handoff.",
  "One refill loop: 14-day, 30-day, and 90-day check-ins instead of a cluttered multi-condition catalog.",
  "One message: doctor-reviewed treatment plans for adult male hair loss, from home.",
];

export const doctorProfilePlaceholder = {
  name: "Doctor profile pending final credential review",
  qualification: "Qualification placeholder",
  registration: "Registration number placeholder",
  note: "Replace with a real doctor profile before launch. Do not use fake credentials or stock doctor claims.",
};

type LegalSection = {
  heading: string;
  body: string[];
};

type LegalPage = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export const legalPages: Record<string, LegalPage> = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "This preview policy explains the intended data practices for the MVP and should be finalized with legal counsel before launch.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "We collect the information needed to assess eligibility and coordinate care, including contact details, quiz responses, uploaded photos, consent records, and account activity.",
          "We do not position the platform as anonymous medical care. Identity, consent, and treatment history are part of the workflow.",
        ],
      },
      {
        heading: "Why we use it",
        body: [
          "Information is used to review eligibility, support doctor assessment, coordinate fulfilment, provide support, and maintain required records.",
          "Analytics may be used to understand funnel performance and service quality, but not to let AI prescribe or counsel patients autonomously.",
        ],
      },
      {
        heading: "Your controls",
        body: [
          "Users should be able to request access, correction, withdrawal of consent where applicable, grievance support, and privacy help through the published support channels.",
          "Production launch should include deletion and retention policies, breach handling, and vendor review.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro:
      "These draft terms describe the expected operating model for the launch experience and should be approved before public use.",
    sections: [
      {
        heading: "Scope of service",
        body: [
          "The MVP provides a digital intake, doctor review workflow, status communication, and pharmacy coordination where appropriate.",
          "The platform is not an emergency service and does not guarantee that treatment will be prescribed or shipped.",
        ],
      },
      {
        heading: "User responsibilities",
        body: [
          "Users must provide accurate information, confirm they are 18+, and avoid using the service for emergencies.",
          "Prescription and fulfilment timelines depend on doctor review, patient consent, and partner operations.",
        ],
      },
      {
        heading: "Operational limits",
        body: [
          "The MVP content is informational and service-oriented. It should not make unsupported clinical claims or promise outcomes.",
          "Service availability, pricing, and geography may change during pilot operation.",
        ],
      },
    ],
  },
  consent: {
    title: "Consent Notice",
    intro:
      "Consent should be captured clearly and separately from general terms, using plain language that explains how the care workflow operates.",
    sections: [
      {
        heading: "Teleconsult consent",
        body: [
          "By continuing, the user confirms they understand a doctor review is required before any prescription decision is made.",
          "The user also confirms the service is not intended for emergencies and that follow-up communication may occur through digital channels.",
        ],
      },
      {
        heading: "Prescription transmission consent",
        body: [
          "If a prescription is approved and sent directly to a pharmacy partner, the patient must explicitly consent to that transmission.",
          "That consent should be logged in the case record before fulfilment begins.",
        ],
      },
      {
        heading: "AI boundary",
        body: [
          "Automation may help structure information, route support, and draft summaries, but it does not replace doctor judgement.",
          "The platform should not frame AI as diagnosing, counselling, or prescribing on its own.",
        ],
      },
    ],
  },
  refund: {
    title: "Refund Policy",
    intro:
      "Refund logic should be tightened alongside payment setup, support scripts, and pharmacy operations before going live.",
    sections: [
      {
        heading: "Consultation fees",
        body: [
          "Consultation fees may become non-refundable once a doctor has materially reviewed the case, subject to the final policy and applicable law.",
          "Operational errors, duplicate payments, or failed service fulfilment should trigger a support-led review.",
        ],
      },
      {
        heading: "Treatment fulfilment",
        body: [
          "Medication and delivery refunds depend on prescription status, pharmacy handling, and whether the order has already shipped.",
          "Support should be able to tag and escalate refunds, delays, side effects, cancellations, and privacy requests.",
        ],
      },
      {
        heading: "How to request help",
        body: [
          "Users should be able to contact support through the published support and grievance channels.",
          "Final launch should define turnaround times, refund windows, and escalation ownership.",
        ],
      },
    ],
  },
};

export const legalNav = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/consent", label: "Consent Notice" },
  { href: "/legal/refund", label: "Refund Policy" },
];
