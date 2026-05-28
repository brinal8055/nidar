import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/site-content";

const faqSections = [
  {
    title: "General",
    questions: ["Is Nidar a clinic?", "Is this emergency care?", "How is AI used?", "Does AI diagnose or prescribe?", "Who reviews clinical guidance?", "Is my data private?"],
  },
  {
    title: "Hair Care",
    questions: ["Who can use the launch version?", "Will I definitely receive medication?", "What photos do I need?", "What cases are not handled online in this launch flow?", "How long does hair treatment take?", "What if I get side effects?", "Can the doctor reject my case?", "Do I need lab tests?"],
  },
  {
    title: "Annual Health",
    questions: ["Can I upload an existing report?", "Can I book home sample collection?", "Which cities are supported?", "Who processes the sample?", "Who reviews my report?", "What happens if a marker is critical?", "Can I track reports over time?", "How often should I retest?"],
  },
  {
    title: "Pricing and Refund",
    questions: ["What is included in Rs 499?", "Are medicine costs included?", "Are lab costs included?", "Can pricing vary by city?", "What is the refund policy?", "What happens if lab collection is not available?"],
  },
  {
    title: "Weight Loss / GLP-1",
    questions: ["Is Weight Loss Care live?", "Are GLP-1 medicines guaranteed?", "Why is doctor review required?", "What information will be needed for eligibility?"],
  },
  {
    title: "Language",
    questions: ["Will Hindi/Hinglish be supported?"],
  },
];

function faqItemsFor(questions: string[]) {
  return questions
    .map((question) => faqs.find((item) => item.question === question))
    .filter((item): item is (typeof faqs)[number] => item !== undefined);
}

export default function FaqPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">FAQ</p>
        <h1>Keep answers plain, specific, and legally conservative.</h1>
        <p>
          The public site should sound trustworthy and modern without drifting into unsupported claims or
          marketplace clutter.
        </p>
      </div>

      <div className="container">
        <div className="faq-section-stack">
          {faqSections.map((section) => (
            <section key={section.title} className="faq-section">
              <h2>{section.title}</h2>
              <FaqList items={faqItemsFor(section.questions)} />
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
