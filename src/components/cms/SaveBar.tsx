import { Link } from "@tanstack/react-router";
import { Check, Loader2, LogOut, Pencil } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useCms } from "./CmsProvider";

/** Floating admin-only bar: unsaved indicator + save all + exit. */
export function SaveBar() {
  const { isAdmin, pendingCount, saving, saveAll } = useCms();
  if (!isAdmin) return null;

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.assign("/");
  };

  return (
    <div className="no-print fixed inset-x-0 top-0 z-[60] flex justify-center px-3 pt-3">
      <div className="glass flex w-full max-w-3xl flex-wrap items-center gap-2 rounded-2xl px-3 py-2 text-xs">
        <span className="icon-tile !h-8 !w-8">
          <Pencil className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="font-semibold">Edit mode</span>
        <span className="text-foreground/60">
          {pendingCount > 0 ? `${pendingCount} unsaved change${pendingCount > 1 ? "s" : ""}` : "All changes saved"}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/admin" className="gloss-btn-ghost !px-3 !py-1.5 !text-xs">
            Dashboard
          </Link>
          <button
            type="button"
            onClick={() => void saveAll()}
            className="gloss-btn !px-3 !py-1.5 !text-xs"
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="mr-1 inline h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Check className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
            )}
            Save all changes
          </button>
          <button
            type="button"
            onClick={() => void signOut()}
            className="gloss-btn-ghost !px-3 !py-1.5 !text-xs"
          >
            <LogOut className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
            Exit admin
          </button>
        </div>
      </div>
    </div>
  );
}
