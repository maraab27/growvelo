import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Categories, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — Scrapbook" },
      { name: "description", content: "Pick a starting point. Ship in seconds with 120+ Scrapbook templates." },
      { property: "og:title", content: "Templates — Scrapbook" },
      { property: "og:description", content: "Pick a starting point. Ship in seconds with 120+ Scrapbook templates." },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <SiteShell>
      <div className="pt-16" />
      <Categories />
      <BigCTA />
    </SiteShell>
  );
}
