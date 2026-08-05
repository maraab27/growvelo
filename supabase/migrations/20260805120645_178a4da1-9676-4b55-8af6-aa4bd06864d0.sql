-- 1. Create enum for roles
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'student');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create tables
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    course_slug text NOT NULL,
    payment_method text,
    transaction_id text,
    status text DEFAULT 'pending', -- pending, approved, rejected
    created_at timestamptz DEFAULT now(),
    UNIQUE(email, course_slug)
);

CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- 3. Grants
GRANT SELECT, INSERT, UPDATE ON public.course_enrollments TO authenticated;
GRANT ALL ON public.course_enrollments TO service_role;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- 4. Enable RLS
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. Security definer function for roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 6. Policies
-- Users can see their own enrollments
DO $$ BEGIN
    CREATE POLICY "Users can view own enrollments"
    ON public.course_enrollments
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Users can insert their own enrollments
DO $$ BEGIN
    CREATE POLICY "Users can insert own enrollments"
    ON public.course_enrollments
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Admins can do anything
DO $$ BEGIN
    CREATE POLICY "Admins can manage enrollments"
    ON public.course_enrollments
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Admins can manage roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));
EXCEPTION WHEN duplicate_object THEN null; END $$;
