import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Contact } from "../components/site/sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — growVelo" },
      { name: "description", content: "Get in touch with growVelo Academy for course inquiries, support, or collaboration." },
      { property: "og:title", content: "Contact Us — growVelo" },
      { property: "og:description", content: "Get in touch with growVelo Academy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-24" />
      <Contact />
    </SiteShell>
  ),
});
