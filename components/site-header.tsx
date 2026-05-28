"use client";

import Link from "next/link";
import { useState } from "react";

import { navigation, siteConfig } from "@/lib/site-content";
import { TrackedLink } from "@/components/tracked-link";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link href="/staff/login" className="site-header__staff-link">
            For clinicians
          </Link>
          <TrackedLink
            href="/hair-care/intake"
            eventName="cta_click"
            eventPayload={{ location: "header" }}
            className="button button--primary button--compact"
          >
            Start assessment
          </TrackedLink>
          <button
            type="button"
            className="site-header__menu-button"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {isOpen ? (
        <nav className="site-header__mobile-nav" aria-label="Mobile primary">
          <div className="container">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
