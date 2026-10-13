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
  Users,
  Star,
  Quote,
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
      className="min-h-screen text-zinc-100 selection:bg-[#00F0FF]/30 selection:text-[#00F0FF] antialiased relative pb-32 lg:pb-20 font-bengali overflow-x-hidden"
      style={{
        backgroundColor: "#050608",
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(0, 82, 255, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 85% 40%, rgba(0, 240, 255, 0.04) 0%, transparent 50%),
          radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 24px 24px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        .font-bengali { font-family: 'Hind Siliguri', sans-serif; }
      `}</style>

      {/* Premium Floating Header (Not edge-to-edge) */}
      <div className="fixed top-4 inset-x-4 z-50 flex justify-center pointer-events-none">
        <header className="pointer-events-auto flex w-full max-w-4xl items-center justify-between rounded-2xl border border-[#1E2230] bg-[#08090C]/70 backdrop-blur-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-white/10 bg-black/50 flex items-center justify-center overflow-hidden shrink-0">
              <EditableImage
                id="octavelo.header.logo"
                defaultSrc="https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/gallery/growvelo_logo_v2_optimized.webp"
                alt="Octavelo Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <span className="font-bold text-sm tracking-widest uppercase font-mono text-white hidden sm:block">
              <EditableText id="octavelo.brand">OCTAVELO</EditableText>
            </span>
          </div>

          <div className="flex items-center gap-5">
             <div className="hidden md:flex items-center gap-2 text-xs text-zinc-400 font-mono">
               <Users className="w-3.5 h-3.5 text-[#00F0FF]" />
               <span><EditableText id="octavelo.header.trust">৬,০০০+ স্টুডেন্ট</EditableText></span>
             </div>
             
             <button
               onClick={() => setIsModalOpen(true)}
               className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-transform cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
             >
               <span>
                 <EditableText id="octavelo.nav.btn">PDF Guide (99৳)</EditableText>
               </span>
             </button>
          </div>
        </header>
      </div>

      {/* Main Centered Reading Flow */}
      <main className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 sm:pt-40 flex flex-col items-center text-center">
        
        {/* Title & Description */}
        <div className="space-y-6 w-full">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/[0.05] text-[#00F0FF] text-xs font-mono font-medium tracking-wide shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <EditableText id="octavelo.badge">[ Behavioral Science • Intellectual Dominance ]</EditableText>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.2] text-white">
            <EditableText id="octavelo.title1">গলার জোর নয়,</EditableText> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0052FF]">
              <EditableText id="octavelo.title2">সাইকোলজি দিয়ে জিতুন!</EditableText>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
            <EditableText id="octavelo.desc">
              তর্কে প্রতিপক্ষকে পরাজিত করতে অহেতুক কথা নয়, প্রয়োজন ফ্রেম কন্ট্রোল। মানুষের অবচেতন আচরণ ও ইগো নিয়ন্ত্রণ করার একটি ঠান্ডা মাথার স্ট্র্যাটেজিক ব্লু-প্রিন্ট গাইড।
            </EditableText>
          </p>
        </div>

        {/* Dynamic Size Image Container (Right below description) */}
        <div className="w-full max-w-[340px] sm:max-w-md mx-auto mt-10">
          <div className="rounded-2xl border border-[#1E2230] bg-[#0A0C10] p-2.5 sm:p-3 shadow-2xl relative group">
            {/* Ambient inner glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00F0FF]/10 blur-3xl pointer-events-none" />
            
            {/* The Image (Adapts to uploaded size) */}
            <div className="w-full rounded-xl overflow-hidden bg-black border border-white/5 relative z-10">
              <EditableImage
                id="octavelo.main.cover"
                defaultSrc="https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/gallery/newthum.webp"
                alt="Masterclass Cover"
                className="w-full h-auto object-contain"
              />
            </div>
            
            <div className="pt-4 pb-2 px-2 flex justify-between items-center text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF]"/> Verified</span>
              <span>Digital PDF</span>
            </div>
          </div>
        </div>

        {/* Action & Pricing Block */}
        <div className="w-full max-w-[340px] sm:max-w-md mt-8">
          <div className="bg-[#111318] border border-[#1E2230] rounded-2xl p-5 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold font-mono text-white leading-none">
                  <EditableText id="octavelo.price.new">৯৯ ৳</EditableText>
                </span>
                <span className="text-sm text-zinc-500 line-through font-mono mb-0.5">
                  <EditableText id="octavelo.price.old">৫০০ ৳</EditableText>
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#f43f5e]/10 text-[#f43f5e] border border-[#f43f5e]/20 text-[11px] font-bold uppercase tracking-wider">
                <EditableText id="octavelo.discount">৮০% ছাড়</EditableText>
              </span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-transform cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.25)] border border-[#00F0FF]/30"
            >
              <Download className="w-5 h-5 text-white" />
              <span>
                <EditableText id="octavelo.buy.btn">পিডিএফটি এখনই ডাউনলোড করুন</EditableText>
              </span>
            </button>
          </div>
        </div>

        {/* Minimal Bullet Points */}
        <div className="mt-8 space-y-3.5 w-full max-w-md text-left px-2">
          <div className="flex items-start gap-3.5">
            <div className="w-5 h-5 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-[#00F0FF]" />
            </div>
            <span className="text-sm text-zinc-300">
              <EditableText id="octavelo.b1">আক্রমণাত্মক লজিক ভাঙার সাইকোলজিক্যাল ফ্রেমওয়ার্ক</EditableText>
            </span>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="w-5 h-5 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-[#00F0FF]" />
            </div>
            <span className="text-sm text-zinc-300">
              <EditableText id="octavelo.b2">ইমোশনাল ম্যানিপুলেশন কাউন্টার করার কৌশল</EditableText>
            </span>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="w-5 h-5 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-[#00F0FF]" />
            </div>
            <span className="text-sm text-zinc-300">
              <EditableText id="octavelo.b3">লগইন ছাড়া সরাসরি ডাউনলোড ও লাইফটাইম অ্যাক্সেস</EditableText>
            </span>
          </div>
        </div>

        {/* Testimonials / Feedback Section */}
        <div className="w-full max-w-4xl mt-20 pt-16 border-t border-[#1E2230]">
          <div className="text-center mb-10">
            <span className="text-[#00F0FF] text-xs font-mono tracking-widest uppercase font-semibold block mb-2">
              <EditableText id="octavelo.review.badge">Success Stories</EditableText>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <EditableText id="octavelo.review.title">কী বলছেন আমাদের শিক্ষার্থীরা?</EditableText>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {/* Feedback Card 1 */}
            <div className="p-6 rounded-2xl bg-[#0B0D12] border border-[#1E2230] relative group hover:border-[#00F0FF]/30 transition-colors">
              <Quote className="absolute top-5 right-5 w-6 h-6 text-[#1E2230] group-hover:text-[#00F0FF]/20 transition-colors" />
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 text-[#00F0FF] fill-[#00F0FF]" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                <EditableText id="octavelo.review1.text">
                  "আগে মিটিংয়ে কেউ জোরে কথা বললে নার্ভাস হয়ে যেতাম। এই স্লাইডের ফ্রেম কন্ট্রোল থিওরিটা জাস্ট মাইন্ড-ব্লোয়িং। এখন অনেক কুলভাবে সিচুয়েশন হ্যান্ডেল করতে পারি।"
                </EditableText>
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                  <EditableText id="octavelo.review1.initial">A</EditableText>
                </div>
                <div>
                  <span className="block text-xs font-bold text-white"><EditableText id="octavelo.review1.name">আরিফ মাহমুদ</EditableText></span>
                  <span className="block text-[10px] text-zinc-500 font-mono"><EditableText id="octavelo.review1.role">Corporate Executive</EditableText></span>
                </div>
              </div>
            </div>

            {/* Feedback Card 2 */}
            <div className="p-6 rounded-2xl bg-[#0B0D12] border border-[#1E2230] relative group hover:border-[#00F0FF]/30 transition-colors">
              <Quote className="absolute top-5 right-5 w-6 h-6 text-[#1E2230] group-hover:text-[#00F0FF]/20 transition-colors" />
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 text-[#00F0FF] fill-[#00F0FF]" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                <EditableText id="octavelo.review2.text">
                  "বই পড়ে সাধারণত বোরিং লাগে, কিন্তু এই পিডিএফটার প্রেজেন্টেশন ও পয়েন্টগুলো এতটাই শার্প যে এক বসায় পড়ে শেষ করেছি। ক্লায়েন্ট ডিলিংয়ে দারুণ কাজে দিচ্ছে।"
                </EditableText>
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                  <EditableText id="octavelo.review2.initial">R</EditableText>
                </div>
                <div>
                  <span className="block text-xs font-bold text-white"><EditableText id="octavelo.review2.name">রাহাত কবির</EditableText></span>
                  <span className="block text-[10px] text-zinc-500 font-mono"><EditableText id="octavelo.review2.role">Freelancer</EditableText></span>
                </div>
              </div>
            </div>

            {/* Feedback Card 3 */}
            <div className="p-6 rounded-2xl bg-[#0B0D12] border border-[#1E2230] relative group hover:border-[#00F0FF]/30 transition-colors sm:col-span-2 lg:col-span-1">
              <Quote className="absolute top-5 right-5 w-6 h-6 text-[#1E2230] group-hover:text-[#00F0FF]/20 transition-colors" />
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 text-[#00F0FF] fill-[#00F0FF]" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                <EditableText id="octavelo.review3.text">
                  "লজিক দিয়ে যে মানুষের ইগো কন্ট্রোল করা যায়, এটা আগে ভাবিনি। পার্সোনাল লাইফেও এই ফ্রেমওয়ার্কগুলো অনেক হেল্পফুল।"
                </EditableText>
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                  <EditableText id="octavelo.review3.initial">S</EditableText>
                </div>
                <div>
                  <span className="block text-xs font-bold text-white"><EditableText id="octavelo.review3.name">সাদিয়া ইসলাম</EditableText></span>
                  <span className="block text-[10px] text-zinc-500 font-mono"><EditableText id="octavelo.review3.role">Agency Owner</EditableText></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 text-center text-xs text-[#94A3B8] font-mono pb-8 pt-8">
          <EditableText id="octavelo.footer">© 2026 Octavelo Studio • Intellectual Dominance</EditableText>
        </footer>
      </main>

      {/* Floating Premium Mobile Footer (Not edge-to-edge) */}
      <div className="fixed bottom-4 inset-x-4 z-40 lg:hidden rounded-2xl bg-[#08090C]/85 backdrop-blur-2xl border border-[#1E2230] p-3 sm:p-4 flex items-center justify-between gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col px-2">
          <span className="text-[10px] text-zinc-400 font-mono line-through decoration-zinc-500 mb-0.5">৫০০ ৳</span>
          <span className="text-xl font-bold font-mono text-white leading-none">৯৯ ৳</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 py-3 px-2 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <span>পিডিএফ আনলক করুন</span>
          <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
        </button>
      </div>

      {/* Guest Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-2xl bg-[#08090C] border border-[#1E2230] p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto shadow-[0_0_50px_rgba(0,82,255,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#111318] text-[#94A3B8] border border-[#1E2230] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-6 mt-2">
                  <div className="text-3xl font-bold font-mono text-white mt-1.5">৯৯ ৳</div>
                  <h3 className="text-sm text-[#94A3B8] mt-1">
                    তর্কে জেতার মনস্তাত্ত্বিক মাস্টারক্লাস পিডিএফ
                  </h3>
                </div>

                {/* Method Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#111318] border border-[#1E2230] mb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("bKash")}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-[#94A3B8]">সেন্ড মানি নম্বর ({selectedMethod}):</span>
                    <span className="px-2 py-1 rounded-md bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] font-mono font-bold uppercase border border-[#00F0FF]/20">
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
                      className="px-3 py-2 text-xs rounded-lg bg-[#1E2230] text-white font-bold flex items-center gap-1.5 active:scale-95 hover:bg-[#2A2F42] transition-colors cursor-pointer"
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
                      className="w-full px-4 py-3.5 rounded-xl bg-[#050608] border border-[#1E2230] text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="ইমেইল এড্রেস *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#050608] border border-[#1E2230] text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#050608] border border-[#1E2230] text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Transaction ID (TrxID) *"
                      value={formData.trxId}
                      onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#050608] border border-[#1E2230] text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-zinc-600 transition-colors"
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
                    className="w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00F0FF] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)]"
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
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-sm hover:brightness-110 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]"
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
