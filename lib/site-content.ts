export const siteConfig = {
  name: "Nidar Health",
  shortName: "Nidar",
  brandStory: "No fear. Get care.",
  tagline: "Care without hesitation.",
  title: "Doctor-reviewed care and health tracking from home.",
  description:
    "A web-first consumer health platform for specific care issues and long-term health tracking, starting with doctor-reviewed hair care.",
  consultFee: 499,
  supportEmail: "support@nidar.health",
  privacyEmail: "privacy@nidar.health",
  supportPhone: "+91 90000 00000",
  turnaround: "within 24 hours",
  grievanceHours: "Mon-Sat, 9:00 AM to 7:00 PM IST",
} as const;

export const navigation = [
  { href: "/hair-care", label: "Hair Care" },
  { href: "/health-tracking", label: "Annual Health" },
  { href: "/weight-loss", label: "Weight Loss" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/account", label: "Account" },
  { href: "/staff/login", label: "For clinicians" },
];

export const trustPoints = [
  "AI-assisted, doctor-reviewed",
  "Licensed doctor review before clinical guidance",
  "Private reports and photos",
  "Partner-led lab and medicine fulfilment",
  "Consent-first data handling",
];

export const platformPillars = [
  {
    id: "hair-loss-care",
    label: "Hair Care",
    role: "Acquisition wedge",
    icon: "dermatology",
    tone: "lavender",
    title: "Solve a specific high-intent problem.",
    description:
      "Hair Care starts with adult male hair-loss assessment, standard photos, doctor review, treatment only when appropriate, delivery, and 30/60/90-day progress tracking.",
    flow: "Hair-loss assessment -> photo upload -> doctor review -> prescription decision -> delivery -> follow-up",
    href: "/hair-care/intake",
    ctaLabel: "Start assessment",
  },
  {
    id: "health-tracking",
    label: "Annual Health Tracking",
    role: "Retention engine",
    icon: "timeline",
    tone: "blue",
    title: "Understand how your body is moving over time.",
    description:
      "Health Tracking brings annual checks, report uploads, biomarker trends, doctor-reviewed guidance, care plans, orders, and retest reminders into one dashboard.",
    flow: "Book tests or upload reports -> see biomarker trends -> get AI-prepared insights -> doctor-reviewed guidance -> orders and reminders",
    href: "/health-tracking/intake",
    ctaLabel: "Join beta",
  },
  {
    id: "weight-loss-care",
    label: "Weight Loss Care",
    role: "Coming soon",
    icon: "monitor_heart",
    tone: "gold",
    title: "Doctor-led weight-loss care, built carefully.",
    description:
      "A future pathway for eligibility screening, lab review, GLP-1 suitability discussion where appropriate, doctor supervision, lifestyle support, and tracking.",
    flow: "Eligibility screening -> labs -> doctor supervision -> lifestyle support -> tracking",
    href: "/weight-loss",
    ctaLabel: "Join waitlist",
  },
];

export const platformVerticals = [
  {
    id: "hair-care",
    label: "Hair Care",
    status: "Live",
    icon: "dermatology",
    tone: "lavender",
    description:
      "Adult male hair-loss screening with standard photos, doctor review, consult request, and follow-up.",
    href: "/hair-care",
    ctaLabel: "Open Hair Care",
  },
  {
    id: "health-tracking",
    label: "Annual Health Tracking",
    status: "Beta",
    icon: "timeline",
    tone: "blue",
    description:
      "Annual checks, report analysis, biomarker trends, care guidance, orders, and retest reminders in one dashboard.",
    href: "/health-tracking/intake",
    ctaLabel: "Join beta",
  },
  {
    id: "weight-loss",
    label: "Weight Loss Care",
    status: "Coming soon",
    icon: "monitor_heart",
    tone: "gold",
    description:
      "Doctor-led weight-loss care with eligibility screening, lab review, GLP-1 suitability discussion, lifestyle support, and tracking.",
    href: "/weight-loss",
    ctaLabel: "Join waitlist",
  },
  {
    id: "mens-health",
    label: "Men's Health",
    status: "Coming soon",
    icon: "male",
    tone: "tan",
    description:
      "A future pathway for energy, sexual health, hormones, performance, and doctor-reviewed follow-up.",
    href: null,
    ctaLabel: "Coming soon",
  },
  {
    id: "womens-health",
    label: "Women's Health",
    status: "Coming soon",
    icon: "science",
    tone: "rose",
    description:
      "A future pathway for hormonal health, skin, hair, cycle-stage support, and doctor-reviewed guidance.",
    href: null,
    ctaLabel: "Coming soon",
  },
];

export const platformHowItWorks = [
  "Tell us your concern",
  "Guided intake",
  "Tests, photos, or reports",
  "AI organizes data",
  "Doctor reviews",
  "Plan, delivery, and tracking",
];

export const healthTrackingProfiles = [
  "Vitamin profile",
  "Thyroid profile",
  "Diabetes risk",
  "Liver health",
  "Kidney health",
  "Lipid profile",
  "CBC profile",
];

export const platformTrustItems = [
  "AI-assisted, doctor-reviewed",
  "Licensed doctor review before clinical guidance",
  "Private reports and photos",
  "Partner-led lab and medicine fulfilment",
  "Consent-first data handling",
];

export const healthTrackingDashboardFeatures = [
  {
    title: "Reports",
    icon: "fact_check",
    body: "Upload past reports or book a new at-home test package when you need fresh data.",
  },
  {
    title: "Trends",
    icon: "timeline",
    body: "Track markers like Vitamin D, B12, ferritin, HbA1c, thyroid, lipids, liver, kidney, and CBC over time.",
  },
  {
    title: "Guidance",
    icon: "clinical_notes",
    body: "Get a plain-language report summary, AI-prepared insights, and doctor-reviewed guidance where needed.",
  },
  {
    title: "Care plan",
    icon: "rule",
    body: "See suggested next steps, lifestyle actions, supplement guidance, prescription decisions, or referral notes.",
  },
  {
    title: "Orders",
    icon: "local_pharmacy",
    body: "Order recommended tests, supplements, or medicines through the care workflow when appropriate.",
  },
  {
    title: "Reminders",
    icon: "event_repeat",
    body: "Get retest reminders at 90 days, 6 months, or annually based on the marker and care plan.",
  },
];

export const healthTrackingPackages = [
  {
    name: "Basic Annual Health",
    badge: "Best yearly baseline",
    price: "Rs 1,499-Rs 2,499",
    priceNote: "varies by city and lab partner",
    bestFor: "People who want a simple annual snapshot of their overall health.",
    includes: ["CBC", "Thyroid profile", "Liver profile", "Kidney profile", "Lipid profile", "Blood sugar"],
    deliverables: ["Home sample collection", "Report explained in plain language", "Doctor-reviewed guidance", "Annual retest reminder"],
  },
  {
    name: "Vitamin & Fatigue",
    badge: "Popular with hair-care users",
    price: "Rs 1,999-Rs 3,499",
    priceNote: "varies by city and lab partner",
    bestFor: "People with low energy, fatigue, hair concerns, vegetarian diets, or deficiency risk.",
    includes: ["Vitamin D", "Vitamin B12", "Ferritin", "CBC", "Thyroid profile"],
    deliverables: ["Deficiency-focused summary", "Doctor-reviewed next steps", "Supplement guidance if appropriate", "90-day retest reminder"],
  },
  {
    name: "Diabetes Risk",
    badge: "Metabolic tracking",
    price: "Rs 1,999-Rs 3,999",
    priceNote: "varies by city and lab partner",
    bestFor: "People with family history, weight concerns, high sugar history, or early metabolic risk.",
    includes: ["HbA1c", "Fasting glucose", "Lipid profile", "Kidney profile"],
    deliverables: ["Risk-level explanation", "Doctor-reviewed lifestyle guidance", "Trend tracking dashboard", "3-6 month retest reminder"],
  },
];

export const platformSteps = [
  {
    title: "Tell us your concern",
    description:
      "Choose Hair Care, Annual Health Tracking, or a coming-soon pathway and complete a guided intake.",
  },
  {
    title: "Tests, photos, or reports",
    description:
      "Upload hair photos, book partner-lab sample collection, or add existing health reports where relevant.",
  },
  {
    title: "Doctor-reviewed plan",
    description:
      "AI organizes data for review. Licensed doctors make clinical guidance decisions, then care moves into delivery and tracking.",
  },
];

export const homeStats = [
  { value: "18+", label: "Adults only for launch" },
  { value: "24h", label: "Target doctor review turnaround" },
  { value: "1", label: "Single launch wedge to keep care reliable" },
];

export const heroPrograms = [
  { label: "Hair Loss", status: "Live focus" },
  { label: "Men's Health", status: "Next phase" },
  { label: "Dermatology", status: "Later" },
  { label: "Weight Loss Care", status: "Later" },
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
    status: "Launch focus",
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
    verticalLabel: "Adult male pattern hair-loss launch",
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
    ctaHref: "/hair-care/intake",
    tone: "lavender",
    visualIcon: "male",
    visualTitle: "Screening route",
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
      "Photo review is required before the consult request",
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
    ctaLabel: "See care workflow",
    ctaHref: "/how-it-works",
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
    ctaLabel: "View account flow",
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
    body: "Pattern, timeline, triggers, scalp symptoms, medicines, and contraindication flags are captured before doctor review.",
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
    name: "Hair Assessment",
    price: "Rs 499",
    note: "Hair Care",
    details: [
      "Eligibility review and structured intake",
      "Doctor assessment before any prescription",
      "Expected response window within 24 hours",
    ],
  },
  {
    name: "Basic Annual Health",
    price: "Rs 1,499-Rs 2,499",
    note: "Annual Health Tracking",
    details: [
      "CBC, thyroid, liver, kidney, lipid, and sugar profile",
      "Partner-led home sample collection where available",
      "Report organized for doctor-reviewed guidance",
    ],
  },
  {
    name: "Weight Loss Care",
    price: "Coming soon",
    note: "Future vertical",
    details: [
      "Eligibility screening before any care pathway",
      "Lab review and doctor supervision planned",
      "GLP-1 suitability can be discussed only after review",
      "No specific medicine promotion or outcome guarantees",
    ],
  },
];

