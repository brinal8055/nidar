export type AnalyticsEventName =
  | "landing_view"
  | "cta_click"
  | "quiz_start"
  | "quiz_complete"
  | "checkout_start"
  | "payment_success"
  | "thank_you_view"
  | "account_signup"
  | "support_contact";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(name: AnalyticsEventName, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const eventPayload = {
    event: name,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(eventPayload);

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", eventPayload);
  }
}
