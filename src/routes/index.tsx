import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ---------- helpers ---------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="glass-chip inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
      <span className="h-1.5 w-1.5 rounded-full gradient-accent" />
      {children}
    </span>
  );
}

function Blob({
  className = "",
  color,
}: {
  className?: string;
  color: string;
}) {
  return <div className={`blob ${className}`} style={{ background: color }} />;
}

/* ---------- page ---------- */

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <Nav />
      <Hero />
      <TrustStrip />
      <Features />
      <Showcase />
      <Categories />
      <Testimonials />
      <BigCTA />
      <Footer />
    </main>
  );
}

/* ---------- nav ---------- */

function Nav() {
  return (
    <div className="sticky top-4 z-50 flex justify-center px-4">
      <header className="glass flex w-full max-w-5xl items-center justify-between px-4 py-2.5 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl gradient-accent text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
            S
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            Scrapbook
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/75 md:flex">
          <a href="#features" className="transition hover:text-white">Product</a>
          <a href="#showcase" className="transition hover:text-white">Showcase</a>
          <a href="#categories" className="transition hover:text-white">Templates</a>
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#" className="hidden text-sm text-white/75 transition hover:text-white sm:inline">
            Sign in
          </a>
          <a href="#" className="btn-primary text-sm !py-2 !px-4">
            Get started
          </a>
        </div>
      </header>
    </div>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pt-20 pb-32 md:pt-28 md:pb-40">
      <Blob className="animate-float left-[-8%] top-16 h-[28rem] w-[28rem]" color="color-mix(in oklab, var(--accent-1) 70%, transparent)" />
      <Blob className="animate-float right-[-6%] top-40 h-[26rem] w-[26rem]" color="color-mix(in oklab, var(--accent-3) 65%, transparent)" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Eyebrow>New · AI Boards 2.0</Eyebrow>
        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
          <span className="text-gradient">The workspace</span>
          <br />
          that feels{" "}
          <span className="text-gradient-accent">alive</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          Tasks, docs, and wild ideas — layered on a beautiful glass canvas.
          Fast, focused, and quietly powerful.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#" className="btn-primary">
            Start free
            <span aria-hidden>→</span>
          </a>
          <a href="#" className="btn-ghost">
            <span aria-hidden>▶</span> Watch the film
          </a>
        </div>

        <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/40">
          No credit card · Free forever plan
        </p>
      </div>

      {/* Hero mockup */}
      <div className="relative z-10 mx-auto mt-20 max-w-5xl">
        <div className="glass-strong glass-hover relative overflow-hidden p-3 sm:p-4">
          {/* glossy top highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40 rounded-t-[1.4rem]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0) 70%)",
            }}
          />
          <div className="relative rounded-[1.2rem] border border-white/10 bg-black/30 p-6 sm:p-10">
            <div className="mb-6 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <MockCard
                label="Sprint 24"
                title="Launch playbook"
                items={["Draft press release", "Design hero art", "Ship changelog"]}
              />
              <MockCard
                label="Goal"
                title="Hit 50k signups"
                progress={0.67}
              />
              <MockCard
                label="Idea"
                title="Send stickers to top users"
                accent
              />
            </div>
          </div>
        </div>

        {/* soft floor shadow */}
        <div
          aria-hidden
          className="mx-auto mt-2 h-10 w-3/4 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--accent-1) 60%, transparent), transparent 70%)",
          }}
        />
      </div>
    </section>
  );
}

