import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Play, Check, ArrowLeft, CalendarDays, Clock, User, X, Smartphone, Mail, Hash } from "lucide-react";
import { SiteShell, COURSES } from "../components/site/sections";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EditableText } from "@/components/cms/EditableText";

function EnrollmentModal({ courseSlug, onClose, onSuccess }: { courseSlug: string, onClose: () => void, onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
      }
    };
    fetchUser();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("অনুগ্রহ করে আগে লগইন করুন।");
        setLoading(false);
        return;
      }

      const response = await fetch('/api/public/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          courseSlug,
          bkashNumber,
          transactionId,
          userId: user.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.error("আপনি ইতিমধ্যে এই কোর্সের জন্য আবেদন করেছেন।");
        } else {
          toast.error(result.error || "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        }
      } else {
        toast.success("আবেদন জমা হয়েছে! অনুমোদন হলে আপনাকে জানানো হবে।");
        onSuccess();
      }
    } catch (err) {
      toast.error("Error submitting enrollment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="sticky-card tint-brand relative w-full max-w-md overflow-hidden p-6 sm:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 text-foreground/40 hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
        <h2 className="font-display text-xl font-bold">কোর্সে এনরোল করুন</h2>
        <p className="mt-2 text-sm text-foreground/60">বিকাশ পেমেন্ট করার পর নিচের ফর্মটি পূরণ করুন।</p>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
              <input 
                required type="email" value={email} onChange={e => setEmail(e.target.value)}
                readOnly
                className="w-full rounded-xl bg-white/50 py-2.5 pl-10 pr-4 text-sm ring-1 ring-black/5 focus:outline-hidden focus:ring-[var(--brand)]/50 opacity-70 cursor-not-allowed"
                placeholder="yourname@gmail.com"

              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">bKash Number (From where you paid)</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
              <input 
                required type="text" value={bkashNumber} onChange={e => setBkashNumber(e.target.value)}
                className="w-full rounded-xl bg-white/50 py-2.5 pl-10 pr-4 text-sm ring-1 ring-black/5 focus:outline-hidden focus:ring-[var(--brand)]/50"
                placeholder="01XXXXXXXXX"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">Transaction ID (TrxID)</label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
              <input 
                required type="text" value={transactionId} onChange={e => setTransactionId(e.target.value)}
                className="w-full rounded-xl bg-white/50 py-2.5 pl-10 pr-4 text-sm ring-1 ring-black/5 focus:outline-hidden focus:ring-[var(--brand)]/50"
                placeholder="AKJ7HS8D..."
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="gloss-btn w-full justify-center disabled:opacity-50"
          >
            {loading ? "জমা হচ্ছে..." : "এনরোলমেন্ট রিকোয়েস্ট পাঠান"}
          </button>
        </form>
      </div>
    </div>
  );
}

