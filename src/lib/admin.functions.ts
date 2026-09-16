import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { ADMIN_EMAIL } from "./admin-config";

/**
 * Repairs the role for the one configured admin after their password has been
 * verified by Auth. No unauthenticated caller can create or promote an account.
 */
export const ensureAdminAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: authData, error: authError } = await context.supabase.auth.getUser();
    const email = authData.user?.email?.toLowerCase();

    if (authError || !authData.user || email !== ADMIN_EMAIL.toLowerCase()) {
      throw new Error("This account is not allowed to access admin tools.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: authData.user.id, role: "admin" }, { onConflict: "user_id,role" });

    if (error) throw new Error(error.message);

    return { ok: true as const };
  });
