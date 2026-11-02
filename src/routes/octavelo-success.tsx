import { createFileRoute } from "@tanstack/react-router";
import { Download, ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/octavelo-success")({
  component: OctaveloSuccessPage,
});

function OctaveloSuccessPage() {
  const logoUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/octavelo-assets/Octavelo.webp";
  const coverUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/octavelo-assets/Ecoverrr.webp";
  
  // Links
  const pdfDownloadUrl = "https://drive.google.com/uc?export=download&id=1IENj2fMVU3l1l4X1gOAjO1UYxs1YW6lR"; 
  const telegramUrl = "https://t.me/+qhG2bNvc6sM0MjZl";

  // FACEBOOK PIXEL: Purchase Event Tracking (Kept exactly as requested)
  useEffect(() => {
    if (!(window as any).fbq) {
      !function(f:any,b:any,e:any,v:any,n:any,t:any,s:any)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      (window as any).fbq('init', '1584926862592432'); 
      (window as any).fbq('track', 'PageView');
    }
    
    (window as any).fbq('track', 'Purchase', {
      value: 99.00,
      currency: 'BDT',
      content_name: 'Psychological Masterclass E-Book'
    });
  }, []);

  return (
    <div
      className="min-h-screen text-zinc-100 flex flex-col antialiased relative font-bengali overflow-hidden bg-[#050608]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        .font-bengali { font-family: 'Hind Siliguri', sans-serif; font-display: swap; }
      `}</style>

      {/* BACKGROUND ELEMENTS: Inspired by the reference image */}
      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0052FF] opacity-[0.15] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#00F0FF] opacity-[0.1] blur-[80px] pointer-events-none rounded-full" />
      
      {/* Concentric Wireframe Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] border border-white/[0.03] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] border border-white/[0.03] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] sm:w-[1000px] sm:h-[1000px] border border-white/[0.02] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] sm:w-[1400px] sm:h-[1400px] border border-white/[0.02] rounded-full pointer-events-none" />

      {/* Dotted Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header */}
      <div className="w-full flex justify-center px-4 pt-4 sm:pt-6 relative z-20">
        <header className="flex w-full max-w-5xl items-center justify-between rounded-full border border-[#1E2230] bg-[#08090C]/60 backdrop-blur-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg">
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-5 relative z-20 w-full max-w-lg mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Verified Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF] text-xs font-bold font-mono tracking-wide mb-6 sm:mb-8 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
          <CheckCircle2 className="w-4 h-4" />
          <span>PAYMENT VERIFIED</span>
        </div>

        {/* Big Thank You Text (Removed Sparkles) */}
        <div className="relative mb-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none">
            Thank <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0052FF]">You!</span>
          </h1>
        </div>

        <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-10 max-w-sm">
          আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। মাস্টারক্লাসে আপনাকে স্বাগতম! নিচের বাটন থেকে আপনার ই-বুকটি সংগ্রহ করুন।
        </p>

        {/* Action Buttons (Pill Shaped) */}
        <div className="w-full flex flex-col gap-4">
          
          {/* Download Button (Primary Glossy Pill) */}
          <div className="relative group w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0052FF] to-[#00F0FF] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <a
              href={pdfDownloadUrl}
              className="relative w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00F0FF] text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all border border-[#00F0FF]/30 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>ই-বুকটি ডাউনলোড করুন</span>
            </a>
          </div>

          {/* Telegram Join Button (Secondary Dark Pill) - Text Updated */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-full bg-[#111318]/80 backdrop-blur-md text-[#00F0FF] font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-[#1A1D27] active:scale-95 transition-all border border-[#1E2230] hover:border-[#00F0FF]/30 shadow-lg"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>আমাদের টেলিগ্রাম কমিউনিটিতে যুক্ত হন</span>
          </a>

        </div>

        {/* Small Book Cover Thumbnail at the bottom */}
        <div className="mt-12 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-xs text-zinc-500 font-mono mb-3 uppercase tracking-widest">Your Purchase</span>
          <div className="w-16 h-auto rounded-md overflow-hidden border border-white/10 shadow-2xl">
            <img src={coverUrl} alt="E-book Cover" className="w-full h-auto block" />
          </div>
        </div>

      </main>
      
    </div>
  );
}
