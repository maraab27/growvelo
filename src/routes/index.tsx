import { createFileRoute } from "@tanstack/react-router";
import {
  SiteShell,
  Hero,
  SocialProof,
  FeaturedCourses,
  StudentShowcase,
  Instructors,
  StudentReviews,
  FAQ,
  BigCTA,
} from "../components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrowVelo – Professional Video Editing Masterclass" },
      { name: "description", content: "Learn professional video editing with GrowVelo's live Bengali courses, expert mentoring, and student showcase." },
      { property: "og:title", content: "GrowVelo – Professional Video Editing Courses" },
      { property: "og:description", content: "Learn professional video editing through live Bengali courses and expert mentoring." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        type: "image/jpeg",
        href: "https://zqjgnoycsiwwcklapelt.supabase.co/storage/v1/object/public/gallery/course_thumb_video_editing_batch_3_1790128805987.jpg",
        fetchPriority: "high",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <SocialProof />
      <FeaturedCourses isHomePage />
      <StudentShowcase limit={5} />
      <Instructors />
      <StudentReviews />
      <FAQ />
      <BigCTA />
    </SiteShell>
  );
}
