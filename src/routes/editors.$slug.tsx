import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell, Eyebrow, getEditor, editors, type Editor } from "../components/site/sections";

export const Route = createFileRoute("/editors/$slug")({
  loader: ({ params }) => {
    const editor = getEditor(params.slug);
    if (!editor) throw notFound();
    return { editor };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Editor not found — growVelo" }, { name: "robots", content: "noindex" }] };
    }
    const e = loaderData.editor;
    return {
      meta: [
        { title: `${e.name} — ${e.role} · growVelo` },
        { name: "description", content: e.bio },
        { property: "og:title", content: `${e.name} — ${e.role}` },
        { property: "og:description", content: e.bio },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl font-semibold">Editor not found</h1>
        <p className="mt-3 text-white/70">The editor you're looking for isn't on the roster.</p>
        <Link to="/editors" className="btn-primary mt-8 inline-flex">Back to editors</Link>
      </section>
    </SiteShell>
  ),
  component: EditorDetail,
});

function EditorDetail() {
  const { editor: e } = Route.useLoaderData() as { editor: Editor };

  const otherEditors = editors.filter((x) => x.slug !== e.slug).slice(0, 3);

  return (
    <SiteShell>
      <section className="relative mx-auto max-w-6xl px-5 pt-24 pb-12">
        <Link to="/editors" className="text-sm text-white/60 transition hover:text-white">← All editors</Link>
        <div className="mt-6 grid grid-cols-1 items-center gap-8 md:grid-cols-[auto_1fr]">
          <div
            className="h-32 w-32 rounded-3xl ring-2 ring-white/20 md:h-40 md:w-40"
            style={{ background: e.avatar }}
          />
          <div>
            <Eyebrow>{e.role}</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {e.name}
            </h1>
            <p className="mt-4 max-w-2xl text-white/75">{e.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {e.skills.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span><span className="text-white/50">Experience · </span>{e.years}+ years</span>
              <span><span className="text-white/50">Starting at · </span>{e.rate}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary text-sm">Request {e.name.split(" ")[0]}</Link>
              <Link to="/pricing" className="btn-ghost text-sm">See pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Selected <span className="text-gradient-accent">work</span>
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {e.works.map((w) => (
            <div key={w.title} className="glass glass-hover overflow-hidden rounded-2xl">
              <div className="relative aspect-video" style={{ background: w.thumb }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur">
                  {w.type}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold">{w.title}</div>
                <div className="text-xs text-white/50">Client · {w.client}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Other editors</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {otherEditors.map((o) => (
            <Link
              key={o.slug}
              to="/editors/$slug"
              params={{ slug: o.slug }}
              className="glass glass-hover flex items-center gap-3 rounded-2xl p-4"
            >
              <div className="h-12 w-12 shrink-0 rounded-full" style={{ background: o.avatar }} />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{o.name}</div>
                <div className="truncate text-xs text-white/60">{o.role}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
