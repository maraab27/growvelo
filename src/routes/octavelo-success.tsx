import { createFileRoute } from "@tanstack/react-router";
import { Download, ShieldCheck, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/octavelo-success")({
  component: OctaveloSuccessPage,
});

function OctaveloSuccessPage() {
  const logoUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/octavelo-assets/Octavelo.webp";
  const coverUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/octavelo-assets/ecover.webp";
  
  // আপনার জেনারেট করা গুগল ড্রাইভের ডাইরেক্ট ডাউনলোড লিংক
  const pdfDownloadUrl = "https://drive.google.com/uc?export=download&id=1IENj2fMVU3l1l4X1gOAjO1UYxs1YW6lR"; 

  return (
    <div
      className="min-h-screen text-zinc-100 flex flex-col antialiased relative font-bengali overflow-x-hidden"
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

      {/* Header */}
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
              OCTAVELO
            </span>
          </div>
          <a
            href="/octavelo"
            className="text-[#94A3B8] hover:text-white text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </a>
        </header>
      </div>

      {/* Success Content */}
      <main className="flex-1 flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-[#0A0C12]/90 backdrop-blur-2xl border border-[#1E2230] rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,240,255,0.05)] text-center relative overflow-hidden">
          
          {/* Subtle Top Glow */}
          <div className="absolute top-0 inset-x-1/4 h-px bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-50" />
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#00F0FF]/5 to-transparent pointer-events-none" />

          {/* Success Icon */}
          <div className="w-16 h-16 bg-[#00F0FF]/10 text-[#00F0FF] rounded-2xl flex items-center justify-center mx-auto border border-[#00F0FF]/30 mb-6 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <ShieldCheck className="w-8 h-8 stroke-[2]" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 leading-tight">পেমেন্ট সফল হয়েছে!</h1>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-8">
            'তর্কে জেতার সাইকোলজি: দ্য আল্টিমেট মাস্টারক্লাস' ই-বুকটি কেনার জন্য আপনাকে ধন্যবাদ। নিচের বাটন থেকে বইটি ডাউনলোড করে নিন।
          </p>

          {/* Book Cover Thumbnail */}
          <div className="w-32 mx-auto rounded-lg overflow-hidden border border-[#1E2230] shadow-xl mb-8">
            <img src={coverUrl} alt="E-book Cover" className="w-full h-auto block" />
          </div>

          {/* Download Button */}
          <a
            href={pdfDownloadUrl}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-base flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] border border-[#00F0FF]/30"
          >
            <Download className="w-5 h-5" />
            <span>ই-বুকটি ডাউনলোড করুন</span>
          </a>

        </div>
      </main>
      
    </div>
  );
}
