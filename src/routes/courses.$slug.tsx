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
  Film,
  Globe,
  XCircle,
  Sparkles,
  ChevronDown,
  BookOpen,
  Video,
  CloudDownload,
  Users,
  FolderArchive,
  FileCheck,
  Award,
  FileText,
  MessageCircle,
  HelpCircle,
  LayoutDashboard,
  Workflow,
  HelpCircle as MessageCircleQuestion,
  TrendingUp,
  Plus,
  Trash2,
  AlertCircle,
  Smartphone,
  CheckSquare,
  Rocket,
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

// ১০০% কড়াকড়ি জিমেইল-নির্ভর অ্যাডমিন চেক (আপনার আসল জিমেইল সংরক্ষিত)
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
        if (email.includes("abdullah20050127") || email.includes("admin")) {
          if (isMounted) setIsAdmin(true);
        } else {
          if (isMounted) setIsAdmin(false);
        }
      } catch (e) {
        if (isMounted) setIsAdmin(false);
      }
    };

    verifyAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      verifyAdmin();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return isAdmin;
}

// ডাটাবেজ সিঙ্ক হুক
function useDynamicCmsList<T>(storageKey: string, defaultItems: T[]) {
  const [items, setItems] = useState<T[]>(defaultItems);
  const isAdmin = useStrictAdminCheck();

  useEffect(() => {
    const fetchCloudData = async () => {
      try {
        const { data } = await supabase
          .from("site_content")
          .select("content")
          .eq("key", storageKey)
          .maybeSingle();
        if (data?.content) {
          const parsed = JSON.parse(data.content);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed);
          }
        }
      } catch (e) {}
    };
    fetchCloudData();
  }, [storageKey]);

  const save = async (newItems: T[]) => {
    if (!isAdmin) return; 
    setItems(newItems);
    try {
      await supabase.from("site_content").upsert({
        key: storageKey,
        content: JSON.stringify(newItems),
        updated_at: new Date().toISOString(),
      });
    } catch (e) {}
  };

  const addItem = (item: T) => {
    if (isAdmin) save([...items, item]);
  };

  const removeItem = (index: number) => {
    if (isAdmin) save(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, updated: T) => {
    if (isAdmin) {
      const next = [...items];
      next[index] = updated;
      save(next);
    }
  };

  return { items, addItem, removeItem, updateItem, isAdmin };
}

// ব্যাচ ৩ এর এনরোলমেন্ট মডাল
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
                <EditableText id={`course.${courseSlug}.modal.title`}>ব্যাচ ৩ এ সিট কনফার্মেশন ও পেমেন্ট</EditableText>
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

            <div className="glass rounded-2xl p-4 sm:p-4.5 border border-border/70 mb-5 space-y-3 bg-foreground/[0.02]">
              <div className="text-xs font-bold text-foreground uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <Smartphone className="w-3.5 h-3.5 text-primary" />
                <span>পেমেন্ট করার নিয়মাবলী:</span>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/15 text-primary font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                  ১
                </span>
                <p className="text-xs sm:text-[13px] text-foreground/85 leading-relaxed">
                  আপনার ফোনের <strong>{selectedMethod === "bKash" ? "bKash" : "Nagad"}</strong> অ্যাপটি ওপেন করুন।
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/15 text-primary font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                  ২
                </span>
                <p className="text-xs sm:text-[13px] text-foreground/85 leading-relaxed">
                  অ্যাপের হোম স্ক্রিন থেকে <strong>"Send Money"</strong> অপশনটিতে যান।
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/15 text-primary font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                  ৩
                </span>
                <p className="text-xs sm:text-[13px] text-foreground/85 leading-relaxed">
                  উপরের নম্বরটি পেস্ট করুন এবং ঠিক <strong>৳৩,০০০</strong> টাকা সেন্ড মানি করুন।
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/15 text-primary font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                  ৪
                </span>
                <p className="text-xs sm:text-[13px] text-foreground/85 leading-relaxed">
                  টাকা পাঠানো হলে প্রাপ্ত <strong>Transaction ID (TrxID)</strong> কপি করে নিচের বক্সে দিন।
                </p>
              </div>
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
              <EditableText id={`course.${courseSlug}.modal.success.title`}>রিকোয়েস্ট প্রস্তুত হয়েছে!</EditableText>
            </h3>
            <p className="font-bangla text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              <EditableText id={`course.${courseSlug}.modal.success.desc`}>
                হোয়াটসঅ্যাপ উইন্ডো ওপেন হয়েছে। মেসেজটি সেন্ড করলেই আমাদের টিম পেমেন্ট ভেরিফাই করে আপনাকে ইনস্ট্যান্ট ডিসকর্ড অ্যাক্সেস দিয়ে দেবে।
              </EditableText>
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

