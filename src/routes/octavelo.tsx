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
  BrainCircuit,
  Users,
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
      className="min-h-screen text-zinc-100 selection:bg-[#00F0FF]/30 selection:text-[#00F0FF] antialiased relative pb-28 lg:pb-16 font-bengali overflow-x-hidden"
      style={{
        backgroundColor: "#050608", // Deep Obsidian
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(0, 82, 255, 0.15) 0%, transparent 60%),
          radial-gradient(circle at 85% 40%, rgba(0, 240, 255, 0.05) 0%, transparent 50%),
          radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 24px 24px",
      }}
    >
      {/* Import Beautiful Bengali Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        .font-bengali { font-family: 'Hind Siliguri', sans-serif; }
      `}</style>

      {/* Frozen Header - War Room Style */}
      <div className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-xl border border-[#1E2230] bg-[#08090C]/90 backdrop-blur-xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-[0_4px_30px_rgba(0,82,255,0.1)]">
          <div className="flex items-center gap-3">
            {/* Uploadable Logo */}
            <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
              <EditableImage
                id="octavelo.header.logo"
                defaultSrc="https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/gallery/growvelo_logo_v2_optimized.webp"
                alt="Octavelo Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
            {/* Single Color Brand Name */}
            <span className="font-bold text-sm tracking-widest uppercase font-mono text-white hidden sm:block">
              <EditableText id="octavelo.brand">OCTAVELO</EditableText>
            </span>
          </div>

          <div className="flex items-center gap-4">
             {/* Trust Badge Header */}
             <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
               <Users className="w-3.5 h-3.5 text-[#00F0FF]" />
               <span>৬,০০০+ শিক্ষার্থী</span>
             </div>
             
             <button
               onClick={() => setIsModalOpen(true)}
               className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
             >
               <span>
                 <EditableText id="octavelo.nav.btn">PDF Guide (99৳)</EditableText>
               </span>
             </button>
          </div>
        </header>
      </div>

      {/* Main Responsive Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-28 sm:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Cognitive Text (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-7">
            
            <div className="inline-block px-3.5 py-1.5 rounded-md border border-[#00F0FF]/30 bg-[#00F0FF]/[0.05] text-[#00F0FF] text-[11px] sm:text-xs font-mono font-medium tracking-normal shadow-[0_0_10px_rgba(0,240,255,0.1)]">
              <EditableText id="octavelo.badge">[ Behavioral Science • Intellectual Dominance ]</EditableText>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold leading-[1.15] text-white tracking-normal max-w-xl">
              <EditableText id="octavelo.title1">গলার জোর নয়,</EditableText> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0052FF]">
                <EditableText id="octavelo.title2">সাইকোলজি দিয়ে জিতুন!</EditableText>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-lg">
              <EditableText id="octavelo.desc">
                তর্কে প্রতিপক্ষকে পরাজিত করতে অহেতুক কথা নয়, প্রয়োজন ফ্রেম কন্ট্রোল। মানুষের অবচেতন আচরণ ও ইগো নিয়ন্ত্রণ করার একটি ঠান্ডা মাথার স্ট্র্যাটেজিক ব্লু-প্রিন্ট গাইড।
              </EditableText>
            </p>

            {/* Price Box with Solid Background & Electric Cyan Trigger */}
            <div className="w-full max-w-md bg-[#111318] border border-[#1E2230] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg mt-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold font-mono text-white">
                  <EditableText id="octavelo.price.new">৯৯ ৳</EditableText>
                </span>
                <div className="flex flex-col items-start justify-center gap-0.5">
                  <span className="text-xs text-zinc-500 line-through font-mono">
                    <EditableText id="octavelo.price.old">৫০০ ৳</EditableText>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#f43f5e] text-white text-[10px] font-bold uppercase tracking-wider">
                    <EditableText id="octavelo.discount">৮০% ছাড়</EditableText>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.4)] border border-[#00F0FF]/50"
              >
                <span>
                  <EditableText id="octavelo.buy.btn">পিডিএফ এখনই সংগ্রহ করুন</EditableText>
                </span>
              </button>
            </div>

            {/* Minimal Bullet Points - Ice White & Cyan */}
            <div className="pt-2 space-y-3.5 w-full max-w-md text-left">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#00F0FF]" />
                </div>
                <span className="text-sm text-zinc-300 leading-snug">
                  <EditableText id="octavelo.b1">আক্রমণাত্মক লজিক ভাঙার ফ্রেমওয়ার্ক</EditableText>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#00F0FF]" />
                </div>
                <span className="text-sm text-zinc-300 leading-snug">
                  <EditableText id="octavelo.b2">ইমোশনাল ম্যানিপুলেশন কাউন্টার করার কৌশল</EditableText>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#00F0FF]" />
                </div>
                <span className="text-sm text-zinc-300 leading-snug">
                  <EditableText id="octavelo.b3">লগইন ছাড়া আজীবন অ্যাক্সেস (পিডিএফ)</EditableText>
                </span>
              </div>
            </div>

            {/* Social Proof Trust Badge */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#050608] bg-zinc-800" />
                <div className="w-8 h-8 rounded-full border-2 border-[#050608] bg-zinc-700" />
                <div className="w-8 h-8 rounded-full border-2 border-[#050608] bg-zinc-600" />
                <div className="w-8 h-8 rounded-full border-2 border-[#050608] bg-[#0052FF] flex items-center justify-center text-[10px] font-bold text-white">+</div>
              </div>
              <div className="text-xs text-[#94A3B8]">
                <strong className="text-white">৬,০০০+</strong> জন শিক্ষার্থী ইতিমধ্যে <br className="hidden sm:block"/> এই গাইডটি সংগ্রহ করেছেন।
              </div>
            </div>

          </div>

          {/* Right Column: Clean 2D Display Box (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end w-full mt-8 lg:mt-0">
            
            {/* The Actual Display Card */}
            <div className="w-full max-w-[360px] rounded-2xl border border-[#1E2230] bg-[#0A0C10] p-3 flex flex-col shadow-2xl relative overflow-hidden group">
              {/* Subtle Cyan ambient inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/5 blur-3xl pointer-events-none group-hover:bg-[#00F0FF]/10 transition-colors" />

              {/* Image Container */}
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#111318] border border-[#1E2230] relative">
                <EditableImage
                  id="octavelo.main.cover"
                  defaultSrc="https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/gallery/newthum.webp"
                  alt="Masterclass Cover"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Title & Price Below Image */}
              <div className="pt-5 pb-4 text-center space-y-2 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0052FF]/20 text-[#00F0FF] text-[10px] font-mono font-bold uppercase mb-1 border border-[#0052FF]/30">
                  <BrainCircuit className="w-3 h-3" />
                  <span>Verified Blueprint</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-normal">
                  <EditableText id="octavelo.cover.title">তর্কে জেতার মাস্টারক্লাস</EditableText>
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#94A3B8] font-mono">
                  <span>
                    <EditableText id="octavelo.cover.price">৯৯ ৳ (Digital Edition)</EditableText>
                  </span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <footer className="mt-20 text-center text-xs text-[#94A3B8] font-mono pb-8 border-t border-[#1E2230] pt-8">
          <EditableText id="octavelo.footer">© 2026 Octavelo Studio • Intellectual Dominance</EditableText>
        </footer>
      </main>

      {/* Floating Mobile Sticky Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0A0C10] border-t border-[#1E2230] p-3 sm:p-4 flex items-center justify-between gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 font-mono line-through decoration-zinc-600">৫০০ ৳</span>
          <span className="text-xl font-bold font-mono text-[#00F0FF]">৯৯ ৳</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>পিডিএফ আনলক করুন</span>
          <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
        </button>
      </div>

      {/* Guest Checkout Modal - War Room Style */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-xl bg-[#08090C] border border-[#1E2230] p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto shadow-[0_0_50px_rgba(0,82,255,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-md bg-[#111318] text-[#94A3B8] border border-[#1E2230] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold font-mono text-white mt-1.5">৯৯ ৳</div>
                  <h3 className="text-sm text-[#94A3B8] mt-1">
                    তর্কে জেতার মনস্তাত্ত্বিক মাস্টারক্লাস পিডিএফ
                  </h3>
                </div>

                {/* Method Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#111318] border border-[#1E2230] mb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("bKash")}
                    className={`py-2 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      selectedMethod === "bKash"
                        ? "bg-white text-black"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    bKash
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("Nagad")}
                    className={`py-2 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      selectedMethod === "Nagad"
                        ? "bg-white text-black"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    Nagad
                  </button>
                </div>

                {/* Send Money Card */}
                <div className="rounded-xl p-4 border border-[#1E2230] bg-[#111318] mb-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#94A3B8]">সেন্ড মানি নম্বর ({selectedMethod}):</span>
                    <span className="px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] font-mono font-bold uppercase border border-[#00F0FF]/20">
                      Personal
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <code className="text-lg font-mono font-bold text-white tracking-widest">
                      {paymentNumber}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-3 py-1.5 text-xs rounded-md bg-[#1E2230] text-white font-bold flex items-center gap-1.5 active:scale-95 hover:bg-[#2A2F42] transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#00F0FF]" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                {/* Purchase Form */}
                <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="আপনার পূর্ণ নাম *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#050608] border border-[#1E2230] text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="ইমেইল এড্রেস *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#050608] border border-[#1E2230] text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#050608] border border-[#1E2230] text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Transaction ID (TrxID) *"
                      value={formData.trxId}
                      onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#050608] border border-[#1E2230] text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  {/* Bonus Checkbox */}
                  <div
                    onClick={() => setWantBonus(!wantBonus)}
                    className="py-2 flex items-start gap-3 cursor-pointer group"
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${wantBonus ? 'bg-[#00F0FF] border-[#00F0FF]' : 'bg-[#111318] border-[#1E2230] group-hover:border-white/40'}`}>
                      {wantBonus && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>
                    <div className="text-xs text-[#94A3B8] leading-relaxed select-none">
                      <strong className="text-white font-medium">ফ্রি বোনাস:</strong> ভবিষ্যতে ক্যারিয়ার ও সাইকোলজি রিসোর্সে ফ্রি অ্যাক্সেস পেতে চাই।
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-4 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#00F0FF] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  >
                    <Send className="w-4 h-4 text-white stroke-[2.5]" />
                    <span>পেমেন্ট নিশ্চিত করুন</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-[#00F0FF]/10 text-[#00F0FF] rounded-2xl flex items-center justify-center mx-auto border border-[#00F0FF]/30">
                  <ShieldCheck className="w-8 h-8 stroke-[2]" />
                </div>
                <h3 className="text-xl font-bold text-white">রিকোয়েস্ট সফল!</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed max-w-[250px] mx-auto">
                  আপনার হোয়াটসঅ্যাপ উইন্ডো ওপেন হয়েছে। নিচের বাটনে ক্লিক করে সরাসরি ফাইলটি ডাউনলোড করুন।
                </p>

                <div className="pt-4">
                  <a
                    href={pdfDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-sm hover:brightness-110 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  >
                    <Download className="w-4 h-4 text-white stroke-[2.5]" />
                    <span>পিডিএফ ডাউনলোড করুন</span>
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
