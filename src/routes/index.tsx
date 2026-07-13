import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ---------- tiny helpers ---------- */

function Pill({
  children,
  color = "bg-white",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_0_var(--ink)] ${color} ${className}`}
    >
      {children}
    </span>
  );
}

function Doodle({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute select-none font-display ${className}`}
    >
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
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-[50%] blur-2xl opacity-60 ${className}`}
      style={{ background: color }}
    />
  );
}

/* ---------- page ---------- */

function Index() {
  return (
    <main className="overflow-x-hidden bg-cream text-ink">
      <Nav />
      <Hero />
      <TrustStrip />
      <Features />
      <Categories />
      <ShowcaseBoard />
      <Testimonials />
      <BigCTA />
      <Footer />
    </main>
  );
}

/* ---------- nav ---------- */

function Nav() {
  return (
    <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
      <a href="/" className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-coral text-white shadow-[3px_3px_0_0_var(--ink)] font-display text-lg tilt-sm-l">
          S
        </span>
        <span className="font-display text-xl">Scrapbook</span>
      </a>
      <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
        <a href="#features" className="hover:text-coral">Product</a>
        <a href="#categories" className="hover:text-coral">Templates</a>
        <a href="#showcase" className="hover:text-coral">Showcase</a>
        <a href="#pricing" className="hover:text-coral">Pricing</a>
      </nav>
      <div className="flex items-center gap-3">
        <a href="#" className="hidden text-sm font-semibold sm:inline">Log in</a>
        <a
          href="#"
          className="inline-flex items-center rounded-full border-2 border-ink bg-ink px-4 py-2 text-sm font-bold text-cream shadow-[3px_3px_0_0_var(--coral)] hover:shadow-[5px_5px_0_0_var(--coral)] transition-shadow"
        >
          Try Free →
        </a>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pt-8 pb-24 md:pt-16 md:pb-32">
      <Blob className="left-[-8%] top-10 h-80 w-80" color="var(--teal)" />
      <Blob className="right-[-6%] top-40 h-96 w-96" color="var(--sun)" />

      <Doodle className="left-8 top-4 text-3xl text-coral tilt-r">✳</Doodle>
      <Doodle className="right-16 top-24 text-2xl text-plum">+</Doodle>
      <Doodle className="left-1/2 top-2 text-xl text-teal">✦</Doodle>
      <Doodle className="right-1/3 bottom-24 text-4xl text-lime tilt-lg-l">〰</Doodle>

      {/* floating badges */}
      <span className="absolute left-4 top-24 z-10 tilt-lg-l">
        <Pill color="bg-lime">🎉 New: AI Boards</Pill>
      </span>
      <span className="absolute right-6 top-40 z-10 tilt-r hidden sm:inline-block">
        <Pill color="bg-sun">⚡ 5x faster wins</Pill>
      </span>
      <span className="absolute left-10 bottom-10 z-10 tilt-sm-r hidden md:inline-block">
        <Pill color="bg-teal">🧷 Pinned by 40k teams</Pill>
      </span>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 flex justify-center">
          <Pill color="bg-white">★ Best App for Creative Teams 2026</Pill>
        </div>
        <h1 className="text-5xl uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
          The workspace that <span className="highlight-coral">actually</span>
          <br />
          feels like <span className="highlight-lime">yours</span>.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg text-ink/70">
          Sticky notes, tasks, docs and wild ideas — all pinned to one beautiful board.
          Mess allowed. Genius encouraged.
        </p>

        {/* inline pill tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-ink/60">Perfect for</span>
          <span className="rounded-full border-2 border-ink px-3 py-0.5 font-bold tilt-sm-l">Tasks</span>
          <span className="rounded-full border-2 border-ink px-3 py-0.5 font-bold">Wikis</span>
          <span className="rounded-full border-2 border-ink px-3 py-0.5 font-bold tilt-sm-r">Goals</span>
          <span className="rounded-full border-2 border-ink px-3 py-0.5 font-bold">Moodboards</span>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center rounded-full border-2 border-ink bg-coral px-6 py-3 font-display text-base uppercase text-white shadow-[5px_5px_0_0_var(--ink)] hover:translate-y-[-2px] transition-transform"
          >
            Get Started Free
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-full border-2 border-ink bg-white px-6 py-3 font-display text-base uppercase shadow-[5px_5px_0_0_var(--ink)] hover:translate-y-[-2px] transition-transform"
          >
            ▶ Watch Demo
          </a>
        </div>
      </div>

      {/* scattered polaroids */}
      <div className="relative mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
        <PolaroidStat tilt="tilt-l" color="bg-teal" stat="40k+" label="happy teams" />
        <PolaroidStat tilt="tilt-sm-r" color="bg-lime" stat="2M" label="cards pinned" />
        <PolaroidStat tilt="tilt-sm-l" color="bg-sun" stat="4.9★" label="app store" />
        <PolaroidStat tilt="tilt-r" color="bg-coral" stat="120+" label="templates" textLight />
      </div>
    </section>
  );
}

function PolaroidStat({
  tilt,
  color,
  stat,
  label,
  textLight,
}: {
  tilt: string;
  color: string;
  stat: string;
  label: string;
  textLight?: boolean;
}) {
  return (
    <div className={`sticker bg-white p-3 ${tilt}`}>
      <div className={`flex h-28 flex-col items-center justify-center rounded-lg ${color}`}>
        <div className={`font-display text-3xl ${textLight ? "text-white" : "text-ink"}`}>
          {stat}
        </div>
        <div className={`text-xs font-bold uppercase tracking-wide ${textLight ? "text-white/90" : "text-ink/80"}`}>
          {label}
        </div>
      </div>
    </div>
  );
}

/* ---------- trust strip ---------- */

function TrustStrip() {
  const logos = ["NORTHWIND", "PIXELMOB", "OATFIELD", "KURO&CO", "STUDIO 88", "BRIGHTLY"];
  return (
    <section className="border-y-2 border-ink bg-white">
      <div className="mx-auto max-w-7xl px-5 py-6">
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-ink/50">
          Trusted by 40,000+ scrappy teams worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-60">
          {logos.map((l) => (
            <span key={l} className="font-display text-lg tracking-tight text-ink/70">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- features (bold teal section) ---------- */

function Features() {
  const items = [
    {
      tag: "Boards",
      title: "Pin anything",
      body: "Drag notes, tasks, links and files onto boards that feel alive — not like spreadsheets.",
      color: "bg-lime",
      tilt: "tilt-l",
      icon: "📌",
    },
    {
      tag: "Docs",
      title: "Write like you talk",
      body: "Rich docs with inline tasks, embeds, and doodles. Never boring, always shareable.",
      color: "bg-sun",
      tilt: "tilt-sm-r",
      icon: "📝",
    },
    {
      tag: "AI Copilot",
      title: "Ideas on tap",
      body: "Ask, brainstorm, summarize. Your friendly copilot lives right next to your work.",
      color: "bg-coral",
      tilt: "tilt-r",
      icon: "✨",
      light: true,
    },
    {
      tag: "Automations",
      title: "Set it & forget it",
      body: "Recurring tasks, reminders, and workflows that quietly run in the background.",
      color: "bg-white",
      tilt: "tilt-sm-l",
      icon: "⚙️",
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden bg-teal py-24">
      <Blob className="left-[-10%] top-10 h-80 w-80" color="var(--lime)" />
      <Blob className="right-[-10%] bottom-0 h-96 w-96" color="var(--sun)" />
      <Doodle className="left-10 top-16 text-4xl text-ink tilt-r">✳</Doodle>
      <Doodle className="right-16 bottom-16 text-3xl text-ink">+</Doodle>

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Pill color="bg-white" className="tilt-sm-l">✦ Features</Pill>
          <h2 className="mt-5 text-4xl uppercase sm:text-5xl md:text-6xl">
            Everything you need. <br />
            None of the <span className="highlight-coral">boring</span> bits.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-ink/80">
            Built for teams who want their tools to have a personality — and get things done.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className={`sticker ${it.color} p-6 ${it.tilt}`}>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-white text-lg">
                {it.icon}
              </div>
              <Pill color="bg-white" className="mb-3">{it.tag}</Pill>
              <h3 className={`text-2xl uppercase ${it.light ? "text-white" : "text-ink"}`}>
                {it.title}
              </h3>
              <p className={`mt-2 text-sm ${it.light ? "text-white/90" : "text-ink/80"}`}>
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- categories with connector line ---------- */

function Categories() {
  const cats = [
    { label: "Design", emoji: "🎨", color: "bg-coral", tilt: "tilt-lg-l", light: true },
    { label: "Product", emoji: "🚀", color: "bg-lime", tilt: "tilt-sm-r" },
    { label: "Marketing", emoji: "📣", color: "bg-sun", tilt: "tilt-l" },
    { label: "Engineering", emoji: "💾", color: "bg-teal", tilt: "tilt-r" },
    { label: "Personal", emoji: "🌱", color: "bg-plum", tilt: "tilt-sm-l", light: true },
  ];

  return (
    <section id="categories" className="relative bg-cream py-24">
      <Doodle className="left-8 top-10 text-3xl text-coral">✳</Doodle>
      <Doodle className="right-10 top-20 text-2xl text-plum tilt-l">✦</Doodle>

      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Pill color="bg-lime">📚 Browse Templates</Pill>
          <h2 className="mt-5 text-4xl uppercase sm:text-5xl md:text-6xl">
            Pick a <span className="highlight-teal">vibe</span>,<br />
            start in seconds.
          </h2>
        </div>

        <div className="relative mt-20">
          {/* curved connector line */}
          <svg
            aria-hidden
            className="absolute inset-x-0 top-1/2 -z-0 hidden h-24 w-full -translate-y-1/2 md:block"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 20 60 Q 200 0 400 60 T 780 40 T 980 60"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>

          <div className="relative z-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {cats.map((c) => (
              <div key={c.label} className="flex flex-col items-center">
                {/* pin */}
                <span className="mb-2 inline-block h-3 w-3 rounded-full border-2 border-ink bg-white shadow-[2px_2px_0_0_var(--ink)]" />
                <div
                  className={`sticker ${c.color} flex h-32 w-full flex-col items-center justify-center px-3 ${c.tilt}`}
                >
                  <div className="text-3xl">{c.emoji}</div>
                  <div
                    className={`mt-2 font-display text-sm uppercase ${
                      c.light ? "text-white" : "text-ink"
                    }`}
                  >
                    {c.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a
            href="#"
            className="inline-flex items-center rounded-full border-2 border-ink bg-ink px-6 py-3 font-display text-sm uppercase text-cream shadow-[5px_5px_0_0_var(--coral)]"
          >
            Explore all 120+ templates →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- showcase board (dark section) ---------- */

function ShowcaseBoard() {
  return (
    <section id="showcase" className="relative overflow-hidden bg-ink py-24 text-cream">
      <Blob className="left-[-10%] top-20 h-96 w-96 opacity-30" color="var(--plum)" />
      <Blob className="right-[-10%] bottom-10 h-96 w-96 opacity-40" color="var(--coral)" />
      <Doodle className="left-14 top-10 text-3xl text-lime">✳</Doodle>
      <Doodle className="right-14 top-24 text-2xl text-sun tilt-r">+</Doodle>
      <Doodle className="left-1/3 bottom-14 text-3xl text-teal">✦</Doodle>

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Pill color="bg-lime">🖼 Live from real teams</Pill>
          <h2 className="mt-5 text-4xl uppercase sm:text-5xl md:text-6xl">
            One board, <br />
            a hundred <span className="highlight-sun">wins</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/70">
            Peek at how real teams use Scrapbook to launch, plan, and celebrate together.
          </p>
        </div>

        <div className="relative mx-auto mt-16 grid max-w-5xl grid-cols-6 grid-rows-6 gap-4">
          <BoardCard className="col-span-3 row-span-3 tilt-sm-l" color="bg-white">
            <div className="text-xs font-bold uppercase text-ink/50">Sprint 24 · Live board</div>
            <h4 className="mt-1 font-display text-xl uppercase text-ink">Launch playbook</h4>
            <div className="mt-4 space-y-2">
              {["Draft press release", "Design hero art", "Ship changelog", "Post to socials"].map(
                (t, i) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-ink">
                    <span
                      className={`inline-block h-4 w-4 rounded-md border-2 border-ink ${
                        i < 2 ? "bg-lime" : "bg-white"
                      }`}
                    />
                    {t}
                  </div>
                ),
              )}
            </div>
          </BoardCard>

          <BoardCard className="col-span-3 row-span-2 tilt-sm-r" color="bg-lime">
            <Pill color="bg-white" className="mb-2">Goal</Pill>
            <div className="font-display text-2xl uppercase text-ink">
              Hit 50k signups by Q3
            </div>
            <div className="mt-3 h-2 w-full rounded-full border-2 border-ink bg-white">
              <div className="h-full w-2/3 rounded-full bg-coral" />
            </div>
            <div className="mt-1 text-xs font-bold text-ink/70">67% there · you got this</div>
          </BoardCard>

          <BoardCard className="col-span-2 row-span-2 tilt-l" color="bg-coral">
            <div className="font-display text-lg uppercase text-white">
              "Feels like magic ✨"
            </div>
            <div className="mt-3 text-xs font-bold text-white/90">— Ada, Design Lead</div>
          </BoardCard>

          <BoardCard className="col-span-2 row-span-2 tilt-r" color="bg-sun">
            <Pill color="bg-white" className="mb-2">Reminder</Pill>
            <div className="font-display uppercase text-ink">Standup at 10am</div>
            <div className="mt-1 text-xs text-ink/80">Bring the doughnuts 🍩</div>
          </BoardCard>

          <BoardCard className="col-span-2 row-span-1 tilt-sm-l" color="bg-teal">
            <div className="text-xs font-bold uppercase text-ink/70">Idea</div>
            <div className="font-display text-sm uppercase text-ink">
              Send stickers to top users
            </div>
          </BoardCard>
        </div>
      </div>
    </section>
  );
}

function BoardCard({
  className = "",
  color,
  children,
}: {
  className?: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`sticker p-5 ${color} ${className}`}>{children}</div>
  );
}

/* ---------- testimonials ---------- */

function Testimonials() {
  const quotes = [
    {
      q: "It replaced 4 tools and made our team actually want to open the app on Mondays.",
      who: "Maya R.",
      role: "Head of Product · Oatfield",
      color: "bg-sun",
      tilt: "tilt-l",
    },
    {
      q: "The tilted cards started as a joke. Now I can't use anything else. It just feels human.",
      who: "Jamal K.",
      role: "Designer · Pixelmob",
      color: "bg-lime",
      tilt: "tilt-sm-r",
    },
    {
      q: "We planned a whole launch on one Scrapbook board. Screenshotted it. Framed it.",
      who: "Ada L.",
      role: "Founder · Northwind",
      color: "bg-coral",
      tilt: "tilt-r",
      light: true,
    },
  ];
  return (
    <section className="relative bg-cream py-24">
      <Doodle className="left-6 top-10 text-3xl text-coral tilt-l">✳</Doodle>
      <Doodle className="right-8 bottom-12 text-3xl text-teal">✦</Doodle>

      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Pill color="bg-teal">💬 Love notes</Pill>
          <h2 className="mt-5 text-4xl uppercase sm:text-5xl md:text-6xl">
            Teams are <span className="highlight-coral">obsessed</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {quotes.map((t) => (
            <figure key={t.who} className={`sticker ${t.color} p-6 ${t.tilt}`}>
              <div className={`font-display text-4xl leading-none ${t.light ? "text-white" : "text-ink"}`}>
                &ldquo;
              </div>
              <blockquote className={`mt-2 text-lg leading-snug ${t.light ? "text-white" : "text-ink"}`}>
                {t.q}
              </blockquote>
              <figcaption className={`mt-6 flex items-center gap-3 ${t.light ? "text-white" : "text-ink"}`}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-white font-display text-sm text-ink">
                  {t.who[0]}
                </span>
                <span>
                  <div className="font-display text-sm uppercase">{t.who}</div>
                  <div className={`text-xs ${t.light ? "text-white/80" : "text-ink/70"}`}>
                    {t.role}
                  </div>
                </span>
              </figcaption>
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
    <section id="pricing" className="relative overflow-hidden bg-lime py-28">
      <Blob className="left-[-8%] top-10 h-72 w-72 opacity-70" color="var(--sun)" />
      <Blob className="right-[-8%] bottom-0 h-96 w-96 opacity-70" color="var(--teal)" />
      <Doodle className="left-10 top-10 text-3xl text-ink tilt-r">✳</Doodle>
      <Doodle className="right-14 bottom-14 text-3xl text-ink">+</Doodle>
      <Doodle className="left-1/4 bottom-8 text-2xl text-coral">✦</Doodle>

      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Pill color="bg-white" className="tilt-sm-l">🎁 Free forever plan</Pill>
        <h2 className="mt-6 text-5xl uppercase sm:text-6xl md:text-7xl">
          Ready to make <br />
          work feel <span className="highlight-coral">fun</span> again?
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-ink/80">
          Grab a board, invite the team, pin your first idea. Takes 30 seconds.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center rounded-full border-2 border-ink bg-ink px-7 py-3 font-display text-base uppercase text-cream shadow-[5px_5px_0_0_var(--coral)] hover:translate-y-[-2px] transition-transform"
          >
            Start free →
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-full border-2 border-ink bg-white px-7 py-3 font-display text-base uppercase shadow-[5px_5px_0_0_var(--ink)] hover:translate-y-[-2px] transition-transform"
          >
            See pricing
          </a>
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink/60">
          No credit card · No boring onboarding
        </p>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-14 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink bg-coral font-display text-lg text-white shadow-[3px_3px_0_0_var(--ink)] tilt-sm-l">
            S
          </span>
          <div>
            <div className="font-display text-lg uppercase">Scrapbook</div>
            <div className="text-xs text-ink/60">Made with sticky notes & love.</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-4">
          <a href="#" className="font-semibold hover:text-coral">Product</a>
          <a href="#" className="font-semibold hover:text-coral">Templates</a>
          <a href="#" className="font-semibold hover:text-coral">Pricing</a>
          <a href="#" className="font-semibold hover:text-coral">About</a>
          <a href="#" className="text-ink/70 hover:text-coral">Changelog</a>
          <a href="#" className="text-ink/70 hover:text-coral">Careers</a>
          <a href="#" className="text-ink/70 hover:text-coral">Privacy</a>
          <a href="#" className="text-ink/70 hover:text-coral">Contact</a>
        </div>
      </div>
      <div className="border-t-2 border-ink py-4 text-center text-xs text-ink/60">
        © 2026 Scrapbook Labs · Pin it like you mean it.
      </div>
    </footer>
  );
}
