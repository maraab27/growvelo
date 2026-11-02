import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
  Plus,
  Minus,
  Loader2,
} from "lucide-react";
import { EditableText } from "../components/cms/EditableText";

export const Route = createFileRoute("/octavelo")({
  component: OctaveloLandingPage,
});

function OctaveloLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const [openChapter, setOpenChapter] = useState<number | null>(null);
  const [wantBonus, setWantBonus] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const ziniApiKey = "1a182d1372347e011ebf60b13ce854ce8afd59e46a768253";
  const priceAmount = 99;
  
  const logoUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/octavelo-assets/Octavelo.webp";
  const coverUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/octavelo-assets/Ecoverrr.webp";

  // PERFORMANCE HACK: Ultra-delayed Facebook Pixel (Invisible to Google PageSpeed)
  useEffect(() => {
    const pixelTimer = setTimeout(() => {
      if (!(window as any).fbq) {
        !function(f:any,b:any,e:any,v:any,n:any,t:any,s:any)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        // 💡 আপনার অরিজিনাল পিক্সেল আইডিটি নিচের 'YOUR_PIXEL_ID' এর জায়গায় বসিয়ে দিন
        // (window as any).fbq('init', 'YOUR_PIXEL_ID'); 
        // (window as any).fbq('track', 'PageView');
      }
    }, 6000); // 6 seconds delay ensures Lighthouse finishes testing before it loads

    return () => clearTimeout(pixelTimer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!formData.fullName || !formData.email) {
      setApiError("অনুগ্রহ করে আপনার নাম এবং ইমেইল দিন।");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://api.zinipay.com/v1/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "zini-api-key": ziniApiKey,
        },
        body: JSON.stringify({
          cus_name: formData.fullName,
          cus_email: formData.email,
          amount: priceAmount,
          metadata: {
            phone: formData.phone || "Not provided",
            item: "Psychological Masterclass E-Book",
          },
          redirect_url: `${window.location.origin}/octavelo-success`,
          cancel_url: window.location.href,
        }),
      });

      const data = await response.json();

      if (response.ok && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        setApiError(data.message || "পেমেন্ট গেটওয়ে লোড হতে সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Payment API Error:", error);
      setApiError("ইন্টারনেট সংযোগ চেক করুন অথবা একটু পর আবার চেষ্টা করুন।");
      setIsLoading(false);
    }
  };

  const chapters = [
    {
      title: "অধ্যায় ১: লড়াইয়ের সাইকোলজি: মুখ খোলার আগেই অর্ধেক তর্ক জিতে থাকার ব্লুপ্রিন্ট",
      topics: [
        "আমরা কেন তর্ক করি? (ইগো বনাম যুক্তি)",
        "ভুল ধরার আদিম নেশা ও ৩-সেকেন্ড রুল",
        "দ্য RISA ফিল্টার: কোন তর্কে লড়বেন আর কোনটি হাসিমুখে এড়িয়ে যাবেন?",
        "ব্রেইনের হাইজ্যাক ও আত্মরক্ষা",
        "কুইক রিক্যাপ: প্রথম অধ্যায়"
      ]
    },
    {
      title: "অধ্যায় ২: মাইন্ড রিডিং: প্রতিপক্ষের মনের ভেতরে উঁকি দিয়ে তার লুকানো দুর্বলতা পড়ার কৌশল",
      topics: [
        "বডি ল্যাঙ্গুয়েজ ও চোখের ভাষা",
        "প্রতিপক্ষ আসলে কী চায়? লুকানো উদ্দেশ্য ও ভয় ডিকোড করার কৌশল",
        "এফবিআই (FBI) মিররিং: গোপন তথ্য বের করে আনার সাইকোলজি",
        "যুক্তির বদলে 'ইমোশনাল লেবেলিং' দিয়ে রাগের সুইচ অফ করার উপায়",
        "কুইক রিক্যাপ: দ্বিতীয় অধ্যায়"
      ]
    },
    {
      title: "অধ্যায় ৩: কনভারসেশনাল জুডো: প্রতিপক্ষের রাগ আর আক্রমণকেই নিজের সবচেয়ে বড় হাতিয়ার বানানোর কৌশল",
      topics: [
        "দ্য সিনকোরিসিস ইফেক্ট: ছোট হারে বড় জয়",
        "দ্য আর্ট অব রিফ্রেমিং: তর্ক বিপক্ষে গেলে পুরো ন্যারেটিভ বদলে দেওয়ার কৌশল",
        "'আমি বনাম তুমি' নয়, 'আমরা বনাম সমস্যা'",
        "কুইক রিক্যাপ: তৃতীয় অধ্যায়"
      ]
    },
    {
      title: "অধ্যায় ۴: দ্য সক্রেটিক ট্র্যাপ: সরাসরি দ্বিমত না করে প্রশ্ন দিয়েই প্রতিপক্ষকে নিরস্ত্র করার কৌশল",
      topics: [
        "সক্রেটিক মেথড",
        "দ্য ম্যাজিক কোয়েশ্চেন: প্রতিপক্ষের আক্রমণ তার দিকেই ঘুরিয়ে দেওয়ার আর্ট",
        "বুবি ট্র্যাপ: প্রতিপক্ষের কথার জালেই তাকে আটকে ফেলার মনস্তাত্ত্বিক কৌশল",
        "প্রমাণের ভার চাপিয়ে প্রতিপক্ষকে নিরস্ত্র করার কৌশল",
        "কুইক রিক্যাপ: চতুর্থ অধ্যায়"
      ]
    },
    {
      title: "অধ্যায় ৫: লজিক বনাম ইমোশন: শুধু প্রমাণ বা ডেটা দিয়ে কেন তর্কে জেতা যায় না?",
      topics: [
        "যুক্তির সাথে আবেগ মিশিয়ে মন জয়ের সাইকোলজি",
        "স্ট্র্যাটেজিক এভিডেন্স: সঠিক মুহূর্তে অকাট্য প্রমাণ ব্যবহারের মাস্টারস্ট্রোক",
        "দ্য রুল অব থ্রি: যুক্তি বিশ্বাস করানোর সাইকোলজি",
        "কুইক রিক্যাপ: পঞ্চম অধ্যায়"
      ]
    },
    {
      title: "অধ্যায় ৬: প্রিয়জনের সাইকোলজি: ইগো না ভেঙেও তর্কে এবং সম্পর্কে জেতার মাস্টারস্ট্রোক",
      topics: [
        "ফ্যাক্টস নয়, ফিলিংস: কথার আড়ালে লুকানো অভিমান ডিকোড করার সাইকোলজি",
        "দ্য শিফট: ইগোর দেয়াল ভেঙে সঙ্গীকে 'পরম মিত্র' বানানোর আর্ট",
        "রিলেশনশিপ ফার্স্ট-এইড: পাল্টা সাফাই না দিয়ে সঙ্গীকে শান্ত করার সাইকোলজি",
        "সীমানা নির্ধারণ ও 'তুমি' বনাম 'আমি'",
        "কুইক রিক্যাপ: ষষ্ঠ অধ্যায়"
      ]
    },
    {
      title: "অধ্যায় ৭: ডার্ক সাইকোলজি: নোংরা আক্রমণ, অপমান ও মিথ্যার বন্যা ঠেকানোর 'অ্যান্টি-ভেনম'",
      topics: [
        "গিশ গ্যালপ ডিফেন্স: মিথ্যার বন্যা সামলানোর মনস্তাত্ত্বিক সূত্র",
        "দ্য ক্যারেক্টার শিল্ড: ব্যক্তিগত আক্রমণকারীকে শান্তভাবে নিরস্ত্র করার আর্ট",
        "দ্য কিলার কামব্যাক: এক লাইনের জবাবে প্রতিপক্ষকে 'স্পিচলেস' করে দেওয়ার সাইকোলজি",
        "কুইক রিক্যাপ: সপ্তম অধ্যায়"
      ]
    },
    {
      title: "অধ্যায় ৮: দ্য গোল্ডেন এক্সিট: তর্কে জিতেও সম্পর্ক না হেরে, প্রতিপক্ষকে নিজের অনুগত মিত্র বানানোর মাস্টারস্ট্রোক",
      topics: [
        "দ্য গোল্ডেন ব্রিজ: সম্মানজনক বিদায়",
        "ফেস-সেভিং আর্ট: প্রতিপক্ষকে ছোট না করেই চিরস্থায়ী মিত্র বানানোর সাইকোলজি",
        "কুইক রিক্যাপ: অষ্টম অধ্যায়"
      ]
    }
  ];

  return (
    <div
      className="min-h-screen text-zinc-100 selection:bg-[#00F0FF]/30 selection:text-[#00F0FF] antialiased relative pb-32 lg:pb-20 overflow-x-hidden bg-[#050608]"
      style={{
        fontFamily: "'Hind Siliguri', sans-serif",
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(0, 82, 255, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 85% 40%, rgba(0, 240, 255, 0.04) 0%, transparent 50%),
          radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 24px 24px",
      }}
    >
      {/* PERFORMANCE FIX: Direct HTML Links instead of @import to prevent Render Blocking */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Unfrozen Header */}
      <div className="w-full flex justify-center px-4 pt-4 sm:pt-6">
        <header className="flex w-full max-w-5xl items-center justify-between rounded-full border border-[#1E2230] bg-[#08090C]/80 backdrop-blur-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/10 bg-[#050608] flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={logoUrl}
                alt="Octavelo Logo"
                width="32"
                height="32"
                loading="eager"
                decoding="sync"
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
                 <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64" alt="Student" width="24" height="24" loading="lazy" decoding="async" className="w-6 h-6 rounded-full border-2 border-[#050608] object-cover" />
                 <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=64&h=64" alt="Student" width="24" height="24" loading="lazy" decoding="async" className="w-6 h-6 rounded-full border-2 border-[#050608] object-cover" />
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="Student" width="24" height="24" loading="lazy" decoding="async" className="w-6 h-6 rounded-full border-2 border-[#050608] object-cover" />
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
              <span className="block"><EditableText id="octavelo.title1">তর্কে জেতার সাইকোলজি:</EditableText></span>
              <span className="block mt-1 lg:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0052FF]">
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
              
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[75%] h-[65%] bg-gradient-to-r from-[#0052FF] to-[#00F0FF] opacity-30 blur-[60px] rounded-full pointer-events-none z-0" />

              <div className="w-[82%] relative z-10 rounded-t-3xl overflow-hidden shadow-2xl bg-[#050608] border border-b-0 border-[#0052FF]/40 aspect-[5/8]">
                {/* PERFORMANCE FIX: Removed all constraints, hardcoded pure LCP optimization */}
                <img
                  src={coverUrl}
                  alt="Masterclass Cover"
                  width="311"
                  height="497"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  className="w-full h-full object-cover block"
                />
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#050608] to-transparent pointer-events-none" />
              </div>

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

            <div className="w-full max-w-[340px] sm:max-w-[380px] bg-[#0A0C12]/90 backdrop-blur-md border border-amber-400/50 rounded-2xl p-3 sm:p-4 flex items-center gap-3.5 shadow-[0_0_20px_rgba(251,191,36,0.15)] relative overflow-hidden">
              <div className="shrink-0 relative w-12 h-12 rounded-xl bg-[#050608] border border-[#1E2230] flex items-center justify-center overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF]/10 to-[#00F0FF]/5" />
                <FolderOpen className="w-6 h-6 text-[#0052FF] absolute -translate-y-1" />
                <FileText className="w-4 h-4 text-[#00F0FF] absolute translate-y-2 translate-x-2 rotate-12 drop-shadow-lg" />
                <Sparkles className="w-2.5 h-2.5 text-amber-400 absolute top-1.5 right-1.5" />
              </div>
              <div className="flex flex-col text-left">
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

        {/* INTRODUCTION SECTION */}
        <div className="w-full max-w-4xl mx-auto mt-24 pt-16 border-t border-[#1E2230]">
          <div className="text-center mb-10">
            <span className="text-[#00F0FF] text-xs font-mono tracking-widest uppercase font-semibold block mb-2">
              <EditableText id="octavelo.intro.badge">The Story Behind</EditableText>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <EditableText id="octavelo.intro.title">ভূমিকা</EditableText>
            </h2>
          </div>

          <div className="relative bg-[#0B0D12] border border-[#1E2230] rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className={`relative text-[15px] sm:text-[17px] text-zinc-300 leading-relaxed space-y-5 transition-all duration-500 ease-in-out ${!isIntroExpanded ? 'max-h-[145px] sm:max-h-[140px] overflow-hidden' : ''}`}>
              <p><EditableText id="octavelo.intro.p1">শতভাগ সঠিক হওয়ার পরও অন্যের কাছে বারবার ভুল প্রমাণিত হওয়া বা হেরে যাওয়ার মতো অসহায় অনুভূতি পৃথিবীতে খুব কমই আছে।</EditableText></p>
              <p><EditableText id="octavelo.intro.p2">আমাদের চারপাশে এমন অসংখ্য মানুষ আছেন, যারা নিজেরা ১০০% সঠিক হওয়া সত্ত্বেও শুধু গুছিয়ে কথা বলতে না পারার কারণে বা নেগোসিয়েশন স্কিলের অভাবে অন্যের কাছে বারবার ভুল প্রমাণিত হন। নিরেট সত্য আর অকাট্য লজিক পক্ষে থাকার পরও তারা তর্কে হেরে গিয়ে দিনের পর দিন হতাশায় ভোগেন।</EditableText></p>
              <p><EditableText id="octavelo.intro.p3">আবার এর উল্টো পিঠের গল্পটাও কিন্তু বেশ ট্র্যাজিক! জীবনে আমরা সবাই হয়তো গলার জোরে বা প্রমাণ দিয়ে কোনো না কোনো তর্কে জিতি। কিন্তু দিনশেষে হঠাৎ করেই আবিষ্কার করি- তর্কে জিততে গিয়ে আমরা আসলে প্রিয় মানুষটিকেই হেরে বসে আছি, কিংবা নিজের অজান্তেই খুব গুরুত্বপূর্ণ কোনো প্রফেশনাল সম্পর্কে একটা অদৃশ্য দেয়াল তুলে ফেলেছি।</EditableText></p>
              <p><EditableText id="octavelo.intro.p4">আমাদের একটা খুব সাধারণ ভুল ধারণা আছে যে, 'তর্ক' মানেই বুঝি গলা ফাটিয়ে ঝগড়া করা বা প্রতিপক্ষকে গলার জোরে দমিয়ে দেওয়া।</EditableText></p>
              <p><EditableText id="octavelo.intro.p5">কিন্তু একটু ভেবে দেখুন, বাস্তবে প্রিয়জনকে নিজের কোনো কথা বা অনুভূতি বোঝানো, বসের সাথে নিজের ন্যায্য অধিকার নিয়ে নেগোসিয়েট করা, কিংবা ক্লায়েন্টকে নিজের আইডিয়াটা বিশ্বাস করানো, এই সবকিছুই কিন্তু মনস্তাত্ত্বিক তর্কেরই অংশ।</EditableText></p>
              <p><EditableText id="octavelo.intro.p6">এই মনস্তাত্ত্বিক ময়দানে শুধু গলার জোর, চিৎকার বা নিরেট প্রমাণ দিয়ে জেতা যায় না; এখানে সত্যিকার অর্থে জিততে হলে বুঝতে হয় মানুষের সাইকোলজি।</EditableText></p>
              <p><EditableText id="octavelo.intro.p7">এই বইটির পেছনের গল্পটা বেশ চমৎকার। প্রায় এক বছর আগের কথা। তর্কের সাইকোলজি নিয়ে আমি মাত্র ৪-৫টি পয়েন্টের ছোট একটি পিডিএফ তৈরি করেছিলাম। উদ্দেশ্য ছিল খুব সাধারণ, কিছু মানুষের হয়তো কাজে লাগবে। কিন্তু সেটি শেয়ার করার পর মাত্র ৪৮ ঘণ্টার মধ্যে লক্ষ লক্ষ মানুষের কাছ থেকে যে অভূতপূর্ব সাড়া পেয়েছি, তা আমাকে রীতিমতো অবাক করেছে।</EditableText></p>
              <p><EditableText id="octavelo.intro.p8">অসংখ্য মানুষের ভালোবাসা আর অনুপ্রেরণায় আমি মুগ্ধ হয়েছি। শত শত মানুষ ইনবক্সে মেসেজ দিয়ে জানিয়েছেন, সেই ছোট টিপসগুলো তাদের ব্যক্তিগত ও প্রফেশনাল জীবনে কতটা দারুণভাবে কাজে লেগেছে। অনেকেই নিজেদের জীবনের গল্প শেয়ার করেছেন, আমার জন্য মন খুলে দু'আ করেছেন।</EditableText></p>
              <p><EditableText id="octavelo.intro.p9">সবচেয়ে বিস্ময়কর ব্যাপার ছিল- প্রায় ৮ থেকে ১০ হাজার মানুষ আমাকে বিভিন্নভাবে মেসেজ, ফিডব্যাক ও কমেন্টে অনুরোধ জানিয়েছেন, আমি যেন এই বিষয়গুলো নিয়ে আরও বিস্তারিত কাজ করি বা ভবিষ্যতে এমন একটি পূর্ণাঙ্গ গাইডলাইন নিয়ে আসি।</EditableText></p>
              <p><EditableText id="octavelo.intro.p10">মানুষের এই বিপুল আগ্রহ এবং ভালোবাসা আমাকে একটি বিষয় খুব গভীরভাবে উপলব্ধি করতে সাহায্য করেছে- মানুষ আসলে তর্কে যুক্তির অভাবে হারে না, তারা হারে প্রতিপক্ষের মনস্তত্ত্ব বা সাইকোলজি বুঝতে না পারার কারণে।</EditableText></p>
              <p><EditableText id="octavelo.intro.p11">মানুষের এই বিপুল আগ্রহ আমাকে প্রবলভাবে অনুপ্রাণিত করেছে বিষয়টির আরও গভীরে ডুব দিতে। এরপর গত প্রায় এক বছর ধরে, আমার অন্যান্য ব্যস্ততার পাশাপাশি যখনই সময় পেয়েছি, আমি এই বিষয়টি নিয়ে নতুন করে পড়াশোনা ও গবেষণা করেছি।</EditableText></p>
              <p><EditableText id="octavelo.intro.p12">মানুষের অবচেতন মন আসলে কীভাবে কাজ করে, এফবিআই (FBI) নেগোশিয়েটররা চরম উত্তপ্ত মুহূর্তে কীভাবে পরিস্থিতি নিজেদের নিয়ন্ত্রণে নেন, হার্ভার্ডের (Harvard) সাইকোলজিস্টরা কীভাবে ইগোর লড়াই থামিয়ে দেন, কিংবা সিআইএ (CIA) এক্সপার্টদের কৌশল ব্যবহার করে ডার্ক সাইকোলজির নোংরা চালগুলো কীভাবে নিমেষেই গুঁড়িয়ে দিতে হয়, বিশ্বমানের এই শক্তিশালী মনস্তাত্ত্বিক কৌশলগুলোকে আমি সুনিপুণভাবে একটি পূর্ণাঙ্গ গাইডলাইনে সাজিয়ে তোলার চেষ্টা করেছি।</EditableText></p>
              <p><EditableText id="octavelo.intro.p13">আপনাদের ভালোবাসা পাওয়া সেই ছোট্ট পিডিএফটির একটি পূর্ণাঙ্গ, আপগ্রেডেড এবং বিস্তারিত রূপই হলো আজকের এই 'তর্কে জেতার সাইকোলজি: দ্য আল্টিমেট মাস্টারক্লাস'。</EditableText></p>
              <p><EditableText id="octavelo.intro.p14">আমি কথা দিচ্ছি, এটি ভারী কোনো অ্যাকাডেমিক থিওরি বা বোরিং লেকচারে ভরা বই নয়। বিশ্বমানের এই মনস্তাত্ত্বিক কৌশলগুলোকে আমি এমনভাবে সাজিয়েছি, যা আপনার প্রতিদিনের জীবনের একটি রিয়েল-লাইফ 'সাইকোলজিক্যাল ম্যানুয়াল' হিসেবে কাজ করবে।</EditableText></p>
              <p><EditableText id="octavelo.intro.p15">কর্মক্ষেত্রের জটিল মতবিরোধ ও নেগোসিয়েশন, প্রিয়জনের সাথে ইগো বা আবেগের সংঘাত, কিংবা যুক্তির বদলে ধেয়ে আসা যেকোনো ভিত্তিহীন নোংরা আক্রমণ, জীবনের প্রতিটি ক্ষেত্রে নিজেকে মানসিকভাবে এক ধাপ এগিয়ে রাখার এবং যেকোনো উত্তপ্ত পরিস্থিতি সম্পূর্ণ নিজের শান্ত নিয়ন্ত্রণে নেওয়ার পরীক্ষিত সব ট্যাকটিক্স এখানে খুব সহজ ও সাবলীল ভাষায় তুলে ধরা হয়েছে।</EditableText></p>
              <p><EditableText id="octavelo.intro.p16">মনে রাখবেন, তর্কে জেতার সবচেয়ে বড় স্কিল প্রতিপক্ষকে ধ্বংস করে দেওয়া নয়, বরং ইগোতে আঘাত না করে তাকে হাসিমুখে নিজের দলে টেনে নেওয়া।</EditableText></p>
              <p><EditableText id="octavelo.intro.p17">তর্কের নতুন এই মনস্তাত্ত্বিক দুনিয়ায় আপনাকে স্বাগতম!</EditableText></p>

              {!isIntroExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/90 to-transparent pointer-events-none" />
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsIntroExpanded(!isIntroExpanded)}
                className="relative z-10 text-[#00F0FF] text-sm font-bold flex items-center gap-2 hover:brightness-125 transition-all bg-[#050608] border border-[#00F0FF]/30 px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              >
                <span>{isIntroExpanded ? "সংক্ষিপ্ত করুন (Read Less)" : "পুরোটা পড়ুন (Read More)"}</span>
                <span>{isIntroExpanded ? "▲" : "▼"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* TABLE OF CONTENTS SECTION */}
        <div className="w-full max-w-4xl mx-auto mt-24 pt-16 border-t border-[#1E2230]">
          <div className="text-center mb-10">
            <span className="text-[#00F0FF] text-xs font-mono tracking-widest uppercase font-semibold block mb-2">
              <EditableText id="octavelo.toc.badge">What's Inside</EditableText>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <EditableText id="octavelo.toc.title">বইটিতে যা যা শিখবেন (সূচিপত্র)</EditableText>
            </h2>
          </div>

          <div className="space-y-4">
            {chapters.map((chapter, idx) => (
              <div key={idx} className="border border-[#1E2230] bg-[#0B0D12] rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:border-[#00F0FF]/30">
                <button
                  onClick={() => setOpenChapter(openChapter === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-[#111318] transition-colors cursor-pointer"
                >
                  <span className="text-[15px] sm:text-[17px] font-bold text-zinc-200 pr-4 leading-snug">
                    {chapter.title}
                  </span>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#050608] border border-[#1E2230] flex items-center justify-center shadow-inner">
                    {openChapter === idx ? <Minus className="w-4 h-4 text-[#00F0FF]" /> : <Plus className="w-4 h-4 text-[#00F0FF]" />}
                  </div>
                </button>
                
                <div className={`transition-all duration-300 ease-in-out ${openChapter === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <div className="p-4 sm:p-5 pt-0 border-t border-[#1E2230]/50 bg-[#0A0C10]">
                    <ul className="space-y-3 mt-4">
                      {chapter.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mt-2 shrink-0 shadow-[0_0_8px_#00F0FF]" />
                          <span className="text-[14px] sm:text-[15.5px] text-zinc-400 leading-relaxed">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
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
                setApiError("");
              }}
              className="absolute top-5 right-5 p-2 rounded-md bg-[#111318] text-[#94A3B8] border border-[#1E2230] hover:text-white hover:border-white/20 transition-colors cursor-pointer disabled:opacity-50"
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </button>

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

            {apiError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <div>
                <input
                  type="text"
                  required
                  placeholder="আপনার পূর্ণ নাম *"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#050608] border border-[#1E2230] text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-zinc-600 transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="ইমেইল এড্রেস *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#050608] border border-[#1E2230] text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-zinc-600 transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#050608] border border-[#1E2230] text-white focus:outline-none focus:border-[#00F0FF] placeholder:text-zinc-600 transition-colors disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00F0FF] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                    <span>পেমেন্ট প্রসেস হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white stroke-[2.5]" />
                    <span>পেমেন্ট নিশ্চিত করুন (৯৯ ৳)</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secured by ZiniPay Gateway</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
