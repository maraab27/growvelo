import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  Download,
  Sparkles,
  AlertCircle,
  ArrowRight,
  X,
  Copy,
  ShieldCheck,
  Brain,
  MessageSquare,
  Lock,
  Send,
  Zap,
  Target,
  CheckCircle2,
  Gift,
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
    <div className="min-h-screen bg-[#060608] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200 font-sans antialiased overflow-x-hidden relative">
      {/* Subtle Ambient Lights (Low Saturation) */}
      <div className="pointer-events-none fixed -top-48 left-1/2 -translate-x-1/2 w-[760px] h-[480px] bg-gradient-to-b from-amber-600/[0.12] via-orange-950/[0.04] to-transparent blur-[160px] -z-10" />
      <div className="pointer-events-none fixed top-1/2 -right-48 w-[500px] h-[500px] bg-amber-700/[0.05] blur-[170px] -z-10" />

      {/* Glossy Minimal Header */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#060608]/70 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 text-xs shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
              Ψ
            </div>
            <span className="font-semibold text-sm tracking-wider uppercase font-mono text-zinc-300">
              OCTA<span className="text-amber-400">VELO</span>
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-amber-500/30 hover:border-amber-500/50 text-amber-300 font-medium text-xs sm:text-sm transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>পিডিএফ গাইড পান</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-14 pb-16 sm:pt-24 sm:pb-24 px-4 sm:px-6 max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/[0.05] text-amber-300/90 text-xs font-mono tracking-wide uppercase mb-7 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <Brain className="w-3.5 h-3.5 text-amber-400" />
          <span>Learning Guide • Based on Behavioral Science</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.2] text-zinc-100 max-w-3xl mx-auto mb-6">
          তর্কে জেতার{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            মনস্তাত্ত্বিক মাস্টারক্লাস
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
          গলার জোর নয়, সাইকোলজি দিয়ে জিতুন। এই এক্সক্লুসিভ পিডিএফ ব্লুপ্রিন্ট আপনার কমিউনিকেশন ও পারসুয়েশন দক্ষতাকে পরবর্তী ধাপে নিয়ে যাবে।
        </p>

        {/* Pricing Badge & Glossy CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <div className="flex items-baseline gap-2.5 px-4.5 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
            <span className="text-2xl font-bold font-mono text-zinc-100">২৯৯ ৳</span>
            <span className="text-xs text-zinc-500 line-through font-mono">৯৯৯ ৳</span>
            <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[11px] font-medium border border-amber-500/20">
              Limited Offer
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-500/90 to-amber-600/90 hover:from-amber-500 hover:to-amber-600 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>ব্লুপ্রিন্ট পিডিএফ সংগ্রহ করুন</span>
          </button>
        </div>

        {/* Glossy Visual Mockup Container */}
        <div className="relative mx-auto max-w-2xl rounded-3xl p-px bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent shadow-2xl">
          <div className="rounded-[23px] bg-[#09090d]/90 backdrop-blur-2xl p-6 sm:p-9 border border-white/[0.04] text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.04] blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
              <div className="space-y-3.5 flex-1">
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Psychological Masterclass Guide</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-100">
                  স্লাইডের ভেতরে যা যা থাকছে:
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>কথা না বাড়িয়ে অন্যের যুক্তি ভেঙে দেওয়ার ফ্রেমওয়ার্ক</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>ইমোশনাল ব্ল্যাকমেইল ও ম্যানিপুলেশন কাউন্টার করার কৌশল</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>ব্যবসায়িক ও ব্যক্তিগত কথোপকথনে আধিপত্য ধরে রাখার উপায়</span>
                  </li>
                </ul>
              </div>

              <div className="w-40 sm:w-44 aspect-[3/4] rounded-2xl bg-gradient-to-b from-zinc-900 to-[#0e0e13] border border-amber-500/20 p-4.5 flex flex-col justify-between shadow-xl relative group">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    PDF SLIDE
                  </span>
                  <Lock className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                    Behavioral Science
                  </span>
                  <h4 className="text-xs font-bold text-zinc-200 mt-1 leading-snug">
                    তর্কে জেতার ব্লু-প্রিন্ট
                  </h4>
                </div>
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-400">
                  <span>Full Access</span>
                  <span className="text-amber-400">Instant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Cards */}
      <section className="py-14 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          <div className="p-5.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-amber-500/30 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            <Zap className="w-5 h-5 text-amber-400 mb-3" />
            <h3 className="font-bold text-sm text-zinc-200 mb-1.5">অ্যাকশনেবল পয়েন্ট</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              কোনো তাত্ত্বিক জটিলতা নেই; সরাসরি প্রাত্যহিক জীবনে প্রয়োগ করার মতো সহজ কৌশল।
            </p>
          </div>
          <div className="p-5.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-amber-500/30 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            <Target className="w-5 h-5 text-amber-400 mb-3" />
            <h3 className="font-bold text-sm text-zinc-200 mb-1.5">মনস্তাত্ত্বিক নিয়ন্ত্রণ</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              প্রতিপক্ষের আক্রমণাত্মক আচরণের মুখে শান্ত থেকে বুদ্ধিমত্তার সাথে লিড নেওয়া।
            </p>
          </div>
          <div className="p-5.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-amber-500/30 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            <MessageSquare className="w-5 h-5 text-amber-400 mb-3" />
            <h3 className="font-bold text-sm text-zinc-200 mb-1.5">সরাসরি অ্যাক্সেস</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              পেমেন্ট কনফার্ম হলেই সাথে সাথে যেকোনো ডিভাইসে পড়ার উপযোগী ফাইল আনলক।
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-10 px-4 text-center">
        <p className="text-xs text-zinc-600 font-mono">
          © 2026 Octavelo Studio • Psychological Masterclass
        </p>
      </footer>

      {/* Direct Guest Purchase Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="w-full max-w-md rounded-3xl bg-[#0a0a0e] border border-white/[0.08] p-6 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.04] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-5">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400">
                    Instant Guest Checkout
                  </span>
                  <div className="text-2xl font-bold font-mono text-zinc-100 mt-0.5">২৯৯ ৳</div>
                  <h3 className="text-xs text-zinc-400 mt-1">
                    তর্কে জেতার মনস্তাত্ত্বিক মাস্টারক্লাস স্লাইড
                  </h3>
                </div>

                {/* Method Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-4">
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
                <div className="rounded-2xl p-3.5 border border-white/[0.06] bg-white/[0.02] mb-3.5 space-y-2">
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
                      className="px-2.5 py-1 text-xs rounded-lg bg-white/[0.06] flex items-center gap-1.5 text-zinc-300 hover:bg-amber-500 hover:text-black transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span className="text-[11px]">{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 text-amber-300 text-[11px] mb-4 flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>দয়া করে <strong>"Send Money" (সেন্ড মানি)</strong> করবেন।</span>
                </div>

                {/* Purchase Form */}
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">আপনার পূর্ণ নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মাহিম মারাব"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-amber-500/50"
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
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)</label>
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-amber-500/50"
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
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  {/* Form Bonus Opt-in Option */}
                  <div
                    onClick={() => setWantBonus(!wantBonus)}
                    className="p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-start gap-2.5 cursor-pointer hover:border-amber-500/30 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={wantBonus}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-white/20 text-amber-500 focus:ring-0"
                    />
                    <div className="text-[11px] leading-relaxed text-zinc-300">
                      <span className="font-semibold text-amber-300">🎁 ফ্রি বোনাস:</span> ভবিষ্যতে ক্যারিয়ার ও সাইকোলজি রিসোর্সে এক্সক্লুসিভ অ্যাক্সেস পেতে চাই।
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-amber-950/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>পেমেন্ট নিশ্চিত ও পিডিএফ আনলক করুন</span>
                  </button>
                </form>
              </>
            ) : (
              /* Success / Download Screen */
              <div className="py-7 text-center space-y-3.5">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">রিকোয়েস্ট গ্রহণ করা হয়েছে!</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  আপনার হোয়াটসঅ্যাপ ওপেন হয়েছে। নিচে ক্লিক করে এখনই আপনার স্লাইডটি সংগ্রহ করুন।
                </p>

                <div className="pt-2">
                  <a
                    href={pdfDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:brightness-110 transition-all shadow-md"
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
