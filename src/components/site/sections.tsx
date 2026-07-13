import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import growveloMark from "../../assets/growvelo-mark.png.asset.json";

/* ---------- helpers ---------- */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="glass-chip inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
      <span className="h-1.5 w-1.5 rounded-full gradient-accent" />
      {children}
    </span>
  );
}

export function Blob({ className = "", color }: { className?: string; color: string }) {
  return <div className={`blob ${className}`} style={{ background: color }} />;
}

/** Signature PDF section header: centered eyebrow → two-line gradient headline → sub copy */
export function SectionHead({
  eyebrow,
  line1,
  line2,
  sub,
  align = "center",
}: {
  eyebrow: string;
  line1: string;
  line2: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const wrap = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left";
  return (
    <div className={wrap}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
        <span className="text-gradient">{line1}</span>
        <br />
        <span className="text-gradient-accent">{line2}</span>
      </h2>
      {sub && <p className="mx-auto mt-5 max-w-xl text-sm text-white/70 sm:text-base">{sub}</p>}
    </div>
  );
}

const NAV_ITEMS: { to: string; label: string; exact?: boolean }[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/editors", label: "Editors" },
  { to: "/pricing", label: "Pricing" },
  { to: "/courses", label: "Courses" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/* ---------- nav ---------- */

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4">
      <header className="glass flex w-full max-w-6xl flex-col overflow-hidden px-3 py-2 sm:px-6 sm:py-2.5">
        <div className="flex w-full items-center justify-between gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5" onClick={() => setOpen(false)}>
            <img src={growveloMark.url} alt="growVelo" className="h-8 w-8 shrink-0 rounded-lg sm:h-9 sm:w-9 sm:rounded-xl" />
            <span className="truncate font-display text-sm font-semibold tracking-tight sm:text-base">
              grow<span className="text-gradient-accent">Velo</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/75 lg:flex">
            {NAV_ITEMS.map((n) => (
              <Link
                key={n.to}
                to={n.to as "/"}
                activeOptions={n.exact ? { exact: true } : undefined}
                className="transition hover:text-white"
                activeProps={{ className: "text-white" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link to="/contact" className="btn-primary !py-1.5 !px-3 text-xs sm:!py-2 sm:!px-4 sm:text-sm">
              Hire us
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/85 transition hover:bg-white/10 lg:hidden"
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {open && (
          <nav className="mt-3 grid grid-cols-2 gap-1 border-t border-white/10 pt-3 text-sm text-white/80 lg:hidden">
            {NAV_ITEMS.map((n) => (
              <Link
                key={n.to}
                to={n.to as "/"}
                activeOptions={n.exact ? { exact: true } : undefined}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-white"
                activeProps={{ className: "bg-white/5 text-white" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </div>
  );
}

/* ---------- editors data ---------- */

export type Editor = {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  years: number;
  rate: string;
  works: { title: string; type: string; thumb: string; client: string }[];
};

export const editors: Editor[] = [
  {
    slug: "arif-hasan",
    name: "Arif Hasan",
    role: "Lead Cinematic Editor",
    avatar: "linear-gradient(135deg,#7c5cff,#22d3ee)",
    bio: "Cinematic long-form and brand storytelling. 6+ years cutting for creators with 1M+ audiences.",
    skills: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design"],
    years: 6,
    rate: "$45/hr",
    works: [
      { title: "Sunset Over Sylhet", type: "Travel · 4K", thumb: "linear-gradient(135deg,#ff9966,#ff5e62)", client: "Roami" },
      { title: "Founder Story — Nova", type: "Brand Doc", thumb: "linear-gradient(135deg,#7c5cff,#22d3ee)", client: "Nova Labs" },
      { title: "Product Launch Reel", type: "Ad · 60s", thumb: "linear-gradient(135deg,#22d3ee,#a78bfa)", client: "Loop" },
    ],
  },
  {
    slug: "nusrat-jahan",
    name: "Nusrat Jahan",
    role: "Short-Form & Reels Specialist",
    avatar: "linear-gradient(135deg,#ec4899,#f97316)",
    bio: "Hook-driven vertical edits for TikTok, Reels & Shorts. Trend-native pacing and captions.",
    skills: ["CapCut Pro", "After Effects", "Motion Captions", "Trend Editing"],
    years: 4,
    rate: "$30/hr",
    works: [
      { title: "Skincare Series · 12 Reels", type: "Short-Form", thumb: "linear-gradient(135deg,#ec4899,#f472b6)", client: "Glowl" },
      { title: "Fitness Hooks Pack", type: "TikTok", thumb: "linear-gradient(135deg,#f97316,#fbbf24)", client: "Rise" },
      { title: "Podcast Clips · 20x", type: "Shorts", thumb: "linear-gradient(135deg,#a78bfa,#ec4899)", client: "MidnightFM" },
    ],
  },
  {
    slug: "rakib-ahmed",
    name: "Rakib Ahmed",
    role: "Motion Graphics & VFX",
    avatar: "linear-gradient(135deg,#22c55e,#0ea5e9)",
    bio: "Kinetic typography, explainer animations and clean VFX comps for tech brands.",
    skills: ["After Effects", "Cinema 4D", "Element 3D", "Kinetic Type"],
    years: 5,
    rate: "$55/hr",
    works: [
      { title: "SaaS Explainer · 90s", type: "Motion", thumb: "linear-gradient(135deg,#0ea5e9,#22d3ee)", client: "Stackly" },
      { title: "App Feature Loop", type: "UI Motion", thumb: "linear-gradient(135deg,#22c55e,#84cc16)", client: "Paperlane" },
      { title: "Title Sequence — Orbit", type: "VFX", thumb: "linear-gradient(135deg,#1e293b,#0ea5e9)", client: "Orbit" },
    ],
  },
  {
    slug: "sadia-karim",
    name: "Sadia Karim",
    role: "Wedding & Event Editor",
    avatar: "linear-gradient(135deg,#f43f5e,#a78bfa)",
    bio: "Emotive wedding films and event highlight reels. Warm color, story-first pacing.",
    skills: ["Premiere Pro", "Color Grading", "Music Sync", "Storytelling"],
    years: 7,
    rate: "$40/hr",
    works: [
      { title: "Zara & Farhan · Wedding Film", type: "Wedding", thumb: "linear-gradient(135deg,#f43f5e,#fb7185)", client: "Private" },
      { title: "Corporate Retreat 2025", type: "Event", thumb: "linear-gradient(135deg,#a78bfa,#f43f5e)", client: "Northwind" },
      { title: "Highlight Reel · Sangeet", type: "Wedding", thumb: "linear-gradient(135deg,#fbbf24,#f43f5e)", client: "Private" },
    ],
  },
  {
    slug: "tanvir-rahman",
    name: "Tanvir Rahman",
    role: "YouTube Long-Form Editor",
    avatar: "linear-gradient(135deg,#eab308,#ef4444)",
    bio: "Retention-optimized YouTube edits — commentary, tech reviews, and vlogs.",
    skills: ["Premiere Pro", "B-roll Sourcing", "Jump Cuts", "Thumbnail Support"],
    years: 5,
    rate: "$35/hr",
    works: [
      { title: "Tech Review · 18 min", type: "YouTube", thumb: "linear-gradient(135deg,#ef4444,#f97316)", client: "GearNerd" },
      { title: "Vlog · Tokyo Diaries", type: "YouTube", thumb: "linear-gradient(135deg,#eab308,#22c55e)", client: "Mira" },
      { title: "Commentary · 22 min", type: "YouTube", thumb: "linear-gradient(135deg,#7c5cff,#ef4444)", client: "LoreCast" },
    ],
  },
  {
    slug: "mahi-chowdhury",
    name: "Mahi Chowdhury",
    role: "Documentary & Podcast Editor",
    avatar: "linear-gradient(135deg,#0ea5e9,#8b5cf6)",
    bio: "Long-form narrative editing with clean audio mixing. Doc series and interview shows.",
    skills: ["DaVinci Resolve", "Audio Mixing", "Interview Cutting", "Subtitles"],
    years: 8,
    rate: "$50/hr",
    works: [
      { title: "The Makers · Episode 04", type: "Documentary", thumb: "linear-gradient(135deg,#0ea5e9,#6366f1)", client: "Makers Co." },
      { title: "Podcast Full Ep · 55 min", type: "Podcast", thumb: "linear-gradient(135deg,#8b5cf6,#22d3ee)", client: "InsideOut" },
      { title: "Founders Interview", type: "Documentary", thumb: "linear-gradient(135deg,#1e293b,#8b5cf6)", client: "Foundry" },
    ],
  },
];

export function getEditor(slug: string) {
  return editors.find((e) => e.slug === slug);
}

/* ---------- hero ---------- */

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-5 sm:pt-20 sm:pb-20 md:pt-24 md:pb-24">
      <Blob className="animate-float left-[-20%] top-8 h-[20rem] w-[20rem] sm:left-[-8%] sm:top-16 sm:h-[32rem] sm:w-[32rem]" color="color-mix(in oklab, var(--accent-1) 75%, transparent)" />
      <Blob className="animate-float right-[-20%] top-28 h-[18rem] w-[18rem] sm:right-[-6%] sm:top-40 sm:h-[30rem] sm:w-[30rem]" color="color-mix(in oklab, var(--accent-3) 70%, transparent)" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Eyebrow>New · Showreel 2026</Eyebrow>
        <h1 className="mt-6 font-display text-[2.5rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span className="text-gradient">The edits</span>
          <br />
          that feel <span className="text-gradient-accent">alive</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg">
          Cinematic cuts, short-form reels, and motion — layered by a boutique team of editors.
          Fast, focused, and quietly powerful.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
          <Link to="/contact" className="btn-primary justify-center">Start free →</Link>
          <Link to="/portfolio" className="btn-ghost justify-center">
            <span className="text-xs">▶</span> Watch the reel
          </Link>
        </div>
        <div className="mono-readout mt-6 sm:mt-8">
          24h first cut · no commitment
        </div>
      </div>

      {/* Floating glass showcase card */}
      <div className="relative z-10 mx-auto mt-14 max-w-5xl sm:mt-20">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-3 sm:p-4">
          <div className="mb-3 flex items-center gap-1.5 px-2 pt-1">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          </div>
          <div className="grid grid-cols-1 gap-3 p-1 sm:grid-cols-3 sm:gap-4">
            <div className="glass rounded-2xl p-5 text-left">
              <div className="mono-readout mb-3">Sprint · Week 24</div>
              <div className="font-semibold">Brand film — Nova</div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full gradient-accent text-[10px] text-white">✓</span>
                  <span className="text-white/60 line-through">Ingest &amp; sync footage</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full gradient-accent text-[10px] text-white">✓</span>
                  <span className="text-white/60 line-through">Rough cut · v1</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border border-white/25" />
                  <span>Color grade</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border border-white/25" />
                  <span>Sound design + mix</span>
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-5 text-left">
              <div className="mono-readout mb-3">Goal</div>
              <div className="font-semibold">Deliver in 48 hours</div>
              <div className="mt-6">
                <div className="flex items-end justify-between">
                  <span className="font-display text-3xl font-semibold text-gradient-accent">67%</span>
                  <span className="text-xs text-white/50">32h left</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full gradient-accent" />
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                  <span className="rec-dot" /> Recording session 03
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-5 text-left"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--accent-1) 55%, transparent), color-mix(in oklab, var(--accent-3) 45%, transparent))",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <div className="mono-readout mb-3 !text-white/85">Idea</div>
              <div className="font-semibold">Layer a slow zoom on the founder close-up — echoes the opening line.</div>
              <div className="mt-6 flex items-center gap-2 text-xs text-white/80">
                <div className="h-6 w-6 rounded-full ring-2 ring-white/30" style={{ background: "linear-gradient(135deg,#ec4899,#f97316)" }} />
                <span>Nusrat · 2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 sm:mt-24">
        <div className="mono-readout text-center">Trusted by 90+ creators &amp; brands</div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/45 sm:gap-x-12 sm:text-sm">
          <span>Northwind</span>
          <span>Pixelmob</span>
          <span>Oatfield</span>
          <span>Kuro&amp;Co</span>
          <span>Studio 88</span>
          <span>Brightly</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- portfolio (with timeline showcase) ---------- */

const PORTFOLIO_ITEMS = [
  { title: "Nova Labs — Brand Film", cat: "Brand", len: "1:48", thumb: "linear-gradient(135deg,#7c5cff,#22d3ee)", tag: "Cinematic" },
  { title: "Glowl Skincare · Reels Pack", cat: "Short-Form", len: "12 clips", thumb: "linear-gradient(135deg,#ec4899,#f472b6)", tag: "Reels" },
  { title: "Stackly SaaS Explainer", cat: "Motion", len: "0:92", thumb: "linear-gradient(135deg,#0ea5e9,#22d3ee)", tag: "Motion" },
  { title: "Zara & Farhan · Wedding Film", cat: "Wedding", len: "6:20", thumb: "linear-gradient(135deg,#f43f5e,#fb7185)", tag: "Emotive" },
  { title: "GearNerd — Tech Review", cat: "YouTube", len: "18:04", thumb: "linear-gradient(135deg,#ef4444,#f97316)", tag: "Long-form" },
  { title: "The Makers · Ep 04", cat: "Documentary", len: "22:11", thumb: "linear-gradient(135deg,#0ea5e9,#6366f1)", tag: "Narrative" },
  { title: "Loop — Product Launch", cat: "Ad", len: "0:60", thumb: "linear-gradient(135deg,#22d3ee,#a78bfa)", tag: "Ad" },
  { title: "Rise — Fitness Hooks", cat: "Short-Form", len: "8 clips", thumb: "linear-gradient(135deg,#f97316,#fbbf24)", tag: "TikTok" },
];

function TimelineShowcase() {
  return (
    <div className="mt-14 space-y-4">
      {/* Timeline bar */}
      <div className="glass rounded-full px-4 py-2.5 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full bg-white/10 px-3 py-1 font-medium">Timeline</span>
            <span className="text-white/50">Boards</span>
            <span className="text-white/50">Assets</span>
          </div>
          <div className="mono-readout hidden items-center gap-2 sm:flex">
            <span className="rec-dot" /> REC · 00:12:04:11 · 1920×1080 · 60FPS
          </div>
          <div className="mono-readout sm:hidden">
            <span className="rec-dot mr-2" /> REC · 60FPS
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="mono-readout w-6 shrink-0">V1</span>
            <div className="flex-1 flex gap-1.5">
              <div className="h-6 rounded-md" style={{ background: "linear-gradient(90deg,#a78bfa,#7c5cff)", width: "22%" }} />
              <div className="h-6 rounded-md" style={{ background: "linear-gradient(90deg,#22d3ee,#0ea5e9)", width: "12%" }} />
              <div className="h-6 rounded-md" style={{ background: "linear-gradient(90deg,#0ea5e9,#22d3ee)", width: "28%" }} />
              <div className="h-6 rounded-md" style={{ background: "linear-gradient(90deg,#a78bfa,#ec4899)", width: "16%" }} />
              <div className="h-6 rounded-md" style={{ background: "linear-gradient(90deg,#22c55e,#22d3ee)", width: "18%" }} />
            </div>
            <span className="mono-readout hidden shrink-0 sm:block">00:38</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="mono-readout w-6 shrink-0">A1</span>
            <div className="flex-1 h-4 rounded-md bg-white/8 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-[92%] bg-gradient-to-r from-white/15 via-white/25 to-white/10" />
            </div>
            <span className="mono-readout hidden shrink-0 sm:block">STEREO</span>
          </div>
        </div>
      </div>

      {/* Panels row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="glass corner-frame rounded-2xl p-5 lg:col-span-2">
          <span className="corner-tr" />
          <span className="corner-bl" />
          <div className="flex items-center justify-between">
            <div className="mono-readout">Sprint 24 · Live Board</div>
            <div className="mono-readout hidden sm:block">CLIP_024 · 00:00:12:04</div>
          </div>
          <div className="mt-2 font-display text-xl font-semibold">Launch playbook</div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { done: true, label: "Draft press release" },
              { done: true, label: "Design hero art" },
              { done: false, label: "Ship changelog" },
              { done: false, label: "Post to socials" },
            ].map((t) => (
              <div key={t.label} className="glass-chip flex items-center gap-2 !rounded-xl px-3 py-2 text-sm">
                <span className={`h-2.5 w-2.5 rounded-full ${t.done ? "bg-sky-400" : "border border-white/30"}`} />
                <span className={t.done ? "text-white/85" : "text-white/70"}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="rounded-2xl p-5"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--accent-1) 45%, transparent), color-mix(in oklab, var(--accent-3) 30%, transparent))",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <div className="flex items-start justify-between">
            <div className="mono-readout !text-white/85">Goal</div>
            <span className="mono-readout !text-white/85">67%</span>
          </div>
          <div className="mt-2 font-display text-lg font-semibold">Hit 50k signups by Q3</div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-black/25">
            <div className="h-full w-2/3 rounded-full bg-white/85" />
          </div>
          <div className="mt-3 text-xs text-white/80">67% there</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <div className="text-2xl text-white/40 leading-none">"</div>
          <p className="mt-2 text-sm text-white/85">Feels like magic — my team actually opens it on Mondays.</p>
          <div className="mt-4 border-t border-white/10 pt-3 text-xs text-white/60">— Ada, Design Lead</div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="mono-readout">Reminder</span>
            <span className="mono-readout">10:00 AM</span>
          </div>
          <div className="mt-2 font-semibold">Standup at 10:00</div>
          <div className="mt-1 text-sm text-white/60">Bring the doughnuts.</div>
        </div>
        <div className="glass rounded-2xl p-5">
          <span className="mono-readout">Idea</span>
          <div className="mt-2 font-semibold">Send stickers to top users</div>
        </div>
      </div>
    </div>
  );
}

function ThumbCard({
  thumb, title, cat, len, tag,
}: { thumb: string; title: string; cat: string; len: string; tag: string }) {
  return (
    <div className="glass glass-hover group relative overflow-hidden rounded-2xl">
      <div className="relative aspect-video w-full overflow-hidden" style={{ background: thumb }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur">
          {tag}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-mono text-white/90 backdrop-blur">
          {len}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition group-hover:scale-110 group-hover:bg-white/25">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs text-white/50">{cat}</div>
        </div>
      </div>
    </div>
  );
}

export function Portfolio({ limit }: { limit?: number } = {}) {
  const items = limit ? PORTFOLIO_ITEMS.slice(0, limit) : PORTFOLIO_ITEMS;
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <SectionHead
        eyebrow="Live Boards"
        line1="One canvas."
        line2="A hundred wins."
        sub="A glimpse at how the growVelo desk launches, plans, and celebrates every cut."
      />
      <TimelineShowcase />

      <div className="mt-20 mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Portfolio</Eyebrow>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Recent work from the <span className="text-gradient-accent">growVelo</span> desk.
          </h3>
        </div>
        {limit && <Link to="/portfolio" className="btn-ghost text-sm">View all work →</Link>}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <ThumbCard key={p.title} {...p} />)}
      </div>
    </section>
  );
}

/* ---------- services (features 2x2 + layers panel) ---------- */

const SERVICES = [
  { key: "01 / 04", tag: "Cinematic", icon: "🎬", title: "Frames that breathe", body: "Long-form and brand films with story-first pacing, color, and sound." },
  { key: "02 / 04", tag: "Short-Form", icon: "📱", title: "Hooks that stick", body: "Reels, TikToks, and Shorts — trend-native pacing and punchy captions." },
  { key: "03 / 04", tag: "Motion", icon: "✨", title: "Ideas in motion", body: "Kinetic type, explainer animation, and clean brand-ready comps." },
  { key: "04 / 04", tag: "Sound", icon: "🎚️", title: "Sound that sits right", body: "Voice cleanup, layered SFX, and cinematic music beds that don't fight the cut." },
];

export function Services() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <SectionHead
        eyebrow="Features"
        line1="Everything you need."
        line2="Nothing you don't."
        sub="Built for creators who want tools that feel as considered as the work they make."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
          {SERVICES.map((s) => (
            <div key={s.key} className="glass glass-hover rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-lg">
                  <span>{s.icon}</span>
                </div>
                <span className="mono-readout">{s.key}</span>
              </div>
              <div className="mono-readout mt-6">{s.tag}</div>
              <div className="mt-1 font-display text-lg font-semibold">{s.title}</div>
              <p className="mt-2 text-sm text-white/70">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Layers side panel */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex gap-3">
              <span className="rounded-md bg-white/10 px-2 py-1 text-white">Layers</span>
              <span className="pt-1 text-white/50">Effects</span>
            </div>
            <span className="mono-readout">4 Items</span>
          </div>
          <div className="mt-5 space-y-3">
            {[
              { name: "Cinematic", lv: "L01 · 100%", grad: "linear-gradient(135deg,#7c5cff,#22d3ee)" },
              { name: "Short-Form", lv: "L02 · 100%", grad: "linear-gradient(135deg,#ec4899,#f97316)" },
              { name: "Motion", lv: "L03 · 100%", grad: "linear-gradient(135deg,#0ea5e9,#22d3ee)" },
              { name: "Sound", lv: "L04 · 100%", grad: "linear-gradient(135deg,#8b5cf6,#22d3ee)" },
            ].map((l) => (
              <div key={l.name} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-3">
                <div className="h-8 w-8 rounded-lg" style={{ background: l.grad }} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{l.name}</div>
                  <div className="mono-readout">{l.lv}</div>
                </div>
                <span className="text-white/50">👁</span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="mono-readout">Opacity</span>
              <span className="mono-readout">75%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div className="h-full w-3/4 rounded-full gradient-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- editors ---------- */

function EditorCard({ e }: { e: Editor }) {
  return (
    <Link
      to="/editors/$slug"
      params={{ slug: e.slug }}
      className="glass glass-hover group block overflow-hidden rounded-2xl p-5"
    >
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 shrink-0 rounded-full ring-2 ring-white/20" style={{ background: e.avatar }} />
        <div className="min-w-0">
          <div className="truncate font-semibold">{e.name}</div>
          <div className="truncate text-xs text-white/60">{e.role}</div>
        </div>
      </div>
      <p className="mt-4 line-clamp-2 text-sm text-white/70">{e.bio}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {e.skills.slice(0, 3).map((s) => (
          <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/70">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
        <span className="text-white/50">{e.years}+ years · from {e.rate}</span>
        <span className="text-white/80 transition group-hover:text-white">View portfolio →</span>
      </div>
    </Link>
  );
}

export function Editors({ limit }: { limit?: number } = {}) {
  const items = limit ? editors.slice(0, limit) : editors;
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <SectionHead
        eyebrow="Our Editors"
        line1="Pick your"
        line2="specialist."
        sub="Hand-picked editors across cinematic, short-form, motion, and documentary."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((e) => <EditorCard key={e.slug} e={e} />)}
      </div>
      {limit && (
        <div className="mt-10 text-center">
          <Link to="/editors" className="btn-ghost text-sm">Meet the full team →</Link>
        </div>
      )}
    </section>
  );
}

/* ---------- pricing ---------- */

const PRICING_TIERS = [
  { name: "Short-Form", price: "$79", unit: "per edit", desc: "Reels · TikToks · Shorts up to 90s.", features: ["Up to 90 seconds", "Captions & sound design", "2 revisions", "48h turnaround"], highlight: false },
  { name: "Creator", price: "$349", unit: "per video", desc: "YouTube long-form & vlogs up to 20 minutes.", features: ["Up to 20 minutes", "Color + audio mix", "B-roll sourcing", "3 revisions", "72h turnaround"], highlight: true },
  { name: "Cinematic", price: "$899", unit: "per project", desc: "Brand films, weddings, documentaries.", features: ["Up to 10 minutes finished", "Full color grade", "Sound design + mix", "Unlimited revisions", "Dedicated editor"], highlight: false },
  { name: "Retainer", price: "$2,400", unit: "per month", desc: "Ongoing partnership for teams and creators.", features: ["20+ deliverables / mo", "Priority queue", "Slack channel", "Weekly review calls"], highlight: false },
];

export function Pricing() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <SectionHead
        eyebrow="Pricing"
        line1="Fair pricing,"
        line2="per format."
        sub="Every project is quoted by length and complexity. Below are our starting rates."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {PRICING_TIERS.map((t) => (
          <div key={t.name} className={`glass ${t.highlight ? "glass-strong ring-1 ring-white/25" : ""} relative flex flex-col rounded-2xl p-6`}>
            {t.highlight && (
              <span className="absolute -top-3 left-6 rounded-full gradient-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow">
                Most popular
              </span>
            )}
            <div className="mono-readout">{t.name}</div>
            <div className="mt-2 flex items-end gap-1">
              <span className="font-display text-4xl font-semibold">{t.price}</span>
              <span className="mb-1 text-xs text-white/50">{t.unit}</span>
            </div>
            <p className="mt-2 text-sm text-white/70">{t.desc}</p>
            <ul className="mt-6 space-y-2 text-sm text-white/80">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full gradient-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/contact" className={`mt-6 text-center text-sm ${t.highlight ? "btn-primary" : "btn-ghost"}`}>
              Get started
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- courses (with category picker) ---------- */

const COURSE_CATEGORIES = [
  { name: "Cinematic", count: "8 courses", icon: "🎬", grad: "linear-gradient(135deg,#7c5cff,#22d3ee)" },
  { name: "Short-Form", count: "6 courses", icon: "📱", grad: "linear-gradient(135deg,#ec4899,#f97316)" },
  { name: "Motion", count: "5 courses", icon: "✨", grad: "linear-gradient(135deg,#0ea5e9,#22d3ee)" },
  { name: "Color", count: "4 courses", icon: "🎨", grad: "linear-gradient(135deg,#f43f5e,#a78bfa)" },
  { name: "Sound", count: "3 courses", icon: "🎚️", grad: "linear-gradient(135deg,#8b5cf6,#22d3ee)" },
];

const COURSES = [
  { title: "Cinematic Editing in Premiere Pro", level: "Intermediate", length: "8h · 42 lessons", price: "$129", thumb: "linear-gradient(135deg,#7c5cff,#22d3ee)", desc: "Learn our exact cinematic workflow — pacing, color, and sound design." },
  { title: "Reels & Shorts Mastery (CapCut + AE)", level: "Beginner → Pro", length: "5h · 28 lessons", price: "$79", thumb: "linear-gradient(135deg,#ec4899,#f97316)", desc: "Hook-driven vertical edits, trend-native pacing, and viral captions." },
  { title: "Motion Graphics for Brands", level: "Advanced", length: "10h · 55 lessons", price: "$179", thumb: "linear-gradient(135deg,#0ea5e9,#22d3ee)", desc: "Kinetic type, explainer animation, and clean brand-ready comps." },
  { title: "Color Grading with DaVinci Resolve", level: "Intermediate", length: "6h · 30 lessons", price: "$99", thumb: "linear-gradient(135deg,#f43f5e,#a78bfa)", desc: "From node basics to full-film grades that hold up on any screen." },
  { title: "YouTube Editing for Retention", level: "All levels", length: "4h · 22 lessons", price: "$69", thumb: "linear-gradient(135deg,#ef4444,#eab308)", desc: "Structure, jump cuts, b-roll and thumbnail synergy — the retention stack." },
  { title: "Sound Design & Mixing", level: "Intermediate", length: "5h · 26 lessons", price: "$89", thumb: "linear-gradient(135deg,#8b5cf6,#0ea5e9)", desc: "Voice cleanup, layered SFX, and cinematic music beds." },
];

export function Courses({ limit }: { limit?: number } = {}) {
  const items = limit ? COURSES.slice(0, limit) : COURSES;
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <SectionHead
        eyebrow="Templates"
        line1="Pick a starting point."
        line2="Ship in seconds."
        sub="Editing courses taught by growVelo editors — pick a specialty and start shipping better cuts."
      />

      {/* Category picker */}
      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {COURSE_CATEGORIES.map((c) => (
          <div key={c.name} className="glass glass-hover rounded-2xl p-5 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full text-xl" style={{ background: c.grad }}>
              <span>{c.icon}</span>
            </div>
            <div className="mt-4 font-semibold">{c.name}</div>
            <div className="mono-readout mt-1">{c.count}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 mb-6 text-center">
        <Link to="/courses" className="btn-ghost text-sm">Explore all courses →</Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div key={c.title} className="glass glass-hover overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/9]" style={{ background: c.thumb }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur">
                {c.level}
              </div>
              <div className="absolute bottom-3 left-3 text-xs text-white/80">{c.length}</div>
            </div>
            <div className="p-5">
              <div className="font-semibold">{c.title}</div>
              <p className="mt-1 text-sm text-white/70">{c.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-xl font-semibold">{c.price}</span>
                <a href="#" className="btn-ghost !py-2 !px-4 text-xs">Enroll</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- reviews (Love notes) ---------- */

const REVIEWS = [
  { name: "Ayaan Malik", role: "Creator · 1.2M subs", body: "growVelo cuts my long-form videos with taste — retention went up 22% in a month.", initial: "A", avatar: "linear-gradient(135deg,#7c5cff,#22d3ee)" },
  { name: "Lena Park", role: "Founder · Nova Labs", body: "Our brand film landed exactly the mood we wanted. Professional, on-time, and thoughtful.", initial: "L", avatar: "linear-gradient(135deg,#ec4899,#f97316)" },
  { name: "Rohan Das", role: "Head of Marketing · Stackly", body: "The motion team delivered a SaaS explainer that outperformed our old one 3x in demos booked.", initial: "R", avatar: "linear-gradient(135deg,#22c55e,#0ea5e9)" },
  { name: "Zara Ahmed", role: "Bride · Wedding Film", body: "Sadia captured emotions we didn't even know were on camera. We cried. Twice.", initial: "Z", avatar: "linear-gradient(135deg,#f43f5e,#a78bfa)" },
  { name: "Miguel Torres", role: "Podcaster · InsideOut", body: "Turnaround is unreal. Full episode edits in under 48 hours, every week.", initial: "M", avatar: "linear-gradient(135deg,#0ea5e9,#8b5cf6)" },
  { name: "Priya Sen", role: "DTC Founder · Glowl", body: "Our Reels are unrecognizable now — hooks land, captions pop, sales followed.", initial: "P", avatar: "linear-gradient(135deg,#eab308,#ef4444)" },
];

export function Reviews({ limit }: { limit?: number } = {}) {
  const items = limit ? REVIEWS.slice(0, limit) : REVIEWS;
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <SectionHead
        eyebrow="Love Notes"
        line1="Clients are"
        line2="obsessed."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <figure key={r.name} className="glass rounded-2xl p-6">
            <div className="font-display text-3xl leading-none text-gradient-accent">"</div>
            <blockquote className="mt-3 text-sm text-white/85">{r.body}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: r.avatar }}>
                {r.initial}
              </div>
              <div>
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-white/50">{r.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- about ---------- */

export function About() {
  const stats = [
    { k: "600+", v: "Projects delivered" },
    { k: "90+", v: "Brand clients" },
    { k: "12", v: "In-house editors" },
    { k: "24h", v: "Avg. turnaround" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <SectionHead
        eyebrow="About growVelo"
        line1="A boutique studio,"
        line2="built by editors."
        sub="growVelo started in 2020 as three editors sharing a Notion doc and a shared love for cuts that make people feel something."
      />
      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.v} className="glass rounded-2xl p-6 text-center">
            <div className="font-display text-3xl font-semibold text-gradient-accent sm:text-4xl">{s.k}</div>
            <div className="mt-2 text-xs text-white/70 sm:text-sm">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-2xl text-center text-white/70">
        <p>
          Five years later we're a team of twelve — cinematic editors, short-form specialists,
          motion designers, and colorists — working with creators and brands across four continents.
          We're picky about pacing, obsessive about sound, and quietly proud of the fact that most
          of our clients stay for years.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/portfolio" className="btn-primary text-sm !py-2 !px-4">See the work</Link>
          <Link to="/contact" className="btn-ghost text-sm !py-2 !px-4">Work with us</Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

export function Contact() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <SectionHead
        eyebrow="Contact"
        line1="Let's build something"
        line2="worth watching."
        sub="Tell us about your project — footage, format, deadline. We usually reply within a few hours during working days."
      />
      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-3 text-sm text-white/80">
          <div className="glass rounded-2xl p-5">
            <div className="mono-readout">Email</div>
            <div className="mt-1 font-medium">hello@growvelo.studio</div>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="mono-readout">Studio</div>
            <div className="mt-1 font-medium">Dhaka · Remote worldwide</div>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="mono-readout">Hours</div>
            <div className="mt-1 font-medium">Sun–Thu · 10:00–19:00 (GMT+6)</div>
          </div>
        </div>
        <form
          className="glass rounded-2xl p-6 lg:col-span-3"
          onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch shortly."); }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-white/70">Name</span>
              <input required maxLength={100} className="glass-input" placeholder="Your name" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-white/70">Email</span>
              <input required type="email" maxLength={255} className="glass-input" placeholder="you@company.com" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="text-white/70">Project type</span>
              <select className="glass-input" defaultValue="">
                <option value="" disabled>Select a type…</option>
                <option>Short-form (Reels / TikTok / Shorts)</option>
                <option>YouTube long-form</option>
                <option>Brand film / Ad</option>
                <option>Wedding / Event</option>
                <option>Motion graphics / Explainer</option>
                <option>Documentary / Podcast</option>
                <option>Other</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="text-white/70">Tell us about your project</span>
              <textarea required maxLength={1000} rows={5} className="glass-input" placeholder="Length, deadline, style references…" />
            </label>
          </div>
          <button type="submit" className="btn-primary mt-6 text-sm">Send message</button>
        </form>
      </div>
    </section>
  );
}

/* ---------- Big CTA (Ready to make work feel like yours) ---------- */

export function BigCTA() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
        <Blob className="left-[-10%] top-[-30%] h-[24rem] w-[24rem] opacity-70" color="color-mix(in oklab, var(--accent-1) 70%, transparent)" />
        <Blob className="right-[-10%] bottom-[-30%] h-[24rem] w-[24rem] opacity-70" color="color-mix(in oklab, var(--accent-3) 70%, transparent)" />
        <div className="relative z-10">
          <h3 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-gradient">Ready to make edits</span>
            <br />
            <span className="text-gradient-accent">that feel like yours?</span>
          </h3>
          <p className="mx-auto mt-5 max-w-lg text-sm text-white/70 sm:text-base">
            Send us your footage, pick an editor, and get a first cut. Takes 30 seconds to start.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link to="/contact" className="btn-primary justify-center">Start free →</Link>
            <Link to="/pricing" className="btn-ghost justify-center">See pricing</Link>
          </div>
          <div className="mono-readout mt-6">No commitment · Free first consultation</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

const FOOTER_COLS: { title: string; links: { to: string; label: string }[] }[] = [
  { title: "Studio", links: [{ to: "/portfolio", label: "Portfolio" }, { to: "/editors", label: "Editors" }] },
  { title: "Learn", links: [{ to: "/courses", label: "Courses" }, { to: "/reviews", label: "Reviews" }] },
  { title: "Company", links: [{ to: "/about", label: "About" }, { to: "/pricing", label: "Pricing" }] },
  { title: "Get in touch", links: [{ to: "/contact", label: "Contact" }] },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={growveloMark.url} alt="growVelo" className="h-11 w-11 rounded-xl" />
            <div>
              <div className="font-display text-base font-semibold">
                grow<span className="text-gradient-accent">Velo</span>
              </div>
              <div className="text-xs text-white/50">Made with glass &amp; light.</div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/60">
            A boutique editing studio for creators, brands, and filmmakers.
          </p>
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-6 text-sm sm:grid-cols-4 md:col-span-3">
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="mono-readout mb-3">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to as "/"} className="text-white/80 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-5 pt-6 text-center text-xs text-white/40">
        © 2026 growVelo Studio · Crafted frame by frame.
      </div>
    </footer>
  );
}

/* ---------- shell ---------- */

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <Nav />
      {children}
      <Footer />
    </main>
  );
}
