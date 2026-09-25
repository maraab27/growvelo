import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    // 1. Prothome Supabase theke session anar try korbe
    let { data: { session } } = await supabase.auth.getSession();

    // 2. Browser er local storage e Supabase er kono login token achhe ki na seta check korbe
    const hasLocalToken = typeof window !== 'undefined' 
      ? Object.keys(localStorage).some(key => key.startsWith('sb-') && key.endsWith('-auth-token')) 
      : false;

    // 3. Jodi session null hoy, kintu storage e token thake, tar mane Supabase slow. Tokhon wait korbe.
    if (!session && hasLocalToken) {
      session = await new Promise((resolve) => {
        // onAuthStateChange er maddhome exact data asha porjonto wait korbe
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
          if (currentSession) {
            subscription.unsubscribe();
            resolve(currentSession);
          }
        });
        
        // Safety timeout (highest 1.5 seconds wait korbe, jate page fese na thake)
        setTimeout(() => {
          subscription.unsubscribe();
          resolve(null);
        }, 1500);
      });
    }

    // 4. Eto kichur por o jodi session na thake, tobe 100% sure je user logout obosthay achhe
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
