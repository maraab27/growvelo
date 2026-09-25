import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lock, LogOut, ExternalLink, ImageIcon, FileText } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // স্টুডেন্ট অ্যাপ্রুভাল স্টেট
  const [studentEmail, setStudentEmail] = useState("");
  const [approveLoading, setApproveLoading] = useState(false);

  // লেসন ম্যানেজার স্টেট
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonOrder, setLessonOrder] = useState("1");
  const [lessonType, setLessonType] = useState<"video" | "zoom" | "meet">("video");
  const [videoUrl, setVideoUrl] = useState("");
  const [zoomUrl, setZoomUrl] = useState("");
  const [lessonLoading, setLessonLoading] = useState(false);

  // ডামি স্ট্যাটস (আগের ডিজাইনের সাথে মিল রাখার জন্য)
  const stats = { gallery: 1, content: 142 };

  // ১. স্টুডেন্ট অ্যাপ্রুভ ফাংশন
  const handleApproveStudent = async () => {
    if (!studentEmail) {
      alert("দয়া করে স্টুডেন্টের ইমেইল দিন!");
      return;
    }
    setApproveLoading(true);
    const { data, error } = await supabase.rpc("approve_student_by_email", {
      student_email: studentEmail,
      course_name: "video-editing-batch-3",
    });

    if (error) {
      alert("Error: " + error.message);
    } else if (data === "Not Found") {
      alert("এই ইমেইল দিয়ে ওয়েবসাইটে কোনো অ্যাকাউন্ট পাওয়া যায়নি! স্টুডেন্টকে আগে সাইন-আপ করতে বলুন।");
    } else {
      alert("সাকসেস! " + studentEmail + " কে Batch 03 এর অ্যাক্সেস দেওয়া হয়েছে।");
      setStudentEmail("");
    }
    setApproveLoading(false);
  };

  // ২. লেসন অ্যাড করার ফাংশন
  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle) {
      alert("দয়া করে লেসনের একটি টাইটেল দিন!");
      return;
    }

    setLessonLoading(true);
    const { error } = await supabase.from("lessons").insert([
      {
        course_slug: "video-editing-batch-3",
        title: lessonTitle,
        lesson_order: parseInt(lessonOrder) || 1,
        type: lessonType,
        video_url: lessonType === "video" ? videoUrl : null,
        zoom_url: lessonType === "zoom" || lessonType === "meet" ? zoomUrl : null,
      },
    ]);

    setLessonLoading(false);

    if (error) {
      alert("লেসন যোগ করতে সমস্যা হয়েছে: " + error.message);
    } else {
      alert("সফলভাবে লেসন অ্যাড করা হয়েছে!");
      setLessonTitle("");
      setVideoUrl("");
      setZoomUrl("");
      setLessonOrder(String((parseInt(lessonOrder) || 1) + 1));
    }
  };

  // লগইন হ্যান্ডলার
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("লগইন ভুল হয়েছে: " + error.message);
    } else {
      setSession(data.session);
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-bangla bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* হেডার */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 glass p-6 rounded-2xl">
          <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-bold">অ্যাডমিন ড্যাশবোর্ড</h1>
          <div className="flex gap-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>লাইভ হোমপেজ</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>

        {/* স্ট্যাটস কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-strong p-6 rounded-2xl flex items-center gap-4">
            <div className="icon-tile bg-blue-500/10 p-4 rounded-xl text-blue-500">
              <ImageIcon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg text-muted-foreground">গ্যালারি ছবি</h3>
              <p className="text-[clamp(2rem,5vw,3rem)] font-bold leading-none">{stats.gallery}</p>
            </div>
          </div>

          <div className="glass-strong p-6 rounded-2xl flex items-center gap-4">
            <div className="icon-tile bg-green-500/10 p-4 rounded-xl text-green-500">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg text-muted-foreground">এডিটেবল কন্টেন্ট ব্লক</h3>
              <p className="text-[clamp(2rem,5vw,3rem)] font-bold leading-none">{stats.content}</p>
            </div>
          </div>

          {/* স্টুডেন্ট অ্যাপ্রুভাল কার্ড */}
          <div className="glass-strong p-6 rounded-2xl flex flex-col gap-4 col-span-1 md:col-span-2 border border-emerald-500/20">
            <div className="flex items-center gap-4 border-b border-border/50 pb-4">
              <div className="icon-tile bg-emerald-500/10 p-3 rounded-xl text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">স্টুডেন্ট অ্যাপ্রুভাল (Enrollment Requests)</h3>
                <p className="text-sm text-muted-foreground">যারা পেমেন্ট করেছে, তাদের এখান থেকে Approve করুন।</p>
              </div>
            </div>

            <div className="bg-background/50 rounded-xl p-6 flex flex-col w-full">
              <label className="text-sm font-semibold mb-2">স্টুডেন্টের ইমেইল অ্যাড্রেস</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="student@gmail.com"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="flex-1 p-3 rounded-lg bg-background border border-border outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleApproveStudent}
                  disabled={approveLoading}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {approveLoading ? "অ্যাপ্রুভ হচ্ছে..." : "Approve for Batch 03"}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                নোট: স্টুডেন্টকে অবশ্যই আগে ওয়েবসাইটে অ্যাকাউন্ট খুলতে হবে। তার রেজিস্টার করা ইমেইলটি এখানে দিয়ে অ্যাপ্রুভ করলেই সে ড্যাশবোর্ডে কোর্সের অ্যাক্সেস পেয়ে যাবে।
              </p>
            </div>
          </div>

          {/* লেসন ম্যানেজার কার্ড */}
          <div className="glass-strong p-6 rounded-2xl flex flex-col gap-4 col-span-1 md:col-span-2 border border-blue-500/20">
            <div className="flex items-center gap-4 border-b border-border/50 pb-4">
              <div className="icon-tile bg-blue-500/10 p-3 rounded-xl text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m10 13 4 2-4 2v-4z"/></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">লেসন ম্যানেজার (Class Links & Video)</h3>
                <p className="text-sm text-muted-foreground">নতুন ক্লাসের জুম লিংক বা ইউটিউব ভিডিও অ্যাড করুন।</p>
              </div>
            </div>

            <form onSubmit={handleAddLesson} className="bg-background/50 rounded-xl p-6 flex flex-col gap-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold mb-1 block">ক্লাস/লেসন টাইটেল</label>
                  <input
                    type="text"
                    placeholder="যেমন: Class 01: Introduction to Premiere Pro"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    className="w-full p-3 rounded-lg bg-background border border-border outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1 block">লেসন ক্রমিক (Order)</label>
                  <input
                    type="number"
                    value={lessonOrder}
                    onChange={(e) => setLessonOrder(e.target.value)}
                    className="w-full p-3 rounded-lg bg-background border border-border outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
              <label className="text-sm font-semibold mb-1 block">ক্লাসের ধরন (Type)</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="lessonType" 
                    value="video" 
                    checked={lessonType === 'video'}
                    onChange={() => setLessonType('video')}
                    className="accent-blue-500"
                  />
                  <span>রেকর্ডেড ভিডিও (YouTube)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="lessonType" 
                    value="zoom" 
                    checked={lessonType === 'zoom'}
                    onChange={() => setLessonType('zoom')}
                    className="accent-blue-500"
                  />
                  <span>Zoom লাইভ ক্লাস</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="lessonType" 
                    value="meet" 
                    checked={lessonType === 'meet'}
                    onChange={() => setLessonType('meet')}
                    className="accent-blue-500"
                  />
                  <span>Google Meet লাইভ ক্লাস</span>
                </label>
              </div>
            </div>

            {lessonType === 'video' ? (
              <div>
                <label className="text-sm font-semibold mb-1 block">ভিডিও লিংক (YouTube Link)</label>
                <input 
                  type="url" 
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full p-3 rounded-lg bg-background border border-border outline-none focus:border-blue-500"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="text-sm font-semibold mb-1 block">
                  {lessonType === 'meet' ? 'Google Meet লিংক' : 'Zoom লাইভ ক্লাস লিংক'}
                </label>
                <input 
                  type="url" 
                  placeholder={lessonType === 'meet' ? "https://meet.google.com/..." : "https://zoom.us/j/..."}
                  value={zoomUrl}
                  onChange={(e) => setZoomUrl(e.target.value)}
                  className="w-full p-3 rounded-lg bg-background border border-border outline-none focus:border-blue-500"
                  required
                />
              </div>
            )}
              <button
                type="submit"
                disabled={lessonLoading}
                className="mt-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
              >
                {lessonLoading ? "যোগ করা হচ্ছে..." : "Add Lesson to Batch 03"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
