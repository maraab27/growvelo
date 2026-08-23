import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Contact } from "../components/site/sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — growVelo" },
      { name: "description", content: "Start a project with growVelo — share your footage, format and deadline." },
      { property: "og:title", content: "Contact — growVelo" },
      { property: "og:description", content: "Start a project with growVelo." },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-24" />
      <Contact />
    </SiteShell>

  ),
});
