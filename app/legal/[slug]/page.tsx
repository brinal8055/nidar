import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { legalPages } from "@/lib/site-content";

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages[slug];

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.intro,
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = legalPages[slug];

  if (!page) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Legal</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </div>

      <div className="container legal-layout">
        {page.sections.map((section) => (
          <article key={section.heading} className="card">
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
