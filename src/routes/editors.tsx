import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Editors, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/editors")({
  head: () => ({
    meta: [
      { title: "Our Editors — Framecut" },
      { name: "description", content: "Meet the Framecut editing team. Cinematic, short-form, motion, and documentary specialists." },
      { property: "og:title", content: "Our Editors — Framecut" },
      { property: "og:description", content: "Meet the Framecut editing team." },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-16" />
      <Editors />
      <BigCTA />
    </SiteShell>
  ),
});
