import { createFileRoute, Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/_authenticated")({
  // ১. রাউটারকে কোনোভাবেই রিডাইরেক্ট করতে দেবো না। শুধু ডেটা পাস করবো।
  beforeLoad: async () => {
    try {
      const { data } = await supabase.auth.getSession();
      return { user: data?.session?.user || null };
    } catch (e) {
      return { user: null };
    }
  },
  component: AuthGuard,
});

function AuthGuard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const router = useRouter();
  
  // যদি প্রথমে ইউজার না পায়, তবে লোডিং স্টেট ট্রু থাকবে
  const [isChecking, setIsChecking] = useState(!user);

  useEffect(() => {
    const verifyUser = async () => {
      if (!user) {
        // ২. Supabase কে ব্রাউজারের স্টোরেজ পড়ার জন্য সময় দেওয়া হলো (800ms)
        await new Promise((resolve) => setTimeout(resolve, 800));
        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user) {
          // ৩. ইউজার পেয়ে গেলে রাউটারকে আপডেট করে ড্যাশবোর্ড রেন্ডার করবে
          setIsChecking(false);
          router.invalidate();
        } else {
          // ৪. সত্যিই ইউজার না থাকলে তখন লগইন পেজে পাঠাবে
          navigate({
            to: "/auth",
            search: { redirect: window.location.pathname },
            replace: true,
          });
        }
      }
    };

    verifyUser();

    // অটোমেটিক লগইন/লগআউট ডিটেক্ট করার জন্য
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setIsChecking(false);
        router.invalidate();
      } else if (event === "SIGNED_OUT") {
        navigate({ to: "/auth", replace: true });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [user, navigate, router]);

  // চেক চলাকালীন সময়ে স্ক্রিনে ধাক্কা না দিয়ে একটা সুন্দর লোডিং দেখাবে
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  // ইউজার থাকলেই কেবল ড্যাশবোর্ডের কনটেন্ট (Outlet) দেখাবে
  return user ? <Outlet /> : null;
}