function MockCard({
  label,
  title,
  items,
  progress,
  accent,
}: {
  label: string;
  title: string;
  items?: string[];
  progress?: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`glass glass-hover p-5 ${accent ? "" : ""}`}
      style={
        accent
          ? {
              backgroundImage:
                "linear-gradient(140deg, color-mix(in oklab, var(--accent-1) 35%, transparent), color-mix(in oklab, var(--accent-3) 25%, transparent))",
            }
          : undefined
      }
    >
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
        {label}
      </div>
      <div className="mt-1.5 font-display text-lg font-semibold text-white">
        {title}
      </div>
      {items && (
        <ul className="mt-4 space-y-2">
          {items.map((t, i) => (
            <li key={t} className="flex items-center gap-2 text-sm text-white/80">
              <span
                className={`inline-flex h-4 w-4 items-center justify-center rounded-md border border-white/20 ${
                  i === 0 ? "gradient-accent" : "bg-white/5"
                }`}
              >
                {i === 0 && (
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="none">
                    <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {t}
            </li>
          ))}
        </ul>
      )}
      {progress !== undefined && (
        <div className="mt-5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full gradient-accent"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-white/60">{Math.round(progress * 100)}% there</div>
        </div>
      )}
    </div>
  );
}

/* ---------- trust strip ---------- */

function TrustStrip() {
  const logos = ["NORTHWIND", "PIXELMOB", "OATFIELD", "KURO&CO", "STUDIO 88", "BRIGHTLY"];
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-10">
      <p className="mb-6 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-white/40">
        Trusted by 40,000+ modern teams
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {logos.map((l) => (
          <span key={l} className="font-display text-sm font-semibold tracking-[0.15em] text-white/55">
            {l}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- features ---------- */

function Features() {
  const items = [
    {
      tag: "Boards",
      title: "Pin anything, anywhere",
      body: "Drag notes, tasks, links, and files onto boards that feel spatial and alive — not another spreadsheet.",
      icon: "📌",
    },
    {
      tag: "Docs",
      title: "Write like you think",
      body: "Rich docs with inline tasks, embeds, and slash commands. Fast, focused, and quietly powerful.",
      icon: "✍️",
    },
    {
      tag: "AI Copilot",
      title: "Ideas on tap",
      body: "Ask, brainstorm, summarize. Your copilot lives one keystroke away — never in the way.",
      icon: "✨",
    },
    {
      tag: "Automations",
      title: "Set it & forget it",
      body: "Recurring tasks, reminders, and workflows that hum along quietly in the background.",
      icon: "⚙️",
    },
  ];

  return (
    <section id="features" className="relative py-32">
      <Blob className="left-[-10%] top-20 h-[26rem] w-[26rem]" color="color-mix(in oklab, var(--accent-2) 60%, transparent)" />
      <Blob className="right-[-10%] bottom-10 h-[26rem] w-[26rem]" color="color-mix(in oklab, var(--accent-1) 55%, transparent)" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Features</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl md:text-6xl">
            Everything you need.{" "}
            <span className="text-gradient-accent">Nothing you don't.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Built for teams who want tools that feel as considered as the work they do.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="glass glass-hover group relative overflow-hidden p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-70"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.14), transparent 80%)",
                }}
              />
              <div className="relative">
                <div className="glass-chip inline-flex h-11 w-11 items-center justify-center text-lg">
                  {it.icon}
                </div>
                <div className="mt-5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                  {it.tag}
                </div>
                <h3 className="mt-1.5 font-display text-xl font-semibold text-white">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- showcase ---------- */

function Showcase() {
  return (
    <section id="showcase" className="relative py-32">
      <Blob className="left-1/2 top-10 h-[32rem] w-[32rem] -translate-x-1/2" color="color-mix(in oklab, var(--accent-1) 55%, transparent)" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Live boards</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl md:text-6xl">
            One canvas.{" "}
            <span className="text-gradient-accent">A hundred wins.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            A glimpse at how real teams use Scrapbook to launch, plan, and celebrate.
          </p>
        </div>

        {/* Tab strip + timeline "editor panel" header */}
        <div className="mt-14">
          <div className="glass flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-2">
              {["Timeline", "Boards", "Assets"].map((t, i) => (
                <span
                  key={t}
                  className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide transition ${
                    i === 0
                      ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                      : "text-white/60 hover:text-white/85"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="rec-dot" aria-hidden />
              <span className="mono-readout">REC · 00:12:04:11</span>
              <span className="mono-readout hidden sm:inline">1920×1080 · 60fps</span>
            </div>
          </div>

          {/* Timeline track */}
          <div className="mt-3 glass px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="mono-readout w-14 shrink-0">V1</span>
              <div className="relative flex-1 h-6 rounded-md bg-black/40 border border-white/10 overflow-hidden">
                {[
                  { l: 6, w: 18, c: "var(--accent-1)" },
                  { l: 27, w: 14, c: "var(--accent-3)" },
                  { l: 44, w: 22, c: "var(--accent-2)" },
                  { l: 70, w: 12, c: "var(--accent-1)" },
                  { l: 85, w: 10, c: "var(--accent-3)" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="absolute top-1 bottom-1 rounded-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                    style={{
                      left: `${s.l}%`,
                      width: `${s.w}%`,
                      background: `linear-gradient(180deg, ${s.c}, color-mix(in oklab, ${s.c} 55%, black))`,
                    }}
                  />
                ))}
                <div
                  className="absolute inset-y-0 w-px bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  style={{ left: "38%" }}
                />
              </div>
              <span className="mono-readout w-16 shrink-0 text-right">00:38</span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span className="mono-readout w-14 shrink-0">A1</span>
              <div className="relative flex-1 h-4 rounded-md bg-black/40 border border-white/10 overflow-hidden">
                <div
                  className="absolute top-0.5 bottom-0.5 rounded-sm bg-white/15"
                  style={{ left: "6%", width: "78%" }}
                />
              </div>
              <span className="mono-readout w-16 shrink-0 text-right">STEREO</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-6">
          <BoardTile className="md:col-span-4 corner-frame" editor>
            <span className="corner-tr" />
            <span className="corner-bl" />
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                Sprint 24 · Live board
              </div>
              <span className="mono-readout">CLIP_024 · 00:00:12:04</span>
            </div>
            <h4 className="mt-2 font-display text-2xl font-semibold text-white">
              Launch playbook
            </h4>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                "Draft press release",
                "Design hero art",
                "Ship changelog",
                "Post to socials",
              ].map((t, i) => (
                <div
                  key={t}
                  className="glass-chip flex items-center gap-2 px-3 py-2 text-sm text-white/85"
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-md ${
                      i < 2 ? "gradient-accent" : "border border-white/20 bg-white/5"
                    }`}
                  />
                  {t}
                </div>
              ))}
            </div>
          </BoardTile>

          <div className="md:col-span-2 tilt-sm-r">
            <BoardTile gradient>
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/70">
                  Goal
                </div>
                <span className="mono-readout text-white/70">67%</span>
              </div>
              <div className="mt-2 font-display text-xl font-semibold text-white">
                Hit 50k signups by Q3
              </div>
              <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-2/3 rounded-full bg-white/90" />
              </div>
              <div className="mt-2 text-xs text-white/80">67% there</div>
            </BoardTile>
          </div>

          <div className="md:col-span-2 tilt-sm-l">
            <BoardTile>
              <div className="font-display text-lg font-medium leading-snug text-white">
                &ldquo;Feels like magic — my team actually opens it on Mondays.&rdquo;
              </div>
              <div className="mt-4 text-xs text-white/60">— Ada, Design Lead</div>
            </BoardTile>
          </div>

          <BoardTile className="md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                Reminder
              </div>
              <span className="mono-readout">10:00 AM</span>
            </div>
            <div className="mt-2 font-display text-lg font-semibold text-white">
              Standup at 10:00
            </div>
            <div className="mt-1 text-sm text-white/60">Bring the doughnuts.</div>
          </BoardTile>

          <div className="md:col-span-2 tilt-sm-r">
            <BoardTile>
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                Idea
              </div>
              <div className="mt-2 font-display text-lg font-semibold text-white">
                Send stickers to top users
              </div>
            </BoardTile>
          </div>
        </div>
      </div>
    </section>
  );
}

function BoardTile({
  className = "",
  gradient,
  editor,
  children,
}: {
  className?: string;
  gradient?: boolean;
  editor?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`glass glass-hover relative overflow-hidden ${editor ? "p-8" : "p-6"} ${className}`}
      style={
        gradient
          ? {
              backgroundImage:
                "linear-gradient(140deg, color-mix(in oklab, var(--accent-1) 55%, transparent), color-mix(in oklab, var(--accent-2) 40%, transparent))",
            }
          : undefined
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-60"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.16), transparent 80%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}


/* ---------- categories ---------- */

function Categories() {
  const cats = [
    { label: "Design", emoji: "🎨" },
    { label: "Product", emoji: "🚀" },
    { label: "Marketing", emoji: "📣" },
    { label: "Engineering", emoji: "💾" },
    { label: "Personal", emoji: "🌱" },
  ];

  return (
    <section id="categories" className="relative py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Templates</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl md:text-6xl">
            Pick a starting point.{" "}
            <span className="text-gradient-accent">Ship in seconds.</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {cats.map((c) => (
            <div key={c.label} className="glass glass-hover flex flex-col items-center gap-3 p-6">
              <div className="glass-chip flex h-12 w-12 items-center justify-center text-2xl">
                {c.emoji}
              </div>
              <div className="font-display text-sm font-semibold text-white">{c.label}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                24 templates
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="#" className="btn-ghost">
            Explore all 120+ templates <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */

function Testimonials() {
  const quotes = [
    {
      q: "It replaced four tools and made our team actually want to open the app on Mondays.",
      who: "Maya R.",
      role: "Head of Product · Oatfield",
    },
    {
      q: "The glass canvas is the closest thing to a shared brain we've used. It just feels human.",
      who: "Jamal K.",
      role: "Designer · Pixelmob",
    },
    {
      q: "We planned an entire launch on one Scrapbook board and shipped a week early.",
      who: "Ada L.",
      role: "Founder · Northwind",
    },
  ];

  return (
    <section className="relative py-32">
      <Blob className="right-[-8%] top-10 h-[24rem] w-[24rem]" color="color-mix(in oklab, var(--accent-3) 55%, transparent)" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Love notes</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl md:text-6xl">
            Teams are{" "}
            <span className="text-gradient-accent">obsessed</span>.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {quotes.map((t) => (
            <figure key={t.who} className="glass glass-hover relative overflow-hidden p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-60"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.14), transparent 80%)",
                }}
              />
              <div className="relative">
                <div className="text-gradient-accent font-display text-5xl leading-none">&ldquo;</div>
                <blockquote className="mt-2 text-lg leading-snug text-white/90">
                  {t.q}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full gradient-accent text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                    {t.who[0]}
                  </span>
                  <span>
                    <div className="font-display text-sm font-semibold text-white">
                      {t.who}
                    </div>
                    <div className="text-xs text-white/60">{t.role}</div>
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- big cta ---------- */

function BigCTA() {
  return (
    <section id="pricing" className="relative py-32">
      <Blob className="left-[-6%] top-10 h-[24rem] w-[24rem]" color="color-mix(in oklab, var(--accent-1) 60%, transparent)" />
      <Blob className="right-[-6%] bottom-0 h-[26rem] w-[26rem]" color="color-mix(in oklab, var(--accent-3) 55%, transparent)" />

      <div className="relative mx-auto max-w-4xl px-5">
        <div className="glass-strong relative overflow-hidden px-8 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-70"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.2), transparent 80%)",
            }}
          />
          <div className="relative">
            <Eyebrow>Free forever</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-semibold sm:text-5xl md:text-6xl">
              Ready to make work{" "}
              <span className="text-gradient-accent">feel like yours</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-white/70">
              Grab a board, invite the team, pin your first idea. Takes 30 seconds.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="#" className="btn-primary">
                Start free <span aria-hidden>→</span>
              </a>
              <a href="#" className="btn-ghost">See pricing</a>
            </div>
            <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-white/40">
              No credit card · No boring onboarding
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl gradient-accent text-base font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
            S
          </span>
          <div>
            <div className="font-display text-base font-semibold">Scrapbook</div>
            <div className="text-xs text-white/50">Made with glass & light.</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-4">
          <a href="#" className="text-white/80 transition hover:text-white">Product</a>
          <a href="#" className="text-white/80 transition hover:text-white">Templates</a>
          <a href="#" className="text-white/80 transition hover:text-white">Pricing</a>
          <a href="#" className="text-white/80 transition hover:text-white">About</a>
          <a href="#" className="text-white/60 transition hover:text-white">Changelog</a>
          <a href="#" className="text-white/60 transition hover:text-white">Careers</a>
          <a href="#" className="text-white/60 transition hover:text-white">Privacy</a>
          <a href="#" className="text-white/60 transition hover:text-white">Contact</a>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © 2026 Scrapbook Labs · Crafted with precision.
      </div>
    </footer>
  );
}
