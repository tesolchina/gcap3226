
-- Hide correct_option from public/authenticated by revoking column-level privileges
REVOKE SELECT ON public.mc_questions FROM anon, authenticated;

GRANT SELECT (id, page_slug, question_text, options, display_order, is_active, created_at)
  ON public.mc_questions TO anon, authenticated;

-- Teachers (who use service role via their teacher auth + RLS) still need full access via authenticated role through has_role policy.
-- Grant correct_option only via a security definer function for teachers.
GRANT SELECT (correct_option) ON public.mc_questions TO authenticated;

-- Wait: granting correct_option to authenticated allows any authenticated user to see it via RLS USING(true).
-- Better: only teachers should see correct_option. Use a view restricted to teachers.

-- Revert and use a teacher-only view approach:
REVOKE SELECT (correct_option) ON public.mc_questions FROM authenticated;

CREATE OR REPLACE VIEW public.mc_questions_teacher
WITH (security_invoker = true) AS
SELECT id, page_slug, question_text, options, correct_option, display_order, is_active, created_at
FROM public.mc_questions
WHERE public.has_role(auth.uid(), 'teacher'::app_role);

GRANT SELECT ON public.mc_questions_teacher TO authenticated;
