import React, { Suspense, lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  SiteShell,
  Hero,
  SocialProof,
  FeaturedCourses,
} from "../components/site/sections";

// নিচের ভারী সেকশনগুলো স্ক্রিন লোডের সময় মোবাইল সিপিইউ-কে ফ্রি রাখার জন্য Lazy Load করা হলো
const StudentShowcase = lazy(() =>
  import("../components/site/sections").then((mod) => ({ default: mod.StudentShowcase }))
);
const Instructors = lazy(() =>
  import("../components/site/sections").then((mod) => ({ default: mod.Instructors }))
);
const StudentReviews = lazy(() =>
  import("../components/site/sections").then((mod) => ({ default: mod.StudentReviews }))
);
const FAQ = lazy(() =>
  import("../components/site/sections").then((mod) => ({ default: mod.FAQ }))
);
const BigCTA = lazy(() =>
  import("../components/site/sections").then((mod) => ({ default: mod.BigCTA }))
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "growVelo – Professional Video Editing Courses" },
      { name: "description", content: "Learn professional video editing with growVelo's live Bengali courses, expert mentoring, and student showcase." },
      { property: "og:title", content: "growVelo – Professional Video Editing Courses" },
      { property: "og:description", content: "Learn professional video editing through live Bengali courses and expert mentoring." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      {/* শুরুর দৃশ্যমান অংশগুলো সাথে সাথে ইনস্ট্যান্ট লোড হবে */}
      <Hero />
      <SocialProof />
      <FeaturedCourses isHomePage />

      {/* স্ক্রল করার সাথে সাথে নিচের অংশগুলো ব্যাকগ্রাউন্ডে স্মুথলি লোড হবে */}
      <Suspense fallback={<div className="h-40 w-full animate-pulse bg-neutral-900/10 rounded-2xl" />}>
        <StudentShowcase limit={5} />
        <Instructors />
        <StudentReviews />
        <FAQ />
        <BigCTA />
      </Suspense>
    </SiteShell>
  );
}
