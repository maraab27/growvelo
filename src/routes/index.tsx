import { createFileRoute } from "@tanstack/react-router";
import {
  SiteShell,
  Hero,
  TrustStrip,
  Features,
  Showcase,
  Categories,
  Testimonials,
  BigCTA,
} from "../components/site/sections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <TrustStrip />
      <Features />
      <Showcase />
      <Categories />
      <Testimonials />
      <BigCTA />
    </SiteShell>
  );
}
