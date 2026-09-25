import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    // সরাসরি সুপাবেসের ভ্যালিড ইউজার চেক
    const { data: { user }, error } = await supabase.auth.getUser();

    // যদি কোনো ইউজার না থাকে বা এরর আসে, কেবল তখনই লগইন পেজে পাঠাবে
    if (error || !user) {
      throw redirect({
        to: "/auth",
        search: {
          redirect: location.pathname,
        },
      });
    }

    // ড্যাশবোর্ডের জন্য ইউজার ডাটা পাস করা হলো
    return { user };
  },

    // ড্যাশবোর্ডের জন্য ইউজার ডেটা পাস করা হলো
    return { user: currentUser };
  },
  component: () => <Outlet />,
});
