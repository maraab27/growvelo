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
      className="min-h-screen text-zinc-100 selection:bg-lime-400/30 selection:text-lime-200 font-sans antialiased relative overflow-x-hidden pb-24 lg:pb-12"
      style={{
        backgroundColor: "#040704",
        backgroundImage: `
          radial-gradient(circle at 50% -10%, rgba(163, 230, 53, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 85% 35%, rgba(132, 204, 22, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 15% 75%, rgba(74, 222, 128, 0.04) 0%, transparent 50%),
          radial-gradient(rgba(163, 230, 53, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 28px 28px",
      }}
    >
      {/* Blurred Ambient Glow Orbs */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-lime-500/[0.08] blur-[180px] -z-10" />
      <div className="pointer-events-none fixed top-1/3 -right-32 w-[500px] h-[500px] bg-lime-600/[0.04] blur-[170px] -z-10" />

      {/* Floating Frozen Capsule Header (growVelo Style) */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4 pointer-events-none">
        <header className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#060a06]/80 px-4 py-2 sm:px-6 sm:py-2.5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-lime-500 to-emerald-400 p-[1px] shadow-sm shadow-lime-500/20">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-mono font-black text-lime-400 text-xs">
                O
              </div>
            </div>
            <span className="font-extrabold text-sm tracking-wider uppercase font-mono text-zinc-100">
              OCTA<span className="text-lime-400">VELO</span>
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-lime-400 text-black font-extrabold text-xs sm:text-sm hover:bg-lime-300 active:scale-95 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] cursor-pointer flex items-center gap-1.5"
          >
            <span>
              <EditableText id="octavelo.nav.btn">পিডিএফ গাইড (২৯৯৳)</EditableText>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </button>
        </header>
      </div>

      {/* Main Full-Width Responsive Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-32 lg:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Core Value & Call to Action (Desktop 7 Cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-400/25 bg-lime-400/[0.06] text-lime-300 text-xs font-mono tracking-normal">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_#a3e635]" />
              <EditableText id="octavelo.hero.badge">Behavioral Science & Communication</EditableText>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.25] text-white">
              <EditableText id="octavelo.hero.title1">গলার জোর নয়,</EditableText> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400">
                <EditableText id="octavelo.hero.titleAccent">সাইকোলজি দিয়ে জিতুন।</EditableText>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
              <EditableText id="octavelo.hero.description">
                তর্কে প্রতিপক্ষকে পরাজিত করতে অহেতুক কথা নয়, প্রয়োজন ফ্রেম কন্ট্রোল। মানুষের অবচেতন আচরণ ও ইগো নিয়ন্ত্রণ করার সম্পূর্ণ প্র্যাকটিক্যাল মনস্তাত্ত্বিক ব্লু-প্রিন্ট গাইড।
              </EditableText>
            </p>

            {/* Pricing Card & Direct CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <div className="flex items-center justify-between sm:justify-start gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                <span className="text-2xl font-black font-mono text-white">
                  <EditableText id="octavelo.price.current">২৯৯ ৳</EditableText>
                </span>
                <span className="text-xs text-zinc-500 line-through font-mono">
                  <EditableText id="octavelo.price.old">৯৯৯ ৳</EditableText>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-lime-400/15 text-lime-400 text-xs font-bold border border-lime-400/20">
                  <EditableText id="octavelo.price.discount">৭০% ছাড়</EditableText>
                </span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-300 hover:to-lime-400 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(163,230,53,0.3)] active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-black" />
                <span>
                  <EditableText id="octavelo.cta.button">ব্লু-প্রিন্ট পিডিএফ এখনই পান</EditableText>
                </span>
              </button>
            </div>

            {/* Deliverables Bullet List */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span><EditableText id="octavelo.bullet.1">প্রতিপক্ষের আক্রমণাত্মক লজিক ভাঙার ফ্রেমওয়ার্ক</EditableText></span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span><EditableText id="octavelo.bullet.2">ইমোশনাল ম্যানিপুলেশন কাউন্টার করার কৌশল</EditableText></span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span><EditableText id="octavelo.bullet.3">কথোপকথনে লিড ধরে রাখার সাইকোলজিক্যাল পজ</EditableText></span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span><EditableText id="octavelo.bullet.4">লগইন ছাড়া সরাসরি ডাউনলোড ও লাইফটাইম অ্যাক্সেস</EditableText></span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Interactive Node + Cover Preview (Desktop 5 Cols) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="w-full max-w-md lg:max-w-none rounded-3xl p-5 sm:p-7 bg-[#080d08]/90 border border-lime-500/20 backdrop-blur-2xl shadow-2xl relative">
              
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[11px] font-mono text-lime-400/80 uppercase tracking-widest block font-medium">
                    <EditableText id="octavelo.node.category">Actionable Architecture</EditableText>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1">
                    <EditableText id="octavelo.node.title">তর্কে জেতার প্রসেস কী?</EditableText>
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-lime-400" />
                </div>
              </div>

              {/* Active Step Box with Corner Vector Handles */}
              <div className="relative rounded-2xl border-2 border-lime-400 bg-gradient-to-b from-lime-400/[0.08] to-emerald-950/[0.25] p-5 sm:p-6 backdrop-blur-xl shadow-[0_0_35px_rgba(163,230,53,0.18)] text-left">
                {/* 4 Vector Corner Handles */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-lime-500 rounded-[2px]" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-lime-500 rounded-[2px]" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-lime-500 rounded-[2px]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-lime-500 rounded-[2px]" />

                <div className="flex items-center gap-2 text-xs font-mono text-lime-300 mb-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-lime-400" />
                  <span><EditableText id="octavelo.step1.badge">ধাপ ০১ • Frame Control</EditableText></span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  <EditableText id="octavelo.step1.heading">সাইলেন্ট পজ ও ইনভার্সন</EditableText>
                </h4>

                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  <EditableText id="octavelo.step1.desc">
                    প্রতিপক্ষ যখন আক্রমণাত্মক যুক্তি দেয়, তখন তর্কে না জড়িয়ে শান্ত থেকে তাদের বক্তব্য পুনরায় প্রশ্ন আকারে ফেরত পাঠানোর আর্ট।
                  </EditableText>
                </p>

                {/* Hand Pointer Badge */}
                <div className="absolute -bottom-4 -right-2 select-none pointer-events-none drop-shadow-xl">
                  <div className="relative">
                    <MousePointer2 className="w-8 h-8 text-white fill-white stroke-black stroke-[1.5px] -rotate-12 transform" />
                    <span className="absolute -top-1 -right-8 px-2 py-0.5 rounded-md bg-lime-400 text-black text-[9px] font-mono font-black">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Connecting Wire */}
              <div className="flex justify-center -my-1">
                <svg width="40" height="38" viewBox="0 0 40 38" fill="none">
                  <path
                    d="M20 0 V38"
                    stroke="#a3e635"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="3 3"
                  />
                </svg>
              </div>

              {/* Step 2 Pill */}
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 backdrop-blur-md flex items-center justify-between mb-3 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full border border-lime-400 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-300">
                    <EditableText id="octavelo.step2.title">ধাপ ০২: ইগো বনাম যুক্তি সেপারেশন</EditableText>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">In Guide</span>
              </div>

              {/* Step 3 Pill */}
              <div className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 backdrop-blur-md flex items-center justify-between mb-5 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full border border-white/20" />
                  <span className="text-xs font-medium text-zinc-400">
                    <EditableText id="octavelo.step3.title">ধাপ ০৩: আনব্রেকবল কনক্লুশন</EditableText>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">In Guide</span>
              </div>

              {/* PDF Cover / Thumbnail Preview Card (EditableImage Included) */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                <div className="w-16 h-20 rounded-xl overflow-hidden border border-lime-400/30 bg-black shrink-0 relative shadow-md">
                  <EditableImage
                    id="octavelo.guide.cover"
                    defaultSrc="https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/gallery/newthum.webp"
                    alt="Guide Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-1 text-[10px] font-mono text-lime-400 uppercase font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <EditableText id="octavelo.cover.tag">Official Digital Release</EditableText>
                  </div>
                  <h5 className="text-xs font-bold text-white truncate mt-0.5">
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

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16 lg:mt-24 text-left">
          <div className="p-5.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-lime-400/30 transition-all">
            <Zap className="w-5 h-5 text-lime-400 mb-3" />
            <h3 className="font-bold text-sm text-zinc-200 mb-1.5">
              <EditableText id="octavelo.feat1.title">সরাসরি প্রয়োগযোগ্য</EditableText>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <EditableText id="octavelo.feat1.desc">
                কোনো জটিল তাত্ত্বিক কথা নেই; বাস্তব জীবনের মিটিং বা বিতর্কে সরাসরি প্রয়োগযোগ্য কৌশল।
              </EditableText>
            </p>
          </div>
          <div className="p-5.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-lime-400/30 transition-all">
            <ShieldCheck className="w-5 h-5 text-lime-400 mb-3" />
            <h3 className="font-bold text-sm text-zinc-200 mb-1.5">
              <EditableText id="octavelo.feat2.title">মনস্তাত্ত্বিক সুরক্ষা</EditableText>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <EditableText id="octavelo.feat2.desc">
                অন্যের কথায় উত্তেজিত না হয়ে নিজের মানসিক স্থিরতা বজায় রাখার সহজ প্রসেস।
              </EditableText>
            </p>
          </div>
          <div className="p-5.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-lime-400/30 transition-all">
            <Lock className="w-5 h-5 text-lime-400 mb-3" />
            <h3 className="font-bold text-sm text-zinc-200 mb-1.5">
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
        <footer className="border-t border-white/[0.06] mt-16 pt-8 pb-4 text-center">
          <p className="text-xs text-zinc-600 font-mono">
            <EditableText id="octavelo.footer.copy">© 2026 Octavelo Studio • Psychological Masterclass</EditableText>
          </p>
        </footer>
      </main>

      {/* Floating Bottom Bar (Mobile Priority) */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden backdrop-blur-2xl bg-[#040704]/90 border-t border-white/10 p-3 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-zinc-400 block font-mono">PDF Masterclass</span>
          <span className="text-base font-bold font-mono text-lime-400">২৯৯ ৳</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-lime-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-95"
        >
          <span>পিডিএফ আনলক করুন</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </button>
      </div>

      {/* Direct Guest Purchase Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="w-full max-w-md rounded-3xl bg-[#070b07] border border-lime-500/20 p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-lime-400">
                    Instant Guest Access
                  </span>
                  <div className="text-2xl font-bold font-mono text-white mt-0.5">২৯৯ ৳</div>
                  <h3 className="text-xs text-zinc-300 mt-0.5 font-medium">
                    তর্কে জেতার মনস্তাত্ত্বিক মাস্টারক্লাস ব্লু-প্রিন্ট
                  </h3>
                </div>

                {/* Method Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-white/[0.03] border border-white/10 mb-3">
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
                <div className="rounded-2xl p-3 border border-lime-500/20 bg-lime-500/[0.04] mb-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">
                      সেন্ড মানি নম্বর ({selectedMethod}):
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-lime-400/15 text-[10px] font-mono text-lime-400 font-bold">
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
                      className="px-2.5 py-1 text-xs rounded-lg bg-white/10 flex items-center gap-1 text-zinc-200 hover:bg-lime-400 hover:text-black transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-lime-400" /> : <Copy className="w-3 h-3" />}
                      <span className="text-[11px]">{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-300 text-[11px] mb-3 flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-lime-400" />
                  <span>দয়া করে <strong>"Send Money" (সেন্ড মানি)</strong> করবেন।</span>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">আপনার পূর্ণ নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: আব্দুল্লাহ মারাব"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-lime-400"
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
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-lime-400"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)</label>
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-lime-400"
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
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-lime-400"
                    />
                  </div>

                  {/* Bonus Checkbox */}
                  <div
                    onClick={() => setWantBonus(!wantBonus)}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-2.5 cursor-pointer hover:border-lime-400/30 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={wantBonus}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-white/20 text-lime-400 focus:ring-0"
                    />
                    <div className="text-[11px] leading-relaxed text-zinc-300">
                      <span className="font-semibold text-lime-400">🎁 ফ্রি বোনাস:</span> ভবিষ্যতে ক্যারিয়ার ও সাইকোলজি রিসোর্সে ফ্রি অ্যাক্সেস পেতে চাই।
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-lime-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(163,230,53,0.3)]"
                  >
                    <Send className="w-3.5 h-3.5 text-black" />
                    <span>পেমেন্ট নিশ্চিত ও পিডিএফ আনলক করুন</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-lime-400/10 text-lime-400 rounded-full flex items-center justify-center mx-auto border border-lime-400/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">রিকোয়েস্ট গ্রহণ করা হয়েছে!</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  আপনার হোয়াটসঅ্যাপ উইন্ডো ওপেন হয়েছে। নিচের বাটনটিতে ক্লিক করে সরাসরি আপনার ফাইলটি ডাউনলোড করুন।
                </p>

                <div className="pt-2">
                  <a
                    href={pdfDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime-400 text-black font-extrabold text-xs hover:bg-lime-300 transition-all shadow-md"
                  >
                    <Download className="w-3.5 h-3.5 text-black" />
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
