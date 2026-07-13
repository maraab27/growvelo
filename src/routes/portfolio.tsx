import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Portfolio, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Framecut" },
      { name: "description", content: "Recent edits and films from the Framecut studio — brand, YouTube, motion, weddings and more." },
      { property: "og:title", content: "Portfolio — Framecut" },
      { property: "og:description", content: "Recent edits and films from the Framecut studio." },
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
