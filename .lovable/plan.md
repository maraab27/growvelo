# Plan - Remove Lovable backend overrides and strictly use custom Supabase project

The user wants to ensure the application connects exclusively to their custom Supabase project (via `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) and that all auth redirects point to their Vercel domain instead of the Lovable domain.

## User Constraints
- **Do not** modify any UI design or Bengali text.
- **Strictly** use `process.env.NEXT_PUBLIC_SUPABASE_URL` and `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Remove** internal Lovable managed overrides or hardcoded redirects.

## Proposed Changes

### 1. Supabase Client Configuration
- Clean up `src/integrations/supabase/client.ts` to prioritize standard environment variables and remove any Lovable-specific fetch overrides that might interfere with custom projects if they are strictly using standard JWT-based Supabase.
- Clean up `src/integrations/supabase/client.server.ts` to follow the same logic for the service role client.

### 2. Auth Flow and Redirects
- Update `src/routes/auth.tsx` to explicitly handle the `emailRedirectTo` option during `signUp`.
- Ensure the redirect URL is derived from the current origin (`window.location.origin`) or a configurable environment variable, avoiding any hardcoded Lovable domains.

### 3. Server-side Middleware
- Verify `src/integrations/supabase/auth-middleware.ts` uses the standard environment variables to validate tokens.

## Technical Details
- In `src/integrations/supabase/client.ts`, I will remove the `isNewSupabaseApiKey` and `createSupabaseFetch` logic if it's primarily for Lovable's opaque keys, or ensure it doesn't break standard Supabase keys. The user specifically asked to remove "internal Lovable managed client overrides".
- Use `import.meta.env` for Vite compatibility and `process.env` for server-side/Vercel compatibility.

## Security
- No secrets will be hardcoded.
- RLS and standard Supabase auth flow will be maintained.
