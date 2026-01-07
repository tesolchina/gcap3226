-- Tighten INSERT policy for session_messages (avoid always-true linter warning)
ALTER POLICY "Anyone can create session messages"
ON public.session_messages
WITH CHECK (
  session_id IS NOT NULL
  AND EXISTS (
    SELECT 1 FROM public.project_sessions s
    WHERE s.id = session_messages.session_id
  )
);
