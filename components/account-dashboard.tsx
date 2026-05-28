"use client";

import { useState } from "react";

import { readHealthTrackingRequest, readWaitlistEntry } from "@/lib/care-repository";
import { siteConfig } from "@/lib/site-content";
import { HealthTrackingRequestRecord, OrderRecord, storageKeys, WaitlistRecord } from "@/lib/storage";
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

const hairTimeline = [
  "Intake submitted",
  "Photos received",
  "Doctor review pending",
  "Doctor decision",
  "Fulfilment / prescription status",
  "14-day check-in",
  "30-day side-effect check",
  "90-day progress photo review",
];

const healthTimeline = [
  "Beta request submitted",
  "Lab coverage confirmation pending",
  "Sample collection scheduled",
  "Report received",
  "AI summary prepared",
  "Doctor review pending",
  "Insights ready",
  "Retest reminder scheduled",
];

function Timeline({ items, activeIndex }: { items: string[]; activeIndex: number }) {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div
          key={item}
          className={`timeline__item timeline__item--${index < activeIndex ? "complete" : index === activeIndex ? "current" : "upcoming"}`}
        >
          <strong>{item}</strong>
          <p>{index <= activeIndex ? "Visible on this device from the submitted request." : "Upcoming once the workflow advances."}</p>
        </div>
      ))}
    </div>
  );
}

export function AccountDashboard() {
  const [order] = useState<OrderRecord | null>(readStoredOrder);
  const [healthRequest] = useState<HealthTrackingRequestRecord | null>(readHealthTrackingRequest);
  const [waitlist] = useState<WaitlistRecord | null>(readWaitlistEntry);
  const hasAnyRequest = Boolean(order || healthRequest || waitlist);

  return (
    <div className="account-layout">
      {!hasAnyRequest ? (
        <div className="card card--form">
          <p className="eyebrow">No active request found</p>
          <h2>Start a care path.</h2>
          <p>Submitted requests from this device will show review status, next steps, and support options here.</p>
          <div className="button-row">
            <TrackedLink href="/hair-care/intake" eventName="cta_click" eventPayload={{ location: "account_hair" }} className="button button--primary">
              Start Hair Assessment
            </TrackedLink>
            <TrackedLink href="/health-tracking/intake" eventName="cta_click" eventPayload={{ location: "account_health" }} className="button button--secondary">
              Join Health Tracking Beta
            </TrackedLink>
            <TrackedLink href="/weight-loss/waitlist" eventName="cta_click" eventPayload={{ location: "account_weight_loss" }} className="button button--ghost">
              Join Weight Loss Waitlist
            </TrackedLink>
          </div>
        </div>
      ) : null}

      {order ? (
        <div className="account-stack">
          <div className="card card--highlight">
            <p className="eyebrow">Hair Care request</p>
            <h2>{order.caseNumber || "Doctor review pending"}</h2>
            <p>A doctor review is required before any prescription decision or pharmacy fulfilment.</p>
          </div>
          <div className="card">
            <p className="eyebrow">Hair Care timeline</p>
            <Timeline items={hairTimeline} activeIndex={2} />
          </div>
        </div>
      ) : null}

      {healthRequest ? (
        <div className="account-stack">
          <div className="card card--highlight">
            <p className="eyebrow">Health Tracking Beta</p>
            <h2>{healthRequest.packageType}</h2>
            <p>
              {healthRequest.collectionMode === "sample_collection"
                ? "Lab coverage confirmation is pending before sample collection is booked."
                : "Report upload intent is saved for beta review."}
            </p>
          </div>
          <div className="card">
            <p className="eyebrow">Health Tracking timeline</p>
            <Timeline items={healthTimeline} activeIndex={1} />
          </div>
        </div>
      ) : null}

      {waitlist ? (
        <div className="card card--highlight">
          <p className="eyebrow">Weight Loss waitlist</p>
          <h2>{waitlist.city}</h2>
          <p>We’ll notify you when doctor-led metabolic care is available in your city.</p>
        </div>
      ) : null}

      <div className="card">
        <p className="eyebrow">Support and privacy</p>
        <h3>Need help with delays, refunds, privacy, or a reported issue?</h3>
        <p>Support should stay visible in the account area from day one, not buried in a footer.</p>
        <div className="button-row">
          <TrackedAnchor href={`mailto:${siteConfig.supportEmail}`} eventName="support_contact" eventPayload={{ location: "account" }} className="button button--secondary">
            Email support
          </TrackedAnchor>
          <TrackedAnchor href={`mailto:${siteConfig.privacyEmail}`} eventName="support_contact" eventPayload={{ location: "account_privacy" }} className="button button--ghost">
            Privacy requests
          </TrackedAnchor>
          <TrackedAnchor href={`mailto:${siteConfig.supportEmail}?subject=Refund%20request`} eventName="support_contact" eventPayload={{ location: "account_refund" }} className="button button--ghost">
            Refund requests
          </TrackedAnchor>
          <TrackedAnchor href={`mailto:${siteConfig.supportEmail}?subject=Report%20issue`} eventName="support_contact" eventPayload={{ location: "account_issue" }} className="button button--ghost">
            Report issue
          </TrackedAnchor>
        </div>
      </div>
    </div>
  );
}
