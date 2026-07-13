import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, About, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Framecut" },
      { name: "description", content: "Framecut is a boutique editing studio, built by editors — cinematic, short-form, motion and more." },
      { property: "og:title", content: "About — Framecut" },
      { property: "og:description", content: "A boutique editing studio, built by editors." },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-16" />
      <About />
      <BigCTA />
    </SiteShell>
  ),
});
