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
  LayoutDashboard,
  Workflow,
  HelpCircle as MessageCircleQuestion,
  TrendingUp,
  Plus,
  Trash2,
  AlertCircle,
  Smartphone,
  ExternalLink,
  Info,
  HelpCircle,
  FileText
} from "lucide-react";
import { SiteShell, COURSES } from "../components/site/sections";
import { supabase } from "@/integrations/supabase/client";
import { EditableText } from "@/components/cms/EditableText";

// ================= হুকস এবং ডাটাবেজ ফাংশন =================

function useEvergreenTimer(hoursDuration = 24) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23, minutes: 59, seconds: 59,
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
      setTimeLeft({
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hoursDuration]);

  return timeLeft;
}

function useStrictAdminCheck() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const verifyAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.email) {
          if (isMounted) setIsAdmin(false);
          return;
        }
        const email = session.user.email.toLowerCase();
        // আপনার সংরক্ষিত জিমেইল
        if (email.includes("abdullah20050127") || email.includes("admin") || email.includes("growvelo")) {
          if (isMounted) setIsAdmin(true);
        } else {
          if (isMounted) setIsAdmin(false);
        }
      } catch (e) {
        if (isMounted) setIsAdmin(false);
      }
    };
    verifyAdmin();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => verifyAdmin());
    return () => { isMounted = false; subscription.unsubscribe(); };
  }, []);
  return isAdmin;
}

function useDynamicCmsList<T>(storageKey: string, defaultItems: T[]) {
  const [items, setItems] = useState<T[]>(defaultItems);
  const isAdmin = useStrictAdminCheck();

  useEffect(() => {
    const fetchCloudData = async () => {
      try {
        const { data } = await supabase.from("site_content").select("content").eq("key", storageKey).maybeSingle();
        if (data?.content) {
          const parsed = JSON.parse(data.content);
          if (Array.isArray(parsed) && parsed.length > 0) setItems(parsed);
        }
      } catch (e) {}
    };
    fetchCloudData();
  }, [storageKey]);

  const save = async (newItems: T[]) => {
    if (!isAdmin) return; 
    setItems(newItems);
    try {
      await supabase.from("site_content").upsert({ key: storageKey, content: JSON.stringify(newItems), updated_at: new Date().toISOString() });
    } catch (e) {}
  };

  return { 
    items, 
    addItem: (item: T) => { if (isAdmin) save([...items, item]); }, 
    removeItem: (index: number) => { if (isAdmin) save(items.filter((_, i) => i !== index)); }, 
    updateItem: (index: number, updated: T) => { if (isAdmin) { const next = [...items]; next[index] = updated; save(next); } }, 
    isAdmin 
  };
}

// ================= ব্যাচ ১ এর জন্য ডেডিকেটেড পপআপ মডাল (Batch Closed) =================
function Batch1ClosedModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-strong rounded-3xl max-w-md w-full p-8 border border-border/80 shadow-2xl relative text-center flex flex-col items-center">
        
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <X className="w-5 h-5" />
        </button>
        
        <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-5 border border-amber-500/20">
          <Info className="w-8 h-8" />
        </div>
        
        <h2 className="font-bangla text-2xl font-extrabold text-foreground mb-3">
          এই ব্যাচটি সম্পূর্ণ হয়ে গেছে!
        </h2>
        
        <p className="font-bangla text-sm text-foreground/80 leading-relaxed mb-8">
          আমাদের ১৫ দিনের ফ্রি ভিডিও এডিটিং বুটক্যাম্প (ব্যাচ ০১) এর ক্লাস শেষ হয়ে গেছে। 
          <br/><br/>
          বর্তমানে আমাদের অ্যাডভান্সড মাস্টারক্লাস <strong>(ব্যাচ ০৩)</strong> এর রেজিস্ট্রেশন চলছে। আপনি চাইলে সেখানে যুক্ত হতে পারেন।
        </p>

        <button
          onClick={() => {
            onClose();
            navigate({ to: "/courses/$slug", params: { slug: "batch-03" } });
          }}
          className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer font-sans"
        >
          <span>ব্যাচ ০৩ এ এনরোল করুন</span>
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
}

