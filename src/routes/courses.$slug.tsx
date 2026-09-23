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
  ExternalLink,
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

// ১০০% কড়াকড়ি জিমেইল-নির্ভর অ্যাডমিন চেক (আপনার সংরক্ষিত জিমেইল)
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

// ================= এনরোলমেন্ট মডাল =================
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

function BatchClosedModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="glass-strong rounded-3xl max-w-md w-full p-8 border border-border/80 shadow-2xl relative text-center flex flex-col items-center font-bangla"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass text-muted-foreground hover:text-foreground transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-5 border border-amber-500/20">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="font-bangla text-2xl font-extrabold text-foreground mb-3">
          এই ব্যাচটির এনরোলমেন্ট সম্পন্ন হয়ে গেছে
        </h2>
        <p className="font-bangla text-sm text-foreground/80 leading-relaxed mb-8">
          আমাদের ব্যাচ ০১ এর ক্লাস এবং এনরোলমেন্ট ইতিমধ্যে শেষ হয়ে গেছে।
          <br /><br />
          বর্তমানে আমাদের অ্যাডভান্সড মাস্টারক্লাস <strong>(ব্যাচ ০৩)</strong> এর এনরোলমেন্ট চলছে। আপনি চাইলে সেখানে যুক্ত হতে পারেন।
        </p>
        <button
          type="button"
          onClick={() => {
            onClose();
            const b3Course = COURSES.find((c) => c.slug.includes("batch-3") || c.slug.includes("batch-03"));
            const targetSlug = b3Course ? b3Course.slug : "batch-03";
            window.location.href = `/courses/${targetSlug}`;
          }}
          className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer font-sans"
        >
          <span>ব্যাচ ৩ এ জয়েন করুন</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
