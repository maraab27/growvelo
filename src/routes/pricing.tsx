import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, BigCTA, Testimonials } from "../components/site/sections";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Scrapbook" },
      { name: "description", content: "Free forever plan. No credit card. Start using Scrapbook in 30 seconds." },
      { property: "og:title", content: "Pricing — Scrapbook" },
      { property: "og:description", content: "Free forever plan. No credit card. Start using Scrapbook in 30 seconds." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteShell>
      <div className="pt-16" />
      <BigCTA />
      <Testimonials />
    </SiteShell>
  );
}
