import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, StudentReviews, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Student Reviews — growVelo" },
      { name: "description", content: "Read what our students have to say about their learning experience at growVelo Academy." },
      { property: "og:title", content: "Student Reviews — growVelo" },
      { property: "og:description", content: "Read what our students have to say about their learning experience at growVelo Academy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-24" />
      <StudentReviews />
      <BigCTA />
    </SiteShell>
  ),
});
