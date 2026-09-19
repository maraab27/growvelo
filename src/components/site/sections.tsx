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
  Plus,
  LogIn,
  User,
} from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import { EditableText } from "../cms/EditableText";
// নতুন ইমেজ এডিটর টুলটি যুক্ত করা হলো
import { EditableImage } from "../cms/EditableImage"; 
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "../../assets/logo.png.asset.json";
import batch01Thumbnail from "../../assets/batch-01-thumbnail.png.asset.json";
import instructorAtaullahNew from "../../assets/instructor-ataullah-new.png.asset.json";



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
  cmsId,
}: {
  eyebrow: string;
  eyebrowColor?: ChipColor;
  eyebrowIcon?: ReactNode;
  before: string;
  gradWord: string;
  after?: string;
  sub?: string;
  align?: "center" | "left";
  cmsId?: string;
}) {
  const wrap =
    align === "center" ? "mx-auto max-w-5xl text-center" : "max-w-3xl text-left";
  const key = (part: string) => (cmsId ? `${cmsId}.${part}` : undefined);
  const T = ({ part, children, className }: { part: string; children: string; className?: string }) => {
    const id = key(part);
    if (!id) return <span className={className}>{children}</span>;
    return (
      <EditableText id={id} className={className}>
        {children}
      </EditableText>
    );
  };
  return (
    <div className={wrap}>
      <Chip color={eyebrowColor} icon={eyebrowIcon}><T part="eyebrow">{eyebrow}</T></Chip>
      <h2 className="mt-5 font-display font-bold tracking-tight text-foreground"
          style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
        <T part="title">{before}</T>{" "}
        <T part="titleAccent" className="grad-text">{gradWord}</T>
        {after ? <> <T part="titleAfter">{after}</T></> : null}
      </h2>
      {sub && (
        <p className="mx-auto mt-5 max-w-3xl text-sm text-foreground/65 sm:text-base">
          <T part="sub">{sub}</T>
        </p>
      )}
    </div>
  );
}

const NAV_ITEMS: { to: string; label: string; exact?: boolean }[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/courses", label: "Courses", exact: true },
  { to: "/reviews", label: "Reviews", exact: true },
  { to: "/portfolio", label: "Portfolio", exact: true },
  { to: "/about", label: "About", exact: true },
];

function contentKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");
}

/* ---------- nav ---------- */

