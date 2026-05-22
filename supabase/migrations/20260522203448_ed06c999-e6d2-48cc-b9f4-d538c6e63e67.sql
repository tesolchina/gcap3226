
-- Lock down government_messages: only teachers can post (impersonation risk)
DROP POLICY IF EXISTS "Anyone can create government messages" ON public.government_messages;
CREATE POLICY "Teachers can create government messages"
  ON public.government_messages FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'teacher'::app_role));

-- Lock down project_knowledge inserts (AI knowledge base injection risk)
-- Edge functions use service role and bypass RLS, so this is safe
DROP POLICY IF EXISTS "Anyone can create project knowledge" ON public.project_knowledge;
CREATE POLICY "Teachers can create project knowledge"
  ON public.project_knowledge FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'teacher'::app_role));

-- teacher_registrations: scope SELECT to authenticated role explicitly
DROP POLICY IF EXISTS "Users can view own registration" ON public.teacher_registrations;
CREATE POLICY "Users can view own registration"
  ON public.teacher_registrations FOR SELECT
  TO authenticated
  USING ((auth.uid() = user_id) OR public.has_role(auth.uid(), 'teacher'::app_role));

DROP POLICY IF EXISTS "Teachers can update registrations" ON public.teacher_registrations;
CREATE POLICY "Teachers can update registrations"
  ON public.teacher_registrations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'teacher'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'teacher'::app_role));

-- Storage: add explicit DELETE/UPDATE policies for project-files (teachers only)
DROP POLICY IF EXISTS "Teachers can delete project files" ON storage.objects;
CREATE POLICY "Teachers can delete project files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-files' AND public.has_role(auth.uid(), 'teacher'::app_role));

DROP POLICY IF EXISTS "Teachers can update project files" ON storage.objects;
CREATE POLICY "Teachers can update project files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-files' AND public.has_role(auth.uid(), 'teacher'::app_role));
