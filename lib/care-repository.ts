"use client";

import {
  HealthTrackingRequestRecord,
  storageKeys,
  WaitlistRecord,
} from "@/lib/storage";

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now()}`;
}

export type CreateHealthTrackingRequestInput = Omit<HealthTrackingRequestRecord, "id" | "status" | "createdAt">;
export type CreateWaitlistEntryInput = Omit<WaitlistRecord, "id" | "vertical" | "createdAt">;

export async function createHealthTrackingRequest(
  input: CreateHealthTrackingRequestInput,
): Promise<HealthTrackingRequestRecord> {
  const record: HealthTrackingRequestRecord = {
    ...input,
    id: makeId("health"),
    status: "beta_request_submitted",
    createdAt: new Date().toISOString(),
  };

  window.localStorage.setItem(storageKeys.healthTrackingRequest, JSON.stringify(record));
  return record;
}

export async function createWaitlistEntry(input: CreateWaitlistEntryInput): Promise<WaitlistRecord> {
  const record: WaitlistRecord = {
    ...input,
    id: makeId("waitlist"),
    vertical: "weight_loss",
    createdAt: new Date().toISOString(),
  };

  window.localStorage.setItem(storageKeys.weightLossWaitlist, JSON.stringify(record));
  return record;
}

export function readHealthTrackingRequest(): HealthTrackingRequestRecord | null {
  if (typeof window === "undefined") {
    return null;
  }

  const saved = window.localStorage.getItem(storageKeys.healthTrackingRequest);

  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved) as HealthTrackingRequestRecord;
  } catch {
    return null;
  }
}

export function readWaitlistEntry(): WaitlistRecord | null {
  if (typeof window === "undefined") {
    return null;
  }

  const saved = window.localStorage.getItem(storageKeys.weightLossWaitlist);

  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved) as WaitlistRecord;
  } catch {
    return null;
  }
}
