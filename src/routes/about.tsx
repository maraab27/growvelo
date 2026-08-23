import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, About, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — growVelo" },
      { name: "description", content: "growVelo is a boutique editing studio, built by editors — cinematic, short-form, motion and more." },
      { property: "og:title", content: "About — growVelo" },
      { property: "og:description", content: "A boutique editing studio, built by editors." },
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
