"use client";

import { FormEvent, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-content";
import { OrderRecord, storageKeys } from "@/lib/storage";
import { TrackedAnchor } from "@/components/tracked-link";

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
  const [signedIn, setSignedIn] = useState(false);
  const [phone, setPhone] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSignedIn(true);
    trackEvent("account_signup", { method: "otp_demo", hasOrder: Boolean(order), phone });
  }

  return (
    <div className="account-layout">
      <div className="card card--form">
        <p className="eyebrow">OTP login</p>
        <h2>Access your order status</h2>
        <p>
          This UI is ready for an OTP API. For now, submit any phone number to view the stored local
          order state.
        </p>

        <form className="stack" onSubmit={handleSubmit}>
          <label className="field">
            <span>Phone number</span>
            <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+91" required />
          </label>
          <button type="submit" className="button button--primary">
            Request code
          </button>
        </form>
      </div>

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

      {signedIn && order ? (
        <div className="account-stack">
          <div className="card card--highlight">
            <p className="eyebrow">Welcome back</p>
            <h3>{order.fullName}</h3>
            <p>Your consult request is active. We will keep status changes and follow-up reminders here.</p>
          </div>

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
      ) : signedIn ? (
        <div className="card">
          <p className="eyebrow">No active order found</p>
          <h3>Complete the eligibility quiz to create a consult request.</h3>
          <p>The account surface is wired to show live status once checkout has been completed.</p>
        </div>
      ) : null}
    </div>
  );
}