export const faqs = [
  {
    question: "Is Nidar a clinic?",
    answer:
      "Nidar is a digital care coordination platform. Clinical guidance and prescription decisions require licensed doctor review; partner labs and pharmacies may fulfil services where applicable.",
  },
  {
    question: "Is this emergency care?",
    answer:
      "No. Nidar is not for emergencies or urgent symptoms. Seek emergency care immediately for severe, sudden, or life-threatening symptoms.",
  },
  {
    question: "How is AI used?",
    answer:
      "AI may organize intake answers, reports, photos, and missing-information checks so doctors and care teams can review them more clearly.",
  },
  {
    question: "Does AI diagnose or prescribe?",
    answer:
      "No. AI does not diagnose, prescribe, or make clinical decisions. Licensed doctors decide clinical guidance and whether treatment is appropriate.",
  },
  {
    question: "Who reviews clinical guidance?",
    answer:
      "Licensed doctors review clinical guidance before it is shown where the workflow requires medical judgement.",
  },
  {
    question: "Is my data private?",
    answer:
      "Health photos, reports, and intake answers are treated as private health data. Public demo screens must not expose real patient data.",
  },
  {
    question: "Who can use the launch version?",
    answer:
      "The launch flow is designed for adult men in India with gradual hairline or crown thinning that may fit a male-pattern hair-loss review.",
  },
  {
    question: "Will I definitely receive medication?",
    answer:
      "No. Medication is only considered after doctor review and may be declined if the case is unsuitable or needs in-person care.",
  },
  {
    question: "What photos do I need?",
    answer:
      "The hair intake asks for front hairline, left temple, right temple, and crown/top photos. A scalp close-up is requested when dandruff, redness, patches, or irritation are present.",
  },
  {
    question: "What cases are not handled online in this launch flow?",
    answer:
      "Children, female hair loss, sudden patchy bald spots, painful or infected scalp symptoms, scarring, pus, severe systemic symptoms, PRP, transplant care, and unclear cases should be routed to in-person or specialist review.",
  },
  {
    question: "How long does hair treatment take?",
    answer:
      "Progress varies. If treatment is approved, visible changes usually take months and follow-up photos help track response.",
  },
  {
    question: "What if I get side effects?",
    answer:
      "Stop or pause as directed by your doctor and contact support. Side-effect check-ins are part of the follow-up workflow when treatment is approved.",
  },
  {
    question: "Can the doctor reject my case?",
    answer:
      "Yes. A doctor may decline online treatment, request labs, ask for more information, or refer you for in-person care.",
  },
  {
    question: "Do I need lab tests?",
    answer:
      "Some hair cases may need lab tests, especially diffuse shedding, fatigue, recent illness, or deficiency risk. The doctor decides what is appropriate.",
  },
  {
    question: "Can I upload an existing report?",
    answer:
      "Yes. Annual Health Tracking beta supports an existing-report upload path for PDF or image reports.",
  },
  {
    question: "Can I book home sample collection?",
    answer:
      "The beta can capture home sample collection interest. Our team confirms city coverage, lab partner availability, and pricing before booking.",
  },
  {
    question: "Which cities are supported?",
    answer:
      "Coverage depends on partner lab availability. The beta intake collects city and state so support can confirm serviceability.",
  },
  {
    question: "Who processes the sample?",
    answer:
      "Samples are collected and processed by lab partners where available. Nidar organizes the care workflow and report review experience.",
  },
  {
    question: "Who reviews my report?",
    answer:
      "Reports may be converted into structured biomarkers and AI-organized summaries, but clinical next steps require doctor-reviewed guidance.",
  },
  {
    question: "What happens if a marker is critical?",
    answer:
      "Critical or urgent markers should be escalated to appropriate medical care. Nidar is not an emergency service.",
  },
  {
    question: "Can I track reports over time?",
    answer:
      "Yes. The Health Tracking dashboard preview shows how biomarkers, trends, orders, insights, and retest reminders can be organized over time.",
  },
  {
    question: "How often should I retest?",
    answer:
      "Retest timing depends on the marker and doctor guidance. Some markers may be reviewed in 90 days, 3-6 months, or annually.",
  },
  {
    question: "What is included in Rs 499?",
    answer:
      "The Hair Assessment includes adult male hair-loss eligibility intake, standard photo review, and doctor assessment before any prescription decision.",
  },
  {
    question: "Are medicine costs included?",
    answer:
      "No, unless explicitly stated. Prescription medicine cost may vary based on the doctor's prescription and pharmacy fulfilment.",
  },
  {
    question: "Are lab costs included?",
    answer:
      "Health Tracking package prices include the planned lab package range, but final pricing may vary by city and lab partner.",
  },
  {
    question: "Can pricing vary by city?",
    answer:
      "Yes. Lab coverage, partner pricing, and availability can vary by city and are confirmed before booking.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Refunds depend on review, booking, fulfilment, and operational status. See the Refund Policy or contact support for a case-specific review.",
  },
  {
    question: "What happens if lab collection is not available?",
    answer:
      "Support will tell you that coverage is unavailable, suggest uploading an existing report if suitable, or waitlist the request.",
  },
  {
    question: "Is Weight Loss Care live?",
    answer:
      "No. Weight Loss Care is waitlist-only while Nidar builds the doctor-led metabolic care pathway.",
  },
  {
    question: "Are GLP-1 medicines guaranteed?",
    answer:
      "No. There is no guaranteed access to any medicine. Suitability can be discussed only after licensed doctor review.",
  },
  {
    question: "Why is doctor review required?",
    answer:
      "Metabolic care can involve medical history, labs, contraindications, and side-effect monitoring. Clinical decisions must be made by licensed doctors.",
  },
  {
    question: "What information will be needed for eligibility?",
    answer:
      "The waitlist captures contact details, city, age range, primary interest, and known conditions. A future care flow may ask for labs and medical history.",
  },
  {
    question: "Will Hindi/Hinglish be supported?",
    answer:
      "The launch is English-first. The copy structure is being kept simple so Hindi or Hinglish can be added properly later, without a fake language toggle.",
  },
];

export const howItWorksHighlights = [
  "One public funnel: landing page to eligibility quiz to consult request.",
  "One care workflow: intake, doctor review, prescription decision, and pharmacy handoff.",
  "One refill loop: 14-day, 30-day, and 90-day check-ins instead of a cluttered multi-condition catalog.",
  "One message: doctor-reviewed treatment plans for adult male hair loss, from home.",
];

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
      "This policy explains how Nidar Health handles information for the launch flow.",
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
          "Users can contact the published privacy channel for access, correction, consent, and deletion requests where applicable.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro:
      "These terms describe the operating model for the launch experience.",
    sections: [
      {
        heading: "Scope of service",
        body: [
          "The service provides a digital intake, doctor review workflow, status communication, and pharmacy coordination where appropriate.",
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
          "The service content is informational and service-oriented. It should not make unsupported clinical claims or promise outcomes.",
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
      "Refund handling depends on doctor review status, payment status, and pharmacy fulfilment stage.",
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
