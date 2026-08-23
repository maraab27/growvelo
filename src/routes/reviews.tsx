import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, StudentReviews, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — growVelo" },
      { name: "description", content: "What creators and brands say about working with the growVelo editing team." },
      { property: "og:title", content: "Reviews — growVelo" },
      { property: "og:description", content: "What creators and brands say about growVelo." },
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
