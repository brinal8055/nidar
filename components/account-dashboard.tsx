"use client";

import { useState } from "react";

import { siteConfig } from "@/lib/site-content";
import { OrderRecord, storageKeys } from "@/lib/storage";
import { TrackedAnchor, TrackedLink } from "@/components/tracked-link";

function readStoredOrder(): OrderRecord | null {
  if (typeof window === "undefined") {
    return null;
  }

  const savedOrder = window.localStorage.getItem(storageKeys.order);

  if (!savedOrder) {
    return null;
  }

  try {
    return JSON.parse(savedOrder) as OrderRecord;
  } catch {
    return null;
  }
}

export function AccountDashboard() {
  const [order] = useState<OrderRecord | null>(readStoredOrder);

  return (
    <div className="account-layout">
      {order ? (
        <div className="card card--highlight">
          <p className="eyebrow">Saved request</p>
          <h2>{order.fullName}</h2>
          <p>
            Your consult request is saved on this device for status visibility. Support can help if
            you need changes, refunds, or privacy assistance.
          </p>
        </div>
      ) : (
        <div className="card card--form">
          <p className="eyebrow">No active request found</p>
          <h2>Start with the eligibility quiz.</h2>
          <p>
            Once a consult request is submitted from this device, the account area will show the
            review status and next steps.
          </p>
          <TrackedLink
            href="/quiz"
            eventName="cta_click"
            eventPayload={{ location: "account_start_quiz" }}
            className="button button--primary"
          >
            Start assessment
          </TrackedLink>
        </div>
      )}

      <div className="card">
        <p className="eyebrow">Support and privacy</p>
        <h3>Need help with delays, refunds, or privacy requests?</h3>
        <p>Support should stay visible in the account area from day one, not buried in a footer.</p>
        <div className="button-row">
          <TrackedAnchor
            href={`mailto:${siteConfig.supportEmail}`}
            eventName="support_contact"
            eventPayload={{ location: "account" }}
            className="button button--secondary"
          >
            Email support
          </TrackedAnchor>
          <TrackedAnchor
            href={`mailto:${siteConfig.privacyEmail}`}
            eventName="support_contact"
            eventPayload={{ location: "account_privacy" }}
            className="button button--ghost"
          >
            Privacy requests
          </TrackedAnchor>
        </div>
      </div>

      {order ? (
        <div className="account-stack">
          <div className="card">
            <p className="eyebrow">Consultation status</p>
            <div className="timeline">
              {order.statuses.map((status) => (
                <div key={status.label} className={`timeline__item timeline__item--${status.state}`}>
                  <strong>{status.label}</strong>
                  <p>{status.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <p className="eyebrow">Support messages</p>
            <ul className="summary-list">
              {order.messages.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <p className="eyebrow">Refill reminder</p>
            <h3>Follow-up can track 14-day, 30-day, and 90-day milestones.</h3>
            <p>
              Hair treatment is slow. If a doctor approves treatment, this area can show usage reminders,
              side-effect checks, progress-photo prompts, and refill timing.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
