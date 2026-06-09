
-- Tighten INSERT policies on project_messages: anon can post but not as teacher/AI
DROP POLICY IF EXISTS "Anyone can create project messages" ON public.project_messages;

CREATE POLICY "Anon can post non-privileged project messages"
ON public.project_messages
FOR INSERT
TO anon
WITH CHECK (
  COALESCE(is_teacher, false) = false
  AND COALESCE(is_ai, false) = false
);

CREATE POLICY "Authenticated can post project messages; teacher flag requires teacher role"
ON public.project_messages
FOR INSERT
TO authenticated
WITH CHECK (
  COALESCE(is_ai, false) = false
  AND (
    COALESCE(is_teacher, false) = false
    OR public.has_role(auth.uid(), 'teacher'::public.app_role)
  )
);

-- Same hardening for session_messages
DROP POLICY IF EXISTS "Anyone can create session messages" ON public.session_messages;

CREATE POLICY "Anon can post non-privileged session messages"
ON public.session_messages
FOR INSERT
TO anon
WITH CHECK (
  session_id IS NOT NULL
  AND EXISTS (SELECT 1 FROM public.project_sessions s WHERE s.id = session_messages.session_id)
  AND COALESCE(is_teacher, false) = false
  AND COALESCE(is_ai, false) = false
);

CREATE POLICY "Authenticated can post session messages; teacher flag requires teacher role"
ON public.session_messages
FOR INSERT
TO authenticated
WITH CHECK (
  session_id IS NOT NULL
  AND EXISTS (SELECT 1 FROM public.project_sessions s WHERE s.id = session_messages.session_id)
  AND COALESCE(is_ai, false) = false
  AND (
    COALESCE(is_teacher, false) = false
    OR public.has_role(auth.uid(), 'teacher'::public.app_role)
  )
);
