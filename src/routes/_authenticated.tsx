import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    let currentUser = null;

    // ১. সুপাবেসের জন্য ওয়েট না করে সরাসরি ব্রাউজারের স্টোরেজ থেকে ডেটা নিচ্ছি
    if (typeof window !== "undefined") {
      const authKey = Object.keys(localStorage).find((key) => key.includes("-auth-token"));
      if (authKey) {
        try {
          const authData = JSON.parse(localStorage.getItem(authKey) || "{}");
          if (authData && authData.user) {
            currentUser = authData.user;
          }
        } catch (error) {
          console.error("Local storage auth parse error", error);
        }
      }
    }

    // ২. যদি লোকাল স্টোরেজে না থাকে, তবেই কেবল নরমাল সুপাবেস চেক করবে
    if (!currentUser) {
      const { data: { session } } = await supabase.auth.getSession();
      currentUser = session?.user || null;
    }

    // ৩. এরপরও যদি ইউজার না থাকে, তার মানে সে আসলেই লগআউট করা!
    if (!currentUser) {
      throw redirect({
        to: "/auth",
        search: {
          redirect: location.pathname,
        },
      });
    }

    // ড্যাশবোর্ডের জন্য ইউজার ডেটা পাস করা হলো
    return { user: currentUser };
  },
  component: () => <Outlet />,
});
