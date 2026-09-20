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
