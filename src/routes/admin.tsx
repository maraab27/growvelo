import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Images, LayoutDashboard, Loader2, LogOut, Type } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/useAdminSession";
import { ADMIN_EMAIL } from "@/lib/admin-config";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — growVelo" },
      { name: "description", content: "Private admin sign-in and content dashboard for the growVelo learning site." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin — growVelo" },
      { property: "og:description", content: "Private admin sign-in and content dashboard for the growVelo learning site." },
    ],
  }),
  component: AdminPage,
});

function SignIn() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [setupBusy, setSetupBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Signed in");
  };

  const firstTimeSetup = async () => {
    if (password.length < 8) {
      toast.error("Choose a password with at least 8 characters.");
      return;
    }
    setSetupBusy(true);
    try {
      const result = await bootstrapAdmin({ data: { password } });
      if (result.created) {
        const { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
        if (error) throw new Error(error.message);
        toast.success("Admin account created");
      } else {
        toast.info("Admin account already exists — sign in with your password.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Setup failed");
    } finally {
      setSetupBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="glass mx-auto w-full max-w-sm rounded-2xl p-6">
      <span className="icon-tile">
        <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
      </span>
      <h1 className="mt-4 font-display font-semibold" style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>
        Admin sign in
      </h1>
      <p className="mt-2 text-sm text-foreground/60">Enter the admin password to edit the live site.</p>
      <input
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        aria-label="Admin password"
        className="sticky-input mt-5 w-full rounded-xl px-3 py-2.5 text-sm"
        required
      />
      <button type="submit" disabled={busy} className="gloss-btn mt-4 w-full justify-center">
        {busy ? <Loader2 className="mr-2 inline h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        Sign in
      </button>
    </form>
  );
}

function Dashboard() {
  const [gallery, setGallery] = useState<number | null>(null);
  const [blocks, setBlocks] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [g, b] = await Promise.all([
        supabase.from("gallery_images").select("*", { count: "exact", head: true }),
        supabase.from("content_blocks").select("*", { count: "exact", head: true }),
      ]);
      if (cancelled) return;
      setGallery(g.count ?? 0);
      setBlocks(b.count ?? 0);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.assign("/");
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="font-display font-semibold" style={{ fontSize: "clamp(1.6rem, 5vw, 2.6rem)" }}>
        Content dashboard
      </h1>
      <p className="mt-2 text-sm text-foreground/60">Signed in as {ADMIN_EMAIL}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <span className="icon-tile">
            <Images className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-3 text-3xl font-semibold">{gallery ?? "—"}</p>
          <p className="text-sm text-foreground/60">Gallery images</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <span className="icon-tile">
            <Type className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-3 text-3xl font-semibold">{blocks ?? "—"}</p>
          <p className="text-sm text-foreground/60">Edited text blocks</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link to="/" className="gloss-btn">
          Open live homepage (edit mode)
        </Link>
        <button type="button" onClick={() => void signOut()} className="gloss-btn-ghost">
          <LogOut className="mr-1 inline h-4 w-4" aria-hidden="true" />
          Exit admin
        </button>
      </div>
    </div>
  );
}

function AdminPage() {
  const { user, isAdmin, loading } = useAdminSession();

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-foreground/50" aria-hidden="true" />
      ) : isAdmin ? (
        <Dashboard />
      ) : user ? (
        <div className="glass mx-auto w-full max-w-sm rounded-2xl p-6 text-center">
          <h1 className="font-display text-xl font-semibold">Not an admin account</h1>
          <p className="mt-2 text-sm text-foreground/60">This account has no admin access.</p>
          <button
            type="button"
            className="gloss-btn-ghost mt-4"
            onClick={() => void supabase.auth.signOut()}
          >
            Sign out
          </button>
        </div>
      ) : (
        <SignIn />
      )}
    </main>
  );
}
