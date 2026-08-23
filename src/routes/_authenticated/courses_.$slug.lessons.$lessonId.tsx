import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "../../../components/site/sections";
import { Youtube, Calendar, Link as LinkIcon, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/courses_/$slug/lessons/$lessonId")({
  component: LessonPage,
});

function LessonPage() {
  const { slug, lessonId } = Route.useParams();

  // Mock lesson data - in a real app, this would come from a database/API
  const lesson = {
    title: "ভিডিও এডিটিং কি এবং কেন?",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    zoomLink: "https://zoom.us/j/123456789",
    zoomTime: "রাত ৯:০০ টা",
  };

  return (
    <SiteShell>
      <div className="aurora-soft min-h-screen pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link 
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-[var(--brand)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="sticky-card overflow-hidden !p-0 aspect-video bg-black rounded-2xl ring-1 ring-black/5 shadow-2xl">
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="sticky-card p-6">
                <div className="pin" style={{"--pin-color": "var(--brand)"} as any} />
                <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
                <p className="text-foreground/60">
                  এই লেসনে আমরা শিখব ভিডিও এডিটিং এর বেসিক বিষয়গুলো এবং কেন এটি বর্তমান সময়ে এত গুরুত্বপূর্ণ।
                </p>
              </div>
            </div>

            {/* Sidebar: Zoom & Schedules */}
            <div className="space-y-6">
              <div className="sticky-card p-6 border-l-4 border-l-blue-500">
                <div className="pin" style={{"--pin-color": "rgb(59, 130, 246)"} as any} />
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Live Zoom Class
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-blue-500/5 ring-1 ring-blue-500/10">
                    <div className="text-sm font-semibold text-blue-600 mb-1">পরবর্তী ক্লাস:</div>
                    <div className="text-lg font-bold">{lesson.zoomTime}</div>
                  </div>
                  <a 
                    href={lesson.zoomLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gloss-btn w-full justify-center gap-2 py-3 !bg-blue-600 !text-white hover:!bg-blue-700"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Join Zoom Class
                  </a>
                </div>
              </div>

              <div className="sticky-card p-6">
                <div className="pin" style={{"--pin-color": "var(--mint)"} as any} />
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  Support
                </h3>
                <p className="text-sm text-foreground/60 mb-4">
                  আপনার কোনো প্রশ্ন থাকলে আমাদের ফেসবুক গ্রুপে পোস্ট করুন।
                </p>
                <a 
                  href="#"
                  className="gloss-btn w-full justify-center text-sm py-2"
                >
                  Facebook Group
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
