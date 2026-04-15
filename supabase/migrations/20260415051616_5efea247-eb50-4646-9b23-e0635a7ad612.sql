-- Fix: Restrict project_members UPDATE to authenticated teachers only
DROP POLICY IF EXISTS "Teachers can update member status" ON public.project_members;

CREATE POLICY "Teachers can update member status"
ON public.project_members
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'teacher'))
WITH CHECK (public.has_role(auth.uid(), 'teacher'));