import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Play, Check, ArrowLeft, CalendarDays, Clock, User, X, Smartphone, Mail, Hash } from "lucide-react";
import { SiteShell, COURSES } from "../components/site/sections";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function EnrollmentModal({ courseSlug, onClose, onSuccess }: { courseSlug: string, onClose: () => void, onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

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

      const { error } = await supabase
        .from('course_enrollments')
        .insert([{
          user_id: user.id,
          email: email,
          course_slug: courseSlug,
          payment_method: 'bkash',
          transaction_id: transactionId,
          status: 'pending'
        }]);

      if (error) {
        if (error.code === '23505') {
          toast.error("আপনি ইতিমধ্যে এই কোর্সের জন্য আবেদন করেছেন।");
        } else {
          toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
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
                className="w-full rounded-xl bg-white/50 py-2.5 pl-10 pr-4 text-sm ring-1 ring-black/5 focus:outline-hidden focus:ring-[var(--brand)]/50"
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
        .single();
      
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

      <section className="aurora-soft py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-5">
          <Link to="/courses" className="mono-readout inline-flex items-center gap-2 hover:opacity-70">
            <ArrowLeft className="h-3.5 w-3.5" /> All courses
          </Link>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_1fr]">
            <div className="sticky-card tint-brand p-3">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl" style={{ background: course.thumb }} />
              <div className="p-4 sm:p-5">
                <h1 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">{course.title}</h1>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{course.about}</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {course.outcomes.map((o) => (
                    <div key={o} className="flex items-start gap-2 text-sm text-foreground/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky-card tint-mint h-fit p-5">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold">{course.price}</span>
                {course.oldPrice && <span className="text-sm text-foreground/50 line-through">{course.oldPrice}</span>}
              </div>
              <div className="mt-4 space-y-2 text-sm text-foreground/70">
                <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {course.start}</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {course.length}</div>
                <div className="flex items-center gap-2"><User className="h-4 w-4" /> {course.instructor}</div>
                <div className="flex items-center gap-2"><Play className="h-4 w-4" /> {totalLessons} lessons · {freeLessons} free preview</div>
              </div>
              {enrolled ? (
                <div className="mt-5 rounded-xl bg-[var(--mint)]/25 px-4 py-3 text-sm font-medium">
                  ✅ Payment clear — সব class unlock হয়ে গেছে।
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowModal(true)}
                    className="gloss-btn mt-5 w-full justify-center"
                  >
                    Enroll now
                  </button>
                  <p className="mt-3 text-xs text-foreground/55">
                    বিকাশ পেমেন্ট কনফার্ম হওয়ার পরে আপনার ইমেলটি ডাটাবেজে যুক্ত করা হবে এবং কোর্সটি আনলক হবে।
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-14">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Course curriculum</h2>
            <p className="mono-readout mt-1">{course.modules.length} modules · {totalLessons} lessons</p>

            <div className="mt-6 space-y-5">
              {course.modules.map((m) => (
                <div key={m.title} className="sticky-card p-4 sm:p-5">
                  <div className="font-display text-base font-semibold">{m.title}</div>
                  <div className="mt-3 divide-y divide-foreground/10">
                    {m.lessons.map((l: any) => {
                      const open = l.free || enrolled;
                      return (
                        <div key={l.title} className="flex items-center gap-3 py-2.5">
                          <button
                            onClick={() => open && l.videoId && setActiveVideo(l.videoId)}
                            disabled={!open}
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform active:scale-90 ${
                              open ? "bg-[var(--brand)]/15 text-[var(--brand)] hover:scale-110" : "bg-foreground/8 text-foreground/45"
                            }`}
                          >
                            {open ? <Play className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                          </button>
                          <span className={`flex-1 text-sm ${open ? "" : "text-foreground/55"}`}>{l.title}</span>
                          {l.free && !enrolled && (
                            <span className="rounded-full bg-[var(--mint)]/30 px-2 py-0.5 text-[11px] font-medium">Free</span>
                          )}
                          <span className="mono-readout shrink-0">{l.length}</span>
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