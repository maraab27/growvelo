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
  Lock,
  Send,
  Zap,
  CheckCircle2,
  Calendar,
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
    <div
      className="min-h-screen text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200 font-sans antialiased relative overflow-x-hidden pb-24 lg:pb-12"
      style={{
        backgroundColor: "#07070a",
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(217, 119, 6, 0.16) 0%, transparent 55%),
          radial-gradient(circle at 90% 40%, rgba(180, 83, 9, 0.08) 0%, transparent 45%),
          radial-gradient(rgba(245, 158, 11, 0.18) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 24px 24px",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#07070a]/80 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 text-xs">
              Ψ
            </div>
            <span className="font-bold text-sm tracking-widest uppercase font-mono text-zinc-200">
              OCTA<span className="text-amber-400">VELO</span>
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-amber-500/30 text-amber-300 font-medium text-xs sm:text-sm transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>পিডিএফ গাইড (২৯৯৳)</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </header>

      {/* Main Full-Width Responsive Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Core Value & Call to Action (Desktop 7 Cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/25 bg-amber-500/[0.05] text-amber-300/90 text-[11px] font-mono tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Behavioral Science & Persuasion</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
              গলার জোর নয়, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                সাইকোলজি দিয়ে জিতুন।
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
              তর্কে প্রতিপক্ষকে পরাজিত করতে অহেতুক তর্ক নয়, প্রয়োজন ফ্রেম কন্ট্রোল। মানুষের অবচেতন আচরণ ও ইগো নিয়ন্ত্রণ করার কমপ্লিট মনস্তাত্ত্বিক ব্লু-প্রিন্ট গাইড।
            </p>

            {/* Pricing Card & Direct CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <div className="flex items-center justify-between sm:justify-start gap-3 px-4.5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
                <span className="text-2xl font-bold font-mono text-zinc-100">২৯৯ ৳</span>
                <span className="text-xs text-zinc-500 line-through font-mono">৯৯৯ ৳</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[11px] font-medium border border-amber-500/20">
                  ৭০% ছাড়
                </span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>ব্লু-প্রিন্ট পিডিএফ এখনই পান</span>
              </button>
            </div>

            {/* Key Deliverables Bullet Points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>প্রতিপক্ষের আক্রমণাত্মক লজিক ভাঙার ফ্রেমওয়ার্ক</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ইমোশনাল ম্যানিপুলেশন কাউন্টার করার কৌশল</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>কথোপকথনে লিড ধরে রাখার সাইকোলজিক্যাল পজ</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>লগইন ছাড়া সরাসরি ডাউনলোড ও লাইফটাইম অ্যাক্সেস</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Interactive Node (Desktop 5 Cols - Reference Match) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="w-full max-w-md lg:max-w-none rounded-3xl p-5 sm:p-7 bg-[#0a0a0f]/90 border border-white/[0.08] backdrop-blur-2xl shadow-2xl relative">
              
              <div className="text-left mb-6">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block">
                  Actionable Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1">
                  তর্কে জেতার প্রসেস কী?
                </h3>
              </div>

              {/* Active Figma Node Box */}
              <div className="relative rounded-2xl border-2 border-amber-400/90 bg-gradient-to-b from-amber-500/[0.08] to-amber-950/[0.2] p-5 sm:p-6 backdrop-blur-xl shadow-[0_0_35px_rgba(245,158,11,0.12)] text-left">
                {/* 4 Vector Corner Handles */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-[2px]" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-[2px]" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-[2px]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-[2px]" />

                <div className="flex items-center gap-2 text-xs font-mono text-amber-300/90 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>ধাপ ০১ • Frame Control</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-amber-200 tracking-tight">
                  সাইলেন্ট পজ ও ইনভার্সন
                </h4>

                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  প্রতিপক্ষ যখন আক্রমণাত্মক যুক্তি দেয়, তখন তর্কে না জড়িয়ে চুপ থেকে তাদের বক্তব্য পুনরায় প্রশ্ন আকারে ফেরত পাঠানোর আর্ট।
                </p>

                {/* Hand Pointer */}
                <div className="absolute -bottom-4 -right-2 select-none pointer-events-none drop-shadow-lg">
                  <div className="relative">
                    <MousePointer2 className="w-8 h-8 text-white fill-white stroke-black stroke-[1.5px] -rotate-12 transform" />
                    <span className="absolute -top-1 -right-8 px-2 py-0.5 rounded-md bg-amber-500 text-black text-[9px] font-mono font-bold">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Connecting Dashed Line */}
              <div className="flex justify-center -my-1">
                <svg width="40" height="38" viewBox="0 0 40 38" fill="none">
                  <path
                    d="M20 0 V38"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="3 3"
                  />
                </svg>
              </div>

              {/* Step 2 Pill */}
              <div className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 backdrop-blur-md flex items-center justify-between mb-3 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full border border-amber-400/60 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-300">ধাপ ০২: ইগো বনাম যুক্তি সেপারেশন</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">In Guide</span>
              </div>

              {/* Step 3 Pill */}
              <div className="rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 backdrop-blur-md flex items-center justify-between text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full border border-white/20" />
                  <span className="text-xs font-medium text-zinc-400">ধাপ ০৩: আনব্রেকবল কনক্লুশন</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">In Guide</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Feature Grid (Full Width on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16 lg:mt-24 text-left">
          <div className="p-5.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
            <Zap className="w-5 h-5 text-amber-400 mb-3" />
            <h3 className="font-bold text-sm text-zinc-200 mb-1.5">সরাসরি প্রয়োগযোগ্য</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              কোনো জটিল তাত্ত্বিক কথা নেই; বাস্তব জীবনের মিটিং বা বিতর্কে সরাসরি প্রয়োগযোগ্য কৌশল।
            </p>
          </div>
          <div className="p-5.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
            <ShieldCheck className="w-5 h-5 text-amber-400 mb-3" />
            <h3 className="font-bold text-sm text-zinc-200 mb-1.5">মনস্তাত্ত্বিক সুরক্ষা</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              অন্যের কথায় উত্তেজিত না হয়ে নিজের মানসিক স্থিরতা বজায় রাখার সহজ প্রসেস।
            </p>
          </div>
          <div className="p-5.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
            <Lock className="w-5 h-5 text-amber-400 mb-3" />
            <h3 className="font-bold text-sm text-zinc-200 mb-1.5">লাইফটাইম ডাউনলোড</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              লগইন ছাড়াই পিডিএফ ডাউনলোড করুন এবং আজীবন যেকোনো ডিভাইসে সংরক্ষণ করুন।
            </p>
          </div>
        </div>

        <footer className="border-t border-white/[0.06] mt-16 pt-8 pb-4 text-center">
          <p className="text-xs text-zinc-600 font-mono">
            © 2026 Octavelo Studio • Psychological Masterclass
          </p>
        </footer>
      </main>

      {/* Floating Bottom Bar (Mobile 95% Priority) */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden backdrop-blur-2xl bg-[#07070a]/90 border-t border-white/[0.08] p-3 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-zinc-400 block font-mono">PDF Masterclass</span>
          <span className="text-base font-bold font-mono text-amber-300">২৯৯ ৳</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95"
        >
          <span>পিডিএফ পান</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Guest Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="w-full max-w-md rounded-3xl bg-[#0b0b0f] border border-white/[0.09] p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto"
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

                {/* Payment Number Card */}
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
