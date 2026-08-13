import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import {
  ArrowRight,
  Play,
  Sparkles,
  Menu,
  X,
  Film,
  Smartphone,
  Wand2,
  AudioLines,
  Palette,
  Youtube,
  Mic,
  Check,
  Star,
  Mail,
  MapPin,
  Clock,
  Layers,
  Eye,
  Megaphone,
  Briefcase,
  Pin as PinIcon,
} from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import growveloMark from "../../assets/growvelo-mark.png.asset.json";
import courseThumbnail from "../../assets/course-thumbnail.png.asset.json";
import instructorAtaullah from "../../assets/instructor-ataullah.png.asset.json";


/* ---------- helpers ---------- */

type ChipColor = "mint" | "coral" | "lemon" | "blush" | "sky" | "brand";
const CHIP_VARS: Record<ChipColor, string> = {
  mint: "var(--mint)",
  coral: "var(--coral)",
  lemon: "var(--lemon)",
  blush: "var(--blush)",
  sky: "var(--sky)",
  brand: "var(--brand)",
};
function chipStyle(color: ChipColor): CSSProperties {
  return { ["--chip-color" as string]: CHIP_VARS[color] };
}
function pinStyle(color: ChipColor): CSSProperties {
  return { ["--pin-color" as string]: CHIP_VARS[color] };
}

export function Chip({
  children,
  color = "mint",
  icon,
  className = "",
}: {
  children: ReactNode;
  color?: ChipColor;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span className={`chip ${className}`} style={chipStyle(color)}>
      {icon}
      {children}
    </span>
  );
}

