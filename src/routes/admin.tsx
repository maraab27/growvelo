import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminSession } from '@/hooks/useAdminSession';
import { LogOut, Image as ImageIcon, FileText, ExternalLink, Lock } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user, isAdmin, loading } = useAdminSession();
  const [email, setEmail] = useState(''); // এখন ফাঁকা থাকবে, আপনি টাইপ করতে পারবেন
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({ gallery: 0, content: 0 });
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      const fetchStats = async () => {
        const [{ count: galleryCount }, { count: contentCount }] = await Promise.all([
          supabase.from('gallery_images').select('*', { count: 'exact', head: true }),
          supabase.from('content_blocks').select('*', { count: 'exact', head: true })
        ]);
        setStats({ gallery: galleryCount || 0, content: contentCount || 0 });
      };
      fetchStats();
    }
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoginLoading(false);
    
    if (error) {
      alert("লগইন ফেইল হয়েছে! ইমেইল বা পাসওয়ার্ড ভুল দিয়েছেন।");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bangla">লোড হচ্ছে...</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <form onSubmit={handleLogin} className="glass-strong p-8 rounded-2xl w-full max-w-md flex flex-col gap-4">
          <div className="icon-tile mx-auto bg-primary/10 p-3 rounded-full mb-2">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-center font-bangla mb-4">অ্যাডমিন লগইন</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-background/50 border border-border outline-none focus:border-primary"
            placeholder="আপনার ইমেইল লিখুন"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-background/50 border border-border outline-none focus:border-primary"
            placeholder="পাসওয়ার্ড লিখুন"
            required
          />
          <button 
            type="submit" 
            disabled={loginLoading}
            className="w-full py-3 mt-2 bg-primary text-primary-foreground rounded-lg font-bold font-bangla disabled:opacity-50"
          >
            {loginLoading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 font-bangla bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 glass p-6 rounded-2xl">
          <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-bold">অ্যাডমিন ড্যাশবোর্ড</h1>
          <div className="flex gap-3">
            <a href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span>লাইভ হোমপেজ</span>
            </a>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>

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
              <h3 className="text-lg text-muted-foreground">এডিটেবল কন্টেন্ট בלক</h3>
              <p className="text-[clamp(2rem,5vw,3rem)] font-bold leading-none">{stats.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
