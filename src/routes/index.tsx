import { createFileRoute } from "@tanstack/react-router";
import {
  SiteShell,
  Hero,
  Services,
  Portfolio,
  Editors,
  Courses,
  Reviews,
  About,
  Contact,
  BigCTA,
} from "../components/site/sections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <Portfolio limit={6} />
      <Editors limit={3} />
      <Courses limit={3} />
      <Reviews limit={3} />
      <About />
      <Contact />
      <BigCTA />
    </SiteShell>
  );
}