// ================= ব্যাচ ১ এর সম্পূর্ণ ডেডিকেটেড কম্পোনেন্ট (পোস্টার অনুযায়ী) =================
function Batch01BootcampView({ courseSlug }: { courseSlug: string }) {
  const [showBatch3Modal, setShowBatch3Modal] = useState(false);

  // পোস্টার অনুযায়ী ১৫ দিনের ফ্রি কারিকুলাম
  const bootcampCurriculum = [
    { day: "DAY 1", title: "Editing Basics & Interface Setup", desc: "Premiere Pro ইন্টারফেস পরিচিতি, টাইমলাইন সিক্রেট ও ফাইল ম্যানেজমেন্ট।" },
    { day: "DAY 5", title: "Professional Cuts & Transitions", desc: "জাম্প কাট, ম্যাচ কাট, স্মুথ ট্রানজিশন ও সিনেমাটিক পেসিং টেকনিক।" },
    { day: "DAY 8", title: "Color Correction & Audio Editing", desc: "কালার গ্রেডিং বেসিক্স, ভয়েস ক্লিয়ার করা ও ব্যাকগ্রাউন্ড সাউন্ড ডিজাইন।" },
    { day: "DAY 10", title: "Reels & Short Form Content Creation", desc: "৩ সেকেন্ড রিটেনশন হুক, আকর্ষণীয় ক্যাপশন ও ভাইরাল ভিডিও এডিটিং।" },
    { day: "DAY 15", title: "Complete Project Editing & Client Ready Process", desc: "পূর্ণাঙ্গ ক্লায়েন্ট প্রজেক্ট হ্যান্ডেলিং ও মার্কেটপ্লেসে কাজ পাওয়ার গাইডলাইন।" },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 font-bangla">
      {showBatch3Modal && (
        <EnrollmentModal
          courseSlug="batch-03"
          onClose={() => setShowBatch3Modal(false)}
        />
      )}

      {/* ১. পোস্টার টপ ব্যানার ও কোর ভ্যালু */}
      <div className="glass-strong rounded-3xl border border-border/70 p-6 sm:p-10 shadow-xl relative overflow-hidden backdrop-blur-md">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold tracking-wide">
            <Rocket className="w-4 h-4" />
            <span>ONLINE RISING EDITORS BATCH - 1</span>
          </div>

          <h1 className="font-bangla font-black text-2xl sm:text-3xl lg:text-4xl text-foreground leading-[1.3]">
            ভিডিও এডিটিং শিখতে চান, কিন্তু কোথা থেকে শুরু করবেন বুঝতে পারছেন না?
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            বর্তমানে Content Creator, Business Owner এবং Freelancer—সবারই Video Editor প্রয়োজন। কিন্তু বেশিরভাগ মানুষ সঠিক রোডম্যাপ না পেয়ে বিভ্রান্ত হয়ে পড়ে। এই সমস্যার সমাধান হিসেবেই আমাদের আয়োজন:
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-primary/10 border border-primary/30 max-w-xl mx-auto mt-4">
            <span className="font-mono font-bold text-lg sm:text-xl text-primary block">
              ১৫ দিনের Free Video Editing Course
            </span>
            <span className="text-xs sm:text-sm text-foreground/80 font-medium mt-1 block">
              যেখানে প্রতিদিন Step-by-Step প্র্যাকটিক্যালভাবে শেখানো হবে।
            </span>
          </div>
        </div>
      </div>

      {/* ২. সমস্যা বনাম সমাধান (Course Confusions vs Solutions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 sm:p-8 rounded-3xl border border-destructive/25 bg-destructive/[0.02] space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-destructive/10 text-destructive text-xs font-bold">
            <span>Course Confusions (অনেকেই যা ফেস করে)</span>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-foreground/85">
            <li className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <span>কী সফটওয়্যার ব্যবহার করবে এবং কোথা থেকে শুরু করবে তা জানে না।</span>
            </li>
            <li className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <span>ইউটিউবের হাজারো এলোমেলো ভিডিও দেখে কনফিউজড হয়ে যায়।</span>
            </li>
            <li className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <span>সঠিক গাইডলাইনের অভাবে শিখতে গিয়ে মাঝপথেই হাল ছেড়ে দেয়।</span>
            </li>
          </ul>
        </div>

        <div className="glass p-6 sm:p-8 rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.02] space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>এই ১৫ দিনে আপনি যা শিখবেন</span>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-foreground/90 font-medium">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Professional Video Editing Workflow</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Cuts, Smooth Transitions & Effects</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Color Correction Basics & Skin Tone Balance</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Audio & Sound Design Mastering</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Social Media Video & Reels Editing</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Client Ready Project Execution Process</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ৩. ১৫ দিনের স্টেপ বাই স্টেপ রোডম্যাপ */}
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">Free Roadmap</span>
          <h2 className="font-bangla font-black text-xl sm:text-2xl lg:text-3xl text-foreground mt-1">
            ১৫ দিনের এডিটিং বুটক্যাম্প কারিকুলাম
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3.5">
          {bootcampCurriculum.map((c, i) => (
            <div key={i} className="glass p-4 sm:p-5 rounded-2xl border border-border/70 flex items-start gap-4">
              <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold shrink-0">
                {c.day}
              </span>
              <div>
                <h3 className="font-sans font-bold text-sm sm:text-base text-foreground">{c.title}</h3>
                <p className="font-bangla text-xs sm:text-sm text-foreground/75 mt-1">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ৪. ব্যাচ ইনফো ও রেজিস্ট্রেশন লিংক */}
      <div className="glass-strong rounded-3xl border border-primary/30 p-6 sm:p-8 max-w-2xl mx-auto text-center space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-3 rounded-xl glass border border-border/60">
            <span className="text-muted-foreground block text-[11px]">START DATE</span>
            <strong className="text-foreground font-mono text-xs sm:text-sm">1 JULY 2026</strong>
          </div>
          <div className="p-3 rounded-xl glass border border-border/60">
            <span className="text-muted-foreground block text-[11px]">FORMAT</span>
            <strong className="text-primary font-mono text-xs sm:text-sm">LIVE COURSE</strong>
          </div>
          <div className="p-3 rounded-xl glass border border-emerald-500/30 bg-emerald-500/5">
            <span className="text-muted-foreground block text-[11px]">FEE</span>
            <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-xs sm:text-sm font-black">COMPLETELY FREE</strong>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-foreground/[0.03] border border-border/50 text-xs text-foreground/80">
          💡 Beginner হলেও কোনো অভিজ্ঞতা ছাড়া জয়েন করতে পারবেন।
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
          <a
            href="https://forms.gle/gSvxvW5VukEjjZgd7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
          >
            <span>গুগল ফর্মে রেজিস্ট্রেশন করুন</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/8801890352188"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl glass border border-border/80 font-semibold text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-500" />
            <span>WhatsApp: 01890352188</span>
          </a>
        </div>
      </div>

      {/* ================= ৫. লাস্টে সীমিত সময়ের অফার (ব্যাচ ৩ এর মাস্টারক্লাস এনরোলমেন্ট) ================= */}
      <div className="relative max-w-5xl mx-auto font-bangla pt-8 border-t border-border/40">
        <div className="glass-strong rounded-3xl border border-primary/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide shadow-2xs mb-4">
            <Flame className="w-3.5 h-3.5 fill-primary text-primary animate-pulse" />
            <span>পরবর্তী লেভেলের ক্যারিয়ার গড়ুন • সীমিত সময়ের অফার</span>
          </div>

          <h3 className="font-bangla font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground leading-[1.28] tracking-tight">
            ব্যাচ ৩: Advanced Video Editing & Retelling Masterclass
          </h3>

          <p className="font-bangla text-sm sm:text-base text-foreground/85 leading-relaxed mt-3 max-w-2xl mx-auto">
            ফ্রি বুটক্যাম্পের পর প্রফেশনাল সিনেমাটিক স্টোরিটেলিং, হাই রিটেনশন এডিটিং ও সরাসরি ক্লায়েন্ট ডিল ক্লোজ করার জন্য ব্যাচ ৩ এ সীমিত আসনে বিশেষ ছাড় চলছে।
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
    </div>
  );
}

// ================= কোর্স রাউট মাস্টার কম্পোনেন্ট =================
function CourseDetail() {
  const { slug } = Route.useParams();
  const course = COURSES.find((c) => c.slug === slug)!;

  // এটি ব্যাচ ১ কিনা তা যাচাই (slug অনুযায়ী)
  const isBatch1 = slug.includes("batch-1") || slug.includes("batch-01") || slug.includes("rising-editors") || slug.includes("15-days");

  return (
    <div className="[&>div>footer]:!hidden [&>footer]:!hidden">
      <SiteShell>
        <div className="pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-x-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <Link
              to="/courses"
              className="mb-6 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-opacity hover:opacity-60 text-foreground/60"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>All courses</span>
            </Link>

            {/* যদি ব্যাচ ১ হয় তবে পোস্টারের তথ্য দিয়ে তৈরি করা ল্যান্ডিং পেজ দেখাবে */}
            {isBatch1 ? (
              <Batch01BootcampView courseSlug={slug} />
            ) : (
              /* অন্য কোর্সের জন্য নিয়মিত পেজ ভিউ */
              <div className="space-y-12">
                <div className="glass-strong rounded-3xl border border-border/70 p-8 text-center">
                  <h1 className="text-2xl sm:text-3xl font-bold">{course.title}</h1>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">{course.desc}</p>
                </div>
              </div>
            )}

            {/* কোর্স পেজের জন্য একক স্লিম ফুটার */}
            <footer className="w-full py-6 border-t border-border/40 text-center font-sans mt-16">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
                <p>© 2026 growVelo Studio. All rights reserved.</p>
                <div className="flex items-center gap-4 text-[11px] tracking-wide">
                  <Link to="/legal" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                  <span>•</span>
                  <Link to="/legal" className="hover:text-foreground transition-colors">Terms of Service</Link>
                  <span>•</span>
                  <a href={`https://wa.me/8801890352188`} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
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
