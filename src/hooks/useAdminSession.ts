import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

export type AdminSession = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
};

export function useAdminSession(): AdminSession {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const resolve = async (nextUser: User | null) => {
      if (!nextUser) {
        if (cancelled) return;
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", nextUser.id)
        .eq("role", "admin")
        .maybeSingle();
      if (cancelled) return;
      setUser(nextUser);
      setIsAdmin(!!data);
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => resolve(data.session?.user ?? null));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void resolve(session?.user ?? null);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, isAdmin, loading };
}
