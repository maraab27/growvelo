import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
  // প্রথমে সেশন চেক করবে
  let { data: { session } } = await supabase.auth.getSession();

  // রিফ্রেশ করার কারণে যদি সেশন null পায়, সাথে সাথে বের না করে দিয়ে আধা সেকেন্ড (500ms) অপেক্ষা করবে এবং আবার চেক করবে
  if (!session) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const retry = await supabase.auth.getSession();
    session = retry.data.session;
  }

  // এরপরও যদি সেশন না পায়, তার মানে ইউজার আসলেই লগআউট। তখন লগইন পেজে পাঠাবে
  if (!session) {
    throw redirect({
      to: "/auth",
      search: {
        redirect: location.pathname,
      },
    });
  }

  return { session, user: session.user };
},
  component: () => <Outlet />,
});
