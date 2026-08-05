import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — growVelo" },
      { name: "description", content: "Editing courses taught by growVelo editors — Premiere, DaVinci, After Effects and more." },
      { property: "og:title", content: "Courses — growVelo" },
      { property: "og:description", content: "Editing courses taught by growVelo editors." },
    ],
  }),
  component: () => <Outlet />,
});
