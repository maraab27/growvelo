import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Showcase, Testimonials, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/showcase")({
  head: () => ({
    meta: [
      { title: "Showcase — Scrapbook" },
      { name: "description", content: "A glimpse at how real teams use Scrapbook to launch, plan, and celebrate." },
      { property: "og:title", content: "Showcase — Scrapbook" },
      { property: "og:description", content: "A glimpse at how real teams use Scrapbook to launch, plan, and celebrate." },
    ],
  }),
  component: ShowcasePage,
});

function ShowcasePage() {
  return (
    <SiteShell>
      <div className="pt-16" />
      <Showcase />
      <Testimonials />
      <BigCTA />
    </SiteShell>
  );
}
