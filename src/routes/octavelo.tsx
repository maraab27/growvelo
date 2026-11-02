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

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const ziniApiKey = "1a182d1372347e011ebf60b13ce854ce8afd59e46a768253";
  const priceAmount = 99;
  
  const logoUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/octavelo-assets/Octavelo.webp";
  // UPDATED: New Optimized E-Book Cover Image URL
  const coverUrl = "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/octavelo-assets/Ecoverrr.webp";

  // PERFORMANCE OPTIMIZATION: Google Fonts Preconnect & Delayed Facebook Pixel
  useEffect(() => {
    // 1. Inject Google Fonts Preconnect directly into the head
    if (!document.querySelector('link[href="https://fonts.googleapis.com"]')) {
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect1);
    }
    if (!document.querySelector('link[href="https://fonts.gstatic.com"]')) {
      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect2);
    }

    // 2. Delay Facebook Pixel to prevent Render Blocking (Loads after 3.5 seconds)
    const fbTimer = setTimeout(() => {
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
    }, 3500);

    return () => clearTimeout(fbTimer);
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
      title: "অধ্যায় ৪: দ্য সক্রেটিক ট্র্যাপ: সরাসরি দ্বিমত না করে প্রশ্ন দিয়েই প্রতিপক্ষকে নিরস্ত্র করার কৌশল",
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
  
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const [openChapter, setOpenChapter] = useState<number | null>(null);

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
        .font-bengali { font-family: 'Hind Siliguri', sans-serif; font-display: swap; }
      `}</style>

      {/* Unfrozen Header */}
      <div className="w-full flex justify-center px-4 pt-4 sm:pt-6">
        <header className="flex w-full max-w-5xl items-center justify-between rounded-full border border-[#1E2230] bg-[#08090C]/80 backdrop-blur-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/10 bg-[#050608] flex items-center justify-center overflow-hidden shrink-0">
              <img
