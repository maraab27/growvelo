import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  LogOut, 
  ExternalLink, 
  Video, 
  Users, 
  Edit3, 
  Trash2, 
  PlusCircle, 
  CheckCircle2, 
  XCircle,
  Radio
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<any>(null);

  // স্টুডেন্ট অ্যাপ্রুভাল স্টেট
  const [studentEmail, setStudentEmail] = useState("");
  const [approveLoading, setApproveLoading] = useState(false);

  // লেসন ম্যানেজার স্টেট
  const [lessons, setLessons] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonOrder, setLessonOrder] = useState("1");
  const [lessonType, setLessonType] = useState<"video" | "zoom" | "meet">("video");
  const [videoUrl, setVideoUrl] = useState("");
  const [zoomUrl, setZoomUrl] = useState("");
  const [lessonLoading, setLessonLoading] = useState(false);

  // লেসন লিস্ট ফেচ করার ফাংশন
  const fetchLessons = async () => {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_slug", "video-editing-batch-3")
      .order("lesson_order", { ascending: true });

    if (!error && data) {
      setLessons(data);
      if (!editingId) {
        setLessonOrder(String(data.length + 1));
      }
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  // স্টুডেন্ট অ্যাপ্রুভ ফাংশন
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
      alert("এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি! স্টুডেন্টকে আগে সাইন-আপ করতে বলুন।");
    } else {
      alert("সাকসেস! " + studentEmail + " কে Batch 03 এর অ্যাক্সেস দেওয়া হয়েছে।");
      setStudentEmail("");
    }
    setApproveLoading(false);
  };

  // এডিট বাটনে ক্লিক করলে ফর্মে ডাটা লোড করা
  const handleStartEdit = (lesson: any) => {
    setEditingId(lesson.id);
    setLessonTitle(lesson.title);
    setLessonOrder(String(lesson.lesson_order));
    setLessonType(lesson.type);
    setVideoUrl(lesson.video_url || "");
    setZoomUrl(lesson.zoom_url || "");
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // এডিট বাতিল করা
  const handleCancelEdit = () => {
    setEditingId(null);
    setLessonTitle("");
    setVideoUrl("");
    setZoomUrl("");
    setLessonType("video");
    setLessonOrder(String(lessons.length + 1));
  };

  // লেসন অ্যাড অথবা আপডেট হ্যান্ডলার
  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle) {
      alert("দয়া করে লেসনের টাইটেল দিন!");
      return;
    }

    setLessonLoading(true);

    const payload = {
      course_slug: "video-editing-batch-3",
      title: lessonTitle,
      lesson_order: parseInt(lessonOrder) || 1,
      type: lessonType,
      video_url: lessonType === "video" ? videoUrl : null,
      zoom_url: lessonType === "zoom" || lessonType === "meet" ? zoomUrl : null,
    };

    if (editingId) {
      // বিদ্যমান লেসন আপডেট করা (যেমন: লাইভ থেকে রেকর্ডেড ভিডিও লিঙ্ক বসানো)
      const { error } = await supabase
        .from("lessons")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        alert("আপডেট ব্যর্থ হয়েছে: " + error.message);
      } else {
        alert("লেসন সফলভাবে আপডেট করা হয়েছে!");
        handleCancelEdit();
        fetchLessons();
      }
    } else {
      // নতুন লেসন তৈরি করা
      const { error } = await supabase
        .from("lessons")
        .insert([payload]);

      if (error) {
        alert("লেসন যোগ করতে সমস্যা হয়েছে: " + error.message);
      } else {
        alert("নতুন লেসন সফলভাবে যোগ করা হয়েছে!");
        handleCancelEdit();
        fetchLessons();
      }
    }

    setLessonLoading(false);
  };

  // লেসন ডিলিট ফাংশন
  const handleDeleteLesson = async (id: string, title: string) => {
    if (!confirm(`আপনি কি নিশ্চিত যে "${title}" লেসনটি মুছে ফেলতে চান?`)) return;

    const { error } = await supabase.from("lessons").delete().eq("id", id);
    if (error) {
      alert("ডিলিট করতে সমস্যা হয়েছে: " + error.message);
    } else {
      if (editingId === id) handleCancelEdit();
      fetchLessons();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 font-bangla p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* টপ ন্যাভবার ও হেডার */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                GrowVelo Studio Admin
              </h1>
              <p className="text-xs text-slate-400">Batch 03 Management Console</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-slate-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* মেইন গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* বাম কলাম: কন্ট্রোল ফর্মগুলো (৫ কলাম) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* ১. স্টুডেন্ট এনরোলমেন্ট কার্ড */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Student Enrollment</h3>
                  <p className="text-xs text-slate-400">অনবোর্ড স্টুডেন্টদের কোর্স অ্যাক্সেস দিন</p>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="student@gmail.com"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500/50 outline-none text-sm placeholder:text-slate-600 transition-all"
                />
                <button
                  type="button"
                  onClick={handleApproveStudent}
                  disabled={approveLoading}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all disabled:opacity-50"
                >
                  {approveLoading ? "অ্যাপ্রুভ হচ্ছে..." : "Approve Student for Batch 03"}
                </button>
              </div>
            </div>

            {/* ২. লেসন ইনপুট ও এডিটর কার্ড */}
            <div className={`bg-white/[0.02] border rounded-2xl p-6 backdrop-blur-md transition-all ${
              editingId ? "border-amber-500/40 shadow-lg shadow-amber-500/5" : "border-white/10"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg border ${
                    editingId 
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                      : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                  }`}>
                    {editingId ? <Edit3 className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">
                      {editingId ? "Edit Lesson Content" : "Create New Lesson"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {editingId ? "লাইভ ক্লাস পরিবর্তন করে রেকর্ডিং লিঙ্ক বসান" : "নতুন ক্লাস বা লাইভ লিঙ্ক অ্যাড করুন"}
                    </p>
                  </div>
                </div>

                {editingId && (
                  <button
                    onClick={handleCancelEdit}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveLesson} className="space-y-4 text-xs">
                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-3">
                    <label className="text-slate-300 font-medium mb-1.5 block">লেসন টাইটেল</label>
                    <input
                      type="text"
                      placeholder="e.g. Class 02: Advanced Color Grading"
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500/50 outline-none text-slate-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-medium mb-1.5 block">ক্রমিক</label>
                    <input
                      type="number"
                      value={lessonOrder}
                      onChange={(e) => setLessonOrder(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500/50 outline-none text-slate-200 text-center"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-medium mb-2 block">ক্লাসের ধরন (Type)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "video", label: "Recorded" },
                      { id: "zoom", label: "Zoom Live" },
                      { id: "meet", label: "Meet Live" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setLessonType(type.id as any)}
                        className={`py-2 px-2 rounded-xl border text-center font-medium transition-all ${
                          lessonType === type.id
                            ? "bg-purple-600/20 border-purple-500 text-purple-300"
                            : "bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {lessonType === "video" ? (
                  <div>
                    <label className="text-slate-300 font-medium mb-1.5 block">YouTube Video URL</label>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500/50 outline-none text-slate-200"
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-slate-300 font-medium mb-1.5 block">
                      {lessonType === "meet" ? "Google Meet Link" : "Zoom Live Class Link"}
                    </label>
                    <input
                      type="url"
                      placeholder={lessonType === "meet" ? "https://meet.google.com/..." : "https://zoom.us/j/..."}
                      value={zoomUrl}
                      onChange={(e) => setZoomUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500/50 outline-none text-slate-200"
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={lessonLoading}
                  className={`w-full py-3 rounded-xl font-bold transition-all disabled:opacity-50 ${
                    editingId 
                      ? "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20" 
                      : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20"
                  }`}
                >
                  {lessonLoading 
                    ? "প্রসেসিং হচ্ছে..." 
                    : editingId 
                    ? "Update Lesson Details" 
                    : "Add Lesson to Batch 03"}
                </button>
              </form>
            </div>
          </div>

          {/* ডান কলাম: লাইভ লেসন টেবিল ও ম্যানেজমেন্ট (৭ কলাম) */}
          <div className="lg:col-span-7">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-lg text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-purple-400" />
                    <span>Active Lessons ({lessons.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400">সকল ক্লাস এডিট বা ডিলিট করার নিয়ন্ত্রণ</p>
                </div>
                <button
                  onClick={fetchLessons}
                  className="text-xs text-slate-400 hover:text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition-all"
                >
                  Refresh
                </button>
              </div>

              {lessons.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-sm border border-dashed border-white/10 rounded-xl">
                  এখনো কোনো লেসন যোগ করা হয়নি।
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
                  {lessons.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        editingId === item.id
                          ? "bg-amber-500/10 border-amber-500/40"
                          : "bg-white/[0.02] border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="h-7 w-7 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-slate-400">
                          #{item.lesson_order}
                        </span>

                        <div className="overflow-hidden">
                          <h4 className="text-sm font-semibold text-white truncate max-w-[280px] sm:max-w-xs">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              item.type === "video" 
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                                : item.type === "meet" 
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            }`}>
                              {item.type}
                            </span>
                            <span className="truncate max-w-[180px] font-mono text-slate-500">
                              {item.type === "video" ? item.video_url : item.zoom_url}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-white/10 hover:border-amber-500/30 transition-all"
                          title="Edit Lesson"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(item.id, item.title)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 transition-all"
                          title="Delete Lesson"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
