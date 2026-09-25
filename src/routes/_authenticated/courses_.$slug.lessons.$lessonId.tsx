import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "../../components/site/sections";
import { Link as LinkIcon, MessageSquare, ArrowLeft, Video, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/courses/$slug/lessons/$lessonId")({
  component: LessonPage,
});

function LessonPage() {
  const { slug } = Route.useParams();
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_slug", slug || "video-editing-batch-3")
        .order("lesson_order", { ascending: true });

      if (!error && data && data.length > 0) {
        setLessons(data);
        setCurrentLesson(data[0]); // প্রথম লেসনটি ডিফল্টভাবে সিলেক্ট হবে
      }
      setLoading(false);
    };

    fetchLessons();
  }, [slug]);

  // ইউটিউবের টাইটেল, শেয়ার ও লোগো হাইড করার লিংক ফরম্যাটার
  const formatVideoUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0];
    }

    if (!videoId) return url;

    // controls=1 (টাইমলাইন ও প্লে বাটন থাকবে), modestbranding=1, rel=0 (অন্য ভিডিও দেখাবে না), iv_load_policy=3
    return `https://www.youtube-nocookie.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=0&playsinline=1`;
  };

  const isLive = currentLesson?.type === "zoom" || currentLesson?.type === "meet";

  return (
    <SiteShell>
      <div className="aurora-soft min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-[var(--brand)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : lessons.length === 0 ? (
            <div className="sticky-card p-12 text-center rounded-2xl">
              <h2 className="text-xl font-bold mb-2">এখনো কোনো লেসন যোগ করা হয়নি!</h2>
              <p className="text-foreground/60">অ্যাডমিন প্যানেল থেকে খুব শীঘ্রই নতুন ক্লাস আপলোড করা হবে।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* মেইন কনটেন্ট এরিয়া */}
              <div className="lg:col-span-2 space-y-6">
                {!isLive ? (
                  <div 
                    className="sticky-card relative overflow-hidden !p-0 aspect-video bg-black rounded-2xl ring-1 ring-black/5 shadow-2xl select-none"
                    onContextMenu={(e) => e.preventDefault()} // রাইট-ক্লিক ও ভিডিও URL কপি ব্লক
                  >
                    {/* ১. টপ গার্ড: ওপরের টাইটেল, চ্যানেল আইকন ও শেয়ার বাটনে ক্লিক প্রতিরোধ করে */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-20 z-20 cursor-default"
                      onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
                      onContextMenu={(e) => e.preventDefault()}
                    />

                    {/* ২. বটম-রাইট গার্ড: নিচের ইউটিউব লোগো ও More Videos বাটনে ক্লিক বন্ধ করে */}
                    <div 
                      className="absolute bottom-0 right-0 w-36 h-12 z-20 cursor-default"
                      onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
                      onContextMenu={(e) => e.preventDefault()}
                    />

                    {/* ৩. আইফ্রেম প্লেয়ার (শুধু প্লে/পজ ও লাল টাইমলাইন কাজ করবে) */}
                    <iframe
                      src={formatVideoUrl(currentLesson?.video_url)}
                      title={currentLesson?.title}
                      className="w-full h-full relative z-0 pointer-events-auto"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="sticky-card p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-background border border-blue-500/20 flex flex-col items-center justify-center text-center gap-4 min-h-[300px]">
                    <div className={`p-4 rounded-full ${currentLesson?.type === "meet" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"}`}>
                      <Video className="w-12 h-12" />
                    </div>
                    <h2 className="text-2xl font-bold">{currentLesson?.title}</h2>
                    <p className="text-sm text-foreground/60 max-w-md">
                      এটি একটি {currentLesson?.type === "meet" ? "Google Meet" : "Zoom"} লাইভ সেশন। ক্লাসের সময়ে নিচের বাটনে ক্লিক করে সরাসরি যুক্ত হন।
                    </p>
                    <a
                      href={currentLesson?.zoom_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-2 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg ${
                        currentLesson?.type === "meet"
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25"
                      }`}
                    >
                      <LinkIcon className="w-4 h-4" />
                      Join {currentLesson?.type === "meet" ? "Google Meet" : "Zoom"} Class
                    </a>
                  </div>
                )}

                <div className="sticky-card p-6 rounded-2xl">
                  <div className="pin" style={{ "--pin-color": "var(--brand)" } as any} />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary">
                      Lesson {currentLesson?.lesson_order}
                    </span>
                    <span className="text-xs uppercase text-foreground/40 font-semibold tracking-wider">
                      {currentLesson?.type === "meet" ? "Google Meet Live" : currentLesson?.type === "zoom" ? "Zoom Live" : "Recorded Video"}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold mb-3">{currentLesson?.title}</h1>
                  <p className="text-foreground/60 leading-relaxed">
                    {currentLesson?.description || "অ্যাডভান্স ভিডিও এডিটিং ব্যাচ ৩ এর এই সেশনের রিসোর্স এবং অ্যাসাইনমেন্ট নিয়মিত প্র্যাকটিস করুন।"}
                  </p>
                </div>
              </div>

              {/* সাইডবার: লেসন প্লেলিস্ট ও সাপোর্ট */}
              <div className="space-y-6">
                <div className="sticky-card p-5 rounded-2xl border border-white/5">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-[var(--brand)]" />
                    কোর্স কনটেন্ট ({lessons.length} টি ক্লাস)
                  </h3>
                  <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                    {lessons.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrentLesson(item)}
                        className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${
                          currentLesson?.id === item.id
                            ? "bg-primary/15 border border-primary/30 text-primary font-semibold"
                            : "bg-white/5 hover:bg-white/10 text-foreground/80 border border-transparent"
                        }`}
                      >
                        <span className="text-xs font-mono opacity-60">#{item.lesson_order}</span>
                        <span className="text-sm line-clamp-1 flex-1">{item.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 uppercase font-medium">
                          {item.type === "meet" ? "Meet" : item.type === "zoom" ? "Zoom" : "Video"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sticky-card p-6 rounded-2xl">
                  <div className="pin" style={{ "--pin-color": "var(--mint)" } as any} />
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                    Community Support
                  </h3>
                  <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
                    ক্লাস সম্পর্কিত কোনো প্রশ্ন বা ফিডব্যাকের জন্য আমাদের প্রাইভেট কমিউনিটিতে পোস্ট করুন।
                  </p>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gloss-btn w-full justify-center text-sm py-2.5"
                  >
                    Community Group
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
