import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Features, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Product — Scrapbook" },
      { name: "description", content: "Boards, docs, AI copilot, automations — everything Scrapbook brings to your workspace." },
      { property: "og:title", content: "Product — Scrapbook" },
      { property: "og:description", content: "Boards, docs, AI copilot, automations — everything Scrapbook brings to your workspace." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  return (
    <SiteShell>
      <div className="pt-16" />
      <Features />
      <BigCTA />
    </SiteShell>
  );
}
