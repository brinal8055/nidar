import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { getStaffProfile } from "../_shared/supabase.ts";

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const auth = await getStaffProfile(request);

    if (auth.error || !auth.profile || !auth.supabase) {
      throw new Error(auth.error || "Unable to verify staff access.");
    }

    if (!["admin", "ops", "support"].includes(auth.profile.role)) {
      throw new Error("Support staff access required.");
    }

    const { caseId, note } = await request.json();

    if (!caseId || !note) {
      throw new Error("caseId and note are required.");
    }

    const { error } = await auth.supabase.from("support_notes").insert({
      author_id: auth.profile.id,
      case_id: caseId,
      note,
    });

    if (error) {
      throw new Error(error.message);
    }

    await auth.supabase.from("audit_events").insert({
      actor_id: auth.profile.id,
      case_id: caseId,
      event_type: "support_note_created",
      metadata: {},
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Unknown error." }, { status: 403 });
  }
});
