import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Download,
  AlertCircle,
  ArrowRight,
  X,
  Copy,
  ShieldCheck,
  Send,
  Check,
  Sparkles,
  BookOpen,
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
    <div className="min-h-screen bg-[#0a0c0a] text-zinc-100 selection:bg-[#d4ff32] selection:text-black font-sans antialiased relative pb-24 lg:pb-16">
      
      {/* 2D Flat Minimal Header */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 pointer-events-none">
        <header className="pointer-events-auto flex w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-[#111411]/95 px-4 py-2 sm:px-6 sm:py-2.5 backdrop-blur-md shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#d4ff32] flex items-center justify-center font-mono font-black text-black text-xs">
              O
            </div>
            <span className="font-black text-xs sm:text-sm tracking-wider uppercase font-mono text-white">
              OCTA<span className="text-[#d4ff32]">VELO</span>
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#d4ff32] text-black font-black text-xs sm:text-sm hover:bg-[#c2f022] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>
              <EditableText id="octavelo.nav.btn">পিডিএফ গাইড (৯৯৳)</EditableText>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </button>
        </header>
      </div>

      {/* Main Hero & Storyboard Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-24 sm:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Minimal Editorial Badge */}
            <div className="inline-block text-[11px] font-mono uppercase tracking-widest text-[#d4ff32] font-semibold">
              <EditableText id="octavelo.badge">[ Behavioral Science • Communication ]</EditableText>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.2] text-white">
              <EditableText id="octavelo.title1">গলার জোর নয়,</EditableText> <br />
              <span className="text-[#d4ff32]">
                <EditableText id="octavelo.title2">সাইকোলজি দিয়ে জিতুন!</EditableText>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg">
              <EditableText id="octavelo.desc">
                তর্কে প্রতিপক্ষকে পরাজিত করতে অহেতুক তর্ক নয়, প্রয়োজন ফ্রেম কন্ট্রোল। মানুষের অবচেতন আচরণ ও ইগো নিয়ন্ত্রণ করার সম্পূর্ণ প্র্যাকটিক্যাল মনস্তাত্ত্বিক ব্লু-প্রিন্ট গাইড।
              </EditableText>
            </p>

            {/* 2D Pricing & Clean Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <div className="flex items-center justify-between sm:justify-start gap-3 px-5 py-3 rounded-full bg-[#151915] border border-white/10">
                <span className="text-2xl font-black font-mono text-white">
                  <EditableText id="octavelo.price.new">৯৯ ৳</EditableText>
                </span>
                <span className="text-xs text-zinc-500 line-through font-mono">
                  <EditableText id="octavelo.price.old">৫০০ ৳</EditableText>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e11d48] text-white text-[10px] font-black uppercase">
                  <EditableText id="octavelo.discount">৮০% ছাড়</EditableText>
                </span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 rounded-full bg-[#d4ff32] hover:bg-[#c2f022] text-black font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-black stroke-[2.5]" />
                <span>
                  <EditableText id="octavelo.buy.btn">ব্লু-প্রিন্ট পিডিএফ এখনই পান</EditableText>
                </span>
              </button>
            </div>

            {/* Storyboard Step Pills (Reference 1 Style) */}
            <div className="pt-2 space-y-2.5 max-w-md">
              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#141814] border border-white/5">
                <div className="w-6 h-6 rounded-full bg-[#064e3b] text-[#86efac] flex items-center justify-center text-xs font-bold shrink-0">
                  ১
                </div>
                <div className="text-xs text-zinc-200">
                  <span className="font-bold text-white block">
                    <EditableText id="octavelo.step1.t">ফ্রেম কন্ট্রোল ও সাইলেন্ট পজ</EditableText>
                  </span>
                  <span className="text-zinc-400 text-[11px]">
                    <EditableText id="octavelo.step1.d">প্রতিপক্ষকে নিজের যুক্তিতে নিজেই আটকে দেওয়ার আর্ট।</EditableText>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#141814] border border-white/5">
                <div className="w-6 h-6 rounded-full bg-[#064e3b] text-[#86efac] flex items-center justify-center text-xs font-bold shrink-0">
                  ২
                </div>
                <div className="text-xs text-zinc-200">
                  <span className="font-bold text-white block">
                    <EditableText id="octavelo.step2.t">ইগো বনাম যুক্তি ডিটেকশন</EditableText>
                  </span>
                  <span className="text-zinc-400 text-[11px]">
                    <EditableText id="octavelo.step2.d">ব্যক্তিগত আক্রমণ এড়িয়ে আলাপে আধিপত্য বিস্তার।</EditableText>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#141814] border border-white/5">
                <div className="w-6 h-6 rounded-full bg-[#064e3b] text-[#86efac] flex items-center justify-center text-xs font-bold shrink-0">
                  ৩
                </div>
                <div className="text-xs text-zinc-200">
                  <span className="font-bold text-white block">
                    <EditableText id="octavelo.step3.t">আনব্রেকবল কনক্লুশন</EditableText>
                  </span>
                  <span className="text-zinc-400 text-[11px]">
                    <EditableText id="octavelo.step3.d">কথোপকথন নিজের অনুকূলে শেষ করার সাইকোলজিক্যাল সূত্র।</EditableText>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Large 2D Cover Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl bg-[#131713] border border-white/10 p-5 text-center shadow-lg">
              
              {/* Large Cover Box */}
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black relative mb-4">
                <EditableImage
                  id="octavelo.main.cover"
                  defaultSrc="https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/gallery/newthum.webp"
                  alt="Masterclass PDF Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Cover Details */}
              <div className="space-y-1.5 text-left px-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-[#d4ff32] text-black text-[10px] font-black uppercase font-mono">
                    <EditableText id="octavelo.cover.badge">Verified Guide</EditableText>
                  </span>
                  <span className="text-xs font-mono text-zinc-400">PDF Slide Format</span>
                </div>
                <h3 className="text-base font-bold text-white pt-1">
                  <EditableText id="octavelo.cover.name">তর্কে জেতার মনস্তাত্ত্বিক মাস্টারক্লাস</EditableText>
                </h3>
                <p className="text-xs text-zinc-400">
                  <EditableText id="octavelo.cover.note">পেমেন্ট কনফার্মেশনের সাথে সাথে ইনস্ট্যান্ট ডাউনলোড করুন।</EditableText>
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Minimal 3-Point Footer Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 pt-8 border-t border-white/10 text-left">
          <div className="p-4 rounded-2xl bg-[#121512] border border-white/5">
            <span className="text-xs font-bold text-[#d4ff32] block">সরাসরি প্রয়োগযোগ্য</span>
            <p className="text-xs text-zinc-400 mt-1">বাস্তব জীবনের কথোপকথনে সহজে কাজে লাগানোর মতো কৌশল।</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#121512] border border-white/5">
            <span className="text-xs font-bold text-white block">লাইফটাইম অ্যাক্সেস</span>
            <p className="text-xs text-zinc-400 mt-1">কোনো মেয়াদ নেই, ফাইলটি আজীবন আপনার ডিভাইসে সংরক্ষিত থাকবে।</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#121512] border border-white/5">
            <span className="text-xs font-bold text-[#86efac] block">লগইন ঝামেলাহীন</span>
            <p className="text-xs text-zinc-400 mt-1">কোনো অ্যাকাউন্ট বা সাইন-আপ করার প্রয়োজন নেই।</p>
          </div>
        </div>

        <footer className="mt-12 text-center text-xs text-zinc-600 font-mono">
          <EditableText id="octavelo.footer">© 2026 Octavelo Studio • Psychological Masterclass</EditableText>
        </footer>
      </main>

      {/* Floating Mobile Sticky Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#101310]/95 border-t border-white/10 p-3 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-zinc-400 block font-mono">অফার মূল্য</span>
          <span className="text-base font-bold font-mono text-[#d4ff32]">৯৯ ৳</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 py-2.5 px-4 rounded-full bg-[#d4ff32] text-black font-black text-xs flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
        >
          <span>পিডিএফ আনলক করুন</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </button>
      </div>

      {/* 2D Guest Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-3xl bg-[#131713] border border-white/15 p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto"
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
                    Instant Access
                  </span>
                  <div className="text-3xl font-black font-mono text-white mt-1.5">৯৯ ৳</div>
                  <h3 className="text-xs text-zinc-300 mt-0.5">
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

                {/* Send Money Card */}
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

                {/* Purchase Form */}
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

                  {/* Bonus Opt-in */}
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
                    className="w-full mt-2 py-3 rounded-full bg-[#d4ff32] hover:bg-[#c2f022] text-black font-black text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm"
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
                  আপনার হোয়াটসঅ্যাপ উইন্ডো ওপেন হয়েছে। নিচের বাটনে ক্লিক করে সরাসরি ফাইলটি ডাউনলোড করুন।
                </p>

                <div className="pt-2">
                  <a
                    href={pdfDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#d4ff32] text-black font-black text-xs hover:bg-[#c2f022] transition-all shadow-sm"
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
