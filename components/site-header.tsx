import Link from "next/link";

import { navigation, siteConfig } from "@/lib/site-content";
import { TrackedLink } from "@/components/tracked-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand-mark brand-mark--wordmark" aria-label={`${siteConfig.name} home`}>
          <span>
            <strong>{siteConfig.name}</strong>
            <small>{siteConfig.tagline}</small>
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
            href="/hair-care"
            eventName="cta_click"
            eventPayload={{ location: "header" }}
            className="button button--primary button--compact"
          >
            Get care
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
