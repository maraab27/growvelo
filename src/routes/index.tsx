import { createFileRoute } from "@tanstack/react-router";
import {
  SiteShell,
  Hero,
  SocialProof,
  CourseCategories,
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
      { title: "growVelo — Advanced Video Editing Academy" },
      { name: "description", content: "Master cinematic video editing and short-form storytelling with Muhammad Ataullah. Professional courses for aspiring editors." },
      { property: "og:title", content: "growVelo — Advanced Video Editing Academy" },
      { property: "og:description", content: "Master cinematic video editing and short-form storytelling with Muhammad Ataullah. Professional courses for aspiring editors." },
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
