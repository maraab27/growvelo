# Plan - growVelo E-learning Platform Implementation

This plan details the transition of growVelo into a full e-learning platform, including permanent asset management, authentication, and a student dashboard.

## Proposed Changes

### 1. Asset Management & UI Restoration
- Restore `src/components/site/sections.tsx` to a clean state by removing all developer instruction overlays.
- Update `growVelo` logo and instructor images to use new permanent assets created from user uploads.
- Fix broken image paths for Batch 01 course thumbnail.

### 2. Authentication System (Supabase)
- Implement a modern, secure Authentication panel at `/auth` for Login and Registration.
- Use Supabase Auth for the flow, including proper error handling and loading states.
- Create a `requireAuth` middleware for protected routes.

### 3. Student Dashboard & Course Access
- Create a protected `/dashboard` route for enrolled students.
- Build a "My Courses" UI displaying student enrollments.
- Implement a Lesson page (`/dashboard/courses/$slug/lessons/$lessonId`) featuring:
    - YouTube Unlisted video player via iframe.
    - Dynamic "Live Zoom Class Links" and schedules section.
- Add an `enrollments` table in the database to track student access.

### 4. Polish & Deployment Prep
- Ensure all components follow the "Modern Glossy Sticker-Note" design system.
- Set up Supabase environment variable placeholders for deployment.
- Verify responsive behavior across all new routes.

## Technical Details

### Database Schema (Supabase)
```sql
CREATE TABLE public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_slug TEXT NOT NULL,
    enrolled_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, course_slug)
);
GRANT ALL ON public.enrollments TO authenticated;
GRANT ALL ON public.enrollments TO service_role;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own enrollments" ON public.enrollments FOR SELECT TO authenticated USING (auth.uid() = user_id);
```

### Components & Routes
- `src/routes/auth.tsx`: Login/Register UI.
- `src/routes/_authenticated/dashboard.tsx`: Protected student portal.
- `src/routes/_authenticated/courses.$slug.lessons.$lessonId.tsx`: Video player and live link UI.
- `src/lib/auth.functions.ts`: Server functions for enrollment checks.

## User Review Required

> [!IMPORTANT]
> - Should students be able to register freely, or is account creation tied to payment confirmation?
> - Do you have a list of YouTube video IDs for the lessons, or should I use placeholders for now?
