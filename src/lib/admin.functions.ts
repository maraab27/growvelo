import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { ADMIN_EMAIL } from "./admin-config";

/**
 * One-time bootstrap: creates the single admin account if it does not exist yet,
 * and makes sure the admin role row is present. Refuses to touch an existing
 * account's credentials.
 */
export const bootstrapAdmin = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ password: z.string().min(8) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: list, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (listError) throw new Error(listError.message);

    const existing = list.users.find(
      (u) => (u.email ?? "").toLowerCase() === ADMIN_EMAIL.toLowerCase(),
    );

    if (existing) {
      await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: existing.id, role: "admin" }, { onConflict: "user_id,role" });
      return { created: false };
    }

    const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: data.password,
      email_confirm: true,
    });
    if (createError || !created.user) throw new Error(createError?.message ?? "Could not create admin");

    await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: created.user.id, role: "admin" }, { onConflict: "user_id,role" });

    return { created: true };
  });
