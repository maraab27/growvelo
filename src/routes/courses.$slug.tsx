import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Play, Check, ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { SiteShell, COURSES } from "../components/site/sections";

function CourseDetail() {
  const { slug } = Route.useParams();
  const course = COURSES.find((c) => c.slug === slug)!;
  const storageKey = `gv-enrolled-${slug}`;
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    setEnrolled(window.localStorage.getItem(storageKey) === "paid");
  }, [storageKey]);

  const totalLessons = course.modules.reduce((n, m) => n + m.lessons.length, 0);
  const freeLessons = course.modules.reduce((n, m) => n + m.lessons.filter((l) => l.free).length, 0);

  return (
    <SiteShell>
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
                  <Link to="/contact" className="gloss-btn mt-5 w-full justify-center">Enroll now</Link>
                  <button
                    type="button"
                    onClick={() => {
                      window.localStorage.setItem(storageKey, "paid");
                      setEnrolled(true);
                    }}
                    className="gloss-btn-ghost mt-3 w-full justify-center !text-xs"
                  >
                    আমি payment করেছি — unlock করুন
                  </button>
                  <p className="mt-3 text-xs text-foreground/55">
                    Payment confirm হওয়ার পরে locked class গুলো unlock হবে।
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
                    {m.lessons.map((l) => {
                      const open = l.free || enrolled;
                      return (
                        <div key={l.title} className="flex items-center gap-3 py-2.5">
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                              open ? "bg-[var(--brand)]/15 text-[var(--brand)]" : "bg-foreground/8 text-foreground/45"
                            }`}
                          >
                            {open ? <Play className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                          </span>
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
