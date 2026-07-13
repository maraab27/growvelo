import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Contact } from "../components/site/sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Framecut" },
      { name: "description", content: "Start a project with Framecut — share your footage, format and deadline." },
      { property: "og:title", content: "Contact — Framecut" },
      { property: "og:description", content: "Start a project with Framecut." },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-16" />
      <Contact />
    </SiteShell>
  ),
});
