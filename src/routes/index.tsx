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
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <SocialProof />
      <CourseCategories />
      <StudentShowcase limit={5} />
      <Instructors />
      <StudentReviews />
      <FAQ />
      <BigCTA />
    </SiteShell>
  );
}