// ================= ট্যাব ১: ওভারভিউ =================
function TabOverview({ courseSlug, isBatch1 }: { courseSlug: string; isBatch1: boolean }) {
  const batch1Cards = [
    {
      id: "b1_card_1",
      title: "সঠিক Roadmap এর অভাব",
      desc: "অনেকেই ভিডিও এডিটিং শিখতে চায় কিন্তু কোথা থেকে শুরু করবে বা কী সফটওয়্যার ব্যবহার করবে জানে না।",
      action: "স্টেপ বাই স্টেপ শিখুন",
    },
    {
      id: "b1_card_2",
      title: "ইউটিউবের ফ্রি ভিডিও কনফিউশন",
      desc: "ইউটিউবে হাজারো এলোমেলো ভিডিও দেখে মানুষ দিকভ্রান্ত হয়ে যায় এবং শিখতে গিয়ে মাঝপথেই ছেড়ে দেয়।",
      action: "গোছানো গাইডলাইন",
    },
    {
      id: "b1_card_3",
      title: "মার্কেটে এডিটরের ব্যাপক ডিমান্ড",
      desc: "বর্তমানে Content Creator, Business Owner এবং Freelancer—সবারই দক্ষ Video Editor প্রয়োজন।",
      action: "মার্কেট রেডি প্রসেস",
    },
  ];

  const batchRegularCards = [
    {
      id: "card_1",
      title: "সবাই কনটেন্ট বানাচ্ছে, কিন্তু রিটেনশন পাচ্ছে কয়জন?",
      desc: "ফেসবুক রিলস, ইউটিউব থেকে শুরু করে প্রতিটি ব্র্যান্ডের নিয়মিত ভিডিও প্রয়োজন। তবে প্রথম ৩ সেকেন্ডে দর্শক ধরে রাখার মতো হুক ও রিটেনশন সাইকোলজি জানা এডিটর খুবই কম।",
      action: "অডিয়েন্স সাইকোলজি শিখুন",
    },
    {
      id: "card_2",
      title: "সফটওয়্যার জানা যথেষ্ট নয়, দরকার সিনেমাটিক ভিশন",
      desc: "ইউটিউবের ফ্রি টিউটোরিয়াল দেখে সফটওয়্যার চালানো শেখা যায়, কিন্তু দর্শকের অনুভূতি নিয়ন্ত্রণ করা, নিখুঁত পেসিং এবং শক্তিশালী সাউন্ড ডিজাইনের জন্য দরকার বাস্তব মেন্টরশিপ।",
      action: "রিয়েল এডিটিং মেথডোলজি",
    },
    {
      id: "card_3",
      title: "কম বাজেটের কাজ নয়, সরাসরি প্রিমিয়াম ক্লায়েন্ট ডিল",
      desc: "দেশি এজেন্সি ও আন্তর্জাতিক কনটেন্ট ক্রিয়েটররা এখন কোয়ালিটি ভিডিওর জন্য প্রিমিয়াম পে করতে প্রস্তুত। আপনার শুধু একটি মানসম্মত পোর্টফোলিও ও সঠিক যোগাযোগ প্রয়োজন।",
      action: "হাই টিকেটিং ফ্রেমওয়ার্ক",
    },
  ];

  const batch1BadPoints = [
    "কী সফটওয়্যার ব্যবহার করবে এবং কোথা থেকে শুরু করবে তা জানে না",
    "ইউটিউবের হাজারো এলোমেলো ভিডিও দেখে কনফিউজড হয়ে যায়",
    "সঠিক রোডম্যাপ না থাকায় শিখতে গিয়ে মাঝপথেই হাল ছেড়ে দেয়",
  ];

  const batch1GoodPoints = [
    "Professional Video Editing Workflow & Premiere Pro Setup",
    "Cuts, Smooth Transitions, Effects & Audio Editing",
    "Color Correction Basics, Social Media Reels & Client Ready Process",
  ];

  const batchRegularBadPoints = [
    "ঘণ্টার পর ঘণ্টা এলোমেলো ইউটিউব টিউটোরিয়ালে বিভ্রান্ত ও দিকহারা থাকা",
    "সাউন্ড ডিজাইন ও কালার সাইকোলজি ছাড়া সাধারণ কাট পেস্ট এডিট",
    "মার্কেটপ্লেসে অল্প টাকায় কাজের জন্য বিড করে বারবার রিজেক্ট হওয়া",
  ];

  const batchRegularGoodPoints = [
    "সরাসরি প্র্যাকটিক্যাল প্রজেক্ট ও সিনেমাটিক স্টোরিটেলিং পদ্ধতি আয়ত্ত করা",
    "উন্নত সাউন্ড ডিজাইন, নিখুঁত কালার গ্রেডিং ও হাই রিটেনশন মোশন অ্যানিমেশন",
    "আন্তর্জাতিক মানের প্রফেশনাল পোর্টফোলিও ও সরাসরি ক্লায়েন্ট ডিল ক্লোজিং দক্ষতা",
  ];

  const storageSuffix = courseSlug.replace(/-/g, '_');

  const { items: cards, addItem: addCard, removeItem: removeCard, isAdmin } = useDynamicCmsList(
    `course.${courseSlug}.overview.cards.${storageSuffix}`,
    isBatch1 ? batch1Cards : batchRegularCards
  );

  const { items: badPoints, addItem: addBadPoint, removeItem: removeBadPoint } = useDynamicCmsList(
    `course.${courseSlug}.overview.badPoints.${storageSuffix}`,
    isBatch1 ? batch1BadPoints : batchRegularBadPoints
  );

  const { items: goodPoints, addItem: addGoodPoint, removeItem: removeGoodPoint } = useDynamicCmsList(
    `course.${courseSlug}.overview.goodPoints.${storageSuffix}`,
    isBatch1 ? batch1GoodPoints : batchRegularGoodPoints
  );

  const handleAddNewCard = () => {
    addCard({
      id: `card_${Date.now()}`,
      title: "নতুন সুযোগ বা সমস্যা বিশ্লেষণ",
      desc: "এখানে নতুন কার্ডের বিস্তারিত বিবরণ বাংলায় লিখুন।",
      action: "বিস্তারিত জানুন",
    });
  };

  return (
    <div className="space-y-10 sm:space-y-12 animate-in fade-in duration-300 font-bangla w-full overflow-hidden">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center px-1 sm:px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-medium tracking-wide mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <EditableText id={`course.${courseSlug}.painpoint.badge`}>
            {isBatch1 ? "Course Confusions & Solution" : "মার্কেট ডিমান্ড ও বাস্তবতা"}
          </EditableText>
        </div>

        <h2 className="font-bangla font-extrabold tracking-tight text-foreground text-xl sm:text-2xl lg:text-3xl leading-[1.3] break-words">
          <EditableText id={`course.${courseSlug}.painpoint.heading`}>
            {isBatch1
              ? "আপনি কি জানেন? কেন বেশিরভাগ মানুষ এডিটিং শিখতে পারে না?"
              : "ভিডিও এখন সব জায়গায়, কিন্তু ইন্ডাস্ট্রি স্ট্যান্ডার্ড এডিটরের অভাব কেন?"}
          </EditableText>
        </h2>

        <p className="font-bangla text-muted-foreground text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
          <EditableText id={`course.${courseSlug}.painpoint.subheading`}>
            {isBatch1
              ? "সঠিক গাইডলাইন না থাকার কারণে অনেকেই মাঝপথে ছেড়ে দেয়। কোনো Paid Course কেনার আগে এই Free Course থেকেই শুরু করতে পারেন।"
              : "বর্তমানে শুধু টুলসের সাধারণ কাজ জানা যথেষ্ট নয়। সফল ক্যারিয়ার গড়তে প্রয়োজন স্টোরিটেলিং, সাউন্ড সাইকোলজি ও হাই কনভার্টিং এডিটিং দক্ষতা।"}
          </EditableText>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
        {cards?.map((card, idx) => (
          <div
            key={card.id || idx}
            className="glass p-5 sm:p-7 rounded-2xl border border-border/60 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group shadow-xs relative"
          >
            {isAdmin && (
              <button
                type="button"
                onClick={() => removeCard(idx)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all cursor-pointer z-10"
                title="এই কার্ডটি মুছুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <div>
              <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 mb-4 transition-colors group-hover:border-primary/40 group-hover:text-primary">
                {idx % 3 === 0 ? <TrendingUp className="w-5 h-5" /> : idx % 3 === 1 ? <Film className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
              </div>
              <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug pr-6">
                <EditableText id={`course.${courseSlug}.overview.card.${card.id}.title`}>
                  {card.title}
                </EditableText>
              </h3>
              <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2.5">
                <EditableText id={`course.${courseSlug}.overview.card.${card.id}.desc`}>
                  {card.desc}
                </EditableText>
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              <span>
                <EditableText id={`course.${courseSlug}.overview.card.${card.id}.action`}>
                  {card.action}
                </EditableText>
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleAddNewCard}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md hover:brightness-110 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ নতুন কার্ড যোগ করুন (Add New Card)</span>
          </button>
        </div>
      )}

      {/* বিফোর বনাম আফটার কম্প্যারিজন ব্যানার */}
      <div className="glass rounded-2xl border border-border/70 p-5 sm:p-8 relative overflow-hidden backdrop-blur-md w-full">
        <div className="text-center mb-6">
          <h3 className="font-bangla text-base sm:text-lg font-bold text-foreground">
            <EditableText id={`course.${courseSlug}.compare.heading`}>
              {isBatch1 ? "Course Confusions বনাম ১৫ দিনের বুটক্যাম্প অর্জন" : "আপনার এডিটিং জার্নির মোড় ঘুরিয়ে দেবে ব্যাচ ৩"}
            </EditableText>
          </h3>
          <p className="font-bangla text-xs sm:text-sm text-muted-foreground mt-1">
            <EditableText id={`course.${courseSlug}.compare.subheading`}>
              {isBatch1 ? "অনলাইন বুটক্যাম্প কীভাবে আপনার সমস্যার সমাধান করবে" : "একজন সাধারণ এডিটর ও প্রফেশনাল ভিডিও রিটেলারের মূল পার্থক্য"}
            </EditableText>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-border/60">
          <div className="space-y-3.5 pt-3 md:pt-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-destructive/10 text-destructive text-xs font-semibold">
              <span><EditableText id={`course.${courseSlug}.compare.bad.badge`}>Course Confusions (অনেকের সমস্যা)</EditableText></span>
            </div>
            <ul className="space-y-2.5 font-bangla text-xs sm:text-sm text-foreground/75">
              {badPoints?.map((point, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 group">
                  <div className="flex items-start gap-2 flex-1">
                    <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    <span>
                      <EditableText id={`course.${courseSlug}.compare.bad.item.${idx}`}>
                        {point}
                      </EditableText>
                    </span>
                  </div>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => removeBadPoint(idx)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                      title="মুছুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {isAdmin && (
              <button
                type="button"
                onClick={() => addBadPoint("নতুন বিষয় বাংলায় লিখুন")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-destructive hover:underline pt-2 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ নতুন লাইন যোগ করুন (Add Point)</span>
              </button>
            )}
          </div>

          <div className="space-y-3.5 pt-5 md:pt-0 md:pl-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span><EditableText id={`course.${courseSlug}.compare.good.badge`}>এই ১৫ দিনে আপনি যা শিখবেন</EditableText></span>
            </div>
            <ul className="space-y-2.5 font-bangla text-xs sm:text-sm text-foreground/90 font-medium">
              {goodPoints?.map((point, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 group">
                  <div className="flex items-start gap-2 flex-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <EditableText id={`course.${courseSlug}.compare.good.item.${idx}`}>
                        {point}
                      </EditableText>
                    </span>
                  </div>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => removeGoodPoint(idx)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                      title="মুছুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {isAdmin && (
              <button
                type="button"
                onClick={() => addGoodPoint("নতুন সফল পয়েন্ট বাংলায় লিখুন")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline pt-2 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ নতুন লাইন যোগ করুন (Add Point)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= ট্যাব ২: কারিকুলাম =================
function TabCurriculum({ courseSlug, isBatch1 }: { courseSlug: string; isBatch1: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const batch1Modules = [
    {
      moduleNo: "DAY 1",
      title: "Editing Basics & Interface Setup",
      desc: "Premiere Pro ইন্টারফেস পরিচিতি, টাইমলাইন সিক্রেট ও ফাইল ম্যানেজমেন্ট।",
      lessons: [
        "লেসন ১: Premiere Pro প্রোজেক্ট সেটআপ ও টুলস পরিচিতি",
        "লেসন ২: রাফ কাট ও টাইমলাইনে ফুটেজ সাজানো",
      ],
    },
    {
      moduleNo: "DAY 5",
      title: "Professional Cuts & Smooth Transitions",
      desc: "জাম্প কাট, ম্যাচ কাট ও প্রফেশনাল সিনেমাটিক ট্রানজিশন টেকনিক।",
      lessons: [
        "লেসন ১: সিনেমাটিক কাটস এবং পেসিং সাইকোলজি",
        "লেসন ২: ট্রেন্ডিং ট্রানজিশন ও এফেক্টস ব্যবহার",
      ],
    },
    {
      moduleNo: "DAY 8",
      title: "Color Correction Basics & Audio Editing",
      desc: "কালার স্পেস, স্কিন টোন ব্যালেন্সিং ও ব্যাকগ্রাউন্ড সাউন্ড ডিজাইন।",
      lessons: [
        "লেসন ১: Lumetri Color বেসিক ও স্কিন টোন কারেকশন",
        "লেসন ২: ভয়েস ওভার মাস্টারিং ও সাউন্ড এফেক্টস (SFX) লেয়ারিং",
      ],
    },
    {
      moduleNo: "DAY 10",
      title: "Reels & Short Form Content Creation",
      desc: "৩ সেকেন্ড রিটেনশন হুক, ভাইরাল টেক্সট এনিমেশন ও সোশ্যাল মিডিয়া রিলস এডিটিং।",
      lessons: [
        "লেসন ১: ফেসবুক ও ইনস্টাগ্রাম রিলসের জন্য ৯:১৬ ফরম্যাটিং",
        "লেসন ২: কাইনেটিক ক্যাপশন ও ট্রেন্ডিং সাউন্ড সিঙ্ক",
      ],
    },
    {
      moduleNo: "DAY 15",
      title: "Complete Project Editing & Client Ready Process",
      desc: "পূর্ণাঙ্গ প্রজেক্ট তৈরি এবং মার্কেটপ্লেস বা ক্লায়েন্ট ডিল করার নিয়ম।",
      lessons: [
        "লেসন ১: সম্পূর্ণ ভিডিও এডিটিং মাস্টার প্রজেক্ট এক্সিকিউশন",
        "লেসন ২: ক্লায়েন্টদের কাছে পোর্টফোলিও উপস্থাপন ও আউটরিচ",
      ],
    },
  ];

  const batchRegularModules = [
    {
      moduleNo: "Module 01",
      title: "Premiere Pro Fundamentals & Fast Workflow",
      desc: "ইন্টারফেস কাস্টমাইজেশন, টাইমলাইন সিক্রেট, প্রো লেভেল শর্টকাট ও অর্গানাইজড ফাইল ম্যানেজমেন্ট।",
      lessons: [
        "লেসন ১: প্রোডাকশন রেডি টাইমলাইন ও প্রোজেক্ট সেটআপ",
        "লেসন ২: রাফ কাট ও প্রিসিশন ট্রিম টেকনিক",
        "লেসন ৩: ইনজেস্ট সেটিংস ও ক্যাশ অপটিমাইজেশন",
      ],
    },
    {
      moduleNo: "Module 02",
      title: "The Art of Storytelling & Pacing",
      desc: "দর্শকদের স্ক্রিনে আটকে রাখার সাইকোলজি, রিলস ও শর্টস হুক এবং রিটেনশন টেকনিক।",
      lessons: [
        "লেসন ১: ৩ সেকেন্ড হুক ও জাম্প কাটের সঠিক ব্যবহার",
        "লেসন ২: ম্যাচ কাট, ইনভিজিবল কাট ও রিদম ব্যালেন্স",
        "লেসন ৩: ডকুমেন্টারি বনাম সোশ্যাল মিডিয়া স্টোরিটেলিং",
      ],
    },
    {
      moduleNo: "Module 03",
      title: "Advanced Sound Design & Foley",
      desc: "ভিডিওর প্রাণ হলো সাউন্ড। অডিও ব্যালেন্সিং, সাউন্ড ইফেক্ট লেয়ারিং ও অডিও এনহ্যান্সমেন্ট।",
      lessons: [
        "লেসন ১: সাউন্ড ইফেক্টস (SFX) ও রাইজার সিঙ্কিং",
        "লেসন ২: ভয়েস ওভার মাস্টারিং ও ব্যাকগ্রাউন্ড নয়েজ রিমুভাল",
        "লেসন ৩: ভিডিওর মুড অনুযায়ী ব্যাকগ্রাউন্ড মিউজিক লেয়ারিং",
      ],
    },
    {
      moduleNo: "Module 04",
      title: "Cinematic Color Grading",
      desc: "কালার স্পেস, স্কিন টোন কারেকশন ও সিনেমাটিক লুক তৈরির ইন ডেপথ গাইডলাইন।",
      lessons: [
        "লেসন ১: Lumetri Color স্কোপস ও প্রাইমারি কারেকশন",
        "লেসন ২: প্রফেশনাল স্কিন টোন প্রোটেকশন",
        "লেসন ৩: কাস্টম সিনেমাটিক LUTs ও মুড ক্রিয়েশন",
      ],
    },
    {
      moduleNo: "Module 05",
      title: "Motion Graphics in After Effects",
      desc: "আকর্ষণীয় টেক্সট অ্যানিমেশন, লোয়ার থার্ড, মোশন ট্র্যাকিং ও ডায়নামিক ট্রানজিশন।",
      lessons: [
        "লেসন ১: কাইনেটিক টাইপোগ্রাফি ও হুক টাইটেলস",
        "লেসন ২: ট্র্যাকিং, মাস্কিং ও মোশন ব্লার টেকনিক",
        "লেসন ৩: মডার্ন পেপার টিয়ার ও ডকুমেন্টারি স্টাইল অ্যানিমেশন",
      ],
    },
    {
      moduleNo: "Module 06",
      title: "Client Acquisition & Portfolio Building",
      desc: "স্কিল শেখার পর আসল ক্লায়েন্ট পাওয়া এবং ডিল ক্লোজ করার কার্যকর স্ট্র্যাটেজি।",
      lessons: [
        "লেসন ১: হাই কনভার্টিং ভিডিও এডিটিং পোর্টফোলিও তৈরি",
        "লেসন ২: আন্তর্জাতিক ও লোকাল ক্লায়েন্টদের আউটরিচ করার ফ্রেমওয়ার্ক",
        "লেসন ৩: ডিসকর্ড সাপোর্ট সিস্টেম ও লং টার্ম ক্যারিয়ার রোডম্যাপ",
      ],
    },
  ];

  const storageSuffix = isBatch1 ? "b1_v2" : "regular";

  const { items: modules, addItem: addModule, removeItem: removeModule, updateItem: updateModule, isAdmin } = useDynamicCmsList(
    `course.${courseSlug}.curriculum.modules.${storageSuffix}`,
    isBatch1 ? batch1Modules : batchRegularModules
  );

  const handleAddNewModule = () => {
    const nextNo = String((modules?.length || 0) + 1).padStart(2, "0");
    addModule({
      moduleNo: isBatch1 ? `DAY ${nextNo}` : `Module ${nextNo}`,
      title: "নতুন মডিউলের নাম এখানে লিখুন",
      desc: "মডিউলটির বিবরণ লিখুন।",
      lessons: ["লেসন ১: প্রথম লেসনের শিরোনাম লিখুন"],
    });
    setOpenIndex(modules?.length || 0);
  };

  const handleAddLesson = (moduleIndex: number) => {
    if (!modules) return;
    const targetModule = modules[moduleIndex];
    const newLessonNo = (targetModule.lessons?.length || 0) + 1;
    const updatedLessons = [...(targetModule.lessons || []), `লেসন ${newLessonNo}: নতুন লেসনের টপিক লিখুন`];
    updateModule(moduleIndex, { ...targetModule, lessons: updatedLessons });
  };

  const handleRemoveLesson = (moduleIndex: number, lessonIndex: number) => {
    if (!modules) return;
    const targetModule = modules[moduleIndex];
    const updatedLessons = (targetModule.lessons || []).filter((_, i) => i !== lessonIndex);
    updateModule(moduleIndex, { ...targetModule, lessons: updatedLessons });
  };

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300 font-bangla w-full overflow-hidden">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center px-1 sm:px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-medium tracking-wide mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <EditableText id={`course.${courseSlug}.curriculum.badge`}>
            {isBatch1 ? "১৫ দিনের ফ্রি রোডম্যাপ" : "প্র্যাকটিক্যাল কারিকুলাম"}
          </EditableText>
        </div>

        <h2 className="font-bangla font-extrabold tracking-tight text-foreground text-xl sm:text-2xl lg:text-3xl leading-[1.3] break-words">
          <EditableText id={`course.${courseSlug}.curriculum.heading`}>
            {isBatch1 ? "১৫ দিনের কমপ্লিট ভিডিও এডিটিং বুটক্যাম্প কারিকুলাম" : "স্টেপ বাই স্টেপ মাস্টারক্লাস রোডম্যাপ"}
          </EditableText>
        </h2>

        <p className="font-bangla text-muted-foreground text-sm sm:text-base leading-relaxed mt-2.5 max-w-xl">
          <EditableText id={`course.${courseSlug}.curriculum.subheading`}>
            {isBatch1
              ? "বেসিক থেকে শুরু করে প্রোজেক্ট ডেলিভারি পর্যন্ত প্রতিটি দিন সুনির্দিষ্ট প্র্যাকটিক্যাল লার্নিং।"
              : "বেসিক থেকে অ্যাডভান্সড সিনেমাটিক এডিটিং ও মোশন গ্রাফিক্স। প্রতিটি মডিউল বাস্তব প্রজেক্ট দিয়ে সাজানো।"}
          </EditableText>
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {modules?.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`glass rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? "border-primary/40 shadow-sm" : "border-border/60 hover:border-primary/20"
              }`}
            >
              <div className="w-full p-4.5 sm:p-6 flex items-start sm:items-center justify-between gap-4 transition-colors select-none">
                <div 
                  onClick={() => setOpenIndex(isOpen ? null : idx)} 
                  className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1 cursor-pointer"
                >
                  <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 transition-colors ${
                    isOpen ? "bg-primary text-primary-foreground" : "bg-foreground/5 text-foreground/70"
                  }`}>
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-primary block mb-0.5">
                      <EditableText id={`course.${courseSlug}.module.${idx + 1}.no`}>{item.moduleNo}</EditableText>
                    </span>
                    <h3 className="font-sans font-bold text-sm sm:text-base text-foreground truncate">
                      <EditableText id={`course.${courseSlug}.module.${idx + 1}.title`}>{item.title}</EditableText>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => removeModule(idx)}
                      className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all cursor-pointer"
                      title="মডিউল ডিলিট করুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div 
                    onClick={() => setOpenIndex(isOpen ? null : idx)} 
                    className={`p-1.5 rounded-lg glass text-muted-foreground shrink-0 transition-transform duration-300 cursor-pointer ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="px-4.5 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-border/30 animate-in fade-in duration-200">
                  <p className="font-bangla text-xs sm:text-sm text-muted-foreground mb-3.5 leading-relaxed">
                    <EditableText id={`course.${courseSlug}.module.${idx + 1}.desc`}>{item.desc}</EditableText>
                  </p>
                  
                  <div className="bg-background/60 rounded-xl p-3 sm:p-3.5 border border-border/40 space-y-2">
                    {item.lessons?.map((lesson, lIdx) => (
                      <div key={lIdx} className="flex items-center justify-between gap-2.5 font-bangla text-xs sm:text-sm text-foreground/85 group">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="break-words">
                            <EditableText id={`course.${courseSlug}.module.${idx + 1}.lesson.${lIdx + 1}`}>{lesson}</EditableText>
                          </span>
                        </div>
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => handleRemoveLesson(idx, lIdx)}
                            className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors cursor-pointer"
                            title="লেসন মুছুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => handleAddLesson(idx)}
                      className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ এই মডিউলে নতুন লেসন যোগ করুন (Add Lesson)</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isAdmin && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleAddNewModule}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md hover:brightness-110 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ নতুন মডিউল যোগ করুন (Add Module)</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ================= ট্যাব ৩: কী কী পাচ্ছেন =================
function TabWhatsIncluded({ courseSlug, isBatch1 }: { courseSlug: string; isBatch1: boolean }) {
  const batch1Features = [
    { id: "b1_f1", titleKey: "লাইভ ইন্টারঅ্যাক্টিভ ক্লাস", descKey: "সরাসরি স্ক্রিন শেয়ারে প্র্যাকটিক্যাল কাজ শেখা ও লাইভ প্রশ্নোত্তর।" },
    { id: "b1_f2", titleKey: "১০০% সম্পূর্ণ ফ্রি কোর্স", descKey: "কোনো ধরনের ফি বা লুকানো চার্জ ছাড়া শেখার সুযোগ।" },
    { id: "b1_f3", titleKey: "সোশ্যাল মিডিয়া রিলস এডিটিং", descKey: "৩ সেকেন্ড হুক ও ট্রেন্ডিং ভিডিও বানানোর কৌশল।" },
    { id: "b1_f4", titleKey: "সাউন্ড ও কালার বেসিক্স", descKey: "অডিও ক্লিয়ার করা, ব্যাকগ্রাউন্ড মিউজিক ও বেসিক কালার কারেকশন।" },
    { id: "b1_f5", titleKey: "ফুল প্রজেক্ট এডিটিং এক্সপেরিয়েন্স", descKey: "শুরু থেকে শেষ পর্যন্ত একটি পূর্ণাঙ্গ ভিডিও এডিটের অভিজ্ঞতা।" },
    { id: "b1_f6", titleKey: "সরাসরি হোয়াটসঅ্যাপ গাইডেন্স", descKey: "যেকোনো প্রশ্নের জন্য ০১৮৯০৩৫২১৮৮ নম্বরে সাপোর্ট সুবিধা।" },
  ];

  const batchRegularFeatures = [
    { id: "feat_1", titleKey: "লাইভ ইন্টারেক্টিভ ক্লাস", descKey: "সরাসরি স্ক্রিন শেয়ারে প্র্যাকটিক্যাল কাজ শেখা ও লাইভ প্রশ্নোত্তর পর্ব।" },
    { id: "feat_2", titleKey: "লাইফটাইম ক্লাউড রেকর্ডিং ব্যাকআপ", descKey: "ক্লাস শেষ হতেই ওয়েবসাইট ড্যাশবোর্ডে ফুল এইচডি ক্লাউড রেকর্ডিং যুক্ত হবে।" },
    { id: "feat_3", titleKey: "ডেডিকেটেড ডিসকর্ড প্রাইভেট কমিউনিটি", descKey: "২৪/৭ প্রাইভেট চ্যানেল, অ্যাসাইনমেন্ট ফিডব্যাক ও সহপাঠীদের সাথে সরাসরি নেটওয়ার্কিং।" },
    { id: "feat_4", titleKey: "১০০+ প্রিমিয়াম সাউন্ড ও সিনেমাটিক অ্যাসেটস", descKey: "প্র্যাকটিসের জন্য প্রজেক্ট ফাইল, সাউন্ড প্যাক, সিনেমাটিক LUTs ও মোশন প্রিসেট।" },
    { id: "feat_5", titleKey: "সাপ্তাহিক পার্সোনালাইজড ফিডব্যাক", descKey: "আপনার প্রতিটি এডিটের ভুলত্রুটি ধরিয়ে দিয়ে মেন্টর সরাসরি স্ক্রিনে পার্সোনাল ফিডব্যাক দেবেন।" },
    { id: "feat_6", titleKey: "কমপ্লিশন ভেরিফায়েড সার্টিফিকেট", descKey: "ব্যাচের সব প্রজেক্ট সফলভাবে জমা দেওয়ার পর দেওয়া হবে ভেরিফায়েড ডিজিটাল সার্টিফিকেট।" },
  ];

  const storageSuffix = isBatch1 ? "b1_v2" : "regular";

  const { items: features, addItem: addFeature, removeItem: removeFeature, isAdmin } = useDynamicCmsList(
    `course.${courseSlug}.included.features.${storageSuffix}`,
    isBatch1 ? batch1Features : batchRegularFeatures
  );

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300 font-bangla w-full overflow-hidden">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center px-1 sm:px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-medium tracking-wide mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <EditableText id={`course.${courseSlug}.included.badge`}>
            সবকিছু এক প্ল্যাটফর্মে
          </EditableText>
        </div>

        <h2 className="font-bangla font-extrabold tracking-tight text-foreground text-xl sm:text-2xl lg:text-3xl leading-[1.3] break-words">
          <EditableText id={`course.${courseSlug}.included.heading`}>
            {isBatch1 ? "১৫ দিনের ফ্রি বুটক্যাম্পে যা যা পাচ্ছেন" : "ব্যাচ ৩ এ আপনি যা যা পাচ্ছেন"}
          </EditableText>
        </h2>

        <p className="font-bangla text-muted-foreground text-sm sm:text-base leading-relaxed mt-2.5 max-w-xl">
          <EditableText id={`course.${courseSlug}.included.subheading`}>
            ভিডিও এডিটিংয়ের ভিত্তি মজবুত করার সম্পূর্ণ প্র্যাকটিক্যাল আয়োজন।
          </EditableText>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {features?.map((feat, fIdx) => (
          <div
            key={feat.id || fIdx}
            className="glass p-5 sm:p-6 rounded-2xl border border-border/60 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group shadow-xs relative"
          >
            {isAdmin && (
              <button
                type="button"
                onClick={() => removeFeature(fIdx)}
                className="absolute top-3 right-3 p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                title="ফিচার ডিলিট করুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <div>
              <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 mb-4 group-hover:border-primary/40 group-hover:text-primary transition-colors">
                <Gift className="w-5 h-5" />
              </div>

              <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug pr-6">
                <EditableText id={`course.${courseSlug}.feature.${feat.id}.title`}>{feat.titleKey}</EditableText>
              </h3>

              <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2">
                <EditableText id={`course.${courseSlug}.feature.${feat.id}.desc`}>{feat.descKey}</EditableText>
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span><EditableText id={`course.${courseSlug}.feature.${feat.id}.tag`}>ইনক্লুডেড অ্যাক্সেস</EditableText></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ================= ট্যাব ৪: যেভাবে শুরু করবেন =================
function TabHowItWorks({ courseSlug, isBatch1 }: { courseSlug: string; isBatch1: boolean }) {
  const batch1Steps = [
    {
      step: "01",
      badgeTitle: "গুগল ফর্মে রেজিস্ট্রেশন",
      title: "বিনামূল্যে তথ্য সাবমিট করুন",
      desc: "নির্ধারিত ফর্ম লিংকে ক্লিক করে আপনার নাম ও সচল হোয়াটসঅ্যাপ নম্বর দিয়ে রেজিস্ট্রেশন সম্পন্ন করুন।",
    },
    {
      step: "02",
      badgeTitle: "হোয়াটসঅ্যাপ গ্রুপ অ্যাক্সেস",
      title: "কমিউনিটিতে যুক্ত হোন",
      desc: "রেজিস্ট্রেশনের পর আপনাকে সরাসরি ব্যাচ ১-এর অফিশিয়াল স্টুডেন্ট হোয়াটসঅ্যাপ গ্রুপে অ্যাড করে নেওয়া হবে।",
    },
    {
      step: "03",
      badgeTitle: "১ জুলাই ২০২৬ থেকে ক্লাস",
      title: "লাইভ বুটক্যাম্পে অংশ নিন",
      desc: "নির্ধারিত তারিখ থেকে সরাসরি স্ক্রিন শেয়ারে লাইভ ক্লাস শুরু হবে। প্রতিদিন স্টেপ বাই স্টেপ কাজ শিখুন।",
    },
  ];

  const batchRegularSteps = [
    {
      step: "01",
      badgeTitle: "এনরোলমেন্ট রিকোয়েস্ট পাঠান",
      title: "তথ্য দিয়ে ফর্ম পূরণ করুন",
      desc: "ওয়েবসাইটের বাটনে ক্লিক করে আপনার নাম, সচল হোয়াটসঅ্যাপ নম্বর এবং পেমেন্ট ট্রানজেকশন আইডি দিয়ে ফর্মটি সাবমিট করুন।",
    },
    {
      step: "02",
      badgeTitle: "হোয়াটসঅ্যাপে কনফার্মেশন ও ভেরিফিকেশন",
      title: "টিমের সাথে ভেরিফিকেশন",
      desc: "ফর্ম সাবমিট করতেই হোয়াটসঅ্যাপে মেসেজ তৈরি হবে। আমাদের টিম পেমেন্ট ভেরিফাই করে দ্রুত আপনার সিট নিশ্চিত করবে।",
    },
    {
      step: "03",
      badgeTitle: "প্রাইভেট ডিসকর্ড ও ড্যাশবোর্ড অ্যাক্সেস",
      title: "ডিসকর্ড কমিউনিটিতে প্রবেশ",
      desc: "কনফার্মেশনের সাথে সাথেই পাবেন ব্যাচ ৩ এর প্রাইভেট ডিসকর্ড ইনভাইট লিংক। সেখানে নিয়মিত লাইভ ক্লাসে অংশ নিতে পারবেন।",
    },
  ];

  const storageSuffix = isBatch1 ? "b1_v2" : "regular";

  const { items: steps, addItem: addStep, removeItem: removeStep, isAdmin } = useDynamicCmsList(
    `course.${courseSlug}.howitworks.steps.${storageSuffix}`,
    isBatch1 ? batch1Steps : batchRegularSteps
  );

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300 font-bangla w-full overflow-hidden">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center px-1 sm:px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-medium tracking-wide mb-4">
          <Workflow className="w-3.5 h-3.5" />
          <EditableText id={`course.${courseSlug}.howitworks.badge`}>
            সহজ ৩টি ধাপ
          </EditableText>
        </div>

        <h2 className="font-bangla font-extrabold tracking-tight text-foreground text-xl sm:text-2xl lg:text-3xl leading-[1.3] break-words">
          <EditableText id={`course.${courseSlug}.howitworks.heading`}>
            {isBatch1 ? "কীভাবে ব্যাচ ১ এ যুক্ত হবেন ও ফ্রি ক্লাস করবেন?" : "কীভাবে ব্যাচ ৩ এ যুক্ত হবেন ও ক্লাস শুরু করবেন?"}
          </EditableText>
        </h2>

        <p className="font-bangla text-muted-foreground text-sm sm:text-base leading-relaxed mt-2.5 max-w-xl">
          <EditableText id={`course.${courseSlug}.howitworks.subheading`}>
            সহজ ও দ্রুত রেজিস্ট্রেশন প্রক্রিয়া। তথ্য পাঠানো মাত্রই শুরু হয়ে যাবে আপনার শেখার যাত্রা।
          </EditableText>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps?.map((item, index) => (
          <div
            key={index}
            className="glass p-6 sm:p-7 rounded-2xl border border-border/60 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group shadow-xs relative overflow-hidden"
          >
            {isAdmin && (
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="absolute top-3 right-3 p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors z-10 cursor-pointer"
                title="স্টেপ ডিলিট করুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <span className="absolute -top-3 right-3 font-mono font-black text-6xl text-foreground/[0.04] select-none pointer-events-none group-hover:text-primary/10 transition-colors">
              {item.step}
            </span>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/50 flex items-center justify-center text-foreground/80 group-hover:border-primary/40 group-hover:text-primary transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full glass border border-primary/20 bg-primary/5 text-primary font-mono text-xs font-bold">
                  Step {item.step}
                </span>
              </div>

              <span className="text-xs font-bangla font-semibold text-primary block mb-1">
                <EditableText id={`course.${courseSlug}.step.${index + 1}.badge`}>{item.badgeTitle}</EditableText>
              </span>

              <h3 className="font-bangla font-bold text-base sm:text-lg text-foreground leading-snug pr-6">
                <EditableText id={`course.${courseSlug}.step.${index + 1}.title`}>{item.title}</EditableText>
              </h3>

              <p className="font-bangla text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2">
                <EditableText id={`course.${courseSlug}.step.${index + 1}.desc`}>{item.desc}</EditableText>
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-border/40 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              <span><EditableText id={`course.${courseSlug}.step.${index + 1}.action`}>পরবর্তী ধাপে চলুন</EditableText></span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ================= ট্যাব ৫: সাধারণ প্রশ্ন (FAQ) =================
function TabFaq({ courseSlug, isBatch1 }: { courseSlug: string; isBatch1: boolean }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const batch1Faqs = [
    {
      id: "b1_faq_1",
      q: "আমি একদম বিগিনার, আগে কোনো কাজ করিনি। আমি কি জয়েন করতে পারব?",
      a: "হ্যাঁ, সম্পূর্ণ বিগিনার হলেও আপনি এই ফ্রি কোর্সে জয়েন করতে পারবেন। একদম শুরু থেকে ধাপে ধাপে সবকিছু দেখানো হবে।",
    },
    {
      id: "b1_faq_2",
      q: "ক্লাসগুলো কীভাবে হবে এবং সময়সূচি কী?",
      a: "ক্লাসগুলো সরাসরি ডিসকর্ড প্রাইভেট চ্যানেলের পাশাপাশি গুগল মিট (Google Meet) ও জুম (Zoom)-এ স্ক্রিন শেয়ারের মাধ্যমে অনুষ্ঠিত হবে। প্রতি সপ্তাহে নির্ধারিত লাইভ সেশন থাকবে।",
    },
    {
      id: "b1_faq_3",
      q: "কোর্সের ফি কত এবং কীভাবে রেজিস্ট্রেশন করব?",
      a: "কোর্সটি COMPLETELY FREE (সম্পূর্ণ ফ্রি)। উপরে দেওয়া গুগল ফরম লিংকে ক্লিক করে আপনার তথ্য সাবমিট করলেই হবে।",
    },
    {
      id: "b1_faq_4",
      q: "কোর্স সম্পর্কিত কোনো তথ্য জানার থাকলে কীভাবে যোগাযোগ করব?",
      a: "যেকোনো বিস্তারিত তথ্যের জন্য সরাসরি আমাদের অফিসিয়াল হোয়াটসঅ্যাপ নম্বর 01890352188 এ এসএমএস করতে পারেন।",
    },
  ];

  const batchRegularFaqs = [
    {
      id: "faq_1",
      q: "আমি একদম নতুন, আগে কখনো এডিটিং করিনি। আমি কি এই ব্যাচটি করতে পারব?",
      a: "হ্যাঁ, মাস্টারক্লাসটি একদম বেসিক প্রিমিয়ার প্রো থেকে শুরু করে অ্যাডভান্সড সিনেমাটিক স্টোরিটেলিং পর্যন্ত ধাপে ধাপে শেখানো হবে। আপনার শুধু শেখার আগ্রহ প্রয়োজন।",
    },
    {
      id: "faq_2",
      q: "ক্লাসগুলো কীভাবে হবে এবং সময়সূচি কী?",
      a: "ক্লাসগুলো সরাসরি ডিসকর্ড প্রাইভেট চ্যানেলের পাশাপাশি গুগল মিট (Google Meet) ও জুম (Zoom)-এ স্ক্রিন শেয়ারের মাধ্যমে অনুষ্ঠিত হবে। প্রতি সপ্তাহে নির্ধারিত লাইভ সেশন এবং লাইভ প্রশ্নোত্তরের সুযোগ থাকবে।",
    },
    {
      id: "faq_3",
      q: "কোনো কারণে লাইভ ক্লাস মিস করলে কি রেকর্ডিং পাওয়া যাবে?",
      a: "অবশ্যই! প্রতিটি লাইভ ক্লাসের পরপরই ওয়েবসাইট ড্যাশবোর্ডে ফুল এইচডি ক্লাউড রেকর্ডিং ব্যাকআপ দিয়ে দেওয়া হবে, যা আপনি আজীবন দেখতে পারবেন।",
    },
    {
      id: "faq_4",
      q: "এডিটিং শেখার জন্য আমার পিসি বা ল্যাপটপের কনফিগারেশন কেমন হতে হবে?",
      a: "মিনিমাম Core i5 বা Ryzen 5 প্রসেসর, 8GB RAM (16GB হলে ভালো হয়) এবং একটি ডেডিকেটেড গ্রাফিক্স কার্ড থাকলে ভালোমতো প্র্যাকটিস করতে পারবেন।",
    },
    {
      id: "faq_5",
      q: "প্র্যাকটিসের সময় কোনো সমস্যায় পড়লে সাপোর্ট কীভাবে পাব?",
      a: "ডিসকর্ড সার্ভারে আমাদের ২৪/৭ সাপোর্ট চ্যানেল থাকবে। সেখানে আপনি সমস্যা লিখে জানাতে পারবেন অথবা সরাসরি স্ক্রিন শেয়ার করে মেন্টরের কাছ থেকে সমাধান নিতে পারবেন।",
    },
  ];

  const storageSuffix = isBatch1 ? "b1_v2" : "regular";

  const { items: faqs, addItem: addFaq, removeItem: removeFaq, isAdmin } = useDynamicCmsList(
    `course.${courseSlug}.faq.items.${storageSuffix}`,
    isBatch1 ? batch1Faqs : batchRegularFaqs
  );

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300 font-bangla w-full overflow-hidden">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center px-1 sm:px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-medium tracking-wide mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <EditableText id={`course.${courseSlug}.faq.badge`}>
            সাধারণ প্রশ্নোত্তর
          </EditableText>
        </div>

        <h2 className="font-bangla font-extrabold tracking-tight text-foreground text-xl sm:text-2xl lg:text-3xl leading-[1.3] break-words">
          <EditableText id={`course.${courseSlug}.faq.heading`}>
            আপনার মনে কি কোনো প্রশ্ন আছে?
          </EditableText>
        </h2>

        <p className="font-bangla text-muted-foreground text-sm sm:text-base leading-relaxed mt-2.5 max-w-xl">
          <EditableText id={`course.${courseSlug}.faq.subheading`}>
            কোর্সে যুক্ত হওয়ার আগে প্রয়োজনীয় বিষয়গুলোর সুস্পষ্ট উত্তর।
          </EditableText>
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3.5">
        {faqs?.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <div
              key={faq.id || i}
              className={`glass rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? "border-primary/40 shadow-xs" : "border-border/60 hover:border-primary/20"
              }`}
            >
              <div className="w-full p-4.5 sm:p-5 flex items-start justify-between gap-4 select-none">
                <div 
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex-1 cursor-pointer"
                >
                  <span className="font-bangla font-bold text-sm sm:text-base text-foreground leading-snug">
                    <EditableText id={`course.${courseSlug}.faq.item.${faq.id}.q`}>{faq.q}</EditableText>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => removeFaq(i)}
                      className="p-1 text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                      title="FAQ মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className={`p-1.5 rounded-lg glass text-muted-foreground shrink-0 transition-transform duration-300 cursor-pointer ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="px-4.5 pb-5 sm:px-5 sm:pb-5 pt-1 border-t border-border/30 animate-in fade-in duration-200">
                  <p className="font-bangla text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    <EditableText id={`course.${courseSlug}.faq.item.${faq.id}.a`}>{faq.a}</EditableText>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CourseDetail() {
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const course = COURSES.find((c) => c.slug === slug)!;
  const [enrolled, setEnrolled] = useState(false);

  // URL-এ ?enroll=true থাকলে অটো মডাল ওপেন হবে
  const [showModal, setShowModal] = useState<boolean>(
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("enroll") === "true" || !!search?.enroll
      : !!search?.enroll
  );
  const [showClosedModal, setShowClosedModal] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "included" | "how" | "faq">("overview");

  // ব্যাচ ১ এর স্লাগ নিখুঁতভাবে চেক 
  const cleanSlug = (slug || "").toLowerCase();
  const cleanTitle = (course?.title || "").toLowerCase();
  
  // স্লাগ বা টাইটেলের কোথাও '1', 'one', 'free', বা 'rising' থাকলেই কোড ১০০% নিশ্চিত হবে যে এটাই ব্যাচ ১
  const isBatch1 = cleanSlug.includes("1") || cleanSlug.includes("one") || cleanSlug.includes("free") || cleanSlug.includes("rising") || cleanTitle.includes("1") || cleanTitle.includes("free");
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

  return (
    <div className="[&>div>footer]:!hidden [&>footer]:!hidden [&_img]:select-none [&_img]:pointer-events-auto [&_img]:[user-drag:none] [&_img]:[-webkit-user-drag:none]">
      <SiteShell>
        {showModal && (
          <EnrollmentModal
            courseSlug={slug}
            onClose={() => setShowModal(false)}
          />
        )}

        {showClosedModal && (
          <BatchClosedModal onClose={() => setShowClosedModal(false)} />
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
                পুরো কোর্সের এক্সেস পেতে এবং এই লেসনটি দেখতে আপনাকে ব্যাচ ৩ এ এনরোল করতে হবে।
              </p>
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => {
                    setShowLockedModal(false);
                    setShowModal(true);
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
              className="mb-6 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-opacity hover:opacity-60 text-muted-foreground"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>All courses</span>
            </Link>

            {/* Hero fold */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 sm:mb-20">
              <div className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-6 font-bangla min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-border/80 bg-foreground/[0.04] w-fit shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-[1px] bg-primary shrink-0"></span>
                  <span className="text-xs sm:text-[13px] font-medium tracking-normal text-foreground/90 font-sans truncate">
                    <EditableText id={`course.${course.slug}.hero.badge`}>
                      {isBatch1 ? "ONLINE RISING EDITORS BATCH 1 • 15 Days Free Bootcamp" : "Batch 03 • Live Masterclass + Private Discord Community"}
                    </EditableText>
                  </span>
                </div>

                {/* Course Banner Card */}
                <div className="glass-strong rounded-3xl border border-border/70 shadow-lg relative overflow-hidden backdrop-blur-md select-none">
                  {/* Mobile Edge-to-Edge Banner */}
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
                        <>
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors pointer-events-auto">
                            <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 fill-white ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute top-3 left-3 pointer-events-auto">
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/75 text-white backdrop-blur-md border border-white/10 font-sans">
                              <Play className="w-3 h-3 fill-white inline mr-1" />
                              <span>Watch Preview</span>
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Headline & Meta tags */}
                  <div className="p-5 sm:p-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold uppercase text-primary tracking-wider">
                      <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20">
                        {isBatch1 ? "15 Days Free Course" : "Masterclass"}
                      </span>
                      <span>•</span>
                      <span className="text-muted-foreground">Beginner to Pro</span>
                    </div>
                    <h1 className="font-bangla font-extrabold tracking-tight text-foreground leading-[1.25] text-2xl sm:text-3xl lg:text-4xl text-left break-words">
                      <EditableText id={`course.${course.slug}.hero.title`}>
                        {isBatch1 ? "ভিডিও এডিটিং শিখতে চান, কিন্তু কোথা থেকে শুরু করবেন বুঝতে পারছেন না?" : course.title}
                      </EditableText>
                    </h1>

                    {/* Description */}
                    <div className="space-y-3.5 text-sm sm:text-base text-foreground/80 leading-[1.7] font-bangla border-t border-border/40 pt-4">
                      {isBatch1 ? (
                        <>
                          <p className="font-normal text-foreground/80">
                            <EditableText id={`course.${course.slug}.hero.b1.desc.1`}>
                              বর্তমানে Content Creator, Business Owner এবং Freelancer—সবারই Video Editor প্রয়োজন। কিন্তু বেশিরভাগ মানুষ সঠিক Roadmap না পেয়ে শিখতে পারে না।
                            </EditableText>
                          </p>
                          <p className="font-normal text-foreground/80">
                            <EditableText id={`course.${course.slug}.hero.b1.desc.2`}>
                              এই সমস্যার সমাধান হিসেবে আমরা আয়োজন করেছি ১৫ দিনের Free Video Editing Course, যেখানে প্রতিদিন Step-by-Step প্র্যাকটিক্যালভাবে শেখানো হবে।
                            </EditableText>
                          </p>
                          <p className="font-normal text-foreground/90 font-medium">
                            <EditableText id={`course.${course.slug}.hero.b1.desc.3`}>
                              কোনো Paid Course কেনার আগে এই Free Course থেকেই আপনি আপনার এডিটিং জার্নি শুরু করতে পারেন।
                            </EditableText>
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-normal text-foreground/80">
                            <EditableText id={`course.${course.slug}.hero.desc.1`}>
                              ইউটিউবে শত শত টিউটোরিয়াল দেখেও আসল এডিটিং ফ্লো মিলছে না? শুধু সফটওয়্যারের বাটন চেনা কোনো স্থায়ী স্কিল নয়।
                            </EditableText>
                          </p>
                          <p className="font-normal text-foreground/80">
                            <EditableText id={`course.${course.slug}.hero.desc.2`}>
                              এই মাস্টারক্লাসে আপনি শিখবেন আন্তর্জাতিক মানের সিনেমাটিক স্টোরিটেলিং, ৩ সেকেন্ড রিটেনশন হুক এবং সাউন্ড ডিজাইনের আসল সিক্রেট।
                            </EditableText>
                          </p>
                          <p className="font-normal text-foreground/80">
                            <EditableText id={`course.${course.slug}.hero.desc.3`}>
                              একদম স্ক্র্যাচ থেকে শুরু করে রিয়েল লাইফ ক্লায়েন্ট প্রজেক্টের মাধ্যমে নিজের হাই পেয়িং পোর্টফোলিও তৈরি করুন আমাদের সাথে।
                            </EditableText>
                          </p>
                        </>
                      )}
                    </div>

                    {/* Mobile Quick Action Bar */}
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
                      {isBatch1 ? (
  <button
    onClick={() => setShowClosedModal(true)}
    className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
  >
    <span>Enroll Now</span>
    <ArrowRight className="w-3.5 h-3.5" />
  </button>
) : enrolled ? (
                        <Link
                          to={`/courses/${slug}/lessons/intro`}
                          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                        >
                          <span>Start Learning</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => setShowModal(true)}
                          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                        >
                          <span>Enroll Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4 Core Benefit Cards */}
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
                        {isBatch1 ? "পূর্বে কোনো অভিজ্ঞতা না থাকলেও সহজে শুরু করতে পারবেন।" : "পোর্টফোলিও তৈরি এবং সরাসরি হাই টিকেটিং ক্লায়েন্ট হান্টিং গাইড।"}
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
                        {isBatch1 ? "সম্পূর্ণ বিনামূল্যে প্র্যাকটিস ফাইল ও গাইডলাইন অ্যাক্সেস।" : "প্রিমিয়াম সাউন্ড এফেক্টস (SFX), কালার LUTs এবং রেডি মোশন প্রিসেট ফাইল।"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Sticky Card */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="glass-strong rounded-3xl p-6 sm:p-7 border border-border/60 shadow-xl overflow-hidden backdrop-blur-md">
                  <div
                    onContextMenu={(e) => e.preventDefault()}
                    className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/40 group mb-5"
                  >
                    <EditableImage
                      id={`course.thumb.${course.slug}`}
                      defaultSrc={course.thumb?.startsWith("http") ? course.thumb : ""}
                      alt={course.title}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {previewVideoId && (
                      <div 
                        onClick={() => setActiveVideo(previewVideoId)}
                        className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/25 transition-colors cursor-pointer pointer-events-auto z-10"
                      >
                        <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 pointer-events-auto z-20">
                      <span className="px-2.5 py-1 rounded-[4px] text-xs font-medium bg-black/70 text-white backdrop-blur-md border border-white/10 font-sans">
                        <EditableText id={`course.${course.slug}.preview.badge`}>
                          Curriculum Preview
                        </EditableText>
                      </span>
                    </div>
                  </div>

                  {/* Price & Offer Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 pb-1 relative z-20">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono cursor-text">
                        <EditableText id={`course.${course.slug}.sidebar.price`}>
                          {isBatch1 ? "FREE" : (course.price || "৳৩,০০০")}
                        </EditableText>
                      </span>
                      {!isBatch1 && (
                        <span className="text-base sm:text-lg text-muted-foreground/60 line-through decoration-rose-500/80 decoration-[1.5px] font-mono font-medium cursor-text">
                          <EditableText id={`course.${course.slug}.sidebar.original_price`}>
                            ৳৫,০০০
                          </EditableText>
                        </span>
                      )}
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-sans tracking-wide cursor-text">
                      <EditableText id={`course.${course.slug}.sidebar.offer_badge`}>
                        {isBatch1 ? "100% FREE BOOTCAMP" : "40% OFF (Limited Time)"}
                      </EditableText>
                    </span>
                  </div>

                  {/* 24-hr Countdown */}
                  {!isBatch1 && (
                    <div className="mb-5 p-3 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent flex items-center justify-between relative z-20">
                      <div className="flex items-center gap-2 font-sans font-medium text-xs text-amber-600 dark:text-amber-400 cursor-text">
                        <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                        <EditableText id={`course.${course.slug}.sidebar.countdown_label`}>
                          অফার শেষ হতে বাকি:
                        </EditableText>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                        <span className="px-2 py-0.5 rounded-lg bg-background/90 text-foreground border border-amber-500/20">
                          {formatDigit(timer.hours)}h
                        </span>
                        <span className="text-amber-500">:</span>
                        <span className="px-2 py-0.5 rounded-lg bg-background/90 text-foreground border border-amber-500/20">
                          {formatDigit(timer.minutes)}m
                        </span>
                        <span className="text-amber-500">:</span>
                        <span className="px-2 py-0.5 rounded-lg bg-background/90 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          {formatDigit(timer.seconds)}s
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3.5 mb-6 border-y border-border/40 py-4 font-sans text-sm relative z-20">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-foreground/70 font-medium">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                          <CalendarDays className="h-3.5 w-3.5" />
                        </div>
                        <span>Batch Starts</span>
                      </div>
                      <span className="font-semibold text-foreground/95 text-right cursor-text">
                        <EditableText id={`course.${course.slug}.sidebar.starts`}>
                          {isBatch1 ? "1 July 2026" : "October 15, 2026"}
                        </EditableText>
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-foreground/70 font-medium">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                          <Clock className="h-3.5 w-3.5" />
                        </div>
                        <span>Duration</span>
                      </div>
                      <span className="font-normal text-foreground/90 text-right cursor-text">
                        <EditableText id={`course.${course.slug}.sidebar.duration`}>
                          {isBatch1 ? "15 Days Bootcamp" : "30 Days Intensive"}
                        </EditableText>
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-foreground/70 font-medium">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <span>Mentor</span>
                      </div>
                      <span className="font-normal text-foreground/90 text-right cursor-text">
                        <EditableText id={`course.${course.slug}.sidebar.instructor`}>
                          {course.instructor || "Muhammad Ataullah"}
                        </EditableText>
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 text-foreground/70 font-medium">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                          <Send className="h-3.5 w-3.5" />
                        </div>
                        <span>Platform</span>
                      </div>
                      <span className="font-normal text-foreground/90 text-right cursor-text">
                        <EditableText id={`course.${course.slug}.sidebar.platform`}>
                          Live Sessions (Discord & Meet)
                        </EditableText>
                      </span>
                    </div>
                  </div>
                  {isBatch1 ? (
  <button
    onClick={() => setShowClosedModal(true)}
    className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
  >
    <span>Enroll Now</span>
    <ArrowRight className="w-4 h-4" />
  </button>
) : enrolled ? (
                    <Link
                      to={`/courses/${slug}/lessons/intro`}
                      className="gloss-btn w-full justify-center !py-3.5 text-base font-bold cursor-pointer"
                    >
                      Access Unlocked • Start Learning
                    </Link>
                  ) : (
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <EditableText id={`course.${course.slug}.cta.button`}>
                        Enroll in Batch 03 Now
                      </EditableText>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  <p className="mt-3 text-center text-xs text-muted-foreground font-sans">
                    {isBatch1 ? "বিস্তারিত জানতে হোয়াটসঅ্যাপ করুন: 01890352188" : "Instant WhatsApp seat confirmation flow"}
                  </p>
                </div>
              </div>
            </div>

            {/* Conditional Content: Batch 1 Completed Card VS Regular Tabs */}
            {isBatch1 ? (
              <div className="max-w-4xl mx-auto glass-strong rounded-3xl border border-emerald-500/30 p-8 sm:p-12 text-center shadow-2xl mb-16 relative overflow-hidden backdrop-blur-md font-bangla">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-foreground/[0.04] text-foreground/75 text-xs font-mono uppercase tracking-wider mb-5 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                  <span>
                    <EditableText id={`course.${course.slug}.closed.badge`}>
                      Batch Completed
                    </EditableText>
                  </span>
                </div>

                <h3 className="font-bangla font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight leading-snug relative z-20 cursor-text">
                  <EditableText id={`course.${course.slug}.closed.heading`}>
                    এই ব্যাচটির কার্যক্রম সফলভাবে সম্পন্ন হয়েছে!
                  </EditableText>
                </h3>

                <div className="font-bangla text-sm sm:text-base text-foreground/80 leading-relaxed mt-4 max-w-xl mx-auto relative z-20 cursor-text">
                  <EditableText id={`course.${course.slug}.closed.desc`}>
                    আমাদের 'রাইজিং এডিটরস (ব্যাচ ১)' এর সকল লাইভ ক্লাস এবং প্রজেক্ট সাবমিশন ইতোমধ্যে শেষ হয়েছে। অসংখ্য শিক্ষার্থীর সফল অংশগ্রহণের পর এই ব্যাচের এনরোলমেন্ট স্থায়ীভাবে বন্ধ করা হয়েছে। আপনি যদি বেসিক থেকে শুরু করে অ্যাডভান্সড সিনেমাটিক ভিডিও এডিটিং শিখতে চান, তবে আমাদের চলমান 'ব্যাচ ০৩' মাস্টারক্লাসে যুক্ত হতে পারেন।
                  </EditableText>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const b3Course = COURSES.find((c) => c.slug.includes("batch-3") || c.slug.includes("batch-03"));
                      const targetSlug = b3Course ? b3Course.slug : "video-editing-batch-3";
                      window.location.href = `/courses/${targetSlug}`;
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer font-sans"
                  >
                    <span>ব্যাচ ৩ এর বিস্তারিত দেখুন ও এনরোল করুন</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Sticky Tab Bar */}
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

                {/* Unified Content Master Card */}
                <div className="max-w-5xl mx-auto glass-strong rounded-3xl border border-border/80 p-6 sm:p-10 lg:p-12 shadow-xl mb-16 relative overflow-hidden backdrop-blur-md w-full">
                  {activeTab === "overview" && <TabOverview courseSlug={course.slug} isBatch1={isBatch1} />}
                  {activeTab === "curriculum" && <TabCurriculum courseSlug={course.slug} isBatch1={isBatch1} />}
                  {activeTab === "included" && <TabWhatsIncluded courseSlug={course.slug} isBatch1={isBatch1} />}
                  {activeTab === "how" && <TabHowItWorks courseSlug={course.slug} isBatch1={isBatch1} />}
                  {activeTab === "faq" && <TabFaq courseSlug={course.slug} isBatch1={isBatch1} />}
                </div>
              </>
            )}

            {/* Final Closing CTA Banner (Batch 03 Offer) */}
            <div className="relative max-w-5xl mx-auto font-bangla mb-16">
              <div className="glass-strong rounded-3xl border border-primary/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-foreground/[0.04] text-foreground/75 text-xs font-mono uppercase tracking-wider mb-5 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>
                    <EditableText id={`course.${course.slug}.footer.offer.badge`}>
                      Limited Time Offer • Batch 03
                    </EditableText>
                  </span>
                </div>
                <h3 className="font-bangla font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground leading-[1.28] tracking-tight relative z-20 cursor-text">
                  <EditableText id={`course.${course.slug}.final.cta.heading`}>
                    {isBatch1
                      ? "পরবর্তী লেভেলে যাওয়ার প্রস্তুতি নিন: Advanced Video Editing Masterclass"
                      : "দেরি না করে আজই আপনার সিনেমাটিক এডিটিং জার্নি শুরু করুন"}
                  </EditableText>
                </h3>

                <div className="font-bangla text-sm sm:text-base text-foreground/85 leading-relaxed mt-4 max-w-2xl mx-auto relative z-20 cursor-text">
                  <EditableText id={`course.${course.slug}.final.cta.desc`}>
                    ব্যাচ ৩ এ সীমিত আসনে বিশেষ ছাড় চলছে। রেগুলার ফি ৫,০০০ টাকার বদলে এখন মাত্র ৩,০০০ টাকা। সরাসরি প্র্যাকটিক্যাল সিনেমাটিক স্টোরিটেলিং ও ক্লায়েন্ট ডিল ক্লোজ করার সম্পূর্ণ গাইডলাইন।
                  </EditableText>
                </div>
                <div className="mt-8 flex flex-col items-center justify-center gap-3">
                  {isBatch1 ? (
  <button
    onClick={() => setShowClosedModal(true)}
    className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
  >
    <span>Enroll Now</span>
    <ArrowRight className="w-4 h-4" />
  </button>
) : enrolled ? (
                    <Link
                      to={`/courses/${slug}/lessons/intro`}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>Start Learning</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>Enroll in Batch 03 Now (৳৩,০০০)</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                  <p className="text-xs text-muted-foreground font-bangla flex items-center gap-1.5 mt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>১০০% মানি ব্যাক ও স্যাটিসফ্যাকশন ট্রাস্ট। সুরক্ষিত পেমেন্ট ভেরিফিকেশন</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Slim Footer */}
            <footer className="w-full py-6 border-t border-border/40 text-center font-sans">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
                <p>© 2026 growVelo Studio. All rights reserved.</p>
                <div className="flex items-center gap-4 text-[11px] tracking-wide">
                  <Link to="/legal" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                  <span>•</span>
                  <Link to="/legal" className="hover:text-foreground transition-colors">Terms of Service</Link>
                  <a href="https://wa.me/8801410341220" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
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
