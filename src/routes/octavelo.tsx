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
  Diamond,
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
      className="min-h-screen text-zinc-100 selection:bg-[#e4f0c0] selection:text-black antialiased relative pb-28 lg:pb-16 font-bengali"
      style={{
        backgroundColor: "#000000",
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.12) 1.5px, transparent 1.5px)`,
        backgroundSize: "28px 28px",
      }}
    >
      {/* Import Beautiful Bengali Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        .font-bengali { font-family: 'Hind Siliguri', sans-serif; }
      `}</style>

      {/* Frozen Less-Curved Header */}
      <div className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-md">
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

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#e4f0c0] text-black font-bold text-xs sm:text-sm hover:bg-[#d5e3ab] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>
              <EditableText id="octavelo.nav.btn">PDF Guide (99৳)</EditableText>
            </span>
          </button>
        </header>
      </div>

      {/* Main Responsive Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-28 sm:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Mobile Centered, Desktop Left */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8">
            
            <div className="inline-block px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-zinc-300 text-[11px] sm:text-xs font-mono font-medium tracking-normal">
              <EditableText id="octavelo.badge">Behavioral Science Masterclass</EditableText>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold leading-[1.15] text-white tracking-normal max-w-xl">
              <EditableText id="octavelo.title1">গলার জোর নয়,</EditableText> <br />
              <span className="text-white">
                <EditableText id="octavelo.title2">সাইকোলজি দিয়ে জিতুন!</EditableText>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md">
              <EditableText id="octavelo.desc">
                তর্কে প্রতিপক্ষকে পরাজিত করতে অহেতুক কথা নয়, প্রয়োজন ফ্রেম কন্ট্রোল। মানুষের অবচেতন আচরণ ও ইগো নিয়ন্ত্রণ করার সম্পূর্ণ মনস্তাত্ত্বিক ব্লু-প্রিন্ট গাইড।
              </EditableText>
            </p>

            {/* Price Box with Solid Background & Less Curved Button */}
            <div className="w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg mt-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold font-mono text-[#e4f0c0]">
                  <EditableText id="octavelo.price.new">৯৯ ৳</EditableText>
                </span>
                <div className="flex flex-col items-start justify-center gap-0.5">
                  <span className="text-xs text-zinc-500 line-through font-mono">
                    <EditableText id="octavelo.price.old">৫০০ ৳</EditableText>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#e4f0c0]/10 text-[#e4f0c0] text-[10px] font-bold uppercase tracking-wider">
                    <EditableText id="octavelo.discount">৮০% ছাড়</EditableText>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#e4f0c0] text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#d5e3ab] active:scale-95 transition-all cursor-pointer"
              >
                <span>
                  <EditableText id="octavelo.buy.btn">পিডিএফ এখনই সংগ্রহ করুন</EditableText>
                </span>
              </button>
            </div>

            {/* Minimal Bullet Points - Left Aligned Always */}
            <div className="pt-2 space-y-3.5 w-full max-w-md text-left">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#e4f0c0]" />
                </div>
                <span className="text-sm text-zinc-300 leading-snug">
                  <EditableText id="octavelo.b1">আক্রমণাত্মক লজিক ভাঙার ফ্রেমওয়ার্ক</EditableText>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#e4f0c0]" />
                </div>
                <span className="text-sm text-zinc-300 leading-snug">
                  <EditableText id="octavelo.b2">ইমোশনাল ম্যানিপুলেশন কাউন্টার করার কৌশল</EditableText>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#e4f0c0]" />
                </div>
                <span className="text-sm text-zinc-300 leading-snug">
                  <EditableText id="octavelo.b3">লগইন ছাড়া আজীবন অ্যাক্সেস (পিডিএফ)</EditableText>
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: "Top Gainers" Style Card Section */}
          <div className="flex flex-col items-center lg:items-end w-full mt-8 lg:mt-0">
            
            <div className="flex items-center justify-start w-full max-w-[340px] gap-4 mb-4 px-1">
              <h2 className="text-lg font-bold text-white tracking-normal">
                <EditableText id="octavelo.board.title">Octavelo Top Guides</EditableText>
              </h2>
              <div className="px-3 py-1 rounded-lg bg-white/10 text-white text-[11px] font-bold">
                <EditableText id="octavelo.board.pill">New</EditableText>
              </div>
            </div>

            <div className="w-full max-w-[340px] rounded-3xl border border-white/10 bg-[#090909] p-2.5 flex flex-col shadow-lg">
              {/* Cover Image Upload Area */}
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 relative">
                <EditableImage
                  id="octavelo.main.cover"
                  defaultSrc="https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/gallery/newthum.webp"
                  alt="Masterclass Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Price */}
              <div className="pt-6 pb-5 text-center space-y-2">
                <h3 className="text-xl font-bold text-white tracking-normal">
                  <EditableText id="octavelo.cover.title">তর্কে জেতার মাস্টারক্লাস</EditableText>
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 font-mono">
                  <Diamond className="w-3.5 h-3.5 text-[#e4f0c0] fill-[#e4f0c0]" />
                  <span>
                    <EditableText id="octavelo.cover.price">৯৯ ৳ (One-time)</EditableText>
                  </span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <footer className="mt-20 text-center text-xs text-zinc-600 font-mono pb-8 border-t border-white/10 pt-8">
          <EditableText id="octavelo.footer">© 2026 Octavelo Studio • All Rights Reserved</EditableText>
        </footer>
      </main>

      {/* Floating Mobile Sticky Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0d0d0d] border-t border-white/10 p-3 sm:p-4 flex items-center justify-between gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-400 font-mono line-through decoration-zinc-500">৫০০ ৳</span>
          <span className="text-xl font-bold font-mono text-[#e4f0c0]">৯৯ ৳</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 py-3 px-4 rounded-xl bg-[#e4f0c0] text-black font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>পিডিএফ আনলক করুন</span>
          <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
        </button>
      </div>

      {/* Guest Checkout Modal (Reduced Curves) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-2xl bg-[#0d0d0d] border border-white/10 p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold font-mono text-white mt-1.5">৯৯ ৳</div>
                  <h3 className="text-sm text-zinc-400 mt-1">
                    তর্কে জেতার মনস্তাত্ত্বিক মাস্টারক্লাস পিডিএফ
                  </h3>
                </div>

                {/* Method Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5 border border-white/10 mb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("bKash")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedMethod === "bKash"
                        ? "bg-white text-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    bKash
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("Nagad")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedMethod === "Nagad"
                        ? "bg-white text-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Nagad
                  </button>
                </div>

                {/* Send Money Card */}
                <div className="rounded-xl p-4 border border-white/10 bg-white/5 mb-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-zinc-400">সেন্ড মানি নম্বর ({selectedMethod}):</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[10px] font-mono font-bold uppercase">
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
                      className="px-3 py-1.5 text-xs rounded-lg bg-white text-black font-bold flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-black" />}
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
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-white/30 placeholder:text-zinc-600"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="ইমেইল এড্রেস *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-white/30 placeholder:text-zinc-600"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-white/30 placeholder:text-zinc-600"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Transaction ID (TrxID) *"
                      value={formData.trxId}
                      onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-[#e4f0c0] placeholder:text-zinc-600"
                    />
                  </div>

                  {/* Bonus Checkbox */}
                  <div
                    onClick={() => setWantBonus(!wantBonus)}
                    className="py-2 flex items-start gap-3 cursor-pointer group"
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${wantBonus ? 'bg-[#e4f0c0] border-[#e4f0c0]' : 'border-white/20 group-hover:border-white/40'}`}>
                      {wantBonus && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>
                    <div className="text-xs text-zinc-400 leading-relaxed select-none">
                      <strong className="text-white font-medium">ফ্রি বোনাস:</strong> ভবিষ্যতে ক্যারিয়ার ও সাইকোলজি রিসোর্সে ফ্রি অ্যাক্সেস পেতে চাই।
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-4 rounded-xl bg-[#e4f0c0] hover:bg-[#d5e3ab] text-black font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-black stroke-[2.5]" />
                    <span>পেমেন্ট নিশ্চিত করুন</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-white/5 text-white rounded-2xl flex items-center justify-center mx-auto border border-white/10">
                  <ShieldCheck className="w-8 h-8 stroke-[2]" />
                </div>
                <h3 className="text-xl font-bold text-white">রিকোয়েস্ট সফল!</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-[250px] mx-auto">
                  আপনার হোয়াটসঅ্যাপ উইন্ডো ওপেন হয়েছে। নিচের বাটনে ক্লিক করে সরাসরি ফাইলটি ডাউনলোড করুন।
                </p>

                <div className="pt-4">
                  <a
                    href={pdfDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#e4f0c0] text-black font-bold text-sm hover:bg-[#d5e3ab] transition-colors"
                  >
                    <Download className="w-4 h-4 text-black stroke-[2.5]" />
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
