"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-content";
import { TrackedLink } from "@/components/tracked-link";

export default function ThankYouPage() {
  useEffect(() => {
    trackEvent("thank_you_view", { source: "consult_request_complete" });
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="card card--hero">
          <p className="eyebrow">Thank you</p>
          <h1>Your consult request has been queued.</h1>
          <p>
            A doctor review is required before any prescription decision. The target turnaround is{" "}
            {siteConfig.turnaround}.
          </p>
          <ul className="summary-list">
            <li>We captured your intake, consent, and contact details.</li>
            <li>Support messages and order status now live in the account area.</li>
            <li>This service is not for emergencies.</li>
          </ul>
          <div className="button-row">
            <TrackedLink
              href="/account"
              eventName="cta_click"
              eventPayload={{ location: "thank_you_account" }}
              className="button button--primary"
            >
              View account status
            </TrackedLink>
            <TrackedLink
              href="/"
              eventName="cta_click"
              eventPayload={{ location: "thank_you_home" }}
              className="button button--secondary"
            >
              Back to home
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
