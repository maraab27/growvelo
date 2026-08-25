import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { SiteShell, Chip, getEditor, editors, type Editor } from "../components/site/sections";

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
      <section className="aurora-soft">
        <div className="mx-auto max-w-3xl px-5 py-32 text-center">
          <h1 className="font-display text-4xl font-semibold">
            Editor <span className="grad-text">not found</span>
          </h1>
          <p className="mt-3 text-foreground/60">The editor you're looking for isn't on the roster.</p>
          <Link to="/editors" className="gloss-btn mt-8 inline-flex">
            Back to editors <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
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
      <section className="aurora-bg">
        <div className="mx-auto max-w-[1200px] px-5 pt-24 pb-12">
          <Link to="/editors" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All editors
          </Link>
          <div className="mt-8 grid grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr]">
            <div className="relative">
              <div className="pin" style={{ ["--pin-color" as string]: `var(--${e.pin})` }} />
              <div className={`sticky-card tint-${e.tint} p-4`}>
                {e.avatar.startsWith("linear-gradient") ? (
                  <div
                    className="h-40 w-40 rounded-2xl ring-4 ring-white md:h-44 md:w-44"
                    style={{ background: e.avatar }}
                  />
                ) : (
                  <img
                    src={e.avatar}
                    alt={e.name}
                    loading="lazy"
                    className="h-40 w-40 rounded-2xl object-cover ring-4 ring-white md:h-44 md:w-44"
                  />
                )}
              </div>
            </div>
            <div>
              <Chip color={e.pin}>{e.role}</Chip>
              <h1 className="mt-4 font-display font-semibold tracking-tight"
                  style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)", lineHeight: 1.02 }}>
                {e.name.split(" ")[0]} <span className="grad-text">{e.name.split(" ").slice(1).join(" ")}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-foreground/70">{e.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {e.skills.map((s) => (
                  <span key={s} className="rounded-full border border-foreground/10 bg-white/70 px-3 py-1 text-xs font-medium text-foreground/75">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                <span><span className="mono-readout">Experience </span>{e.years}+ years</span>
                <span><span className="mono-readout">Role </span>{e.rate}</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/courses" className="gloss-btn !text-sm">
                  কোর্স দেখুন <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aurora-soft py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <Chip color="lemon">Selected work</Chip>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            The <span className="grad-text">showreel</span>.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {e.works.map((w, i) => (
              <div key={w.title} className="relative">
                <div className="pin" style={{ ["--pin-color" as string]: `var(--${e.pin})` }} />
                <div className={`sticky-card tint-${e.tint} p-3 ${i % 2 === 0 ? "tilt-xs-l" : "tilt-xs-r"}`}>
                  <div className="relative aspect-video overflow-hidden rounded-xl" style={{ background: w.thumb }}>
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    <div className="absolute left-2.5 top-2.5">
                      <Chip color={e.pin}>{w.type}</Chip>
                    </div>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="grid h-14 w-14 place-items-center rounded-full bg-white/85 shadow-lg">
                        <Play className="h-5 w-5 text-foreground" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold">{w.title}</div>
                    <div className="mono-readout mt-0.5">Client · {w.client}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aurora-bg py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <Chip color="blush">Other editors</Chip>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Also on the <span className="grad-text">roster</span>.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {otherEditors.map((o, i) => (
              <Link
                key={o.slug}
                to="/editors/$slug"
                params={{ slug: o.slug }}
                className="relative block"
              >
                <div className="pin" style={{ ["--pin-color" as string]: `var(--${o.pin})` }} />
                <div className={`sticky-card tint-${o.tint} flex items-center gap-3 p-4 ${i % 2 === 0 ? "tilt-xs-l" : "tilt-xs-r"}`}>
                  <div className="h-12 w-12 shrink-0 rounded-full ring-2 ring-white" style={{ background: o.avatar }} />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{o.name}</div>
                    <div className="truncate text-xs text-foreground/60">{o.role}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