export function Nav({ session }: { session?: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-0 pt-0 sm:px-4 sm:pt-4">
      <header className="glass flex w-full max-w-6xl flex-col overflow-hidden !rounded-none border-x-0 border-t-0 px-3 py-2 sm:!rounded-full sm:border sm:px-5 sm:py-2">
        <div className="flex w-full items-center justify-between gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5" onClick={() => setOpen(false)}>
            <div
              className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl sm:h-10 sm:w-10"
              style={{
                background: "linear-gradient(135deg, var(--brand), var(--coral))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 10px -4px color-mix(in oklab, var(--brand) 40%, transparent)",
              }}
            >
              {/* মেইন লোগোতে EditableImage বসানো হলো */}
              <EditableImage id="site-logo-main" defaultSrc={logoAsset.url} className="h-full w-full object-cover" />
            </div>
            <span className="truncate font-display text-base font-semibold tracking-tight sm:text-lg">
              <EditableText id="nav.brand.prefix">grow</EditableText><EditableText id="nav.brand.accent" className="grad-text">Velo</EditableText>
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
                <EditableText id={`nav.${contentKey(n.label)}`}>{n.label}</EditableText>
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            {session ? (
              <Link to="/dashboard" className="gloss-btn !py-2 !px-4 !text-xs sm:!text-sm">
                <EditableText id="nav.dashboard">Dashboard</EditableText> <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/auth"
                  search={{ redirect: '/' }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground transition hover:bg-foreground/10 sm:h-10 sm:w-10"
                  aria-label="Login"
                >
                  <LogIn className="h-4 w-4" />
                </Link>
                <Link 
                  to="/courses/$slug"
                  params={{ slug: 'video-editing-batch-3' }}
                  className="gloss-btn !py-2 !px-4 !text-xs sm:!text-sm"
                >
                  <EditableText id="nav.batch03">Batch 03</EditableText> <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}


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
                <EditableText id={`nav.${contentKey(n.label)}`}>{n.label}</EditableText>
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
    avatar: instructorAtaullahNew.url,
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
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-5 pt-32 pb-24 sm:pt-40 sm:pb-28">
        {/* floating chip stickers */}
        <div className="pointer-events-none absolute inset-0 hidden xl:block">
          <div className="absolute left-[2%] top-[18%] tilt-l"><Chip color="mint" icon={<Sparkles className="h-3.5 w-3.5" />}><EditableText id="hero.sticker.firstCut">48h first cut</EditableText></Chip></div>
          <div className="absolute right-[2%] top-[14%] tilt-r"><Chip color="lemon"><EditableText id="hero.sticker.sound">Sound-designed</EditableText></Chip></div>
          <div className="absolute left-[1%] top-[62%] tilt-xs-r"><Chip color="blush"><EditableText id="hero.sticker.turnaround">Fast Turnaround</EditableText></Chip></div>
          <div className="absolute right-[2%] top-[58%] tilt-xs-l"><Chip color="sky"><EditableText id="hero.sticker.color">Color graded</EditableText></Chip></div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1
            className="mt-6 font-display font-semibold tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            <EditableText id="hero.title.line1">Turn Your</EditableText>{" "}
            <EditableText id="hero.title.accent" className="grad-text">Passion</EditableText>
            <br />
            <EditableText id="hero.title.line2">into Profession.</EditableText>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base text-foreground/65 sm:text-lg">
            <EditableText id="hero.subtitle">
              Master the art of cinematic video editing and short-form storytelling from industry experts.
            </EditableText>
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link to="/courses" className="gloss-btn">
              <EditableText id="hero.cta.primary">Explore Courses</EditableText> <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/courses" className="gloss-btn-ghost">
              <Play className="h-5 w-5" /> <EditableText id="hero.cta.secondary">Watch Free Masterclass</EditableText>
            </Link>
          </div>
        </div>

        {/* Featured Course showcase panel */}
        <div className="relative z-10 mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="mt-14 flex flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:justify-center">
            {/* Course main card - Styled like Mentor card */}
            <div className="relative max-w-lg w-full">
              <div className="pin" style={pinStyle("mint")} />
              <div className="sticky-card p-6 sm:p-8 flex flex-col h-full tint-brand">
                <div className="flex items-center justify-between gap-2">
                  <Chip color="brand" icon={<Film className="h-3.5 w-3.5" />} className="!whitespace-nowrap"><EditableText id="hero.card.badge">লেটেস্ট কোর্স · ব্যাচ ০৩</EditableText></Chip>
                </div>
                
                <div className="relative mt-5 w-full overflow-hidden rounded-2xl ring-1 ring-black/10 bg-black aspect-video group">
                  <div className="absolute inset-0 bg-gradient-to-br from-coral-500/20 to-brand-500/40 mix-blend-overlay" />
                  {/* হিরো সেকশনের কোর্সের থাম্বনেইলে এডিটর বসানো হলো */}
                  <EditableImage id="hero-featured-course-thumb" defaultSrc={batch01Thumbnail.url} className="w-full h-full object-cover" />
                  <div className="absolute left-3 top-3 pointer-events-none">
                    <span className="mono-readout rounded-md bg-black/50 px-2 py-1 text-white/90 backdrop-blur-sm">
                      <span className="rec-dot mr-1 align-middle" /> PREVIEW
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex-grow">
                  <h3 className="font-display text-2xl font-bold leading-tight"><EditableText id="hero.card.title">Advanced Video Editing &amp; Retelling</EditableText></h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                    <EditableText id="hero.card.desc">আমাদের পরবর্তী ব্যাচে আমরা একদম জিরো থেকে অ্যাডভান্স লেভেল পর্যন্ত ভিডিও এডিটিং শিখবো। এনরোলমেন্ট চলছে।</EditableText>
                  </p>
                  
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {["30 Days", "Live Classes", "Upcoming"].map((tag) => (
                      <span key={tag} className="rounded-full border border-foreground/10 bg-white/70 px-3 py-1 text-[11px] font-medium text-foreground/75">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-6">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-foreground"><EditableText id="hero.card.price">৳৩,০০০</EditableText></span>
                    <span className="text-xs text-foreground/50 line-through"><EditableText id="hero.card.priceOld">৳৫,০০০</EditableText></span>
                  </div>
                  <Link to="/courses/$slug" params={{ slug: "video-editing-batch-3" }} className="gloss-btn !px-5 !py-2.5 !text-sm">
                    <EditableText id="hero.card.cta">Enroll Now</EditableText>
                  </Link>
                </div>
              </div>
            </div>

            {/* Instructor / Start Date side info */}
            <div className="max-w-sm w-full space-y-6 flex flex-col justify-center">
              <div className="relative">
                <div className="pin" style={pinStyle("lemon")} />
                <div className="sticky-card p-6 tint-lemon">
                  <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-lemon-500" /> <EditableText id="hero.instructor.heading">Instructor</EditableText>
                  </h4>
                  <div className="mt-4 flex items-center gap-4 group">
                    <div className="h-12 w-12 shrink-0 rounded-full ring-2 ring-white shadow-sm overflow-hidden relative">
                       {/* ইনস্ট্রাক্টরের ছবিতে এডিটর বসানো হলো */}
                       <EditableImage id="hero-instructor-avatar" defaultSrc={instructorAtaullahNew.url} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-base font-semibold leading-tight"><EditableText id="hero.instructor.name">Muhammad Ataullah</EditableText></div>
                      <div className="mono-readout truncate text-[10px]"><EditableText id="hero.instructor.role">Lead Mentor</EditableText></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="pin" style={pinStyle("sky")} />
                <div className="sticky-card p-6 tint-sky">
                  <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-sky-500" /> <EditableText id="hero.schedule.heading">Batch Schedule</EditableText>
                  </h4>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="mono-readout text-[10px]"><EditableText id="hero.schedule.label">Class starts</EditableText></div>
                      <div className="mt-0.5 font-display text-base font-semibold"><EditableText id="hero.schedule.date">Jul 28, 2026</EditableText></div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-coral-500">
                      <span className="rec-dot" /> <EditableText id="hero.schedule.seats">12 seats left</EditableText>
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
    <div className="relative z-10 mt-16 sm:mt-24 pb-8 sm:pb-12">
      <div className="mono-readout text-center opacity-60"><EditableText id="socialProof.label">Learn Tools Trusted By Professionals</EditableText></div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/45 sm:gap-x-16 sm:text-sm">
        <EditableText id="socialProof.tool.premiere" className="transition-opacity hover:opacity-100">Premiere Pro</EditableText>
        <EditableText id="socialProof.tool.davinci" className="transition-opacity hover:opacity-100">DaVinci Resolve</EditableText>
        <EditableText id="socialProof.tool.afterEffects" className="transition-opacity hover:opacity-100">After Effects</EditableText>
      </div>
    </div>
  );
}

/* ---------- services ---------- */
// ... (Services part remains the same)
// Since this is a very long file, I am leaving the remaining components untouched.
// Please copy this upper part and replace it in your file.
