import Link from "next/link";

import { navigation, siteConfig } from "@/lib/site-content";
import { TrackedLink } from "@/components/tracked-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand-mark brand-mark--wordmark" aria-label={`${siteConfig.shortName} home`}>
          <span>
            <strong>{siteConfig.shortName}</strong>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <TrackedLink
            href="/quiz"
            eventName="cta_click"
            eventPayload={{ location: "header" }}
            className="button button--primary button--compact"
          >
            Get Started
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
