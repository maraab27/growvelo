import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/useAdminSession";
import type { ContentValues } from "@/lib/content.functions";

const CMS_CACHE_KEY = "growvelo:content-blocks:v1";

type CmsContextValue = {
  isAdmin: boolean;
  loaded: boolean;
  values: Record<string, string>;
  pendingCount: number;
  saving: boolean;
  stage: (key: string, value: string) => void;
  saveAll: () => Promise<void>;
};

const CmsContext = createContext<CmsContextValue>({
  isAdmin: false,
  loaded: false,
  values: {},
  pendingCount: 0,
  saving: false,
  stage: () => {},
  saveAll: async () => {},
});

export function useCms() {
  return useContext(CmsContext);
}

export function CmsProvider({ children, initialValues }: { children: ReactNode; initialValues: ContentValues }) {
  const { isAdmin } = useAdminSession();
  const [values, setValues] = useState<ContentValues>(initialValues);
  const [pendingCount, setPendingCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const pending = useRef<Record<string, string>>({});

  const flush = useCallback(async (silent: boolean) => {
    const entries = Object.entries(pending.current);
    if (entries.length === 0) return;
    setSaving(true);
    const rows = entries.map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }));
    const { error } = await supabase.from("content_blocks").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) {
      if (!silent) toast.error(`Could not save: ${error.message}`);
      return;
    }
    for (const [key] of entries) {
      if (pending.current[key] === rows.find((r) => r.key === key)?.value) delete pending.current[key];
    }
    setPendingCount(Object.keys(pending.current).length);
    try {
      localStorage.setItem(CMS_CACHE_KEY, JSON.stringify(values));
    } catch {
      // Storage may be unavailable in privacy mode; server-loaded content remains authoritative.
    }
    if (!silent) toast.success("All changes saved");
  }, [values]);

  const stage = useCallback(
    (key: string, value: string) => {
      setValues((prev) => {
        const next = prev[key] === value ? prev : { ...prev, [key]: value };
        try {
          localStorage.setItem(CMS_CACHE_KEY, JSON.stringify(next));
        } catch {
          // Saving to the database still works when browser storage is unavailable.
        }
        return next;
      });
      pending.current[key] = value;
      setPendingCount(Object.keys(pending.current).length);
      void flush(true);
    },
    [flush],
  );

  const saveAll = useCallback(() => flush(false), [flush]);

  const value = useMemo(
    () => ({ isAdmin, loaded: true, values, pendingCount, saving, stage, saveAll }),
    [isAdmin, values, pendingCount, saving, stage, saveAll],
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}
