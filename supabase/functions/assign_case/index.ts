import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { assertAdminOrOps, getStaffProfile } from "../_shared/supabase.ts";

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const auth = await getStaffProfile(request);

    if (auth.error || !auth.profile || !auth.supabase) {
      throw new Error(auth.error || "Unable to verify staff access.");
    }

    assertAdminOrOps(auth.profile.role);

    const { caseId, doctorId, reason } = await request.json();

    if (!caseId || !doctorId) {
      throw new Error("caseId and doctorId are required.");
    }

    const { data: doctor, error: doctorError } = await auth.supabase
      .from("doctor_profiles")
      .select("user_id, active")
      .eq("user_id", doctorId)
      .eq("active", true)
      .single();

    if (doctorError || !doctor) {
      throw new Error("Doctor is not active or does not exist.");
    }

    const { error: updateError } = await auth.supabase
      .from("cases")
      .update({ assigned_doctor_id: doctorId, status: "awaiting_review", updated_at: new Date().toISOString() })
      .eq("id", caseId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    await auth.supabase.from("assignment_events").insert({
      assigned_by: auth.profile.id,
      assigned_doctor_id: doctorId,
      case_id: caseId,
      reason: reason || "auto_assign",
    });

    await auth.supabase.from("audit_events").insert({
      actor_id: auth.profile.id,
      case_id: caseId,
      event_type: "doctor_assigned",
      metadata: { doctorId, reason: reason || "auto_assign" },
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Unknown error." }, { status: 403 });
  }
});
