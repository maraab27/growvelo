import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Courses, BigCTA } from "../components/site/sections";

export const Route = createFileRoute("/courses/")({
  component: () => (
    <SiteShell>
      <div className="pt-24" />
      <Courses />
      <BigCTA />

    </SiteShell>
  ),
});