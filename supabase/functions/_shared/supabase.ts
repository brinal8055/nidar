import { createClient } from "npm:@supabase/supabase-js@2";

export function createServiceClient() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase service configuration.");
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function getStaffProfile(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return { error: "Missing authorization header." };
  }

  const supabase = createServiceClient();
  const token = authHeader.replace("Bearer ", "");
  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    return { error: "Invalid staff session." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, role, active")
    .eq("id", userData.user.id)
    .single();

  if (profileError || !profile?.active) {
    return { error: "This staff account is not active." };
  }

  return { profile, supabase };
}

export function assertAdminOrOps(role: string) {
  if (role !== "admin" && role !== "ops") {
    throw new Error("Admin or ops access required.");
  }
}
