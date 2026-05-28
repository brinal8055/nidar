import Link from "next/link";

const sections = [
  {
    title: "How AI is used",
    body: "AI-assisted tools may organize intake answers, uploaded reports, photos, missing fields, and draft summaries. AI does not diagnose, prescribe, or make clinical decisions.",
  },
  {
    title: "How doctors are involved",
    body: "Licensed doctors review cases before clinical guidance, prescription decisions, or treatment suitability decisions are shown.",
  },
  {
    title: "Lab partners",
    body: "Partner labs may collect and process samples where coverage is available. Nidar confirms availability and pricing before booking.",
  },
  {
    title: "Pharmacy partners",
    body: "Prescription medicines, where approved by a doctor, must go through licensed pharmacy fulfilment with the required patient consent.",
  },
  {
    title: "Data storage",
    body: "Photos, reports, and health intake information are treated as private health data. Demo dashboards use labelled example data only.",
  },
  {
    title: "Consent and deletion",
    body: "Users can contact support for consent, access, correction, deletion, privacy, or grievance requests where applicable.",
  },
  {
    title: "Urgent cases",
    body: "Nidar is not emergency care. Urgent, severe, or critical findings should be escalated to appropriate medical care immediately.",
  },
  {
    title: "Refund and support",
    body: "Refund handling depends on review, lab booking, pharmacy fulfilment, and operational status. Support can review each request.",
  },
];

export default function TrustSafetyPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Trust & Safety</p>
        <h1>How Nidar handles AI, doctors, partners, consent, and private health data.</h1>
        <p>
          Nidar is designed around AI-assisted organization and doctor-reviewed clinical guidance,
          with clear limits on emergency care, prescribing, and outcome claims.
        </p>
      </div>
      <div className="container card-grid card-grid--three">
        {sections.map((section) => (
          <article key={section.title} className="card">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </div>
      <div className="container button-row trust-link-row">
        <Link href="/legal/privacy" className="button button--secondary">
          Privacy Policy
        </Link>
        <Link href="/legal/consent" className="button button--secondary">
          Consent Notice
        </Link>
        <Link href="/legal/refund" className="button button--secondary">
          Refund Policy
        </Link>
      </div>
    </section>
  );
}
