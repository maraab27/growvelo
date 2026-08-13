import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Instructors, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/editors")({
  head: () => ({
    meta: [
      { title: "Our Editors — growVelo" },
      { name: "description", content: "Meet the growVelo editing team. Cinematic, short-form, motion, and documentary specialists." },
      { property: "og:title", content: "Our Editors — growVelo" },
      { property: "og:description", content: "Meet the growVelo editing team." },
    ],
  }),
  component: () => (
    <SiteShell>
      <div className="pt-16" />
      <Instructors />
      <BigCTA />
    </SiteShell>
  ),
});
