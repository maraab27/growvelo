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
                  {enrollments.map((enrollment: any) => (
            <div 
              key={enrollment.id} 
              className="sticky-card group overflow-hidden flex flex-col rounded-2xl border border-white/10 hover:border-[var(--brand)]/50 transition-all duration-300"
            >
              {/* কোর্স থাম্বনেইল ইমেজ ও ব্যাজ */}
              <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-900/40 via-background to-black border-b border-white/5">
                <img 
                  src="/courses/batch-3-cover.jpg" 
                  alt="Batch 03 Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // ইমেজ পাথ না পাওয়া পর্যন্ত স্টাইলিশ ফলব্যাক লুক রাখবে
                    e.currentTarget.src = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                
                {/* ব্যাচ ট্যাগ */}
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold bg-black/70 backdrop-blur-md text-white border border-white/10">
                  {enrollment.course_slug === 'video-editing-batch-3' ? 'Batch 03' : 'Masterclass'}
                </span>

                {/* স্ট্যাটাস ব্যাজ */}
                <span className="absolute top-3 right-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                  {enrollment.status === 'approved' || enrollment.status === 'active' ? 'Active' : 'Pending'}
                </span>
              </div>

              {/* কার্ড ইনফো ও বাটন */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground group-hover:text-[var(--brand)] transition-colors leading-snug">
                    {enrollment.course_slug === 'video-editing-batch-3' 
                      ? 'Advanced Video Editing & Retelling (Batch 03)' 
                      : enrollment.course_slug === 'video-editing-masterclass' 
                      ? 'The Editing Masterclass: Zero to Pro' 
                      : 'Course Access'}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-xs text-foreground/50 mt-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--brand)]" /> 
                      {/* কালকে লেসন ম্যানেজার যুক্ত হলে এখানে ডাটাবেসের একচুয়াল কাউন্ট চলে আসবে */}
                      Ongoing Lessons
                    </span>
                    <span>•</span>
                    <span className="text-[var(--brand)]/80 font-medium">Live Classes & Mentorship</span>
                  </div>
                </div>

                <Link
                  to="/courses/$slug/lessons/$lessonId"
                  params={{ slug: enrollment.course_slug, lessonId: 'intro' }}
                  className="gloss-btn w-full justify-center text-sm py-2.5 flex items-center gap-2 font-semibold"
                >
                  <span>Continue Learning</span>
                  <ArrowRight className="w-4 h-4" />
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
