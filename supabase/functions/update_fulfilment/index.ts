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

    const { caseId, orderType, status, partnerName, payload } = await request.json();

    if (!caseId || !orderType || !status) {
      throw new Error("caseId, orderType, and status are required.");
    }

    const { data: order, error } = await auth.supabase
      .from("orders")
      .insert({
        case_id: caseId,
        order_type: orderType,
        partner_name: partnerName || null,
        payload: payload || {},
        status,
      })
      .select("id")
      .single();

    if (error || !order) {
      throw new Error(error?.message || "Unable to update fulfilment.");
    }

    await auth.supabase.from("audit_events").insert({
      actor_id: auth.profile.id,
      case_id: caseId,
      event_type: "fulfilment_status_changed",
      metadata: { orderId: order.id, orderType, partnerName, status },
    });

    return jsonResponse({ ok: true, orderId: order.id });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Unknown error." }, { status: 403 });
  }
});
