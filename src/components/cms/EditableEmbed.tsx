import { useEffect, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useCms } from "./CmsProvider";

export type EmbedKind = "youtube" | "facebook-video" | "facebook-post";

type Props = {
  slotId: string;
  kinds?: EmbedKind[];
  className?: string;
  title?: string;
};

function detectKind(url: string): EmbedKind | null {
  if (/youtu\.?be/i.test(url)) return "youtube";
  if (/facebook\.com\/.+\/videos?\//i.test(url) || /fb\.watch/i.test(url)) return "facebook-video";
  if (/facebook\.com/i.test(url)) return "facebook-post";
  return null;
}

function youtubeId(url: string): string | null {
  const m =
    url.match(/[?&]v=([\w-]{6,})/) ??
    url.match(/youtu\.be\/([\w-]{6,})/) ??
    url.match(/embed\/([\w-]{6,})/) ??
    url.match(/shorts\/([\w-]{6,})/);
  return m ? m[1] : null;
}

function embedSrc(url: string, kind: EmbedKind): string | null {
  if (kind === "youtube") {
    const id = youtubeId(url);
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }
  const base =
    kind === "facebook-video"
      ? "https://www.facebook.com/plugins/video.php"
      : "https://www.facebook.com/plugins/post.php";
  return `${base}?href=${encodeURIComponent(url)}&show_text=false`;
}

/** Public visitors see the saved embed; admins can paste a new URL. */
export function EditableEmbed({ slotId, kinds, className, title = "Embedded video" }: Props) {
  const { isAdmin } = useCms();
  const [url, setUrl] = useState("");
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("video_urls")
      .select("url")
      .eq("slot_id", slotId)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setUrl(data?.url ?? "");
        setDraft(data?.url ?? "");
      });
    return () => {
      cancelled = true;
    };
  }, [slotId]);

  const kind = url ? detectKind(url) : null;
  const allowed = kinds ?? ["youtube", "facebook-video", "facebook-post"];
  const src = kind && allowed.includes(kind) ? embedSrc(url, kind) : null;

  const save = async () => {
    const next = draft.trim();
    const nextKind = next ? detectKind(next) : null;
    if (next && (!nextKind || !allowed.includes(nextKind))) {
      toast.error("Paste a YouTube or Facebook link.");
      return;
    }
    setBusy(true);
    const previous = url;
    setUrl(next);
    const { error } = await supabase
      .from("video_urls")
      .upsert({ slot_id: slotId, url: next, updated_at: new Date().toISOString() }, { onConflict: "slot_id" });
    setBusy(false);
    if (error) {
      setUrl(previous);
      toast.error(`Could not save link: ${error.message}`);
      return;
    }
    toast.success("Embed updated");
  };

  return (
    <div className={className}>
      <div className="glass relative overflow-hidden rounded-2xl">
        <div className="aspect-video w-full">
          {src ? (
            <iframe
              src={src}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-foreground/50">
              {isAdmin ? "No embed yet — paste a link below." : ""}
            </div>
          )}
        </div>
      </div>

      {isAdmin ? (
        <div className="no-print mt-2 flex flex-wrap items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Paste a YouTube or Facebook link"
            className="sticky-input min-w-0 flex-1 rounded-xl px-3 py-2 text-xs"
            aria-label={`Embed URL for ${slotId}`}
          />
          <button type="button" onClick={() => void save()} disabled={busy} className="gloss-btn !px-3 !py-2 !text-xs">
            Save embed
          </button>
        </div>
      ) : null}
    </div>
  );
}