// ================= ব্যাচ ২ ও ৩ এর জন্য পেমেন্ট মডাল =================
function EnrollmentModal({ courseSlug, onClose }: { courseSlug: string; onClose: () => void; }) {
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"bKash" | "Nagad">("bKash");
  const [formData, setFormData] = useState({ fullName: "", phone: "", email: "", trxId: "" });

  const paymentNumber = "01790055690";
  const supportWhatsapp = "8801410341220";

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.trxId) return alert("অনুগ্রহ করে আপনার নাম, হোয়াটসঅ্যাপ নম্বর এবং ট্রানজেকশন আইডি দিন।");
    const message = `Hello growVelo, I have sent an enrollment request for ${courseSlug}.\nName: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email || "N/A"}\nMethod: ${selectedMethod} Personal\nTrxID: ${formData.trxId}`;
    window.open(`https://wa.me/${supportWhatsapp}?text=${encodeURIComponent(message)}`, "_blank");
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-strong rounded-3xl max-w-lg w-full p-5 sm:p-7 border border-border/80 shadow-2xl relative max-h-[92vh] overflow-y-auto font-bangla text-foreground" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground cursor-pointer z-10"><X className="w-5 h-5" /></button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-5">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Total Fee</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono mt-0.5">৳৩,০০০</div>
              <h3 className="font-bangla text-base font-bold text-foreground mt-1.5"><EditableText id={`course.${courseSlug}.modal.title`}>মাস্টারক্লাস সিট কনফার্মেশন ও পেমেন্ট</EditableText></h3>
            </div>

            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl glass border border-border/70 mb-4 bg-foreground/[0.03]">
              <button type="button" onClick={() => setSelectedMethod("bKash")} className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${selectedMethod === "bKash" ? "bg-[#E2136E] text-white shadow-md" : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"}`}>bKash (বিকাশ)</button>
              <button type="button" onClick={() => setSelectedMethod("Nagad")} className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${selectedMethod === "Nagad" ? "bg-[#F7921E] text-white shadow-md" : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"}`}>Nagad (নগদ)</button>
            </div>

            <div className="glass rounded-2xl p-4 border border-primary/30 bg-primary/5 mb-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-foreground/90 font-medium">সেন্ড মানি করার নম্বর ({selectedMethod}):</span>
                <span className="px-2 py-0.5 rounded-md bg-foreground/10 text-[11px] font-mono font-bold text-foreground">Personal</span>
              </div>
              <div className="flex items-center justify-between gap-2 bg-background/90 p-2.5 rounded-xl border border-border/80 shadow-2xs">
                <code className="text-sm sm:text-base font-mono font-bold tracking-wider text-foreground">{paymentNumber}</code>
                <button type="button" onClick={handleCopy} className="px-3 py-1.5 text-xs rounded-lg glass font-sans flex items-center gap-1.5 text-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />} {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-foreground font-medium mb-1 uppercase tracking-wider text-[11px]">আপনার পূর্ণ নাম *</label>
                <input type="text" required placeholder="যেমন: মাহিম মারাব" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary bg-background/50" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-foreground font-medium mb-1 uppercase tracking-wider text-[11px]">সচল হোয়াটসঅ্যাপ নম্বর *</label>
                  <input type="tel" required placeholder="01XXXXXXXXX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary bg-background/50" />
                </div>
                <div>
                  <label className="block text-foreground font-medium mb-1 uppercase tracking-wider text-[11px]">Transaction ID (TrxID) *</label>
                  <input type="text" required placeholder="যেমন: BL92XK82" value={formData.trxId} onChange={(e) => setFormData({ ...formData, trxId: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl glass border border-border/80 focus:outline-none focus:border-primary font-mono uppercase bg-background/50" />
                </div>
              </div>
              <div className="flex gap-2.5 pt-2">
                <button type="submit" className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-[0.99] cursor-pointer">
                  <Send className="w-4 h-4" /> আমি পেমেন্ট করেছি
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto"><CheckCircle2 className="w-8 h-8" /></div>
            <h3 className="font-bangla text-xl font-bold text-foreground">রিকোয়েস্ট প্রস্তুত হয়েছে!</h3>
            <p className="font-bangla text-sm text-muted-foreground max-w-sm mx-auto">হোয়াটসঅ্যাপ উইন্ডো ওপেন হয়েছে। মেসেজটি সেন্ড করলেই আমাদের টিম পেমেন্ট ভেরিফাই করে আপনাকে অ্যাক্সেস দিয়ে দেবে।</p>
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl glass text-sm font-semibold text-foreground cursor-pointer">উইন্ডো বন্ধ করুন</button>
          </div>
        )}
      </div>
    </div>
  );
}


// =========================================================================
// ১. সম্পূর্ণ আলাদা ল্যান্ডিং পেজ: BATCH 01 (15 Days Free Bootcamp)
// =========================================================================
function Batch1Landing({ course }: { course: any }) {
  const [showClosedModal, setShowClosedModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const previewVideoId = course?.introVideoId || null;

  return (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-x-hidden">
      {showClosedModal && <Batch1ClosedModal onClose={() => setShowClosedModal(false)} />}
      
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative aspect-video w-full max-w-4xl">
            <button onClick={() => setActiveVideo(null)} className="absolute -top-10 right-0 text-white hover:text-white/70 cursor-pointer"><X className="w-6 h-6" /></button>
            <iframe className="h-full w-full rounded-xl" src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/courses" className="mb-6 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-opacity hover:opacity-60 text-foreground/60">
          <ArrowLeft className="h-3 w-3" /> All courses
        </Link>

        {/* Hero Section - Batch 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-7 flex flex-col space-y-5 font-bangla">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-border/80 bg-foreground/[0.04] w-fit shadow-sm">
              <span className="h-1.5 w-1.5 rounded-[1px] bg-primary shrink-0"></span>
              <span className="text-xs sm:text-[13px] font-bold tracking-wide text-foreground/90 font-sans">
                ONLINE RISING EDITORS BATCH - 1
              </span>
            </div>

            <div className="glass-strong rounded-3xl border border-border/70 shadow-lg relative overflow-hidden backdrop-blur-md">
              <div className="p-5 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-primary tracking-wider">
                  <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20">15 Days Free Course</span>
                </div>
                
                <h1 className="font-bangla font-black tracking-tight text-foreground leading-[1.3] text-2xl sm:text-3xl lg:text-4xl">
                  ভিডিও এডিটিং শিখতে চান, কিন্তু কোথা থেকে শুরু করবেন বুঝতে পারছেন না?
                </h1>

                <div className="space-y-4 text-sm sm:text-base text-foreground/80 leading-[1.7] font-bangla border-t border-border/40 pt-5">
                  <p>বর্তমানে Content Creator, Business Owner এবং Freelancer—সবারই Video Editor প্রয়োজন। কিন্তু বেশিরভাগ মানুষ Video Editing শিখতে পারে না কারণ তারা সঠিক Roadmap পায় না।</p>
                  <p>এই সমস্যার সমাধান হিসেবে আমরা আয়োজন করছি <strong>১৫ দিনের Free Video Editing Course</strong> যেখানে প্রতিদিন Step-by-Step শেখানো হবে।</p>
                  <p className="font-semibold text-foreground/90 bg-foreground/5 p-3 rounded-lg border border-border/50">কোনো Paid Course কেনার আগে এই Free Course থেকেই শুরু করতে পারেন।</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-border/60 shadow-xl overflow-hidden backdrop-blur-md select-none">
              
              <div onClick={() => previewVideoId && setActiveVideo(previewVideoId)} onContextMenu={(e) => e.preventDefault()} className={`relative aspect-video w-full rounded-2xl overflow-hidden border border-border/40 group mb-6 select-none ${previewVideoId ? "cursor-pointer" : ""}`}>
                <img src={course.thumb || ""} alt="Batch 1 Poster" className="w-full h-full object-cover pointer-events-none select-none [user-drag:none] [-webkit-user-drag:none]" />
                {previewVideoId && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors pointer-events-auto">
                    <div className="w-14 h-14 rounded-full glass flex items-center justify-center text-white"><Play className="w-6 h-6 fill-white ml-1" /></div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-6">
                <span className="text-4xl font-black text-foreground font-mono">FREE</span>
                <span className="px-4 py-1.5 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-sans tracking-widest">
                  COMPLETELY FREE
                </span>
              </div>

              <div className="space-y-4 mb-8 border-y border-border/40 py-5 font-sans text-sm">
                <div className="flex justify-between items-center"><div className="flex items-center gap-2.5 text-foreground/70"><CalendarDays className="w-4 h-4 text-primary"/><span>Start Date</span></div><span className="font-bold">1 July 2026</span></div>
                <div className="flex justify-between items-center"><div className="flex items-center gap-2.5 text-foreground/70"><Clock className="w-4 h-4 text-primary"/><span>Format</span></div><span className="font-semibold">Live Course</span></div>
              </div>

              <button
                onClick={() => setShowClosedModal(true)}
                className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer font-sans text-base"
              >
                Enroll Batch 01
              </button>
              <p className="text-center text-xs text-muted-foreground mt-4">বিস্তারিত জানতে: 01890352188 (WhatsApp)</p>
            </div>
          </div>
        </div>

        {/* Course Details Sections (Hardcoded from Poster) */}
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Confusions vs Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-bangla">
            <div className="glass p-6 sm:p-8 rounded-3xl border border-destructive/20 bg-destructive/5 space-y-5">
              <h3 className="font-bold text-sm sm:text-base text-destructive bg-destructive/10 inline-block px-3 py-1.5 rounded-lg mb-2 border border-destructive/20">Course Confusions</h3>
              <p className="text-sm font-semibold text-foreground/80">অনেকেই ভিডিও এডিটিং শিখতে চায়, কিন্তু—</p>
              <ul className="space-y-4 text-sm text-foreground/85">
                <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" /><span className="leading-relaxed">কী সফটওয়্যার ব্যবহার করবে জানে না</span></li>
                <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" /><span className="leading-relaxed">ইউটিউবের হাজারো ভিডিও দেখে কনফিউজড হয়ে যায়</span></li>
                <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" /><span className="leading-relaxed">শিখতে গিয়ে মাঝপথে ছেড়ে দেয়</span></li>
              </ul>
              <div className="mt-4 pt-5 border-t border-destructive/10">
                <p className="text-sm font-bold text-foreground">তাই আমরা নিয়ে আসছি ১৫ দিনের সম্পূর্ণ ফ্রি Video Editing Bootcamp.</p>
              </div>
            </div>

            <div className="glass p-6 sm:p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 space-y-5">
              <h3 className="font-bold text-sm sm:text-base text-emerald-600 bg-emerald-500/10 inline-block px-3 py-1.5 rounded-lg mb-2 border border-emerald-500/20">এই ১৫ দিনে আপনি শিখবেন:</h3>
              <ul className="space-y-4 text-sm font-medium text-foreground/90">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className="leading-relaxed">Professional Video Editing Workflow</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className="leading-relaxed">Cuts, Transitions & Effects</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className="leading-relaxed">Color Correction Basics</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className="leading-relaxed">Audio Editing</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className="leading-relaxed">Social Media Video Editing</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className="leading-relaxed">Client Ready Editing Process</span></li>
              </ul>
            </div>
          </div>

          {/* 15 Days Syllabus */}
          <div className="glass-strong rounded-3xl border border-border/80 p-6 sm:p-10 font-bangla shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">15 Days Video Editing Course Outline</h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                { day: "DAY 1", title: "Editing Basics" },
                { day: "DAY 5", title: "Professional Cuts & Transitions" },
                { day: "DAY 10", title: "Reels & Short Form Content" },
                { day: "DAY 15", title: "Complete Project Editing" },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-5 p-5 rounded-2xl glass border border-border/60 shadow-sm hover:-translate-y-1 transition-transform">
                  <span className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-black font-mono text-sm border border-primary/20">{m.day}</span>
                  <span className="font-bold text-foreground text-base sm:text-lg">{m.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call to Action for Batch 1 -> Opens Closed Modal */}
          <div className="text-center pt-8 pb-10">
            <button
              onClick={() => setShowClosedModal(true)}
              className="px-12 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer font-sans tracking-wide"
            >
              Enroll Batch 01
            </button>
            <p className="mt-4 text-sm text-muted-foreground font-bangla">Beginner হলেও Join করতে পারবেন।</p>
          </div>

        </div>
      </div>
    </div>
  );
}


// =========================================================================
// ২. মাস্টারক্লাস ল্যান্ডিং পেজ: BATCH 2 & BATCH 3 (এখানে ডাটাবেজ কাজ করবে)
// =========================================================================

// --- Tabs for Regular Landing ---
function TabOverview({ courseSlug }: { courseSlug: string }) {
  const defaultOverviewCards = [
    { id: "c1", title: "সবাই কনটেন্ট বানাচ্ছে, কিন্তু রিটেনশন পাচ্ছে কয়জন?", desc: "ফেসবুক রিলস, ইউটিউব থেকে শুরু করে প্রতিটি ব্র্যান্ডের নিয়মিত ভিডিও প্রয়োজন। তবে প্রথম ৩ সেকেন্ডে দর্শক ধরে রাখার মতো হুক ও রিটেনশন সাইকোলজি জানা এডিটর খুবই কম।", action: "অডিয়েন্স সাইকোলজি শিখুন" },
    { id: "c2", title: "সফটওয়্যার জানা যথেষ্ট নয়, দরকার সিনেমাটিক ভিশন", desc: "ইউটিউবের ফ্রি টিউটোরিয়াল দেখে সফটওয়্যার চালানো শেখা যায়, কিন্তু দর্শকের অনুভূতি নিয়ন্ত্রণ করা, নিখুঁত পেসিং এবং শক্তিশালী সাউন্ড ডিজাইনের জন্য দরকার বাস্তব মেন্টরশিপ।", action: "রিয়েল এডিটিং মেথডোলজি" },
    { id: "c3", title: "কম বাজেটের কাজ নয়, সরাসরি প্রিমিয়াম ক্লায়েন্ট ডিল", desc: "দেশি এজেন্সি ও আন্তর্জাতিক কনটেন্ট ক্রিয়েটররা এখন কোয়ালিটি ভিডিওর জন্য প্রিমিয়াম পে করতে প্রস্তুত। আপনার শুধু একটি মানসম্মত পোর্টফোলিও ও সঠিক যোগাযোগ প্রয়োজন।", action: "হাই টিকেটিং ফ্রেমওয়ার্ক" },
  ];
  const defaultBadPoints = ["ঘণ্টার পর ঘণ্টা এলোমেলো ইউটিউব টিউটোরিয়ালে বিভ্রান্ত ও দিকহারা থাকা", "সাউন্ড ডিজাইন ও কালার সাইকোলজি ছাড়া সাধারণ কাট পেস্ট এডিট", "মার্কেটপ্লেসে অল্প টাকায় কাজের জন্য বিড করে বারবার রিজেক্ট হওয়া"];
  const defaultGoodPoints = ["সরাসরি প্র্যাকটিক্যাল প্রজেক্ট ও সিনেমাটিক স্টোরিটেলিং পদ্ধতি আয়ত্ত করা", "উন্নত সাউন্ড ডিজাইন, নিখুঁত কালার গ্রেডিং ও হাই রিটেনশন মোশন অ্যানিমেশন", "আন্তর্জাতিক মানের প্রফেশনাল পোর্টফোলিও ও সরাসরি ক্লায়েন্ট ডিল ক্লোজিং দক্ষতা"];

  const { items: cards, addItem: addCard, removeItem: removeCard, isAdmin } = useDynamicCmsList(`course.${courseSlug}.overview.cards`, defaultOverviewCards);
  const { items: badPoints, addItem: addBadPoint, removeItem: removeBadPoint } = useDynamicCmsList(`course.${courseSlug}.overview.badPoints`, defaultBadPoints);
  const { items: goodPoints, addItem: addGoodPoint, removeItem: removeGoodPoint } = useDynamicCmsList(`course.${courseSlug}.overview.goodPoints`, defaultGoodPoints);

  return (
    <div className="space-y-10 sm:space-y-12 animate-in fade-in font-bangla">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold"><EditableText id={`course.${courseSlug}.painpoint.heading`}>ভিডিও এখন সব জায়গায়, কিন্তু ইন্ডাস্ট্রি স্ট্যান্ডার্ড এডিটরের অভাব কেন?</EditableText></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {cards?.map((card, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl relative">
            {isAdmin && <button onClick={() => removeCard(idx)} className="absolute top-3 right-3 p-1.5 text-destructive"><Trash2 className="w-4 h-4"/></button>}
            <h3 className="font-bold text-lg">{card.title}</h3>
            <p className="text-sm mt-2 text-foreground/75">{card.desc}</p>
          </div>
        ))}
      </div>
      {isAdmin && <button onClick={() => addCard({ id: Date.now().toString(), title: "নতুন কার্ড", desc: "বিবরণ", action: "জানুন" })} className="text-primary text-sm font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> নতুন কার্ড যোগ করুন</button>}
      
      <div className="glass p-6 sm:p-8 rounded-3xl border border-border/70">
        <h3 className="text-xl font-bold text-center mb-6"><EditableText id={`course.${courseSlug}.compare.heading`}>আপনার এডিটিং জার্নির মোড় ঘুরিয়ে দেবে ব্যাচ ৩</EditableText></h3>
        <div className="grid md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-border/60">
          <div className="space-y-4">
            <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-md text-xs font-bold">সাধারণ এডিটর</span>
            <ul className="space-y-3 text-sm">
              {badPoints?.map((p, i) => (
                <li key={i} className="flex gap-2"><XCircle className="w-4 h-4 text-destructive shrink-0"/>{p}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 md:pl-8">
            <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-md text-xs font-bold">growVelo Pro Editor</span>
            <ul className="space-y-3 text-sm">
              {goodPoints?.map((p, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0"/>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabCurriculum({ courseSlug }: { courseSlug: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const defaultModules = [
    { moduleNo: "Module 01", title: "Premiere Pro Fundamentals", desc: "বেসিক থেকে শুরু", lessons: ["লেসন ১: প্রোজেক্ট সেটআপ", "লেসন ২: ট্রিম টেকনিক"] },
    { moduleNo: "Module 02", title: "Storytelling & Pacing", desc: "অ্যাডভান্সড টেকনিক", lessons: ["লেসন ১: হুক তৈরি", "লেসন ২: ম্যাচ কাট"] },
  ];
  const { items: modules, isAdmin } = useDynamicCmsList(`course.${courseSlug}.curriculum.modules`, defaultModules);

  return (
    <div className="space-y-8 font-bangla animate-in fade-in">
      <h2 className="text-2xl font-bold text-center">স্টেপ বাই স্টেপ মাস্টারক্লাস রোডম্যাপ</h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        {modules?.map((m, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="glass rounded-2xl border border-border/60 overflow-hidden">
              <div onClick={() => setOpenIndex(isOpen ? null : i)} className="p-5 flex justify-between items-center cursor-pointer">
                <div><span className="text-primary text-xs font-bold">{m.moduleNo}</span><h3 className="font-bold text-lg mt-1">{m.title}</h3></div>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
              {isOpen && (
                <div className="p-5 pt-0 border-t border-border/30 mt-2">
                  <p className="text-sm text-muted-foreground mb-4">{m.desc}</p>
                  <div className="space-y-2 bg-background/50 p-4 rounded-xl">
                    {m.lessons?.map((l, ldx) => (
                      <div key={ldx} className="flex gap-2 text-sm"><div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />{l}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TabWhatsIncluded({ courseSlug }: { courseSlug: string }) {
  const defaultFeatures = [
    { titleKey: "লাইভ ইন্টারেক্টিভ ক্লাস", descKey: "সরাসরি স্ক্রিন শেয়ারে প্র্যাকটিক্যাল কাজ শেখা ও লাইভ প্রশ্নোত্তর।" },
    { titleKey: "লাইফটাইম ক্লাউড রেকর্ডিং", descKey: "ফুল এইচডি ক্লাউড রেকর্ডিং।" },
    { titleKey: "ডিসকর্ড প্রাইভেট কমিউনিটি", descKey: "২৪/৭ প্রাইভেট চ্যানেল ও সাপোর্ট।" },
  ];
  const { items: features, isAdmin } = useDynamicCmsList(`course.${courseSlug}.included.features`, defaultFeatures);

  return (
    <div className="space-y-8 font-bangla animate-in fade-in">
      <h2 className="text-2xl font-bold text-center">ব্যাচ ৩ এ আপনি যা যা পাচ্ছেন</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {features?.map((f, i) => (
          <div key={i} className="glass p-6 rounded-2xl">
            <Gift className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold text-lg">{f.titleKey}</h3>
            <p className="text-sm text-foreground/75 mt-2">{f.descKey}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// এই TabHowItWorks আগের কোডে বাদ পড়েছিল দেখেই ক্র্যাশ করেছিল!
function TabHowItWorks({ courseSlug }: { courseSlug: string }) {
  const defaultSteps = [
    { step: "01", badgeTitle: "এনরোলমেন্ট রিকোয়েস্ট পাঠান", title: "তথ্য দিয়ে ফর্ম পূরণ করুন", desc: "ওয়েবসাইটের বাটনে ক্লিক করে আপনার নাম, হোয়াটসঅ্যাপ নম্বর এবং ট্রানজেকশন আইডি দিন।" },
    { step: "02", badgeTitle: "হোয়াটসঅ্যাপে ভেরিফিকেশন", title: "টিমের সাথে ভেরিফিকেশন", desc: "ফর্ম সাবমিট করতেই হোয়াটসঅ্যাপে মেসেজ তৈরি হবে।" },
    { step: "03", badgeTitle: "প্রাইভেট ডিসকর্ড অ্যাক্সেস", title: "কমিউনিটিতে প্রবেশ", desc: "কনফার্মেশনের সাথে সাথেই পাবেন ডিসকর্ড ইনভাইট লিংক।" },
  ];
  const { items: steps, isAdmin } = useDynamicCmsList(`course.${courseSlug}.howitworks.steps`, defaultSteps);

  return (
    <div className="space-y-8 font-bangla animate-in fade-in">
      <h2 className="text-2xl font-bold text-center">কীভাবে ব্যাচ ৩ এ যুক্ত হবেন?</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps?.map((s, i) => (
          <div key={i} className="glass p-6 rounded-2xl relative overflow-hidden">
            <span className="absolute -top-4 right-2 text-6xl font-black text-foreground/[0.03]">{s.step}</span>
            <span className="text-primary text-xs font-bold">{s.badgeTitle}</span>
            <h3 className="font-bold text-lg mt-2">{s.title}</h3>
            <p className="text-sm text-foreground/75 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabFaq({ courseSlug }: { courseSlug: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const defaultFaqs = [
    { q: "ক্লাসগুলো কীভাবে হবে এবং সময়সূচি কী?", a: "ক্লাসগুলো সরাসরি ডিসকর্ড প্রাইভেট চ্যানেলের পাশাপাশি গুগল মিট ও জুম-এ স্ক্রিন শেয়ারের মাধ্যমে অনুষ্ঠিত হবে।" },
    { q: "আমি একদম নতুন, আমি কি এই ব্যাচটি করতে পারব?", a: "হ্যাঁ, বেসিক থেকে শুরু করে অ্যাডভান্সড পর্যন্ত ধাপে ধাপে শেখানো হবে।" },
    { q: "প্র্যাকটিসের সময় কোনো সমস্যায় পড়লে সাপোর্ট কীভাবে পাব?", a: "ডিসকর্ড সার্ভারে ২৪/৭ সাপোর্ট চ্যানেল থাকবে।" },
  ];
  const { items: faqs, isAdmin } = useDynamicCmsList(`course.${courseSlug}.faq.items`, defaultFaqs);

  return (
    <div className="space-y-8 font-bangla animate-in fade-in max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center">সাধারণ প্রশ্নোত্তর</h2>
      <div className="space-y-3">
        {faqs?.map((f, i) => {
          const isOpen = openFaq === i;
          return (
            <div key={i} className="glass rounded-2xl overflow-hidden border border-border/60">
              <div onClick={() => setOpenFaq(isOpen ? null : i)} className="p-5 flex justify-between cursor-pointer">
                <span className="font-bold">{f.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
              {isOpen && <div className="p-5 pt-0 border-t border-border/30 mt-2 text-sm text-foreground/80">{f.a}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ব্যাচ ২ ও ৩ এর জন্য মূল লেআউট
function BatchRegularLanding({ course, slug, enrollParam }: { course: any, slug: string, enrollParam: boolean }) {
  const [showModal, setShowModal] = useState<boolean>(enrollParam);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const timer = useEvergreenTimer(24);
  const previewVideoId = course?.introVideoId || null;

  return (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-x-hidden">
      {showModal && <EnrollmentModal courseSlug={slug} onClose={() => setShowModal(false)} />}
      
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative aspect-video w-full max-w-4xl">
            <button onClick={() => setActiveVideo(null)} className="absolute -top-10 right-0 text-white cursor-pointer"><X className="w-6 h-6" /></button>
            <iframe className="h-full w-full rounded-xl" src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/courses" className="mb-6 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-opacity hover:opacity-60 text-foreground/60">
          <ArrowLeft className="h-3 w-3" /> All courses
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 sm:mb-20">
          <div className="lg:col-span-7 flex flex-col space-y-5 font-bangla">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-border/80 bg-foreground/[0.04] w-fit">
              <span className="h-1.5 w-1.5 rounded-[1px] bg-primary shrink-0"></span>
              <span className="text-xs sm:text-[13px] font-medium text-foreground/90 font-sans">
                <EditableText id={`course.${slug}.hero.badge`}>Batch 03 • Live Masterclass + Private Discord</EditableText>
              </span>
            </div>

            <div className="glass-strong rounded-3xl border border-border/70 shadow-lg relative overflow-hidden backdrop-blur-md select-none">
              <div className="block lg:hidden w-full border-b border-border/40 select-none">
                <div onClick={() => previewVideoId && setActiveVideo(previewVideoId)} onContextMenu={(e) => e.preventDefault()} className={`relative aspect-video w-full group select-none ${previewVideoId ? "cursor-pointer" : ""}`}>
                  <img src={course.thumb || ""} alt={course.title} className="w-full h-full pointer-events-none select-none [user-drag:none] [-webkit-user-drag:none]" />
                  {previewVideoId && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 pointer-events-auto">
                      <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white"><Play className="w-5 h-5 fill-white ml-0.5" /></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 sm:p-7 space-y-4">
                <div className="flex gap-2 text-xs font-mono font-semibold uppercase text-primary tracking-wider">
                  <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20">Masterclass</span>
                  <span>•</span><span className="text-muted-foreground">Beginner to Pro</span>
                </div>
                <h1 className="font-extrabold tracking-tight text-foreground leading-[1.25] text-2xl sm:text-3xl lg:text-4xl">
                  <EditableText id={`course.${slug}.hero.title`}>{course.title}</EditableText>
                </h1>
                <div className="space-y-3.5 text-sm sm:text-base text-foreground/80 leading-[1.7] border-t border-border/40 pt-4">
                  <p><EditableText id={`course.${slug}.hero.desc.1`}>ইউটিউবে শত শত টিউটোরিয়াল দেখেও আসল এডিটিং ফ্লো মিলছে না? শুধু সফটওয়্যারের বাটন চেনা কোনো স্থায়ী স্কিল নয়।</EditableText></p>
                  <p><EditableText id={`course.${slug}.hero.desc.2`}>এই মাস্টারক্লাসে আপনি শিখবেন আন্তর্জাতিক মানের সিনেমাটিক স্টোরিটেলিং, ৩ সেকেন্ড রিটেনশন হুক এবং সাউন্ড ডিজাইনের আসল সিক্রেট।</EditableText></p>
                </div>
                
                <div className="block lg:hidden pt-4 border-t border-border/40 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground block font-mono">Course Fee</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-foreground font-mono">৳৩,০০০</span>
                      <span className="text-xs text-muted-foreground line-through font-mono">৳৫,০০০</span>
                    </div>
                  </div>
                  <button onClick={() => setShowModal(true)} className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer">
                    <span>Enroll Now</span><ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="glass p-4 rounded-2xl border border-border/60 flex items-start gap-3.5"><div className="p-2.5 rounded-xl bg-destructive/10 text-destructive mt-0.5"><Radio className="w-5 h-5 animate-pulse" /></div><div><h3 className="font-bold text-sm">হাতে কলমে লাইভ সেশন</h3><p className="text-xs text-foreground/75 mt-1">স্ক্রিন শেয়ারে প্র্যাকটিক্যাল কাজ শেখা এবং আজীবন ক্লাউড রেকর্ডিং অ্যাক্সেস।</p></div></div>
              <div className="glass p-4 rounded-2xl border border-border/60 flex items-start gap-3.5"><div className="p-2.5 rounded-xl bg-primary/10 text-primary mt-0.5"><MessageSquare className="w-4 h-4" /></div><div><h3 className="font-bold text-sm">২৪/৭ ডিসকর্ড হেল্পডেস্ক</h3><p className="text-xs text-foreground/75 mt-1">স্টুডেন্ট কমিউনিটি, যেকোনো টেকনিক্যাল সাপোর্ট ও উইকলি মেন্টর ফিডব্যাক।</p></div></div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="glass-strong rounded-3xl p-6 sm:p-7 border border-border/60 shadow-xl overflow-hidden backdrop-blur-md select-none">
              <div onClick={() => previewVideoId && setActiveVideo(previewVideoId)} onContextMenu={(e) => e.preventDefault()} className={`relative aspect-video w-full rounded-2xl overflow-hidden border border-border/40 group mb-5 select-none ${previewVideoId ? "cursor-pointer" : ""}`}>
                <img src={course.thumb || ""} alt={course.title} className="w-full h-full pointer-events-none select-none [user-drag:none] [-webkit-user-drag:none] object-cover" />
                {previewVideoId && (
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/25 transition-colors pointer-events-auto">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white"><Play className="w-5 h-5 fill-white ml-0.5" /></div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 pb-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-extrabold text-foreground font-mono"><EditableText id={`course.${slug}.price`}>{course.price || "৳৩,০০০"}</EditableText></span>
                  <span className="text-base text-muted-foreground/60 line-through decoration-rose-500/80 font-mono">৳৫,০০০</span>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20 font-sans tracking-wide">40% OFF (Limited Time)</span>
              </div>

              <div className="mb-5 p-3 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-2 font-sans font-medium text-xs text-amber-600"><Flame className="w-4 h-4 fill-amber-500 animate-pulse" /><span>Offer Ends In:</span></div>
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                  <span className="px-2 py-0.5 rounded-lg bg-background/90 text-foreground border border-amber-500/20">{formatDigit(timer.hours)}h</span><span className="text-amber-500">:</span>
                  <span className="px-2 py-0.5 rounded-lg bg-background/90 text-foreground border border-amber-500/20">{formatDigit(timer.minutes)}m</span><span className="text-amber-500">:</span>
                  <span className="px-2 py-0.5 rounded-lg bg-background/90 text-rose-600 border border-rose-500/20">{formatDigit(timer.seconds)}s</span>
                </div>
              </div>

              <div className="space-y-3.5 mb-6 border-y border-border/40 py-4 font-sans text-sm">
                <div className="flex justify-between"><div className="flex items-center gap-2.5 text-foreground/70"><CalendarDays className="h-3.5 w-3.5 text-primary" /><span>Batch Starts</span></div><span className="font-semibold">October 15, 2026</span></div>
                <div className="flex justify-between"><div className="flex items-center gap-2.5 text-foreground/70"><Clock className="h-3.5 w-3.5 text-primary" /><span>Duration</span></div><span className="font-normal">30 Days Intensive</span></div>
                <div className="flex justify-between"><div className="flex items-center gap-2.5 text-foreground/70"><User className="h-3.5 w-3.5 text-primary" /><span>Mentor</span></div><span className="font-normal">{course.instructor || "Muhammad Ataullah"}</span></div>
              </div>

              <button onClick={() => setShowModal(true)} className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer">
                Enroll in Batch 03 Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Course Tabs Navigation */}
        <div className="sticky top-20 z-30 mb-8 py-2.5 backdrop-blur-md">
          <div className="max-w-4xl mx-auto glass-strong p-1.5 rounded-2xl flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "curriculum", label: "Curriculum", icon: BookOpen },
              { id: "included", label: "What's Included", icon: Gift },
              { id: "how", label: "How It Works", icon: Workflow },
              { id: "faq", label: "FAQ", icon: MessageCircleQuestion },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-sm font-semibold transition-all cursor-pointer ${activeTab === tab.id ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-foreground/5"}`}>
                  <Icon className="w-4 h-4" /><span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-5xl mx-auto glass-strong rounded-3xl p-6 sm:p-10 mb-16 overflow-hidden">
          {activeTab === "overview" && <TabOverview courseSlug={slug} />}
          {activeTab === "curriculum" && <TabCurriculum courseSlug={slug} />}
          {activeTab === "included" && <TabWhatsIncluded courseSlug={slug} />}
          {activeTab === "how" && <TabHowItWorks courseSlug={slug} />}
          {activeTab === "faq" && <TabFaq courseSlug={slug} />}
        </div>
        
        {/* Final CTA Banner (Batch 03 Offer) */}
        <div className="relative max-w-5xl mx-auto font-bangla mb-16">
          <div className="glass-strong rounded-3xl border border-primary/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide shadow-2xs mb-5">
              <Flame className="w-3.5 h-3.5 fill-primary text-primary animate-pulse" />
              <span>সীমিত সময়ের অফার • ব্যাচ ৩ এনরোলমেন্ট</span>
            </div>
            <h3 className="font-bangla font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground leading-[1.28] tracking-tight">
              দেরি না করে আজই আপনার সিনেমাটিক এডিটিং জার্নি শুরু করুন
            </h3>
            <p className="font-bangla text-sm sm:text-base text-foreground/85 leading-relaxed mt-4 max-w-2xl mx-auto">
              ব্যাচ ৩ এ সীমিত আসনে বিশেষ ছাড় চলছে। রেগুলার ফি ৫,০০০ টাকার বদলে এখন মাত্র ৩,০০০ টাকা। সরাসরি প্র্যাকটিক্যাল সিনেমাটিক স্টোরিটেলিং ও ক্লায়েন্ট ডিল ক্লোজ করার সম্পূর্ণ গাইডলাইন।
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3">
              <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.99] transition-all font-sans cursor-pointer">
                <span>Enroll in Batch 03 Now (৳৩,০০০)</span><ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-muted-foreground font-bangla flex items-center gap-1.5 mt-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /><span>১০০% মানি ব্যাক ও স্যাটিসফ্যাকশন ট্রাস্ট | সুরক্ষিত পেমেন্ট ভেরিফিকেশন</span></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


// =========================================================================
// ৩. মেইন রাউটার (স্লাগ যাচাই করে লেআউট সুইচ করা)
// =========================================================================

function CourseDetailMaster() {
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const course = COURSES.find((c) => c.slug === slug);

  if (!course) {
    return <div className="p-20 text-center font-bold text-2xl text-destructive">Course not found or invalid slug.</div>;
  }

  // স্লাগ চেক: যদি ব্যাচ ১ হয়, তবে শুধুমাত্র Batch1Landing রেন্ডার হবে।
  const cleanSlug = slug.toLowerCase();
  const isBatch1 = cleanSlug === "batch-01" || cleanSlug === "batch-1" || cleanSlug === "rising-editors" || cleanSlug.includes("15-days");

  return (
    // Global image drag protection & footer hidden
    <div className="[&>div>footer]:!hidden [&>footer]:!hidden [&_img]:select-none [&_img]:pointer-events-auto [&_img]:[user-drag:none] [&_img]:[-webkit-user-drag:none]">
      <SiteShell>
        
        {isBatch1 ? (
          <Batch1Landing course={course} />
        ) : (
          <BatchRegularLanding course={course} slug={slug} enrollParam={!!search?.enroll} />
        )}

        {/* Global Single Footer for Courses */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <footer className="w-full py-6 border-t border-border/40 text-center font-sans mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
              <p>© 2026 growVelo Studio. All rights reserved.</p>
              <div className="flex items-center gap-4 text-[11px] tracking-wide">
                <Link to="/legal" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link to="/legal" className="hover:text-foreground transition-colors">Terms of Service</Link>
                <a href={`https://wa.me/8801890352188`} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">WhatsApp Support</a>
              </div>
            </div>
          </footer>
        </div>

      </SiteShell>
    </div>
  );
}

export const Route = createFileRoute("/courses/$slug")({
  validateSearch: (search: Record<string, unknown>): { enroll?: boolean } => {
    return { enroll: search.enroll === true || search.enroll === "true" };
  },
  beforeLoad: ({ params }) => {
    const exists = COURSES.some((c) => c.slug === params.slug);
    if (!exists) throw notFound();
  },
  head: ({ params }) => {
    const c = COURSES.find((x) => x.slug === params.slug);
    const title = c ? `${c.title} • growVelo Courses` : "Course • growVelo";
    return {
      meta: [
        { title },
        { name: "description", content: c?.desc || "" },
      ],
    };
  },
  component: CourseDetailMaster,
});
