import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, About, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — growVelo Academy" },
      { name: "description", content: "Learn about growVelo's mission to empower the next generation of video editors through cinematic storytelling." },
      { property: "og:title", content: "About Us — growVelo Academy" },
      { property: "og:description", content: "Learn about growVelo's mission to empower the next generation of video editors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-24" />
      <About />
      <BigCTA />
    </SiteShell>
  ),
});
