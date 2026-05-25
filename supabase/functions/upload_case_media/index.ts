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

    const { caseId, mediaKind, requiredAngle } = await request.json();

    if (!caseId || !mediaKind) {
      throw new Error("caseId and mediaKind are required.");
    }

    const objectPath = `${caseId}/${crypto.randomUUID()}`;
    const { data, error } = await auth.supabase.storage
      .from("case-media")
      .createSignedUploadUrl(objectPath);

    if (error || !data) {
      throw new Error(error?.message || "Unable to create upload URL.");
    }

    await auth.supabase.from("case_media").insert({
      bucket: "case-media",
      case_id: caseId,
      media_kind: mediaKind,
      object_path: objectPath,
      required_angle: requiredAngle || null,
      uploaded_by: auth.profile.id,
    });

    await auth.supabase.from("audit_events").insert({
      actor_id: auth.profile.id,
      case_id: caseId,
      event_type: "media_uploaded",
      metadata: { mediaKind, objectPath, requiredAngle },
    });

    return jsonResponse({ objectPath, token: data.token, signedUrl: data.signedUrl });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Unknown error." }, { status: 403 });
  }
});
