import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
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
  Target,
  CheckCircle2,
  Calendar,
  Layers,
  MousePointer2,
} from "lucide-react";

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
    <div className="min-h-screen bg-[#07070a] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200 font-sans antialiased overflow-x-hidden relative pb-20 sm:pb-0">
      {/* Background Dot Texture (Reference Style) */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.18] -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(245, 158, 11, 0.25) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Ambient Gradient Glows */}
      <div className="pointer-events-none fixed -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[380px] bg-gradient-to-b from-amber-500/[0.12] via-orange-600/[0.04] to-transparent blur-[140px] -z-10" />
      <div className="pointer-events-none fixed top-1/2 -right-40 w-[450px] h-[450px] bg-amber-600/[0.05] blur-[150px] -z-10" />

      {/* Minimal Gloss Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#07070a]/75 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 text-xs">
              Ψ
            </div>
            <span className="font-semibold text-xs sm:text-sm tracking-wider uppercase font-mono text-zinc-300">
              OCTA<span className="text-amber-400">VELO</span>
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-amber-500/30 text-amber-300 font-medium text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>পিডিএফ পান (২৯৯৳)</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </header>

      {/* Main Workflow Showcase (Direct Reference Design) */}
      <main className="max-w-2xl mx-auto px-4 pt-10 sm:pt-16 pb-12 text-center">
        {/* Top Step Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md shadow-sm mb-6">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-mono text-zinc-300">Step-by-step masterclass</span>
        </div>

        {/* Primary Headline with Subtle Silver-White Gradient */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.2] mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
          তর্কে জেতার আসল <br />
          মনস্তাত্ত্বিক ফ্রেমওয়ার্ক কী?
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed mb-10">
          গলার জোর বা অপ্রয়োজনীয় তর্কে না জড়িয়ে মানুষের আচরণ নিয়ন্ত্রণ করার প্রমাণিত সাইকোলজিক্যাল ব্লু-প্রিন্ট।
        </p>

        {/* Interactive Selected Workflow Node (Figma Handle Box) */}
        <div className="relative max-w-sm sm:max-w-md mx-auto mb-12">
          {/* Active Box with Corner Handles */}
          <div className="relative rounded-2xl border-2 border-amber-400/80 bg-gradient-to-b from-amber-500/[0.08] to-amber-950/[0.15] p-5 sm:p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.15)] text-left">
            {/* 4 Corner Handles (Figma Style) */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-[2px] shadow-sm" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-[2px] shadow-sm" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-[2px] shadow-sm" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-[2px] shadow-sm" />

            <div className="flex items-center gap-2 text-xs font-mono text-amber-300/90 mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>ধাপ ০১ • প্রাথমিক নিয়ন্ত্রণ</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-amber-200 tracking-tight">
              ফ্রেম কন্ট্রোল ও সাইলেন্ট পজ
            </h3>

            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              কথা বাড়িয়ে শক্তি নষ্ট না করে প্রতিপক্ষকে নিজের তর্কে নিজেই ফেঁসে যাওয়ার মনস্তাত্ত্বিক ফাঁদ তৈরি করা।
            </p>

            {/* Hand Cursor Click (Reference Visual Element) */}
            <div className="absolute -bottom-4 -right-3 sm:-right-4 select-none pointer-events-none drop-shadow-lg">
              <div className="relative">
                <MousePointer2 className="w-8 h-8 text-white fill-white stroke-black stroke-[1.5px] -rotate-12 transform" />
                <span className="absolute -top-1 -right-8 px-2 py-0.5 rounded-md bg-amber-500 text-black text-[9px] font-mono font-bold tracking-tight">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Curved Connector Line Downwards */}
          <div className="flex justify-center -my-1">
            <svg width="40" height="42" viewBox="0 0 40 42" fill="none">
              <path
                d="M20 0 V42"
                stroke="url(#wireGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="3 3"
              />
              <defs>
                <linearGradient id="wireGradient" x1="20" y1="0" x2="20" y2="42" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F59E0B" />
                  <stop offset="1" stopColor="rgba(255,255,255,0.2)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Step 2 Pill (Radio Style) */}
          <div className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 backdrop-blur-md flex items-center justify-between mb-3 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full border border-amber-400/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
              </div>
              <span className="text-xs font-medium text-zinc-300">ধাপ ০২: ইগো বনাম যুক্তি ডিটেকশন</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">In Guide</span>
          </div>

          {/* Step 3 Pill (Radio Style) */}
          <div className="rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 backdrop-blur-md flex items-center justify-between text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full border border-white/20" />
              <span className="text-xs font-medium text-zinc-400">ধাপ ০৩: পারসুয়েশন ও কনক্লুশন</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">In Guide</span>
          </div>
        </div>

        {/* Pricing & Conversion Button */}
        <div className="max-w-sm mx-auto space-y-3.5">
          <div className="flex items-center justify-between px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs">
            <span className="text-zinc-400">সম্পূর্ণ ব্লু-প্রিন্ট স্লাইড</span>
            <div className="flex items-baseline gap-2">
              <span className="text-zinc-500 line-through font-mono">৯৯৯৳</span>
              <span className="text-lg font-bold font-mono text-amber-300">২৯৯ ৳</span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>ব্লু-প্রিন্ট পিডিএফ এখনই পান</span>
          </button>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto mt-14 text-left">
          <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md">
            <Brain className="w-4 h-4 text-amber-400 mb-2" />
            <div className="text-xs font-semibold text-zinc-200">আচরণগত বিজ্ঞান</div>
            <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
              খাঁটি সাইকোলজিক্যাল সূত্র যা বাস্তব আলাপে কাজ করে।
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md">
            <Target className="w-4 h-4 text-amber-400 mb-2" />
            <div className="text-xs font-semibold text-zinc-200">তাত্ক্ষণিক প্রভাব</div>
            <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
              কমিউনিকেশনে নিজের নিয়ন্ত্রণ প্রতিষ্ঠা করার কৌশল।
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md">
            <Lock className="w-4 h-4 text-amber-400 mb-2" />
            <div className="text-xs font-semibold text-zinc-200">লাইফটাইম ফাইল</div>
            <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
              লগইন ছাড়াই পিডিএফ ডাউনলোড ও সংরক্ষণ সুবিধা।
            </p>
          </div>
        </div>
      </main>

      {/* Floating Bottom Bar (Mobile 95% Priority) */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden backdrop-blur-2xl bg-[#07070a]/90 border-t border-white/[0.08] p-3 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-zinc-400 block font-mono">PDF Masterclass</span>
          <span className="text-base font-bold font-mono text-amber-300">২৯৯ ৳</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95"
        >
          <span>পিডিএফ আনলক করুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Direct Guest Purchase Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="w-full max-w-sm rounded-3xl bg-[#0b0b0f] border border-white/[0.09] p-5 sm:p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/[0.05] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400">
                    Instant Guest Access
                  </span>
                  <div className="text-2xl font-bold font-mono text-zinc-100 mt-0.5">২৯৯ ৳</div>
                  <h3 className="text-xs text-zinc-400 mt-0.5">
                    তর্কে জেতার মনস্তাত্ত্বিক মাস্টারক্লাস ব্লু-প্রিন্ট
                  </h3>
                </div>

                {/* Method Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("bKash")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedMethod === "Nagad"
                        ? "bg-[#F7921E] text-white shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Nagad (নগদ)
                  </button>
                </div>

                {/* Send Money Number Card */}
                <div className="rounded-2xl p-3 border border-white/[0.06] bg-white/[0.02] mb-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-medium">
                      সেন্ড মানি নম্বর ({selectedMethod}):
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-amber-400">
                      Personal
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 bg-black/50 p-2 rounded-xl border border-white/[0.06]">
                    <code className="text-sm font-mono font-bold text-zinc-200">
                      {paymentNumber}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-2.5 py-1 text-xs rounded-lg bg-white/[0.06] flex items-center gap-1 text-zinc-300 hover:bg-amber-400 hover:text-black transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span className="text-[11px]">{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 text-amber-300 text-[11px] mb-3 flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>দয়া করে <strong>"Send Money" (সেন্ড মানি)</strong> করবেন।</span>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">আপনার পূর্ণ নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মাহিম মারাব"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-amber-400/60"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">ইমেইল এড্রেস *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-amber-400/60"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)</label>
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-amber-400/60"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Transaction ID (TrxID) *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: BL92XK82"
                      value={formData.trxId}
                      onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-amber-400/60"
                    />
                  </div>

                  {/* Bonus Opt-in Checkbox */}
                  <div
                    onClick={() => setWantBonus(!wantBonus)}
                    className="p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-start gap-2.5 cursor-pointer hover:border-amber-400/30 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={wantBonus}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-white/20 text-amber-500 focus:ring-0"
                    />
                    <div className="text-[11px] leading-relaxed text-zinc-300">
                      <span className="font-semibold text-amber-300">🎁 ফ্রি বোনাস:</span> ভবিষ্যতে ক্যারিয়ার ও সাইকোলজি রিসোর্সে ফ্রি অ্যাক্সেস পেতে চাই।
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>পেমেন্ট নিশ্চিত ও পিডিএফ আনলক করুন</span>
                  </button>
                </form>
              </>
            ) : (
              /* Success / Instant Download State */
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-100">রিকোয়েস্ট গ্রহণ করা হয়েছে!</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  আপনার হোয়াটসঅ্যাপ উইন্ডো ওপেন হয়েছে। নিচের বাটনটিতে ক্লিক করে সরাসরি আপনার ফাইলটি ডাউনলোড করুন।
                </p>

                <div className="pt-2">
                  <a
                    href={pdfDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 text-black font-extrabold text-xs hover:brightness-110 transition-all shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
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
