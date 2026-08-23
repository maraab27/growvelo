import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "../../components/site/sections";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { LayoutDashboard, BookOpen, Clock, PlayCircle, LogOut, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = Route.useRouteContext();
  
  const { data: enrollments, isLoading } = useQuery({
    queryKey: ["course_enrollments", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_enrollments")
        .select("*")
        .eq("user_id", user?.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <SiteShell>
      <div className="aurora-soft min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">
                Student <span className="grad-text">Dashboard</span>
              </h1>
              <p className="text-foreground/60 mt-1">স্বাগতম, {user?.user_metadata?.full_name || user?.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 text-sm font-medium ring-1 ring-black/5 hover:bg-white transition-colors text-red-500"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar / Stats */}
            <div className="space-y-6">
              <div className="sticky-card p-6">
                <div className="pin" style={{"--pin-color": "var(--mint)"} as any} />
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-[var(--brand)]" />
                  Overview
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[var(--brand)]/5 ring-1 ring-[var(--brand)]/10">
                    <div className="text-2xl font-bold text-[var(--brand)]">{enrollments?.length || 0}</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-foreground/40">Enrolled Courses</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-display text-xl font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                আমার কোর্সসমূহ
              </h2>

              {isLoading ? (
                <div className="flex items-center justify-center p-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--brand)]"></div>
                </div>
              ) : enrollments && enrollments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="sticky-card group overflow-hidden">
                      <div className="pin" style={{"--pin-color": "var(--brand)"} as any} />
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 rounded-lg bg-[var(--brand)]/10">
                            <PlayCircle className="w-6 h-6 text-[var(--brand)]" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-green-500/10 text-green-600 ring-1 ring-green-500/20">
                            {enrollment.status === 'active' ? 'Active' : 'Pending'}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--brand)] transition-colors">
                          {enrollment.course_slug === 'video-editing-batch-3' ? 'Advanced Video Editing & Retelling' : 
                           enrollment.course_slug === 'video-editing-masterclass' ? 'The Editing Masterclass: Zero to Pro' : 
                           'Course Access'}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-foreground/50 mb-6">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> 24 Lessons
                          </span>
                        </div>
                        <Link
                          to="/courses/$slug/lessons/$lessonId"
                          params={{ slug: enrollment.course_slug, lessonId: 'intro' }}
                          className="gloss-btn w-full justify-center text-sm py-2"
                        >
                          Continue Learning
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="sticky-card p-12 text-center">
                  <div className="pin" style={{"--pin-color": "var(--mint)"} as any} />
                  <div className="max-w-xs mx-auto">
                    <BookOpen className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">আপনি এখনও কোনো কোর্সে এনরোল করেননি</h3>
                    <p className="text-sm text-foreground/50 mb-6">আমাদের নতুন ব্যাচে জয়েন করে আপনার এডিটিং জার্নি শুরু করুন।</p>
                    <Link to="/courses" className="gloss-btn w-full justify-center">
                      ব্রাউজ কোর্স
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
