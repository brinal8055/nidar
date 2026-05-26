import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { createServiceClient, getStaffProfile } from "../_shared/supabase.ts";

function getSafeExtension(fileName?: string) {
  if (!fileName || !fileName.includes(".")) {
    return "";
  }

  const extension = fileName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "");
  return extension ? `.${extension.slice(0, 8)}` : "";
}

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await request.json();
    const { caseId, contactEmail, mediaKind, originalFileName, requiredAngle } = payload;

    if (!caseId || !mediaKind) {
      throw new Error("caseId and mediaKind are required.");
    }

    const supabase = createServiceClient();
    const authHeader = request.headers.get("Authorization");
    let actorId: string | null = null;
    let hasStaffAccess = false;

    if (authHeader) {
      const auth = await getStaffProfile(request);

      if (auth.profile) {
        actorId = auth.profile.id;
        hasStaffAccess = true;
      }
    }

    if (!hasStaffAccess) {
      const { data: caseRecord, error: caseError } = await supabase
        .from("cases")
        .select("id, contact_email")
        .eq("id", caseId)
        .single();

      if (caseError || !caseRecord) {
        throw new Error("Case not found for media upload.");
      }

      if (!contactEmail || caseRecord.contact_email.toLowerCase() !== String(contactEmail).toLowerCase()) {
        throw new Error("Case email verification is required for media upload.");
      }
    }

    const objectPath = `${caseId}/${crypto.randomUUID()}${getSafeExtension(originalFileName)}`;
    const { data, error } = await supabase.storage
      .from("case-media")
      .createSignedUploadUrl(objectPath);

    if (error || !data) {
      throw new Error(error?.message || "Unable to create upload URL.");
    }

    await supabase.from("case_media").insert({
      bucket: "case-media",
      case_id: caseId,
      media_kind: mediaKind,
      object_path: objectPath,
      required_angle: requiredAngle || null,
      uploaded_by: actorId,
    });

    await supabase.from("audit_events").insert({
      actor_id: actorId,
      case_id: caseId,
      event_type: "media_uploaded",
      metadata: { mediaKind, objectPath, originalFileName, requiredAngle },
    });

    return jsonResponse({ objectPath, token: data.token, signedUrl: data.signedUrl });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Unknown error." }, { status: 403 });
  }
});
