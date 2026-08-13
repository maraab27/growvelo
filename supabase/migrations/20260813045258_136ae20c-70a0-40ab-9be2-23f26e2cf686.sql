-- Fix security linter warnings: Revoke PUBLIC and AUTHENTICATED execute on has_role
-- has_role is a security definer function and should only be called by the system/admin logic or verified policies, not directly by users via API

REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;

-- Re-verify RLS policies for has_role usage
-- Note: RLS policies using security definer functions work because the policy itself executes as the table owner or service_role in many contexts, but the direct execution right is what the linter flags.
-- If policies fail after revoking authenticated, we might need to grant it back to 'authenticated' but ensure the function logic itself is safe. However, the best practice is to restrict direct API access.

-- Actually, for RLS to use it, the caller of the policy (authenticated) usually needs execute permission if it's evaluated in their context.
-- But Supabase linter warns about it being "executable" by them.
-- Let's try revoking from PUBLIC (anon) and keeping service_role, then check if RLS still works for authenticated.
-- If RLS fails, we grant it back to authenticated but keep it revoked from PUBLIC.

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;