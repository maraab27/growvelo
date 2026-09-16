import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { themeInitScript } from "../components/site/theme-toggle";
import { CmsProvider } from "../components/cms/CmsProvider";
import { SaveBar } from "../components/cms/SaveBar";


function NotFoundComponent() {
  return (
    <div className="aurora-soft flex min-h-screen items-center justify-center px-4">
      <div className="sticky-card max-w-md p-10 text-center">
        <div className="pin" style={{ ["--pin-color" as string]: "var(--coral)" }} />
        <div className="font-display text-7xl font-semibold">
          <span className="grad-text">404</span>
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-foreground/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="gloss-btn">
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="aurora-soft flex min-h-screen items-center justify-center px-4">
      <div className="sticky-card max-w-md p-10 text-center">
        <div className="pin" style={{ ["--pin-color" as string]: "var(--lemon)" }} />
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          This page didn't <span className="grad-text">load</span>.
        </h1>
        <p className="mt-3 text-sm text-foreground/60">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="gloss-btn"
          >
            Try again
          </button>
          <a href="/" className="gloss-btn-ghost">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "growVelo — Boutique video editing studio" },
      { name: "description", content: "growVelo is a boutique editing studio for creators, brands, and filmmakers. Cinematic edits, short-form reels, motion graphics — pinned together on one glossy canvas." },
      { name: "author", content: "growVelo" },
      { name: "theme-color", content: "#e6f7f1" },
      { property: "og:title", content: "growVelo — Boutique video editing studio" },
      { property: "og:description", content: "growVelo is a boutique editing studio for creators, brands, and filmmakers. Cinematic edits, short-form reels, motion graphics — pinned together on one glossy canvas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "growVelo — Boutique video editing studio" },
      { name: "twitter:description", content: "growVelo is a boutique editing studio for creators, brands, and filmmakers." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0ee1ae95-5ce6-41c4-95de-bf2b1736c265/id-preview-bb263422--d61614c7-8349-49c4-b46e-06b85e08a520.lovable.app-1783912600537.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0ee1ae95-5ce6-41c4-95de-bf2b1736c265/id-preview-bb263422--d61614c7-8349-49c4-b46e-06b85e08a520.lovable.app-1783912600537.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <style dangerouslySetInnerHTML={{ __html: `
          #lovable-badge, 
          [id*="lovable-badge"], 
          a[href*="lovable.app/?utm_source=badge"] { 
            display: none !important; 
            visibility: hidden !important; 
            pointer-events: none !important;
            opacity: 0 !important;
            height: 0 !important;
            width: 0 !important;
          }
        ` }} />
      </head>
      <body>
        {children}
        <Toaster position="top-center" richColors />
        <Scripts />
      </body>
    </html>
  );
}


function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const removeBadge = () => {
      const badge = document.querySelector('#lovable-badge') || 
                    document.querySelector('[id*="lovable-badge"]') ||
                    document.querySelector('a[href*="lovable.app/?utm_source=badge"]');
      if (badge) {
        badge.remove();
      }
    };

    removeBadge();
    const observer = new MutationObserver(removeBadge);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CmsProvider>
        <SaveBar />
        <Outlet />
      </CmsProvider>
    </QueryClientProvider>
  );
}
