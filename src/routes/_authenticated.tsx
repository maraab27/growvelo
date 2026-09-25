import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
  // getSession এর বদলে getUser ব্যবহার করলে রিফ্রেশ ইস্যু ফিক্স হয়ে যাবে
  const { data: { user } } = await supabase.auth.getUser();
  const { data: { session } } = await supabase.auth.getSession();

  if (!user || !session) {
    throw redirect({
      to: "/auth",
      search: {
        // href এর বদলে pathname দিলে URL-টা দেখতে অনেক ক্লিন হবে
        redirect: location.pathname, 
      },
    });
  }
  
  return { session, user };
},
  component: () => <Outlet />,
});
