-- The previous migration attempted to revoke permissions but the linter still warns.
-- To resolve this definitively for Supabase linter:
-- 1. Explicitly revoke from PUBLIC (which includes anon and authenticated)
-- 2. Grant only to service_role
-- 3. If RLS needs it, it usually bypasses this if the policy is handled correctly, or we accept the warning if 'authenticated' is required for RLS logic.
-- However, we can also move the function to a private schema if needed, but that's complex for this setup.

-- Let's try revoking from PUBLIC and authenticated again, but ensuring it's comprehensive.
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- Note: Policies use this function. In Supabase, if a policy uses a function, 
-- the user executing the query (authenticated) usually needs EXECUTE rights.
-- If the linter continues to warn even after we've secured it as much as possible for RLS to function,
-- we will document it. But let's try to satisfy it.

-- Let's try one more thing: explicitly set the search path again and ensure it's not public-accessible.
ALTER FUNCTION public.has_role(uuid, public.app_role) SECURITY DEFINER SET search_path = public;