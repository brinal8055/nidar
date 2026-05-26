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

    const { mediaId } = await request.json();

    if (!mediaId) {
      throw new Error("mediaId is required.");
    }

    const { data: media, error: mediaError } = await auth.supabase
      .from("case_media")
      .select("id, case_id, bucket, object_path, cases(id, assigned_doctor_id)")
      .eq("id", mediaId)
      .single();

    if (mediaError || !media) {
      throw new Error("Media not found.");
    }

    const caseRecord = Array.isArray(media.cases) ? media.cases[0] : media.cases;
    const isAdminOps = auth.profile.role === "admin" || auth.profile.role === "ops";
    const isAssignedDoctor = auth.profile.role === "doctor" && caseRecord?.assigned_doctor_id === auth.profile.id;

    if (!isAdminOps && !isAssignedDoctor) {
      throw new Error("This media is not available to the signed-in user.");
    }

    const { data, error } = await auth.supabase.storage
      .from(media.bucket)
      .createSignedUrl(media.object_path, 60 * 5);

    if (error || !data?.signedUrl) {
      throw new Error(error?.message || "Unable to create signed URL.");
    }

    await auth.supabase.from("audit_events").insert({
      actor_id: auth.profile.id,
      case_id: media.case_id,
      event_type: "media_viewed",
      metadata: { mediaId },
    });

    return jsonResponse({ signedUrl: data.signedUrl, expiresInSeconds: 300 });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Unknown error." }, { status: 403 });
  }
});
