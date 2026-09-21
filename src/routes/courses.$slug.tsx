import { EditableImage } from "@/components/cms/EditableImage";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Lock,
  Play,
  ArrowLeft,
  CalendarDays,
  Clock,
  User,
  X,
  Radio,
  MessageSquare,
  Briefcase,
  Gift,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { SiteShell, COURSES } from "../components/site/sections";
import { supabase } from "@/integrations/supabase/client";
import { EditableText } from "@/components/cms/EditableText";

// ২৪ ঘণ্টার রোলিং কাউন্টডাউন হুক
function useEvergreenTimer(hoursDuration = 24) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const storageKey = "batch03_offer_deadline";
    let deadline = localStorage.getItem(storageKey);

    if (!deadline) {
      const targetTime = new Date().getTime() + hoursDuration * 60 * 60 * 1000;
      deadline = targetTime.toString();
      localStorage.setItem(storageKey, deadline);
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      let diff = parseInt(deadline!, 10) - now;

      if (diff <= 0) {
        const resetTarget = new Date().getTime() + hoursDuration * 60 * 60 * 1000;
        localStorage.setItem(storageKey, resetTarget.toString());
        diff = resetTarget - now;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [hoursDuration]);

  return timeLeft;
}

function EnrollmentModal({
  courseSlug,
  onClose,
  onSuccess,
}: {
  courseSlug: string;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    method: "bKash",
    trxId: "",
  });

  const paymentNumber = "01790055690";
  const supportWhatsapp = "8801410341220";

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.trxId) {
      alert("Please fill in all the required fields.");
      return;
    }

    const message = `Hello growVelo, I have sent an enrollment request for Batch 03.
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email || "N/A"}
Method: ${formData.method}
TrxID: ${formData.trxId}`;

    const whatsappUrl = `https://wa.me/${supportWhatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="glass-strong rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-border/80 shadow-2xl relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="mb-6">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Confirm Your Seat in Batch 03
              </h3>
              <p className="text-sm text-muted-foreground mt-1 font-sans">
                Send money to the number below and complete the verification form.
              </p>
            </div>

            <div className="glass rounded-2xl p-4 border border-primary/20 bg-primary/5 mb-6 space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-foreground">bKash / Nagad (Personal)</span>
                <span className="text-primary font-mono font-bold text-base">৳3,000</span>
              </div>
              <div className="flex items-center justify-between gap-2 bg-background/50 p-2.5 rounded-xl border border-border/50">
                <code className="text-sm sm:text-base font-mono font-bold tracking-wider text-foreground">
                  {paymentNumber}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs rounded-lg glass font-sans flex items-center gap-1.5 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm font-sans">
              <div>
                <label className="block text-foreground font-medium mb-1.5 text-xs uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahim Maraab"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary text-foreground text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground font-medium mb-1.5 text-xs uppercase tracking-wider">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="block text-foreground font-medium mb-1.5 text-xs uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary text-foreground text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground font-medium mb-1.5 text-xs uppercase tracking-wider">
                    Payment Method *
                  </label>
                  <select
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary text-foreground text-sm bg-background"
                  >
                    <option value="bKash">bKash Personal</option>
                    <option value="Nagad">Nagad Personal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-foreground font-medium mb-1.5 text-xs uppercase tracking-wider">
                    Transaction ID (TrxID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BL92XK82"
                    value={formData.trxId}
                    onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary text-foreground text-sm font-mono uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-5 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-[0.99] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Confirmation Message</span>
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Request Generated!
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed font-sans">
              WhatsApp window has been opened. Hit send and our team will verify your payment and grant instant Discord access.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl glass text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseDetail() {
  const { slug } = Route.useParams();
  const course = COURSES.find((c) => c.slug === slug)!;
  const [enrolled, setEnrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const timer = useEvergreenTimer(24);

  useEffect(() => {
    const checkEnrollment = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from("course_enrollments")
        .select("status")
        .eq("user_id", session.user.id)
        .eq("course_slug", slug)
        .eq("status", "approved")
        .maybeSingle();

      if (data) setEnrolled(true);
    };
    checkEnrollment();
  }, [slug]);

  const totalLessons = course.modules.reduce((n, m) => n + m.lessons.length, 0);
  const freeLessons = course.modules.reduce(
    (n, m) => n + m.lessons.filter((l) => l.free).length,
    0
  );

  const formatDigit = (num: number) => String(num).padStart(2, "0");

  return (
    <SiteShell>
      {showModal && (
        <EnrollmentModal
          courseSlug={slug}
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}

      {showLockedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="sticky-card tint-brand relative w-full max-w-md overflow-hidden p-6 sm:p-8">
            <button
              onClick={() => setShowLockedModal(false)}
              className="absolute right-4 top-4 text-foreground/40 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)]/10 text-[var(--brand)]">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold">This lesson is locked</h2>
            <p className="mt-2 text-sm text-foreground/70 font-sans">
              Enroll in Batch 03 to unlock all {totalLessons} lessons, live Discord sessions, and resources.
            </p>
            <div className="mt-8 space-y-3">
              <button
                onClick={() => {
                  setShowLockedModal(false);
                  setShowModal(true);
                }}
                className="gloss-btn w-full justify-center"
              >
                Enroll Now
              </button>
              <button
                onClick={() => setShowLockedModal(false)}
                className="w-full py-2 text-sm font-medium text-foreground/50 hover:text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative aspect-video w-full max-w-4xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-white/70"
            >
              <X className="h-6 w-6" />
            </button>
            <iframe
              className="h-full w-full rounded-xl"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <section className="bg-background min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* All courses লিঙ্ক: ৩০-৪০% ছোট এবং স্লিক মিনিমাল অ্যাডজাস্টমেন্ট */}
          <Link
            to="/courses"
            className="mb-6 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-opacity hover:opacity-60 text-foreground/60"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>All courses</span>
          </Link>

          {/* ================= আপগ্রেডেড টপ ফোল্ড ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* বামপাশ: ভ্যালু প্রোপজিশন ও ৪টি কার্ড */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {/* চারকোনা হালকা কার্ভ ব্যাজ */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-border/80 bg-foreground/[0.04] w-fit shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-[1px] bg-primary shrink-0"></span>
                <span className="text-xs sm:text-[13px] font-medium tracking-normal text-foreground/90 font-sans">
                  <EditableText id={`course.${course.slug}.hero.badge`}>
                    Batch 03 • Live Masterclass + Private Discord Community
                  </EditableText>
                </span>
              </div>

              {/* মেইন হেডিং */}
              <h1 className="font-bangla font-extrabold tracking-tight text-foreground leading-[1.22] text-[clamp(2rem,3.4vw+0.5rem,3rem)]">
                <EditableText id={`course.${course.slug}.hero.title`}>
                  ভিডিও এডিটিংকে বানান আপনার ক্যারিয়ারের সেরা সুপারপাওয়ার
                </EditableText>
              </h1>

              {/* সাবটাইটেল */}
              <p className="font-bangla text-base text-foreground/80 leading-relaxed">
                <EditableText id={`course.${course.slug}.hero.subtitle`}>
                  একদম বেসিক থেকে শুরু করে রিয়েল লাইফ প্রজেক্টের মাধ্যমে শিখুন সিনেমাটিক স্টোরিটেলিং, প্রিমিয়ার প্রো এবং আফটার ইফেক্টস।
                </EditableText>
              </p>

              {/* ৪টি কোর বেনিফিট কার্ড */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                
                {/* কার্ড ১ */}
                <div className="glass p-4 rounded-2xl border border-border/60 flex items-start gap-3.5 hover:border-primary/30 transition duration-200">
                  <div className="p-2.5 rounded-xl bg-destructive/10 text-destructive shrink-0 mt-0.5">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bangla font-semibold text-sm sm:text-base text-foreground">
                      <EditableText id={`course.${course.slug}.benefit.1.title`}>
                        হাতে-কলমে লাইভ সেশন
                      </EditableText>
                    </h3>
                    <p className="font-bangla text-xs sm:text-[13px] text-foreground/75 leading-relaxed">
                      <EditableText id={`course.${course.slug}.benefit.1.desc`}>
                        স্ক্রিন শেয়ারে প্র্যাকটিক্যাল কাজ শেখা এবং আজীবন ক্লাউড রেকর্ডিং অ্যাক্সেস।
                      </EditableText>
                    </p>
                  </div>
                </div>

                {/* কার্ড ২ */}
                <div className="glass p-4 rounded-2xl border border-border/60 flex items-start gap-3.5 hover:border-primary/30 transition duration-200">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bangla font-semibold text-sm sm:text-base text-foreground">
                      <EditableText id={`course.${course.slug}.benefit.2.title`}>
                        ২৪/৭ ডিসকর্ড হেল্পডেস্ক
                      </EditableText>
                    </h3>
                    <p className="font-bangla text-xs sm:text-[13px] text-foreground/75 leading-relaxed">
                      <EditableText id={`course.${course.slug}.benefit.2.desc`}>
                        স্টুডেন্ট কমিউনিটি, যেকোনো টেকনিক্যাল সাপোর্ট ও উইকলি মেন্টর ফিডব্যাক।
                      </EditableText>
                    </p>
                  </div>
                </div>

                {/* কার্ড ৩ */}
                <div className="glass p-4 rounded-2xl border border-border/60 flex items-start gap-3.5 hover:border-primary/30 transition duration-200">
                  <div className="p-2.5 rounded-xl bg-accent/20 text-foreground shrink-0 mt-0.5">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bangla font-semibold text-sm sm:text-base text-foreground">
                      <EditableText id={`course.${course.slug}.benefit.3.title`}>
                        মার্কেটপ্লেস ও ডিরেক্ট ক্লায়েন্ট
                      </EditableText>
                    </h3>
                    <p className="font-bangla text-xs sm:text-[13px] text-foreground/75 leading-relaxed">
                      <EditableText id={`course.${course.slug}.benefit.3.desc`}>
                        স্ট্রং পোর্টফোলিও তৈরি এবং সরাসরি হাই-টিকেটিং ক্লায়েন্ট হান্টিং গাইড।
                      </EditableText>
                    </p>
                  </div>
                </div>

                {/* কার্ড ৪ */}
                <div className="glass p-4 rounded-2xl border border-border/60 flex items-start gap-3.5 hover:border-primary/30 transition duration-200">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bangla font-semibold text-sm sm:text-base text-foreground">
                      <EditableText id={`course.${course.slug}.benefit.4.title`}>
                        এডিটিং রিসোর্স প্যাক
                      </EditableText>
                    </h3>
                    <p className="font-bangla text-xs sm:text-[13px] text-foreground/75 leading-relaxed">
                      <EditableText id={`course.${course.slug}.benefit.4.desc`}>
                        প্রিমিয়াম সাউন্ড এফেক্টস (SFX), কালার LUTs এবং রেডি মোশন প্রিসেট ফাইল।
                      </EditableText>
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* ডানপাশ: স্টিকি কার্ড */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="glass-strong rounded-3xl p-6 sm:p-7 border border-border/60 shadow-xl overflow-hidden backdrop-blur-md">
                
                {/* প্রিভিউ ইমেজ */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/40 group mb-5">
                  <EditableImage
                    id={`course.thumb.${course.slug}`}
                    defaultSrc={course.thumb?.startsWith("http") ? course.thumb : ""}
                    alt="Batch 03 Preview"
                    className="w-full h-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/25 transition-colors">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-[4px] text-xs font-medium bg-black/70 text-white backdrop-blur-md border border-white/10 font-sans">
                      <EditableText id={`course.${course.slug}.preview.badge`}>
                        Curriculum Preview
                      </EditableText>
                    </span>
                  </div>
                </div>

                {/* প্রাইসিং ও স্পষ্ট ৫০০০ টাকার স্ট্রাইকথ্রু ক্রস লাইন */}
                <div className="flex items-baseline justify-between mb-4">
                  <div className="flex items-baseline gap-3">
                    {/* ৩,০০০ টাকা ছাড়ের অফার প্রাইস */}
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                      <EditableText id={`course.${course.slug}.price`}>{course.price || "৳৩,০০০"}</EditableText>
                    </span>

                    {/* ৫,০০০ টাকা ক্রস (স্পষ্ট ভিজিবল স্ট্রাইকথ্রু) */}
                    <span className="text-base sm:text-lg text-muted-foreground/60 line-through decoration-rose-500/80 decoration-[1.5px] font-mono font-medium">
                      <EditableText id={`course.${course.slug}.oldPrice`}>৳৫,০০০</EditableText>
                    </span>
                  </div>

                  <span className="px-3 py-1 text-xs font-semibold rounded-[4px] bg-primary/10 text-primary border border-primary/20 font-sans">
                    <EditableText id={`course.${course.slug}.discount.tag`}>
                      40% OFF (Limited Time)
                    </EditableText>
                  </span>
                </div>

                {/* হাইলাইটেড কাউন্টডাউন টাইমার */}
                <div className="mb-5 p-3 sm:p-3.5 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2 font-sans font-medium text-xs sm:text-[13px] text-amber-600 dark:text-amber-400">
                    <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                    <span className="tracking-tight font-semibold">Special Offer Ends In:</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold">
                    <span className="px-2 py-1 rounded-lg bg-background/90 text-foreground border border-amber-500/20 shadow-xs">
                      {formatDigit(timer.hours)}h
                    </span>
                    <span className="text-amber-500">:</span>
                    <span className="px-2 py-1 rounded-lg bg-background/90 text-foreground border border-amber-500/20 shadow-xs">
                      {formatDigit(timer.minutes)}m
                    </span>
                    <span className="text-amber-500">:</span>
                    <span className="px-2 py-1 rounded-lg bg-background/90 text-rose-600 dark:text-rose-400 border border-rose-500/20 shadow-xs">
                      {formatDigit(timer.seconds)}s
                    </span>
                  </div>
                </div>

                {/* মেটা ইনফরমেশন তালিকা: থিম কালার টিউন করা আইকনবক্স */}
                <div className="space-y-3.5 mb-6 border-y border-border/40 py-4 font-sans text-sm">
                  
                  {/* আইটেম ১: ব্যাচ শুরু ১৫ অক্টোবর */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 text-foreground/70 font-medium">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                        <CalendarDays className="h-3.5 w-3.5" />
                      </div>
                      <span>
                        <EditableText id={`course.${course.slug}.label.1`}>Batch Starts</EditableText>
                      </span>
                    </div>
                    <span className="font-semibold text-foreground/95 text-right">
                      <EditableText id={`course.${course.slug}.info.1`}>
                        October 15, 2026
                      </EditableText>
                    </span>
                  </div>

                  {/* আইটেম ২: সময়কাল */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 text-foreground/70 font-medium">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                        <Clock className="h-3.5 w-3.5" />
                      </div>
                      <span>
                        <EditableText id={`course.${course.slug}.label.2`}>Duration</EditableText>
                      </span>
                    </div>
                    <span className="font-normal text-foreground/90 text-right">
                      <EditableText id={`course.${course.slug}.info.2`}>
                        {course.length || "30 Days Intensive"}
                      </EditableText>
                    </span>
                  </div>

                  {/* আইটেম ৩: মেন্টর */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 text-foreground/70 font-medium">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <span>
                        <EditableText id={`course.${course.slug}.label.3`}>Mentor</EditableText>
                      </span>
                    </div>
                    <span className="font-normal text-foreground/90 text-right">
                      <EditableText id={`course.${course.slug}.info.3`}>
                        {course.instructor || "Muhammad Ataullah"}
                      </EditableText>
                    </span>
                  </div>

                  {/* আইটেম ৪: প্ল্যাটফর্ম */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 text-foreground/70 font-medium">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                        <Send className="h-3.5 w-3.5" />
                      </div>
                      <span>
                        <EditableText id={`course.${course.slug}.label.4`}>Platform</EditableText>
                      </span>
                    </div>
                    <span className="font-normal text-foreground/90 text-right">
                      <EditableText id={`course.${course.slug}.info.4`}>
                        Discord Live Sessions
                      </EditableText>
                    </span>
                  </div>

                  {/* আইটেম ৫: পান্না-সবুজ অ্যাক্সেস ব্যাজ */}
                  <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 dark:bg-emerald-950/30 dark:border-emerald-500/40 transition-colors">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                        <ShieldCheck className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs uppercase tracking-wider font-semibold">
                        <EditableText id={`course.${course.slug}.label.5`}>Access</EditableText>
                      </span>
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 text-right">
                      <EditableText id={`course.${course.slug}.info.5`}>
                        Lifetime Cloud Backup
                      </EditableText>
                    </span>
                  </div>

                </div>

                {enrolled ? (
                  <Link
                    to="/courses/$slug/lessons/$lessonId"
                    params={{ slug, lessonId: "intro" }}
                    className="gloss-btn w-full justify-center !py-3.5 text-base font-bold"
                  >
                    Access Unlocked • Start Learning
                  </Link>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.99] transition-all duration-150 font-sans"
                  >
                    <EditableText id={`course.${course.slug}.cta.button`}>
                      Enroll in Batch 03 Now
                    </EditableText>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <p className="mt-3 text-center text-xs text-muted-foreground font-sans">
                  Instant WhatsApp seat confirmation flow
                </p>

              </div>
            </div>

          </div>

          {/* ================= কারিকুলাম সেকশন ================= */}
          <div className="mt-16 sm:mt-24">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              <EditableText id={`course.${course.slug}.curriculum.heading`}>
                {course.curriculumHeading || "Course curriculum"}
              </EditableText>
            </h2>
            <p className="mono-readout mt-2">
              <EditableText id={`course.${course.slug}.curriculum.summary`}>
                {`${course.modules.length} modules • ${totalLessons} lessons`}
              </EditableText>
            </p>

            <div className="mt-6 space-y-4">
              {course.modules.map((m, moduleIndex) => (
                <div key={m.title} className="sticky-card p-4 sm:p-5">
                  <div className="font-display text-base font-semibold">
                    <EditableText id={`course.${course.slug}.module.${moduleIndex + 1}.title`}>
                      {m.title}
                    </EditableText>
                  </div>
                  <div className="mt-3 divide-y divide-foreground/10">
                    {m.lessons.map((l: any) => {
                      const open = l.free || enrolled;
                      return (
                        <div
                          key={l.title}
                          onClick={() => {
                            if (open) {
                              l.videoId && setActiveVideo(l.videoId);
                            } else {
                              setShowLockedModal(true);
                            }
                          }}
                          className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:py-3 sm:gap-3 group transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div
                              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all group-active:scale-90 ${
                                open
                                  ? "bg-[var(--brand)]/15 text-[var(--brand)] group-hover:scale-110"
                                  : "bg-foreground/5 text-foreground/30"
                              }`}
                            >
                              {open ? <Play className="h-3.5 w-3.5 fill-current" /> : <Lock className="h-3.5 w-3.5" />}
                            </div>
                            <span
                              className={`text-sm font-medium leading-tight line-clamp-2 transition-colors ${
                                open ? "text-foreground group-hover:text-[var(--brand)]" : "text-foreground/40"
                              }`}
                            >
                              {l.title}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pl-[48px] sm:ml-auto sm:pl-8 sm:shrink-0">
                            {l.free && !enrolled && (
                              <span className="rounded-full bg-[var(--mint)]/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--mint)]">
                                Free
                              </span>
                            )}
                            <span className="mono-readout text-xs font-semibold text-foreground/40 sm:ml-4">
                              {l.length}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </SiteShell>
  );
}

export const Route = createFileRoute("/courses/$slug")({
  beforeLoad: ({ params }) => {
    const exists = COURSES.some((c) => c.slug === params.slug);
    if (!exists) throw notFound();
  },
  head: ({ params }) => {
    const c = COURSES.find((x) => x.slug === params.slug);
    const title = c ? `${c.title} • growVelo Courses` : "Course • growVelo";
    const description = c?.desc ?? "growVelo editing course details.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-[900px] px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">Course not found</h1>
        <Link to="/courses" className="gloss-btn mt-6 inline-flex">
          Back to courses
        </Link>
      </div>
    </SiteShell>
  ),
  errorComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-[900px] px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">Something went wrong</h1>
        <Link to="/courses" className="gloss-btn mt-6 inline-flex">
          Back to courses
        </Link>
      </div>
    </SiteShell>
  ),
  component: CourseDetail,
});
