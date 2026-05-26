import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase.ts";

type CreateCasePayload = {
  contact?: {
    fullName?: string;
    phone?: string;
    email?: string;
    source?: string;
  };
  consultFee?: number;
  quizSummary?: {
    adultConfirmed?: boolean;
    consentAccepted?: boolean;
    eligibilityOutcome?: string;
  };
  vertical?: string;
};

function requireString(value: unknown, label: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} is required.`);
  }

  return value.trim();
}

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = (await request.json()) as CreateCasePayload;
    const contact = payload.contact || {};
    const quizSummary = payload.quizSummary || {};

    if (!quizSummary.adultConfirmed || !quizSummary.consentAccepted) {
      throw new Error("Adult confirmation and consent are required before case creation.");
    }

    const supabase = createServiceClient();
    const caseNumber = `NH-${Date.now().toString(36).toUpperCase()}`;

    const { data: caseRecord, error: caseError } = await supabase
      .from("cases")
      .insert({
        case_number: caseNumber,
        contact_email: requireString(contact.email, "Email"),
        contact_full_name: requireString(contact.fullName, "Full name"),
        contact_phone: requireString(contact.phone, "Phone"),
        consult_fee: payload.consultFee || 0,
        payment_status: "pending",
        priority: "routine",
        source: contact.source || "direct",
        status: "awaiting_assignment",
        vertical: payload.vertical || "hair_care",
      })
      .select("id, case_number, status")
      .single();

    if (caseError || !caseRecord) {
      throw new Error(caseError?.message || "Unable to create case.");
    }

    const { error: intakeError } = await supabase.from("case_intakes").insert({
      adult_confirmed: true,
      case_id: caseRecord.id,
      consent_accepted: true,
      eligibility_outcome: quizSummary.eligibilityOutcome || null,
      payload: payload.quizSummary || {},
    });

    if (intakeError) {
      throw new Error(intakeError.message);
    }

    const { error: auditError } = await supabase.from("audit_events").insert([
      {
        case_id: caseRecord.id,
        event_type: "case_created",
        metadata: { source: contact.source || "direct" },
      },
      {
        case_id: caseRecord.id,
        event_type: "consent_accepted",
        metadata: { adultConfirmed: true },
      },
    ]);

    if (auditError) {
      throw new Error(auditError.message);
    }

    return jsonResponse({
      caseId: caseRecord.id,
      caseNumber: caseRecord.case_number,
      status: caseRecord.status,
    });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Unknown error." }, { status: 400 });
  }
});
