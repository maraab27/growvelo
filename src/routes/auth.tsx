import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowRight, Mail, Lock, User, Phone, Loader2 } from 'lucide-react';

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
    if (loading) return;
    
    setLoading(true);
    const toastId = toast.loading(isLogin ? 'Signing in...' : 'Creating your account...');

    try {
      if (isLogin) {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        if (data.user) {
          toast.success('Login successful! Redirecting...', { id: toastId });
          // Short delay for better UX
          setTimeout(() => {
            navigate({ to: redirect as any });
          }, 1000);
        }
      } else {
        const fullPhoneNumber = phone.startsWith('+') ? phone : `+880${phone}`;
        
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: fullPhoneNumber,
            },
          },
        });
        
        if (error) throw error;
        
        if (data.user) {
          toast.success('Account created! Please check your email to verify.', { id: toastId });
          setIsLogin(true); // Switch to login view
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Authentication failed. Please check your credentials.', { id: toastId });
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
            {isLogin ? 'Welcome ' : 'Create '}
            <span className="grad-text">{isLogin ? 'Back' : 'Account'}</span>
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            {isLogin 
              ? 'Login to access your courses' 
              : 'Join growVelo to start your journey'}
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
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-foreground/10 bg-foreground/5 py-3 pl-10 pr-4 text-sm focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
                  placeholder="Muhammad Ataullah"
                />
              </div>
            </div>
          )}

          {!isLogin && (
            <div className="space-y-2">
              <label className="mono-readout text-[10px] uppercase tracking-wider opacity-60">Phone Number</label>
              <div className="relative flex items-center gap-2">
                <div className="flex h-[46px] items-center rounded-xl border border-foreground/10 bg-foreground/5 px-3 text-sm font-medium text-foreground/60">
                  +880
                </div>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full rounded-xl border border-foreground/10 bg-foreground/5 py-3 pl-10 pr-4 text-sm focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
                    placeholder="1XXXXXXXXX"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="mono-readout text-[10px] uppercase tracking-wider opacity-60">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <input
                type="email"
                required
                autoComplete="email"
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
                autoComplete={isLogin ? "current-password" : "new-password"}
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
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {isLogin ? 'Login' : 'Create Account'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
