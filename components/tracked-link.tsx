"use client";

import Link from "next/link";
import { MouseEvent, ReactNode } from "react";

import { AnalyticsEventName, trackEvent } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  eventName: AnalyticsEventName;
  eventPayload?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
};

export function TrackedLink({
  href,
  eventName,
  eventPayload,
  className,
  children,
}: TrackedLinkProps) {
  function handleClick() {
    trackEvent(eventName, eventPayload);
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

type TrackedAnchorProps = {
  href: string;
  eventName: AnalyticsEventName;
  eventPayload?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
};

export function TrackedAnchor({
  href,
  eventName,
  eventPayload,
  className,
  children,
}: TrackedAnchorProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackEvent(eventName, eventPayload);

    if (href.startsWith("#")) {
      event.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
