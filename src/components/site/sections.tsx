import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
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
  return (
    <div className="sticky top-4 z-50 flex justify-center px-4">
      <header className="glass flex w-full max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={growveloMark.url} alt="growVelo" className="h-9 w-9 rounded-xl" />
          <span className="font-display text-base font-semibold tracking-tight">
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
        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn-primary text-sm !py-2 !px-4">
            Hire us
          </Link>
        </div>
      </header>
    </div>
  );
}

/* ---------- editors data ---------- */

export type Editor = {
  slug: string;
  name: string;
  role: string;
  avatar: string; // gradient css
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
    <section className="relative mx-auto max-w-7xl px-5 pt-20 pb-24 md:pt-28 md:pb-32">
      <Blob className="animate-float left-[-8%] top-16 h-[28rem] w-[28rem]" color="color-mix(in oklab, var(--accent-1) 70%, transparent)" />
      <Blob className="animate-float right-[-6%] top-40 h-[26rem] w-[26rem]" color="color-mix(in oklab, var(--accent-3) 65%, transparent)" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Eyebrow>Video Editing Studio · Est. 2020</Eyebrow>
        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
          <span className="text-gradient">Cinematic edits</span>
          <br />
          that make you{" "}
          <span className="text-gradient-accent">unmissable</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          Framecut is a boutique editing agency for creators, brands, and filmmakers.
          Pair with a specialist editor, drop your footage, and get scroll-stopping cuts back.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact" className="btn-primary">Start a project</Link>
          <Link to="/portfolio" className="btn-ghost">See our work</Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.2em] text-white/50">
          <span>600+ projects delivered</span>
          <span className="hidden sm:inline">·</span>
          <span>24h avg turnaround</span>
          <span className="hidden sm:inline">·</span>
          <span>Trusted by 90+ brands</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- portfolio ---------- */

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

function ThumbCard({
  thumb, title, cat, len, tag,
}: { thumb: string; title: string; cat: string; len: string; tag: string }) {
  return (
    <div className="glass glass-hover group relative overflow-hidden rounded-2xl">
      <div
        className="relative aspect-video w-full overflow-hidden"
        style={{ background: thumb }}
      >
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
    <section className="relative mx-auto max-w-7xl px-5 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Portfolio</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Recent work from the <span className="text-gradient-accent">Framecut</span> desk.
          </h2>
        </div>
        {limit && (
          <Link to="/portfolio" className="btn-ghost text-sm">View all work →</Link>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <ThumbCard key={p.title} {...p} />)}
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
        <div
          className="h-14 w-14 shrink-0 rounded-full ring-2 ring-white/20"
          style={{ background: e.avatar }}
        />
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
    <section className="relative mx-auto max-w-7xl px-5 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Our Editors</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Pick your <span className="text-gradient">specialist</span>.
          </h2>
          <p className="mt-3 max-w-xl text-white/70">
            Hand-picked editors across cinematic, short-form, motion, and documentary.
            Click a profile to explore their portfolio and request them for your project.
          </p>
        </div>
        {limit && <Link to="/editors" className="btn-ghost text-sm">Meet the team →</Link>}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((e) => <EditorCard key={e.slug} e={e} />)}
      </div>
    </section>
  );
}

/* ---------- pricing ---------- */

