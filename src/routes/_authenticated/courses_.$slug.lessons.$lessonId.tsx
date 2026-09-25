import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "../../components/site/sections";
import { Calendar, Link as LinkIcon, MessageSquare, ArrowLeft, Video, PlayCircle } from "lucide-react";
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
        setCurrentLesson(data[0]); // ডিফল্টভাবে প্রথম লেসনটি সিলেক্ট হবে
      }
      setLoading(false);
    };

    fetchLessons();
  }, [slug]);

  // ইউটিউব নরমাল লিংককে এমবেড লিংকে কনভার্ট করার হেল্পার
  const formatVideoUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("embed")) return url;
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/")) return url.replace("youtu.be/", "www.youtube.com/embed/");
    return url;
  };

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
                {currentLesson?.type === "video" ? (
                  <div className="sticky-card overflow-hidden !p-0 aspect-video bg-black rounded-2xl ring-1 ring-black/5 shadow-2xl">
                    <iframe
                      src={formatVideoUrl(currentLesson.video_url)}
                      title={currentLesson.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="sticky-card p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-background border border-blue-500/20 flex flex-col items-center justify-center text-center gap-4 min-h-[300px]">
                    <div className="p-4 rounded-full bg-blue-500/10 text-blue-400">
                      <Video className="w-12 h-12" />
                    </div>
                    <h2 className="text-2xl font-bold">{currentLesson?.title}</h2>
                    <p className="text-sm text-foreground/60 max-w-md">
                      এটি একটি লাইভ জুম সেশন। ক্লাসের সময়ে নিচের বাটনে ক্লিক করে সরাসরি জুমে যুক্ত হন।
                    </p>
                    <a
                      href={currentLesson?.zoom_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/25"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Join Live Zoom Class
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
                      {currentLesson?.type === "zoom" ? "Live Session" : "Recorded Video"}
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
                {/* লেসন প্লেলিস্ট */}
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
                          {item.type}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ফেসবুক সাপোর্ট কার্ড */}
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
