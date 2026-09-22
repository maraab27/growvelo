import { EditableImage } from "@/components/cms/EditableImage";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
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
  Film,
  Globe,
  XCircle,
  Sparkles,
  ChevronDown,
  BookOpen,
  HelpCircle,
  LayoutDashboard,
  Workflow,
  HelpCircle as MessageCircleQuestion,
  TrendingUp,
  AlertCircle,
  Smartphone,
  CheckSquare,
  AlertTriangle,
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
    const storageKey = "growvelo_offer_deadline";
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

// ==========================================
// ১. ব্যাচ ১ এর সম্পন্ন হওয়া সম্পর্কিত পপ-আপ
// ==========================================
function BatchCompletedModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 font-bangla">
      <div 
        className="glass-strong rounded-3xl max-w-md w-full p-6 sm:p-8 border border-border/80 shadow-2xl relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 inline-block mb-3">
          Batch 01 Completed
        </span>

        <h3 className="text-xl sm:text-2xl font-black text-foreground leading-snug">
          এই ব্যাচটি সম্পন্ন হয়ে গেছে!
        </h3>

        <p className="text-sm text-foreground/80 leading-relaxed mt-3 mb-6">
          আমাদের <strong>Rising Editors (Batch 01)</strong> এর ১৫ দিনের ফ্রি বুটক্যাম্প সফলভাবে শেষ হয়েছে। বর্তমানে আমাদের প্রিমিয়াম ও অ্যাডভান্সড <strong>Batch 03</strong> এর সিট বুকিং চলছে।
        </p>

        <div className="space-y-2.5">
          <button
            onClick={() => {
              onClose();
              navigate({
                to: "/courses/$slug",
                params: { slug: "batch-03" },
                search: { enroll: true },
              });
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>ব্যাচ ৩ এ জয়েন করুন (Join Batch 03)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ২. ব্যাচ ৩ এর পেমেন্ট ও এনরোলমেন্ট মডাল
// ==========================================
function EnrollmentModal({
  courseSlug,
  onClose,
}: {
  courseSlug: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"bKash" | "Nagad">("bKash");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
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
      alert("অনুগ্রহ করে আপনার নাম, হোয়াটসঅ্যাপ নম্বর এবং ট্রানজেকশন আইডি দিন।");
      return;
    }

    const message = `Hello growVelo, I have sent an enrollment request for Batch 03.
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email || "N/A"}
Method: ${selectedMethod} Personal
TrxID: ${formData.trxId}`;

    const whatsappUrl = `https://wa.me/${supportWhatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="glass-strong rounded-3xl max-w-lg w-full p-5 sm:p-7 border border-border/80 shadow-2xl relative max-h-[92vh] overflow-y-auto font-bangla text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass text-muted-foreground hover:text-foreground transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-5">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Total Fee</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono mt-0.5">৳৩,০০০</div>
              <h3 className="font-bangla text-base font-bold text-foreground mt-1.5">
                ব্যাচ ৩ এ সিট কনফার্মেশন ও পেমেন্ট
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl glass border border-border/70 mb-4 bg-foreground/[0.03]">
              <button
                type="button"
                onClick={() => setSelectedMethod("bKash")}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  selectedMethod === "bKash"
                    ? "bg-[#E2136E] text-white shadow-md"
                    : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <span>bKash (বিকাশ)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod("Nagad")}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  selectedMethod === "Nagad"
                    ? "bg-[#F7921E] text-white shadow-md"
                    : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <span>Nagad (নগদ)</span>
              </button>
            </div>

            <div className="glass rounded-2xl p-4 border border-primary/30 bg-primary/5 mb-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-foreground/90 font-medium">
                  সেন্ড মানি করার নম্বর ({selectedMethod}):
                </span>
                <span className="px-2 py-0.5 rounded-md bg-foreground/10 text-[11px] font-mono font-bold text-foreground">
                  Personal
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 bg-background/90 p-2.5 rounded-xl border border-border/80 shadow-2xs">
                <code className="text-sm sm:text-base font-mono font-bold tracking-wider text-foreground">
                  {paymentNumber}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs rounded-lg glass font-sans flex items-center gap-1.5 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/25 text-destructive text-xs sm:text-[13px] font-semibold leading-relaxed flex items-start gap-2 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-destructive" />
              <span>
                দয়া করে <strong>"Send Money" (সেন্ড মানি)</strong> করবেন। এটি পার্সোনাল নম্বর, তাই ভুল করেও "Payment" অপশনে যাবেন না।
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-foreground font-medium mb-1 uppercase tracking-wider text-[11px]">
                  আপনার পূর্ণ নাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মাহিম মারাব"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary text-foreground text-xs sm:text-sm bg-background/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-foreground font-medium mb-1 uppercase tracking-wider text-[11px]">
                    সচল হোয়াটসঅ্যাপ নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary text-foreground text-xs sm:text-sm bg-background/50"
                  />
                </div>
                <div>
                  <label className="block text-foreground font-medium mb-1 uppercase tracking-wider text-[11px]">
                    ইমেইল এড্রেস (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary text-foreground text-xs sm:text-sm bg-background/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground font-medium mb-1 uppercase tracking-wider text-[11px]">
                  Transaction ID (TrxID) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: BL92XK82"
                  value={formData.trxId}
                  onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary text-foreground text-xs sm:text-sm font-mono uppercase bg-background/50"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl glass text-foreground font-semibold text-xs sm:text-sm hover:bg-foreground/5 transition-colors cursor-pointer"
                >
                  ফিরে যান
                </button>
                <button
                  type="submit"
                  className="flex-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>আমি পেমেন্ট করেছি (I've Paid)</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bangla text-xl font-bold text-foreground">
              রিকোয়েস্ট প্রস্তুত হয়েছে!
            </h3>
            <p className="font-bangla text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              হোয়াটসঅ্যাপ উইন্ডো ওপেন হয়েছে। মেসেজটি সেন্ড করলেই আমাদের টিম পেমেন্ট ভেরিফাই করে আপনাকে ইনস্ট্যান্ট ডিসকর্ড অ্যাক্সেস দিয়ে দেবে।
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl glass text-sm font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              উইন্ডো বন্ধ করুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// ৩. মাস্টার রুট কম্পোনেন্ট
// ==========================================
function CourseDetail() {
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const course = COURSES.find((c) => c.slug === slug)!;
  const [enrolled, setEnrolled] = useState(false);
  
  // মডাল কন্ট্রোল
  const [showBatch3Modal, setShowBatch3Modal] = useState<boolean>(!!search?.enroll);
  const [showBatch1FinishedModal, setShowBatch1FinishedModal] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "included" | "how" | "faq">("overview");

  // ব্যাচ ১ সুনির্দিষ্ট চেক
  const isBatch1 = slug === "batch-01" || slug === "rising-editors" || slug.toLowerCase().includes("batch-1");
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

  const formatDigit = (num: number) => String(num).padStart(2, "0");

  const tabList = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "curriculum", label: "Curriculum", icon: BookOpen },
    { id: "included", label: "What's Included", icon: Gift },
    { id: "how", label: "How It Works", icon: Workflow },
    { id: "faq", label: "FAQ", icon: MessageCircleQuestion },
  ] as const;

  const previewVideoId = course.introVideoId || course.modules?.[0]?.lessons?.[0]?.videoId || null;

  // বাটন ক্লিক হ্যান্ডলার
  const handleEnrollClick = () => {
    if (isBatch1) {
      setShowBatch1FinishedModal(true); // ব্যাচ ১ এর জন্য শেষ হওয়ার পপ-আপ
    } else {
      setShowBatch3Modal(true); // ব্যাচ ৩ এর জন্য পেমেন্ট পপ-আপ
    }
  };

  return (
    <div className="[&>div>footer]:!hidden [&>footer]:!hidden [&_img]:select-none [&_img]:pointer-events-auto [&_img]:[user-drag:none] [&_img]:[-webkit-user-drag:none]">
      <SiteShell>
        {/* ব্যাচ ৩ পেমেন্ট মডাল */}
        {showBatch3Modal && (
          <EnrollmentModal
            courseSlug="batch-03"
            onClose={() => setShowBatch3Modal(false)}
          />
        )}

        {/* ব্যাচ ১ সম্পন্ন হওয়ার স্পেশাল পপ-আপ */}
        {showBatch1FinishedModal && (
          <BatchCompletedModal onClose={() => setShowBatch1FinishedModal(false)} />
        )}

        {showLockedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-bangla">
            <div className="sticky-card tint-brand relative w-full max-w-md overflow-hidden p-6 sm:p-8">
              <button
                onClick={() => setShowLockedModal(false)}
                className="absolute right-4 top-4 text-foreground/40 hover:text-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)]/10 text-[var(--brand)]">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-bangla text-xl font-bold">এই লেসনটি লক করা আছে</h2>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                পুরো কোর্সের এক্সেস পেতে আপনাকে এই কোর্সে এনরোল করতে হবে।
              </p>
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => {
                    setShowLockedModal(false);
                    handleEnrollClick();
                  }}
                  className="gloss-btn w-full justify-center cursor-pointer"
                >
                  এখনই এনরোল করুন
                </button>
                <button
                  onClick={() => setShowLockedModal(false)}
                  className="w-full py-2 text-sm font-medium text-foreground/50 hover:text-foreground cursor-pointer"
                >
                  পরে দেখব
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
                className="absolute -top-10 right-0 text-white hover:text-white/70 cursor-pointer"
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

        <div className="pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-x-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <Link
              to="/courses"
              className="mb-6 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-opacity hover:opacity-60 text-foreground/60"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>All courses</span>
            </Link>

            {/* ================= টপ ফোল্ড ব্যানার ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 sm:mb-20">
              
              <div className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-6 font-bangla min-w-0">
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-border/80 bg-foreground/[0.04] w-fit shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-[1px] bg-primary shrink-0"></span>
                  <span className="text-xs sm:text-[13px] font-medium tracking-normal text-foreground/90 font-sans truncate">
                    {isBatch1 
                      ? "ONLINE RISING EDITORS BATCH - 1 • 15 Days Free Bootcamp"
                      : "Batch 03 • Live Masterclass + Private Discord Community"}
                  </span>
                </div>

                {/* থাম্বনেইল ও হেডলাইন কার্ড */}
                <div className="glass-strong rounded-3xl border border-border/70 shadow-lg relative overflow-hidden backdrop-blur-md select-none">
                  
                  {/* মোবাইল এজ-টু-এজ ব্যানার */}
                  <div className="block lg:hidden w-full border-b border-border/40 select-none">
                    <div 
                      onClick={() => previewVideoId && setActiveVideo(previewVideoId)}
                      onContextMenu={(e) => e.preventDefault()}
                      className={`relative aspect-video w-full group select-none ${previewVideoId ? "cursor-pointer" : ""}`}
                    >
                      <EditableImage
                        id={`course.thumb.${course.slug}`}
                        defaultSrc={course.thumb?.startsWith("http") ? course.thumb : ""}
                        alt={course.title}
                        className="w-full h-full pointer-events-none select-none"
                        imgClassName="transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none [user-drag:none] [-webkit-user-drag:none]"
                      />
                      {previewVideoId && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors pointer-events-auto">
                          <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* হেডলাইন ও ডেসক্রিপশন */}
                  <div className="p-5 sm:p-7 space-y-4">
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold uppercase text-primary tracking-wider">
                      <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20">
                        {isBatch1 ? "15 Days Free Course" : "Masterclass"}
                      </span>
                      <span>•</span>
                      <span className="text-muted-foreground">Beginner to Pro</span>
                    </div>

                    <h1 className="font-bangla font-extrabold tracking-tight text-foreground leading-[1.25] text-2xl sm:text-3xl lg:text-4xl text-left break-words">
                      {isBatch1 
                        ? "ভিডিও এডিটিং শিখতে চান, কিন্তু কোথা থেকে শুরু করবেন বুঝতে পারছেন না?" 
                        : course.title}
                    </h1>

                    {/* ডেসক্রিপশন */}
                    <div className="space-y-3.5 text-sm sm:text-base text-foreground/80 leading-[1.7] font-bangla border-t border-border/40 pt-4">
                      {isBatch1 ? (
                        <>
                          <p className="font-normal text-foreground/80">
                            বর্তমানে Content Creator, Business Owner এবং Freelancer—সবারই Video Editor প্রয়োজন। কিন্তু বেশিরভাগ মানুষ সঠিক Roadmap না পেয়ে শিখতে পারে না।
                          </p>
                          <p className="font-normal text-foreground/80">
                            এই সমস্যার সমাধান হিসেবে আমরা আয়োজন করেছি ১৫ দিনের Free Video Editing Course, যেখানে প্রতিদিন Step-by-Step প্র্যাকটিক্যালভাবে শেখানো হবে।
                          </p>
                          <p className="font-normal text-foreground/90 font-medium">
                            কোনো Paid Course কেনার আগে এই Free Course থেকেই আপনি আপনার এডিটিং ক্যারিয়ার শুরু করতে পারেন।
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-normal text-foreground/80">
                            ইউটিউবে শত শত টিউটোরিয়াল দেখেও আসল এডিটিং ফ্লো মিলছে না? শুধু সফটওয়্যারের বাটন চেনা কোনো স্থায়ী স্কিল নয়।
                          </p>
                          <p className="font-normal text-foreground/80">
                            এই মাস্টারক্লাসে আপনি শিখবেন আন্তর্জাতিক মানের সিনেমাটিক স্টোরিটেলিং, ৩ সেকেন্ড রিটেনশন হুক এবং সাউন্ড ডিজাইনের আসল সিক্রেট।
                          </p>
                          <p className="font-normal text-foreground/80">
                            একদম স্ক্র্যাচ থেকে শুরু করে রিয়েল লাইফ ক্লায়েন্ট প্রজেক্টের মাধ্যমে নিজের হাই পেয়িং পোর্টফোলিও তৈরি করুন আমাদের সাথে।
                          </p>
                        </>
                      )}
                    </div>

                    {/* মোবাইল বাটন */}
                    <div className="block lg:hidden pt-4 border-t border-border/40 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground block font-mono">Course Fee</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-foreground font-mono">
                            {isBatch1 ? "FREE" : "৳৩,০০০"}
                          </span>
                          {!isBatch1 && <span className="text-xs text-muted-foreground line-through font-mono">৳৫,০০০</span>}
                        </div>
                      </div>
                      <button
                        onClick={handleEnrollClick}
                        className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                      >
                        <span>{isBatch1 ? "Enroll in Batch 01" : "Enroll in Batch 03"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>

                {/* ৪টি কোর বেনিফিট কার্ড */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="glass p-4 sm:p-4.5 rounded-2xl border border-border/60 flex items-start gap-3.5 hover:border-primary/30 transition duration-200">
                    <div className="p-2.5 rounded-xl bg-destructive/10 text-destructive shrink-0 mt-0.5">
                      <Radio className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-bangla font-bold text-sm sm:text-base text-foreground">
                        হাতে কলমে লাইভ সেশন
                      </h3>
                      <p className="font-bangla text-xs sm:text-[13px] text-foreground/75 leading-relaxed">
                        {isBatch1 ? "১ জুলাই ২০২৬ থেকে শুরু হতে যাওয়া লাইভ বুটক্যাম্প।" : "স্ক্রিন শেয়ারে প্র্যাকটিক্যাল কাজ শেখা এবং আজীবন ক্লাউড রেকর্ডিং অ্যাক্সেস।"}
                      </p>
                    </div>
                  </div>

                  <div className="glass p-4 sm:p-4.5 rounded-2xl border border-border/60 flex items-start gap-3.5 hover:border-primary/30 transition duration-200">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-bangla font-bold text-sm sm:text-base text-foreground">
                        {isBatch1 ? "হোয়াটসঅ্যাপ সাপোর্ট" : "২৪/৭ ডিসকর্ড হেল্পডেস্ক"}
                      </h3>
                      <p className="font-bangla text-xs sm:text-[13px] text-foreground/75 leading-relaxed">
                        {isBatch1 ? "যেকোনো তথ্যের জন্য হোয়াটসঅ্যাপে যোগাযোগ: 01890352188" : "স্টুডেন্ট কমিউনিটি, যেকোনো টেকনিক্যাল সাপোর্ট ও উইকলি মেন্টর ফিডব্যাক।"}
                      </p>
                    </div>
                  </div>

                  <div className="glass p-4 sm:p-4.5 rounded-2xl border border-border/60 flex items-start gap-3.5 hover:border-primary/30 transition duration-200">
                    <div className="p-2.5 rounded-xl bg-accent/20 text-foreground shrink-0 mt-0.5">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-bangla font-bold text-sm sm:text-base text-foreground">
                        {isBatch1 ? "বিগিনার ফ্রেন্ডলি" : "মার্কেটপ্লেস ও ডিরেক্ট ক্লায়েন্ট"}
                      </h3>
                      <p className="font-bangla text-xs sm:text-[13px] text-foreground/75 leading-relaxed">
                        {isBatch1 ? "পূর্বে কোনো অভিজ্ঞতা না থাকলেও সহজে শুরু করতে পারবেন।" : "স্ট্রং পোর্টফোলিও তৈরি এবং সরাসরি হাই টিকেটিং ক্লায়েন্ট হান্টিং গাইড।"}
                      </p>
                    </div>
                  </div>

                  <div className="glass p-4 sm:p-4.5 rounded-2xl border border-border/60 flex items-start gap-3.5 hover:border-primary/30 transition duration-200">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-bangla font-bold text-sm sm:text-base text-foreground">
                        {isBatch1 ? "১০০% ফ্রি এক্সেস" : "এডিটিং রিসোর্স প্যাক"}
                      </h3>
                      <p className="font-bangla text-xs sm:text-[13px] text-foreground/75 leading-relaxed">
                        {isBatch1 ? "সম্পূর্ণ বিনামূল্যে প্র্যাকটিস ফাইল ও গাইডলাইন অ্যাক্সেস।" : "প্রিমিয়াম সাউন্ড এফেক্টস (SFX), কালার LUTs এবং রেডি মোশন প্রিসেট ফাইল।"}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* ডানপাশ: স্টিকি কার্ড */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="glass-strong rounded-3xl p-6 sm:p-7 border border-border/60 shadow-xl overflow-hidden backdrop-blur-md select-none">
                  
                  <div 
                    onClick={() => previewVideoId && setActiveVideo(previewVideoId)}
                    onContextMenu={(e) => e.preventDefault()}
                    className={`relative aspect-video w-full rounded-2xl overflow-hidden border border-border/40 group mb-5 select-none ${
                      previewVideoId ? "cursor-pointer" : ""
                    }`}
                  >
                    <EditableImage
                      id={`course.thumb.${course.slug}`}
                      defaultSrc={course.thumb?.startsWith("http") ? course.thumb : ""}
                      alt={course.title}
                      className="w-full h-full pointer-events-none select-none"
                      imgClassName="transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none [user-drag:none] [-webkit-user-drag:none]"
                    />
                    {previewVideoId && (
                      <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/25 transition-colors pointer-events-auto">
                        <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 pointer-events-auto">
                      <span className="px-2.5 py-1 rounded-[4px] text-xs font-medium bg-black/70 text-white backdrop-blur-md border border-white/10 font-sans">
                        Curriculum Preview
                      </span>
                    </div>
                  </div>

                  {/* প্রাইসিং */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 pb-1">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                        {isBatch1 ? "FREE" : (course.price || "৳৩,০০০")}
                      </span>
                      {!isBatch1 && (
                        <span className="text-base sm:text-lg text-muted-foreground/60 line-through decoration-rose-500/80 decoration-[1.5px] font-mono font-medium">
                          ৳৫,০০০
                        </span>
                      )}
                    </div>

                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-sans tracking-wide shrink-0">
                      {isBatch1 ? "100% FREE BOOTCAMP" : "40% OFF (Limited Time)"}
                    </span>
                  </div>

                  <div className="space-y-3.5 mb-6 border-y border-border/40 py-4 font-sans text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-foreground/70 font-medium">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                          <CalendarDays className="h-3.5 w-3.5" />
                        </div>
                        <span>Batch Starts</span>
                      </div>
                      <span className="font-semibold text-foreground/95 text-right">
                        {isBatch1 ? "1 July 2026" : "October 15, 2026"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-foreground/70 font-medium">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                          <Clock className="h-3.5 w-3.5" />
                        </div>
                        <span>Duration</span>
                      </div>
                      <span className="font-normal text-foreground/90 text-right">
                        {isBatch1 ? "15 Days Bootcamp" : "30 Days Intensive"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-foreground/70 font-medium select-none">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <span>Mentor</span>
                      </div>
                      <span className="font-normal text-foreground/90 text-right select-none">
                        {course.instructor || "Muhammad Ataullah"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-foreground/70 font-medium">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                          <Send className="h-3.5 w-3.5" />
                        </div>
                        <span>Platform</span>
                      </div>
                      <span className="font-normal text-foreground/90 text-right">
                        Live Sessions (Discord & Meet)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleEnrollClick}
                    className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.99] transition-all duration-150 font-sans cursor-pointer"
                  >
                    <span>{isBatch1 ? "Enroll in Batch 01" : "Enroll in Batch 03 Now"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="mt-3 text-center text-xs text-muted-foreground font-sans">
                    {isBatch1 ? "সম্পূর্ণ ফ্রি ১৫ দিনের ভিডিও এডিটিং কোর্স" : "Instant WhatsApp seat confirmation flow"}
                  </p>

                </div>
              </div>

            </div>

            {/* ================= স্টিকি ট্যাব বার ================= */}
            <div className="sticky top-20 z-30 mb-8 py-2.5 backdrop-blur-md">
              <div className="max-w-4xl mx-auto glass-strong p-1.5 rounded-2xl border border-border/80 shadow-md flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar">
                {tabList.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer select-none ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-[1.02]"
                          : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= ট্যাব কন্টেন্ট সেকশন ================= */}
            <div className="max-w-5xl mx-auto glass-strong rounded-3xl border border-border/80 p-6 sm:p-10 lg:p-12 shadow-xl mb-16 relative overflow-hidden backdrop-blur-md w-full">
              
              {/* ১. ওভারভিউ */}
              {activeTab === "overview" && (
                <div className="space-y-10 sm:space-y-12 animate-in fade-in duration-300 font-bangla w-full overflow-hidden">
                  <div className="max-w-3xl mx-auto text-center flex flex-col items-center px-1 sm:px-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-medium tracking-wide mb-4">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isBatch1 ? "Course Confusions & Solution" : "মার্কেট ডিমান্ড ও বাস্তবতা"}</span>
                    </div>

                    <h2 className="font-bangla font-extrabold tracking-tight text-foreground text-xl sm:text-2xl lg:text-3xl leading-[1.3] break-words">
                      {isBatch1 
                        ? "আপনি কি জানেন? কেন বেশিরভাগ মানুষ এডিটিং শিখতে পারে না?" 
                        : "ভিডিও এখন সব জায়গায়, কিন্তু ইন্ডাস্ট্রি স্ট্যান্ডার্ড এডিটরের অভাব কেন?"}
                    </h2>

                    <p className="font-bangla text-muted-foreground text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
                      {isBatch1 
                        ? "সঠিক গাইডলাইনের অভাবে বেশিরভাগ মানুষ এলোমেলো টিউটোরিয়াল দেখে কনফিউজড হয়ে যায়। কোনো Paid Course কেনার আগে এই Free Course থেকেই শুরু করতে পারেন।" 
                        : "বর্তমানে শুধু টুলসের সাধারণ কাজ জানা যথেষ্ট নয়। সফল ক্যারিয়ার গড়তে প্রয়োজন স্টোরিটেলিং, সাউন্ড সাইকোলজি ও হাই কনভার্টিং এডিটিং দক্ষতা।"}
                    </p>
                  </div>

                  {/* কার্ড গ্রিড */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
                    {isBatch1 ? (
                      <>
                        <div className="glass p-5 sm:p-7 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 mb-4">
                              <Workflow className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">সঠিক Roadmap এর অভাব</h3>
                            <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2.5">
                              অনেকেই ভিডিও এডিটিং শিখতে চায় কিন্তু কোথা থেকে শুরু করবে বা কী সফটওয়্যার ব্যবহার করবে জানে না।
                            </p>
                          </div>
                          <div className="pt-4 mt-5 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary">
                            <span>স্টেপ বাই স্টেপ শিখুন</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="glass p-5 sm:p-7 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 mb-4">
                              <AlertCircle className="w-5 h-5 text-destructive" />
                            </div>
                            <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">ইউটিউবের ফ্রি ভিডিও কনফিউশন</h3>
                            <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2.5">
                              ইউটিউবে হাজারো এলোমেলো ভিডিও দেখে মানুষ দিকভ্রান্ত হয়ে যায় এবং শিখতে গিয়ে মাঝপথেই হাল ছেড়ে দেয়।
                            </p>
                          </div>
                          <div className="pt-4 mt-5 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary">
                            <span>গোছানো গাইডলাইন</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="glass p-5 sm:p-7 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 mb-4">
                              <TrendingUp className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">মার্কেটে এডিটরের ব্যাপক ডিমান্ড</h3>
                            <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2.5">
                              বর্তমানে Content Creator, Business Owner এবং Freelancer—সবারই দক্ষ Video Editor প্রয়োজন।
                            </p>
                          </div>
                          <div className="pt-4 mt-5 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary">
                            <span>মার্কেট রেডি প্রসেস</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="glass p-5 sm:p-7 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 mb-4">
                              <TrendingUp className="w-5 h-5" />
                            </div>
                            <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">সবাই কনটেন্ট বানাচ্ছে, কিন্তু রিটেনশন পাচ্ছে কয়জন?</h3>
                            <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2.5">
                              ফেসবুক রিলস, ইউটিউব থেকে শুরু করে প্রতিটি ব্র্যান্ডের নিয়মিত ভিডিও প্রয়োজন। তবে প্রথম ৩ সেকেন্ডে দর্শক ধরে রাখার মতো হুক ও রিটেনশন সাইকোলজি জানা এডিটর খুবই কম।
                            </p>
                          </div>
                          <div className="pt-4 mt-5 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary">
                            <span>অডিয়েন্স সাইকোলজি শিখুন</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="glass p-5 sm:p-7 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 mb-4">
                              <Film className="w-5 h-5" />
                            </div>
                            <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">সফটওয়্যার জানা যথেষ্ট নয়, দরকার সিনেমাটিক ভিশন</h3>
                            <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2.5">
                              ইউটিউবের ফ্রি টিউটোরিয়াল দেখে সফটওয়্যার চালানো শেখা যায়, কিন্তু দর্শকের অনুভূতি নিয়ন্ত্রণ করা, নিখুঁত পেসিং এবং শক্তিশালী সাউন্ড ডিজাইনের জন্য দরকার বাস্তব মেন্টরশিপ।
                            </p>
                          </div>
                          <div className="pt-4 mt-5 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary">
                            <span>রিয়েল এডিটিং মেথডোলজি</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="glass p-5 sm:p-7 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 mb-4">
                              <Globe className="w-5 h-5" />
                            </div>
                            <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">কম বাজেটের কাজ নয়, সরাসরি প্রিমিয়াম ক্লায়েন্ট ডিল</h3>
                            <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2.5">
                              দেশি এজেন্সি ও আন্তর্জাতিক কনটেন্ট ক্রিয়েটররা এখন কোয়ালিটি ভিডিওর জন্য প্রিমিয়াম পে করতে প্রস্তুত। আপনার শুধু একটি মানসম্মত পোর্টফোলিও ও সঠিক যোগাযোগ প্রয়োজন।
                            </p>
                          </div>
                          <div className="pt-4 mt-5 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary">
                            <span>হাই টিকেটিং ফ্রেমওয়ার্ক</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* বিফোর বনাম আফটার কম্প্যারিজন */}
                  <div className="glass rounded-2xl border border-border/70 p-5 sm:p-8 relative overflow-hidden backdrop-blur-md w-full">
                    <div className="text-center mb-6">
                      <h3 className="font-bangla text-base sm:text-lg font-bold text-foreground">
                        {isBatch1 ? "Course Confusions বনাম ১৫ দিনের বুটক্যাম্প অর্জন" : "আপনার এডিটিং জার্নির মোড় ঘুরিয়ে দেবে ব্যাচ ৩"}
                      </h3>
                      <p className="font-bangla text-xs sm:text-sm text-muted-foreground mt-1">
                        {isBatch1 ? "অনলাইন বুটক্যাম্প কীভাবে আপনার সমস্যার সমাধান করবে" : "একজন সাধারণ এডিটর ও প্রফেশনাল ভিডিও রিটেলারের মূল পার্থক্য"}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-border/60">
                      <div className="space-y-3.5 pt-3 md:pt-0">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-destructive/10 text-destructive text-xs font-semibold">
                          <span>{isBatch1 ? "Course Confusions (অনেকের সমস্যা)" : "সাধারণ এডিটর (YouTube Learner)"}</span>
                        </div>
                        <ul className="space-y-2.5 font-bangla text-xs sm:text-sm text-foreground/75">
                          {isBatch1 ? (
                            <>
                              <li className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                <span>কী সফটওয়্যার ব্যবহার করবে এবং কোথা থেকে শুরু করবে তা জানে না</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                <span>ইউটিউবের হাজারো এলোমেলো ভিডিও দেখে কনফিউজড হয়ে যায়</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                <span>সঠিক রোডম্যাপ না থাকায় শিখতে গিয়ে মাঝপথেই হাল ছেড়ে দেয়</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                <span>ঘণ্টার পর ঘণ্টা এলোমেলো ইউটিউব টিউটোরিয়ালে বিভ্রান্ত ও দিকহারা থাকা</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                <span>সাউন্ড ডিজাইন ও কালার সাইকোলজি ছাড়া সাধারণ কাট পেস্ট এডিট</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                <span>মার্কেটপ্লেসে অল্প টাকায় কাজের জন্য বিড করে বারবার রিজেক্ট হওয়া</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>

                      <div className="space-y-3.5 pt-5 md:pt-0 md:pl-8">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{isBatch1 ? "এই ১৫ দিনে আপনি যা শিখবেন" : "ব্যাচ ৩ গ্র্যাজুয়েট (growVelo Pro Editor)"}</span>
                        </div>
                        <ul className="space-y-2.5 font-bangla text-xs sm:text-sm text-foreground/90 font-medium">
                          {isBatch1 ? (
                            <>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>Professional Video Editing Workflow</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>Cuts, Transitions & Effects Techniques</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>Color Correction Basics & Audio Editing</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>Social Media Video & Reels Editing</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>Client Ready Project Execution Process</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>সরাসরি প্র্যাকটিক্যাল প্রজেক্ট ও সিনেমাটিক স্টোরিটেলিং পদ্ধতি আয়ত্ত করা</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>উন্নত সাউন্ড ডিজাইন, নিখুঁত কালার গ্রেডিং ও হাই রিটেনশন মোশন অ্যানিমেশন</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>আন্তর্জাতিক মানের প্রফেশনাল পোর্টফোলিও ও সরাসরি ক্লায়েন্ট ডিল ক্লোজিং দক্ষতা</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ২. কারিকুলাম */}
              {activeTab === "curriculum" && (
                <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300 font-bangla w-full overflow-hidden">
                  <div className="max-w-3xl mx-auto text-center flex flex-col items-center px-1 sm:px-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-medium tracking-wide mb-4">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isBatch1 ? "১৫ দিনের ফ্রি রোডম্যাপ" : "প্র্যাকটিক্যাল কারিকুলাম"}</span>
                    </div>

                    <h2 className="font-bangla font-extrabold tracking-tight text-foreground text-xl sm:text-2xl lg:text-3xl leading-[1.3] break-words">
                      {isBatch1 ? "১৫ দিনের কমপ্লিট ভিডিও এডিটিং বুটক্যাম্প কারিকুলাম" : "স্টেপ বাই স্টেপ মাস্টারক্লাস রোডম্যাপ"}
                    </h2>

                    <p className="font-bangla text-muted-foreground text-sm sm:text-base leading-relaxed mt-2.5 max-w-xl">
                      {isBatch1 
                        ? "বেসিক থেকে শুরু করে প্রোজেক্ট ডেলিভারি পর্যন্ত প্রতিটি দিন সুনির্দিষ্ট প্র্যাকটিক্যাল লার্নিং।" 
                        : "বেসিক থেকে অ্যাডভান্সড সিনেমাটিক এডিটিং ও মোশন গ্রাফিক্স। প্রতিটি মডিউল বাস্তব প্রজেক্ট দিয়ে সাজানো।"}
                    </p>
                  </div>

                  <div className="max-w-3xl mx-auto space-y-4">
                    {isBatch1 ? (
                      <>
                        <div className="glass rounded-2xl border border-primary/40 p-4.5 sm:p-6 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-primary block">DAY 1</span>
                          <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">Editing Basics & Interface Setup</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">Premiere Pro ইন্টারফেস পরিচিতি, টাইমলাইন সিক্রেট ও ফাইল ম্যানেজমেন্ট।</p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-6 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-primary block">DAY 5</span>
                          <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">Professional Cuts & Smooth Transitions</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">জাম্প কাট, ম্যাচ কাট ও প্রফেশনাল সিনেমাটিক ট্রানজিশন টেকনিক।</p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-6 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-primary block">DAY 8</span>
                          <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">Color Correction Basics & Audio Editing</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">কালার স্পেস, স্কিন টোন ব্যালেন্সিং ও ব্যাকগ্রাউন্ড সাউন্ড ডিজাইন।</p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-6 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-primary block">DAY 10</span>
                          <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">Reels & Short Form Content Creation</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">৩ সেকেন্ড রিটেনশন হুক, ভাইরাল টেক্সট এনিমেশন ও সোশ্যাল মিডিয়া রিলস এডিটিং।</p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-6 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-primary block">DAY 15</span>
                          <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">Complete Project Editing & Client Ready Process</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">পূর্ণাঙ্গ প্রজেক্ট তৈরি এবং মার্কেটপ্লেস বা ক্লায়েন্ট ডিল করার নিয়ম।</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="glass rounded-2xl border border-primary/40 p-4.5 sm:p-6 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-primary block">Module 01</span>
                          <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">Premiere Pro Fundamentals & Fast Workflow</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">ইন্টারফেস কাস্টমাইজেশন, টাইমলাইন সিক্রেট, প্রো লেভেল শর্টকাট ও অর্গানাইজড ফাইল ম্যানেজমেন্ট।</p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-6 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-primary block">Module 02</span>
                          <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">The Art of Storytelling & Pacing</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">দর্শকদের স্ক্রিনে আটকে রাখার সাইকোলজি, রিলস ও শর্টস হুক এবং রিটেনশন টেকনিক।</p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-6 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-primary block">Module 03</span>
                          <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">Advanced Sound Design & Foley</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">ভিডিওর প্রাণ হলো সাউন্ড। অডিও ব্যালেন্সিং, সাউন্ড ইফেক্ট লেয়ারিং ও অডিও এনহ্যান্সমেন্ট।</p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-6 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-primary block">Module 04</span>
                          <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">Cinematic Color Grading</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">কালার স্পেস, স্কিন টোন কারেকশন ও সিনেমাটিক লুক তৈরির ইন ডেপথ গাইডলাইন।</p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-6 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-primary block">Module 05</span>
                          <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">Motion Graphics in After Effects</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">আকর্ষণীয় টেক্সট অ্যানিমেশন, লোয়ার থার্ড, মোশন ট্র্যাকিং ও ডায়নামিক ট্রানজিশন।</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* ৩. কী কী পাচ্ছেন */}
              {activeTab === "included" && (
                <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300 font-bangla w-full overflow-hidden">
                  <div className="max-w-3xl mx-auto text-center flex flex-col items-center px-1 sm:px-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-medium tracking-wide mb-4">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>সবকিছু এক প্ল্যাটফর্মে</span>
                    </div>

                    <h2 className="font-bangla font-extrabold tracking-tight text-foreground text-xl sm:text-2xl lg:text-3xl leading-[1.3] break-words">
                      {isBatch1 ? "১৫ দিনের ফ্রি বুটক্যাম্পে যা যা পাচ্ছেন" : "ব্যাচ ৩ এ আপনি যা যা পাচ্ছেন"}
                    </h2>

                    <p className="font-bangla text-muted-foreground text-sm sm:text-base leading-relaxed mt-2.5 max-w-xl">
                      ভিডিও এডিটিংয়ের ভিত্তি মজবুত করার সম্পূর্ণ প্র্যাকটিক্যাল আয়োজন।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    <div className="glass p-5 sm:p-6 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 mb-4">
                          <Gift className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">লাইভ ইন্টারেক্টিভ ক্লাস</h3>
                        <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2">
                          সরাসরি স্ক্রিন শেয়ারে প্র্যাকটিক্যাল কাজ শেখা ও লাইভ প্রশ্নোত্তর পর্ব।
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>ইনক্লুডেড অ্যাক্সেস</span>
                      </div>
                    </div>

                    <div className="glass p-5 sm:p-6 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 mb-4">
                          <Smartphone className="w-5 h-5 text-emerald-500" />
                        </div>
                        <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">
                          {isBatch1 ? "১০০% সম্পূর্ণ ফ্রি কোর্স" : "লাইফটাইম ক্লাউড ব্যাকআপ"}
                        </h3>
                        <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2">
                          {isBatch1 ? "কোনো ধরনের ফি বা লুকানো চার্জ ছাড়া শেখার সুযোগ।" : "ক্লাস শেষ হতেই ওয়েবসাইট ড্যাশবোর্ডে ফুল এইচডি ক্লাউড রেকর্ডিং যুক্ত হবে।"}
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>ইনক্লুডেড অ্যাক্সেস</span>
                      </div>
                    </div>

                    <div className="glass p-5 sm:p-6 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 mb-4">
                          <Film className="w-5 h-5 text-amber-500" />
                        </div>
                        <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">
                          {isBatch1 ? "রিলস ও শর্টফর্ম এডিটিং" : "প্রিমিয়াম সাউন্ড ও অ্যাসেটস"}
                        </h3>
                        <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2">
                          {isBatch1 ? "৩ সেকেন্ড হুক ও ট্রেন্ডিং ভিডিও বানানোর কৌশল।" : "প্র্যাকটিসের জন্য প্রজেক্ট ফাইল, সাউন্ড প্যাক, সিনেমাটিক LUTs ও মোশন প্রিসেট।"}
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>ইনক্লুডেড অ্যাক্সেস</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ৪. যেভাবে শুরু করবেন */}
              {activeTab === "how" && (
                <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300 font-bangla w-full overflow-hidden">
                  <div className="max-w-3xl mx-auto text-center flex flex-col items-center px-1 sm:px-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-medium tracking-wide mb-4">
                      <Workflow className="w-3.5 h-3.5" />
                      <span>সহজ ৩টি ধাপ</span>
                    </div>

                    <h2 className="font-bangla font-extrabold tracking-tight text-foreground text-xl sm:text-2xl lg:text-3xl leading-[1.3] break-words">
                      {isBatch1 ? "কীভাবে ব্যাচ ১ এ যুক্ত হবেন ও ফ্রি ক্লাস করবেন?" : "কীভাবে ব্যাচ ৩ এ যুক্ত হবেন ও ক্লাস শুরু করবেন?"}
                    </h2>

                    <p className="font-bangla text-muted-foreground text-sm sm:text-base leading-relaxed mt-2.5 max-w-xl">
                      সহজ ও দ্রুত রেজিস্ট্রেশন প্রক্রিয়া। তথ্য পাঠানো মাত্রই শুরু হয়ে যাবে আপনার শেখার যাত্রা।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    <div className="glass p-6 sm:p-7 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full glass border border-primary/20 bg-primary/5 text-primary font-mono text-xs font-bold mb-3 inline-block">
                          Step 01
                        </span>
                        <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">
                          {isBatch1 ? "গুগল ফর্মে রেজিস্ট্রেশন" : "এনরোলমেন্ট রিকোয়েস্ট পাঠান"}
                        </h3>
                        <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2">
                          {isBatch1 ? "ফর্ম লিংকে আপনার নাম ও সচল হোয়াটসঅ্যাপ নম্বর দিয়ে রেজিস্ট্রেশন সম্পন্ন করুন।" : "ওয়েবসাইটের বাটনে ক্লিক করে তথ্য দিয়ে ফর্মটি সাবমিট করুন।"}
                        </p>
                      </div>
                    </div>

                    <div className="glass p-6 sm:p-7 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full glass border border-primary/20 bg-primary/5 text-primary font-mono text-xs font-bold mb-3 inline-block">
                          Step 02
                        </span>
                        <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">
                          {isBatch1 ? "হোয়াটসঅ্যাপ গ্রুপ অ্যাক্সেস" : "টিমের সাথে ভেরিফিকেশন"}
                        </h3>
                        <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2">
                          {isBatch1 ? "রেজিস্ট্রেশনের পর আপনাকে সরাসরি ব্যাচ ১-এর হোয়াটসঅ্যাপ গ্রুপে যুক্ত করা হবে।" : "ফর্ম সাবমিট করতেই হোয়াটসঅ্যাপে আমাদের টিম পেমেন্ট ভেরিফাই করে সিট নিশ্চিত করবে।"}
                        </p>
                      </div>
                    </div>

                    <div className="glass p-6 sm:p-7 rounded-2xl border border-border/60 flex flex-col justify-between shadow-xs">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full glass border border-primary/20 bg-primary/5 text-primary font-mono text-xs font-bold mb-3 inline-block">
                          Step 03
                        </span>
                        <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug">
                          {isBatch1 ? "১ জুলাই ২০২৬ থেকে ক্লাস" : "ডিসকর্ড কমিউনিটিতে প্রবেশ"}
                        </h3>
                        <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2">
                          {isBatch1 ? "নির্ধারিত তারিখ থেকে সরাসরি স্ক্রিন শেয়ারে লাইভ বুটক্যাম্প শুরু হবে।" : "কনফার্মেশনের সাথে সাথেই পাবেন ব্যাচ ৩ এর প্রাইভেট ডিসকর্ড ও ড্যাশবোর্ড ইনভাইট।"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ৫. এফএকিউ */}
              {activeTab === "faq" && (
                <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300 font-bangla w-full overflow-hidden">
                  <div className="max-w-3xl mx-auto text-center flex flex-col items-center px-1 sm:px-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-medium tracking-wide mb-4">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>সাধারণ প্রশ্নোত্তর</span>
                    </div>

                    <h2 className="font-bangla font-extrabold tracking-tight text-foreground text-xl sm:text-2xl lg:text-3xl leading-[1.3] break-words">
                      আপনার মনে কি কোনো প্রশ্ন আছে?
                    </h2>

                    <p className="font-bangla text-muted-foreground text-sm sm:text-base leading-relaxed mt-2.5 max-w-xl">
                      কোর্সে যুক্ত হওয়ার আগে প্রয়োজনীয় বিষয়গুলোর সুস্পষ্ট উত্তর।
                    </p>
                  </div>

                  <div className="max-w-3xl mx-auto space-y-3.5">
                    {isBatch1 ? (
                      <>
                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-5">
                          <span className="font-bangla font-bold text-sm sm:text-base text-foreground leading-snug">
                            আমি একদম বিগিনার, আগে কোনো কাজ করিনি। আমি কি জয়েন করতে পারব?
                          </span>
                          <p className="font-bangla text-xs sm:text-sm text-foreground/80 leading-relaxed mt-2">
                            হ্যাঁ, সম্পূর্ণ বিগিনার হলেও আপনি এই ফ্রি কোর্সে জয়েন করতে পারবেন। একদম শুরু থেকে ধাপে ধাপে সবকিছু দেখানো হবে।
                          </p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-5">
                          <span className="font-bangla font-bold text-sm sm:text-base text-foreground leading-snug">
                            ক্লাসগুলো কীভাবে হবে এবং সময়সূচি কী?
                          </span>
                          <p className="font-bangla text-xs sm:text-sm text-foreground/80 leading-relaxed mt-2">
                            ক্লাসগুলো সরাসরি ডিসকর্ড প্রাইভেট চ্যানেলের পাশাপাশি গুগল মিট (Google Meet) ও জুম (Zoom)-এ স্ক্রিন শেয়ারের মাধ্যমে অনুষ্ঠিত হবে।
                          </p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-5">
                          <span className="font-bangla font-bold text-sm sm:text-base text-foreground leading-snug">
                            কোর্সের ফি কত এবং কীভাবে রেজিস্ট্রেশন করব?
                          </span>
                          <p className="font-bangla text-xs sm:text-sm text-foreground/80 leading-relaxed mt-2">
                            কোর্সটি COMPLETELY FREE (সম্পূর্ণ ফ্রি)। উপরে দেওয়া বাটনে ক্লিক করলেই বিস্তারিত দেখতে পাবেন।
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-5">
                          <span className="font-bangla font-bold text-sm sm:text-base text-foreground leading-snug">
                            আমি একদম নতুন, আগে কখনো এডিটিং করিনি। আমি কি এই ব্যাচটি করতে পারব?
                          </span>
                          <p className="font-bangla text-xs sm:text-sm text-foreground/80 leading-relaxed mt-2">
                            হ্যাঁ, মাস্টারক্লাসটি একদম বেসিক প্রিমিয়ার প্রো থেকে শুরু করে অ্যাডভান্সড সিনেমাটিক স্টোরিটেলিং পর্যন্ত ধাপে ধাপে শেখানো হবে। আপনার শুধু শেখার আগ্রহ প্রয়োজন।
                          </p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-5">
                          <span className="font-bangla font-bold text-sm sm:text-base text-foreground leading-snug">
                            ক্লাসগুলো কীভাবে হবে এবং সময়সূচি কী?
                          </span>
                          <p className="font-bangla text-xs sm:text-sm text-foreground/80 leading-relaxed mt-2">
                            ক্লাসগুলো সরাসরি ডিসকর্ড প্রাইভেট চ্যানেলের পাশাপাশি গুগল মিট (Google Meet) ও জুম (Zoom)-এ স্ক্রিন শেয়ারের মাধ্যমে অনুষ্ঠিত হবে। প্রতি সপ্তাহে নির্ধারিত লাইভ সেশন এবং লাইভ প্রশ্নোত্তরের সুযোগ থাকবে।
                          </p>
                        </div>

                        <div className="glass rounded-2xl border border-border/60 p-4.5 sm:p-5">
                          <span className="font-bangla font-bold text-sm sm:text-base text-foreground leading-snug">
                            কোনো কারণে লাইভ ক্লাস মিস করলে কি রেকর্ডিং পাওয়া যাবে?
                          </span>
                          <p className="font-bangla text-xs sm:text-sm text-foreground/80 leading-relaxed mt-2">
                            অবশ্যই! প্রতিটি লাইভ ক্লাসের পরপরই ওয়েবসাইট ড্যাশবোর্ডে ফুল এইচডি ক্লাউড রেকর্ডিং ব্যাকআপ দিয়ে দেওয়া হবে, যা আপনি আজীবন দেখতে পারবেন।
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* ================= ফাইনাল ক্লোজিং হাই-কনভার্টিং CTA ব্যানার (ব্যাচ ৩ এনরোলমেন্ট) ================= */}
            <div className="relative max-w-5xl mx-auto font-bangla mb-16">
              <div className="glass-strong rounded-3xl border border-primary/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide shadow-2xs mb-5">
                  <Flame className="w-3.5 h-3.5 fill-primary text-primary animate-pulse" />
                  <span>সীমিত সময়ের অফার • ব্যাচ ৩ এনরোলমেন্ট</span>
                </div>

                <h3 className="font-bangla font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground leading-[1.28] tracking-tight">
                  {isBatch1 
                    ? "পরবর্তী লেভেলে যাওয়ার প্রস্তুতি নিন: Advanced Video Editing Masterclass"
                    : "দেরি না করে আজই আপনার সিনেমাটিক এডিটিং জার্নি শুরু করুন"}
                </h3>

                <p className="font-bangla text-sm sm:text-base text-foreground/85 leading-relaxed mt-4 max-w-2xl mx-auto">
                  ব্যাচ ৩ এ সীমিত আসনে বিশেষ ছাড় চলছে। রেগুলার ফি ৫,০০০ টাকার বদলে এখন মাত্র ৩,০০০ টাকা। সরাসরি প্র্যাকটিক্যাল সিনেমাটিক স্টোরিটেলিং ও ক্লায়েন্ট ডিল ক্লোজ করার সম্পূর্ণ গাইডলাইন।
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3">
                  <button
                    onClick={() => setShowBatch3Modal(true)}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.99] transition-all font-sans cursor-pointer"
                  >
                    <span>Enroll in Batch 03 Now (৳৩,০০০)</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-xs text-muted-foreground font-bangla flex items-center gap-1.5 mt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>১০০% মানি ব্যাক ও স্যাটিসফ্যাকশন ট্রাস্ট | সুরক্ষিত পেমেন্ট ভেরিফিকেশন</span>
                  </p>
                </div>
              </div>
            </div>

            {/* স্লিম ফুটার */}
            <footer className="w-full py-6 border-t border-border/40 text-center font-sans">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
                <p>© 2026 growVelo Studio. All rights reserved.</p>
                <div className="flex items-center gap-4 text-[11px] tracking-wide">
                  <Link to="/legal" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                  <span>•</span>
                  <Link to="/legal" className="hover:text-foreground transition-colors">Terms of Service</Link>
                  <a href={`https://wa.me/8801410341220`} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    WhatsApp Support
                  </a>
                </div>
              </div>
            </footer>

          </div>
        </div>
      </SiteShell>
    </div>
  );
}

export const Route = createFileRoute("/courses/$slug")({
  validateSearch: (search: Record<string, unknown>): { enroll?: boolean } => {
    return {
      enroll: search.enroll === true || search.enroll === "true",
    };
  },
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
