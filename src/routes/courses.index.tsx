import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Courses, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Courses — growVelo Academy" },
      { name: "description", content: "Explore our professional video editing courses, from beginner bootcamps to advanced masterclasses." },
      { property: "og:title", content: "Courses — growVelo Academy" },
      { property: "og:description", content: "Explore our professional video editing courses, from beginner bootcamps to advanced masterclasses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-24" />
      <Courses />
      <BigCTA />
    </SiteShell>
  ),
});