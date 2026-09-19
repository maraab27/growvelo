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
import { EditableImage } from "../cms/EditableImage";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "../../assets/logo.png.asset.json";
import batch01Thumbnail from "../../assets/batch-01-thumbnail.png.asset.json";
import instructorAtaullahNew from "../../assets/instructor-ataullah-new.png.asset.json";

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

export function Chip({ children, color = "mint", icon, className = "" }: { children: ReactNode; color?: ChipColor; icon?: ReactNode; className?: string }) {
  return (
    <span className={`chip ${className}`} style={chipStyle(color)}>
      {icon}
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, eyebrowColor = "mint", eyebrowIcon, before, gradWord, after, sub, align = "center", cmsId }: { eyebrow: string; eyebrowColor?: ChipColor; eyebrowIcon?: ReactNode; before: string; gradWord: string; after?: string; sub?: string; align?: "center" | "left"; cmsId?: string }) {
  const wrap = align === "center" ? "mx-auto max-w-5xl text-center" : "max-w-3xl text-left";
  const key = (part: string) => (cmsId ? `${cmsId}.${part}` : undefined);
  const T = ({ part, children, className }: { part: string; children: string; className?: string }) => {
    const id = key(part);
    if (!id) return <span className={className}>{children}</span>;
    return <EditableText id={id} className={className}>{children}</EditableText>;
  };
  return (
    <div className={wrap}>
      <Chip color={eyebrowColor} icon={eyebrowIcon}><T part="eyebrow">{eyebrow}</T></Chip>
      <h2 className="mt-5 font-display font-bold tracking-tight text-foreground" style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
        <T part="title">{before}</T> <T part="titleAccent" className="grad-text">{gradWord}</T>
        {after ? <> <T part="titleAfter">{after}</T></> : null}
      </h2>
      {sub && <p className="mx-auto mt-5 max-w-3xl text-sm text-foreground/65 sm:text-base"><T part="sub">{sub}</T></p>}
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

export function Nav({ session }: { session?: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-0 pt-0 sm:px-4 sm:pt-4">
      <header className="glass flex w-full max-w-6xl flex-col overflow-hidden !rounded-none border-x-0 border-t-0 px-3 py-2 sm:!rounded-full sm:border sm:px-5 sm:py-2">
        <div className="flex w-full items-center justify-between gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5" onClick={() => setOpen(false)}>
            <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl sm:h-10 sm:w-10" style={{ background: "linear-gradient(135deg, var(--brand), var(--coral))" }}>
              <EditableImage id="site-logo-main" defaultSrc={logoAsset.url} className="h-full w-full object-cover" />
            </div>
            <span className="truncate font-display text-base font-semibold tracking-tight sm:text-lg">
              <EditableText id="nav.brand.prefix">grow</EditableText><EditableText id="nav.brand.accent" className="grad-text">Velo</EditableText>
            </span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-medium text-foreground/70 lg:flex">
            {NAV_ITEMS.map((n) => (
              <Link key={n.to} to={n.to as "/"} activeOptions={n.exact ? { exact: true } : undefined} className="transition hover:text-foreground" activeProps={{ className: "!text-foreground" }}>
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
                <Link to="/auth" search={{ redirect: '/' }} className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground transition hover:bg-foreground/10 sm:h-10 sm:w-10" aria-label="Login">
                  <LogIn className="h-4 w-4" />
                </Link>
                <Link to="/courses/$slug" params={{ slug: 'video-editing-batch-3' }} className="gloss-btn !py-2 !px-4 !text-xs sm:!text-sm">
                  <EditableText id="nav.batch03">Batch 03</EditableText> <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
            <button type="button" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)} className="grid h-9 w-9 place-items-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground transition hover:bg-foreground/10 lg:hidden">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export type Editor = { slug: string; name: string; role: string; avatar: string; bio: string; skills: string[]; years: number; rate: string; tint: ChipColor; pin: ChipColor; works: any[] };
export const editors: Editor[] = [
  { slug: "ataullah", name: "Muhammad Ataullah", role: "Lead Mentor", avatar: instructorAtaullahNew.url, bio: "Cinematic storytelling expert.", skills: ["Premiere Pro"], years: 8, rate: "Lead", tint: "mint", pin: "brand", works: [] },
];
export function getEditor(slug: string) { return editors.find((e) => e.slug === slug); }

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-5 pt-32 pb-24 sm:pt-40 sm:pb-28 text-center">
        <h1 className="mt-6 font-display font-semibold tracking-tight text-foreground text-4xl sm:text-6xl">
          <EditableText id="hero.title.line1">Turn Your</EditableText> <EditableText id="hero.title.accent" className="grad-text">Passion</EditableText> into Profession.
        </h1>
        <div className="relative z-10 mx-auto mt-12 max-w-5xl">
          <div className="relative mt-5 w-full overflow-hidden rounded-2xl ring-1 ring-black/10 bg-black aspect-video">
            <EditableImage id="hero-featured-course-thumb" defaultSrc={batch01Thumbnail.url} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SocialProof() { return <div className="py-8 text-center text-sm opacity-60">Trusted by Professionals</div>; }
export function Services() { return null; }
export function CourseCategories() { return <FeaturedCourses />; }
export function Courses({ limit }: { limit?: number } = {}) { return <FeaturedCourses limit={limit} />; }
export function StudentReviews({ limit }: { limit?: number } = {}) { return <div className="py-12 text-center">Reviews Section</div>; }
export function Instructors({ limit }: { limit?: number } = {}) { return <div className="py-12 text-center">Instructors Section</div>; }
export function About() { return <div className="py-12 text-center">About Section</div>; }
export function FAQ() { return <div className="py-12 text-center">FAQ Section</div>; }
export function Contact() { return null; }
export function BigCTA() { return <div className="py-12 text-center">Big CTA</div>; }
export function Footer() { return <footer className="py-8 text-center">Footer</footer>; }

export type Course = { slug: string; title: string; level: string; length: string; price: string; oldPrice?: string; thumb: string; desc: string; tint: ChipColor; pin: ChipColor; chipColor: ChipColor; featured?: boolean; start: string; instructor: string; about: string; outcomes: string[]; modules: any[] };
export const COURSES: Course[] = [
  { slug: "video-editing-batch-3", title: "Advanced Video Editing", level: "Pro", length: "30 days", price: "৳৩,০০০", thumb: "linear-gradient(135deg,#7c5cff,#22d3ee)", desc: "Advanced course", tint: "brand", pin: "brand", chipColor: "brand", start: "Soon", instructor: "Ataullah", about: "About course", outcomes: [], modules: [] }
];

export function FeaturedCourses({ limit, isHomePage }: { limit?: number; isHomePage?: boolean } = {}) {
  return <div className="py-12 text-center">Featured Courses</div>;
}
export function StudentShowcase({ limit }: { limit?: number } = {}) { return <div className="py-12 text-center">Showcase</div>; }

export function SiteShell({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any>(null);
  useEffect(() => { supabase.auth.getSession().then(({ data: { session } }) => setSession(session)); }, []);
  return <main className="relative min-h-screen overflow-x-hidden"><Nav session={session} />{children}<Footer /></main>;
}
export { Chip as Eyebrow };