/** Section header — chip eyebrow → display headline with one gradient word → sub */
export function SectionHead({
  eyebrow,
  eyebrowColor = "mint",
  eyebrowIcon,
  before,
  gradWord,
  after,
  sub,
  align = "center",
}: {
  eyebrow: string;
  eyebrowColor?: ChipColor;
  eyebrowIcon?: ReactNode;
  before: string;
  gradWord: string;
  after?: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const wrap =
    align === "center" ? "mx-auto max-w-5xl text-center" : "max-w-3xl text-left";
  return (
    <div className={wrap}>
      <Chip color={eyebrowColor} icon={eyebrowIcon}>{eyebrow}</Chip>
      <h2 className="mt-5 font-display font-bold tracking-tight text-foreground"
          style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
        {before}{" "}
        <span className="grad-text">{gradWord}</span>
        {after ? <> {after}</> : null}
      </h2>
      {sub && (
        <p className="mx-auto mt-5 max-w-3xl text-sm text-foreground/65 sm:text-base">
          {sub}
        </p>
      )}
    </div>
  );
}

const NAV_ITEMS: { to: string; label: string; exact?: boolean }[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/portfolio", label: "Portfolio", exact: true },
  { to: "/courses", label: "Courses", exact: true },
  { to: "/reviews", label: "Reviews", exact: true },
  { to: "/about", label: "About", exact: true },
];

/* ---------- nav ---------- */

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-0 pt-0 sm:px-4 sm:pt-4">
      <header className="glass flex w-full max-w-6xl flex-col overflow-hidden !rounded-none border-x-0 border-t-0 bg-transparent px-3 py-2 sm:!rounded-full sm:border sm:bg-color-mix(in oklab, var(--paper) 25%, transparent) sm:px-5 sm:py-2">
        <div className="flex w-full items-center justify-between gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5" onClick={() => setOpen(false)}>
            <div
              className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl sm:h-10 sm:w-10"
              style={{
                background: "linear-gradient(135deg, var(--brand), var(--coral))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 10px -4px color-mix(in oklab, var(--brand) 40%, transparent)",
              }}
            >
              <img src={growveloMark.url} alt="growVelo" className="h-full w-full object-cover" />
            </div>
            <span className="truncate font-display text-base font-semibold tracking-tight sm:text-lg">
              grow<span className="grad-text">Velo</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-medium text-foreground/70 lg:flex">
            {NAV_ITEMS.map((n) => (
              <Link
                key={n.to}
                to={n.to as "/"}
                activeOptions={n.exact ? { exact: true } : undefined}
                className="transition hover:text-foreground"
                activeProps={{ className: "!text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <Link to="/courses" className="gloss-btn !py-2 !px-4 !text-xs sm:!text-sm">
              কোর্স দেখুন <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground transition hover:bg-foreground/10 lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

        </div>

        {open && (
          <nav className="mt-3 grid grid-cols-2 gap-1 border-t border-foreground/10 pt-3 text-sm text-foreground/80 lg:hidden">
            {NAV_ITEMS.map((n) => (
              <Link
                key={n.to}
                to={n.to as "/"}
                activeOptions={n.exact ? { exact: true } : undefined}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 transition hover:bg-foreground/5"
                activeProps={{ className: "bg-foreground/5 !text-foreground" }}
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
  tint: "mint" | "coral" | "lemon" | "blush" | "sky" | "brand";
  pin: ChipColor;
  works: { title: string; type: string; thumb: string; client: string }[];
};

export const editors: Editor[] = [
  {
    slug: "ataullah",
    name: "Muhammad Ataullah",
    role: "Lead Video Mentor",
    avatar: "linear-gradient(135deg,#7c5cff,#22d3ee)",
    bio: "Cinematic storytelling expert. Helping 500+ students master the art of video editing.",
    skills: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design"],
    years: 8,
    rate: "Lead Mentor",
    tint: "mint",
    pin: "brand",
    works: [
      { title: "Cinematic Breakdown", type: "Education", thumb: "linear-gradient(135deg,#ff9966,#ff5e62)", client: "growVelo" },
    ],
  },
];

export function getEditor(slug: string) {
  return editors.find((e) => e.slug === slug);
}

/* ---------- hero ---------- */

export function Hero() {
  return (
    <section className="aurora-bg relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-5 pt-16 pb-24 sm:pt-24 sm:pb-28">
        {/* floating chip stickers */}
        <div className="pointer-events-none absolute inset-0 hidden xl:block">
          <div className="absolute left-[2%] top-[18%] tilt-l"><Chip color="mint" icon={<Sparkles className="h-3.5 w-3.5" />}>48h first cut</Chip></div>
          <div className="absolute right-[2%] top-[14%] tilt-r"><Chip color="lemon">✂ Sound-designed</Chip></div>
          <div className="absolute left-[1%] top-[62%] tilt-xs-r"><Chip color="blush">♥ Fast Turnaround</Chip></div>
          <div className="absolute right-[2%] top-[58%] tilt-xs-l"><Chip color="sky">▶ Color graded</Chip></div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1
            className="mt-6 font-display font-semibold tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Turn Your <span className="grad-text">Passion</span>
            <br />
            into Profession.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base text-foreground/65 sm:text-lg">
            Master the art of cinematic video editing and short-form storytelling from industry experts.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link to="/courses" className="gloss-btn">
              Explore Courses <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/courses" className="gloss-btn-ghost">
              <Play className="h-5 w-5" /> Watch Free Masterclass
            </Link>
          </div>
        </div>

        {/* Featured Course showcase panel */}
        <div className="relative z-10 mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="mt-14 flex flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:justify-center">
            {/* Course main card - Styled like Mentor card */}
            <div className="relative max-w-lg w-full">
              <div className="pin" style={pinStyle("mint")} />
              <div className="sticky-card p-6 sm:p-8 flex flex-col h-full bg-linear-to-b from-[var(--paper)] to-color-mix(in oklab, var(--mint) 12%, var(--paper))">
                <div className="flex items-center justify-between gap-2">
                  <Chip color="mint" icon={<Film className="h-3.5 w-3.5" />} className="!whitespace-nowrap">জনপ্রিয় কোর্স · ব্যাচ ০৭</Chip>
                </div>
                
                <div className="relative mt-5 w-full overflow-hidden rounded-2xl ring-1 ring-black/10 bg-black aspect-video">
                  <img
                    src={courseThumbnail.url}
                    alt="Rising Editors — Video Editing Bootcamp poster"
                    className="block h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute left-3 top-3">
                    <span className="mono-readout rounded-md bg-black/50 px-2 py-1 text-white/90 backdrop-blur-sm">
                      <span className="rec-dot mr-1 align-middle" /> PREVIEW
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex-grow">
                  <h3 className="font-display text-2xl font-bold leading-tight">Video Editing Bootcamp</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                    ৬ সপ্তাহের hands-on কোর্স। Story-first editing, color grading, sound design আর delivery workflow।
                  </p>
                  
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {["6 Weeks", "Live + VOD", "Intermediate"].map((tag) => (
                      <span key={tag} className="rounded-full border border-foreground/10 bg-white/70 px-3 py-1 text-[11px] font-medium text-foreground/75">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-6">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-foreground">৳৪,০০০</span>
                    <span className="text-xs text-foreground/50 line-through">৳৫,০০০</span>
                  </div>
                  <Link to="/courses/$slug" params={{ slug: "video-editing-bootcamp" }} className="gloss-btn !px-5 !py-2.5 !text-sm">
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Instructor / Start Date side info */}
            <div className="max-w-sm w-full space-y-6 flex flex-col justify-center">
              <div className="relative">
                <div className="pin" style={pinStyle("lemon")} />
                <div className="sticky-card p-6 bg-linear-to-b from-[var(--paper)] to-color-mix(in oklab, var(--lemon) 12%, var(--paper))">
                  <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-lemon-500" /> Instructor
                  </h4>
                  <div className="mt-4 flex items-center gap-4">
                    <img
                      src={instructorAtaullah.url}
                      alt="Muhammad Ataullah"
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div className="min-w-0">
                      <div className="font-display text-base font-semibold leading-tight">Muhammad Ataullah</div>
                      <div className="mono-readout truncate text-[10px]">Lead Mentor</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="pin" style={pinStyle("sky")} />
                <div className="sticky-card p-6 bg-linear-to-b from-[var(--paper)] to-color-mix(in oklab, var(--sky) 12%, var(--paper))">
                  <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-sky-500" /> Batch Schedule
                  </h4>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="mono-readout text-[10px]">Class starts</div>
                      <div className="mt-0.5 font-display text-base font-semibold">Jul 28, 2026</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-coral-500">
                      <span className="rec-dot" /> 12 seats left
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
}

export function SocialProof() {
  return (
    <div className="relative z-10 mt-16 sm:mt-24">
      <div className="mono-readout text-center">Learn Tools Trusted By Professionals</div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45 sm:gap-x-12 sm:text-sm">
        <span>Premiere Pro</span>
        <span>DaVinci Resolve</span>
        <span>After Effects</span>
      </div>
    </div>
  );
}

/* ---------- services ---------- */

const SERVICES: {
  key: string; title: string; grad: string; tint: "mint" | "coral" | "lemon" | "blush" | "sky" | "brand"; pin: ChipColor;
  icon: ReactNode; body: string; tag: string; chipColor: ChipColor; tilt: string;
}[] = [
  {
    key: "01 / 06",
    tag: "YouTube",
    chipColor: "coral",
    icon: <Youtube className="h-3.5 w-3.5" />,
    title: "YouTube Editing",
    body: "Creator-দের জন্য long-form YouTube ভিডিও। Hook, pacing, B-roll আর thumbnail-ready কাট।",
    tint: "coral",
    pin: "coral",
    grad: "linear-gradient(135deg, var(--coral), var(--blush))",
    tilt: "tilt-xs-l",
  },
  {
    key: "02 / 06",
    tag: "Short-Form",
    chipColor: "mint",
    icon: <Smartphone className="h-3.5 w-3.5" />,
    title: "Reels & Shorts",
    body: "Reels, TikTok আর Shorts। Trend-friendly দ্রুত pacing, punchy caption আর scroll-stopping hook।",
    tint: "mint",
    pin: "mint",
    grad: "linear-gradient(135deg, var(--mint), var(--brand))",
    tilt: "tilt-xs-r",
  },
  {
    key: "03 / 06",
    tag: "Podcast",
    chipColor: "sky",
    icon: <Mic className="h-3.5 w-3.5" />,
    title: "Podcast Editing",
    body: "Podcast-এর video + audio। Voice cleanup, multi-cam sync আর সাথে ছোট clip/reels কেটে দেওয়া।",
    tint: "sky",
    pin: "sky",
    grad: "linear-gradient(135deg, var(--sky), var(--brand))",
    tilt: "tilt-xs-l",
  },
  {
    key: "04 / 06",
    tag: "Ad",
    chipColor: "lemon",
    icon: <Megaphone className="h-3.5 w-3.5" />,
    title: "Ads & Commercial",
    body: "Brand ad, product launch, Facebook/YouTube ads। Hook-first, conversion-focused কাট।",
    tint: "lemon",
    pin: "lemon",
    grad: "linear-gradient(135deg, var(--lemon), var(--coral))",
    tilt: "tilt-xs-r",
  },
  {
    key: "05 / 06",
    tag: "Color",
    chipColor: "brand",
    icon: <Palette className="h-3.5 w-3.5" />,
    title: "Color Grading",
    body: "শুধু কালার-এর কাজ। Cinematic look, skin-tone ঠিক করা আর brand-consistent color pass।",
    tint: "brand",
    pin: "brand",
    grad: "linear-gradient(135deg, var(--brand), var(--sky))",
    tilt: "tilt-xs-l",
  },
  {
    key: "06 / 06",
    tag: "Cinematic",
    chipColor: "blush",
    icon: <Film className="h-3.5 w-3.5" />,
    title: "Documentary & Brand Film",
    body: "Story-first long-form। Founder story, documentary আর cinematic brand film পুরো প্যাকেজে।",
    tint: "blush",
    pin: "blush",
    grad: "linear-gradient(135deg, var(--blush), var(--coral))",
    tilt: "tilt-xs-r",
  },
];

export function Services() {
  return (
    <section className="aurora-soft py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHead
          eyebrow="Our Services"
          eyebrowColor="lemon"
          before="Everything you"
          gradWord="need,"
          after="right here."
          sub="বাংলাদেশি creator, brand আর agency-দের জন্য সাজানো। এক ছাদের নিচে সব ধরনের এডিটিং সার্ভিস।"
        />


        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="relative">
                <div className="pin" style={pinStyle(s.pin)} />
                <div className={`sticky-card tint-${s.tint} p-4`}>
                  <div className="flex items-start justify-between">
                    <div
                      className="grid h-9 w-9 place-items-center rounded-xl text-white"
                      style={{ background: s.grad, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)" }}
                    >
                      {s.icon}
                    </div>
                    <span className="mono-readout">{s.key}</span>
                  </div>
                  <div className="mt-4">
                    <Chip color={s.chipColor}>{s.tag}</Chip>
                  </div>
                  <div className="mt-2 font-display text-base font-semibold leading-snug">{s.title}</div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/65">{s.body}</p>
                </div>
              </div>
            ))}
          </div>


          {/* Layers side panel */}
          <div className="relative">
            <div className="pin" style={pinStyle("brand")} />
            <div className="sticky-card p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2 text-sm">
                  <Layers className="h-4 w-4 shrink-0 text-foreground/70" />
                  <span className="truncate font-semibold">Service Layers</span>
                  <span className="hidden text-foreground/40 sm:inline">Effects</span>
                </div>
                <span className="mono-readout shrink-0">8 Items</span>
              </div>
              <div className="mt-5 space-y-2.5">
                {[
                  { name: "YouTube", lv: "L01 · 100%", grad: "linear-gradient(135deg, var(--coral), var(--blush))" },
                  { name: "Reels / Shorts", lv: "L02 · 100%", grad: "linear-gradient(135deg, var(--mint), var(--brand))" },
                  { name: "Podcast", lv: "L03 · 100%", grad: "linear-gradient(135deg, var(--sky), var(--brand))" },
                  { name: "Ads", lv: "L04 · 100%", grad: "linear-gradient(135deg, var(--lemon), var(--coral))" },
                  { name: "Color Grade", lv: "L05 · 100%", grad: "linear-gradient(135deg, var(--brand), var(--sky))" },
                  { name: "Documentary", lv: "L06 · 100%", grad: "linear-gradient(135deg, var(--blush), var(--coral))" },
                ].map((l) => (
                  <div key={l.name} className="flex items-center gap-3 rounded-xl border border-foreground/8 bg-white/60 p-2.5">
                    <div className="h-8 w-8 rounded-lg" style={{ background: l.grad }} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{l.name}</div>
                      <div className="mono-readout">{l.lv}</div>
                    </div>
                    <Eye className="h-4 w-4 text-foreground/40" />
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-foreground/10 pt-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="mono-readout">Opacity</span>
                  <span className="mono-readout">100%</span>
                </div>
                <div className="h-1.5 rounded-full bg-foreground/10">
                  <div className="h-full w-full rounded-full" style={{ background: "linear-gradient(90deg, var(--brand), var(--coral))" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- portfolio ---------- */

const PORTFOLIO_ITEMS: {
  title: string; cat: string; len: string; thumb: string; tag: string;
  tint: "mint" | "coral" | "lemon" | "blush" | "sky" | "brand"; pin: ChipColor; chipColor: ChipColor;
  youtubeId?: string;
  reel?: boolean;
}[] = [
  { title: "growVelo · Featured Edit", cat: "YouTube", len: "Watch", thumb: "linear-gradient(135deg,#7c5cff,#22d3ee)", tag: "Featured", tint: "brand", pin: "brand", chipColor: "brand", youtubeId: "daUeU1VtS_M" },
  { title: "growVelo · Cinematic Cut", cat: "YouTube", len: "Watch", thumb: "linear-gradient(135deg,#ec4899,#f472b6)", tag: "Cinematic", tint: "coral", pin: "coral", chipColor: "coral", youtubeId: "yDf03E_XWW4" },
  { title: "Reel · Hook 01", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#7c5cff,#22d3ee)", tag: "Reel", tint: "brand", pin: "brand", chipColor: "brand", youtubeId: "2vukCg-KKZU", reel: true },
  { title: "Reel · Hook 02", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#ec4899,#f472b6)", tag: "Reel", tint: "coral", pin: "coral", chipColor: "coral", youtubeId: "PKtQUBdts9c", reel: true },
  { title: "Reel · Hook 03", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#22d3ee,#a78bfa)", tag: "Reel", tint: "mint", pin: "mint", chipColor: "mint", youtubeId: "HJft21ln2pM", reel: true },
  { title: "Reel · Hook 04", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#0ea5e9,#22d3ee)", tag: "Reel", tint: "sky", pin: "sky", chipColor: "sky", youtubeId: "uqVoftJ7vEk", reel: true },
  { title: "Reel · Hook 05", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#f97316,#fbbf24)", tag: "Reel", tint: "lemon", pin: "lemon", chipColor: "lemon", youtubeId: "WNKTz82ag8A", reel: true },
  { title: "Reel · Hook 06", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#ef4444,#ec4899)", tag: "Reel", tint: "blush", pin: "coral", chipColor: "coral", youtubeId: "z2VlD0k7I7A", reel: true },
  { title: "Reel · Hook 07", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#7c5cff,#ec4899)", tag: "Reel", tint: "brand", pin: "brand", chipColor: "brand", youtubeId: "EIEPJDfJlTM", reel: true },
  { title: "Reel · Hook 08", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#22d3ee,#7c5cff)", tag: "Reel", tint: "sky", pin: "sky", chipColor: "sky", youtubeId: "ErpPB1cwnvs", reel: true },
  { title: "Reel · Hook 09", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#fbbf24,#ef4444)", tag: "Reel", tint: "lemon", pin: "lemon", chipColor: "lemon", youtubeId: "_-Oc75HWraY", reel: true },
  { title: "Reel · Hook 10", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#a78bfa,#22d3ee)", tag: "Reel", tint: "mint", pin: "mint", chipColor: "mint", youtubeId: "DfWpX_XX38w", reel: true },
  { title: "Reel · Hook 11", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#ec4899,#f97316)", tag: "Reel", tint: "coral", pin: "coral", chipColor: "coral", youtubeId: "lBhHK5UIcHA", reel: true },
  { title: "Reel · Hook 12", cat: "Short-Form", len: "Reel", thumb: "linear-gradient(135deg,#0ea5e9,#a78bfa)", tag: "Reel", tint: "brand", pin: "sky", chipColor: "brand", youtubeId: "_1hgLpg7L3A", reel: true },
];

function ThumbCard({ item, tilt }: { item: (typeof PORTFOLIO_ITEMS)[number]; tilt: string }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = !!item.youtubeId;
  const posterUrl = item.youtubeId ? `https://i.ytimg.com/vi_webp/${item.youtubeId}/maxresdefault.webp` : undefined;
  const posterFallback = item.youtubeId ? `https://i.ytimg.com/vi/${item.youtubeId}/maxresdefault.jpg` : undefined;
  const posterFallback2 = item.youtubeId ? `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg` : undefined;

  return (
    <div className="relative">
      <div className="pin" style={pinStyle(item.pin)} />
      <div className={`sticky-card tint-${item.tint} p-3 ${tilt}`}>
        <div
          className={`group relative w-full overflow-hidden rounded-xl ${item.reel ? "aspect-[9/16] mx-auto max-w-[240px]" : "aspect-video"}`}
          style={{ background: item.thumb }}
        >
          {posterUrl && (
            <img
              src={posterUrl}
              alt={item.title}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src.endsWith(".webp") && posterFallback) img.src = posterFallback;
                else if (posterFallback2 && img.src !== posterFallback2) img.src = posterFallback2;
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {playing && item.youtubeId ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&hd=1&vq=hd1080&modestbranding=1`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute left-2.5 top-2.5">
                <Chip color={item.chipColor}>{item.tag}</Chip>
              </div>
              <div className="absolute right-2.5 top-2.5 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur">
                {item.len}
              </div>
              <button
                type="button"
                onClick={() => hasVideo && setPlaying(true)}
                aria-label={hasVideo ? `Play ${item.title}` : item.title}
                className="absolute inset-0 grid place-items-center"
                style={{ cursor: hasVideo ? "pointer" : "default" }}
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white/85 shadow-lg transition group-hover:scale-110 group-hover:bg-white">
                  <Play className="h-5 w-5 text-foreground" fill="currentColor" />
                </span>
              </button>
            </>
          )}
        </div>
        <div className="flex items-center justify-between px-2 pt-4 pb-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{item.title}</div>
            <div className="text-xs text-foreground/55">{item.cat}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


function TimelineShowcase() {
  return (
    <div className="mt-14 space-y-6">
      <div className="relative">
        <div className="pin" style={pinStyle("lemon")} />
        <div className="sticky-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="chip !py-1 !text-[11px]" style={chipStyle("mint")}>Timeline</span>
              <span className="text-foreground/50">Boards</span>
              <span className="text-foreground/50">Assets</span>
            </div>
            <div className="mono-readout flex items-center gap-2">
              <span className="rec-dot" /> REC · 00:12:04:11 · 1920×1080 · 60FPS
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="mono-readout w-6 shrink-0">V1</span>
              <div className="flex-1 flex gap-1.5">
                <div className="h-6 rounded-md" style={{ background: "linear-gradient(90deg, var(--brand), color-mix(in oklab, var(--brand) 60%, white))", width: "22%" }} />
                <div className="h-6 rounded-md" style={{ background: "linear-gradient(90deg, var(--mint), color-mix(in oklab, var(--mint) 60%, white))", width: "12%" }} />
                <div className="h-6 rounded-md" style={{ background: "linear-gradient(90deg, var(--sky), color-mix(in oklab, var(--sky) 60%, white))", width: "28%" }} />
                <div className="h-6 rounded-md" style={{ background: "linear-gradient(90deg, var(--coral), color-mix(in oklab, var(--coral) 60%, white))", width: "16%" }} />
                <div className="h-6 rounded-md" style={{ background: "linear-gradient(90deg, var(--lemon), color-mix(in oklab, var(--lemon) 60%, white))", width: "18%" }} />
              </div>
              <span className="mono-readout hidden shrink-0 sm:block">00:38</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="mono-readout w-6 shrink-0">A1</span>
              <div className="relative h-4 flex-1 overflow-hidden rounded-md bg-foreground/8">
                <div className="absolute inset-y-0 left-0 w-[92%] bg-linear-to-r from-foreground/20 via-foreground/35 to-foreground/15" />
              </div>
              <span className="mono-readout hidden shrink-0 sm:block">STEREO</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="relative lg:col-span-2">
          <div className="pin" style={pinStyle("mint")} />
          <div className="sticky-card tint-mint p-5">
            <div className="flex items-center justify-between">
              <Chip color="mint">Sprint 24 · Live Board</Chip>
              <span className="mono-readout hidden sm:block">CLIP_024 · 00:00:12:04</span>
            </div>
            <div className="mt-3 font-display text-xl font-semibold">Launch playbook</div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                { done: true, label: "Draft press release" },
                { done: true, label: "Design hero art" },
                { done: false, label: "Ship changelog" },
                { done: false, label: "Post to socials" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 rounded-xl border border-foreground/8 bg-white/70 px-3 py-2 text-sm">
                  {t.done ? (
                    <span className="grid h-4 w-4 place-items-center rounded-full" style={{ background: "var(--mint)" }}>
                      <Check className="h-2.5 w-2.5 text-foreground" strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="h-4 w-4 rounded-full border-2 border-foreground/25" />
                  )}
                  <span className={t.done ? "text-foreground/60 line-through" : "text-foreground/85"}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="pin" style={pinStyle("brand")} />
          <div className="sticky-card tint-brand p-5">
            <div className="flex items-center justify-between">
              <Chip color="brand">Goal</Chip>
              <span className="mono-readout">67%</span>
            </div>
            <div className="mt-3 font-display text-lg font-semibold">Hit 50k signups by Q3</div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-foreground/10">
              <div className="h-full w-2/3 rounded-full" style={{ background: "linear-gradient(90deg, var(--brand), var(--coral))" }} />
            </div>
            <div className="mt-3 text-xs text-foreground/60">67% there</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudentShowcase({ limit }: { limit?: number } = {}) {
  const items = limit ? PORTFOLIO_ITEMS.slice(0, limit) : PORTFOLIO_ITEMS;
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHead
          eyebrow="Showcase"
          eyebrowColor="mint"
          eyebrowIcon={<Layers className="h-3.5 w-3.5" />}
          before="Student"
          gradWord="Masterpieces"
          sub="আমাদের শিক্ষার্থীদের সফল প্রজেক্ট এবং এডিটিং টাইমলাইনের এক ঝলক।"
        />
        <TimelineShowcase />

        <div className="mt-20 mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Chip color="coral" icon={<Film className="h-3.5 w-3.5" />}>Portfolio</Chip>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Student <span className="grad-text">Masterpieces</span>.
            </h3>
          </div>
          {limit && (
            <Link to="/portfolio" className="gloss-btn-ghost !text-sm">
              View all work <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        {(() => {
          const landscape = items.filter((p) => !p.reel);
          const reels = items.filter((p) => p.reel);
          return (
            <>
              {landscape.length > 0 && (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {landscape.map((p, i) => (
                    <ThumbCard key={p.title} item={p} tilt="" />
                  ))}
                </div>
              )}
              {reels.length > 0 && (
                <div className="mt-12">
                  <div className="mb-6">
                    <Chip color="brand" icon={<Film className="h-3.5 w-3.5" />}>Reels · Shorts</Chip>
                    <h4 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                      Short-form <span className="grad-text">hooks</span>.
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {reels.map((p, i) => (
                      <ThumbCard key={p.title} item={p} tilt="" />
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </div>
    </section>
  );
}

/* ---------- editors ---------- */

function EditorCard({ e, tilt }: { e: Editor; tilt: string }) {
  return (
    <Link
      to="/editors/$slug"
      params={{ slug: e.slug }}
      className="relative block"
    >
      <div className="pin" style={pinStyle(e.pin)} />
      <div className={`sticky-card tint-${e.tint} p-6 ${tilt}`}>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 rounded-full ring-4 ring-white" style={{ background: e.avatar }} />
          <div className="min-w-0">
            <div className="truncate font-display text-lg font-semibold">{e.name}</div>
            <div className="truncate text-xs text-foreground/60">{e.role}</div>
          </div>
        </div>
        <p className="mt-4 line-clamp-2 text-sm text-foreground/70">{e.bio}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {e.skills.slice(0, 3).map((s) => (
            <span key={s} className="rounded-full border border-foreground/10 bg-white/70 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/70">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-foreground/10 pt-4 text-xs">
          <span className="text-foreground/55">{e.years}+ years · {e.rate}</span>
          <span className="flex items-center gap-1 font-semibold text-foreground/85">
            View <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Instructors({ limit }: { limit?: number } = {}) {
  const items = limit ? editors.slice(0, limit) : editors;
  const e = items[0]; // Take the main mentor
  if (!e) return null;

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHead
          eyebrow="Mentor"
          eyebrowColor="blush"
          eyebrowIcon={<Sparkles className="h-3.5 w-3.5" />}
          before="Meet Your"
          gradWord="Mentor"
          sub="সিনেমাটিক এবং মোশন এডিটিংয়ে দক্ষ মেন্টরের কাছ থেকে সরাসরি শিখুন।"
        />
        <div className="mt-14 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
          <div className="relative max-w-sm w-full">
            <div className="pin" style={pinStyle(e.pin)} />
            <div className={`sticky-card tint-${e.tint} p-8`}>
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 shrink-0 rounded-full ring-4 ring-white shadow-lg" style={{ background: e.avatar }} />
                <div className="min-w-0">
                  <div className="font-display text-2xl font-bold leading-tight">{e.name}</div>
                  <div className="mono-readout mt-1 text-xs">{e.role}</div>
                </div>
              </div>
              <p className="mt-6 text-base leading-relaxed text-foreground/80">{e.bio}</p>
              
              <div className="mt-8">
                <div className="mono-readout mb-3 text-[11px]">Specialized Skills</div>
                <div className="flex flex-wrap gap-2">
                  {e.skills.map((s) => (
                    <span key={s} className="rounded-full border border-foreground/10 bg-white/70 px-3 py-1 text-xs font-medium text-foreground/75">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-6">
                <div className="text-sm font-medium text-foreground/60">
                  <span className="block text-xl font-bold text-foreground">{e.years}+ Years</span>
                  Industry Experience
                </div>
                <Link to="/about" className="gloss-btn !px-5 !py-2.5 !text-sm">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-md space-y-6">
            <div className="relative">
              <div className="pin" style={pinStyle("sky")} />
              <div className="sticky-card p-6">
                <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-sky-500" /> Professional Experience
                </h4>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  Muhammad Ataullah has worked with over 50+ international brands and creators, delivering high-end cinematic content that converts.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="pin" style={pinStyle("mint")} />
              <div className={`sticky-card tint-mint p-6`}>
                <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                  <AudioLines className="h-5 w-5 text-mint-500" /> Teaching Philosophy
                </h4>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  "I don't just teach tools; I teach the art of storytelling. My goal is to help you find your unique voice in the world of video editing."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- pricing ---------- */

// Pricing section removed as per user request.


const COURSE_CATEGORIES: { name: string; count: string; icon: ReactNode; tint: "mint" | "coral" | "lemon" | "blush" | "sky" | "brand"; pin: ChipColor; grad: string }[] = [
  { name: "Cinematic", count: "8 courses", icon: <Film className="h-5 w-5 text-white" />, tint: "mint", pin: "mint", grad: "linear-gradient(135deg, var(--mint), var(--brand))" },
  { name: "Short-Form", count: "6 courses", icon: <Smartphone className="h-5 w-5 text-white" />, tint: "coral", pin: "coral", grad: "linear-gradient(135deg, var(--coral), var(--blush))" },
  { name: "Motion", count: "5 courses", icon: <Wand2 className="h-5 w-5 text-white" />, tint: "lemon", pin: "lemon", grad: "linear-gradient(135deg, var(--lemon), var(--coral))" },
  { name: "Color", count: "4 courses", icon: <Palette className="h-5 w-5 text-white" />, tint: "blush", pin: "blush", grad: "linear-gradient(135deg, var(--blush), var(--brand))" },
  { name: "Sound", count: "3 courses", icon: <AudioLines className="h-5 w-5 text-white" />, tint: "sky", pin: "sky", grad: "linear-gradient(135deg, var(--sky), var(--brand))" },
];

export type CourseLesson = { title: string; length: string; free?: boolean; videoId?: string };
export type CourseModule = { title: string; lessons: CourseLesson[] };
export type Course = {
  slug: string; title: string; level: string; length: string; price: string; oldPrice?: string;
  thumb: string; desc: string; tint: "mint" | "coral" | "lemon" | "blush" | "sky" | "brand";
  pin: ChipColor; chipColor: ChipColor; featured?: boolean;
  start: string; instructor: string; about: string; outcomes: string[]; modules: CourseModule[];
};

export const COURSES: Course[] = [
  {
    slug: "video-editing-bootcamp",
    title: "১৫ দিনের ফ্রি ভিডিও এডিটিং বুটক্যাম্প (ব্যাচ ০১)",
    level: "Beginner → Pro",
    length: "15 days · Live",
    price: "৳4,000",
    oldPrice: "৳5,000",
    thumb: `url(${courseThumbnail.url}) center/cover no-repeat`,
    desc: "Rising Editors — ব্যাচ ০১। এই ব্যাচের এনরোলমেন্ট বর্তমানে সম্পন্ন হয়েছে। পরবর্তী ব্যাচের জন্য অপেক্ষা করুন।",
    tint: "brand", pin: "brand", chipColor: "brand", featured: false,
    start: "ব্যাচ ০১ · এনরোলমেন্ট সম্পন্ন",
    instructor: "Muhammad Ataullah",
    about: "একদম শূন্য থেকে শুরু করে প্রফেশনাল ভিডিও এডিটর হওয়ার সম্পূর্ণ রোডম্যাপ। ব্যাচ ০১-এর ক্লাস বর্তমানে চলছে।",
    outcomes: [
      "Premiere Pro-তে A থেকে Z প্রফেশনাল workflow",
      "YouTube long-form + Reels/Shorts দুই ধরনের এডিটিং",
      "Color grading, sound design আর motion basics",
      "Client কীভাবে পাবেন — portfolio ও pricing গাইড",
    ],
    modules: [],
  },
  {
    slug: "video-editing-bootcamp-batch-2",
    title: "১৫ দিনের ফ্রি ভিডিও এডিটিং বুটক্যাম্প (ব্যাচ ০২)",
    level: "Beginner → Pro",
    length: "15 days · Live",
    price: "৳4,000",
    oldPrice: "৳5,000",
    thumb: `url(${courseThumbnail.url}) center/cover no-repeat`,
    desc: "Rising Editors — ব্যাচ ০২। প্রিমিয়ার প্রো দিয়ে প্রফেশনাল এডিটিং, একদম Beginner হলেও জয়েন করতে পারবেন।",
    tint: "brand", pin: "brand", chipColor: "brand", featured: true,
    start: "ব্যাচ ০২ · শীঘ্রই শুরু",
    instructor: "Muhammad Ataullah",
    about:
      "একদম শূন্য থেকে শুরু করে প্রফেশনাল ভিডিও এডিটর হওয়ার সম্পূর্ণ রোডম্যাপ। Live class, practice project আর personal feedback — সব মিলিয়ে ১৫ দিনের হাতে-কলমে ট্রেনিং।",
    outcomes: [
      "Premiere Pro-তে A থেকে Z প্রফেশনাল workflow",
      "YouTube long-form + Reels/Shorts দুই ধরনের এডিটিং",
      "Color grading, sound design আর motion basics",
      "Client কীভাবে পাবেন — portfolio ও pricing গাইড",
    ],
    modules: [
      {
        title: "Module 1 · Introduction",
        lessons: [
          { title: "কোর্স পরিচিতি ও রোডম্যাপ", length: "12:40", free: true, videoId: "dQw4w9WgXcQ" },
          { title: "Premiere Pro setup ও interface tour", length: "18:05", free: true, videoId: "dQw4w9WgXcQ" },
          { title: "প্রথম টাইমলাইন — cut, trim, export", length: "21:30", free: true, videoId: "dQw4w9WgXcQ" },
        ],
      },
      {
        title: "Module 2 · Core Editing",
        lessons: [
          { title: "Pacing ও rhythm — কাট কোথায় বসাবেন", length: "24:10", videoId: "dQw4w9WgXcQ" },
          { title: "B-roll, J/L cut আর transition", length: "19:55", videoId: "dQw4w9WgXcQ" },
          { title: "Text, caption ও lower third", length: "17:20", videoId: "dQw4w9WgXcQ" },
          { title: "Practice project 1 — YouTube vlog edit", length: "32:00", videoId: "dQw4w9WgXcQ" },
        ],
      },
      {
        title: "Module 3 · Short-Form",
        lessons: [
          { title: "Hook তৈরির ফর্মুলা", length: "15:40", videoId: "dQw4w9WgXcQ" },
          { title: "Reels/Shorts vertical workflow", length: "22:15", videoId: "dQw4w9WgXcQ" },
          { title: "Auto caption ও trend-native pacing", length: "16:50", videoId: "dQw4w9WgXcQ" },
        ],
      },
      {
        title: "Module 4 · Color, Sound & Delivery",
        lessons: [
          { title: "Color correction vs grading", length: "26:30", videoId: "dQw4w9WgXcQ" },
          { title: "Voice cleanup ও music mixing", length: "20:05", videoId: "dQw4w9WgXcQ" },
          { title: "Export settings — YouTube, FB, Insta", length: "13:45", videoId: "dQw4w9WgXcQ" },
          { title: "Client work, pricing ও portfolio", length: "28:10", videoId: "dQw4w9WgXcQ" },
        ],
      },
    ],
  },
  {
    slug: "advanced-cinematic-storytelling",
    title: "Advanced Cinematic Storytelling",
    level: "Pro",
    length: "30 days · VOD",
    price: "৳8,000",
    oldPrice: "৳10,000",
    thumb: "linear-gradient(135deg,#7c5cff,#22d3ee)",
    desc: "Master the art of high-end cinematic edits, complex transitions, and deep color grading.",
    tint: "sky", pin: "sky", chipColor: "sky",
    start: "Self-paced",
    instructor: "Muhammad Ataullah",
    about: "This course is for editors who want to take their work to the next level and work on high-budget projects.",
    outcomes: ["Advanced narrative pacing", "Complex masking & VFX", "Commercial grade color grading"],
    modules: [],
  },
];


export function FeaturedCourses({ limit }: { limit?: number } = {}) {
  const items = limit ? COURSES.slice(0, limit) : COURSES;
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHead
          eyebrow="Courses"
          eyebrowColor="brand"
          eyebrowIcon={<Sparkles className="h-3.5 w-3.5" />}
          before="Master the art of"
          gradWord="Story"
          after="first editing."
          sub="Explore our specialized training programs designed to take you from beginner to professional."
        />
        <div className="mt-14 mx-auto grid max-w-[880px] grid-cols-1 gap-8 sm:grid-cols-2">
          {items.map((c) => (
            <div key={c.slug} className="relative">
              <div className="pin" style={pinStyle(c.pin)} />
              <Link
                to="/courses/$slug"
                params={{ slug: c.slug }}
                className={`sticky-card tint-${c.tint} block p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98] cursor-pointer group`}
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl" style={{ background: c.thumb }}>
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute left-2.5 top-2.5">
                    <Chip color={c.chipColor}>{c.level}</Chip>
                  </div>
                  <div className="absolute bottom-2.5 left-3 text-xs font-medium text-white drop-shadow-sm">{c.length}</div>
                </div>
                <div className="p-4">
                  <div className="font-display text-lg font-semibold group-hover:text-[var(--brand)] transition-colors">{c.title}</div>
                  <p className="mt-1 text-sm text-foreground/65 line-clamp-2">{c.desc}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-xl font-semibold">{c.price}</span>
                      {c.oldPrice && (
                        <span className="text-xs text-foreground/50 line-through">{c.oldPrice}</span>
                      )}
                    </div>
                <span className={`gloss-btn !text-xs !py-2 !px-4 group-hover:scale-105 transition-transform pointer-events-none ${c.slug === 'video-editing-bootcamp' ? 'grayscale opacity-70 cursor-not-allowed' : ''}`}>
                  {c.slug === 'video-editing-bootcamp' ? 'Batch Completed' : 'View details'}
                </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CourseCategories() {
  return <FeaturedCourses />;
}

export function Courses({ limit }: { limit?: number } = {}) {
  return <FeaturedCourses limit={limit} />;
}

/* ---------- reviews ---------- */

const REVIEWS: {
  name: string; role: string; body: string; initial: string; avatar: string;
  tint: "mint" | "coral" | "lemon" | "blush" | "sky" | "brand"; pin: ChipColor;
}[] = [
  { name: "Tanvir Mahmud", role: "Student · Batch 01", body: "growVelo থেকে এডিটিং শিখে আমি এখন প্রফেশনাল ফিল্ডে কাজ করছি। মেন্টরদের গাইডেন্স ছিল অসাধারণ।", initial: "T", avatar: "linear-gradient(135deg,#7c5cff,#22d3ee)", tint: "mint", pin: "mint" },
  { name: "Abdullah Maraab", role: "Student · Batch 02", body: "কোর্সের মডিউলগুলো খুব সুন্দরভাবে সাজানো। বিগিনার হিসেবে আমার জন্য শেখাটা অনেক সহজ হয়েছে।", initial: "A", avatar: "linear-gradient(135deg,#ec4899,#f97316)", tint: "coral", pin: "coral" },
  { name: "Rohan Das", role: "Student · Batch 01", body: "মোশন গ্রাফিক্সের মডিউলটি ছিল আমার প্রিয়। এখন আমি নিজে থেকেই অনেক জটিল এনিমেশন তৈরি করতে পারি।", initial: "R", avatar: "linear-gradient(135deg,#22c55e,#0ea5e9)", tint: "lemon", pin: "lemon" },
  { name: "Zara Ahmed", role: "Student · Batch 03", body: "মেন্টররা সবসময় প্রশ্নের উত্তর দেন এবং পার্সোনাল ফিডব্যাক দেন, যা শেখার গতিকে অনেক বাড়িয়ে দেয়।", initial: "Z", avatar: "linear-gradient(135deg,#f43f5e,#a78bfa)", tint: "blush", pin: "blush" },
  { name: "Miguel Torres", role: "Student · Batch 04", body: "সিনেমাটিক এডিটিংয়ের টেকনিকগুলো আগে জানতাম না। এই কোর্সটি আমার দেখার দৃষ্টিভঙ্গি বদলে দিয়েছে।", initial: "M", avatar: "linear-gradient(135deg,#0ea5e9,#8b5cf6)", tint: "sky", pin: "sky" },
  { name: "Priya Sen", role: "Student · Batch 02", body: "কমিউনিটি সাপোর্ট খুব ভালো। গ্রুপে অন্যদের কাজ দেখে আরও অনেক কিছু শিখতে পারছি।", initial: "P", avatar: "linear-gradient(135deg,#eab308,#ef4444)", tint: "brand", pin: "brand" },
];

export function StudentReviews({ limit }: { limit?: number } = {}) {
  const items = limit ? REVIEWS.slice(0, limit) : REVIEWS;
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHead
          eyebrow="Reviews"
          eyebrowColor="coral"
          eyebrowIcon={<Star className="h-3.5 w-3.5" />}
          before="Success"
          gradWord="Reviews"
        />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <div key={r.name} className="relative">
              <div className="pin" style={pinStyle(r.pin)} />
              <figure className={`sticky-card tint-${r.tint} p-6`}>
                <div className="flex gap-0.5" style={{ color: "var(--lemon)" }}>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-foreground/85">
                  "{r.body}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-foreground/10 pt-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full font-display text-sm font-semibold text-white ring-2 ring-white" style={{ background: r.avatar }}>
                    {r.initial}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="text-xs text-foreground/55">{r.role}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- about ---------- */

export function About() {
    const stats: { k: string; v: string; tint: "mint" | "coral" | "lemon" | "blush"; pin: ChipColor }[] = [
      { k: "৫০০+", v: "মোট শিক্ষার্থী", tint: "mint", pin: "mint" },
      { k: "৫০+", v: "সফল ব্যাচ", tint: "coral", pin: "coral" },
      { k: "১২", v: "দক্ষ মেন্টর", tint: "lemon", pin: "lemon" },
      { k: "৯২%", v: "সফলতা হার", tint: "blush", pin: "blush" },
    ];
  return (
    <section className="aurora-bg py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHead
          eyebrow="About growVelo"
          eyebrowColor="mint"
          eyebrowIcon={<Sparkles className="h-3.5 w-3.5" />}
          before="Our"
          gradWord="Academy"
          sub="growVelo একাডেমি শুরু হয়েছিল একদল দক্ষ মেন্টরদের নিয়ে, যাদের মূল লক্ষ্য শিক্ষার্থীদের প্রফেশনাল এডিটর হিসেবে গড়ে তোলা।"
        />
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.v} className="relative">
              <div className="pin" style={pinStyle(s.pin)} />
              <div className={`sticky-card tint-${s.tint} p-6 text-center`}>
                <div className="font-display text-3xl font-semibold sm:text-4xl">
                  <span className="grad-text">{s.k}</span>
                </div>
                <div className="mono-readout mt-2">{s.v}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-2xl text-center text-foreground/70">
          <p className="font-serif text-xl italic leading-snug">
            বিগত বছরগুলোতে আমরা ৫০০ এর বেশি শিক্ষার্থীকে ভিডিও এডিটিংয়ের বিভিন্ন সেক্টরে দক্ষ করে তুলেছি। আমাদের মেন্টররা প্রফেশনাল ফিল্ডে কাজ করার পাশাপাশি শিক্ষার্থীদের হাতে-কলমে শেখান।
          </p>
          <p className="mt-4 text-sm">
            আমরা শিক্ষার্থীদের কোয়ালিটি এবং স্কিল ডেভেলপমেন্টের ওপর সবচেয়ে বেশি গুরুত্ব দেই।
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/courses" className="gloss-btn">কোর্সগুলো দেখুন <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/portfolio" className="gloss-btn-ghost">পোর্টফোলিও</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    { q: "কোর্সটি কি একদম বিগিনারদের জন্য?", a: "হ্যাঁ, আমরা একদম শূন্য থেকে শুরু করি যাতে যে কেউ শিখতে পারে।" },
    { q: "পিসি কনফিগারেশন কেমন লাগবে?", a: "ন্যূনতম 8GB RAM এবং একটি ডেডিকেটেড গ্রাফিক্স কার্ড থাকলে ভালো হয়, তবে সাধারণ ল্যাপটপেও শুরু করা সম্ভব।" },
    { q: "লাইফটাইম এক্সেস পাবো কি না?", a: "হ্যাঁ, একবার এনরোল করলে আপনি কোর্সের সমস্ত ম্যাটেরিয়াল আজীবন এক্সেস করতে পারবেন।" },
    { q: "সাপোর্ট কীভাবে পাবো?", a: "আমাদের ডেডিকেটেড ফেসবুক গ্রুপ এবং ডিসকর্ড সার্ভারে আপনি যেকোনো সময় সাপোর্ট পাবেন।" },
  ];
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-[800px] px-5">
        <SectionHead
          eyebrow="FAQ"
          eyebrowColor="sky"
          eyebrowIcon={<PinIcon className="h-3.5 w-3.5" />}
          before="General"
          gradWord="FAQ"
          sub="আপনার মনে থাকা সাধারণ কিছু প্রশ্নের উত্তর এখানে দেওয়া হলো।"
        />
        <div className="mt-14 space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="relative">
              <div className="pin" style={pinStyle("sky")} />
              <div className="sticky-card p-6">
                <h4 className="font-display text-lg font-semibold">{f.q}</h4>
                <p className="mt-2 text-sm text-foreground/70">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

export function Contact() {
  return null;
}

/* ---------- Big CTA ---------- */

export function BigCTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="aurora-dark relative overflow-hidden rounded-[32px] p-12 text-center sm:p-20"
             style={{ boxShadow: "0 40px 80px -30px color-mix(in oklab, var(--brand) 60%, transparent)" }}>
          <div className="relative z-10 mx-auto max-w-2xl">
            <h3
              className="font-display font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
            >
              Ready to start your
              <br />
              editing <span className="grad-text-gold">journey</span>?
            </h3>
            <p className="mx-auto mt-5 max-w-lg text-sm text-white/70 sm:text-base">
              ৫০০+ সফল শিক্ষার্থীর সাথে আপনিও শুরু করুন আপনার এডিটিং ক্যারিয়ার। আজই এনরোল করুন।
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link to="/courses" className="gloss-btn">
                এনরোল করুন <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="mono-readout mt-6 !text-white/60">
              Life-time access · Community Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

const FOOTER_COLS: { title: string; links: { to: string; label: string }[] }[] = [
  { title: "একাডেমি", links: [{ to: "/portfolio", label: "স্টুডেন্ট শোকেস" }, { to: "/editors", label: "মেন্টরস" }] },
  { title: "শিখুন", links: [{ to: "/courses", label: "সবগুলো কোর্স" }, { to: "/reviews", label: "রিভিউ" }] },
  { title: "পলিসি", links: [{ to: "/about", label: "আমাদের সম্পর্কে" }, { to: "/", label: "রিফান্ড পলিসি" }] },
  { title: "কমিউনিটি", links: [{ to: "/", label: "ফেসবুক গ্রুপ" }, { to: "/", label: "ডিসকর্ড" }] },
];

export function Footer() {
  return (
    <footer className="aurora-soft border-t border-foreground/10 py-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div
              className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl"
              style={{
                background: "linear-gradient(135deg, var(--brand), var(--coral))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 8px 16px -4px color-mix(in oklab, var(--brand) 50%, transparent)",
              }}
            >
              <img src={growveloMark.url} alt="growVelo" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold">
                grow<span className="grad-text">Velo</span>
              </div>
              <div className="mono-readout mt-0.5">Made with glass &amp; light.</div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-foreground/60">
            A boutique editing studio for creators, brands, and filmmakers.
            Pinned together on one glossy canvas.
          </p>
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-6 text-sm sm:grid-cols-4 md:col-span-3">
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="mono-readout mb-3">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to as "/"} className="font-medium text-foreground/75 transition hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1200px] border-t border-foreground/10 px-5 pt-6 text-center text-xs text-foreground/45">
        © 2026 growVelo Studio · Crafted frame by frame.
      </div>
    </footer>
  );
}

/* ---------- shell ---------- */

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-20 sm:pt-24">
      <Nav />
      {children}
      <Footer />
    </main>

  );
}

/* legacy alias kept for existing imports */
export { Chip as Eyebrow };