const PRICING_TIERS = [
  {
    name: "Short-Form",
    price: "$79",
    unit: "per edit",
    desc: "Reels · TikToks · Shorts up to 90s.",
    features: ["Up to 90 seconds", "Captions & sound design", "2 revisions", "48h turnaround"],
    highlight: false,
  },
  {
    name: "Creator",
    price: "$349",
    unit: "per video",
    desc: "YouTube long-form & vlogs up to 20 minutes.",
    features: ["Up to 20 minutes", "Color + audio mix", "B-roll sourcing", "3 revisions", "72h turnaround"],
    highlight: true,
  },
  {
    name: "Cinematic",
    price: "$899",
    unit: "per project",
    desc: "Brand films, weddings, documentaries.",
    features: ["Up to 10 minutes finished", "Full color grade", "Sound design + mix", "Unlimited revisions", "Dedicated editor"],
    highlight: false,
  },
  {
    name: "Retainer",
    price: "$2,400",
    unit: "per month",
    desc: "Ongoing partnership for teams and creators.",
    features: ["20+ deliverables / mo", "Priority queue", "Slack channel", "Weekly review calls"],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Fair pricing, <span className="text-gradient-accent">per format</span>.
        </h2>
        <p className="mt-3 text-white/70">
          Every project is quoted by length and complexity. Below are our starting rates —
          need something custom? <Link to="/contact" className="text-white underline underline-offset-4">Talk to us</Link>.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {PRICING_TIERS.map((t) => (
          <div
            key={t.name}
            className={`glass ${t.highlight ? "glass-strong ring-1 ring-white/25" : ""} relative flex flex-col rounded-2xl p-6`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-6 rounded-full gradient-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow">
                Most popular
              </span>
            )}
            <div className="text-sm text-white/60">{t.name}</div>
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
            <Link
              to="/contact"
              className={`mt-6 text-center text-sm ${t.highlight ? "btn-primary" : "btn-ghost"}`}
            >
              Get started
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- courses ---------- */

const COURSES = [
  {
    title: "Cinematic Editing in Premiere Pro",
    level: "Intermediate",
    length: "8h · 42 lessons",
    price: "$129",
    thumb: "linear-gradient(135deg,#7c5cff,#22d3ee)",
    desc: "Learn our exact cinematic workflow — pacing, color, and sound design.",
  },
  {
    title: "Reels & Shorts Mastery (CapCut + AE)",
    level: "Beginner → Pro",
    length: "5h · 28 lessons",
    price: "$79",
    thumb: "linear-gradient(135deg,#ec4899,#f97316)",
    desc: "Hook-driven vertical edits, trend-native pacing, and viral captions.",
  },
  {
    title: "Motion Graphics for Brands",
    level: "Advanced",
    length: "10h · 55 lessons",
    price: "$179",
    thumb: "linear-gradient(135deg,#0ea5e9,#22d3ee)",
    desc: "Kinetic type, explainer animation, and clean brand-ready comps.",
  },
  {
    title: "Color Grading with DaVinci Resolve",
    level: "Intermediate",
    length: "6h · 30 lessons",
    price: "$99",
    thumb: "linear-gradient(135deg,#f43f5e,#a78bfa)",
    desc: "From node basics to full-film grades that hold up on any screen.",
  },
  {
    title: "YouTube Editing for Retention",
    level: "All levels",
    length: "4h · 22 lessons",
    price: "$69",
    thumb: "linear-gradient(135deg,#ef4444,#eab308)",
    desc: "Structure, jump cuts, b-roll and thumbnail synergy — the retention stack.",
  },
  {
    title: "Sound Design & Mixing",
    level: "Intermediate",
    length: "5h · 26 lessons",
    price: "$89",
    thumb: "linear-gradient(135deg,#8b5cf6,#0ea5e9)",
    desc: "Voice cleanup, layered SFX, and cinematic music beds.",
  },
];

export function Courses({ limit }: { limit?: number } = {}) {
  const items = limit ? COURSES.slice(0, limit) : COURSES;
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Courses</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Learn from the <span className="text-gradient">Framecut</span> desk.
          </h2>
        </div>
        {limit && <Link to="/courses" className="btn-ghost text-sm">Browse all courses →</Link>}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

/* ---------- reviews ---------- */

const REVIEWS = [
  { name: "Ayaan Malik", role: "Creator · 1.2M subs", body: "Framecut cuts my long-form videos with taste — retention went up 22% in a month.", stars: 5, avatar: "linear-gradient(135deg,#7c5cff,#22d3ee)" },
  { name: "Lena Park", role: "Founder · Nova Labs", body: "Our brand film landed exactly the mood we wanted. Professional, on-time, and thoughtful.", stars: 5, avatar: "linear-gradient(135deg,#ec4899,#f97316)" },
  { name: "Rohan Das", role: "Head of Marketing · Stackly", body: "The motion team delivered a SaaS explainer that outperformed our old one 3x in demos booked.", stars: 5, avatar: "linear-gradient(135deg,#22c55e,#0ea5e9)" },
  { name: "Zara Ahmed", role: "Bride · Wedding Film", body: "Sadia captured emotions we didn't even know were on camera. We cried. Twice.", stars: 5, avatar: "linear-gradient(135deg,#f43f5e,#a78bfa)" },
  { name: "Miguel Torres", role: "Podcaster · InsideOut", body: "Turnaround is unreal. Full episode edits in under 48 hours, every week.", stars: 5, avatar: "linear-gradient(135deg,#0ea5e9,#8b5cf6)" },
  { name: "Priya Sen", role: "DTC Founder · Glowl", body: "Our Reels are unrecognizable now — hooks land, captions pop, sales followed.", stars: 5, avatar: "linear-gradient(135deg,#eab308,#ef4444)" },
];

export function Reviews({ limit }: { limit?: number } = {}) {
  const items = limit ? REVIEWS.slice(0, limit) : REVIEWS;
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Reviews</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Clients say it <span className="text-gradient-accent">better</span> than we can.
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <figure key={r.name} className="glass rounded-2xl p-6">
            <div className="flex gap-1 text-yellow-300">
              {Array.from({ length: r.stars }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-4 text-sm text-white/85">"{r.body}"</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
              <div className="h-10 w-10 rounded-full" style={{ background: r.avatar }} />
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
    <section className="relative mx-auto max-w-7xl px-5 py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>About Framecut</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            A boutique <span className="text-gradient">editing studio</span>, built by editors.
          </h2>
          <p className="mt-5 text-white/75">
            Framecut started in 2020 as three editors sharing a Notion doc and a shared love
            for cuts that make people <em>feel</em> something. Five years later we're a team of
            twelve — cinematic editors, short-form specialists, motion designers, and colorists —
            working with creators and brands across four continents.
          </p>
          <p className="mt-4 text-white/70">
            We're picky about pacing, obsessive about sound, and quietly proud of the fact that
            most of our clients stay for years. If it doesn't move us in the timeline, it doesn't
            leave the studio.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/portfolio" className="btn-primary text-sm !py-2 !px-4">See the work</Link>
            <Link to="/contact" className="btn-ghost text-sm !py-2 !px-4">Work with us</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.v} className="glass rounded-2xl p-6">
              <div className="font-display text-4xl font-semibold text-gradient-accent">{s.k}</div>
              <div className="mt-2 text-sm text-white/70">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

export function Contact() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Let's build something <span className="text-gradient-accent">worth watching</span>.
          </h2>
          <p className="mt-4 text-white/70">
            Tell us about your project — footage, format, deadline. We usually reply within a
            few hours during working days.
          </p>
          <div className="mt-8 space-y-3 text-sm text-white/80">
            <div><span className="text-white/50">Email · </span>hello@framecut.studio</div>
            <div><span className="text-white/50">Studio · </span>Dhaka · Remote worldwide</div>
            <div><span className="text-white/50">Hours · </span>Sun–Thu · 10:00–19:00 (GMT+6)</div>
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

/* ---------- CTA ---------- */

export function BigCTA() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
        <Blob className="left-[-10%] top-[-30%] h-[24rem] w-[24rem] opacity-70" color="color-mix(in oklab, var(--accent-1) 70%, transparent)" />
        <Blob className="right-[-10%] bottom-[-30%] h-[24rem] w-[24rem] opacity-70" color="color-mix(in oklab, var(--accent-3) 70%, transparent)" />
        <div className="relative z-10">
          <h3 className="font-display text-3xl font-semibold sm:text-5xl">
            Got footage? <span className="text-gradient-accent">We'll make it sing.</span>
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Send us your files and we'll come back with a first cut in as little as 48 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="btn-primary">Start a project</Link>
            <Link to="/editors" className="btn-ghost">Pick an editor</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl gradient-accent text-base font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
            F
          </span>
          <div>
            <div className="font-display text-base font-semibold">Framecut</div>
            <div className="text-xs text-white/50">A boutique editing studio.</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-4">
          {NAV_ITEMS.filter((n) => n.to !== "/").map((n) => (
            <Link key={n.to} to={n.to as "/"} className="text-white/80 transition hover:text-white">
              {n.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © 2026 Framecut Studio · Crafted frame by frame.
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
