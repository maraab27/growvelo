import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Download,
  AlertCircle,
  ArrowRight,
  X,
  Copy,
  ShieldCheck,
  Brain,
  Lock,
  Send,
  Zap,
  CheckCircle2,
  Calendar,
  MousePointer2,
  Check,
  Sparkles,
} from "lucide-react";
import { EditableText } from "../components/cms/EditableText";
import { EditableImage } from "../components/cms/EditableImage";

export const Route = createFileRoute("/octavelo")({
  component: OctaveloLandingPage,
});

function OctaveloLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"bKash" | "Nagad">("bKash");
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wantBonus, setWantBonus] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    trxId: "",
  });

  const paymentNumber = "01790055690";
  const supportWhatsapp = "8801410341220";
  const pdfDownloadUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/gallery/masterclass_guide.pdf";

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.trxId) {
      alert("অনুগ্রহ করে আপনার নাম, ইমেইল এবং TrxID দিন।");
      return;
    }

    const message = `Hello Octavelo! I purchased the Psychological Masterclass Blueprint.
Name: ${formData.fullName}
Email: ${formData.email}
WhatsApp: ${formData.phone || "Not provided"}
Bonus Access: ${wantBonus ? "Yes" : "No"}
Method: ${selectedMethod} Personal
TrxID: ${formData.trxId}`;

    const whatsappUrl = `https://wa.me/${supportWhatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setIsSubmitted(true);
  };

  return (
    <div
      className="min-h-screen text-zinc-100 selection:bg-[#d4ff32] selection:text-black font-sans antialiased relative overflow-x-hidden pb-24 lg:pb-12"
      style={{
        backgroundColor: "#0d0f0d",
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(212, 255, 50, 0.08) 0%, transparent 60%),
          radial-gradient(circle at 85% 40%, rgba(6, 78, 59, 0.15) 0%, transparent 50%),
          radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 26px 26px",
      }}
    >
      {/* 2D Frozen Capsule Header */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4 pointer-events-none">
        <header className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#121512]/90 px-4 py-2 sm:px-6 sm:py-2.5 backdrop-blur-xl shadow-lg transition-all">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4ff32] flex items-center justify-center font-mono font-black text-black text-sm">
              O
            </div>
            <span className="font-extrabold text-sm tracking-wider uppercase font-mono text-white">
              OCTA<span className="text-[#d4ff32]">VELO</span>
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-[#d4ff32] text-black font-black text-xs sm:text-sm hover:bg-[#c2f022] active:scale-95 transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <span>
              <EditableText id="octavelo.nav.btn">পিডিএফ গাইড (২৯৯৳)</EditableText>
            </span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </header>
      </div>

      {/* Main Responsive Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-32 lg:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Core Value & Call to Action (Desktop 7 Cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Multi-color 2D Pill Tags Stack (Reference Style) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-[#d4ff32] text-black text-[11px] font-black uppercase font-mono tracking-tight">
                <EditableText id="octavelo.pill.1">Behavioral Science</EditableText>
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-black text-[11px] font-bold">
                <EditableText id="octavelo.pill.2">তর্কে জয়</EditableText>
              </span>
              <span className="px-3 py-1 rounded-full bg-[#064e3b] text-[#86efac] border border-[#059669]/40 text-[11px] font-medium">
                <EditableText id="octavelo.pill.3">ফ্রেম কন্ট্রোল</EditableText>
              </span>
              <span className="px-3 py-1 rounded-full border border-white/20 text-zinc-300 text-[11px] font-medium">
                <EditableText id="octavelo.pill.4">নো-লগইন অ্যাক্সেস</EditableText>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.25] text-white">
              <EditableText id="octavelo.hero.title1">গলার জোর নয়,</EditableText> <br />
              <span className="text-[#d4ff32]">
                <EditableText id="octavelo.hero.titleAccent">সাইকোলজি দিয়ে জিতুন!</EditableText>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
              <EditableText id="octavelo.hero.description">
                তর্কে প্রতিপক্ষকে পরাজিত করতে অহেতুক কথা নয়, প্রয়োজন ফ্রেম কন্ট্রোল। মানুষের অবচেতন আচরণ ও ইগো নিয়ন্ত্রণ করার সম্পূর্ণ প্র্যাকটিক্যাল মনস্তাত্ত্বিক ব্লু-প্রিন্ট গাইড।
              </EditableText>
            </p>

            {/* Pricing Pill & Clean 2D Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <div className="flex items-center justify-between sm:justify-start gap-3 px-5 py-3 rounded-full bg-[#161a16] border border-white/10">
                <span className="text-2xl font-black font-mono text-white">
                  <EditableText id="octavelo.price.current">২৯৯ ৳</EditableText>
                </span>
                <span className="text-xs text-zinc-500 line-through font-mono">
                  <EditableText id="octavelo.price.old">৯৯৯ ৳</EditableText>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e11d48] text-white text-[11px] font-black uppercase tracking-wider">
                  <EditableText id="octavelo.price.discount">৭০% অফার</EditableText>
                </span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 rounded-full bg-[#d4ff32] hover:bg-[#c2f022] text-black font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4 text-black stroke-[2.5]" />
                <span>
                  <EditableText id="octavelo.cta.button">ব্লু-প্রিন্ট পিডিএফ এখনই পান</EditableText>
                </span>
              </button>
            </div>

            {/* Deliverables Bullet List */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#d4ff32] shrink-0" />
                <span><EditableText id="octavelo.bullet.1">প্রতিপক্ষের আক্রমণাত্মক লজিক ভাঙার ফ্রেমওয়ার্ক</EditableText></span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                <span><EditableText id="octavelo.bullet.2">ইমোশনাল ম্যানিপুলেশন কাউন্টার করার কৌশল</EditableText></span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#34d399] shrink-0" />
                <span><EditableText id="octavelo.bullet.3">কথোপকথনে লিড ধরে রাখার সাইকোলজিক্যাল পজ</EditableText></span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#fb7185] shrink-0" />
                <span><EditableText id="octavelo.bullet.4">লগইন ছাড়া সরাসরি ডাউনলোড ও আজীবন অ্যাক্সেস</EditableText></span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean 2D Visual Flow Card (Desktop 5 Cols) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="w-full max-w-md lg:max-w-none rounded-3xl p-5 sm:p-7 bg-[#131713] border border-white/10 shadow-xl relative">
              
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[11px] font-mono text-[#d4ff32] uppercase tracking-widest block font-bold">
                    <EditableText id="octavelo.node.category">Actionable Architecture</EditableText>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    <EditableText id="octavelo.node.title">তর্কে জেতার প্রসেস কী?</EditableText>
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#1f261f] border border-white/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[#d4ff32]" />
                </div>
              </div>

              {/* Step 1 Node (2D Vector Style) */}
              <div className="relative rounded-2xl border-2 border-[#d4ff32] bg-[#1a201a] p-5 sm:p-6 text-left">
                {/* 4 Vector Corner Square Handles */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-black rounded-[2px]" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-black rounded-[2px]" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-black rounded-[2px]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-black rounded-[2px]" />

                <div className="flex items-center gap-2 text-xs font-mono text-[#d4ff32] mb-1.5 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-[#d4ff32]" />
                  <span><EditableText id="octavelo.step1.badge">Step 1 • Discovery / Frame</EditableText></span>
                </div>

                <h4 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  <EditableText id="octavelo.step1.heading">সাইলেন্ট পজ ও ইনভার্সন</EditableText>
                </h4>

                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  <EditableText id="octavelo.step1.desc">
                    প্রতিপক্ষ যখন আক্রমণাত্মক যুক্তি দেয়, তখন তর্কে না জড়িয়ে শান্ত থেকে তাদের বক্তব্য পুনরায় প্রশ্ন আকারে ফেরত পাঠানোর আর্ট।
                  </EditableText>
                </p>

                {/* Hand Pointer Badge */}
                <div className="absolute -bottom-4 -right-2 select-none pointer-events-none drop-shadow-md">
                  <div className="relative">
                    <MousePointer2 className="w-8 h-8 text-white fill-white stroke-black stroke-[1.5px] -rotate-12 transform" />
                    <span className="absolute -top-1 -right-8 px-2 py-0.5 rounded-full bg-[#d4ff32] text-black text-[9px] font-mono font-black">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Clean Vector Connector Wire */}
              <div className="flex justify-center -my-1">
                <svg width="40" height="38" viewBox="0 0 40 38" fill="none">
                  <path
                    d="M20 0 V38"
                    stroke="#d4ff32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>

              {/* Step 2 Pill (Dark Green Style) */}
              <div className="rounded-full bg-[#064e3b] border border-[#059669]/50 px-4 py-2.5 flex items-center justify-between mb-3 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full border border-[#86efac] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
                  </div>
                  <span className="text-xs font-bold text-white">
                    <EditableText id="octavelo.step2.title">Step 2: ইগো বনাম যুক্তি ডিটেকশন</EditableText>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#86efac]">In Guide</span>
              </div>

              {/* Step 3 Pill (White Outline Style) */}
              <div className="rounded-full border border-white/20 bg-transparent px-4 py-2.5 flex items-center justify-between mb-5 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full border border-white/40" />
                  <span className="text-xs font-medium text-zinc-300">
                    <EditableText id="octavelo.step3.title">Step 3: আনব্রেকবল কনক্লুশন</EditableText>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">In Guide</span>
              </div>

              {/* PDF Cover / Thumbnail Preview Card */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                <div className="w-16 h-20 rounded-xl overflow-hidden border border-[#d4ff32]/40 bg-black shrink-0 relative shadow-sm">
                  <EditableImage
                    id="octavelo.guide.cover"
                    defaultSrc="https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/gallery/newthum.webp"
                    alt="Guide Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="px-2 py-0.5 rounded-full bg-[#e11d48] text-white text-[9px] font-mono font-black uppercase">
                    <EditableText id="octavelo.cover.tag">Digital Edition</EditableText>
                  </span>
                  <h5 className="text-xs font-bold text-white truncate mt-1">
                    <EditableText id="octavelo.cover.title">Psychological Blueprint PDF</EditableText>
                  </h5>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    <EditableText id="octavelo.cover.subtitle">সকল ডিভাইসে পাঠযোগ্য হাই-রেজুলেশন স্লাইড</EditableText>
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 mt-16 lg:mt-24 text-left">
          <div className="p-5.5 rounded-2xl bg-[#141814] border border-white/10">
            <div className="w-9 h-9 rounded-full bg-[#d4ff32] flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <h3 className="font-bold text-sm text-white mb-1.5">
              <EditableText id="octavelo.feat1.title">সরাসরি প্রয়োগযোগ্য</EditableText>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <EditableText id="octavelo.feat1.desc">
                কোনো জটিল তাত্ত্বিক কথা নেই; বাস্তব জীবনের মিটিং বা বিতর্কে সরাসরি প্রয়োগযোগ্য কৌশল।
              </EditableText>
            </p>
          </div>

          <div className="p-5.5 rounded-2xl bg-[#141814] border border-white/10">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <h3 className="font-bold text-sm text-white mb-1.5">
              <EditableText id="octavelo.feat2.title">মনস্তাত্ত্বিক সুরক্ষা</EditableText>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <EditableText id="octavelo.feat2.desc">
                অন্যের কথায় উত্তেজিত না হয়ে নিজের মানসিক স্থিরতা বজায় রাখার সহজ প্রসেস।
              </EditableText>
            </p>
          </div>

          <div className="p-5.5 rounded-2xl bg-[#141814] border border-white/10">
            <div className="w-9 h-9 rounded-full bg-[#064e3b] border border-[#059669]/50 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5 text-[#86efac] stroke-[2.5]" />
            </div>
            <h3 className="font-bold text-sm text-white mb-1.5">
              <EditableText id="octavelo.feat3.title">লাইফটাইম ডাউনলোড</EditableText>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <EditableText id="octavelo.feat3.desc">
                লগইন ছাড়াই সরাসরি ফাইল ডাউনলোড করুন এবং আজীবন যেকোনো ডিভাইসে সংরক্ষণ করুন।
              </EditableText>
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-16 pt-8 pb-4 text-center">
          <p className="text-xs text-zinc-500 font-mono">
            <EditableText id="octavelo.footer.copy">© 2026 Octavelo Studio • Psychological Masterclass</EditableText>
          </p>
        </footer>
      </main>

      {/* Floating Bottom Bar (Mobile Priority) */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#101310]/95 border-t border-white/10 p-3 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-zinc-400 block font-mono">PDF Masterclass</span>
          <span className="text-base font-bold font-mono text-[#d4ff32]">২৯৯ ৳</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 py-2.5 px-4 rounded-full bg-[#d4ff32] text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
        >
          <span>পিডিএফ আনলক করুন</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </button>
      </div>

      {/* Direct Guest Purchase Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-md rounded-3xl bg-[#121612] border border-white/15 p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-4">
                  <span className="px-3 py-0.5 rounded-full bg-[#d4ff32] text-black text-[10px] font-mono font-black uppercase tracking-wider">
                    Instant Guest Access
                  </span>
                  <div className="text-3xl font-black font-mono text-white mt-1.5">২৯৯ ৳</div>
                  <h3 className="text-xs text-zinc-300 mt-0.5 font-medium">
                    তর্কে জেতার মনস্তাত্ত্বিক মাস্টারক্লাস ব্লু-প্রিন্ট
                  </h3>
                </div>

                {/* Method Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-black/40 border border-white/10 mb-3.5">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("bKash")}
                    className={`py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedMethod === "bKash"
                        ? "bg-[#E2136E] text-white shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    bKash (বিকাশ)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("Nagad")}
                    className={`py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedMethod === "Nagad"
                        ? "bg-[#F7921E] text-white shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Nagad (নগদ)
                  </button>
                </div>

                {/* Payment Number Card */}
                <div className="rounded-2xl p-3 border border-white/10 bg-black/40 mb-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">
                      সেন্ড মানি নম্বর ({selectedMethod}):
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#064e3b] text-[#86efac] text-[10px] font-mono font-bold">
                      Personal
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 bg-black/60 p-2 rounded-xl border border-white/10">
                    <code className="text-sm font-mono font-bold text-white">
                      {paymentNumber}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-2.5 py-1 text-xs rounded-full bg-[#d4ff32] text-black font-bold flex items-center gap-1 hover:bg-[#c2f022] transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-black" /> : <Copy className="w-3 h-3 text-black" />}
                      <span className="text-[11px]">{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] mb-3 flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>দয়া করে <strong>"Send Money" (সেন্ড মানি)</strong> করবেন।</span>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">আপনার পূর্ণ নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: আব্দুল্লাহ মারাব"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#d4ff32]"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">ইমেইল এড্রেস *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#d4ff32]"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)</label>
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#d4ff32]"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Transaction ID (TrxID) *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: BL92XK82"
                      value={formData.trxId}
                      onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#d4ff32]"
                    />
                  </div>

                  {/* Bonus Checkbox */}
                  <div
                    onClick={() => setWantBonus(!wantBonus)}
                    className="p-2.5 rounded-xl border border-white/10 bg-black/30 flex items-start gap-2.5 cursor-pointer hover:border-[#d4ff32]/40 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={wantBonus}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-white/20 text-[#d4ff32] focus:ring-0"
                    />
                    <div className="text-[11px] leading-relaxed text-zinc-300">
                      <span className="font-bold text-[#d4ff32]">🎁 ফ্রি বোনাস:</span> ভবিষ্যতে ক্যারিয়ার ও সাইকোলজি রিসোর্সে ফ্রি অ্যাক্সেস পেতে চাই।
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-full bg-[#d4ff32] hover:bg-[#c2f022] text-black font-black text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                    <span>পেমেন্ট নিশ্চিত ও পিডিএফ আনলক করুন</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-[#064e3b] text-[#86efac] rounded-full flex items-center justify-center mx-auto border border-[#059669]/50">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-bold text-white">রিকোয়েস্ট গ্রহণ করা হয়েছে!</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  আপনার হোয়াটসঅ্যাপ উইন্ডো ওপেন হয়েছে। নিচের বাটনটিতে ক্লিক করে সরাসরি আপনার ফাইলটি ডাউনলোড করুন।
                </p>

                <div className="pt-2">
                  <a
                    href={pdfDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#d4ff32] text-black font-black text-xs hover:bg-[#c2f022] transition-all shadow-md"
                  >
                    <Download className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                    <span>সরাসরি পিডিএফ ডাউনলোড করুন</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
