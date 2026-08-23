import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowRight, Mail, Lock, User, Phone } from 'lucide-react';

export const Route = createFileRoute('/auth')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search.redirect as string) || '/',
    };
  },
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = useSearch({ from: '/auth' });
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success('সফলভাবে লগইন হয়েছে!');
        navigate({ to: redirect as any });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
            },
          },
        });
        if (error) throw error;
        toast.success('অ্যাকাউন্ট তৈরি হয়েছে! দয়া করে আপনার ইমেইল ভেরিফাই করুন।');
      }
    } catch (error: any) {
      toast.error(error.message || 'কিছু ভুল হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aurora-soft flex min-h-screen items-center justify-center px-4 py-24">
      <div className="sticky-card w-full max-w-md p-8 sm:p-10">
        <div className="pin" style={{ ["--pin-color" as string]: "var(--brand)" }} />
        
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {isLogin ? 'স্বাগতম ' : 'অ্যাকাউন্ট '}
            <span className="grad-text">{isLogin ? 'ফিরে এসেছেন' : 'তৈরি করুন'}</span>
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            {isLogin 
              ? 'আপনার কোর্সে এক্সেস পেতে লগইন করুন' 
              : 'নতুন যাত্রা শুরু করতে আপনার তথ্য দিন'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="mt-8 space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label className="mono-readout text-[10px] uppercase tracking-wider opacity-60">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-foreground/10 bg-foreground/5 py-3 pl-10 pr-4 text-sm focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
                  placeholder="আপনার নাম"
                />
              </div>
            </div>
          )}

          {!isLogin && (
            <div className="space-y-2">
              <label className="mono-readout text-[10px] uppercase tracking-wider opacity-60">Phone Number</label>
              <div className="relative flex">
                <div className="relative w-full">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-foreground/10 bg-foreground/5 py-3 pl-10 pr-4 text-sm focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
                    placeholder="+৮৮০১৭০০০০০০০০"
                  />
                </div>
              </div>
              <p className="text-[10px] text-foreground/40 italic">দেশি কোড সহ আপনার নম্বরটি দিন (+880)</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="mono-readout text-[10px] uppercase tracking-wider opacity-60">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-foreground/10 bg-foreground/5 py-3 pl-10 pr-4 text-sm focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="mono-readout text-[10px] uppercase tracking-wider opacity-60">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-foreground/10 bg-foreground/5 py-3 pl-10 pr-4 text-sm focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="gloss-btn w-full mt-6 justify-center"
          >
            {loading ? 'প্রসেসিং হচ্ছে...' : (isLogin ? 'লগইন করুন' : 'অ্যাকাউন্ট খুলুন')}
            {!loading && <ArrowRight className="h-5 w-5" />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            {isLogin ? 'নতুন অ্যাকাউন্ট খুলতে চান? রেজিস্টার করুন' : 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন'}
          </button>
        </div>
      </div>
    </div>
  );
}
