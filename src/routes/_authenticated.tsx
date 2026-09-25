import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    let session = null;
    let attempts = 0;

    // বারবার চেক করার লুপ (সর্বোচ্চ ২ সেকেন্ড পর্যন্ত সুপাবেসের জন্য অপেক্ষা করবে)
    while (!session && attempts < 10) {
      const { data } = await supabase.auth.getSession();
      session = data?.session;
      
      if (!session) {
        attempts++;
        // ২০০ মিলি-সেকেন্ড ব্রেক নিয়ে আবার চেক করবে
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }

    // ২ সেকেন্ড পর ১০ বার চেক করেও যদি না পায়, তার মানে ইউজার আসলেই লগআউট!
    if (!session) {
      throw redirect({
        to: "/auth",
        search: {
          redirect: location.pathname,
        },
      });
    }

    return { user: session.user };
  },
  component: () => <Outlet />,
});
