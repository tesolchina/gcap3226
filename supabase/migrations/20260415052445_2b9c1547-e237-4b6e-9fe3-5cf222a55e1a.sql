-- Fix 1: Restrict teacher_registrations INSERT to authenticated users with matching user_id
DROP POLICY IF EXISTS "Anyone can create teacher registrations" ON public.teacher_registrations;

CREATE POLICY "Authenticated users can create own registration"
ON public.teacher_registrations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Fix 2: Restrict project_files INSERT to verified project members
DROP POLICY IF EXISTS "Anyone can upload project files" ON public.project_files;

CREATE POLICY "Project members can upload files"
ON public.project_files
FOR INSERT
TO public
WITH CHECK (
  member_id IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.project_members pm
    WHERE pm.id = member_id
      AND pm.project_group_id = project_files.project_group_id
      AND pm.status = 'approved'
  )
);