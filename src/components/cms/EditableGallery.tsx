import { useCallback, useEffect, useRef, useState } from "react";
import { Trash2, Upload, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useCms } from "./CmsProvider";

type GalleryRow = {
  id: string;
  bucket_key: string;
  url: string;
  storage_path: string;
  caption: string;
  order_index: number;
};

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export function EditableGallery({
  bucketKey,
  className,
  emptyLabel = "No images yet.",
}: {
  bucketKey: string;
  className?: string;
  emptyLabel?: string;
}) {
  const { isAdmin } = useCms();
  const [rows, setRows] = useState<GalleryRow[]>([]);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("id,bucket_key,url,storage_path,caption,order_index")
      .eq("bucket_key", bucketKey)
      .order("order_index", { ascending: true });
    setRows((data ?? []) as GalleryRow[]);
  }, [bucketKey]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      let order = rows.length;
      for (const file of Array.from(files)) {
        const path = `${bucketKey}/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("gallery").upload(path, file);
        if (upErr) throw upErr;
        const { data: signed, error: signErr } = await supabase.storage
          .from("gallery")
          .createSignedUrl(path, TEN_YEARS);
        if (signErr || !signed) throw signErr ?? new Error("Could not create image link");
        const { error: insErr } = await supabase.from("gallery_images").insert({
          bucket_key: bucketKey,
          url: signed.signedUrl,
          storage_path: path,
          caption: "",
          order_index: order++,
        });
        if (insErr) throw insErr;
      }
      await load();
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(`Upload failed: ${(err as Error).message}`);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function saveCaption(row: GalleryRow, caption: string) {
    if (caption === row.caption) return;
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, caption } : r)));
    const { error } = await supabase.from("gallery_images").update({ caption }).eq("id", row.id);
    if (error) toast.error(`Caption not saved: ${error.message}`);
  }

  async function remove(row: GalleryRow) {
    setRows((prev) => prev.filter((r) => r.id !== row.id));
    await supabase.storage.from("gallery").remove([row.storage_path]);
    const { error } = await supabase.from("gallery_images").delete().eq("id", row.id);
    if (error) {
      toast.error(`Delete failed: ${error.message}`);
      void load();
    }
  }

  async function move(index: number, delta: number) {
    const target = index + delta;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    const a = next[index]!;
    const b = next[target]!;
    next[index] = b;
    next[target] = a;
    setRows(next.map((r, i) => ({ ...r, order_index: i })));
    await Promise.all(
      next.map((r, i) => supabase.from("gallery_images").update({ order_index: i }).eq("id", r.id)),
    );
  }

  if (rows.length === 0 && !isAdmin) return null;

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {rows.map((row, i) => (
          <figure key={row.id} className="glass overflow-hidden rounded-2xl">
            <img
              src={row.url}
              alt={row.caption || "Gallery image"}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="p-3 text-xs text-foreground/70">
              {isAdmin ? (
                <input
                  defaultValue={row.caption}
                  placeholder="Caption"
                  onBlur={(e) => void saveCaption(row, e.currentTarget.value)}
                  className="no-print w-full rounded-lg border border-foreground/15 bg-transparent px-2 py-1 text-xs"
                />
              ) : (
                row.caption
              )}
              {isAdmin && (
                <div className="no-print mt-2 flex items-center gap-1.5">
                  <button type="button" onClick={() => void move(i, -1)} aria-label="Move left" className="rounded-md border border-foreground/15 p-1">
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={() => void move(i, 1)} aria-label="Move right" className="rounded-md border border-foreground/15 p-1">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={() => void remove(row)} aria-label="Delete image" className="ml-auto rounded-md border border-foreground/15 p-1 text-coral-500">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {rows.length === 0 && isAdmin && (
        <p className="text-sm text-foreground/55">{emptyLabel}</p>
      )}

      {isAdmin && (
        <div className="no-print mt-4">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => void handleUpload(e.currentTarget.files)}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="gloss-btn-ghost !text-sm"
          >
            <Upload className="h-4 w-4" /> {busy ? "Uploading…" : "Upload image"}
          </button>
        </div>
      )}
    </div>
  );
}
