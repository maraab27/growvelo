import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/useAdminSession";

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

export function CmsProvider({ children }: { children: ReactNode }) {
  const { isAdmin } = useAdminSession();
  const [values, setValues] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const pending = useRef<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("content_blocks")
      .select("key,value")
      .then(({ data }) => {
        if (cancelled) return;
        const next: Record<string, string> = {};
        for (const row of data ?? []) next[row.key] = row.value;
        setValues(next);
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
    if (!silent) toast.success("All changes saved");
  }, []);

  const stage = useCallback(
    (key: string, value: string) => {
      setValues((prev) => (prev[key] === value ? prev : { ...prev, [key]: value }));
      pending.current[key] = value;
      setPendingCount(Object.keys(pending.current).length);
      void flush(true);
    },
    [flush],
  );

  const saveAll = useCallback(() => flush(false), [flush]);

  const value = useMemo(
    () => ({ isAdmin, loaded, values, pendingCount, saving, stage, saveAll }),
    [isAdmin, loaded, values, pendingCount, saving, stage, saveAll],
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}
