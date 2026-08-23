import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, StudentShowcase, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Student Showcase — growVelo" },
      { name: "description", content: "Explore the amazing video editing projects created by students of growVelo academy." },
      { property: "og:title", content: "Student Showcase — growVelo" },
      { property: "og:description", content: "Explore the amazing video editing projects created by students of growVelo academy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-24" />
      <StudentShowcase />
      <BigCTA />
    </SiteShell>
  ),
});
