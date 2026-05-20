import Link from "next/link";

import { legalNav, siteConfig } from "@/lib/site-content";
import { TrackedAnchor } from "@/components/tracked-link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">{siteConfig.name}</div>

        <nav className="site-footer__nav" aria-label="Footer">
          <ul className="footer-list footer-list--inline">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <TrackedAnchor
                href={`mailto:${siteConfig.supportEmail}`}
                eventName="support_contact"
                eventPayload={{ channel: "email_footer" }}
              >
                Contact
              </TrackedAnchor>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
          </ul>
        </nav>

        <div className="site-footer__meta">
          © 2026 {siteConfig.shortName}. Mock preview only.
        </div>
      </div>
    </footer>
  );
}
