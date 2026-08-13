# Security Hardening Plan

This plan addresses several security concerns identified during the code audit, focusing on role-based access control, Row Level Security (RLS) improvements, and Cross-Site Scripting (XSS) prevention.

## User Review Required

> [!IMPORTANT]
> - This plan modifies database policies to enforce stricter access controls.
> - XSS protections are being added to dynamic style/script injections.

## Proposed Changes

### Database Security (Supabase)

- **Restrict Enrollment Visibility**: Update `course_enrollments` policies to ensure users can only view their own data, and only admins can see all entries.
- **Audit `has_role` Function**: Ensure the `security definer` function is not susceptible to search path attacks (already set to `public`, but will verify consistency).
- **Service Role Verification**: Ensure `service_role` has full access for administrative tasks while `authenticated` users are strictly limited.

### Frontend Security

#### XSS Prevention
- **Sanitize Dynamic Styles**: In `src/components/ui/chart.tsx`, the `ChartStyle` component uses `dangerouslySetInnerHTML` for dynamic CSS. I will add a sanitization layer or use a safer approach for injecting CSS variables.
- **Root Route Sanitization**: In `src/routes/__root.tsx`, the `RootShell` component injects a script for theme initialization. I will verify that `themeInitScript` is a static constant and not influenced by user input.

#### Role-Based Logic
- **Server-Side Validation**: Ensure that sensitive operations (like approving enrollments) are only performed through server functions that verify the caller's role using the database, not just client-side state.

## Technical Details

- **File**: `supabase/migrations/20260813_security_hardening.sql`
  - Refine RLS policies for `course_enrollments` and `user_roles`.
- **File**: `src/components/ui/chart.tsx`
  - Refactor `ChartStyle` to use a more secure method for injecting CSS variables or ensure strict sanitization of the `id` and `config` values.
- **File**: `src/routes/api/public/enroll.ts`
  - Implement actual database interaction with role checks if needed, ensuring it's not just a placeholder.

## Verification Plan

- **Database**: Run queries as different users (using `authenticated` vs `anon`) to verify RLS blocks unauthorized access.
- **Frontend**: Verify charts still render correctly with the new styling approach.
- **Integration**: Test the enrollment flow to ensure `pending` status is correctly enforced and only visible to the user and admins.
