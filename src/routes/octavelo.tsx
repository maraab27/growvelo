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
  Flame,
  BookOpen,
  FileText,
  Smartphone,
  Send,
  Zap,
  Award,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/octavelo")({
  component: OctaveloLandingPage,
});

function OctaveloLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"bKash" | "Nagad">("bKash");
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    trxId: "",
  });

  const paymentNumber = "01790055690";
  const supportWhatsapp = "8801410341220";
  // আপনার পিডিএফ ফাইলের আসল ডাউনলোড লিংক এখানে বসাবেন
  const pdfDownloadUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/gallery/masterclass_guide.pdf";

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.trxId) {
      alert("অনুগ্রহ করে আপনার নাম, হোয়াটসঅ্যাপ নম্বর এবং TrxID দিন।");
      return;
    }

    const message = `Hello Octavelo! I purchased the Masterclass PDF Guide.
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email || "N/A"}
Method: ${selectedMethod} Personal
TrxID: ${formData.trxId}`;

    const whatsappUrl = `https://wa.me/${supportWhatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-orange-500 selection:text-white font-sans antialiased overflow-x-hidden relative">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-orange-600/25 via-amber-600/10 to-transparent blur-[140px] -z-10" />
      <div className="pointer-events-none fixed top-1/2 -right-40 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] -z-10" />

      {/* Minimal Standalone Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#070709]/75 border-b border-orange-500/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-black text-black shadow-lg shadow-orange-500/25">
              O
            </div>
            <span className="font-extrabold text-xl tracking-wider uppercase font-mono">
              OCTA<span className="text-orange-500">VELO</span>
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-md shadow-orange-500/20 cursor-pointer flex items-center gap-1.5"
          >
            <span>পিডিএফ পান (২৯৯৳)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
          <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
          <span>এক্সক্লুসিভ ডিজিটাল মাস্টারক্লাস গাইড বুকলেট</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] max-w-4xl mx-auto mb-6">
          সঠিক কাঠামোর অভাবে কি আপনার{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400">
            ক্লায়েন্ট ও আর্নিং আটকে যাচ্ছে?
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
          এলোমেলো রিসোর্স দেখা বন্ধ করে আয়ত্ত করুন ইন্ডাস্ট্রি-স্ট্যান্ডার্ড ফ্রেমওয়ার্ক। কোনো দীর্ঘ লগইন ঝামেলা ছাড়াই সম্পূর্ণ অ্যাকশনেবল ব্লুপ্রিন্ট সংগ্রহ করুন মাত্র ১ ক্লিকে।
        </p>

        {/* Pricing & CTA Card */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="flex items-baseline gap-2.5 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <span className="text-3xl font-extrabold font-mono text-white">২৯৯৳</span>
            <span className="text-sm text-zinc-500 line-through font-mono">৯৯৯৳</span>
            <span className="px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
              ৭০% ছাড়
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>ইনস্ট্যান্ট পিডিএফ ডাউনলোড করুন</span>
          </button>
        </div>

        {/* 3D Mockup Visual Display Card */}
        <div className="relative mx-auto max-w-3xl rounded-3xl p-1 bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-2xl shadow-orange-500/10">
          <div className="rounded-[22px] bg-[#0c0c10] p-6 sm:p-10 border border-white/5 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-mono tracking-widest text-orange-400 uppercase font-semibold">
                  Complete Blueprint Included
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  ভেতরে যা যা পাবেন:
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>স্টেপ-বাই-স্টেপ প্র্যাকটিক্যাল রোডম্যাপ ও ফ্রেমওয়ার্ক</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>হাই-টিকেটিং ক্লায়েন্ট হান্টিং চেকলিস্ট ও আউটরিচ মেসেজ</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>কাজের কোয়ালিটি এবং ভ্যালু বৃদ্ধির গোপন প্রসেস</span>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-5 flex justify-center">
                <div className="w-48 sm:w-56 aspect-[3/4] rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-orange-500/30 p-5 shadow-2xl flex flex-col justify-between relative group hover:border-orange-500 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <BookOpen className="w-5 h-5 text-orange-400/80" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Octavelo Edition</span>
                    <h4 className="text-sm font-bold text-white mt-1">Masterclass Guidebook</h4>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px] text-zinc-400">
                    <span>Verified Format</span>
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">কেন এই গাইডটি আপনার প্রয়োজন?</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">ফালতু তথ্যের ভিড় এড়িয়ে মূল কাজে ফোকাস করুন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-colors">
            <Zap className="w-6 h-6 text-orange-400 mb-4" />
            <h3 className="font-bold text-base mb-2">শূন্য থেকে শুরু</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              কোনো জটিল টেকনিক্যাল পরিভাষা ছাড়াই সহজ বাংলায় স্টেপ-বাই-স্টেপ এক্সপ্লেইন করা।
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-colors">
            <Award className="w-6 h-6 text-orange-400 mb-4" />
            <h3 className="font-bold text-base mb-2">ক্লায়েন্ট কনভার্শন</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              সস্তা দরে বিড না করে প্রিমিয়াম ক্লায়েন্ট ডিল ক্লোজ করার কার্যকর ফ্রেমওয়ার্ক।
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-colors">
            <ShieldCheck className="w-6 h-6 text-orange-400 mb-4" />
            <h3 className="font-bold text-base mb-2">লাইফটাইম রেফারেন্স</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              একবার ডাউনলোড করে যেকোনো ডিভাইসে আজীবন যখন ইচ্ছা তখন পড়ার পূর্ণ সুযোগ।
            </p>
          </div>
        </div>
      </section>

      {/* Minimal Bottom CTA & Footer */}
      <footer className="border-t border-white/10 py-12 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h3 className="text-xl font-bold">দেরি না করে আজই কপিটি সংগ্রহ করুন</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-sm shadow-lg shadow-orange-500/25 hover:brightness-110 transition-all cursor-pointer"
          >
            ২৯৯ টাকায় পিডিএফ পান
          </button>
          <p className="text-xs text-zinc-600 pt-4">
            © 2026 Octavelo Studio. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Direct Guest Purchase Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg rounded-3xl bg-[#0c0c11] border border-orange-500/30 p-6 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-orange-400">Octavelo Instant Checkout</span>
                  <div className="text-3xl font-black font-mono text-white mt-1">২৯৯ ৳</div>
                  <h3 className="text-sm font-semibold text-zinc-300 mt-1">
                    মাস্টারক্লাস পিডিএফ গাইডবুক সংগ্রহ করুন
                  </h3>
                </div>

                {/* Method Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-white/[0.03] border border-white/10 mb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("bKash")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedMethod === "bKash"
                        ? "bg-[#E2136E] text-white shadow-md"
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
                        ? "bg-[#F7921E] text-white shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Nagad (নগদ)
                  </button>
                </div>

                {/* Send Money Number Card */}
                <div className="rounded-2xl p-4 border border-orange-500/20 bg-orange-500/5 mb-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">
                      সেন্ড মানি নম্বর ({selectedMethod}):
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-[11px] font-mono font-bold text-orange-400">
                      Personal
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 bg-black/60 p-2.5 rounded-xl border border-white/10">
                    <code className="text-sm sm:text-base font-mono font-bold tracking-wider text-white">
                      {paymentNumber}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-3 py-1.5 text-xs rounded-lg bg-white/10 flex items-center gap-1.5 text-white hover:bg-orange-500 hover:text-black transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>দয়া করে <strong>"Send Money" (সেন্ড মানি)</strong> করবেন। এটি পার্সোনাল নম্বর।</span>
                </div>

                {/* Purchase Form */}
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">আপনার পূর্ণ নাম</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মাহিম মারাব"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 mb-1">হোয়াটসঅ্যাপ নম্বর</label>
                      <input
                        type="tel"
                        required
                        placeholder="01XXXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">ইমেইল (ঐচ্ছিক)</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Transaction ID (TrxID) *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: BL92XK82"
                      value={formData.trxId}
                      onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-orange-500/25"
                  >
                    <Send className="w-4 h-4" />
                    <span>পেমেন্ট সম্পন্ন ও পিডিএফ আনলক করুন</span>
                  </button>
                </form>
              </>
            ) : (
              /* Success / Instant Download Window */
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">ধন্যবাদ! পেমেন্ট রিকোয়েস্ট গৃহীত হয়েছে</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  আপনার হোয়াটসঅ্যাপ উইন্ডো ওপেন হয়েছে। আপনি এখনই সরাসরি নিচের বাটনটি থেকে আপনার পিডিএফ ফাইল ডাউনলোড করে নিতে পারেন।
                </p>

                <div className="pt-2">
                  <a
                    href={pdfDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-black font-extrabold text-sm hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>পিডিএফ এখনই ডাউনলোড করুন</span>
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
