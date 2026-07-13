import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Reviews, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Framecut" },
      { name: "description", content: "What creators and brands say about working with the Framecut editing team." },
      { property: "og:title", content: "Reviews — Framecut" },
      { property: "og:description", content: "What creators and brands say about Framecut." },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-16" />
      <Reviews />
      <BigCTA />
    </SiteShell>
  ),
});
