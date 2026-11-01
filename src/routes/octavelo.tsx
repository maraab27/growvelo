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
  Star,
  Quote,
  FolderOpen,
  FileText,
  Sparkles,
} from "lucide-react";
import { EditableText } from "../components/cms/EditableText";

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
  
  const logoUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/octavelo-assets/Octavelo.webp";
  const coverUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/octavelo-assets/ecover.webp";
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
          radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 24px 24px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        .font-bengali { font-family: 'Hind Siliguri', sans-serif; }
      `}</style>

      {/* Unfrozen Header */}
      <div className="w-full flex justify-center px-4 pt-4 sm:pt-6">
        <header className="flex w-full max-w-5xl items-center justify-between rounded-full border border-[#1E2230] bg-[#08090C]/80 backdrop-blur-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/10 bg-[#050608] flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={logoUrl}
                alt="Octavelo Logo"
                className="w-full h-full object-cover block rounded-full"
              />
            </div>
            <span className="font-bold text-sm tracking-widest uppercase font-mono text-white hidden sm:block">
              <EditableText id="octavelo.brand">OCTAVELO</EditableText>
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-transform cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            <span>
              <EditableText id="octavelo.nav.btn">Get Instant Access 🚀</EditableText>
            </span>
          </button>
        </header>
      </div>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center lg:items-start">
          
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-10 w-full">
            
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#00F0FF]/20 bg-[#00F0FF]/[0.05] shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              <div className="flex -space-x-2">
                 <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100" alt="Student" className="w-6 h-6 rounded-full border-2 border-[#050608] object-cover" />
                 <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&h=100" alt="Student" className="w-6 h-6 rounded-full border-2 border-[#050608] object-cover" />
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100" alt="Student" className="w-6 h-6 rounded-full border-2 border-[#050608] object-cover" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[#00F0FF] text-[10px] sm:text-xs lg:text-sm font-mono font-bold tracking-wide">
                  <EditableText id="octavelo.trust.badge">Trusted by 10,000+ Professionals & Readers</EditableText>
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[62px] font-bold leading-tight lg:leading-[1.15] text-white">
              <EditableText id="octavelo.title1">তর্কে জেতার সাইকোলজি:</EditableText> <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0052FF]">
                <EditableText id="octavelo.title2">দ্য আল্টিমেট মাস্টারক্লাস</EditableText>
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-xl text-[#94A3B8] leading-relaxed max-w-2xl">
              <EditableText id="octavelo.desc">
                গলার জোর নয়, বরং নীরবতা আর স্মার্টনেস দিয়ে মানুষের অবচেতন মন নিয়ন্ত্রণ করার এবং যেকোনো কঠিন পরিস্থিতি নিজের শান্ত আয়ত্তে নিয়ে আসার চূড়ান্ত মনস্তাত্ত্বিক ব্লু-প্রিন্ট।
              </EditableText>
            </p>

            <div className="pt-2 lg:pt-6 space-y-4 lg:space-y-6 w-full max-w-lg mx-auto lg:mx-0">
              <div className="flex items-start justify-start gap-3.5 text-left">
                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#00F0FF]" />
                </div>
                <span className="text-sm sm:text-base lg:text-lg text-zinc-300">
                  <EditableText id="octavelo.b1">'এফবিআই (FBI) মিররিং' ও কনভারসেশনাল জুডোর পরীক্ষিত কৌশল</EditableText>
                </span>
              </div>
              <div className="flex items-start justify-start gap-3.5 text-left">
                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#00F0FF]" />
                </div>
                <span className="text-sm sm:text-base lg:text-lg text-zinc-300">
                  <EditableText id="octavelo.b2">নোংরা ব্যক্তিগত আক্রমণ ও ইগোর দেয়াল শান্তভাবে ভেঙে দেওয়ার আর্ট</EditableText>
                </span>
              </div>
              <div className="flex items-start justify-start gap-3.5 text-left">
                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#00F0FF]" />
                </div>
                <span className="text-sm sm:text-base lg:text-lg text-zinc-300">
                  <EditableText id="octavelo.b3">আজীবন ফ্রি এক্সেস: পার্সোনাল গাইডেন্স কমিউনিটি + ২-মিনিটের চিট শিট</EditableText>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-end w-full space-y-5">
            
            <div className="w-full max-w-[340px] sm:max-w-[380px] flex flex-col items-center relative">
              
              {/* NEW: Beige/Metallic Golden Faded Glow Behind the Book */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[70%] h-[60%] bg-[#E6C27A] opacity-25 blur-[60px] rounded-full pointer-events-none z-0" />

              {/* TOP: E-Book Cover Plate (z-10 to stay above the glow) */}
              <div className="w-[82%] relative z-10 rounded-t-3xl overflow-hidden shadow-2xl bg-[#050608] border border-b-0 border-[#0052FF]/40">
                <img
                  src={coverUrl}
                  alt="Masterclass Cover"
                  className="w-full h-auto object-cover block"
                />
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#050608] to-transparent pointer-events-none" />
              </div>

              {/* BOTTOM: Glossy Pricing Plate (z-20 to overlap the cover) */}
              <div className="w-full relative z-20 -mt-16 sm:-mt-20 rounded-3xl p-[1px] bg-gradient-to-b from-[#0052FF]/40 via-transparent to-transparent shadow-[0_0_40px_rgba(0,82,255,0.15)] overflow-hidden">
                
                <div className="relative h-full w-full bg-[#050608]/95 backdrop-blur-2xl rounded-[23px] border border-white/5 p-6 sm:p-7 flex flex-col items-center justify-center">
                  
                  <div className="absolute top-0 inset-x-1/4 h-px bg-gradient-to-r from-transparent via-[#0052FF] to-transparent opacity-80" />
                  <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#0052FF]/20 to-transparent pointer-events-none" />

                  <div className="flex items-center justify-between w-full mb-6 relative z-30">
                    <div className="flex items-end gap-3">
                      <span className="text-4xl sm:text-5xl font-bold font-mono text-white leading-none tracking-tight">
                        <EditableText id="octavelo.price.new">৯৯ ৳</EditableText>
                      </span>
                      <span className="text-xl sm:text-2xl text-zinc-500 line-through decoration-[#f43f5e]/70 decoration-2 font-mono mb-0.5">
                        <EditableText id="octavelo.price.old">৫০০ ৳</EditableText>
                      </span>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-[#f43f5e]/10 text-[#f43f5e] border border-[#f43f5e]/20 text-[11px] font-bold uppercase tracking-wider">
                      <EditableText id="octavelo.discount">৮০% ছাড়</EditableText>
                    </span>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.3)] border border-[#00F0FF]/30 relative z-30"
                  >
                    <Download className="w-5 h-5 text-white" />
                    <span>
                      <EditableText id="octavelo.buy.btn">ই-বুকটি এখনই সংগ্রহ করুন</EditableText>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* NEW: URGENCY CARD with Golden/Neon Border & Glow */}
            <div className="w-full max-w-[340px] sm:max-w-[380px] bg-[#0A0C12]/90 backdrop-blur-md border border-amber-400/50 rounded-2xl p-3 sm:p-4 flex items-center gap-3.5 shadow-[0_0_20px_rgba(251,191,36,0.15)] relative overflow-hidden">
              <div className="shrink-0 relative w-12 h-12 rounded-xl bg-[#050608] border border-[#1E2230] flex items-center justify-center overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF]/10 to-[#00F0FF]/5" />
                <FolderOpen className="w-6 h-6 text-[#0052FF] absolute -translate-y-1" />
                <FileText className="w-4 h-4 text-[#00F0FF] absolute translate-y-2 translate-x-2 rotate-12 drop-shadow-lg" />
                <Sparkles className="w-2.5 h-2.5 text-amber-400 absolute top-1.5 right-1.5" />
              </div>
              <div className="flex flex-col text-left">
                {/* Text added drop-shadow for extra pop */}
                <span className="text-[10px] font-black tracking-wider text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] uppercase mb-0.5">
                  <EditableText id="octavelo.urgency.badge">🎁 Limited Offer</EditableText>
                </span>
                <span className="text-xs sm:text-sm text-zinc-300 font-medium leading-snug">
                  <EditableText id="octavelo.urgency.text">আজই বইটি সংগ্রহ করলে সাথে পাচ্ছেন এক্সক্লুসিভ '২-মিনিটের পকেট চিট শিট' সম্পূর্ণ ফ্রি!</EditableText>
                </span>
              </div>
            </div>

          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mt-24 pt-16 border-t border-[#1E2230]">
          <div className="text-center mb-10">
            <span className="text-[#00F0FF] text-xs font-mono tracking-widest uppercase font-semibold block mb-2">
              <EditableText id="octavelo.review.badge">Success Stories</EditableText>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <EditableText id="octavelo.review.title">কী বলছেন আমাদের শিক্ষার্থীরা?</EditableText>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            <div className="p-6 rounded-2xl bg-[#0B0D12] border border-[#1E2230] relative group hover:border-[#00F0FF]/30 transition-colors">
              <Quote className="absolute top-5 right-5 w-6 h-6 text-[#1E2230] group-hover:text-[#00F0FF]/20 transition-colors" />
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                <EditableText id="octavelo.review1.text">
                  "আগে মিটিংয়ে কেউ জোরে কথা বললে নার্ভাস হয়ে যেতাম। এই স্লাইডের ফ্রেম কন্ট্রোল থিওরিটা জাস্ট মাইন্ড-ব্লোয়িং। এখন অনেক কুলভাবে সিচুয়েশন হ্যান্ডেল করতে পারি।"
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

            <div className="p-6 rounded-2xl bg-[#0B0D12] border border-[#1E2230] relative group hover:border-[#00F0FF]/30 transition-colors">
              <Quote className="absolute top-5 right-5 w-6 h-6 text-[#1E2230] group-hover:text-[#00F0FF]/20 transition-colors" />
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                <EditableText id="octavelo.review2.text">
                  "বই পড়ে সাধারণত বোরিং লাগে, কিন্তু এই ই-বুকটার প্রেজেন্টেশন ও পয়েন্টগুলো এতটাই শার্প যে এক বসায় পড়ে শেষ করেছি। ক্লায়েন্ট ডিলিংয়ে দারুণ কাজে দিচ্ছে।"
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

            <div className="p-6 rounded-2xl bg-[#0B0D12] border border-[#1E2230] relative group hover:border-[#00F0FF]/30 transition-colors sm:col-span-2 lg:col-span-1">
              <Quote className="absolute top-5 right-5 w-6 h-6 text-[#1E2230] group-hover:text-[#00F0FF]/20 transition-colors" />
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                <EditableText id="octavelo.review3.text">
                  "লজিক দিয়ে যে মানুষের ইগো কন্ট্রোল করা যায়, এটা আগে ভাবিনি। পার্সোনাল লাইফেও এই ফ্রেমওয়ার্কগুলো অনেক হেল্পফুল।"
                </EditableText>
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                  <EditableText id="octavelo.review3.initial">S</EditableText>
                </div>
                <div>
                  <span className="block text-xs font-bold text-white"><EditableText id="octavelo.review3.name">সাদিয়া ইসলাম</EditableText></span>
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

      <div className="fixed bottom-4 inset-x-4 z-40 lg:hidden rounded-2xl bg-[#08090C]/85 backdrop-blur-2xl border border-[#1E2230] p-3 sm:p-4 flex items-center justify-between gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col px-2">
          <span className="text-sm text-zinc-400 font-mono line-through decoration-[#f43f5e]/70 decoration-2 mb-0.5">৫০০ ৳</span>
          <span className="text-xl font-bold font-mono text-white leading-none">৯৯ ৳</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 py-3 px-2 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.3)] border border-[#00F0FF]/30"
        >
          <span>ই-বুক আনলক করুন</span>
          <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
        </button>
      </div>

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
              className="absolute top-5 right-5 p-2 rounded-md bg-[#111318] text-[#94A3B8] border border-[#1E2230] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-6 mt-2">
                  <div className="inline-flex items-center justify-center gap-2 mb-1">
                    <span className="text-lg text-zinc-400 font-mono line-through decoration-[#f43f5e]/70 decoration-2">৫০০ ৳</span>
                    <span className="px-2 py-0.5 rounded bg-[#f43f5e] text-white text-[10px] font-bold uppercase tracking-wider">৮০% ছাড়</span>
                  </div>
                  <div className="text-4xl font-bold font-mono text-white mt-1">৯৯ ৳</div>
                  <h3 className="text-sm text-[#94A3B8] mt-2">
                    তর্কে জেতার মনস্তাত্ত্বিক মাস্টারক্লাস ই-বুক
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#111318] border border-[#1E2230] mb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("bKash")}
                    className={`py-2.5 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
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
                    className={`py-2.5 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      selectedMethod === "Nagad"
                        ? "bg-white text-black"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    Nagad
                  </button>
                </div>

                <div className="rounded-xl p-4 border border-[#1E2230] bg-[#111318] mb-4">
                  <div className="flex items-center justify-between text-xs mb-2">
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
                      className="px-3 py-1.5 text-xs rounded-md bg-[#1E2230] text-white font-bold flex items-center gap-1.5 active:scale-95 hover:bg-[#2A2F42] transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#00F0FF]" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

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

                  <div
                    onClick={() => setWantBonus(!wantBonus)}
                    className="py-2 flex items-start gap-3 cursor-pointer group"
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${wantBonus ? 'bg-[#00F0FF] border-[#00F0FF]' : 'bg-[#111318] border-[#1E2230] group-hover:border-white/40'}`}>
                      {wantBonus && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>
                    <div className="text-xs text-[#94A3B8] leading-relaxed select-none">
                      <strong className="text-white font-medium">ফ্রি বোনাস:</strong> ভবিষ্যতে ক্যারিয়ার ও সাইকোলজি রিসোর্সে ফ্রি অ্যাক্সেস পেতে চাই।
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
                  আপনার হোয়াটসঅ্যাপ উইন্ডো ওপেন হয়েছে। নিচের বাটনে ক্লিক করে সরাসরি ফাইলটি ডাউনলোড করুন।
                </p>

                <div className="pt-4">
                  <a
                    href={pdfDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-sm hover:brightness-110 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  >
                    <Download className="w-4 h-4 text-white stroke-[2.5]" />
                    <span>ই-বুক ডাউনলোড করুন</span>
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
