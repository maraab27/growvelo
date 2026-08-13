import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, StudentShowcase, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — growVelo" },
      { name: "description", content: "Recent edits and films from the growVelo studio — brand, YouTube, motion, weddings and more." },
      { property: "og:title", content: "Portfolio — growVelo" },
      { property: "og:description", content: "Recent edits and films from the growVelo studio." },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-16" />
      <Portfolio />
      <BigCTA />
    </SiteShell>
  ),
});
