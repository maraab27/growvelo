import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "../../../components/site/sections";
import { Youtube, Calendar, Link as LinkIcon, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: LessonPage,
});

// Since the route tree hasn't updated for the nested lesson route yet, 
// I'll keep the dashboard as the primary view for now and add this as a modal or conditional view.
// For now, let's just make sure dashboard is working.

function LessonPage() {
  return (
    <SiteShell>
      <div className="aurora-soft min-h-screen pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Lesson Placeholder</h1>
            <p>Lesson content will go here.</p>
        </div>
      </div>
    </SiteShell>
  );
}
