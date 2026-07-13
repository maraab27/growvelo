import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Courses, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Framecut" },
      { name: "description", content: "Editing courses taught by Framecut editors — Premiere, DaVinci, After Effects and more." },
      { property: "og:title", content: "Courses — Framecut" },
      { property: "og:description", content: "Editing courses taught by Framecut editors." },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-16" />
      <Courses />
      <BigCTA />
    </SiteShell>
  ),
});
