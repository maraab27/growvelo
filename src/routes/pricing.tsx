import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Pricing, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Framecut" },
      { name: "description", content: "Transparent editing rates by format — short-form, YouTube, cinematic and retainers." },
      { property: "og:title", content: "Pricing — Framecut" },
      { property: "og:description", content: "Transparent editing rates by format." },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-16" />
      <Pricing />
      <BigCTA />
    </SiteShell>
  ),
});
