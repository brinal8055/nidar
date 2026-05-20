import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/site-content";

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
        <FaqList items={faqs} />
      </div>
    </section>
  );
}
