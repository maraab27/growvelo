import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "../components/site/sections";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
        toast.success("সফলভাবে লগইন হয়েছে!");
        window.location.href = "/dashboard";
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        if (error) throw error;
        toast.success("রেজিস্ট্রেশন সফল! ইমেইল ভেরিফাই করুন।");
      }
    } catch (error: any) {
      toast.error(error.message || "কিছু একটা সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteShell>
      <div className="aurora-soft flex min-h-screen items-center justify-center px-4 py-24">
        <div className="sticky-card tint-brand w-full max-w-md p-8">
          <div className="pin" style={{ ["--pin-color" as string]: "var(--brand)" }} />
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {isLogin ? "Welcome " : "Join "}
            <span className="grad-text">growVelo</span>
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            {isLogin ? "আপনার একাউন্টে লগইন করুন" : "নতুন একাউন্ট তৈরি করুন"}
          </p>

          <form onSubmit={handleAuth} className="mt-8 space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl bg-white/50 py-2.5 pl-10 pr-4 text-sm ring-1 ring-black/5 focus:outline-hidden focus:ring-[var(--brand)]/50"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-white/50 py-2.5 pl-10 pr-4 text-sm ring-1 ring-black/5 focus:outline-hidden focus:ring-[var(--brand)]/50"
                  placeholder="yourname@gmail.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-white/50 py-2.5 pl-10 pr-4 text-sm ring-1 ring-black/5 focus:outline-hidden focus:ring-[var(--brand)]/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="gloss-btn w-full justify-center py-3 disabled:opacity-50"
            >
              {loading ? "প্রসেস হচ্ছে..." : isLogin ? "Login" : "Register"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-foreground/60 hover:text-[var(--brand)] transition-colors"
            >
              {isLogin ? "নতুন একাউন্ট নেই? রেজিস্টার করুন" : "ইতিমধ্যে একাউন্ট আছে? লগইন করুন"}
            </button>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
