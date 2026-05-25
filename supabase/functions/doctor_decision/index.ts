import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { getStaffProfile } from "../_shared/supabase.ts";

const decisionStatus: Record<string, string> = {
  approve: "approved",
  decline: "declined",
  refer: "referred",
  request_labs: "needs_follow_up",
  video_consult: "needs_follow_up",
};

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const auth = await getStaffProfile(request);

    if (auth.error || !auth.profile || !auth.supabase) {
      throw new Error(auth.error || "Unable to verify staff access.");
    }

    if (auth.profile.role !== "doctor") {
      throw new Error("Doctor access required.");
    }

    const { caseId, decision, notes, payload } = await request.json();

    if (!caseId || !decision) {
      throw new Error("caseId and decision are required.");
    }

    const { data: caseRecord, error: caseError } = await auth.supabase
      .from("cases")
      .select("id, assigned_doctor_id")
      .eq("id", caseId)
      .eq("assigned_doctor_id", auth.profile.id)
      .single();

    if (caseError || !caseRecord) {
      throw new Error("This case is not assigned to the signed-in doctor.");
    }

    const { error: reviewError } = await auth.supabase.from("doctor_reviews").insert({
      case_id: caseId,
      decision,
      doctor_id: auth.profile.id,
      notes: notes || "",
      payload: payload || {},
    });

    if (reviewError) {
      throw new Error(reviewError.message);
    }

    await auth.supabase
      .from("cases")
      .update({ status: decisionStatus[decision] || "in_review", updated_at: new Date().toISOString() })
      .eq("id", caseId);

    await auth.supabase.from("audit_events").insert({
      actor_id: auth.profile.id,
      case_id: caseId,
      event_type: "doctor_decision_submitted",
      metadata: { decision },
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Unknown error." }, { status: 403 });
  }
});
