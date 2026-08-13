-- Security Hardening Migration

-- 1. Ensure course_enrollments has strict RLS
DROP POLICY IF EXISTS "Users can view own enrollments" ON public.course_enrollments;
DROP POLICY IF EXISTS "Users can insert own enrollments" ON public.course_enrollments;
DROP POLICY IF EXISTS "Admins can manage enrollments" ON public.course_enrollments;

CREATE POLICY "Users can view own enrollments"
ON public.course_enrollments
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments"
ON public.course_enrollments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage enrollments"
ON public.course_enrollments
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Harden user_roles policies
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 3. Ensure no anonymous access to sensitive tables
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Final verification of grants
GRANT SELECT, INSERT, UPDATE ON public.course_enrollments TO authenticated;
GRANT ALL ON public.course_enrollments TO service_role;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