function CourseDetail() {
  const { slug } = Route.useParams();
  const course = COURSES.find((c) => c.slug === slug)!;
  const [enrolled, setEnrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const checkEnrollment = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { data } = await supabase
        .from('course_enrollments')
        .select('status')
        .eq('user_id', session.user.id)
        .eq('course_slug', slug)
        .eq('status', 'approved')
        .maybeSingle();
      
      if (data) setEnrolled(true);


    };
    checkEnrollment();
  }, [slug]);

  const totalLessons = course.modules.reduce((n, m) => n + m.lessons.length, 0);
  const freeLessons = course.modules.reduce((n, m) => n + m.lessons.filter((l) => l.free).length, 0);

  return (
    <SiteShell>
      {showModal && (
        <EnrollmentModal 
          courseSlug={slug} 
          onClose={() => setShowModal(false)} 
          onSuccess={() => setShowModal(false)}
        />
      )}

      {showLockedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="sticky-card tint-brand relative w-full max-w-md overflow-hidden p-6 sm:p-8">
            <button onClick={() => setShowLockedModal(false)} className="absolute right-4 top-4 text-foreground/40 hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)]/10 text-[var(--brand)]">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold">এই লেসনটি লক করা আছে</h2>
            <p className="mt-2 text-sm text-foreground/70">
              পুরো কোর্সের এক্সেস পেতে এবং এই লেসনটি দেখতে আপনাকে কোর্সে এনরোল করতে হবে। এই কোর্সে আপনি পাবেন {totalLessons}টি লেসন, লাইভ সাপোর্ট এবং আরও অনেক কিছু।
            </p>
            <div className="mt-8 space-y-3">
              <button 
                onClick={() => {
                  setShowLockedModal(false);
                  setShowModal(true);
                }}
                className="gloss-btn w-full justify-center"
              >
                এখনই এনরোল করুন
              </button>
              <button 
                onClick={() => setShowLockedModal(false)}
                className="w-full py-2 text-sm font-medium text-foreground/50 hover:text-foreground"
              >
                পরে দেখব
              </button>
            </div>
          </div>
        </div>
      )}

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative aspect-video w-full max-w-4xl">
            <button 
              onClick={() => setActiveVideo(null)} 
              className="absolute -top-10 right-0 text-white hover:text-white/70"
            >
              <X className="h-6 w-6" />
            </button>
            <iframe
              className="h-full w-full rounded-xl"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <section className="aurora-soft min-h-screen py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link to="/courses" className="mono-readout mb-8 inline-flex items-center gap-2 transition-opacity hover:opacity-70">
            <ArrowLeft className="h-3.5 w-3.5" /> All courses
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
            {/* Left Column: Course Main Info */}
            <div className="flex flex-col gap-6">
              <div className="sticky-card tint-brand overflow-hidden p-0">
                <div className="aspect-video w-full overflow-hidden" style={{ background: course.thumb }}>
                   {/* Fallback color/gradient if image fails, or just keep it as is if course.thumb is a color */}
                </div>
                <div className="p-6 sm:p-8">
                   <h1 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                     <EditableText id={`course.${course.slug}.title`}>{course.title}</EditableText>
                  </h1>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/75 sm:text-base">
                     <EditableText id={`course.${course.slug}.about`}>{course.about}</EditableText>
                  </p>
                  
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                     {course.outcomes.map((o, index) => (
                      <div key={o} className="flex items-start gap-3 rounded-xl bg-foreground/5 p-3 text-sm text-foreground/80 ring-1 ring-black/5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                         <EditableText id={`course.${course.slug}.outcome.${index + 1}`}>{o}</EditableText>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Enrollment */}
            <div className="flex flex-col gap-6">
              <div className="sticky-card tint-mint h-fit p-6 sm:p-8 lg:sticky lg:top-28">
                <div className="flex items-baseline gap-3">
                   <span className="font-display text-4xl font-bold"><EditableText id={`course.${course.slug}.price`}>{course.price}</EditableText></span>
                  {course.oldPrice && (
                    <span className="text-lg text-foreground/40 line-through decoration-coral/30">
                       <EditableText id={`course.${course.slug}.oldPrice`}>{course.oldPrice}</EditableText>
                    </span>
                  )}
                </div>
                
                <div className="mt-8 space-y-4">
                  {[
                    { icon: CalendarDays, text: course.start },
                    { icon: Clock, text: course.length },
                    { icon: User, text: course.instructor },
                    { icon: Play, text: `${totalLessons} lessons · ${freeLessons} free preview` }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-medium text-foreground/70">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/5 text-foreground/60">
                        <item.icon className="h-4 w-4" />
                      </div>
                       <EditableText id={`course.${course.slug}.info.${idx + 1}`}>{item.text}</EditableText>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  {enrolled ? (
                    <Link
                      to="/courses/$slug/lessons/$lessonId"
                      params={{ slug, lessonId: 'intro' }}
                      className="gloss-btn w-full justify-center !py-4 text-base font-bold"
                    >
                      ✅ Access Unlocked - Start Learning
                    </Link>
                  ) : (
                    <div className="space-y-4">
                      <button 
                        onClick={async () => {
                          const { data: { session } } = await supabase.auth.getSession();
                          if (!session) {
                            toast.error("অনুগ্রহ করে আগে লগইন করুন।");
                            const currentPath = window.location.pathname;
                            window.location.href = `/auth?redirect=${encodeURIComponent(currentPath)}`;
                            return;
                          }
                          if (slug === 'video-editing-batch-3') {
                            setShowModal(true);
                          }
                        }}
                        disabled={slug !== 'video-editing-batch-3'}
                        className={`gloss-btn w-full justify-center !py-4 text-base font-bold ${slug !== 'video-editing-batch-3' ? 'grayscale opacity-70 cursor-not-allowed' : ''}`}
                      >
                       <EditableText id={`course.${course.slug}.enrollCta`}>{slug === 'video-editing-bootcamp' ? 'Batch Completed' : slug === 'video-editing-batch-2' ? 'Batch Running' : 'Enroll Now'}</EditableText>
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>


          <div className="mt-16 sm:mt-24">
             <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl"><EditableText id={`course.${course.slug}.curriculum.heading`}>Course curriculum</EditableText></h2>
             <p className="mono-readout mt-2"><EditableText id={`course.${course.slug}.curriculum.summary`}>{`${course.modules.length} modules · ${totalLessons} lessons`}</EditableText></p>


            <div className="mt-6 space-y-5">
             {course.modules.map((m, moduleIndex) => (
                <div key={m.title} className="sticky-card p-4 sm:p-5">
                   <div className="font-display text-base font-semibold"><EditableText id={`course.${course.slug}.module.${moduleIndex + 1}.title`}>{m.title}</EditableText></div>
                  <div className="mt-3 divide-y divide-foreground/10">
                    {m.lessons.map((l: any) => {
                      const open = l.free || enrolled;
                      return (
                        <div 
                          key={l.title} 
                          onClick={(e) => {
                            if (open) {
                              // If it's a real lesson, we could navigate, or just use the preview if it's the bootcamp
                              // For Batch 03, we definitely want to navigate to the lesson page
                              if (slug === 'video-editing-batch-3') {
                                // Handled by inner button or direct click
                              } else {
                                l.videoId && setActiveVideo(l.videoId);
                              }
                            } else {
                              setShowLockedModal(true);
                            }
                          }}
                          className={`flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:py-3 sm:gap-3 group transition-colors cursor-pointer hover:bg-foreground/5`}
                        >

                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div
                              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all group-active:scale-90 ${
                                open ? "bg-[var(--brand)]/15 text-[var(--brand)] group-hover:scale-110" : "bg-foreground/5 text-foreground/30"
                              }`}
                            >
                              {open ? <Play className="h-4 w-4 fill-current" /> : <Lock className="h-4 w-4" />}
                            </div>
                            <span className={`text-sm font-medium leading-tight sm:text-base line-clamp-2 transition-colors ${
                              open ? "text-foreground group-hover:text-[var(--brand)]" : "text-foreground/40"
                            }`}>
                              {l.title}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between pl-[52px] sm:ml-auto sm:pl-0 sm:shrink-0">
                            {enrolled && (
                              <Link
                                to="/courses/$slug/lessons/$lessonId"
                                params={{ slug, lessonId: 'intro' }}
                                className="gloss-btn-ghost !py-1.5 !px-3 text-[10px] font-bold"
                              >
                                Watch Lesson
                              </Link>
                            )}
                            {l.free && !enrolled && (
                              <span className="rounded-full bg-[var(--mint)]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--mint)] ring-1 ring-[var(--mint)]/20">
                                Free

                              </span>
                            )}
                            <span className="mono-readout text-xs font-semibold text-foreground/40 sm:ml-4">
                              {l.length}
                            </span>
                          </div>
                        </div>
                      );

                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

export const Route = createFileRoute("/courses/$slug")({
  beforeLoad: ({ params }) => {
    const exists = COURSES.some((c) => c.slug === params.slug);
    if (!exists) throw notFound();
  },
  head: ({ params }) => {
    const c = COURSES.find((x) => x.slug === params.slug);
    const title = c ? `${c.title} — growVelo Courses` : "Course — growVelo";
    const description = c?.desc ?? "growVelo editing course details.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-[900px] px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">Course পাওয়া যায়নি</h1>
        <Link to="/courses" className="gloss-btn mt-6 inline-flex">Back to courses</Link>
      </div>
    </SiteShell>
  ),
  errorComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-[900px] px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">কিছু একটা সমস্যা হয়েছে</h1>
        <Link to="/courses" className="gloss-btn mt-6 inline-flex">Back to courses</Link>
      </div>
    </SiteShell>
  ),
  component: CourseDetail,
});